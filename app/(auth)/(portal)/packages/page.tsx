"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Check, Loader2 } from "lucide-react";

interface PackageData {
  id: string;
  name: string;
  description: string | null;
  price: number;
  features: string[];
}

interface PurchaseData {
  id: string;
  status: string;
  packageId: string;
  package: { name: string };
}

export default function PackagesPage() {
  const { data: session } = useSession();
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [activePurchase, setActivePurchase] = useState<PurchaseData | null>(null);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-brand-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <p className="text-sm text-slate-500">
          Choose the right plan for your business. All plans include core features.
        </p>
      </div>

      {/* Active plan banner */}
      {activePurchase && (
        <div className="mb-8 p-4 bg-brand-50 border border-brand-200 rounded-lg">
          <p className="text-sm text-slate-600">
            Current Plan:{" "}
            <span className="font-semibold text-brand-700">
              {activePurchase.package.name}
            </span>
          </p>
        </div>
      )}

      {/* Package cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const isCurrentPlan = activePurchase?.packageId === pkg.id;
          const isEnterprise = pkg.price === 0;

          return (
            <div
              key={pkg.id}
              className={`relative rounded-xl border-2 p-6 transition-all ${
                isCurrentPlan
                  ? "border-brand-600 bg-brand-50/30 shadow-md shadow-brand-600/10"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              {isCurrentPlan && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                  Current Plan
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">{pkg.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{pkg.description}</p>
              </div>

              <div className="mb-6">
                {isEnterprise ? (
                  <div>
                    <span className="text-3xl font-bold text-slate-900">Custom</span>
                    <p className="text-sm text-slate-500 mt-1">Contact us for pricing</p>
                  </div>
                ) : (
                  <div>
                    <span className="text-3xl font-bold text-slate-900">
                      ${(pkg.price / 100).toLocaleString()}
                    </span>
                    <span className="text-slate-500 text-sm">/month</span>
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <Check className="h-4 w-4 text-brand-600 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {isCurrentPlan ? (
                <button
                  disabled
                  className="w-full px-4 py-2.5 border-2 border-brand-600 text-brand-600 font-semibold rounded-lg cursor-default text-sm"
                >
                  Current Plan
                </button>
              ) : isEnterprise ? (
                <a
                  href="/contact"
                  className="block w-full px-4 py-2.5 border-2 border-slate-200 text-slate-700 font-semibold rounded-lg text-center hover:bg-slate-50 transition-colors text-sm"
                >
                  Contact Sales
                </a>
              ) : (
                <button
                  onClick={() => handleSubscribe(pkg.id)}
                  disabled={subscribing === pkg.id}
                  className="w-full px-4 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-400 text-white font-semibold rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                >
                  {subscribing === pkg.id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Info */}
      <p className="text-center text-xs text-slate-400 mt-8">
        All plans are billed monthly. You can cancel or change your plan at any time.
        {!session?.user && " Sign in to subscribe."}
      </p>
    </div>
  );
}
