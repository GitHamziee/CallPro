import { NextResponse } from "next/server";
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
