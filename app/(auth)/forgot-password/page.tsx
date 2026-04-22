import { notFound } from "next/navigation";
import { getSiteSettings } from "@/lib/site-settings";
import ForgotPasswordClient from "./ForgotPasswordClient";

export const dynamic = "force-dynamic";

export default async function ForgotPasswordPage() {
  const { hidePages } = await getSiteSettings();
  if (hidePages) notFound();

  return <ForgotPasswordClient />;
}
