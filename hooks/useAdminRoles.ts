"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

export interface RoleUserRow {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: string;
}

export function useAdminRoles() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<RoleUserRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(search && { search }),
        sortBy: "createdAt",
        sortOrder: "desc",
      });

      const res = await fetch(`/api/admin/users?${params}`);
      const data = await res.json();

      if (res.ok) {
        setUsers(data.users);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  // Auto-dismiss message
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  async function handleRoleChange(userId: string, newRole: string) {
    // Prevent self-demotion
    if (userId === session?.user?.id && newRole !== "ADMIN") {
      setMessage({
        text: "You cannot remove your own admin role.",
        type: "error",
      });
      return;
    }

    setUpdating(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (res.ok) {
        const data = await res.json();
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId ? { ...u, role: data.user.role } : u
          )
        );
        setMessage({
          text: `${data.user.name || data.user.email} is now ${data.user.role}.`,
          type: "success",
        });
      } else {
        const err = await res.json();
        setMessage({
          text: err.error || "Failed to update role.",
          type: "error",
        });
      }
    } catch {
      setMessage({ text: "Network error. Try again.", type: "error" });
    } finally {
      setUpdating(null);
    }
  }

  return {
    session,
    users,
    total,
    page,
    totalPages,
    search,
    loading,
    updating,
    message,
    setPage,
    setSearch,
    setMessage,
    handleRoleChange,
  };
}
