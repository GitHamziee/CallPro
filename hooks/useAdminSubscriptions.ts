"use client";

import { useState, useEffect, useCallback } from "react";

export interface SubscriptionRow {
  id: string;
  status: string;
  expiresAt: string | null;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    accountExecutive: string | null;
  };
  package: { name: string; price: number };
}

interface Stats {
  total: number;
  active: number;
  expired: number;
  cancelled: number;
}

export function useAdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({ total: 0, active: 0, expired: 0, cancelled: 0 });

  const fetchSubscriptions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(search && { search }),
        ...(statusFilter && { status: statusFilter }),
      });

      const res = await fetch(`/api/admin/subscriptions?${params}`);
      const data = await res.json();

      if (res.ok) {
        setSubscriptions(data.purchases);
        setTotal(data.total);
        setTotalPages(data.totalPages);
        if (data.stats) setStats(data.stats);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  return {
    subscriptions,
    total,
    page,
    totalPages,
    search,
    statusFilter,
    loading,
    stats,
    setPage,
    setSearch,
    setStatusFilter,
  };
}
