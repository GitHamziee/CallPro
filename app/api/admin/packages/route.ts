import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

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
