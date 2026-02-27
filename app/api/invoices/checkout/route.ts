import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { requireUser, applyRateLimit } from "@/lib/api-utils";

export async function POST(req: NextRequest) {
  try {
    const [session, authError] = await requireUser();
    if (authError) return authError;

    const rateLimited = applyRateLimit(
      `invoice-checkout:${session.user.id}`,
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

    if (invoice.lead.assignedToId !== session.user.id) {
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
      metadata: {
        type: "invoice",
        invoiceId: invoice.id,
        userId: session.user.id,
      },
      customer_email: session.user.email || undefined,
      success_url: `${baseUrl}/my-leads?payment=success`,
      cancel_url: `${baseUrl}/my-leads?payment=cancelled`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Invoice checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
