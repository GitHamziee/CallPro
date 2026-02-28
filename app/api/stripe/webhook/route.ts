import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { markInvoicePaid } from "@/lib/invoice-utils";
import { logStripeEvent } from "@/lib/stripe-logger";
import Stripe from "stripe";

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured");
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = getStripe().webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err);

      await logStripeEvent({
        event: "webhook.signature_failed",
        errorObj: err,
        status: "error",
      });

      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.metadata?.type === "invoice") {
          // --- INVOICE PAYMENT ---
          const invoiceId = session.metadata?.invoiceId;
          const userId = session.metadata?.userId;

          if (!invoiceId || !userId) {
            console.error(
              "Missing invoice metadata in checkout session:",
              session.id
            );

            await logStripeEvent({
              event: "webhook.invoice_payment",
              sessionId: session.id,
              metadata: session.metadata as Record<string, unknown>,
              error: "Missing required metadata (invoiceId or userId)",
              status: "error",
            });

            return NextResponse.json(
              { error: "Missing required metadata" },
              { status: 400 }
            );
          }

          const existingInvoice = await prisma.invoice.findUnique({
            where: { stripeSessionId: session.id },
          });

          if (existingInvoice) {
            console.log(
              `Duplicate webhook for invoice session ${session.id}, skipping`
            );
            break;
          }

          try {
            const result = await markInvoicePaid(invoiceId, session.id);
            if ("error" in result) {
              console.error(`Invoice payment error: ${result.error}`);

              await logStripeEvent({
                event: "webhook.invoice_payment",
                sessionId: session.id,
                userId,
                metadata: { invoiceId },
                error: result.error,
                status: "error",
              });

              // Return 500 so Stripe retries — money was charged but DB not updated
              return NextResponse.json(
                { error: result.error },
                { status: 500 }
              );
            } else {
              console.log(
                `Invoice paid: invoice=${invoiceId}, user=${userId}, session=${session.id}`
              );

              await logStripeEvent({
                event: "webhook.invoice_payment",
                sessionId: session.id,
                userId,
                metadata: { invoiceId },
                response: { invoiceId, paid: true },
                status: "success",
              });
            }
          } catch (payError: unknown) {
            if (
              payError instanceof Error &&
              "code" in payError &&
              (payError as { code: string }).code === "P2002"
            ) {
              console.log(
                `Race condition caught for invoice session ${session.id}, skipping`
              );
            } else {
              throw payError;
            }
          }
        } else {
          // --- PACKAGE PURCHASE ---
          const userId = session.metadata?.userId;
          const packageId = session.metadata?.packageId;

          if (!userId || !packageId) {
            console.error(
              "Missing metadata in checkout session:",
              session.id
            );

            await logStripeEvent({
              event: "webhook.purchase",
              sessionId: session.id,
              metadata: session.metadata as Record<string, unknown>,
              error: "Missing required metadata (userId or packageId)",
              status: "error",
            });

            return NextResponse.json(
              { error: "Missing required metadata" },
              { status: 400 }
            );
          }

          const existing = await prisma.purchase.findUnique({
            where: { stripeSessionId: session.id },
          });

          if (existing) {
            console.log(
              `Duplicate webhook for session ${session.id}, skipping`
            );
            break;
          }

          const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true },
          });

          if (!user) {
            console.error(`Webhook: userId ${userId} not found in DB`);

            await logStripeEvent({
              event: "webhook.purchase",
              sessionId: session.id,
              userId,
              metadata: { packageId },
              error: `User ${userId} not found in DB`,
              status: "error",
            });

            return NextResponse.json(
              { error: "User not found" },
              { status: 400 }
            );
          }

          const pkg = await prisma.package.findUnique({
            where: { id: packageId },
            select: { id: true, isActive: true, durationDays: true },
          });

          if (!pkg || !pkg.isActive) {
            console.error(
              `Webhook: packageId ${packageId} not found or inactive`
            );

            await logStripeEvent({
              event: "webhook.purchase",
              sessionId: session.id,
              userId,
              metadata: { packageId },
              error: `Package ${packageId} not found or inactive`,
              status: "error",
            });

            return NextResponse.json(
              { error: "Package not found or inactive" },
              { status: 400 }
            );
          }

          const expiresAt = pkg.durationDays
            ? new Date(Date.now() + pkg.durationDays * 24 * 60 * 60 * 1000)
            : null;

          try {
            await prisma.purchase.create({
              data: {
                userId,
                packageId,
                status: "ACTIVE",
                stripeSessionId: session.id,
                expiresAt,
              },
            });

            console.log(
              `Purchase created: user=${userId}, package=${packageId}, session=${session.id}`
            );

            await logStripeEvent({
              event: "webhook.purchase",
              sessionId: session.id,
              userId,
              metadata: { packageId },
              response: { purchaseCreated: true, expiresAt: expiresAt?.toISOString() ?? "lifetime" },
              status: "success",
            });
          } catch (createError: unknown) {
            if (
              createError instanceof Error &&
              "code" in createError &&
              (createError as { code: string }).code === "P2002"
            ) {
              console.log(
                `Race condition caught for session ${session.id}, skipping duplicate`
              );
            } else {
              throw createError;
            }
          }
        }

        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error("Payment failed:", paymentIntent.id);

        await logStripeEvent({
          event: "webhook.payment_failed",
          sessionId: paymentIntent.id,
          metadata: paymentIntent.metadata as Record<string, unknown>,
          error: paymentIntent.last_payment_error?.message || "Payment failed",
          status: "error",
        });

        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);

    await logStripeEvent({
      event: "webhook.unhandled_error",
      errorObj: error,
      status: "error",
    });

    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
