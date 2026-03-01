import { Target, Users, TrendingUp, Shield } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Badge from "@/components/shared/Badge";

const VALUES = [
  {
    icon: Target,
    title: "Results First",
    description:
      "We measure success in booked meetings and pipeline built — not just calls dialed.",
  },
  {
    icon: Users,
    title: "Human-Led",
    description:
      "Every call is made by a trained human agent. No auto-dialers. No robocalls.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    description:
      "We A/B test scripts, track every metric, and optimize relentlessly.",
  },
  {
    icon: Shield,
    title: "Full Transparency",
    description:
      "You get call recordings, live dashboards, and weekly reports. No black boxes.",
  },
];

export default function MissionSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center mb-24">
          <AnimatedSection>
            <Badge className="mb-4">Our Mission</Badge>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl leading-tight">
              We exist to make{" "}
              <span className="gradient-text">outbound predictable</span>
            </h2>
            <p className="mt-5 text-slate-600 leading-relaxed">
              Too many B2B companies treat outbound as a gamble. They hire
              reps, hand them a list, and hope for the best. We built R4Referral
              to change that — a fully managed outbound engine with proven
              systems, trained agents, and complete accountability.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Our clients don&apos;t wonder if outbound works. They see the
              calendar fills, the pipeline growing, and the revenue coming in.
              That&apos;s the standard we hold ourselves to every day.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="glass-card rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "4.9/5", label: "Client Rating" },
                  { value: "< 7 days", label: "Campaign Launch" },
                  { value: "100%", label: "Call Recording" },
                  { value: "30-day", label: "Cancel Anytime" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center justify-center rounded-xl bg-slate-50 p-6 text-center border border-slate-100"
                  >
                    <span className="text-2xl font-bold gradient-text">
                      {item.value}
                    </span>
                    <span className="mt-1 text-xs text-slate-500">
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
          <h2 className="text-3xl font-bold text-slate-900">
            What We Stand For
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, i) => {
            const Icon = value.icon;
            return (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <div className="glass-card rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 border border-brand-100">
                    <Icon className="h-5 w-5 text-brand-600" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
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
