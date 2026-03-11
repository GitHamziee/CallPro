import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    // Custom package requires auth — prevent info leak via guessed userId
    if (userId) {
      const session = await getServerSession(authOptions);
      if (!session?.user?.id || (session.user.id !== userId && session.user.role !== "ADMIN")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    // Standard packages (exclude custom)
    const packages = await prisma.package.findMany({
      where: { isActive: true, isCustom: false },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        features: true,
        sortOrder: true,
      },
      orderBy: { sortOrder: "asc" },
    });

    // If userId provided, also fetch their custom package
    let customPackage = null;
    if (userId) {
      customPackage = await prisma.package.findFirst({
        where: { assignedUserId: userId, isCustom: true, isActive: true },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          features: true,
          durationDays: true,
          type: true,
        },
      });
    }

    return NextResponse.json({ packages, customPackage });
  } catch (error) {
    console.error("Packages list error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
