import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAgent, applyRateLimit } from "@/lib/api-utils";
import {
  validateEmail,
  validatePhone,
  validateZipCode,
  sanitizeInput,
} from "@/lib/validation";

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

    // Sanitize text input
    const cleanName = sanitizeInput(name || "");

    // Validate required fields
    if (cleanName.length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters" }, { status: 400 });
    }

    const emailResult = validateEmail(email);
    if (!emailResult.valid) {
      return NextResponse.json({ error: emailResult.error }, { status: 400 });
    }

    const phoneResult = validatePhone(phone);
    if (!phoneResult.valid) {
      return NextResponse.json({ error: phoneResult.error }, { status: 400 });
    }

    const zipResult = validateZipCode(zipCode);
    if (!zipResult.valid) {
      return NextResponse.json({ error: zipResult.error }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        agentId: session.user.id,
        name: cleanName,
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
