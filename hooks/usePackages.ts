"use client";

import { useState, useEffect } from "react";

export interface PackageData {
  id: string;
  name: string;
  description: string | null;
  price: number;
  features: string[];
}

export interface PurchaseData {
  id: string;
  status: string;
  packageId: string;
  expiresAt: string | null;
  package: { name: string };
}

export function usePackages() {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [activePurchase, setActivePurchase] = useState<PurchaseData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [pkgRes, purchaseRes] = await Promise.all([
          fetch("/api/packages"),
          fetch("/api/auth/purchases"),
        ]);

        const pkgData = await pkgRes.json();
        if (pkgRes.ok) setPackages(pkgData.packages);

        if (purchaseRes.ok) {
          const purchaseData = await purchaseRes.json();
          setActivePurchase(purchaseData.purchase);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSubscribe = async (packageId: string) => {
    setSubscribing(packageId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to start checkout");
      }
    } catch {
      alert("An error occurred. Please try again.");
    } finally {
      setSubscribing(null);
    }
  };

  return {
    packages,
    activePurchase,
    loading,
    subscribing,
    handleSubscribe,
  };
}
