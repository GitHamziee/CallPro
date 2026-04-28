import { cache } from "react";
import { unstable_cache } from "next/cache";
import prisma from "./prisma";

export const EMAIL_WHEN_VISIBLE = "info@r4referral.com";
export const EMAIL_WHEN_HIDDEN = "R4referral@gmail.com";

export const SITE_SETTINGS_TAG = "site-settings";

export type SiteSettings = {
  hidePages: boolean;
  contactEmail: string;
};

const fetchSettingsFromDb = unstable_cache(
  async (): Promise<SiteSettings> => {
    const row = await prisma.siteSettings.upsert({
      where: { id: "singleton" },
      update: {},
      create: { id: "singleton" },
      select: { hidePages: true },
    });

    return {
      hidePages: row.hidePages,
      contactEmail: row.hidePages ? EMAIL_WHEN_HIDDEN : EMAIL_WHEN_VISIBLE,
    };
  },
  ["site-settings:v1"],
  { tags: [SITE_SETTINGS_TAG], revalidate: 300 }
);

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  try {
    return await fetchSettingsFromDb();
  } catch {
    // DB unreachable (e.g. during static build without DATABASE_URL) — use safe defaults.
    return {
      hidePages: true,
      contactEmail: EMAIL_WHEN_HIDDEN,
    };
  }
});

export function resolveContactEmail(hidePages: boolean): string {
  return hidePages ? EMAIL_WHEN_HIDDEN : EMAIL_WHEN_VISIBLE;
}
