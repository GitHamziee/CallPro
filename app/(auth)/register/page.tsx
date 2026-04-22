import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getSiteSettings } from "@/lib/site-settings";
import RegisterClient from "./RegisterClient";

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  const { hidePages } = await getSiteSettings();
  if (hidePages) notFound();

  return (
    <Suspense>
      <RegisterClient />
    </Suspense>
  );
}
