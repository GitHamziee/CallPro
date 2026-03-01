"use client";

import { useState, useEffect, useCallback } from "react";

interface PackageBreakdown {
  name: string;
  price: number;
  count: number;
  revenue: number;
}

interface TrendPoint {
  month: string;
  revenue: number;
  sales: number;
}

export interface AnalyticsData {
  totalRevenue: number;
  monthRevenue: number;
  monthSales: number;
  selectedMonth: string;
  packages: PackageBreakdown[];
  trend: TrendPoint[];
}

export function useAdminAnalytics() {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const [month, setMonth] = useState(currentMonth);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/analytics?month=${month}`);
      const json = await res.json();
      if (res.ok) setData(json);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [month]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const goToPrevMonth = () => {
    const [y, m] = month.split("-").map(Number);
    const d = new Date(Date.UTC(y, m - 2, 1));
    setMonth(`${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`);
  };

  const goToNextMonth = () => {
    const [y, m] = month.split("-").map(Number);
    const d = new Date(Date.UTC(y, m, 1));
    const next = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
    if (next <= currentMonth) setMonth(next);
  };

  return {
    month,
    data,
    loading,
    isCurrentMonth: month === currentMonth,
    goToPrevMonth,
    goToNextMonth,
  };
}
