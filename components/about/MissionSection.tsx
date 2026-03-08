import { Target, Users, TrendingUp, Shield } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Badge from "@/components/shared/Badge";

const VALUES = [
  {
    icon: Target,
    title: "Verified Leads Only",
    description:
      "Every lead goes through AI filtering and ISA validation before it reaches you. No fakes, no duplicates.",
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
      "We track every metric, optimize lead sources, and continuously improve conversion rates for our network.",
  },
  {
    icon: Shield,
    title: "Full Transparency",
    description:
      "Real-time dashboards, lead tracking, and clear reporting. You always know exactly where your leads stand.",
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
              Too many agents waste time chasing unqualified leads from outdated
              sources. We built R4Referral to change that — a referral network
              powered by AI verification and human validation that delivers
              leads who are genuinely ready to buy or sell.
            </p>
            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              Our agents don&apos;t wonder if leads are real. They get verified
              contact info, intent signals, and property details — so they can
              focus on what they do best: closing deals.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="glass-card rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "2,500+", label: "Agents Onboard" },
                  { value: "50", label: "States Covered" },
                  { value: "98%", label: "Satisfaction Rate" },
                  { value: "24hr", label: "Lead Delivery" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 p-6 text-center border border-slate-100 dark:border-slate-800"
                  >
                    <span className="text-2xl font-bold gradient-text">
                      {item.value}
                    </span>
                    <span className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {item.label}
                    </span>
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
                <div className="glass-card rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800">
                    <Icon className="h-5 w-5 text-brand-600" />
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
