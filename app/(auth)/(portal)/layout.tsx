"use client";

import { SidebarProvider } from "@/components/portal/SidebarContext";
import Sidebar from "@/components/portal/Sidebar";
import TopBar from "@/components/portal/TopBar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Middleware already protects these routes — no need to block rendering
  // while useSession() resolves. This prevents loading flashes on tab navigation.
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-50">
        <Sidebar />

        {/* Main content area -- offset by sidebar width on desktop */}
        <div className="md:ml-38 flex flex-col min-h-screen">
          <TopBar />
          <main className="flex-1 px-3 py-2 sm:px-4 sm:py-3">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
