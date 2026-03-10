"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HOW_IT_WORKS } from "@/lib/constants";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Badge from "@/components/shared/Badge";

const stepIcons = ["🚀", "🔍", "📬", "💰"];

export default function HowItWorks() {
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-28 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Ambient background blobs */}
      <div className="absolute top-1/4 -left-32 h-80 w-80 rounded-full bg-brand-200/40 dark:bg-brand-800/20 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 h-72 w-72 rounded-full bg-accent-300/30 dark:bg-accent-800/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-20">
          <Badge className="mb-4">The Process</Badge>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            From Onboarding to{" "}
            <span className="gradient-text">Booked Meetings</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-lg">
            A proven 4-step process that gets your campaign live fast and
            continuously optimizes for performance.
          </p>
        </AnimatedSection>

        <div className="relative" ref={lineRef}>
          {/* Animated connecting line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-0.5 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-400 via-accent-400 to-brand-400"
              initial={{ scaleX: 0 }}
              animate={lineInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 0.15}>
                <div className="group relative flex flex-col items-center text-center">
                  {/* Numbered circle with glow */}
                  <div className="relative z-10 mb-6">
                    <div className="absolute inset-0 rounded-full bg-brand-500 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-600 shadow-xl shadow-brand-600/30 border-4 border-slate-50 dark:border-slate-900 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">{stepIcons[i]}</span>
                    </div>
                  </div>

                  {/* Card with hover effect */}
                  <div className="w-full rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-7 shadow-sm group-hover:shadow-xl group-hover:shadow-brand-600/10 group-hover:border-brand-300 dark:group-hover:border-brand-600 group-hover:-translate-y-1 transition-all duration-300">
                    <span className="inline-block mb-3 text-xs font-bold text-brand-500 tracking-widest uppercase">
                      Step {item.step}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
