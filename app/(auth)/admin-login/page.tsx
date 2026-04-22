import type { Metadata } from "next";
import { Suspense } from "react";
import LoginClient from "../login/LoginClient";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

// Un-gated login entry for admins — remains reachable even when Hide Pages is on,
// so the toggle can't lock staff out of the portal.
export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginClient />
    </Suspense>
  );
}
