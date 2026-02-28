"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Menu } from "lucide-react";
import { useSidebar } from "@/components/portal/SidebarContext";

const PAGE_TITLES: Record<string, string> = {
  "/admin": "Admin Dashboard",
  "/admin/users": "User Management",
  "/admin/leads": "Lead Management",
  "/admin/packages": "Package Management",
};

export default function AdminTopBar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { toggle } = useSidebar();

  // Match exact or prefix for dynamic routes like /admin/users/[id]
  const pageTitle =
    PAGE_TITLES[pathname] ||
    (pathname.startsWith("/admin/users/") ? "User Details" : "Admin");

  const userName = session?.user?.name || "Admin";
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
      <h1 className="text-sm sm:text-lg font-semibold text-slate-900">{pageTitle}</h1>

      {/* Spacer */}
      <div className="flex-1" />

      {/* User info */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-700 hidden sm:block">{userName}</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-white text-sm font-semibold">
          {initials}
        </div>
      </div>
    </header>
  );
}
