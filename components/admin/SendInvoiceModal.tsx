"use client";

import { useState } from "react";
import { X, DollarSign } from "lucide-react";

interface SendInvoiceModalProps {
  leadId: string;
  isOpen: boolean;
  onClose: () => void;
  onInvoiceSent: () => void;
}

export default function SendInvoiceModal({
  leadId,
  isOpen,
  onClose,
  onInvoiceSent,
}: SendInvoiceModalProps) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const dollars = parseFloat(amount);
    if (!dollars || dollars < 1) {
      setError("Amount must be at least $1.00");
      return;
    }

    const cents = Math.round(dollars * 100);
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId,
          amount: cents,
          ...(description.trim() && { description: description.trim() }),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        onInvoiceSent();
        onClose();
        setAmount("");
        setDescription("");
      } else {
        setError(data.error || "Failed to send invoice");
      }
    } catch {
      setError("Network error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-md bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-slate-400" />
              <h3 className="text-sm font-semibold text-slate-900">
                Send Invoice
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {error && (
              <div className="px-3 py-2 rounded-lg bg-red-50 text-red-700 text-xs font-medium border border-red-200">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Amount (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  placeholder="500.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-7 pr-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  autoFocus
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Description (optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Lead service fee"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 transition-colors disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Send Invoice"}
            </button>
          </form>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50">
            <p className="text-[10px] text-slate-400">
              The user will be able to pay this invoice via Stripe.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
