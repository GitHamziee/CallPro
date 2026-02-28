"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  FileText,
  Clock,
  CheckCircle,
  Headset,
  UserPlus,
  DollarSign,
  CreditCard,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { useAdminLeads } from "@/hooks/useAdminLeads";
import { timeAgo, LEAD_STATUS_BADGES } from "@/lib/format-utils";
import AssignLeadModal from "@/components/admin/AssignLeadModal";
import SendInvoiceModal from "@/components/admin/SendInvoiceModal";

const STATUS_OPTIONS = [
  { label: "All", value: "" },
  { label: "New", value: "NEW" },
  { label: "Pending", value: "PENDING" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Invoiced", value: "INVOICED" },
  { label: "Paid", value: "PAID" },
];

export default function AdminLeadsPage() {
  const {
    leads,
    total,
    page,
    totalPages,
    search,
    agentFilter,
    statusFilter,
    loading,
    agents,
    stats,
    assignLeadId,
    invoiceLeadId,
    setPage,
    setSearch,
    setAgentFilter,
    setStatusFilter,
    setAssignLeadId,
    setInvoiceLeadId,
    fetchLeads,
  } = useAdminLeads();

  const [filterOpen, setFilterOpen] = useState(false);
  const [agentOpen, setAgentOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const agentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
      if (agentRef.current && !agentRef.current.contains(e.target as Node)) {
        setAgentOpen(false);
      }
    }
    if (filterOpen || agentOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [filterOpen, agentOpen]);

  return (
    <div className="mx-auto max-w-6xl">
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-blue-50 shrink-0">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-slate-900">
              {stats?.totalLeads ?? 0}
            </p>
            <p className="text-[10px] sm:text-xs text-slate-500">Total</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-slate-100 shrink-0">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-slate-500" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-slate-900">
              {stats?.newCount ?? 0}
            </p>
            <p className="text-[10px] sm:text-xs text-slate-500">New</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-amber-50 shrink-0">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-slate-900">
              {stats?.pendingCount ?? 0}
            </p>
            <p className="text-[10px] sm:text-xs text-slate-500">Pending</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-emerald-50 shrink-0">
            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-slate-900">
              {stats?.acceptedCount ?? 0}
            </p>
            <p className="text-[10px] sm:text-xs text-slate-500">Accepted</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-blue-50 shrink-0">
            <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-slate-900">
              {stats?.invoicedCount ?? 0}
            </p>
            <p className="text-[10px] sm:text-xs text-slate-500">Invoiced</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-green-50 shrink-0">
            <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-slate-900">
              {stats?.paidCount ?? 0}
            </p>
            <p className="text-[10px] sm:text-xs text-slate-500">Paid</p>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
        </div>
        {/* Agent dropdown */}
        {agents.length > 0 && (
          <div className="relative self-start" ref={agentRef}>
            <button
              onClick={() => setAgentOpen((o) => !o)}
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                agentFilter
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-600"
              }`}
            >
              <Headset className="h-3.5 w-3.5" />
              {agentFilter
                ? (agents.find((a) => a.id === agentFilter)?.name ||
                   agents.find((a) => a.id === agentFilter)?.email ||
                   "Agent")
                : "All Agents"}
              <ChevronDown className={`h-3 w-3 transition-transform ${agentOpen ? "rotate-180" : ""}`} />
            </button>
            {agentOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 rounded-xl border border-slate-200 bg-white shadow-lg py-1 z-30 max-h-60 overflow-y-auto">
                <button
                  onClick={() => { setAgentFilter(""); setAgentOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors ${
                    !agentFilter ? "bg-slate-50 text-slate-900" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  All Agents
                  {!agentFilter && <span className="float-right text-brand-600">&#10003;</span>}
                </button>
                {agents.map((agent) => (
                  <button
                    key={agent.id}
                    onClick={() => { setAgentFilter(agent.id); setAgentOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors truncate ${
                      agentFilter === agent.id ? "bg-slate-50 text-slate-900" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {agent.name || agent.email}
                    {agentFilter === agent.id && <span className="float-right text-brand-600">&#10003;</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Desktop: inline status pills */}
        <div className="hidden sm:flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 self-start">
          {STATUS_OPTIONS.map((opt) => (
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

        {/* Mobile: status filter dropdown */}
        <div className="relative sm:hidden self-start" ref={filterRef}>
          <button
            onClick={() => setFilterOpen((o) => !o)}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all ${
              statusFilter
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-600"
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            {statusFilter
              ? STATUS_OPTIONS.find((o) => o.value === statusFilter)?.label
              : "Filter"}
          </button>
          {filterOpen && (
            <div className="absolute top-full left-0 mt-1 w-40 rounded-xl border border-slate-200 bg-white shadow-lg py-1 z-30">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => { setStatusFilter(opt.value); setFilterOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors ${
                    statusFilter === opt.value ? "bg-slate-50 text-slate-900" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {opt.label}
                  {statusFilter === opt.value && <span className="float-right text-brand-600">&#10003;</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Leads table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        {loading ? (
          <div className="divide-y divide-slate-100">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 sm:gap-4 px-3 py-3 sm:px-5 sm:py-4 animate-pulse"
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
              Leads submitted by agents will appear here
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2.5 sm:px-5 sm:py-3">
                    Lead
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2.5 sm:px-5 sm:py-3 hidden sm:table-cell">
                    Phone
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2.5 sm:px-5 sm:py-3 hidden lg:table-cell">
                    Agent
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2.5 sm:px-5 sm:py-3">
                    Status
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2.5 sm:px-5 sm:py-3">
                    Action
                  </th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2.5 sm:px-5 sm:py-3">
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
                    <td className="px-3 py-3 sm:px-5 sm:py-4">
                      <p className="text-xs sm:text-sm font-medium text-slate-900 truncate">
                        {lead.name}
                      </p>
                      <p className="text-[10px] sm:text-xs text-slate-500 truncate">{lead.email}</p>
                    </td>
                    <td className="px-3 py-3 sm:px-5 sm:py-4 text-sm text-slate-600 hidden sm:table-cell">
                      {lead.phone}
                    </td>
                    <td className="px-3 py-3 sm:px-5 sm:py-4 hidden lg:table-cell">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                        <Headset className="h-3 w-3" />
                        {lead.agent.name || lead.agent.email}
                      </span>
                    </td>
                    <td className="px-3 py-3 sm:px-5 sm:py-4">
                      <span
                        className={`inline-flex px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
                          LEAD_STATUS_BADGES[lead.status] ||
                          LEAD_STATUS_BADGES.NEW
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 sm:px-5 sm:py-4">
                      {lead.status === "NEW" && !lead.assignedTo ? (
                        <button
                          onClick={() => setAssignLeadId(lead.id)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-brand-50 text-brand-700 hover:bg-brand-100 transition-colors"
                        >
                          <UserPlus className="h-3 w-3" />
                          Assign
                        </button>
                      ) : lead.status === "ACCEPTED" ? (
                        <button
                          onClick={() => setInvoiceLeadId(lead.id)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                        >
                          <DollarSign className="h-3 w-3" />
                          Send Invoice
                        </button>
                      ) : (lead.status === "INVOICED" ||
                          lead.status === "PAID") &&
                        lead.invoice ? (
                        <span className="text-sm font-medium text-slate-700">
                          ${(lead.invoice.amount / 100).toFixed(2)}
                        </span>
                      ) : lead.assignedTo ? (
                        <span className="text-sm text-slate-700">
                          {lead.assignedTo.name || lead.assignedTo.email}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">&mdash;</span>
                      )}
                    </td>
                    <td className="px-3 py-3 sm:px-5 sm:py-4 text-right text-xs text-slate-400">
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
          <div className="flex items-center justify-between px-3 py-2.5 sm:px-5 sm:py-3 border-t border-slate-100 bg-slate-50/30">
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

      {/* Assign Modal */}
      {assignLeadId && (
        <AssignLeadModal
          leadId={assignLeadId}
          isOpen={true}
          onClose={() => setAssignLeadId(null)}
          onAssigned={fetchLeads}
        />
      )}

      {/* Send Invoice Modal */}
      {invoiceLeadId && (
        <SendInvoiceModal
          leadId={invoiceLeadId}
          isOpen={true}
          onClose={() => setInvoiceLeadId(null)}
          onInvoiceSent={fetchLeads}
        />
      )}
    </div>
  );
}
