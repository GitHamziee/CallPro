import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { requireUser, applyRateLimit } from "@/lib/api-utils";
import { logStripeEvent } from "@/lib/stripe-logger";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  let userId: string | undefined;

  try {
    const [session, authError] = await requireUser();
    if (authError) return authError;

    userId = session.user.id;

    const rateLimited = applyRateLimit(
      `invoice-checkout:${userId}`,
      10,
      60 * 1000
    );
    if (rateLimited) return rateLimited;

    const { invoiceId } = await req.json();

    if (!invoiceId) {
      return NextResponse.json(
        { error: "invoiceId is required" },
        { status: 400 }
      );
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: {
        lead: {
          select: { id: true, assignedToId: true, name: true, status: true },
        },
      },
    });

    if (!invoice) {
      return NextResponse.json(
        { error: "Invoice not found" },
        { status: 404 }
      );
    }

    if (invoice.lead.assignedToId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (invoice.status === "PAID") {
      return NextResponse.json(
        { error: "Invoice is already paid" },
        { status: 400 }
      );
    }

    if (invoice.lead.status !== "INVOICED") {
      return NextResponse.json(
        { error: "Lead is no longer in invoiced state" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const requestMetadata = {
      type: "invoice" as const,
      invoiceId: invoice.id,
      userId,
    };

    const checkoutSession = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Invoice for Lead: ${invoice.lead.name}`,
              description: invoice.description || undefined,
            },
            unit_amount: invoice.amount,
          },
          quantity: 1,
        },
      ],
      metadata: requestMetadata,
      customer_email: session.user.email || undefined,
      success_url: `${baseUrl}/my-leads?payment=success`,
      cancel_url: `${baseUrl}/my-leads?payment=cancelled`,
    });

    await logStripeEvent({
      event: "invoice-checkout.create",
      sessionId: checkoutSession.id,
      userId,
      metadata: requestMetadata,
      response: { url: checkoutSession.url, id: checkoutSession.id },
      status: "success",
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Invoice checkout error:", error);

    await logStripeEvent({
      event: "invoice-checkout.create",
      userId,
      errorObj: error,
      status: "error",
    });

    if (error instanceof Stripe.errors.StripeAuthenticationError) {
      return NextResponse.json(
        { error: "Payment service misconfigured" },
        { status: 500 }
      );
    }
    if (error instanceof Stripe.errors.StripeConnectionError) {
      return NextResponse.json(
        { error: "Payment service temporarily unavailable, please try again" },
        { status: 503 }
      );
    }
    if (error instanceof Stripe.errors.StripeRateLimitError) {
      return NextResponse.json(
        { error: "Too many requests, please try again shortly" },
        { status: 429 }
      );
    }
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: "Payment processing failed" },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
