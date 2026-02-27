"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, Shield, User as UserIcon, Mail, Phone, Calendar, Package } from "lucide-react";

interface UserDetail {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  purchases: {
    id: string;
    status: string;
    createdAt: string;
    package: { name: string; price: number };
  }[];
}

export default function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/admin/users/${id}`);
        const data = await res.json();
        if (res.ok) setUser(data.user);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  const handleRoleChange = async (newRole: string) => {
    if (!user || user.role === newRole) return;

    const confirmed = window.confirm(
      `Change ${user.name || user.email}'s role to ${newRole}?`
    );
    if (!confirmed) return;

    setUpdating(true);
    setMessage("");

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser((prev) => (prev ? { ...prev, role: newRole } : prev));
        setMessage("Role updated successfully");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(data.error || "Failed to update role");
      }
    } catch {
      setMessage("An error occurred");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-slate-800" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">User not found</p>
        <Link href="/admin/users" className="text-sm text-brand-600 hover:text-brand-700 mt-2 inline-block">
          Back to users
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Back link */}
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to users
      </Link>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg text-sm ${
            message.includes("success")
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message}
        </div>
      )}

      {/* User info card */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-600 text-lg font-semibold">
              {user.name
                ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
                : "?"}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {user.name || "No name"}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    user.role === "ADMIN"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {user.role === "ADMIN" && <Shield className="h-3 w-3" />}
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          {/* Role change */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-500">Role:</label>
            <select
              value={user.role}
              onChange={(e) => handleRoleChange(e.target.value)}
              disabled={updating}
              className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 bg-white disabled:opacity-50"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-xs text-slate-500">Email</p>
              <p className="text-sm text-slate-900">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-xs text-slate-500">Phone</p>
              <p className="text-sm text-slate-900">{user.phone || "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-xs text-slate-500">Joined</p>
              <p className="text-sm text-slate-900">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <UserIcon className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-xs text-slate-500">User ID</p>
              <p className="text-sm text-slate-900 font-mono">{user.id}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase history */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Purchase History
        </h3>

        {user.purchases.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <Package className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">No purchases yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {user.purchases.map((purchase) => (
              <div
                key={purchase.id}
                className="flex items-center justify-between p-4 rounded-lg border border-slate-100 hover:bg-slate-50/50"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {purchase.package.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {new Date(purchase.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">
                    ${(purchase.package.price / 100).toLocaleString()}
                  </p>
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                      purchase.status === "ACTIVE"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {purchase.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
