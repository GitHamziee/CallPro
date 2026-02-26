"use client";

import { useState, useEffect } from "react";
import { PhoneCall } from "lucide-react";

export default function PageLoader() {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1600);
    const removeTimer = setTimeout(() => setGone(true), 2000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ease-in-out ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10 animate-[fadeUp_0.5s_ease_forwards]">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 shadow-lg shadow-brand-600/30">
          <PhoneCall className="h-6 w-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-slate-900">
          Call<span className="text-brand-600">Pro</span>
        </span>
      </div>

      {/* Progress bar track */}
      <div className="w-40 h-0.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full w-full bg-brand-600 rounded-full origin-left"
          style={{ animation: "loader-bar 1.5s cubic-bezier(0.4,0,0.2,1) forwards" }}
        />
      </div>
    </div>
  );
}
