"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

// ─── Types ──────────────────────────────────────────────────────────

export interface PurchaseInfo {
  id: string;
  status: string;
  expiresAt: string | null;
  createdAt: string;
  package: { name: string; price: number };
}

export interface AdminStats {
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

export interface AgentStats {
  totalLeads: number;
  leadsThisMonth: number;
  leadsToday: number;
}

// ─── Main Dashboard Hook ────────────────────────────────────────────

export function useDashboard() {
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

  return {
    session,
    role,
    purchase,
    showPaymentSuccess,
    setShowPaymentSuccess,
  };
}

// ─── Admin Dashboard Hook ───────────────────────────────────────────

export function useAdminDashboard() {
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

  return { stats, loading };
}

// ─── Agent Dashboard Hook ───────────────────────────────────────────

export function useAgentDashboard() {
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

  return { stats, loading };
}
