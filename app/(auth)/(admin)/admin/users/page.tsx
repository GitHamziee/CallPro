"use client";

import Link from "next/link";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Users,
  Shield,
  Headset,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { timeAgo, getInitials, getAvatarColor } from "@/lib/format-utils";

export default function AdminUsersPage() {
  const {
    users,
    total,
    page,
    totalPages,
    search,
    roleFilter,
    loading,
    admins,
    agents,
    withSubs,
    setPage,
    setSearch,
    setRoleFilter,
  } = useAdminUsers();

  return (
    <div className="mx-auto max-w-6xl">
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-slate-100 shrink-0">
            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-slate-900">{total}</p>
            <p className="text-[10px] sm:text-xs text-slate-500">Total Users</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-amber-50 shrink-0">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-slate-900">{admins}</p>
            <p className="text-[10px] sm:text-xs text-slate-500">Admins</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-blue-50 shrink-0">
            <Headset className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-slate-900">{agents}</p>
            <p className="text-[10px] sm:text-xs text-slate-500">Agents</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-brand-50 shrink-0">
            <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-brand-600" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-slate-900">{withSubs}</p>
            <p className="text-[10px] sm:text-xs text-slate-500">Active Subs</p>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 self-start">
          {[
            { label: "All", value: "" },
            { label: "Users", value: "USER" },
            { label: "Agents", value: "AGENT" },
            { label: "Admins", value: "ADMIN" },
          ].map((opt) => (
            <button
              key={opt.label}
              onClick={() => setRoleFilter(opt.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                roleFilter === opt.value
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* User list */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
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
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-slate-400">
            <Users className="h-10 w-10 mb-3" />
            <p className="text-sm font-medium">No users found</p>
            <p className="text-xs mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {users.map((user) => (
              <Link
                key={user.id}
                href={`/admin/users/${user.id}`}
                className="flex items-center gap-3 sm:gap-4 px-3 py-3 sm:px-5 sm:py-4 hover:bg-slate-50/70 transition-colors group"
              >
                {/* Avatar */}
                <div
                  className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full text-xs sm:text-sm font-semibold ${getAvatarColor(
                    user.id
                  )}`}
                >
                  {getInitials(user.name, user.email)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {user.name || "Unnamed User"}
                    </p>
                    {user.role === "ADMIN" && (
                      <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 shrink-0">
                        <Shield className="h-2.5 w-2.5" />
                        Admin
                      </span>
                    )}
                    {user.role === "AGENT" && (
                      <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 shrink-0">
                        <Headset className="h-2.5 w-2.5" />
                        Agent
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-slate-500 truncate">
                      {user.email}
                    </p>
                    {/* Mobile role badge */}
                    {user.role === "ADMIN" && (
                      <span className="sm:hidden inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-100 text-amber-700 shrink-0">
                        Admin
                      </span>
                    )}
                    {user.role === "AGENT" && (
                      <span className="sm:hidden inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-blue-100 text-blue-700 shrink-0">
                        Agent
                      </span>
                    )}
                  </div>
                </div>

                {/* Meta — desktop only */}
                <div className="hidden sm:flex items-center gap-3 shrink-0">
                  {user._count.assignedLeads > 0 && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">
                      {user._count.assignedLeads} lead
                      {user._count.assignedLeads !== 1 ? "s" : ""}
                    </span>
                  )}
                  {user._count.purchases > 0 && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 text-xs font-medium">
                      <CreditCard className="h-3 w-3" />
                      {user._count.purchases} sub
                      {user._count.purchases !== 1 ? "s" : ""}
                    </span>
                  )}
                  <span className="text-xs text-slate-400 w-16 text-right">
                    {timeAgo(user.createdAt)}
                  </span>
                </div>

                {/* Arrow */}
                <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-brand-500 transition-colors shrink-0" />
              </Link>
            ))}
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
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.max(1, p - 1));
                }}
                disabled={page === 1}
                className="flex items-center justify-center h-8 w-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-white hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.min(totalPages, p + 1));
                }}
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
