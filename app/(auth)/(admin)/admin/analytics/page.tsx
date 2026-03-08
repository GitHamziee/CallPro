"use client";

import {
  DollarSign,
  TrendingUp,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Package,
} from "lucide-react";
import { useAdminAnalytics } from "@/hooks/useAdminAnalytics";

function formatCents(cents: number) {
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

function formatMonthLabel(monthStr: string) {
  const [y, m] = monthStr.split("-").map(Number);
  const date = new Date(y, m - 1);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function formatShortMonth(monthStr: string) {
  const [, m] = monthStr.split("-").map(Number);
  const date = new Date(2000, m - 1);
  return date.toLocaleDateString("en-US", { month: "short" });
}

export default function AdminAnalyticsPage() {
  const { month, data, loading, isCurrentMonth, goToPrevMonth, goToNextMonth } =
    useAdminAnalytics();

  const maxTrendRevenue =
    data?.trend.reduce((max, t) => Math.max(max, t.revenue), 0) || 1;

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header + month navigation */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
            Analytics
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Revenue metrics and sales breakdown
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevMonth}
            className="flex items-center justify-center h-8 w-8 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white min-w-[120px] sm:min-w-[140px] text-center">
            {formatMonthLabel(month)}
          </span>
          <button
            onClick={goToNextMonth}
            disabled={isCurrentMonth}
            className="flex items-center justify-center h-8 w-8 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4 animate-pulse">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-[76px] rounded-xl bg-slate-100 dark:bg-slate-700" />
            ))}
          </div>
          <div className="h-64 rounded-xl bg-slate-100 dark:bg-slate-700" />
          <div className="h-48 rounded-xl bg-slate-100 dark:bg-slate-700" />
        </div>
      ) : data ? (
        <>
          {/* Revenue cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-6">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 sm:p-4">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-900/30 shrink-0">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-semibold text-slate-900 dark:text-white">
                  {formatCents(data.totalRevenue)}
                </p>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
                  All-Time Revenue
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 sm:p-4">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30 shrink-0">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-semibold text-slate-900 dark:text-white">
                  {formatCents(data.monthRevenue)}
                </p>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
                  {formatMonthLabel(month)} Revenue
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 sm:p-4">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-900/30 shrink-0">
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-semibold text-slate-900 dark:text-white">
                  {data.monthSales}
                </p>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
                  {formatMonthLabel(month)} Sales
                </p>
              </div>
            </div>
          </div>

          {/* Revenue trend (bar chart) */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 sm:p-6 mb-6">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Revenue Trend
              </h2>
              <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">
                (Last 12 months)
              </span>
            </div>

            {/* Bars */}
            <div
              className="flex items-end gap-1 sm:gap-2"
              style={{ height: 160 }}
            >
              {data.trend.map((t) => {
                const barH =
                  maxTrendRevenue > 0
                    ? Math.round((t.revenue / maxTrendRevenue) * 148)
                    : 0;
                const isSelected = t.month === month;
                return (
                  <div
                    key={t.month}
                    className="flex-1 group"
                    title={`${formatMonthLabel(t.month)}: ${formatCents(t.revenue)} (${t.sales} sales)`}
                  >
                    <div
                      className={`w-full rounded-t transition-all ${
                        isSelected
                          ? "bg-brand-500"
                          : "bg-slate-200 dark:bg-slate-700 group-hover:bg-slate-300 dark:group-hover:bg-slate-600"
                      }`}
                      style={{
                        height: Math.max(barH, t.revenue > 0 ? 6 : 2),
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Month labels */}
            <div className="flex gap-1 sm:gap-2 mt-2 border-t border-slate-100 dark:border-slate-800 pt-2">
              {data.trend.map((t) => {
                const isSelected = t.month === month;
                return (
                  <div key={t.month} className="flex-1 text-center">
                    <span
                      className={`text-[9px] sm:text-[10px] font-medium ${
                        isSelected ? "text-brand-600" : "text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {formatShortMonth(t.month)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Per-package breakdown */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
            <div className="flex items-center gap-2 px-4 sm:px-5 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
              <Package className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Sales by Package
              </h2>
              <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">
                ({formatMonthLabel(month)})
              </span>
            </div>

            {data.packages.length === 0 ? (
              <div className="py-12 text-center text-slate-400 dark:text-slate-500">
                <Package className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">No packages found</p>
              </div>
            ) : (
              <>
                {/* Desktop table */}
                <table className="w-full hidden sm:table">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <th className="text-left text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider px-5 py-2.5">
                        Package
                      </th>
                      <th className="text-left text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider px-5 py-2.5">
                        Price
                      </th>
                      <th className="text-left text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider px-5 py-2.5">
                        Sales
                      </th>
                      <th className="text-right text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider px-5 py-2.5">
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {data.packages.map((pkg) => (
                      <tr
                        key={pkg.name}
                        className="hover:bg-slate-50/70 dark:hover:bg-slate-700/50 transition-colors"
                      >
                        <td className="px-5 py-3">
                          <span className="text-sm font-medium text-slate-900 dark:text-white">
                            {pkg.name}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {formatCents(pkg.price)}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <span
                            className={`inline-flex items-center justify-center h-6 min-w-[24px] px-2 rounded-full text-xs font-bold ${
                              pkg.count > 0
                                ? "bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400"
                                : "bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500"
                            }`}
                          >
                            {pkg.count}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <span
                            className={`text-sm font-semibold ${
                              pkg.revenue > 0
                                ? "text-emerald-600"
                                : "text-slate-400 dark:text-slate-500"
                            }`}
                          >
                            {formatCents(pkg.revenue)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-800/30">
                      <td className="px-5 py-3 text-sm font-semibold text-slate-900 dark:text-white">
                        Total
                      </td>
                      <td className="px-5 py-3" />
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center justify-center h-6 min-w-[24px] px-2 rounded-full text-xs font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {data.monthSales}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <span className="text-sm font-bold text-emerald-600">
                          {formatCents(data.monthRevenue)}
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                </table>

                {/* Mobile cards */}
                <div className="divide-y divide-slate-100 dark:divide-slate-800 sm:hidden">
                  {data.packages.map((pkg) => (
                    <div
                      key={pkg.name}
                      className="px-4 py-3 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {pkg.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {formatCents(pkg.price)} &times; {pkg.count} sales
                        </p>
                      </div>
                      <span
                        className={`text-sm font-semibold ${
                          pkg.revenue > 0
                            ? "text-emerald-600"
                            : "text-slate-400 dark:text-slate-500"
                        }`}
                      >
                        {formatCents(pkg.revenue)}
                      </span>
                    </div>
                  ))}
                  <div className="px-4 py-3 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Total
                    </p>
                    <span className="text-sm font-bold text-emerald-600">
                      {formatCents(data.monthRevenue)}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
