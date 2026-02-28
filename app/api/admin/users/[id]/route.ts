import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { requireAdmin, applyRateLimit } from "@/lib/api-utils";
import { validatePassword } from "@/lib/validation";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const [, authError] = await requireAdmin();
    if (authError) return authError;

    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        purchases: {
          select: {
            id: true,
            status: true,
            expiresAt: true,
            createdAt: true,
            package: {
              select: { name: true, price: true },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Admin user detail error:", error);
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
    const [session, authError] = await requireAdmin();
    if (authError) return authError;

    const rateLimited = applyRateLimit(`admin:${session.user.id}`, 60, 60 * 1000);
    if (rateLimited) return rateLimited;

    const { id } = await params;
    const body = await req.json();
    const { role, newPassword, cancelPurchaseId } = body;

    // --- Cancel subscription ---
    if (cancelPurchaseId) {
      const purchase = await prisma.purchase.findFirst({
        where: {
          id: cancelPurchaseId,
          userId: id,
          status: "ACTIVE",
          OR: [{ expiresAt: { gt: new Date() } }, { expiresAt: null }],
        },
      });

      if (!purchase) {
        return NextResponse.json(
          { error: "Active subscription not found" },
          { status: 404 }
        );
      }

      await prisma.purchase.update({
        where: { id: cancelPurchaseId },
        data: { status: "CANCELLED" },
      });

      return NextResponse.json({ message: "Subscription cancelled successfully" });
    }

    // --- Password change ---
    if (newPassword) {
      const passwordResult = validatePassword(newPassword);
      if (!passwordResult.valid) {
        return NextResponse.json(
          { error: passwordResult.error },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await prisma.user.update({
        where: { id },
        data: {
          password: hashedPassword,
          tokenVersion: { increment: 1 },
        },
      });

      return NextResponse.json({ message: "Password updated successfully" });
    }

    // --- Role change ---
    const validRoles = ["USER", "AGENT", "ADMIN"];
    if (role && !validRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Prevent admin from removing their own admin role
    if (id === session.user.id && role !== "ADMIN") {
      return NextResponse.json(
        { error: "Cannot remove your own admin role" },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(role && { role }),
        tokenVersion: { increment: 1 },
      },
      select: { id: true, name: true, email: true, role: true },
    });

    return NextResponse.json({ user, message: "User updated successfully" });
  } catch (error) {
    console.error("Admin user update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
