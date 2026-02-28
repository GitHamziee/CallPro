"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { ArrowRight, PhoneCall, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Badge from "@/components/shared/Badge";
import MagneticButton from "@/components/shared/MagneticButton";

/* ─── Character reveal — blur + slide-up per character ─── */
function CharReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.03,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

function AnimatedCounter({
  target,
  suffix = "",
  decimals = 0,
  delay = 1.0,
}: {
  target: number;
  suffix?: string;
  decimals?: number;
  delay?: number;
}) {
  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString()
  );
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const timeout = setTimeout(() => count.set(target), delay * 1000);
    return () => clearTimeout(timeout);
  }, [count, target, delay]);

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setDisplayValue(v));
    return unsubscribe;
  }, [display]);

  return (
    <>
      {displayValue}
      {suffix}
    </>
  );
}

const COMPANIES = ["SaaS Corp", "Apex Realty", "Meridian Financial", "ProGrowth"];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Background elements */}
      <div className="grid-pattern absolute inset-0" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-600 to-transparent" />
      <div className="absolute top-1/4 -left-48 h-[32rem] w-[32rem] rounded-full bg-brand-100/80 blur-3xl blob-drift-1" />
      <div className="absolute bottom-1/4 -right-48 h-[28rem] w-[28rem] rounded-full bg-cyan-100/70 blur-3xl blob-drift-2" />

      <div className="relative mx-auto max-w-7xl w-full px-4 py-32 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

          {/* Left: text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex flex-wrap items-center gap-3"
            >
              <Badge>
                <span className="h-1.5 w-1.5 rounded-full bg-brand-600 animate-pulse" />
                Outbound Sales — Results Guaranteed
              </Badge>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                ★★★★★&nbsp; Rated 4.9/5 by 500+ clients
              </span>
            </motion.div>

            <h1 className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              <CharReveal text="Turn " className="text-slate-900" delay={0.1} />
              <motion.span
                className="gradient-text inline-block"
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Conversations
              </motion.span>
              <br />
              <CharReveal text="Into " className="text-slate-900" delay={0.7} />
              <motion.span
                className="gradient-text inline-block"
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Conversions
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg text-slate-600 leading-relaxed"
            >
              We build and run elite outbound sales campaigns for B2B companies.
              Outbound calling, appointment setting, and lead qualification — done by
              trained professionals who actually know how to sell.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <MagneticButton>
                <div className="btn-gradient-wrap rounded-md">
                  <Button
                    asChild
                    size="lg"
                    className="btn-gradient text-white text-base px-8 border-0"
                  >
                    <Link href="/contact">
                      Book Free Consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </MagneticButton>
              <MagneticButton magneticStrength={6}>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-slate-300 bg-transparent text-slate-700 hover:bg-slate-50 text-base px-8"
                >
                  <Link href="/services">View Services</Link>
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Trust strip — logo pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12"
            >
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-slate-400">
                Trusted by growing B2B teams
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {COMPANIES.map((company) => (
                  <span
                    key={company}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold text-slate-500"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Live campaign card — dark for contrast */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="aurora-card w-full max-w-sm rounded-2xl p-6 shadow-2xl shadow-brand-900/30 ring-1 ring-white/10">
              {/* Card header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600/20 border border-brand-500/30">
                  <PhoneCall className="h-5 w-5 text-brand-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Live Campaign</p>
                  <p className="text-xs text-white/50">Apex Realty Group</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="text-xs text-green-400 font-medium">Live</span>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                {[
                  { label: "Calls today", target: 247, decimals: 0, suffix: "", color: "text-white", delay: 1.1 },
                  { label: "Appointments set", target: 18, decimals: 0, suffix: "", color: "text-green-400", delay: 1.2 },
                  { label: "Conversion rate", target: 7.3, decimals: 1, suffix: "%", color: "text-brand-400", delay: 1.3 },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center text-sm">
                    <span className="text-white/60">{row.label}</span>
                    <span className={`font-semibold ${row.color}`}>
                      <AnimatedCounter target={row.target} suffix={row.suffix} decimals={row.decimals} delay={row.delay} />
                    </span>
                  </div>
                ))}
                <div className="pt-2">
                  <div className="h-2 rounded-full bg-white/15">
                    <motion.div
                      className="h-2 rounded-full bg-gradient-to-r from-white/80 to-white/40"
                      initial={{ width: "0%" }}
                      animate={{ width: "73%" }}
                      transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
                    />
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 2.4 }}
                    className="mt-1.5 text-xs text-white/40 text-right"
                  >
                    73% to daily goal
                  </motion.p>
                </div>
              </div>

              {/* Mini agent feed */}
              <motion.div
                className="mt-5 space-y-2"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.12, delayChildren: 1.3 } },
                }}
              >
                {[
                  { agent: "Agent A", status: "On call", dot: "bg-green-500" },
                  { agent: "Agent B", status: "Follow-up", dot: "bg-brand-500" },
                  { agent: "Agent C", status: "Dialing", dot: "bg-amber-500" },
                ].map((a) => (
                  <motion.div
                    key={a.agent}
                    variants={{
                      hidden: { opacity: 0, x: -12 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex items-center justify-between rounded-lg bg-white/10 backdrop-blur-sm px-3 py-2"
                  >
                    <span className="text-xs font-medium text-white/80">{a.agent}</span>
                    <span className="flex items-center gap-1.5 text-xs text-white/50">
                      <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
                      {a.status}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Bottom trend row */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.7, ease: "easeOut" }}
                className="mt-5 flex items-center justify-between rounded-xl bg-white/10 border border-white/15 px-4 py-3"
              >
                <span className="text-xs text-white/50">Weekly trend</span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-green-400">
                  <TrendingUp className="h-3.5 w-3.5" />
                  +38% vs last week
                </span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
