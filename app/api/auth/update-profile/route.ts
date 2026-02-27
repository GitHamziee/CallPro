import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { validateEmail, validateName, sanitizeInput } from "@/lib/validation";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, email } = await req.json();

    // Validate inputs
    if (name !== undefined) {
      const nameResult = validateName(name);
      if (!nameResult.valid) {
        return NextResponse.json({ error: nameResult.error }, { status: 400 });
      }
    }

    if (email !== undefined) {
      const emailResult = validateEmail(email);
      if (!emailResult.valid) {
        return NextResponse.json(
          { error: emailResult.error },
          { status: 400 }
        );
      }
    }

    const normalizedEmail = email
      ? email.toLowerCase().trim()
      : undefined;

    // Check if email is already taken by another user
    if (normalizedEmail && normalizedEmail !== session.user.email) {
      const existing = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });

      if (existing) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 409 }
        );
      }
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(name !== undefined && { name: sanitizeInput(name) }),
        ...(normalizedEmail && { email: normalizedEmail }),
      },
      select: { id: true, name: true, email: true, role: true },
    });

    return NextResponse.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
