import prisma from "@/lib/prisma";

/**
 * Gets the user's active purchase, lazily expiring it if expiresAt has passed.
 * This is the single source of truth for "does this user have an active subscription?"
 */
export async function getActivePurchase(userId: string) {
  const purchase = await prisma.purchase.findFirst({
    where: {
      userId,
      status: "ACTIVE",
    },
    select: {
      id: true,
      status: true,
      packageId: true,
      expiresAt: true,
      createdAt: true,
      package: {
        select: { name: true, price: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!purchase) return null;

  // Lazy expiration: if expiresAt is set and has passed, mark as EXPIRED
  if (purchase.expiresAt && new Date() > purchase.expiresAt) {
    await prisma.purchase.update({
      where: { id: purchase.id },
      data: { status: "EXPIRED" },
    });
    return null;
  }

  return purchase;
}

/**
 * Opportunistic batch cleanup: marks all overdue ACTIVE purchases as EXPIRED.
 * Call this from admin endpoints so stale records get cleaned up without cron jobs.
 * Uses updateMany — single query, no N+1 overhead.
 */
export async function expireStaleSubscriptions() {
  const result = await prisma.purchase.updateMany({
    where: {
      status: "ACTIVE",
      expiresAt: { lt: new Date() },
    },
    data: { status: "EXPIRED" },
  });
  return result.count;
}
