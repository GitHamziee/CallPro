"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface UserDetail {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  purchases: {
    id: string;
    status: string;
    expiresAt: string | null;
    createdAt: string;
    package: { name: string; price: number };
  }[];
}

export function useAdminUserDetail(id: string) {
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [pendingRole, setPendingRole] = useState<string | null>(null);
  const [pendingCancel, setPendingCancel] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/admin/users/${id}`);
        const data = await res.json();
        if (res.ok) setUser(data.user);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  const confirmRoleChange = async () => {
    if (!user || !pendingRole) return;

    setUpdating(true);
    setPendingRole(null);

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: pendingRole }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser((prev) => (prev ? { ...prev, role: pendingRole } : prev));
        toast.success("Role updated successfully");
      } else {
        toast.error(data.error || "Failed to update role");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setUpdating(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!newPassword || newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setChangingPassword(true);

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Password updated successfully");
        setNewPassword("");
      } else {
        toast.error(data.error || "Failed to update password");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setChangingPassword(false);
    }
  };

  const confirmCancelSubscription = async () => {
    if (!pendingCancel) return;

    setCancelling(true);
    setPendingCancel(null);

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cancelPurchaseId: pendingCancel }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                purchases: prev.purchases.map((p) =>
                  p.id === pendingCancel ? { ...p, status: "CANCELLED" } : p
                ),
              }
            : prev
        );
        toast.success("Subscription cancelled");
      } else {
        toast.error(data.error || "Failed to cancel subscription");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setCancelling(false);
    }
  };

  const activePurchase = user?.purchases.find((p) => {
    if (p.status !== "ACTIVE") return false;
    if (p.expiresAt && new Date(p.expiresAt) < new Date()) return false;
    return true;
  });

  return {
    user,
    loading,
    updating,
    newPassword,
    setNewPassword,
    changingPassword,
    pendingRole,
    setPendingRole,
    pendingCancel,
    setPendingCancel,
    cancelling,
    activePurchase,
    confirmRoleChange,
    handlePasswordChange,
    confirmCancelSubscription,
  };
}
