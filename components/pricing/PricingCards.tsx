"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, Shield, Zap, Headphones, BarChart3, DollarSign, ArrowRight, Sparkles, Star } from "lucide-react";
import { PRICING_PLANS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/shared/AnimatedSection";

const TRUST_SIGNALS = [
  { icon: Shield, label: "No hidden fees" },
  { icon: DollarSign, label: "Transparent pricing" },
  { icon: Zap, label: "Live in 5–7 business days" },
  { icon: BarChart3, label: "Track every lead" },
  { icon: Headphones, label: "Dedicated support" },
];

const CARD_ICONS = [Zap, Star, Sparkles];

export default function PricingCards() {
  const [priceMap, setPriceMap] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch("/api/packages");
        const data = await res.json();
        if (res.ok && data.packages) {
          const map = new Map<string, number>();
          for (const pkg of data.packages) {
            map.set(pkg.name, pkg.price);
          }
          setPriceMap(map);
        }
      } catch {
        // fall back to constants
      }
    }
    fetchPrices();
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background decorations */}
      <div className="grid-pattern absolute inset-0" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-300 to-transparent" />
      <div className="absolute top-1/3 -left-32 h-[28rem] w-[28rem] rounded-full bg-brand-100/60 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 h-[24rem] w-[24rem] rounded-full bg-accent-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Plan cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
          {PRICING_PLANS.map((plan, i) => {
            const dbPrice = priceMap.get(plan.name);
            const displayPrice =
              dbPrice !== undefined
                ? `$${(dbPrice / 100).toLocaleString("en-US", { minimumFractionDigits: 0 })}`
                : plan.price;
            const CardIcon = CARD_ICONS[i];

            return (
              <AnimatedSection key={plan.name} delay={i * 0.12}>
                {plan.highlighted ? (
                  /* ── Highlighted card — aurora dark style ── */
                  <div className="relative">
                    {/* Glow behind card */}
                    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-brand-500/30 via-accent-500/20 to-brand-600/30 blur-xl" />

                    <div className="aurora-card relative rounded-2xl p-8 flex flex-col h-full shadow-2xl shadow-brand-900/40 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1">
                      {/* Most Popular badge */}
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span className="rounded-full bg-gradient-to-r from-accent-500 to-brand-500 px-5 py-1.5 text-xs font-semibold text-white shadow-lg shadow-accent-500/30">
                          Most Popular
                        </span>
                      </div>

                      {/* Icon + name */}
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/20 border border-brand-400/30">
                            <CardIcon className="h-5 w-5 text-brand-400" />
                          </div>
                          <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                        </div>
                        <p className="text-sm text-white/50">{plan.description}</p>
                      </div>

                      {/* Price */}
                      <div className="mb-8">
                        <div className="flex items-end gap-1.5">
                          <span className="text-5xl font-bold tabular-nums text-white">{displayPrice}</span>
                          {plan.period && (
                            <span className="mb-1.5 text-base text-white/40">{plan.period}</span>
                          )}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-6" />

                      {/* Features */}
                      <ul className="space-y-3 flex-1 mb-8">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5">
                            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-500/25 border border-brand-400/30">
                              <Check className="h-3 w-3 text-brand-400" />
                            </div>
                            <span className="text-sm text-white/70">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        asChild
                        size="lg"
                        className="bg-white text-brand-700 hover:bg-brand-50 font-semibold shadow-lg shadow-white/10"
                      >
                        <Link href="/register?callbackUrl=/packages">
                          Get Started <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* ── Regular card — glass style ── */
                  <div className="glass-card relative rounded-2xl p-8 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-600/5 hover:border-brand-200 group">
                    {/* Icon + name */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 shadow-lg shadow-brand-600/25 group-hover:scale-105 transition-transform duration-300">
                          <CardIcon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                      </div>
                      <p className="text-sm text-slate-500">{plan.description}</p>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-end gap-1.5">
                        <span className="text-5xl font-bold tabular-nums text-slate-900">{displayPrice}</span>
                        {plan.period && (
                          <span className="mb-1.5 text-base text-slate-400">{plan.period}</span>
                        )}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-6" />

                    {/* Features */}
                    <ul className="space-y-3 flex-1 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 border border-brand-200">
                            <Check className="h-3 w-3 text-brand-600" />
                          </div>
                          <span className="text-sm text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="btn-gradient-wrap rounded-md">
                      <Button
                        asChild
                        size="lg"
                        className="btn-gradient text-white border-0 w-full"
                      >
                        <Link href="/register?callbackUrl=/packages">
                          {plan.cta} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </AnimatedSection>
            );
          })}
        </div>

        {/* Trust signals — pill style */}
        <AnimatedSection delay={0.35} className="mt-16">
          <div className="rounded-2xl bg-slate-50 border border-slate-200 px-8 py-6">
            <div className="flex flex-wrap justify-center gap-3">
              {TRUST_SIGNALS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 shadow-sm"
                >
                  <Icon className="h-4 w-4 text-brand-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
