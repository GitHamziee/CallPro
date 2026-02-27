import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAgent, applyRateLimit } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  try {
    const [session, authError] = await requireAgent();
    if (authError) return authError;

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10")));

    const agentId = session.user.id;
    const search = searchParams.get("search")?.trim() || "";
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const where = {
      agentId,
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    const [leads, total, totalLeads, leadsThisMonth, leadsToday] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.lead.count({ where }),
      prisma.lead.count({ where: { agentId } }),
      prisma.lead.count({
        where: { agentId, createdAt: { gte: monthStart } },
      }),
      prisma.lead.count({
        where: { agentId, createdAt: { gte: todayStart } },
      }),
    ]);

    return NextResponse.json({
      leads,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      stats: {
        totalLeads,
        leadsThisMonth,
        leadsToday,
      },
    });
  } catch (error) {
    console.error("Leads list error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const [session, authError] = await requireAgent();
    if (authError) return authError;

    const rateLimited = applyRateLimit(`leads:${session.user.id}`, 30, 60 * 1000);
    if (rateLimited) return rateLimited;

    const body = await req.json();
    const { name, email, phone, zipCode } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim().length < 1) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!phone || typeof phone !== "string" || phone.trim().length < 5) {
      return NextResponse.json({ error: "Valid phone number is required" }, { status: 400 });
    }
    if (!zipCode || typeof zipCode !== "string" || zipCode.trim().length < 3) {
      return NextResponse.json({ error: "Valid zip code is required" }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        agentId: session.user.id,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        zipCode: zipCode.trim(),
      },
    });

    return NextResponse.json({ lead, message: "Lead submitted successfully" }, { status: 201 });
  } catch (error) {
    console.error("Lead creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
