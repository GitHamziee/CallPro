import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import {
  validateEmail,
  validatePassword,
  validateName,
  validatePhone,
  sanitizeInput,
} from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { US_STATE_MAP } from "@/lib/constants";

export async function POST(req: Request) {
  try {
    // Rate limit: 5 registrations per minute per IP
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const rl = rateLimit(`register:${ip}`, 5, 60 * 1000);
    if (!rl.success) {
      return NextResponse.json(
        { error: `Too many requests. Try again in ${rl.retryAfter}s.` },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, password, phone, licenseNo, brokerage, targetAreas, state, accountExecutive } = body;

    // Validate inputs
    const nameResult = validateName(name);
    if (!nameResult.valid) {
      return NextResponse.json({ error: nameResult.error }, { status: 400 });
    }

    const emailResult = validateEmail(email);
    if (!emailResult.valid) {
      return NextResponse.json({ error: emailResult.error }, { status: 400 });
    }

    const passwordResult = validatePassword(password);
    if (!passwordResult.valid) {
      return NextResponse.json(
        { error: passwordResult.error },
        { status: 400 }
      );
    }

    const phoneResult = validatePhone(phone);
    if (!phoneResult.valid) {
      return NextResponse.json({ error: phoneResult.error }, { status: 400 });
    }

    if (!targetAreas || typeof targetAreas !== "string" || !targetAreas.trim()) {
      return NextResponse.json({ error: "Target areas are required" }, { status: 400 });
    }

    if (!state || typeof state !== "string" || !US_STATE_MAP.has(state.trim().toUpperCase())) {
      return NextResponse.json({ error: "Please select a valid state" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const sanitizedName = sanitizeInput(name);

    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name: sanitizedName,
        email: normalizedEmail,
        password: hashed,
        phone: sanitizeInput(phone),
        licenseNo: licenseNo ? sanitizeInput(licenseNo) : null,
        brokerage: brokerage ? sanitizeInput(brokerage) : null,
        targetAreas: sanitizeInput(targetAreas),
        state: state.trim().toUpperCase(),
        accountExecutive: accountExecutive ? sanitizeInput(accountExecutive) : null,
      },
    });

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Registration error", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
