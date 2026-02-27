import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, applyRateLimit } from "@/lib/api-utils";
import { assignLeadToUser } from "@/lib/lead-utils";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const [session, authError] = await requireAdmin();
    if (authError) return authError;

    const rateLimited = applyRateLimit(
      `admin:${session.user.id}`,
      60,
      60 * 1000
    );
    if (rateLimited) return rateLimited;

    const { id } = await params;
    const { assignedToId } = await req.json();

    if (!assignedToId || typeof assignedToId !== "string") {
      return NextResponse.json(
        { error: "assignedToId is required" },
        { status: 400 }
      );
    }

    const result = await assignLeadToUser(id, assignedToId);
    if ("error" in result) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    return NextResponse.json({
      lead: result.lead,
      message: "Lead assigned successfully",
    });
  } catch (error) {
    console.error("Admin lead assign error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
