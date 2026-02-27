import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Current month boundaries
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    // Run all queries in parallel
    const [
      totalUsers,
      newUsersThisMonth,
      totalAdmins,
      activeSubscriptions,
      subscriptionsThisMonth,
      recentUsers,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: { createdAt: { gte: monthStart } },
      }),
      prisma.user.count({
        where: { role: "ADMIN" },
      }),
      prisma.purchase.count({
        where: { status: "ACTIVE" },
      }),
      prisma.purchase.findMany({
        where: {
          status: "ACTIVE",
          createdAt: { gte: monthStart },
        },
        select: {
          package: { select: { price: true } },
        },
      }),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      }),
    ]);

    // Calculate revenue this month (sum of package prices for new subscriptions)
    const revenueThisMonth = subscriptionsThisMonth.reduce(
      (sum: number, p: { package: { price: number } }) => sum + p.package.price,
      0
    );

    return NextResponse.json({
      totalUsers,
      newUsersThisMonth,
      totalAdmins,
      activeSubscriptions,
      newSubscriptionsThisMonth: subscriptionsThisMonth.length,
      revenueThisMonth,
      recentUsers,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
