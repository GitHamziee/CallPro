import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getSiteSettings } from "@/lib/site-settings";
import ResetPasswordClient from "./ResetPasswordClient";

export const dynamic = "force-dynamic";

export default async function ResetPasswordPage() {
  const { hidePages } = await getSiteSettings();
  if (hidePages) notFound();

  return (
    <Suspense>
      <ResetPasswordClient />
    </Suspense>
  );
}
