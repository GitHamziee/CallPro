"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { SidebarProvider } from "@/components/portal/SidebarContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopBar from "@/components/admin/AdminTopBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-slate-800 mx-auto mb-3" />
          <p className="text-sm text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect non-admin users
  if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-50">
        <AdminSidebar />
        <div className="md:ml-60 flex flex-col min-h-screen">
          <AdminTopBar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
