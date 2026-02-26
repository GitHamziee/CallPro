"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/constants";

export default function StatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="bg-brand-600">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" ref={ref}>
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
                {stat.value}
              </span>
              <span className="mt-2 text-sm text-brand-100">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
