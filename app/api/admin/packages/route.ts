import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin, applyRateLimit } from "@/lib/api-utils";

export async function GET() {
  try {
    const [session, authError] = await requireAdmin();
    if (authError) return authError;

    const rateLimited = applyRateLimit(`admin:${session.user.id}`, 60, 60 * 1000);
    if (rateLimited) return rateLimited;

    const packages = await prisma.package.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        isActive: true,
        sortOrder: true,
        _count: {
          select: {
            purchases: {
              where: {
                status: "ACTIVE",
                OR: [
                  { expiresAt: { gt: new Date() } },
                  { expiresAt: null },
                ],
              },
            },
          },
        },
      },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({ packages });
  } catch (error) {
    console.error("Admin packages list error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const [session, authError] = await requireAdmin();
    if (authError) return authError;

    const rateLimited = applyRateLimit(`admin:${session.user.id}`, 30, 60 * 1000);
    if (rateLimited) return rateLimited;

    const { id, price } = await req.json();

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Package ID is required" }, { status: 400 });
    }

    if (typeof price !== "number" || !Number.isInteger(price) || price < 1) {
      return NextResponse.json({ error: "Price must be a positive integer (cents)" }, { status: 400 });
    }

    const existing = await prisma.package.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    const updated = await prisma.package.update({
      where: { id },
      data: { price },
      select: { id: true, name: true, price: true },
    });

    return NextResponse.json({ package: updated });
  } catch (error) {
    console.error("Admin package update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
