"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Headset,
  Calendar,
  Package,
  CreditCard,
  Clock,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAdminUserDetail } from "@/hooks/useAdminUserDetail";

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
  const {
    user,
    loading,
    updating,
    newPassword,
    setNewPassword,
    changingPassword,
    pendingRole,
    setPendingRole,
    pendingCancel,
    setPendingCancel,
    cancelling,
    activePurchase,
    confirmRoleChange,
    handlePasswordChange,
    confirmCancelSubscription,
  } = useAdminUserDetail(id);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-0">
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

      {/* Profile header */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-5">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur text-white text-lg sm:text-xl font-bold ring-2 ring-white/20 shrink-0">
              {getInitials(user.name)}
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-white truncate">
                {user.name || "Unnamed User"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 truncate">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Quick info row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-100 border-b border-slate-100">
          <div className="px-3 py-3 sm:px-5 sm:py-4">
            <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
              Role
            </p>
            <div className="flex items-center gap-1.5">
              {user.role === "ADMIN" ? (
                <Shield className="h-3.5 w-3.5 text-amber-500" />
              ) : user.role === "AGENT" ? (
                <Headset className="h-3.5 w-3.5 text-blue-500" />
              ) : null}
              <span className="text-xs sm:text-sm font-semibold text-slate-900">
                {user.role === "ADMIN" ? "Admin" : user.role === "AGENT" ? "Agent" : "User"}
              </span>
            </div>
          </div>
          <div className="px-3 py-3 sm:px-5 sm:py-4">
            <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
              Phone
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
              {user.phone || "—"}
            </p>
          </div>
          <div className="px-3 py-3 sm:px-5 sm:py-4">
            <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
              Joined
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-900">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="px-3 py-3 sm:px-5 sm:py-4">
            <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
              Status
            </p>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-semibold ${
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
        <div className="px-4 py-3 sm:px-6 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[10px] sm:text-xs text-slate-400 font-mono truncate max-w-full">
            ID: {user.id}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 mr-1">Role:</span>
            <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
              {[
                { label: "User", value: "USER" },
                { label: "Agent", value: "AGENT" },
                { label: "Admin", value: "ADMIN" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPendingRole(opt.value)}
                  disabled={updating || user.role === opt.value}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                    user.role === opt.value
                      ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
                      : "text-slate-500 hover:text-slate-900 hover:bg-white/60"
                  } disabled:cursor-default`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-5">
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-slate-100 flex items-center gap-2">
          <Lock className="h-4 w-4 text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-900">
            Change Password
          </h3>
        </div>
        <div className="px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>
            <Button
              onClick={handlePasswordChange}
              disabled={changingPassword || !newPassword}
              className="bg-brand-600 hover:bg-brand-700 text-white text-xs h-10 px-5 w-full sm:w-auto"
            >
              {changingPassword ? "Updating..." : "Update Password"}
            </Button>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Min 8 characters with uppercase, lowercase, and a number. The user will be signed out after the change.
          </p>
        </div>
      </div>

      {/* Role change confirmation */}
      <AlertDialog open={!!pendingRole} onOpenChange={() => setPendingRole(null)}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Change Role</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change{" "}
              <span className="font-semibold text-slate-700">
                {user.name || user.email}
              </span>
              &apos;s role to{" "}
              <span className="font-semibold text-slate-700">
                {pendingRole === "ADMIN"
                  ? "Admin"
                  : pendingRole === "AGENT"
                  ? "Agent"
                  : "User"}
              </span>
              ? This will take effect immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRoleChange}
              className="bg-brand-600 hover:bg-brand-700 text-white"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Cancel subscription confirmation */}
      <AlertDialog open={!!pendingCancel} onOpenChange={() => setPendingCancel(null)}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this subscription for{" "}
              <span className="font-semibold text-slate-700">
                {user.name || user.email}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Active</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancelSubscription}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Cancel Subscription
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Purchase history */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-slate-100">
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
                  className="flex items-center gap-3 sm:gap-4 px-4 py-3 sm:px-6 sm:py-4"
                >
                  <div
                    className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg shrink-0 ${
                      displayStatus === "ACTIVE"
                        ? "bg-emerald-50"
                        : "bg-slate-50"
                    }`}
                  >
                    <CreditCard
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${
                        displayStatus === "ACTIVE"
                          ? "text-emerald-600"
                          : "text-slate-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-slate-900 truncate">
                      {purchase.package.name}
                    </p>
                    <div className="flex items-center gap-2 sm:gap-3 mt-0.5">
                      <span className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-400">
                        <Calendar className="h-3 w-3 hidden sm:block" />
                        {new Date(purchase.createdAt).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" }
                        )}
                      </span>
                      {purchase.expiresAt && (
                        <span className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-400">
                          <Clock className="h-3 w-3 hidden sm:block" />
                          Exp{" "}
                          {new Date(purchase.expiresAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" }
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs sm:text-sm font-semibold text-slate-900">
                      ${(purchase.package.price / 100).toLocaleString()}
                    </p>
                    {displayStatus === "ACTIVE" ? (
                      <button
                        onClick={() => setPendingCancel(purchase.id)}
                        disabled={cancelling}
                        className="group/badge inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                      >
                        <span className="group-hover/badge:hidden">ACTIVE</span>
                        <span className="hidden group-hover/badge:inline">CANCEL</span>
                      </button>
                    ) : (
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          displayStatus === "EXPIRED"
                            ? "bg-amber-50 text-amber-600"
                            : displayStatus === "CANCELLED"
                            ? "bg-red-50 text-red-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {displayStatus}
                      </span>
                    )}
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
