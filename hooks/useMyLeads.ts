"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface LeadAgent {
  id: string;
  name: string | null;
  email: string;
}

export interface LeadInvoice {
  id: string;
  amount: number;
  status: string;
  description: string | null;
}

export interface MyLead {
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
  status: "PENDING" | "ACCEPTED" | "INVOICED" | "PAID";
  createdAt: string;
  agent: LeadAgent;
  invoice: LeadInvoice | null;
}

export interface MyLeadStats {
  pendingCount: number;
  acceptedCount: number;
  invoicedCount: number;
  paidCount: number;
}

export function useMyLeads() {
  const [leads, setLeads] = useState<MyLead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [stats, setStats] = useState<MyLeadStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [selectedLead, setSelectedLead] = useState<MyLead | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchLeads = useCallback(async (silent = false) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    if (!silent) setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(statusFilter && { status: statusFilter }),
        ...(silent && { skipStats: "1" }),
      });

      const res = await fetch(`/api/my-leads?${params}`, {
        signal: controller.signal,
      });
      const data = await res.json();

      if (res.ok) {
        setLeads(data.leads);
        setTotal(data.total);
        setTotalPages(data.totalPages);
        if (data.stats) setStats(data.stats);
      } else if (!silent) {
        setError(data.error || "Failed to load leads");
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      if (!silent) setError("Network error");
    } finally {
      if (!controller.signal.aborted && !silent) setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Poll every 30s while tab is visible
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const start = () => {
      interval = setInterval(() => fetchLeads(true), 30_000);
    };
    const stop = () => clearInterval(interval);

    const onVisibility = () => {
      if (document.hidden) { stop(); }
      else { fetchLeads(true); start(); }
    };

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => { stop(); document.removeEventListener("visibilitychange", onVisibility); };
  }, [fetchLeads]);

  // Batch filter + page reset in one call — React 18 batches these into a single render
  function changeStatusFilter(value: string) {
    setStatusFilter(value);
    setPage(1);
  }

  async function handleAction(leadId: string, action: "accept" | "decline") {
    setActing(leadId);
    setError("");

    try {
      const res = await fetch("/api/my-leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, action }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = data.error || `Failed to ${action} lead`;
        // "Lead is not pending" means stale UI — just refresh silently, no error shown
        if (msg !== "Lead is not pending") {
          setError(msg);
        }
      }

      // Always re-fetch so the list reflects the real DB state
      await fetchLeads();
    } catch {
      setError("Network error");
    } finally {
      setActing(null);
    }
  }

  async function handlePayInvoice(invoiceId: string) {
    setActing(invoiceId);
    setError("");

    try {
      const res = await fetch("/api/invoices/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Failed to start payment");
      }
    } catch {
      setError("Network error");
    } finally {
      setActing(null);
    }
  }

  return {
    leads,
    total,
    page,
    totalPages,
    statusFilter,
    stats,
    loading,
    acting,
    error,
    selectedLead,
    setSelectedLead,
    setPage,
    setStatusFilter: changeStatusFilter,
    handleAction,
    handlePayInvoice,
  };
}
