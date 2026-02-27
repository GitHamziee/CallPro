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
          <main className="flex-1 px-4 py-4 sm:px-6 sm:py-5">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
