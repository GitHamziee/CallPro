"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export interface SettingsPurchase {
  id: string;
  status: string;
  expiresAt: string | null;
  createdAt: string;
  package: { name: string; price: number };
}

export function useSettings() {
  const { data: session, update: updateSession } = useSession();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState<
    "account" | "security" | "billing"
  >("account");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [purchase, setPurchase] = useState<SettingsPurchase | null>(null);

  const hideBilling =
    session?.user?.role === "ADMIN" || session?.user?.role === "AGENT";

  // Sync form data when session loads
  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
      });
    }
  }, [session]);

  // Fetch active subscription for billing tab
  useEffect(() => {
    if (hideBilling) return;
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
  }, [hideBilling]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/auth/update-profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Failed to update profile");
        return;
      }

      setSuccessMessage("Profile updated successfully!");
      await updateSession(); // Refresh JWT with new name/email
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Failed to change password");
        return;
      }

      setSuccessMessage("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    session,
    loading,
    successMessage,
    errorMessage,
    activeTab,
    formData,
    passwordData,
    purchase,
    hideBilling,
    setSuccessMessage,
    setErrorMessage,
    setActiveTab,
    handleProfileChange,
    handlePasswordChange,
    handleProfileSubmit,
    handlePasswordSubmit,
  };
}
