"use client";

import { useSession } from "next-auth/react";
import { SidebarProvider } from "@/components/portal/SidebarContext";
import Sidebar from "@/components/portal/Sidebar";
import TopBar from "@/components/portal/TopBar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  // Show loading spinner while auth is being checked
  // (Middleware handles the actual redirect — this is a UX fallback)
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-brand-600 mx-auto mb-3" />
          <p className="text-sm text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-50">
        <Sidebar />

        {/* Main content area -- offset by sidebar width on desktop */}
        <div className="md:ml-60 flex flex-col min-h-screen">
          <TopBar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
