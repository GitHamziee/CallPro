import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin, applyRateLimit } from "@/lib/api-utils";
import { resolveContactEmail, SITE_SETTINGS_TAG } from "@/lib/site-settings";

export async function GET() {
  try {
    const [session, authError] = await requireAdmin();
    if (authError) return authError;

    const rateLimited = applyRateLimit(`admin:${session.user.id}`, 60, 60 * 1000);
    if (rateLimited) return rateLimited;

    const row = await prisma.siteSettings.upsert({
      where: { id: "singleton" },
      update: {},
      create: { id: "singleton" },
      select: { hidePages: true, updatedAt: true },
    });

    return NextResponse.json({
      settings: {
        hidePages: row.hidePages,
        contactEmail: resolveContactEmail(row.hidePages),
        updatedAt: row.updatedAt,
      },
    });
  } catch (error) {
    console.error("Admin settings fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const [session, authError] = await requireAdmin();
    if (authError) return authError;

    const rateLimited = applyRateLimit(`admin:${session.user.id}`, 30, 60 * 1000);
    if (rateLimited) return rateLimited;

    const { hidePages } = await req.json();

    if (typeof hidePages !== "boolean") {
      return NextResponse.json({ error: "hidePages must be a boolean" }, { status: 400 });
    }

    const row = await prisma.siteSettings.upsert({
      where: { id: "singleton" },
      update: { hidePages },
      create: { id: "singleton", hidePages },
      select: { hidePages: true, updatedAt: true },
    });

    revalidateTag(SITE_SETTINGS_TAG);

    return NextResponse.json({
      settings: {
        hidePages: row.hidePages,
        contactEmail: resolveContactEmail(row.hidePages),
        updatedAt: row.updatedAt,
      },
    });
  } catch (error) {
    console.error("Admin settings update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
