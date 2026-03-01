"use client";

import { useState, useEffect, useCallback } from "react";

export interface HistoryLead {
  id: string;
  leadType: string;
  name: string;
  phone: string;
  email: string | null;
  address: string;
  propertyType: string;
  bedsBaths: string;
  timeline: string;
  contractStatus: string;
  appointmentTime: string;
  notes: string | null;
  status: string;
  createdAt: string;
}

export interface HistoryStats {
  totalLeads: number;
  leadsThisMonth: number;
  leadsToday: number;
}

export function useLeadHistory() {
  const [leads, setLeads] = useState<HistoryLead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<HistoryStats | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(search && { search }),
      });

      const res = await fetch(`/api/leads?${params}`);
      const data = await res.json();

      if (res.ok) {
        setLeads(data.leads);
        setTotal(data.total);
        setTotalPages(data.totalPages);
        setStats(data.stats);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  return {
    leads,
    total,
    page,
    totalPages,
    search,
    loading,
    stats,
    setPage,
    setSearch,
  };
}
