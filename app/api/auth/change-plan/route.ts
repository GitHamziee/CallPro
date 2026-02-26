import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { PRICING_PLANS } from "@/lib/constants";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { plan } = await req.json();

    if (!plan) {
      return NextResponse.json(
        { message: "Plan is required" },
        { status: 400 }
      );
    }

    // Validate plan exists
    const validPlan = PRICING_PLANS.find((p) => p.name === plan);
    if (!validPlan) {
      return NextResponse.json(
        { message: "Invalid plan selected" },
        { status: 400 }
      );
    }

    // Update user plan
    await prisma.user.update({
      where: { email: session.user.email },
      data: { plan },
    });

    return NextResponse.json({
      message: "Plan updated successfully",
      plan,
    });
  } catch (error) {
    console.error("Plan change error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
