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
