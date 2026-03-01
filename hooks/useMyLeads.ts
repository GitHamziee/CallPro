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
  contactHidden?: boolean;
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

  const hasFetched = useRef(false);

  const fetchLeads = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(statusFilter && { status: statusFilter }),
      });

      const res = await fetch(`/api/my-leads?${params}`);
      const data = await res.json();

      if (res.ok) {
        setLeads(data.leads);
        setTotal(data.total);
        setTotalPages(data.totalPages);
        setStats(data.stats);
      } else if (!silent) {
        setError(data.error || "Failed to load leads");
      }
    } catch {
      if (!silent) setError("Network error");
    } finally {
      if (!silent) setLoading(false);
      hasFetched.current = true;
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

  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

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

      if (res.ok) {
        await fetchLeads();
      } else {
        setError(data.error || `Failed to ${action} lead`);
      }
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
    setStatusFilter,
    handleAction,
    handlePayInvoice,
  };
}
