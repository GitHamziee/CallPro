import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    // Check if user already has an active purchase for this package
    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId: session.user.id,
        packageId: pkg.id,
        status: "ACTIVE",
      },
    });

    if (existingPurchase) {
      return NextResponse.json(
        { error: "You already have an active subscription for this package" },
        { status: 400 }
      );
    }

    // Create Stripe Checkout Session
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

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
      metadata: {
        userId: session.user.id,
        packageId: pkg.id,
      },
      customer_email: session.user.email || undefined,
      success_url: `${baseUrl}/dashboard?payment=success`,
      cancel_url: `${baseUrl}/packages?payment=cancelled`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
