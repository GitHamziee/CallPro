"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Badge from "@/components/shared/Badge";

export default function ServicesOverview() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-brand-100/50 dark:bg-brand-900/20 blur-3xl -translate-y-1/4 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-accent-200/30 dark:bg-accent-900/15 blur-3xl translate-y-1/4 -translate-x-1/4" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-20">
          <Badge className="mb-4">What We Do</Badge>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Everything You Need to{" "}
            <span className="gradient-text">Grow Your Business</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-lg">
            Verified leads, virtual assistants, and custom websites — built
            specifically for real estate professionals.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const isMiddle = i === 1;

            return (
              <AnimatedSection key={service.title} delay={i * 0.12}>
                <div
                  className={`relative rounded-xl border-2 p-6 md:p-8 transition-all flex flex-col h-full ${
                    isMiddle
                      ? "border-brand-600 bg-brand-50/30 dark:bg-brand-900/20 shadow-lg shadow-brand-600/10"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md"
                  }`}
                >
                  {/* Popular badge on middle card */}
                  {isMiddle && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </div>
                  )}

                  {/* Icon + Title */}
                  <div className="mb-5">
                    <div
                      className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
                        isMiddle
                          ? "bg-brand-600 shadow-lg shadow-brand-600/25"
                          : "bg-brand-100 dark:bg-brand-900/40"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          isMiddle
                            ? "text-white"
                            : "text-brand-600 dark:text-brand-400"
                        }`}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                      {service.description}
                    </p>
                  </div>

                  {/* Metric highlight */}
                  <div
                    className={`mb-5 rounded-lg px-4 py-3 ${
                      isMiddle
                        ? "bg-brand-100 dark:bg-brand-800/30 border border-brand-200 dark:border-brand-700"
                        : "bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700"
                    }`}
                  >
                    <span
                      className={`text-xs font-bold uppercase tracking-wide ${
                        isMiddle
                          ? "text-brand-700 dark:text-brand-400"
                          : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {service.metric}
                    </span>
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <Check
                          className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                            isMiddle
                              ? "text-brand-600"
                              : "text-brand-500 dark:text-brand-400"
                          }`}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href="/contact"
                    className={`mt-auto w-full flex items-center justify-center gap-2 px-4 py-2.5 font-semibold rounded-lg transition-colors text-sm ${
                      isMiddle
                        ? "bg-brand-600 hover:bg-brand-700 text-white"
                        : "border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400"
                    }`}
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection className="mt-14 text-center" delay={0.3}>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 px-7 py-3 text-sm font-bold text-brand-600 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-900/50 hover:border-brand-400 hover:shadow-lg hover:shadow-brand-600/10 transition-all duration-300"
          >
            View all services <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
