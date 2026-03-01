import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin, applyRateLimit } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  try {
    const [session, authError] = await requireAdmin();
    if (authError) return authError;

    const rateLimited = applyRateLimit(`admin-analytics:${session.user.id}`, 30, 60 * 1000);
    if (rateLimited) return rateLimited;

    const { searchParams } = new URL(req.url);
    const monthParam = searchParams.get("month"); // YYYY-MM

    const now = new Date();
    let year = now.getUTCFullYear();
    let month = now.getUTCMonth(); // 0-indexed

    if (monthParam && /^\d{4}-\d{2}$/.test(monthParam)) {
      const [y, m] = monthParam.split("-").map(Number);
      if (y >= 2020 && y <= 2100 && m >= 1 && m <= 12) {
        year = y;
        month = m - 1;
      }
    }

    const monthStart = new Date(Date.UTC(year, month, 1));
    const monthEnd = new Date(Date.UTC(year, month + 1, 1));
    const trendStart = new Date(Date.UTC(year, month - 11, 1));

    // All purchases = paid (created after Stripe checkout)
    const [totalRevenueData, monthPurchases, allPackages, trendData] =
      await Promise.all([
        // All-time revenue
        prisma.purchase.findMany({
          select: { package: { select: { price: true } } },
        }),
        // Selected month purchases with package info
        prisma.purchase.findMany({
          where: { createdAt: { gte: monthStart, lt: monthEnd } },
          select: { package: { select: { name: true, price: true } } },
        }),
        // All packages for breakdown (include inactive so historical sales still show)
        prisma.package.findMany({
          select: { name: true, price: true },
          orderBy: { sortOrder: "asc" },
        }),
        // Last 12 months for trend
        prisma.purchase.findMany({
          where: { createdAt: { gte: trendStart, lt: monthEnd } },
          select: {
            createdAt: true,
            package: { select: { price: true } },
          },
        }),
      ]);

    // Total all-time revenue
    const totalRevenue = totalRevenueData.reduce(
      (sum, p) => sum + p.package.price,
      0
    );

    // Month revenue + per-package breakdown
    const packageMap = new Map<string, { count: number; revenue: number }>();
    let monthRevenue = 0;

    for (const p of monthPurchases) {
      monthRevenue += p.package.price;
      const entry = packageMap.get(p.package.name);
      if (entry) {
        entry.count++;
        entry.revenue += p.package.price;
      } else {
        packageMap.set(p.package.name, { count: 1, revenue: p.package.price });
      }
    }

    // Include all active packages (even with 0 sales that month)
    const packages = allPackages.map((pkg) => ({
      name: pkg.name,
      price: pkg.price,
      count: packageMap.get(pkg.name)?.count ?? 0,
      revenue: packageMap.get(pkg.name)?.revenue ?? 0,
    }));

    // Build 12-month trend
    const trendMap = new Map<string, { revenue: number; sales: number }>();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(Date.UTC(year, month - i, 1));
      const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
      trendMap.set(key, { revenue: 0, sales: 0 });
    }

    for (const p of trendData) {
      const d = new Date(p.createdAt);
      const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
      const entry = trendMap.get(key);
      if (entry) {
        entry.revenue += p.package.price;
        entry.sales++;
      }
    }

    const trend = Array.from(trendMap.entries()).map(([m, d]) => ({
      month: m,
      ...d,
    }));

    return NextResponse.json({
      totalRevenue,
      monthRevenue,
      monthSales: monthPurchases.length,
      selectedMonth: `${year}-${String(month + 1).padStart(2, "0")}`,
      packages,
      trend,
    });
  } catch (error) {
    console.error("Admin analytics error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
