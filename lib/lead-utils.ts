import prisma from "@/lib/prisma";

/** Assign a lead to a subscribed user. Validates lead is NEW and user has active subscription. */
export async function assignLeadToUser(leadId: string, userId: string) {
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) return { error: "Lead not found", status: 404 };
  if (lead.status !== "NEW")
    return { error: "Lead is not available for assignment", status: 400 };

  // Verify target user exists, is USER role, and has active subscription
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      role: true,
      name: true,
      email: true,
      purchases: {
        where: {
          status: "ACTIVE",
          OR: [{ expiresAt: { gt: new Date() } }, { expiresAt: null }],
        },
        take: 1,
      },
    },
  });

  if (!user || user.role !== "USER")
    return { error: "User not found", status: 400 };
  if (user.purchases.length === 0)
    return { error: "User does not have an active subscription", status: 400 };

  // Atomic update — only succeeds if lead is still NEW (prevents double-assign race)
  const updated = await prisma.lead.update({
    where: { id: leadId, status: "NEW" },
    data: { assignedToId: userId, status: "PENDING" },
    include: {
      agent: { select: { id: true, name: true, email: true } },
      assignedTo: { select: { id: true, name: true, email: true } },
    },
  });

  if (!updated)
    return { error: "Lead was already assigned", status: 409 };

  return { lead: updated };
}

/** User accepts a lead assigned to them. */
export async function acceptLead(leadId: string, userId: string) {
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) return { error: "Lead not found", status: 404 };
  if (lead.assignedToId !== userId)
    return { error: "Lead is not assigned to you", status: 403 };
  if (lead.status !== "PENDING")
    return { error: "Lead is not pending", status: 400 };

  const updated = await prisma.lead.update({
    where: { id: leadId, status: "PENDING", assignedToId: userId },
    data: { status: "ACCEPTED" },
  });

  return { lead: updated };
}

/** User declines a lead — resets to NEW and clears assignment. */
export async function declineLead(leadId: string, userId: string) {
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) return { error: "Lead not found", status: 404 };
  if (lead.assignedToId !== userId)
    return { error: "Lead is not assigned to you", status: 403 };
  if (lead.status !== "PENDING")
    return { error: "Lead is not pending", status: 400 };

  const updated = await prisma.lead.update({
    where: { id: leadId, status: "PENDING", assignedToId: userId },
    data: { status: "NEW", assignedToId: null },
  });

  return { lead: updated };
}

/** Fetch users with active subscriptions for admin assign dropdown. */
export async function getSubscribedUsers() {
  return prisma.user.findMany({
    where: {
      role: "USER",
      purchases: {
        some: {
          status: "ACTIVE",
          OR: [{ expiresAt: { gt: new Date() } }, { expiresAt: null }],
        },
      },
    },
    select: { id: true, name: true, email: true },
    orderBy: { name: "asc" },
    take: 200,
  });
}
