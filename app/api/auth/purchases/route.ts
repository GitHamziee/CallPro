import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the user's most recent active purchase
    const purchase = await prisma.purchase.findFirst({
      where: {
        userId: session.user.id,
        status: "ACTIVE",
      },
      select: {
        id: true,
        status: true,
        packageId: true,
        createdAt: true,
        package: {
          select: { name: true, price: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ purchase });
  } catch (error) {
    console.error("Purchases error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
