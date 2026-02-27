"use client";

import { useState, useEffect, useCallback } from "react";

export interface LeadInvoice {
  id: string;
  amount: number;
  status: string;
  paidAt: string | null;
}

export interface LeadRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  zipCode: string;
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
  const [agentFilter, setAgentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [agents, setAgents] = useState<AgentOption[]>([]);
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [assignLeadId, setAssignLeadId] = useState<string | null>(null);
  const [invoiceLeadId, setInvoiceLeadId] = useState<string | null>(null);

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

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(search && { search }),
        ...(agentFilter && { agentId: agentFilter }),
        ...(statusFilter && { status: statusFilter }),
      });

      const res = await fetch(`/api/admin/leads?${params}`);
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
  }, [page, search, agentFilter, statusFilter]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    setPage(1);
  }, [search, agentFilter, statusFilter]);

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
    setSearch,
    setAgentFilter,
    setStatusFilter,
    setAssignLeadId,
    setInvoiceLeadId,
    fetchLeads,
  };
}
