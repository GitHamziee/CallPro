import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import {
  validateEmail,
  validatePassword,
  validateName,
  sanitizeInput,
} from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

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
    const { name, email, password } = body;

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
