"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Redirect authenticated users away from login/register
    if (status === "authenticated" && session?.user) {
      if (pathname === "/login" || pathname === "/register") {
        router.push("/dashboard");
      }
    }
  }, [session, status, router, pathname]);

  return <>{children}</>;
}
