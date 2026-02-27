"use client";

import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Package,
  CreditCard,
  CheckCircle,
  XCircle,
  Users,
  UserPlus,
  DollarSign,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  FileText,
  CalendarDays,
  Clock,
  Send,
} from "lucide-react";

interface PurchaseInfo {
  id: string;
  status: string;
  expiresAt: string | null;
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
    <div className="mx-auto max-w-5xl space-y-4 md:space-y-6">
      {/* Payment success banner */}
      {showPaymentSuccess && (
        <div className="flex items-center gap-2 p-3 md:p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800">
          <CheckCircle className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
          <p className="text-xs md:text-sm font-medium">
            Payment successful! Your subscription is now active.
          </p>
          <button
            onClick={() => setShowPaymentSuccess(false)}
            className="ml-auto text-emerald-600 hover:text-emerald-700 text-xs md:text-sm"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Welcome Card */}
      <div className="rounded-lg bg-white p-4 md:p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-1">
          Welcome back,{" "}
          {session?.user?.name || session?.user?.email || "User"}
        </h2>
        <p className="text-xs md:text-sm text-slate-500">
          Here is an overview of your CallPro account.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        <div className="rounded-lg bg-white p-3 md:p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <div className="p-1.5 md:p-2 rounded-lg bg-brand-50">
              <Package className="h-4 w-4 md:h-5 md:w-5 text-brand-600" />
            </div>
            <p className="text-[10px] md:text-sm font-medium text-slate-500">Current Plan</p>
          </div>
          <p className="text-base md:text-2xl font-bold text-slate-900">
            {purchase ? purchase.package.name : "None"}
          </p>
          <p className="text-[10px] md:text-xs text-slate-400 mt-1 hidden sm:block">
            {purchase
              ? `Since ${new Date(purchase.createdAt).toLocaleDateString()}${purchase.expiresAt ? ` · Expires ${new Date(purchase.expiresAt).toLocaleDateString()}` : ""}`
              : "No active subscription"}
          </p>
        </div>

        <div className="rounded-lg bg-white p-3 md:p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <div className="p-1.5 md:p-2 rounded-lg bg-brand-50">
              <CreditCard className="h-4 w-4 md:h-5 md:w-5 text-brand-600" />
            </div>
            <p className="text-[10px] md:text-sm font-medium text-slate-500">Monthly Cost</p>
          </div>
          <p className="text-base md:text-2xl font-bold text-slate-900">
            {purchase
              ? `$${(purchase.package.price / 100).toLocaleString()}`
              : "$0"}
          </p>
          <p className="text-[10px] md:text-xs text-slate-400 mt-1 hidden sm:block">
            {purchase ? "Billed monthly" : "Subscribe to a plan"}
          </p>
        </div>

        <div className="rounded-lg bg-white p-3 md:p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <div className={`p-1.5 md:p-2 rounded-lg ${purchase ? "bg-emerald-50" : "bg-slate-100"}`}>
              {purchase ? (
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-emerald-600" />
              ) : (
                <XCircle className="h-4 w-4 md:h-5 md:w-5 text-slate-400" />
              )}
            </div>
            <p className="text-[10px] md:text-sm font-medium text-slate-500">Status</p>
          </div>
          <p className={`text-base md:text-2xl font-bold ${purchase ? "text-slate-900" : "text-slate-400"}`}>
            {purchase ? "Active" : "Inactive"}
          </p>
          <p className="text-[10px] md:text-xs text-slate-400 mt-1 hidden sm:block">
            {purchase ? "Subscription active" : "No active subscription"}
          </p>
        </div>
      </div>

      {/* Quick Actions — commented out for now
      <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-200">
        <h3 className="text-base font-semibold text-slate-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
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
      */}
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
    <div className="mx-auto max-w-5xl space-y-4 md:space-y-6">
      {/* Welcome Card */}
      <div className="rounded-lg bg-white p-4 md:p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-1">
          Welcome back, {session?.user?.name || "Admin"}
        </h2>
        <p className="text-xs md:text-sm text-slate-500">
          Here&apos;s your platform overview for{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
          .
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-3 md:p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <div className="p-1.5 md:p-2 rounded-lg bg-brand-50">
              <Users className="h-4 w-4 md:h-5 md:w-5 text-brand-600" />
            </div>
            <p className="text-[10px] md:text-sm font-medium text-slate-500">Total Users</p>
          </div>
          {loading ? (
            <div className="animate-pulse"><div className="h-7 w-12 bg-slate-200 rounded mt-1" /><div className="h-3 w-20 bg-slate-100 rounded mt-2" /></div>
          ) : (<>
            <p className="text-lg md:text-2xl font-bold text-slate-900">{stats?.totalUsers ?? 0}</p>
            <p className="text-[10px] md:text-xs text-slate-400 mt-1 hidden sm:block">{stats?.totalAdmins ?? 0} admin{(stats?.totalAdmins ?? 0) !== 1 ? "s" : ""}</p>
          </>)}
        </div>

        <div className="rounded-lg bg-white p-3 md:p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <div className="p-1.5 md:p-2 rounded-lg bg-emerald-50">
              <UserPlus className="h-4 w-4 md:h-5 md:w-5 text-emerald-600" />
            </div>
            <p className="text-[10px] md:text-sm font-medium text-slate-500">
              New Registrations
            </p>
          </div>
          {loading ? (
            <div className="animate-pulse"><div className="h-7 w-10 bg-slate-200 rounded mt-1" /><div className="h-3 w-16 bg-slate-100 rounded mt-2" /></div>
          ) : (<>
            <p className="text-lg md:text-2xl font-bold text-slate-900">{stats?.newUsersThisMonth ?? 0}</p>
            <p className="text-[10px] md:text-xs text-slate-400 mt-1 hidden sm:block">This month</p>
          </>)}
        </div>

        <div className="rounded-lg bg-white p-3 md:p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <div className="p-1.5 md:p-2 rounded-lg bg-violet-50">
              <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 text-violet-600" />
            </div>
            <p className="text-[10px] md:text-sm font-medium text-slate-500">
              Active Subs
            </p>
          </div>
          {loading ? (
            <div className="animate-pulse"><div className="h-7 w-10 bg-slate-200 rounded mt-1" /><div className="h-3 w-24 bg-slate-100 rounded mt-2" /></div>
          ) : (<>
            <p className="text-lg md:text-2xl font-bold text-slate-900">{stats?.activeSubscriptions ?? 0}</p>
            <p className="text-[10px] md:text-xs text-slate-400 mt-1 hidden sm:block">{stats?.newSubscriptionsThisMonth ?? 0} new this month</p>
          </>)}
        </div>

        <div className="rounded-lg bg-white p-3 md:p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <div className="p-1.5 md:p-2 rounded-lg bg-amber-50">
              <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-amber-600" />
            </div>
            <p className="text-[10px] md:text-sm font-medium text-slate-500">
              Revenue
            </p>
          </div>
          {loading ? (
            <div className="animate-pulse"><div className="h-7 w-16 bg-slate-200 rounded mt-1" /><div className="h-3 w-28 bg-slate-100 rounded mt-2" /></div>
          ) : (<>
            <p className="text-lg md:text-2xl font-bold text-slate-900">${((stats?.revenueThisMonth ?? 0) / 100).toLocaleString()}</p>
            <p className="text-[10px] md:text-xs text-slate-400 mt-1 hidden sm:block">From new subscriptions</p>
          </>)}
        </div>
      </div>

      {/* Recent Registrations */}
      <div className="rounded-lg bg-white shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-slate-400" />
            <h3 className="text-xs md:text-sm font-semibold text-slate-900">
              Recent Registrations
            </h3>
          </div>
          <Link
            href="/admin/users"
            className="text-[10px] md:text-xs font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1"
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
                className="flex items-center justify-between px-4 py-2.5 md:px-6 md:py-3"
              >
                <div className="flex items-center gap-2 md:gap-3 min-w-0">
                  <div className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 text-[10px] md:text-xs font-semibold flex-shrink-0">
                    {(user.name || user.email)
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm font-medium text-slate-900 truncate">
                      {user.name || "—"}
                    </p>
                    <p className="text-[10px] md:text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 ml-2">
                  <span
                    className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      user.role === "ADMIN"
                        ? "bg-amber-100 text-amber-700"
                        : user.role === "AGENT"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {user.role}
                  </span>
                  <span className="text-[10px] md:text-xs text-slate-400">
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
      <div className="rounded-lg bg-slate-900 p-4 md:p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm md:text-base font-semibold text-white mb-0.5 md:mb-1">
              Admin Portal
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Manage users, roles, packages, and more.
            </p>
          </div>
          <Link
            href="/admin"
            className="px-3 py-1.5 md:px-4 md:py-2 bg-white text-slate-900 text-xs md:text-sm font-semibold rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
          >
            Open Admin
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Agent Dashboard ──────────────────────────────────────────────
interface AgentStats {
  totalLeads: number;
  leadsThisMonth: number;
  leadsToday: number;
}

function AgentDashboard({
  session,
}: {
  session: ReturnType<typeof useSession>["data"];
}) {
  const [stats, setStats] = useState<AgentStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/leads?limit=1");
        if (res.ok) {
          const data = await res.json();
          setStats(data.stats);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-5xl space-y-4 md:space-y-6">
      {/* Welcome Card */}
      <div className="rounded-lg bg-white p-4 md:p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-1">
          Welcome back, {session?.user?.name || "Agent"}
        </h2>
        <p className="text-xs md:text-sm text-slate-500">
          Submit and track your call center leads.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        <div className="rounded-lg bg-white p-3 md:p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <div className="p-1.5 md:p-2 rounded-lg bg-blue-50">
              <FileText className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
            </div>
            <p className="text-[10px] md:text-sm font-medium text-slate-500">Total Leads</p>
          </div>
          {loading ? (
            <div className="animate-pulse"><div className="h-7 w-12 bg-slate-200 rounded mt-1" /></div>
          ) : (
            <p className="text-lg md:text-2xl font-bold text-slate-900">{stats?.totalLeads ?? 0}</p>
          )}
        </div>

        <div className="rounded-lg bg-white p-3 md:p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <div className="p-1.5 md:p-2 rounded-lg bg-brand-50">
              <CalendarDays className="h-4 w-4 md:h-5 md:w-5 text-brand-600" />
            </div>
            <p className="text-[10px] md:text-sm font-medium text-slate-500">This Month</p>
          </div>
          {loading ? (
            <div className="animate-pulse"><div className="h-7 w-10 bg-slate-200 rounded mt-1" /></div>
          ) : (
            <p className="text-lg md:text-2xl font-bold text-slate-900">{stats?.leadsThisMonth ?? 0}</p>
          )}
        </div>

        <div className="rounded-lg bg-white p-3 md:p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <div className="p-1.5 md:p-2 rounded-lg bg-emerald-50">
              <Clock className="h-4 w-4 md:h-5 md:w-5 text-emerald-600" />
            </div>
            <p className="text-[10px] md:text-sm font-medium text-slate-500">Today</p>
          </div>
          {loading ? (
            <div className="animate-pulse"><div className="h-7 w-10 bg-slate-200 rounded mt-1" /></div>
          ) : (
            <p className="text-lg md:text-2xl font-bold text-slate-900">{stats?.leadsToday ?? 0}</p>
          )}
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

  const role = session?.user?.role;

  useEffect(() => {
    if (searchParams.get("payment") === "success") {
      setShowPaymentSuccess(true);
      setTimeout(() => setShowPaymentSuccess(false), 5000);
    }
  }, [searchParams]);

  useEffect(() => {
    // Only fetch purchase for regular users
    if (role !== "USER") return;

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
  }, [role]);

  if (role === "ADMIN") {
    return <AdminDashboard session={session} />;
  }

  if (role === "AGENT") {
    return <AgentDashboard session={session} />;
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
