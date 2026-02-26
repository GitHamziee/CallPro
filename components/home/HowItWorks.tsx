import { HOW_IT_WORKS } from "@/lib/constants";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Badge from "@/components/shared/Badge";

export default function HowItWorks() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4">The Process</Badge>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            From Onboarding to{" "}
            <span className="gradient-text">Booked Meetings</span>
          </h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto">
            A proven 4-step process that gets your campaign live fast and
            continuously optimizes for performance.
          </p>
        </AnimatedSection>

        <div className="relative">
          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-7 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px bg-gradient-to-r from-brand-300 via-brand-400 to-brand-300" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 0.12}>
                <div className="relative flex flex-col items-center text-center">
                  {/* Numbered circle */}
                  <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 shadow-lg shadow-brand-600/30 border-4 border-slate-50">
                    <span className="text-sm font-bold text-white">{item.step}</span>
                  </div>

                  {/* Card */}
                  <div className="w-full rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-base font-bold text-slate-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
