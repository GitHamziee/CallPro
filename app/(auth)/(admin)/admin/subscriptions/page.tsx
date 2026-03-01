"use client";

import Link from "next/link";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
} from "lucide-react";
import { useAdminSubscriptions } from "@/hooks/useAdminSubscriptions";
import { timeAgo, getInitials, getAvatarColor } from "@/lib/format-utils";

function resolveStatus(status: string, expiresAt: string | null) {
  if (status === "CANCELLED") return "CANCELLED";
  if (status === "EXPIRED") return "EXPIRED";
  if (status === "ACTIVE" && expiresAt && new Date(expiresAt) < new Date())
    return "EXPIRED";
  return "ACTIVE";
}

const STATUS_BADGE: Record<string, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-700",
  EXPIRED: "bg-amber-50 text-amber-600",
  CANCELLED: "bg-red-50 text-red-600",
};

export default function AdminSubscriptionsPage() {
  const {
    subscriptions,
    page,
    totalPages,
    search,
    statusFilter,
    loading,
    stats,
    setPage,
    setSearch,
    setStatusFilter,
  } = useAdminSubscriptions();

  return (
    <div className="mx-auto max-w-6xl">
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-slate-100 shrink-0">
            <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-slate-900">
              {stats.total}
            </p>
            <p className="text-[10px] sm:text-xs text-slate-500">Total</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-emerald-50 shrink-0">
            <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-slate-900">
              {stats.active}
            </p>
            <p className="text-[10px] sm:text-xs text-slate-500">Active</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-amber-50 shrink-0">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-slate-900">
              {stats.expired}
            </p>
            <p className="text-[10px] sm:text-xs text-slate-500">Expired</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-red-50 shrink-0">
            <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-slate-900">
              {stats.cancelled}
            </p>
            <p className="text-[10px] sm:text-xs text-slate-500">Cancelled</p>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or referral..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 self-start">
          {[
            { label: "All", value: "" },
            { label: "Active", value: "ACTIVE" },
            { label: "Expired", value: "EXPIRED" },
            { label: "Cancelled", value: "CANCELLED" },
          ].map((opt) => (
            <button
              key={opt.label}
              onClick={() => setStatusFilter(opt.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === opt.value
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Subscription list */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        {/* Table header — desktop */}
        <div className="hidden sm:grid grid-cols-[1fr_140px_100px_100px_90px] gap-3 px-5 py-2.5 border-b border-slate-200 bg-slate-50/50">
          <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            User
          </p>
          <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Package
          </p>
          <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Status
          </p>
          <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Referral
          </p>
          <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider text-right">
            Date
          </p>
        </div>

        {loading ? (
          <div className="divide-y divide-slate-100">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 sm:gap-4 px-3 py-3 sm:px-5 sm:py-4 animate-pulse"
              >
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-slate-100 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-28 sm:w-32 rounded bg-slate-100" />
                  <div className="h-3 w-40 sm:w-48 rounded bg-slate-50" />
                </div>
                <div className="h-6 w-14 sm:w-16 rounded-full bg-slate-100" />
              </div>
            ))}
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-slate-400">
            <CreditCard className="h-10 w-10 mb-3" />
            <p className="text-sm font-medium">No subscriptions found</p>
            <p className="text-xs mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {subscriptions.map((sub) => {
              const display = resolveStatus(sub.status, sub.expiresAt);
              return (
                <Link
                  key={sub.id}
                  href={`/admin/users/${sub.user.id}`}
                  className="flex items-center gap-3 sm:grid sm:grid-cols-[1fr_140px_100px_100px_90px] sm:gap-3 px-3 py-3 sm:px-5 sm:py-4 hover:bg-slate-50/70 transition-colors group"
                >
                  {/* User */}
                  <div className="flex items-center gap-3 min-w-0 flex-1 sm:flex-initial">
                    <div
                      className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full text-xs sm:text-sm font-semibold ${getAvatarColor(
                        sub.user.id
                      )}`}
                    >
                      {getInitials(sub.user.name, sub.user.email)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {sub.user.name || "Unnamed User"}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {sub.user.email}
                      </p>
                      {/* Mobile-only meta */}
                      <div className="flex items-center gap-1.5 mt-1 sm:hidden">
                        <span className="inline-flex px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 text-[9px] font-medium">
                          {sub.package.name}
                        </span>
                        <span
                          className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${STATUS_BADGE[display]}`}
                        >
                          {display}
                        </span>
                        {sub.user.accountExecutive && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-medium truncate max-w-[100px]">
                            <UserCheck className="h-2.5 w-2.5 shrink-0" />
                            {sub.user.accountExecutive}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Package — desktop */}
                  <div className="hidden sm:flex items-center">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 text-xs font-medium truncate">
                      {sub.package.name}
                    </span>
                  </div>

                  {/* Status — desktop */}
                  <div className="hidden sm:flex items-center">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${STATUS_BADGE[display]}`}
                    >
                      {display}
                    </span>
                  </div>

                  {/* Referral — desktop */}
                  <div className="hidden sm:flex items-center">
                    {sub.user.accountExecutive ? (
                      <span className="text-xs text-slate-700 font-medium truncate">
                        {sub.user.accountExecutive}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-300">—</span>
                    )}
                  </div>

                  {/* Date — desktop */}
                  <div className="hidden sm:flex items-center justify-end">
                    <span className="text-xs text-slate-400">
                      {timeAgo(sub.createdAt)}
                    </span>
                  </div>

                  {/* Date — mobile */}
                  <span className="text-xs text-slate-400 shrink-0 sm:hidden">
                    {timeAgo(sub.createdAt)}
                  </span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-3 py-2.5 sm:px-5 sm:py-3 border-t border-slate-100 bg-slate-50/30">
            <p className="text-xs text-slate-500">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center justify-center h-8 w-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-white hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center justify-center h-8 w-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-white hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
