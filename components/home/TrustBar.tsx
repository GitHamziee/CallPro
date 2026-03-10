"use client";

import { motion } from "framer-motion";

/* ─── Inline SVG logos — grayscale brokerage wordmarks ─── */

function ExpRealty({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 32" fill="currentColor" className={className}>
      <text x="0" y="24" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="20" letterSpacing="-0.5">eXp</text>
      <text x="48" y="24" fontFamily="Arial, sans-serif" fontWeight="400" fontSize="14">Realty</text>
    </svg>
  );
}

function KellerWilliams({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 32" fill="currentColor" className={className}>
      <text x="0" y="20" fontFamily="Georgia, serif" fontWeight="700" fontSize="14" letterSpacing="0.5">KELLER</text>
      <text x="0" y="31" fontFamily="Georgia, serif" fontWeight="700" fontSize="14" letterSpacing="0.5">WILLIAMS</text>
    </svg>
  );
}

function ColdwellBanker({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 32" fill="currentColor" className={className}>
      <rect x="0" y="4" width="4" height="24" rx="1" />
      <text x="10" y="18" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="11" letterSpacing="1">COLDWELL</text>
      <text x="10" y="29" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="11" letterSpacing="1">BANKER</text>
    </svg>
  );
}

function BerkshireHathaway({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 32" fill="currentColor" className={className}>
      <text x="0" y="16" fontFamily="Georgia, serif" fontWeight="400" fontSize="11" letterSpacing="1.5">BERKSHIRE</text>
      <text x="0" y="29" fontFamily="Georgia, serif" fontWeight="700" fontSize="12" letterSpacing="1.5">HATHAWAY</text>
      <rect x="112" y="6" width="1" height="22" opacity="0.4" />
      <text x="118" y="22" fontFamily="Georgia, serif" fontWeight="400" fontSize="8" letterSpacing="0.5">HomeServices</text>
    </svg>
  );
}

function Remax({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 32" fill="currentColor" className={className}>
      <circle cx="14" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="8" y="20" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="10">R</text>
      <text x="30" y="22" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="16" letterSpacing="-0.5">RE/MAX</text>
    </svg>
  );
}

function Century21({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 32" fill="currentColor" className={className}>
      <text x="0" y="15" fontFamily="Arial, sans-serif" fontWeight="300" fontSize="10" letterSpacing="2">CENTURY</text>
      <text x="0" y="29" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="16">21</text>
      <rect x="26" y="18" width="40" height="1.5" rx="0.5" opacity="0.5" />
    </svg>
  );
}

function CompassLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 32" fill="currentColor" className={className}>
      <path d="M14 2 L26 16 L14 30 L2 16 Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="14" cy="16" r="2.5" />
      <text x="32" y="22" fontFamily="Arial, sans-serif" fontWeight="500" fontSize="15" letterSpacing="1">compass</text>
    </svg>
  );
}

function SothebysLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 32" fill="currentColor" className={className}>
      <text x="0" y="16" fontFamily="Georgia, serif" fontWeight="400" fontSize="10" letterSpacing="2">SOTHEBY&apos;S</text>
      <rect x="0" y="19" width="86" height="0.8" opacity="0.4" />
      <text x="0" y="29" fontFamily="Georgia, serif" fontWeight="400" fontSize="9" letterSpacing="1.5">REALTY</text>
    </svg>
  );
}

const LOGOS = [
  { name: "eXp Realty", Logo: ExpRealty, width: "w-24" },
  { name: "Keller Williams", Logo: KellerWilliams, width: "w-28" },
  { name: "Coldwell Banker", Logo: ColdwellBanker, width: "w-32" },
  { name: "Berkshire Hathaway", Logo: BerkshireHathaway, width: "w-36" },
  { name: "RE/MAX", Logo: Remax, width: "w-24" },
  { name: "Century 21", Logo: Century21, width: "w-26" },
  { name: "Compass", Logo: CompassLogo, width: "w-24" },
  { name: "Sotheby's", Logo: SothebysLogo, width: "w-32" },
];

export default function TrustBar() {
  const doubled = [...LOGOS, ...LOGOS];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="w-full bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800 py-8"
    >
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">
        Trusted by agents at top brokerages
      </p>
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white dark:from-slate-950" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white dark:from-slate-950" />

        <div className="flex animate-marquee items-center gap-16">
          {doubled.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className={`shrink-0 ${item.width} h-8 text-slate-400/60 dark:text-slate-500/50 select-none`}
              title={item.name}
            >
              <item.Logo className="h-full w-full" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
