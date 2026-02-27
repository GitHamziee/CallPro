"use client";

import {
  Clock,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Headset,
  Check,
  XCircle,
  CreditCard,
  DollarSign,
} from "lucide-react";
import { useMyLeads } from "@/hooks/useMyLeads";
import { timeAgo, LEAD_STATUS_BADGES } from "@/lib/format-utils";

export default function MyLeadsPage() {
  const {
    leads,
    total,
    page,
    totalPages,
    statusFilter,
    stats,
    loading,
    acting,
    error,
    setPage,
    setStatusFilter,
    handleAction,
    handlePayInvoice,
  } = useMyLeads();

  return (
    <div className="mx-auto max-w-5xl">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
            <Clock className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-900">
              {stats?.pendingCount ?? 0}
            </p>
            <p className="text-xs text-slate-500">Pending</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-900">
              {stats?.acceptedCount ?? 0}
            </p>
            <p className="text-xs text-slate-500">Accepted</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
            <CreditCard className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-900">
              {stats?.invoicedCount ?? 0}
            </p>
            <p className="text-xs text-slate-500">Invoiced</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
            <DollarSign className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-900">
              {stats?.paidCount ?? 0}
            </p>
            <p className="text-xs text-slate-500">Paid</p>
          </div>
        </div>
      </div>

      {/* Status filter pills */}
      <div className="flex items-center gap-1 mb-5 rounded-xl border border-slate-200 bg-white p-1 w-fit">
        {[
          { label: "All", value: "" },
          { label: "Pending", value: "PENDING" },
          { label: "Accepted", value: "ACCEPTED" },
          { label: "Invoiced", value: "INVOICED" },
          { label: "Paid", value: "PAID" },
        ].map((opt) => (
          <button
            key={opt.value}
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

      {/* Error */}
      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 text-red-700 text-sm font-medium border border-red-200">
          {error}
        </div>
      )}

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
            <Inbox className="h-10 w-10 mb-3" />
            <p className="text-sm font-medium">No leads yet</p>
            <p className="text-xs mt-1">
              Leads assigned to you will appear here
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
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3 hidden lg:table-cell">
                    Agent
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">
                    Status
                  </th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">
                    Actions
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
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                        <Headset className="h-3 w-3" />
                        {lead.agent.name || lead.agent.email}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                          LEAD_STATUS_BADGES[lead.status] ||
                          LEAD_STATUS_BADGES.PENDING
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      {lead.status === "PENDING" ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleAction(lead.id, "accept")}
                            disabled={acting !== null}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors disabled:opacity-50"
                          >
                            {acting === lead.id ? (
                              <div className="animate-spin rounded-full h-3 w-3 border-2 border-emerald-200 border-t-emerald-600" />
                            ) : (
                              <Check className="h-3 w-3" />
                            )}
                            Accept
                          </button>
                          <button
                            onClick={() => handleAction(lead.id, "decline")}
                            disabled={acting !== null}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                          >
                            <XCircle className="h-3 w-3" />
                            Decline
                          </button>
                        </div>
                      ) : lead.status === "INVOICED" && lead.invoice ? (
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-sm font-medium text-slate-700">
                            ${(lead.invoice.amount / 100).toFixed(2)}
                          </span>
                          <button
                            onClick={() => handlePayInvoice(lead.invoice!.id)}
                            disabled={acting !== null}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors disabled:opacity-50"
                          >
                            {acting === lead.invoice.id ? (
                              <div className="animate-spin rounded-full h-3 w-3 border-2 border-blue-200 border-t-blue-600" />
                            ) : (
                              <CreditCard className="h-3 w-3" />
                            )}
                            Pay
                          </button>
                        </div>
                      ) : lead.status === "PAID" ? (
                        <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
                          <CheckCircle className="h-3 w-3" />
                          Paid
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">
                          {timeAgo(lead.createdAt)}
                        </span>
                      )}
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
