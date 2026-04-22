import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getSiteSettings } from "@/lib/site-settings";
import LoginClient from "./LoginClient";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const { hidePages } = await getSiteSettings();
  if (hidePages) notFound();

  return (
    <Suspense>
      <LoginClient />
    </Suspense>
  );
}
