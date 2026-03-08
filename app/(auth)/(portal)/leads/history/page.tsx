"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  FileText,
  CalendarDays,
  Clock,
  Pencil,
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Home,
  CheckCircle,
  Calendar,
} from "lucide-react";
import { useLeadHistory, type HistoryLead } from "@/hooks/useLeadHistory";
import { timeAgo, LEAD_STATUS_BADGES } from "@/lib/format-utils";

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

  const [selectedLead, setSelectedLead] = useState<HistoryLead | null>(null);

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
          Lead History
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          View and search all leads you have submitted.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 md:p-5">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <div className="p-1.5 md:p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <FileText className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
            </div>
            <p className="text-[10px] md:text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Leads
            </p>
          </div>
          <p className="text-lg md:text-2xl font-bold text-slate-900 dark:text-white">
            {stats?.totalLeads ?? 0}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 md:p-5">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <div className="p-1.5 md:p-2 rounded-lg bg-brand-50 dark:bg-brand-900/30">
              <CalendarDays className="h-4 w-4 md:h-5 md:w-5 text-brand-600" />
            </div>
            <p className="text-[10px] md:text-sm font-medium text-slate-500 dark:text-slate-400">
              This Month
            </p>
          </div>
          <p className="text-lg md:text-2xl font-bold text-slate-900 dark:text-white">
            {stats?.leadsThisMonth ?? 0}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 md:p-5">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <div className="p-1.5 md:p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/30">
              <Clock className="h-4 w-4 md:h-5 md:w-5 text-emerald-600" />
            </div>
            <p className="text-[10px] md:text-sm font-medium text-slate-500 dark:text-slate-400">
              Today
            </p>
          </div>
          <p className="text-lg md:text-2xl font-bold text-slate-900 dark:text-white">
            {stats?.leadsToday ?? 0}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-5">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-600 dark:text-white rounded-xl text-sm bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
        </div>
      </div>

      {/* Leads table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
        {loading ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-5 py-4 animate-pulse"
              >
                <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-700" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 rounded bg-slate-100 dark:bg-slate-700" />
                  <div className="h-3 w-48 rounded bg-slate-50 dark:bg-slate-800" />
                </div>
                <div className="h-6 w-20 rounded bg-slate-100 dark:bg-slate-700" />
              </div>
            ))}
          </div>
        ) : leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 dark:text-slate-500">
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
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">
                    Lead
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">
                    Phone
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3 hidden md:table-cell">
                    Address
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3 hidden lg:table-cell">
                    Appointment
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">
                    Status
                  </th>
                  <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {lead.name}
                        </p>
                        <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${lead.leadType === "Buyer" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" : "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"}`}>
                          {lead.leadType}
                        </span>
                      </div>
                      {lead.email && <p className="text-xs text-slate-500 dark:text-slate-400">{lead.email}</p>}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400 hidden sm:table-cell">
                      {lead.phone}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400 hidden md:table-cell truncate max-w-[200px]">
                      {lead.address}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400 hidden lg:table-cell">
                      {new Date(lead.appointmentTime).toLocaleDateString()} {new Date(lead.appointmentTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${LEAD_STATUS_BADGES[lead.status] || "bg-slate-100 text-slate-500"}`}>
                          {lead.status}
                        </span>
                        {lead.status === "NEW" && (
                          <Link
                            href={`/leads/submit?edit=${lead.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors"
                          >
                            <Pencil className="h-3 w-3" />
                            Edit
                          </Link>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          {timeAgo(lead.createdAt)}
                        </span>
                        {/* Mobile: status + edit */}
                        <div className="flex items-center gap-1.5 sm:hidden">
                          <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${LEAD_STATUS_BADGES[lead.status] || "bg-slate-100 text-slate-500"}`}>
                            {lead.status}
                          </span>
                          {lead.status === "NEW" && (
                            <Link
                              href={`/leads/submit?edit=${lead.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium text-brand-600 bg-brand-50 dark:bg-brand-900/30"
                            >
                              <Pencil className="h-2.5 w-2.5" />
                              Edit
                            </Link>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Page {page} of {totalPages} ({total} total)
            </p>
            <div className="flex gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center justify-center h-8 w-8 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center justify-center h-8 w-8 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Lead Details</h3>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-4 max-h-[65vh] overflow-y-auto">
              <div className="flex items-start gap-3">
                <User className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Name</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedLead.name}</p>
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${selectedLead.leadType === "Buyer" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" : "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"}`}>
                      {selectedLead.leadType}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Phone</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedLead.phone}</p>
                </div>
              </div>

              {selectedLead.email && (
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedLead.email}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Address</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedLead.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Home className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Property Type</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedLead.propertyType}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Home className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Beds & Baths / Acreage</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedLead.bedsBaths}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Timeline</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedLead.timeline}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Contract Active</p>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${selectedLead.contractStatus === "Yes" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"}`}>
                    {selectedLead.contractStatus}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Appointment</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {new Date(selectedLead.appointmentTime).toLocaleDateString()}{" "}
                    {new Date(selectedLead.appointmentTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>

              {selectedLead.notes && (
                <div className="flex items-start gap-3">
                  <FileText className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Notes</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedLead.notes}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <FileText className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Status</p>
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${LEAD_STATUS_BADGES[selectedLead.status] || "bg-slate-100 text-slate-500"}`}>
                    {selectedLead.status}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Submitted</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {new Date(selectedLead.createdAt).toLocaleDateString()} ({timeAgo(selectedLead.createdAt)})
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              {selectedLead.status === "NEW" && (
                <Link
                  href={`/leads/submit?edit=${selectedLead.id}`}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-800/40 transition-colors inline-flex items-center gap-1.5"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit Lead
                </Link>
              )}
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
