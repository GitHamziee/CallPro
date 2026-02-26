import { Compass, FileText, Rocket, BarChart3 } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Badge from "@/components/shared/Badge";

const STEPS = [
  {
    icon: Compass,
    step: "01",
    title: "Onboarding & Discovery",
    description:
      "We deep-dive into your product, ICP, and growth goals. Our strategists map the exact campaign architecture before a single call is made.",
    duration: "Days 1–2",
  },
  {
    icon: FileText,
    step: "02",
    title: "Script & Strategy Build",
    description:
      "Custom scripts, objection handlers, and qualifying questions are crafted — aligned with your voice, value proposition, and target market.",
    duration: "Days 3–5",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Campaign Launch",
    description:
      "Your dedicated agent team goes live. Every call is monitored in real-time and optimised daily for maximum conversion rate.",
    duration: "Day 7",
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Reporting & Scale",
    description:
      "Weekly strategy sessions, transparent reporting, and ongoing A/B testing ensure your pipeline keeps growing month over month.",
    duration: "Ongoing",
  },
];

export default function ServiceProcess() {
  return (
    <section className="py-24 bg-section-dark overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 border-white/20 bg-white/10 text-white/70">
            Our Process
          </Badge>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            From onboarding to pipeline{" "}
            <span className="gradient-text">in 7 days</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-xl mx-auto leading-relaxed">
            A battle-tested process that gets campaigns live fast and optimised
            even faster — with full transparency at every step.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <div className="relative">
          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-[1.75rem] left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px bg-gradient-to-r from-transparent via-brand-700 to-transparent" />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <AnimatedSection key={step.step} delay={i * 0.12}>
                  <div className="relative flex flex-col items-center text-center">
                    {/* Step number + icon circle */}
                    <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 border-4 border-white/10 ring-2 ring-brand-500/40 shadow-lg shadow-brand-600/30">
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Duration chip */}
                    <span className="mb-3 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-0.5 text-xs font-medium text-white/60">
                      {step.duration}
                    </span>

                    <h3 className="text-base font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
