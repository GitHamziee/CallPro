import { Target, Users, TrendingUp, Shield } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Badge from "@/components/shared/Badge";

const VALUES = [
  {
    icon: Target,
    title: "Verified Referrals Only",
    description:
      "Every referral goes through AI filtering and ISA validation before it reaches you. No fakes, no duplicates.",
  },
  {
    icon: Users,
    title: "Agent-First",
    description:
      "Built by people who understand real estate. Our tools and services are designed around how agents actually work.",
  },
  {
    icon: TrendingUp,
    title: "Data-Driven",
    description:
      "We track every metric, optimize referral sources, and continuously improve conversion rates for our network.",
  },
  {
    icon: Shield,
    title: "Full Transparency",
    description:
      "Real-time dashboards, referral tracking, and clear reporting. You always know exactly where your referrals stand.",
  },
];

export default function MissionSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center mb-24">
          <AnimatedSection>
            <Badge className="mb-4">Our Mission</Badge>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl leading-tight">
              Delivering the ultimate{" "}
              <span className="gradient-text">real estate experience</span>
            </h2>
            <p className="mt-5 text-slate-600 dark:text-slate-400 leading-relaxed">
              Too many agents waste time chasing unqualified referrals from outdated
              sources. We built R4Referral to change that — a referral network
              powered by AI verification and human validation that delivers
              referrals from people who are genuinely ready to buy or sell.
            </p>
            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              Our agents don&apos;t wonder if referrals are real. They get verified
              contact info, intent signals, and property details — so they can
              focus on what they do best: closing deals.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-600 mb-6">
                How It Works
              </h3>
              <div className="space-y-6">
                {[
                  { step: "01", title: "AI Referral Sourcing", description: "We identify high-intent buyers and sellers using proprietary data and AI filtering." },
                  { step: "02", title: "ISA Verification", description: "Every referral is contacted and validated by trained inside sales agents before delivery." },
                  { step: "03", title: "Agent Matching", description: "Referrals are matched to agents based on location, specialty, and availability." },
                  { step: "04", title: "Deal Support", description: "We stay involved with follow-ups and scheduling to help you close faster." },
                ].map((item) => (
                  <div key={item.step} className="group flex gap-4 rounded-xl p-2 -m-2 transition-all duration-300 hover:bg-brand-50/50 dark:hover:bg-brand-900/20">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-accent-500 shadow-md shadow-brand-600/20 group-hover:shadow-lg group-hover:shadow-brand-500/30 transition-shadow duration-300">
                      <span className="text-xs font-bold text-white">{item.step}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection className="text-center mb-12">
          <Badge className="mb-4">Our Values</Badge>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            What We Stand For
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, i) => {
            const Icon = value.icon;
            return (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <div className="group glass-card rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-600/5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 shadow-md shadow-brand-600/20 group-hover:shadow-lg group-hover:shadow-brand-500/30 transition-shadow duration-300">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
