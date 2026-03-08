"use client";

import {
  UserPlus,
  Headset,
  FileText,
  CheckCircle,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useAdminAgents } from "@/hooks/useAdminAgents";
import { timeAgo } from "@/lib/format-utils";

export default function AdminAgentsPage() {
  const { agents, loading, creating, success, error, form, setField, createAgent } =
    useAdminAgents();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Create QA card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
            <UserPlus className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Create QA Account</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">New accounts are automatically assigned the QA role.</p>
          </div>
        </div>

        <div className="px-5 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Jane Smith"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-600 dark:text-white rounded-lg text-sm bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-600 dark:text-white rounded-lg text-sm bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 8 chars, upper, lower, number"
                  value={form.password}
                  onChange={(e) => setField("password", e.target.value)}
                  className="w-full px-3 py-2.5 pr-10 border border-slate-200 dark:border-slate-600 dark:text-white rounded-lg text-sm bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Feedback */}
          {error && (
            <p className="mt-3 text-xs text-red-600 bg-red-50 dark:bg-red-900/30 px-3 py-2 rounded-lg">{error}</p>
          )}
          {success && (
            <div className="mt-3 flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-2 rounded-lg">
              <CheckCircle className="h-3.5 w-3.5 shrink-0" />
              QA account created successfully.
            </div>
          )}

          <div className="mt-4 flex justify-end">
            <button
              onClick={createAgent}
              disabled={creating}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              {creating ? "Creating..." : "Create Account"}
            </button>
          </div>
        </div>
      </div>

      {/* QA list */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <Headset className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">QA Agents</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">{loading ? "Loading..." : `${agents.length} agent${agents.length !== 1 ? "s" : ""}`}</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 animate-pulse">
                <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-700 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 rounded bg-slate-100 dark:bg-slate-700" />
                  <div className="h-3 w-48 rounded bg-slate-50 dark:bg-slate-800" />
                </div>
                <div className="h-4 w-16 rounded bg-slate-100 dark:bg-slate-700" />
              </div>
            ))}
          </div>
        ) : agents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400 dark:text-slate-500">
            <Headset className="h-10 w-10 mb-3" />
            <p className="text-sm font-medium">No QA agents yet</p>
            <p className="text-xs mt-1">Create your first QA account above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">
                    Agent
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">
                    Email
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">
                    Leads
                  </th>
                  <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {agents.map((agent) => (
                  <tr key={agent.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold shrink-0">
                          {(agent.name || agent.email).slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{agent.name || "—"}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 sm:hidden truncate">{agent.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400 hidden sm:table-cell">
                      {agent.email}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                        <FileText className="h-3 w-3" />
                        {agent._count.agentLeads}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right text-xs text-slate-400 dark:text-slate-500">
                      {timeAgo(agent.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
