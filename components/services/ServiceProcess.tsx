import { Compass, FileText, Rocket, BarChart3 } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Badge from "@/components/shared/Badge";

const STEPS = [
  {
    icon: Compass,
    step: "01",
    title: "Set Your Preferences",
    description:
      "Tell us your target areas, property types, and referral preferences. We customize everything to match your farm area.",
    duration: "Day 1",
  },
  {
    icon: FileText,
    step: "02",
    title: "We Source & Verify",
    description:
      "Our AI filters and ISA team validate every referral for genuine buyer or seller intent. No fakes, no duplicates, no tire-kickers.",
    duration: "Days 2–3",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Referrals Delivered",
    description:
      "Verified referrals are sent to your dashboard in real-time with full contact info, intent signals, and property details.",
    duration: "Day 3+",
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Close & Scale",
    description:
      "Focus on closing deals while we keep the referrals flowing. Track your ROI and scale your volume when you're ready.",
    duration: "Ongoing",
  },
];

export default function ServiceProcess() {
  return (
    <section className="py-24 bg-section-dark overflow-hidden relative">
      <div className="grid-pattern absolute inset-0 opacity-20" />
      <div className="absolute top-1/3 -left-24 h-[20rem] w-[20rem] rounded-full bg-brand-600/10 blur-3xl" />
      <div className="absolute bottom-1/4 -right-24 h-[16rem] w-[16rem] rounded-full bg-accent-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 border-white/20 bg-white/10 text-white/70">
            Our Process
          </Badge>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            From sign-up to verified referrals{" "}
            <span className="gradient-text">in 3 days</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-xl mx-auto leading-relaxed">
            A streamlined process that gets verified referrals into your hands
            fast — with full transparency at every step.
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
