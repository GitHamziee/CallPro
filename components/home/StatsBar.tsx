"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { STATS } from "@/lib/constants";

function PokerCounter({
  target,
  suffix = "",
  decimals = 0,
  delay = 0,
}: {
  target: number;
  suffix?: string;
  decimals?: number;
  delay?: number;
}) {
  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 40, damping: 18 });
  const display = useTransform(spring, (v) => {
    const num = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString();
    // Add comma formatting for numbers >= 1000
    if (decimals === 0) {
      return Math.round(v).toLocaleString();
    }
    return num;
  });
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => count.set(target), delay * 1000);
    return () => clearTimeout(timeout);
  }, [count, target, delay, isInView]);

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setDisplayValue(v));
    return unsubscribe;
  }, [display]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="bg-brand-600">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <span className="text-4xl font-bold text-white sm:text-5xl">
                <PokerCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  delay={0.3 + i * 0.15}
                />
              </span>
              <span className="mt-2 text-sm text-brand-100">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
