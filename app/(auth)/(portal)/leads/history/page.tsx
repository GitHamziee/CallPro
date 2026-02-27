"use client";

import {
  Search,
  ChevronLeft,
  ChevronRight,
  FileText,
  CalendarDays,
  Clock,
} from "lucide-react";
import { useLeadHistory } from "@/hooks/useLeadHistory";
import { timeAgo } from "@/lib/format-utils";

export default function LeadHistoryPage() {
  const {
    leads,
    total,
    page,
    totalPages,
    search,
    loading,
    stats,
    setPage,
    setSearch,
  } = useLeadHistory();

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg md:text-xl font-bold text-slate-900">
          Lead History
        </h1>
        <p className="text-xs md:text-sm text-slate-500 mt-1">
          View and search all leads you have submitted.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
        <div className="rounded-xl border border-slate-200 bg-white p-3 md:p-5">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <div className="p-1.5 md:p-2 rounded-lg bg-blue-50">
              <FileText className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
            </div>
            <p className="text-[10px] md:text-sm font-medium text-slate-500">
              Total Leads
            </p>
          </div>
          <p className="text-lg md:text-2xl font-bold text-slate-900">
            {stats?.totalLeads ?? 0}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 md:p-5">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <div className="p-1.5 md:p-2 rounded-lg bg-brand-50">
              <CalendarDays className="h-4 w-4 md:h-5 md:w-5 text-brand-600" />
            </div>
            <p className="text-[10px] md:text-sm font-medium text-slate-500">
              This Month
            </p>
          </div>
          <p className="text-lg md:text-2xl font-bold text-slate-900">
            {stats?.leadsThisMonth ?? 0}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 md:p-5">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <div className="p-1.5 md:p-2 rounded-lg bg-emerald-50">
              <Clock className="h-4 w-4 md:h-5 md:w-5 text-emerald-600" />
            </div>
            <p className="text-[10px] md:text-sm font-medium text-slate-500">
              Today
            </p>
          </div>
          <p className="text-lg md:text-2xl font-bold text-slate-900">
            {stats?.leadsToday ?? 0}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-5">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
        </div>
      </div>

      {/* Leads table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        {loading ? (
          <div className="divide-y divide-slate-100">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-5 py-4 animate-pulse"
              >
                <div className="h-10 w-10 rounded-full bg-slate-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 rounded bg-slate-100" />
                  <div className="h-3 w-48 rounded bg-slate-50" />
                </div>
                <div className="h-6 w-20 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        ) : leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <FileText className="h-10 w-10 mb-3" />
            <p className="text-sm font-medium">No leads found</p>
            <p className="text-xs mt-1">
              {search
                ? "Try adjusting your search"
                : "Leads you submit will appear here"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">
                    Lead
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">
                    Phone
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3 hidden md:table-cell">
                    Zip
                  </th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-900">
                        {lead.name}
                      </p>
                      <p className="text-xs text-slate-500">{lead.email}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 hidden sm:table-cell">
                      {lead.phone}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 hidden md:table-cell">
                      {lead.zipCode}
                    </td>
                    <td className="px-5 py-4 text-right text-xs text-slate-400">
                      {timeAgo(lead.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50/30">
            <p className="text-xs text-slate-500">
              Page {page} of {totalPages} ({total} total)
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
