import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Badge from "@/components/shared/Badge";

export default function ServicesOverview() {
  const featured = SERVICES.slice(0, 3);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4">What We Do</Badge>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Everything You Need to{" "}
            <span className="gradient-text">Fill Your Pipeline</span>
          </h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto">
            End-to-end outbound solutions run by trained professionals. No
            freelancers, no offshore chaos — just results.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((service, i) => {
            const Icon = service.icon;
            return (
              <AnimatedSection key={service.title} delay={i * 0.1}>
                <div className="glass-card rounded-2xl p-7 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-600/5 group">
                  {/* Solid blue icon */}
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 shadow-lg shadow-brand-600/25 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">
                    {service.description}
                  </p>
                  {/* Result metric */}
                  <div className="mt-4 mb-4 rounded-lg bg-brand-50 border border-brand-100 px-3 py-2">
                    <span className="text-xs font-semibold text-brand-700">
                      {service.metric}
                    </span>
                  </div>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                  >
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection className="mt-12 text-center" delay={0.3}>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-600 hover:border-brand-400 hover:text-brand-600 transition-all duration-200"
          >
            View all 6 services <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
