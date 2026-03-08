import type { Metadata } from "next";
import Badge from "@/components/shared/Badge";
import MissionSection from "@/components/about/MissionSection";
import TeamSection from "@/components/about/TeamSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about R4Referral — a digital real estate referral network delivering verified leads to agents nationwide.",
};

export default function AboutPage() {
  return (
    <>
      <div className="relative overflow-hidden bg-white dark:bg-slate-950 py-24 text-center">
        <div className="grid-pattern absolute inset-0" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-72 w-72 rounded-full bg-brand-100/60 dark:bg-brand-900/30 blur-3xl" />
        <div className="absolute top-1/2 -right-24 h-48 w-48 rounded-full bg-accent-100/40 dark:bg-accent-900/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4">
          <div className="flex justify-center mb-4">
            <Badge>About R4Referral</Badge>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            The Team Behind Your{" "}
            <span className="gradient-text">Next Deal</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            R4Referral is a digital real estate referral network built to
            connect agents with verified, high-intent buyers and sellers
            across all 50 states.
          </p>
        </div>
      </div>
      <MissionSection />
      <TeamSection />
    </>
  );
}
