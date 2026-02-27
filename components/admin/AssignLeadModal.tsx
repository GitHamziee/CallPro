"use client";

import { useState, useEffect } from "react";
import { Search, X, UserCheck } from "lucide-react";

interface SubscribedUser {
  id: string;
  name: string | null;
  email: string;
}

interface AssignLeadModalProps {
  leadId: string;
  isOpen: boolean;
  onClose: () => void;
  onAssigned: () => void;
}

export default function AssignLeadModal({
  leadId,
  isOpen,
  onClose,
  onAssigned,
}: AssignLeadModalProps) {
  const [users, setUsers] = useState<SubscribedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    setSearch("");
    setError("");

    async function fetchUsers() {
      try {
        const res = await fetch("/api/admin/subscribed-users");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
        } else {
          setError("Failed to load users");
        }
      } catch {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [isOpen]);

  async function handleAssign(userId: string) {
    setAssigning(userId);
    setError("");

    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignedToId: userId }),
      });

      const data = await res.json();

      if (res.ok) {
        onAssigned();
        onClose();
      } else {
        setError(data.error || "Failed to assign lead");
      }
    } catch {
      setError("Network error");
    } finally {
      setAssigning(null);
    }
  }

  if (!isOpen) return null;

  const filtered = users.filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (u.name && u.name.toLowerCase().includes(q)) ||
      u.email.toLowerCase().includes(q)
    );
  });

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
              <UserCheck className="h-4 w-4 text-slate-400" />
              <h3 className="text-sm font-semibold text-slate-900">
                Assign Lead
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Search */}
          <div className="px-5 py-3 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search subscribed users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                autoFocus
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mx-5 mt-3 px-3 py-2 rounded-lg bg-red-50 text-red-700 text-xs font-medium border border-red-200">
              {error}
            </div>
          )}

          {/* User list */}
          <div className="max-h-64 overflow-y-auto">
            {loading ? (
              <div className="p-5 space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 animate-pulse">
                    <div className="h-8 w-8 rounded-full bg-slate-100" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3.5 w-28 rounded bg-slate-100" />
                      <div className="h-3 w-40 rounded bg-slate-50" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-sm text-slate-400">
                  {users.length === 0
                    ? "No subscribed users found"
                    : "No matching users"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {filtered.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleAssign(user.id)}
                    disabled={assigning !== null}
                    className="flex items-center gap-3 w-full px-5 py-3 text-left hover:bg-slate-50 transition-colors disabled:opacity-50"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 text-xs font-semibold">
                      {(user.name || user.email).charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {user.name || "Unnamed User"}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    {assigning === user.id && (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-200 border-t-slate-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50">
            <p className="text-[10px] text-slate-400">
              Only users with active subscriptions are shown.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
