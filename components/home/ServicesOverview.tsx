"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Badge from "@/components/shared/Badge";

/* ── Per-card accent system ── */
const CARD_STYLES = [
  {
    gradient: "from-blue-500 to-cyan-400",
    bg: "bg-blue-600",
    shadow: "shadow-blue-600/20",
    iconBg: "bg-blue-600 shadow-lg shadow-blue-600/25",
    metricBg: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700",
    metricText: "text-blue-700 dark:text-blue-400",
    checkColor: "text-blue-600",
    borderHover: "hover:border-blue-300 dark:hover:border-blue-600",
    label: "Most Popular",
  },
  {
    gradient: "from-purple-500 to-pink-400",
    bg: "bg-purple-600",
    shadow: "shadow-purple-600/20",
    iconBg: "bg-purple-600 shadow-lg shadow-purple-600/25",
    metricBg: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700",
    metricText: "text-purple-700 dark:text-purple-400",
    checkColor: "text-purple-600",
    borderHover: "hover:border-purple-300 dark:hover:border-purple-600",
    label: null,
  },
  {
    gradient: "from-emerald-500 to-teal-400",
    bg: "bg-emerald-600",
    shadow: "shadow-emerald-600/20",
    iconBg: "bg-emerald-600 shadow-lg shadow-emerald-600/25",
    metricBg: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700",
    metricText: "text-emerald-700 dark:text-emerald-400",
    checkColor: "text-emerald-600",
    borderHover: "hover:border-emerald-300 dark:hover:border-emerald-600",
    label: null,
  },
];

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
            Verified referrals, virtual assistants, and custom websites — built
            specifically for real estate professionals.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const style = CARD_STYLES[i];

            return (
              <AnimatedSection key={service.title} delay={i * 0.12}>
                <div className={`relative rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 md:p-8 transition-all flex flex-col h-full group hover:-translate-y-1 hover:shadow-xl ${style.shadow} ${style.borderHover} overflow-hidden`}>
                  {/* Top gradient bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${style.gradient}`} />

                  {/* Popular badge */}
                  {style.label && (
                    <div className="absolute -top-0 right-4 bg-blue-600 text-white px-3 py-1 rounded-b-lg text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-blue-600/25">
                      {style.label}
                    </div>
                  )}

                  {/* Icon + Title */}
                  <div className="mb-5">
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${style.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                      {service.description}
                    </p>
                  </div>

                  {/* Metric highlight */}
                  <div className={`mb-5 rounded-lg px-4 py-3 border ${style.metricBg}`}>
                    <span className={`text-xs font-bold uppercase tracking-wide ${style.metricText}`}>
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
                        <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${style.checkColor}`} />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href={service.href}
                    className="mt-auto w-full flex items-center justify-center gap-2 px-4 py-2.5 font-semibold rounded-lg transition-all text-sm border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 group-hover:border-brand-400 group-hover:text-brand-600 dark:group-hover:text-brand-400"
                  >
                    Learn More
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
