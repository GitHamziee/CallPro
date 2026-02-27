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
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10")));
    const search = searchParams.get("search") || "";
    const agentId = searchParams.get("agentId") || "";
    const status = searchParams.get("status") || "";

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search } },
      ];
    }

    if (agentId) {
      where.agentId = agentId;
    }

    if (["NEW", "PENDING", "ACCEPTED", "INVOICED", "PAID"].includes(status)) {
      where.status = status;
    }

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [leads, total, totalLeads, leadsThisMonth, newCount, pendingCount, acceptedCount, invoicedCount, paidCount] = await Promise.all([
      prisma.lead.findMany({
        where,
        include: {
          agent: { select: { id: true, name: true, email: true } },
          assignedTo: { select: { id: true, name: true, email: true } },
          invoice: { select: { id: true, amount: true, status: true, paidAt: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.lead.count({ where }),
      prisma.lead.count(),
      prisma.lead.count({ where: { createdAt: { gte: monthStart } } }),
      prisma.lead.count({ where: { status: "NEW" } }),
      prisma.lead.count({ where: { status: "PENDING" } }),
      prisma.lead.count({ where: { status: "ACCEPTED" } }),
      prisma.lead.count({ where: { status: "INVOICED" } }),
      prisma.lead.count({ where: { status: "PAID" } }),
    ]);

    return NextResponse.json({
      leads,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      stats: {
        totalLeads,
        leadsThisMonth,
        newCount,
        pendingCount,
        acceptedCount,
        invoicedCount,
        paidCount,
      },
    });
  } catch (error) {
    console.error("Admin leads list error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
