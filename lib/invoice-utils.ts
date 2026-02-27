import prisma from "@/lib/prisma";

/** Admin creates an invoice for an ACCEPTED lead. */
export async function createInvoice(
  leadId: string,
  amount: number,
  description?: string
) {
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    include: { invoice: true },
  });

  if (!lead) return { error: "Lead not found", status: 404 };
  if (lead.status !== "ACCEPTED")
    return { error: "Lead must be accepted before invoicing", status: 400 };
  if (lead.invoice)
    return { error: "Invoice already exists for this lead", status: 400 };
  if (!amount || amount < 100)
    return { error: "Amount must be at least $1.00", status: 400 };
  if (amount > 10000000)
    return { error: "Amount cannot exceed $100,000", status: 400 };

  const trimmedDesc = description?.slice(0, 500) || null;

  const invoice = await prisma.$transaction(async (tx) => {
    const inv = await tx.invoice.create({
      data: { leadId, amount, description: trimmedDesc },
    });
    await tx.lead.update({
      where: { id: leadId },
      data: { status: "INVOICED" },
    });
    return inv;
  });

  return { invoice };
}

/** Webhook marks invoice as paid after Stripe checkout completes. */
export async function markInvoicePaid(
  invoiceId: string,
  stripeSessionId: string
) {
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
  });

  if (!invoice) return { error: "Invoice not found", status: 404 };
  if (invoice.status === "PAID")
    return { error: "Invoice already paid", status: 400 };

  const updated = await prisma.$transaction(async (tx) => {
    const inv = await tx.invoice.update({
      where: { id: invoiceId },
      data: { status: "PAID", stripeSessionId, paidAt: new Date() },
    });
    await tx.lead.update({
      where: { id: invoice.leadId },
      data: { status: "PAID" },
    });
    return inv;
  });

  return { invoice: updated };
}
