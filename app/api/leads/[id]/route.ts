import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAgent, applyRateLimit } from "@/lib/api-utils";
import { validateEmail, validatePhone, sanitizeInput } from "@/lib/validation";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const [session, authError] = await requireAgent();
    if (authError) return authError;

    const { id } = await params;

    const lead = await prisma.lead.findFirst({
      where: { id, agentId: session.user.id },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ lead });
  } catch (error) {
    console.error("Lead fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const [session, authError] = await requireAgent();
    if (authError) return authError;

    const rateLimited = applyRateLimit(`leads:${session.user.id}`, 30, 60 * 1000);
    if (rateLimited) return rateLimited;

    const { id } = await params;

    // Verify ownership and NEW status
    const existing = await prisma.lead.findFirst({
      where: { id, agentId: session.user.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    if (existing.status !== "NEW") {
      return NextResponse.json(
        { error: "Only leads with NEW status can be edited" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { leadType, name, phone, email, address, propertyType, bedsBaths, timeline, contractStatus, appointmentTime, notes } = body;

    // Validate lead type
    if (!leadType || !["Buyer", "Seller"].includes(leadType)) {
      return NextResponse.json({ error: "Lead type must be Buyer or Seller" }, { status: 400 });
    }

    const cleanName = sanitizeInput(name || "");
    if (cleanName.length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters" }, { status: 400 });
    }

    const phoneResult = validatePhone(phone);
    if (!phoneResult.valid) {
      return NextResponse.json({ error: phoneResult.error }, { status: 400 });
    }

    if (email && email.trim()) {
      const emailResult = validateEmail(email);
      if (!emailResult.valid) {
        return NextResponse.json({ error: emailResult.error }, { status: 400 });
      }
    }

    const cleanAddress = sanitizeInput(address || "");
    if (cleanAddress.length < 2) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }

    const cleanPropertyType = sanitizeInput(propertyType || "");
    if (!cleanPropertyType) {
      return NextResponse.json({ error: "Property type is required" }, { status: 400 });
    }

    const cleanBedsBaths = sanitizeInput(bedsBaths || "");
    if (!cleanBedsBaths) {
      return NextResponse.json({ error: "Beds and baths / acreage is required" }, { status: 400 });
    }

    const cleanTimeline = sanitizeInput(timeline || "");
    if (!cleanTimeline) {
      return NextResponse.json({ error: "Timeline is required" }, { status: 400 });
    }

    if (!contractStatus || !["Yes", "No"].includes(contractStatus)) {
      return NextResponse.json({ error: "Contract status must be Yes or No" }, { status: 400 });
    }

    const parsedAppointment = new Date(appointmentTime);
    if (!appointmentTime || isNaN(parsedAppointment.getTime())) {
      return NextResponse.json({ error: "Valid appointment time is required" }, { status: 400 });
    }

    const lead = await prisma.lead.update({
      where: { id },
      data: {
        leadType,
        name: cleanName,
        phone: phone.trim(),
        email: email?.trim().toLowerCase() || null,
        address: cleanAddress,
        propertyType: cleanPropertyType,
        bedsBaths: cleanBedsBaths,
        timeline: cleanTimeline,
        contractStatus,
        appointmentTime: parsedAppointment,
        notes: notes ? sanitizeInput(notes) : null,
      },
    });

    return NextResponse.json({ lead, message: "Lead updated successfully" });
  } catch (error) {
    console.error("Lead update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
