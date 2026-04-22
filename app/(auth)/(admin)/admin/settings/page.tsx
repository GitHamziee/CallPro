"use client";

import { Eye, EyeOff, Mail, Loader2 } from "lucide-react";
import { useAdminSettings } from "@/hooks/useAdminSettings";

export default function AdminSettingsPage() {
  const { settings, loading, saving, error, toggleHidePages } = useAdminSettings();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Additional Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Control site-wide visibility and contact information.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 dark:border-slate-600 border-t-slate-800 dark:border-t-slate-200" />
        </div>
      ) : !settings ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-sm text-red-500">
          {error || "Failed to load settings."}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Hide Pages toggle card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${
                    settings.hidePages
                      ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                      : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                  }`}
                >
                  {settings.hidePages ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Hide Pages</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    When enabled, the Login, Register, Forgot Password, and Reset Password pages
                    are hidden from visitors, and the public contact email switches to
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {" R4referral@gmail.com"}
                    </span>.
                  </p>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.hidePages}
                onClick={toggleHidePages}
                disabled={saving}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/30 disabled:opacity-60 ${
                  settings.hidePages ? "bg-brand-600" : "bg-slate-300 dark:bg-slate-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                    settings.hidePages ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {saving && (
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Saving…
              </div>
            )}
            {error && <p className="mt-3 text-xs text-red-500">{error}</p>}
          </div>

          {/* Contact email status card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <Mail className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Active Contact Email
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Shown in Footer, Contact, Privacy Policy, Terms, and Refund Policy.
                </p>
                <p className="mt-3 text-sm font-mono text-slate-900 dark:text-white break-all">
                  {settings.contactEmail}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
