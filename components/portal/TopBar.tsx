"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Menu, Shield } from "lucide-react";
import { useSidebar } from "./SidebarContext";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/packages": "Packages",
  "/settings": "Settings",
};

export default function TopBar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { toggle } = useSidebar();

  const pageTitle = PAGE_TITLES[pathname] || "Portal";
  const userName = session?.user?.name || "User";
  const userEmail = session?.user?.email || "";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/95 backdrop-blur-sm px-4 sm:px-6">
      {/* Mobile hamburger */}
      <button
        onClick={toggle}
        className="md:hidden p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Page title */}
      <h1 className="text-lg font-semibold text-slate-900">{pageTitle}</h1>

      {/* Spacer */}
      <div className="flex-1" />

      {/* User info */}
      <div className="flex items-center gap-3">
        {session?.user?.role === "ADMIN" && (
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
          >
            <Shield className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold hidden sm:inline">Admin</span>
          </Link>
        )}
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-slate-900 leading-tight">
            {userName}
          </p>
          <p className="text-xs text-slate-500 leading-tight">{userEmail}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-sm font-semibold">
          {initials}
        </div>
      </div>
    </header>
  );
}
