import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser, applyRateLimit } from "@/lib/api-utils";
import { acceptLead, declineLead } from "@/lib/lead-utils";

export async function GET(req: NextRequest) {
  try {
    const [session, authError] = await requireUser();
    if (authError) return authError;

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10")));
    const status = searchParams.get("status") || "";

    const where: Record<string, unknown> = {
      assignedToId: session.user.id,
    };

    if (["PENDING", "ACCEPTED", "INVOICED", "PAID"].includes(status)) {
      where.status = status;
    } else {
      where.status = { in: ["PENDING", "ACCEPTED", "INVOICED", "PAID"] };
    }

    const [leads, total, pendingCount, acceptedCount, invoicedCount, paidCount] = await Promise.all([
      prisma.lead.findMany({
        where,
        include: {
          agent: { select: { id: true, name: true, email: true } },
          invoice: { select: { id: true, amount: true, status: true, description: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.lead.count({ where }),
      prisma.lead.count({
        where: { assignedToId: session.user.id, status: "PENDING" },
      }),
      prisma.lead.count({
        where: { assignedToId: session.user.id, status: "ACCEPTED" },
      }),
      prisma.lead.count({
        where: { assignedToId: session.user.id, status: "INVOICED" },
      }),
      prisma.lead.count({
        where: { assignedToId: session.user.id, status: "PAID" },
      }),
    ]);

    return NextResponse.json({
      leads,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      stats: { pendingCount, acceptedCount, invoicedCount, paidCount },
    });
  } catch (error) {
    console.error("My leads error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const [session, authError] = await requireUser();
    if (authError) return authError;

    const rateLimited = applyRateLimit(
      `my-leads:${session.user.id}`,
      30,
      60 * 1000
    );
    if (rateLimited) return rateLimited;

    const { leadId, action } = await req.json();

    if (!leadId || !action) {
      return NextResponse.json(
        { error: "leadId and action are required" },
        { status: 400 }
      );
    }

    if (action === "accept") {
      const result = await acceptLead(leadId, session.user.id);
      if ("error" in result) {
        return NextResponse.json(
          { error: result.error },
          { status: result.status }
        );
      }
      return NextResponse.json({ lead: result.lead, message: "Lead accepted" });
    }

    if (action === "decline") {
      const result = await declineLead(leadId, session.user.id);
      if ("error" in result) {
        return NextResponse.json(
          { error: result.error },
          { status: result.status }
        );
      }
      return NextResponse.json({ lead: result.lead, message: "Lead declined" });
    }

    return NextResponse.json(
      { error: "Invalid action. Use 'accept' or 'decline'" },
      { status: 400 }
    );
  } catch (error) {
    console.error("My leads action error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
