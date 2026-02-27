"use client";

import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Package,
  Settings,
  CreditCard,
  CheckCircle,
  Users,
  UserPlus,
  DollarSign,
  ShieldCheck,
  MessageCircle,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

interface PurchaseInfo {
  id: string;
  status: string;
  createdAt: string;
  package: { name: string; price: number };
}

interface AdminStats {
  totalUsers: number;
  newUsersThisMonth: number;
  totalAdmins: number;
  activeSubscriptions: number;
  newSubscriptionsThisMonth: number;
  revenueThisMonth: number;
  recentUsers: {
    id: string;
    name: string | null;
    email: string;
    role: string;
    createdAt: string;
  }[];
}

// ─── User Dashboard ────────────────────────────────────────────────
function UserDashboard({
  session,
  purchase,
  showPaymentSuccess,
  setShowPaymentSuccess,
}: {
  session: ReturnType<typeof useSession>["data"];
  purchase: PurchaseInfo | null;
  showPaymentSuccess: boolean;
  setShowPaymentSuccess: (v: boolean) => void;
}) {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Payment success banner */}
      {showPaymentSuccess && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800">
          <CheckCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm font-medium">
            Payment successful! Your subscription is now active.
          </p>
          <button
            onClick={() => setShowPaymentSuccess(false)}
            className="ml-auto text-emerald-600 hover:text-emerald-700 text-sm"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Welcome Card */}
      <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-1">
          Welcome back,{" "}
          {session?.user?.name || session?.user?.email || "User"}
        </h2>
        <p className="text-sm text-slate-500">
          Here is an overview of your CallPro account.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-white p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-brand-50">
              <Package className="h-5 w-5 text-brand-600" />
            </div>
            <p className="text-sm font-medium text-slate-500">Current Plan</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {purchase ? purchase.package.name : "None"}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {purchase
              ? `Since ${new Date(purchase.createdAt).toLocaleDateString()}`
              : "No active subscription"}
          </p>
        </div>

        <div className="rounded-lg bg-white p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-brand-50">
              <CreditCard className="h-5 w-5 text-brand-600" />
            </div>
            <p className="text-sm font-medium text-slate-500">Monthly Cost</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {purchase
              ? `$${(purchase.package.price / 100).toLocaleString()}`
              : "$0"}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {purchase ? "Billed monthly" : "Subscribe to a plan"}
          </p>
        </div>

        <div className="rounded-lg bg-white p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-emerald-50">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
            <p className="text-sm font-medium text-slate-500">Status</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {purchase ? "Active" : "Inactive"}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {purchase ? "Subscription active" : "No active subscription"}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-200">
        <h3 className="text-base font-semibold text-slate-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/chat"
            className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg transition-colors text-center flex items-center justify-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Live Chat
          </Link>
          <Link
            href="/settings"
            className="px-4 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-medium rounded-lg transition-colors text-center flex items-center justify-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-medium rounded-lg transition-colors text-center"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Dashboard ───────────────────────────────────────────────
function AdminDashboard({
  session,
}: {
  session: ReturnType<typeof useSession>["data"];
}) {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Welcome Card */}
      <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-1">
          Welcome back, {session?.user?.name || "Admin"}
        </h2>
        <p className="text-sm text-slate-500">
          Here&apos;s your platform overview for{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
          .
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-brand-50">
              <Users className="h-5 w-5 text-brand-600" />
            </div>
            <p className="text-sm font-medium text-slate-500">Total Users</p>
          </div>
          {loading ? (
            <div className="animate-pulse"><div className="h-7 w-12 bg-slate-200 rounded mt-1" /><div className="h-3 w-20 bg-slate-100 rounded mt-2" /></div>
          ) : (<>
            <p className="text-2xl font-bold text-slate-900">{stats?.totalUsers ?? 0}</p>
            <p className="text-xs text-slate-400 mt-1">{stats?.totalAdmins ?? 0} admin{(stats?.totalAdmins ?? 0) !== 1 ? "s" : ""}</p>
          </>)}
        </div>

        <div className="rounded-lg bg-white p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-emerald-50">
              <UserPlus className="h-5 w-5 text-emerald-600" />
            </div>
            <p className="text-sm font-medium text-slate-500">
              New Registrations
            </p>
          </div>
          {loading ? (
            <div className="animate-pulse"><div className="h-7 w-10 bg-slate-200 rounded mt-1" /><div className="h-3 w-16 bg-slate-100 rounded mt-2" /></div>
          ) : (<>
            <p className="text-2xl font-bold text-slate-900">{stats?.newUsersThisMonth ?? 0}</p>
            <p className="text-xs text-slate-400 mt-1">This month</p>
          </>)}
        </div>

        <div className="rounded-lg bg-white p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-violet-50">
              <ShieldCheck className="h-5 w-5 text-violet-600" />
            </div>
            <p className="text-sm font-medium text-slate-500">
              Active Subscriptions
            </p>
          </div>
          {loading ? (
            <div className="animate-pulse"><div className="h-7 w-10 bg-slate-200 rounded mt-1" /><div className="h-3 w-24 bg-slate-100 rounded mt-2" /></div>
          ) : (<>
            <p className="text-2xl font-bold text-slate-900">{stats?.activeSubscriptions ?? 0}</p>
            <p className="text-xs text-slate-400 mt-1">{stats?.newSubscriptionsThisMonth ?? 0} new this month</p>
          </>)}
        </div>

        <div className="rounded-lg bg-white p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-amber-50">
              <DollarSign className="h-5 w-5 text-amber-600" />
            </div>
            <p className="text-sm font-medium text-slate-500">
              Revenue This Month
            </p>
          </div>
          {loading ? (
            <div className="animate-pulse"><div className="h-7 w-16 bg-slate-200 rounded mt-1" /><div className="h-3 w-28 bg-slate-100 rounded mt-2" /></div>
          ) : (<>
            <p className="text-2xl font-bold text-slate-900">${((stats?.revenueThisMonth ?? 0) / 100).toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-1">From new subscriptions</p>
          </>)}
        </div>
      </div>

      {/* Recent Registrations */}
      <div className="rounded-lg bg-white shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-slate-400" />
            <h3 className="text-sm font-semibold text-slate-900">
              Recent Registrations
            </h3>
          </div>
          <Link
            href="/admin/users"
            className="text-xs font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            View all
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {loading ? (
          <div className="divide-y divide-slate-100 animate-pulse">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-slate-200" />
                  <div><div className="h-4 w-24 bg-slate-200 rounded" /><div className="h-3 w-32 bg-slate-100 rounded mt-1" /></div>
                </div>
                <div className="h-4 w-16 bg-slate-100 rounded" />
              </div>
            ))}
          </div>
        ) : stats?.recentUsers && stats.recentUsers.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {stats.recentUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between px-6 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                    {(user.name || user.email)
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {user.name || "—"}
                    </p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      user.role === "ADMIN"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {user.role}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-8 text-center text-sm text-slate-400">
            No recent registrations
          </div>
        )}
      </div>

      {/* Admin quick link */}
      <div className="rounded-lg bg-slate-900 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-white mb-1">
              Admin Portal
            </h3>
            <p className="text-sm text-slate-400">
              Manage users, roles, packages, and more.
            </p>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 bg-white text-slate-900 text-sm font-semibold rounded-lg hover:bg-slate-100 transition-colors"
          >
            Open Admin
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Inner component (uses useSearchParams — must be inside Suspense) ─────
function DashboardContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [purchase, setPurchase] = useState<PurchaseInfo | null>(null);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  const isAdmin = session?.user?.role === "ADMIN";

  useEffect(() => {
    if (searchParams.get("payment") === "success") {
      setShowPaymentSuccess(true);
      setTimeout(() => setShowPaymentSuccess(false), 5000);
    }
  }, [searchParams]);

  useEffect(() => {
    // Only fetch purchase for regular users
    if (isAdmin) return;

    async function fetchPurchase() {
      try {
        const res = await fetch("/api/auth/purchases");
        if (res.ok) {
          const data = await res.json();
          setPurchase(data.purchase);
        }
      } catch {
        // silently fail
      }
    }
    fetchPurchase();
  }, [isAdmin]);

  if (isAdmin) {
    return <AdminDashboard session={session} />;
  }

  return (
    <UserDashboard
      session={session}
      purchase={purchase}
      showPaymentSuccess={showPaymentSuccess}
      setShowPaymentSuccess={setShowPaymentSuccess}
    />
  );
}

// ─── Main Dashboard Page ───────────────────────────────────────────
export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  );
}
