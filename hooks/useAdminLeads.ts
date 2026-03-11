"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface LeadInvoice {
  id: string;
  amount: number;
  status: string;
  paidAt: string | null;
}

export interface LeadRow {
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
  status: "NEW" | "PENDING" | "ACCEPTED" | "INVOICED" | "PAID";
  createdAt: string;
  agent: { id: string; name: string | null; email: string };
  assignedTo: { id: string; name: string | null; email: string } | null;
  invoice: LeadInvoice | null;
}

export interface AgentOption {
  id: string;
  name: string | null;
  email: string;
}

export interface LeadStats {
  totalLeads: number;
  leadsThisMonth: number;
  newCount: number;
  pendingCount: number;
  acceptedCount: number;
  invoicedCount: number;
  paidCount: number;
}

export function useAdminLeads() {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [agentFilter, setAgentFilter] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [agents, setAgents] = useState<AgentOption[]>([]);
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [assignLeadId, setAssignLeadId] = useState<string | null>(null);
  const [invoiceLeadId, setInvoiceLeadId] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Fetch agents for filter dropdown
  useEffect(() => {
    async function fetchAgents() {
      try {
        const res = await fetch("/api/admin/users?role=AGENT&limit=50");
        const data = await res.json();
        if (res.ok) {
          setAgents(
            data.users.map((u: AgentOption) => ({
              id: u.id,
              name: u.name,
              email: u.email,
            }))
          );
        }
      } catch {
        // silently fail
      }
    }
    fetchAgents();
  }, []);

  const fetchLeads = useCallback(async (silent = false) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    if (!silent) setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(agentFilter && { agentId: agentFilter }),
        ...(statusFilter && { status: statusFilter }),
      });

      const res = await fetch(`/api/admin/leads?${params}`, {
        signal: controller.signal,
      });
      const data = await res.json();

      if (res.ok) {
        setLeads(data.leads);
        setTotal(data.total);
        setTotalPages(data.totalPages);
        setStats(data.stats);
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
    } finally {
      if (!controller.signal.aborted && !silent) setLoading(false);
    }
  }, [page, debouncedSearch, agentFilter, statusFilter]);

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

  // Batch filter + page reset — React 18 batches these into a single render
  function changeSearch(value: string) {
    setSearch(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(value);
      setPage(1);
    }, 300);
  }

  function changeAgentFilter(value: string) {
    setAgentFilter(value);
    setPage(1);
  }

  function changeStatusFilter(value: string) {
    setStatusFilter(value);
    setPage(1);
  }

  return {
    leads,
    total,
    page,
    totalPages,
    search,
    agentFilter,
    statusFilter,
    loading,
    agents,
    stats,
    assignLeadId,
    invoiceLeadId,
    setPage,
    setSearch: changeSearch,
    setAgentFilter: changeAgentFilter,
    setStatusFilter: changeStatusFilter,
    setAssignLeadId,
    setInvoiceLeadId,
    fetchLeads,
  };
}
