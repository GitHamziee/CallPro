"use client";

import { useState, useEffect } from "react";
import { Package, Plus } from "lucide-react";

interface PackageRow {
  id: string;
  name: string;
  price: number;
  isActive: boolean;
  sortOrder: number;
  _count: { purchases: number };
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<PackageRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch("/api/admin/packages");
        const data = await res.json();
        if (res.ok) setPackages(data.packages);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchPackages();
  }, []);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">
          {packages.length} package{packages.length !== 1 ? "s" : ""}
        </p>
        <button
          disabled
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white text-sm font-semibold rounded-lg opacity-50 cursor-not-allowed"
          title="Coming soon"
        >
          <Plus className="h-4 w-4" />
          Add Package
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-slate-800" />
          </div>
        ) : packages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Package className="h-10 w-10 mb-3" />
            <p className="text-sm">No packages found. Run the seed script to add packages.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                  Name
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                  Price
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                  Purchases
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {pkg.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {pkg.price === 0
                      ? "Contact Sales"
                      : `$${(pkg.price / 100).toLocaleString()}/mo`}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        pkg.isActive
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {pkg.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {pkg._count.purchases}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
