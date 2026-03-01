"use client";

import { Package, Plus, Pencil, Check, X, Loader2 } from "lucide-react";
import { useAdminPackages } from "@/hooks/useAdminPackages";

export default function AdminPackagesPage() {
  const {
    packages,
    loading,
    editingId,
    editPrice,
    saving,
    inputRef,
    setEditPrice,
    startEdit,
    cancelEdit,
    savePrice,
    handleKeyDown,
  } = useAdminPackages();

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

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-slate-800" />
          </div>
        ) : packages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Package className="h-10 w-10 mb-3" />
            <p className="text-sm">
              No packages found. Run the seed script to add packages.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <table className="w-full hidden sm:table">
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
                    Active Subs
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {packages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {pkg.name}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === pkg.id ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm text-slate-400">$</span>
                          <input
                            ref={inputRef}
                            type="number"
                            step="0.01"
                            min="0"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, pkg.id)}
                            className="w-24 px-2 py-1 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                          />
                          <button
                            onClick={() => savePrice(pkg.id)}
                            disabled={saving}
                            className="flex items-center justify-center h-7 w-7 rounded-md bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50 transition-colors"
                          >
                            {saving ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Check className="h-3.5 w-3.5" />
                            )}
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="flex items-center justify-center h-7 w-7 rounded-md border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(pkg)}
                          className="group flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                        >
                          $
                          {(pkg.price / 100).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                          <Pencil className="h-3 w-3 text-slate-300 group-hover:text-slate-500 transition-colors" />
                        </button>
                      )}
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

            {/* Mobile cards */}
            <div className="divide-y divide-slate-100 sm:hidden">
              {packages.map((pkg) => (
                <div key={pkg.id} className="px-4 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-slate-900">
                      {pkg.name}
                    </p>
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        pkg.isActive
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {pkg.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    {editingId === pkg.id ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-slate-400">$</span>
                        <input
                          ref={inputRef}
                          type="number"
                          step="0.01"
                          min="0"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, pkg.id)}
                          className="w-24 px-2 py-1 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                        />
                        <button
                          onClick={() => savePrice(pkg.id)}
                          disabled={saving}
                          className="flex items-center justify-center h-7 w-7 rounded-md bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50 transition-colors"
                        >
                          {saving ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Check className="h-3.5 w-3.5" />
                          )}
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex items-center justify-center h-7 w-7 rounded-md border border-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEdit(pkg)}
                        className="flex items-center gap-1.5 text-sm text-slate-600"
                      >
                        $
                        {(pkg.price / 100).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                        <Pencil className="h-3 w-3 text-slate-300" />
                      </button>
                    )}
                    <span className="text-xs text-slate-400">
                      {pkg._count.purchases} active subs
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
