import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, applyRateLimit } from "@/lib/api-utils";
import { createInvoice } from "@/lib/invoice-utils";

export async function POST(req: NextRequest) {
  try {
    const [session, authError] = await requireAdmin();
    if (authError) return authError;

    const rateLimited = applyRateLimit(
      `admin-invoice:${session.user.id}`,
      60,
      60 * 1000
    );
    if (rateLimited) return rateLimited;

    const { leadId, amount, description } = await req.json();

    if (!leadId || typeof leadId !== "string") {
      return NextResponse.json(
        { error: "leadId is required" },
        { status: 400 }
      );
    }

    if (!amount || typeof amount !== "number") {
      return NextResponse.json(
        { error: "amount is required (in cents)" },
        { status: 400 }
      );
    }

    const result = await createInvoice(leadId, amount, description);

    if ("error" in result) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    return NextResponse.json({
      invoice: result.invoice,
      message: "Invoice created successfully",
    });
  } catch (error) {
    console.error("Admin create invoice error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
