import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { getActivePurchase } from "@/lib/purchase-utils";
import { requireAuth, applyRateLimit } from "@/lib/api-utils";
import { logStripeEvent } from "@/lib/stripe-logger";
import Stripe from "stripe";

export async function POST(req: Request) {
  let userId: string | undefined;

  try {
    const [session, authError] = await requireAuth();
    if (authError) return authError;

    userId = session.user.id;

    const rateLimited = applyRateLimit(`checkout:${userId}`, 10, 60 * 1000);
    if (rateLimited) return rateLimited;

    const { packageId } = await req.json();

    if (!packageId) {
      return NextResponse.json(
        { error: "Package ID is required" },
        { status: 400 }
      );
    }

    // Look up the package
    const pkg = await prisma.package.findUnique({
      where: { id: packageId },
    });

    if (!pkg || !pkg.isActive) {
      return NextResponse.json(
        { error: "Package not found or inactive" },
        { status: 404 }
      );
    }

    if (pkg.price === 0) {
      return NextResponse.json(
        { error: "Contact sales for Enterprise pricing" },
        { status: 400 }
      );
    }

    // Block checkout if user already has any active (non-expired) subscription
    const activePurchase = await getActivePurchase(userId);

    if (activePurchase) {
      return NextResponse.json(
        { error: "You already have an active subscription. Wait for it to expire or contact support to switch plans." },
        { status: 400 }
      );
    }

    // Create Stripe Checkout Session
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const requestMetadata = { userId, packageId: pkg.id };

    const checkoutSession = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `CallPro ${pkg.name} Plan`,
              description: pkg.description || undefined,
            },
            unit_amount: pkg.price,
          },
          quantity: 1,
        },
      ],
      metadata: requestMetadata,
      customer_email: session.user.email || undefined,
      success_url: `${baseUrl}/dashboard?payment=success`,
      cancel_url: `${baseUrl}/packages?payment=cancelled`,
    });

    await logStripeEvent({
      event: "checkout.create",
      sessionId: checkoutSession.id,
      userId,
      metadata: requestMetadata,
      response: { url: checkoutSession.url, id: checkoutSession.id },
      status: "success",
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    await logStripeEvent({
      event: "checkout.create",
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
