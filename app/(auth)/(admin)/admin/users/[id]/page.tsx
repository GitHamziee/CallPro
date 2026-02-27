"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Headset,
  Calendar,
  Package,
  CreditCard,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
    expiresAt: string | null;
    createdAt: string;
    package: { name: string; price: number };
  }[];
}

function getInitials(name: string | null) {
  if (name) {
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  return "?";
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
    if (!user) return;

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
      <div className="mx-auto max-w-4xl">
        <div className="h-5 w-28 bg-slate-100 rounded mb-6 animate-pulse" />
        <div className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-slate-100" />
            <div className="space-y-2">
              <div className="h-5 w-40 bg-slate-100 rounded" />
              <div className="h-4 w-56 bg-slate-50 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">User not found</p>
        <Link
          href="/admin/users"
          className="text-sm text-brand-600 hover:text-brand-700 mt-2 inline-block"
        >
          Back to users
        </Link>
      </div>
    );
  }

  const activePurchase = user.purchases.find((p) => {
    if (p.status !== "ACTIVE") return false;
    if (p.expiresAt && new Date(p.expiresAt) < new Date()) return false;
    return true;
  });

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
          className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${
            message.includes("success")
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message}
        </div>
      )}

      {/* Profile header */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-5">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur text-white text-xl font-bold ring-2 ring-white/20">
              {getInitials(user.name)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {user.name || "Unnamed User"}
              </h2>
              <p className="text-sm text-slate-300">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Quick info row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-100 border-b border-slate-100">
          <div className="px-5 py-4">
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
              Role
            </p>
            <div className="flex items-center gap-1.5">
              {user.role === "ADMIN" ? (
                <Shield className="h-3.5 w-3.5 text-amber-500" />
              ) : user.role === "AGENT" ? (
                <Headset className="h-3.5 w-3.5 text-blue-500" />
              ) : null}
              <span className="text-sm font-semibold text-slate-900">
                {user.role === "ADMIN" ? "Admin" : user.role === "AGENT" ? "Agent" : "User"}
              </span>
            </div>
          </div>
          <div className="px-5 py-4">
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
              Phone
            </p>
            <p className="text-sm font-semibold text-slate-900">
              {user.phone || "—"}
            </p>
          </div>
          <div className="px-5 py-4">
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
              Joined
            </p>
            <p className="text-sm font-semibold text-slate-900">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="px-5 py-4">
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
              Status
            </p>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold ${
                activePurchase
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {activePurchase ? "Subscribed" : "No Plan"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-slate-400 font-mono">ID: {user.id}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 mr-1">Set role:</span>
            {(["USER", "AGENT", "ADMIN"] as const).filter((r) => r !== user.role).map((r) => (
              <Button
                key={r}
                onClick={() => handleRoleChange(r)}
                disabled={updating}
                variant="outline"
                className={`text-xs h-8 gap-1.5 ${
                  r === "ADMIN"
                    ? "border-amber-200 text-amber-700 hover:bg-amber-50"
                    : r === "AGENT"
                    ? "border-blue-200 text-blue-700 hover:bg-blue-50"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {r === "ADMIN" ? "Admin" : r === "AGENT" ? "Agent" : "User"}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Purchase history */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">
            Purchase History
          </h3>
        </div>

        {user.purchases.length === 0 ? (
          <div className="text-center py-14 text-slate-400">
            <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No purchases yet</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {user.purchases.map((purchase) => {
              const isExpired =
                purchase.status === "EXPIRED" ||
                (purchase.expiresAt &&
                  new Date(purchase.expiresAt) < new Date());
              const displayStatus = isExpired ? "EXPIRED" : purchase.status;

              return (
                <div
                  key={purchase.id}
                  className="flex items-center gap-4 px-6 py-4"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg shrink-0 ${
                      displayStatus === "ACTIVE"
                        ? "bg-emerald-50"
                        : "bg-slate-50"
                    }`}
                  >
                    <CreditCard
                      className={`h-5 w-5 ${
                        displayStatus === "ACTIVE"
                          ? "text-emerald-600"
                          : "text-slate-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">
                      {purchase.package.name}
                    </p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Calendar className="h-3 w-3" />
                        {new Date(purchase.createdAt).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" }
                        )}
                      </span>
                      {purchase.expiresAt && (
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="h-3 w-3" />
                          Expires{" "}
                          {new Date(purchase.expiresAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" }
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-slate-900">
                      ${(purchase.package.price / 100).toLocaleString()}
                    </p>
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        displayStatus === "ACTIVE"
                          ? "bg-emerald-50 text-emerald-700"
                          : displayStatus === "EXPIRED"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {displayStatus}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
