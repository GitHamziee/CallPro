"use client";

import { useSession } from "next-auth/react";
import { Check, Loader2 } from "lucide-react";
import { usePackages } from "@/hooks/usePackages";

export default function PackagesPage() {
  const { data: session } = useSession();
  const { packages, activePurchase, loading, subscribing, handleSubscribe } =
    usePackages();

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <p className="text-sm text-slate-500">
          Choose the right plan for your business. All plans include core
          features.
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
            {activePurchase.expiresAt && (
              <span className="ml-2 text-slate-400">
                · Expires{" "}
                {new Date(activePurchase.expiresAt).toLocaleDateString()}
              </span>
            )}
          </p>
        </div>
      )}

      {/* Package cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border-2 border-slate-200 bg-white p-6 animate-pulse"
              >
                <div className="mb-6">
                  <div className="h-6 w-24 bg-slate-200 rounded" />
                  <div className="h-4 w-40 bg-slate-100 rounded mt-2" />
                </div>
                <div className="mb-6">
                  <div className="h-8 w-28 bg-slate-200 rounded" />
                </div>
                <div className="space-y-3 mb-8">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div
                      key={j}
                      className="h-4 bg-slate-100 rounded w-full"
                    />
                  ))}
                </div>
                <div className="h-10 bg-slate-200 rounded-lg" />
              </div>
            ))
          : packages.map((pkg) => {
              const isCurrentPlan = activePurchase?.packageId === pkg.id;

              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-xl border-2 p-4 md:p-6 transition-all flex flex-col ${
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

                  <div className="mb-3 md:mb-6">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900">
                      {pkg.name}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 mt-1">
                      {pkg.description}
                    </p>
                  </div>

                  <div className="mb-3 md:mb-6">
                    <div>
                      <span className="text-2xl md:text-3xl font-bold text-slate-900">
                        ${(pkg.price / 100).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2 md:space-y-3 mb-4 md:mb-8 flex-1">
                    {pkg.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs md:text-sm text-slate-600"
                      >
                        <Check className="h-3.5 w-3.5 md:h-4 md:w-4 text-brand-600 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {isCurrentPlan ? (
                    <button
                      disabled
                      className="mt-auto w-full px-3 py-2 md:px-4 md:py-2.5 border-2 border-brand-600 text-brand-600 font-semibold rounded-lg cursor-default text-xs md:text-sm"
                    >
                      Current Plan
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSubscribe(pkg.id)}
                      disabled={subscribing === pkg.id}
                      className="mt-auto w-full px-3 py-2 md:px-4 md:py-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-400 text-white font-semibold rounded-lg transition-colors text-xs md:text-sm flex items-center justify-center gap-2"
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
        Choose the plan that fits your needs. Contact us if you have any
        questions.
        {!session?.user && " Sign in to subscribe."}
      </p>
    </div>
  );
}
