"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { PhoneCall, Users, Package, LogOut, X, ArrowLeft, ShieldCheck, FileText } from "lucide-react";
import { useSidebar } from "@/components/portal/SidebarContext";

const NAV_ITEMS = [
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Roles", href: "/admin/roles", icon: ShieldCheck },
  { label: "Leads", href: "/admin/leads", icon: FileText },
  { label: "Packages", href: "/admin/packages", icon: Package },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();

  const sidebarContent = (
    <div className="flex h-full flex-col bg-slate-900">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 px-6 border-b border-slate-700/50">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 shadow-sm">
          <PhoneCall className="h-4 w-4 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-white leading-tight">
            Call<span className="text-brand-400">Pro</span>
          </span>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Admin
          </span>
        </div>
        <button
          onClick={close}
          className="ml-auto md:hidden p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-slate-700/60 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 border-t border-slate-700/50 space-y-1">
        <Link
          href="/dashboard?portal"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Portal
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:z-30 md:flex md:w-38">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 md:hidden"
            onClick={close}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-38 md:hidden">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
