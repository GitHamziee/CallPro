"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Send,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function SubmitLeadPage() {
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    zipCode: "",
  });

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ text: "Lead submitted successfully!", type: "success" });
        setForm({ name: "", email: "", phone: "", zipCode: "" });
      } else {
        setMessage({
          text: data.error || "Failed to submit lead",
          type: "error",
        });
      }
    } catch {
      setMessage({ text: "Network error. Try again.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg md:text-xl font-bold text-slate-900">
          Submit Lead
        </h1>
        <p className="text-xs md:text-sm text-slate-500 mt-1">
          Fill in the details below to submit a new call center lead.
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-xl bg-white shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-4 py-3 md:px-6 md:py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Send className="h-4 w-4 text-slate-400" />
            <h2 className="text-xs md:text-sm font-semibold text-slate-900">
              New Lead
            </h2>
          </div>
        </div>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="John Doe"
                required
                className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                placeholder="john@example.com"
                required
                className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Phone
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                placeholder="+1 (555) 000-0000"
                required
                className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Zip Code
              </label>
              <input
                type="text"
                value={form.zipCode}
                onChange={(e) =>
                  setForm((f) => ({ ...f, zipCode: e.target.value }))
                }
                placeholder="10001"
                required
                className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 transition-all"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-6 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors"
            >
              {submitting ? "Submitting..." : "Submit Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
