import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-utils";
import { getSubscribedUsers } from "@/lib/lead-utils";

export async function GET() {
  try {
    const [, authError] = await requireAdmin();
    if (authError) return authError;

    const users = await getSubscribedUsers();
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Subscribed users error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
