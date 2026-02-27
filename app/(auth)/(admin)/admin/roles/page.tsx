"use client";

import {
  Search,
  ShieldCheck,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  UserCog,
  Headset,
} from "lucide-react";
import { useAdminRoles } from "@/hooks/useAdminRoles";

export default function AdminRolesPage() {
  const {
    session,
    users,
    total,
    page,
    totalPages,
    search,
    loading,
    updating,
    message,
    setPage,
    setSearch,
    setMessage,
    handleRoleChange,
  } = useAdminRoles();

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm text-slate-500">
          Assign roles to users. {total} user{total !== 1 ? "s" : ""} total.
        </p>
      </div>

      {/* Toast message */}
      {message && (
        <div
          className={`mb-4 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium ${
            message.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message.type === "success" ? (
            <ShieldCheck className="h-4 w-4 flex-shrink-0" />
          ) : (
            <ShieldAlert className="h-4 w-4 flex-shrink-0" />
          )}
          {message.text}
          <button
            onClick={() => setMessage(null)}
            className="ml-auto text-xs opacity-70 hover:opacity-100"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-slate-800" />
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <UserCog className="h-10 w-10 mb-3" />
            <p className="text-sm">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                    User
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                    Current Role
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                    Joined
                  </th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => {
                  const isSelf = user.id === session?.user?.id;
                  const isUpdating = updating === user.id;

                  const roleBadge =
                    user.role === "ADMIN"
                      ? {
                          bg: "bg-amber-100 text-amber-700",
                          icon: <ShieldCheck className="h-3 w-3" />,
                        }
                      : user.role === "AGENT"
                        ? {
                            bg: "bg-blue-100 text-blue-700",
                            icon: <Headset className="h-3 w-3" />,
                          }
                        : {
                            bg: "bg-slate-100 text-slate-600",
                            icon: <UserCog className="h-3 w-3" />,
                          };

                  const availableRoles = [
                    {
                      value: "USER",
                      label: "User",
                      bg: "bg-slate-100 text-slate-700 hover:bg-slate-200",
                    },
                    {
                      value: "AGENT",
                      label: "Agent",
                      bg: "bg-blue-100 text-blue-700 hover:bg-blue-200",
                    },
                    {
                      value: "ADMIN",
                      label: "Admin",
                      bg: "bg-amber-100 text-amber-700 hover:bg-amber-200",
                    },
                  ].filter((r) => r.value !== user.role);

                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      {/* User info */}
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {user.name || "\u2014"}
                            {isSelf && (
                              <span className="ml-2 text-xs text-slate-400">
                                (you)
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </td>

                      {/* Current role badge */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${roleBadge.bg}`}
                        >
                          {roleBadge.icon}
                          {user.role}
                        </span>
                      </td>

                      {/* Joined */}
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 text-right">
                        {isSelf ? (
                          <span className="text-xs text-slate-400 italic">
                            Cannot change own role
                          </span>
                        ) : isUpdating ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5">
                            <div className="animate-spin rounded-full h-3 w-3 border border-slate-400 border-t-transparent" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5">
                            {availableRoles.map((r) => (
                              <button
                                key={r.value}
                                onClick={() =>
                                  handleRoleChange(user.id, r.value)
                                }
                                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${r.bg}`}
                              >
                                {r.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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
