"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Dashboard"
          description="Welcome to your CallPro dashboard"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* Welcome Card */}
          <div className="md:col-span-3 rounded-lg bg-white p-6 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Welcome, {session?.user?.name || session?.user?.email}!
            </h2>
            <p className="text-slate-600">
              You have successfully logged in to CallPro.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-200">
            <div className="text-sm font-medium text-slate-600">Active Calls</div>
            <div className="text-3xl font-bold text-slate-900 mt-2">0</div>
            <p className="text-xs text-slate-500 mt-2">No active calls</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-200">
            <div className="text-sm font-medium text-slate-600">Total Calls</div>
            <div className="text-3xl font-bold text-slate-900 mt-2">0</div>
            <p className="text-xs text-slate-500 mt-2">This month</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-200">
            <div className="text-sm font-medium text-slate-600">Avg Duration</div>
            <div className="text-3xl font-bold text-slate-900 mt-2">-</div>
            <p className="text-xs text-slate-500 mt-2">No data yet</p>
          </div>

          {/* Quick Actions */}
          <div className="md:col-span-3 rounded-lg bg-white p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <button className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors">
                Start Call
              </button>
              <button className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium rounded-lg transition-colors">
                View History
              </button>
              <button className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium rounded-lg transition-colors">
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
