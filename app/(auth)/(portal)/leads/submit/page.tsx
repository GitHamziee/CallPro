"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Send, Pencil, CheckCircle, XCircle, ChevronDown, ArrowLeft } from "lucide-react";
import { useSubmitLead } from "@/hooks/useSubmitLead";

const inputClass =
  "w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 transition-all";
const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

const LEAD_TYPE_OPTIONS = [
  { label: "Buyer", value: "Buyer" },
  { label: "Seller", value: "Seller" },
];

const CONTRACT_OPTIONS = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

export default function SubmitLeadPage() {
  return (
    <Suspense>
      <SubmitLeadContent />
    </Suspense>
  );
}

function SubmitLeadContent() {
  const { form, submitting, loadingLead, message, editId, handleSubmit, updateField } =
    useSubmitLead();

  const [leadTypeOpen, setLeadTypeOpen] = useState(false);
  const [contractOpen, setContractOpen] = useState(false);
  const leadTypeRef = useRef<HTMLDivElement>(null);
  const contractRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (leadTypeRef.current && !leadTypeRef.current.contains(e.target as Node)) {
        setLeadTypeOpen(false);
      }
      if (contractRef.current && !contractRef.current.contains(e.target as Node)) {
        setContractOpen(false);
      }
    }
    if (leadTypeOpen || contractOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [leadTypeOpen, contractOpen]);

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        {editId && (
          <Link
            href="/leads/history"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors mb-3"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to history
          </Link>
        )}
        <h1 className="text-lg md:text-xl font-bold text-slate-900">
          {editId ? "Edit Lead" : "Submit Lead"}
        </h1>
        <p className="text-xs md:text-sm text-slate-500 mt-1">
          {editId
            ? "Update the lead details below."
            : "Fill in the details below to submit a new lead."}
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-xl bg-white shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-4 py-3 md:px-6 md:py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            {editId ? (
              <Pencil className="h-4 w-4 text-slate-400" />
            ) : (
              <Send className="h-4 w-4 text-slate-400" />
            )}
            <h2 className="text-xs md:text-sm font-semibold text-slate-900">
              {editId ? "Edit Lead" : "New Lead"}
            </h2>
          </div>
        </div>

        {loadingLead ? (
          <div className="p-4 md:p-6 space-y-4 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 bg-slate-100 rounded-lg" />
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
            {message && (
              <div
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium ${
                  message.type === "success"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 flex-shrink-0" />
                )}
                {message.text}
              </div>
            )}

            {/* Row 1: Lead Type + Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  Lead Type <span className="text-red-500">*</span>
                </label>
                <div className="relative" ref={leadTypeRef}>
                  <button
                    type="button"
                    onClick={() => setLeadTypeOpen((o) => !o)}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg border text-sm transition-all ${
                      form.leadType
                        ? "border-slate-300 bg-white text-slate-900"
                        : "border-slate-300 bg-white text-slate-400"
                    }`}
                  >
                    {form.leadType || "Select type..."}
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${leadTypeOpen ? "rotate-180" : ""}`} />
                  </button>
                  {leadTypeOpen && (
                    <div className="absolute top-full left-0 mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-lg py-1 z-30">
                      {LEAD_TYPE_OPTIONS.map((opt) => (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() => { updateField("leadType", opt.value); setLeadTypeOpen(false); }}
                          className={`w-full text-left px-3 py-2 text-sm font-medium transition-colors ${
                            form.leadType === opt.value ? "bg-slate-50 text-slate-900" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          {opt.label}
                          {form.leadType === opt.value && <span className="float-right text-brand-600">&#10003;</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className={labelClass}>
                  Lead Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="John Doe"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Row 2: Phone + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  Lead Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Lead Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="john@example.com"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Row 3: Address (full width) */}
            <div>
              <label className={labelClass}>
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="123 Main St, City, State"
                required
                className={inputClass}
              />
            </div>

            {/* Row 4: Property Type + Beds/Baths */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  Property Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.propertyType}
                  onChange={(e) => updateField("propertyType", e.target.value)}
                  placeholder="Single Family, Condo, etc."
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Beds & Baths / Acreage <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.bedsBaths}
                  onChange={(e) => updateField("bedsBaths", e.target.value)}
                  placeholder="3 bed / 2 bath, 0.5 acres"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Row 5: Timeline + Contract Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  Timeline <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.timeline}
                  onChange={(e) => updateField("timeline", e.target.value)}
                  placeholder="Within 30 days, 3-6 months, etc."
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Contract Status (Is Active) <span className="text-red-500">*</span>
                </label>
                <div className="relative" ref={contractRef}>
                  <button
                    type="button"
                    onClick={() => setContractOpen((o) => !o)}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg border text-sm transition-all ${
                      form.contractStatus
                        ? "border-slate-300 bg-white text-slate-900"
                        : "border-slate-300 bg-white text-slate-400"
                    }`}
                  >
                    {form.contractStatus || "Select..."}
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${contractOpen ? "rotate-180" : ""}`} />
                  </button>
                  {contractOpen && (
                    <div className="absolute top-full left-0 mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-lg py-1 z-30">
                      {CONTRACT_OPTIONS.map((opt) => (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() => { updateField("contractStatus", opt.value); setContractOpen(false); }}
                          className={`w-full text-left px-3 py-2 text-sm font-medium transition-colors ${
                            form.contractStatus === opt.value ? "bg-slate-50 text-slate-900" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          {opt.label}
                          {form.contractStatus === opt.value && <span className="float-right text-brand-600">&#10003;</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Row 6: Appointment Time */}
            <div>
              <label className={labelClass}>
                Appointment Time <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                value={form.appointmentTime}
                onChange={(e) => updateField("appointmentTime", e.target.value)}
                required
                className={inputClass}
              />
            </div>

            {/* Row 7: Notes (optional) */}
            <div>
              <label className={labelClass}>Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                placeholder="Any additional details..."
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-6 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors"
              >
                {submitting
                  ? editId ? "Updating..." : "Submitting..."
                  : editId ? "Update Lead" : "Submit Lead"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
