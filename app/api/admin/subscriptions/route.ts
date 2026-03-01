import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin, applyRateLimit } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  try {
    const [session, authError] = await requireAdmin();
    if (authError) return authError;

    const rateLimited = applyRateLimit(`admin:${session.user.id}`, 60, 60 * 1000);
    if (rateLimited) return rateLimited;

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1") || 1);
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10") || 10));
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const now = new Date();

    // Build where clause
    const where: Record<string, unknown> = {};

    if (search) {
      where.user = {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { accountExecutive: { contains: search, mode: "insensitive" } },
        ],
      };
    }

    // Status filter — ACTIVE must also check expiry
    if (status === "ACTIVE") {
      where.status = "ACTIVE";
      where.OR = [{ expiresAt: { gt: now } }, { expiresAt: null }];
    } else if (status === "EXPIRED") {
      where.OR = [
        { status: "EXPIRED" },
        { status: "ACTIVE", expiresAt: { lte: now } },
      ];
    } else if (status === "CANCELLED") {
      where.status = "CANCELLED";
    }

    const [purchases, total, activeCount, expiredCount, cancelledCount] =
      await Promise.all([
        prisma.purchase.findMany({
          where,
          select: {
            id: true,
            status: true,
            expiresAt: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                accountExecutive: true,
              },
            },
            package: {
              select: { name: true, price: true },
            },
          },
          orderBy: { createdAt: "desc" },
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.purchase.count({ where }),
        prisma.purchase.count({
          where: {
            status: "ACTIVE",
            OR: [{ expiresAt: { gt: now } }, { expiresAt: null }],
          },
        }),
        prisma.purchase.count({
          where: {
            OR: [
              { status: "EXPIRED" },
              { status: "ACTIVE", expiresAt: { lte: now } },
            ],
          },
        }),
        prisma.purchase.count({ where: { status: "CANCELLED" } }),
      ]);

    const totalAll = activeCount + expiredCount + cancelledCount;

    return NextResponse.json({
      purchases,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      stats: { total: totalAll, active: activeCount, expired: expiredCount, cancelled: cancelledCount },
    });
  } catch (error) {
    console.error("Admin subscriptions list error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
