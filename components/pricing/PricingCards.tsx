"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Shield, Calendar, Zap, Headphones, BarChart3 } from "lucide-react";
import { PRICING_PLANS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/shared/AnimatedSection";

const TRUST_SIGNALS = [
  { icon: Shield, label: "No long-term contracts" },
  { icon: Calendar, label: "Cancel anytime, 30-day notice" },
  { icon: Zap, label: "Live in 5–7 business days" },
  { icon: BarChart3, label: "All calls recorded" },
  { icon: Headphones, label: "Dedicated account manager" },
];

export default function PricingCards() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Billing toggle */}
        <AnimatedSection className="flex flex-col items-center mb-12">
          <div className="flex items-center rounded-full bg-slate-100 border border-slate-200 p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 ${
                !annual
                  ? "bg-white shadow-sm text-slate-900"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                annual
                  ? "bg-white shadow-sm text-slate-900"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Annual
              <span className="rounded-full bg-green-100 border border-green-200 px-2 py-0.5 text-xs font-semibold text-green-700">
                Save 20%
              </span>
            </button>
          </div>
          {annual && (
            <p className="mt-3 text-sm text-slate-500">
              Billed annually · prices shown per month
            </p>
          )}
        </AnimatedSection>

        {/* Plan cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
          {PRICING_PLANS.map((plan, i) => {
            const monthlyNum =
              plan.price === "Custom"
                ? null
                : parseInt(plan.price.replace(/\D/g, ""), 10);
            const displayPrice = monthlyNum
              ? `$${Math.round(
                  annual ? monthlyNum * 0.8 : monthlyNum
                ).toLocaleString()}`
              : "Custom";
            const annualTotal = monthlyNum
              ? Math.round(monthlyNum * 0.8 * 12).toLocaleString()
              : null;

            return (
              <AnimatedSection key={plan.name} delay={i * 0.1}>
                <div
                  className={`relative rounded-2xl p-8 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 ${
                    plan.highlighted
                      ? "bg-brand-600 shadow-2xl shadow-brand-600/25 ring-1 ring-brand-500"
                      : "glass-card"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-accent-500 px-4 py-1 text-xs font-semibold text-white shadow-lg shadow-accent-500/30">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3
                      className={`text-lg font-semibold ${plan.highlighted ? "text-white" : "text-slate-900"}`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`mt-1 text-sm ${plan.highlighted ? "text-brand-100" : "text-slate-500"}`}
                    >
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-end gap-1">
                      <span
                        className={`text-5xl font-bold tabular-nums ${plan.highlighted ? "text-white" : "text-slate-900"}`}
                      >
                        {displayPrice}
                      </span>
                      {monthlyNum && (
                        <span
                          className={`mb-1.5 text-base ${plan.highlighted ? "text-brand-200" : "text-slate-500"}`}
                        >
                          /mo
                        </span>
                      )}
                    </div>
                    {annual && annualTotal && (
                      <p
                        className={`mt-1 text-xs ${plan.highlighted ? "text-brand-200" : "text-slate-400"}`}
                      >
                        ${annualTotal} billed annually
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <div
                          className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                            plan.highlighted
                              ? "bg-white/20"
                              : "bg-brand-50 border border-brand-200"
                          }`}
                        >
                          <Check
                            className={`h-3 w-3 ${plan.highlighted ? "text-white" : "text-brand-600"}`}
                          />
                        </div>
                        <span
                          className={`text-sm ${plan.highlighted ? "text-brand-50" : "text-slate-700"}`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    size="lg"
                    className={
                      plan.highlighted
                        ? "bg-white text-brand-700 hover:bg-brand-50 font-semibold"
                        : "bg-brand-600 hover:bg-brand-700 text-white btn-glow"
                    }
                  >
                    <Link href={plan.name === "Enterprise" ? "/contact" : "/register"}>
                      {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                    </Link>
                  </Button>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Trust signals */}
        <AnimatedSection delay={0.3} className="mt-12">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {TRUST_SIGNALS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-slate-600">
                <Icon className="h-4 w-4 text-brand-600 flex-shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
