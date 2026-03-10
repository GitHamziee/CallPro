import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Badge from "@/components/shared/Badge";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { SERVICES, SERVICE_PAGE_CONTENT } from "@/lib/constants";

const SLUGS = SERVICES.map((s) => s.slug);

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const content = SERVICE_PAGE_CONTENT[slug];

  if (!service || !content) notFound();

  const Icon = service.icon;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-28 pb-20 sm:pt-32 sm:pb-24">
        <div className="grid-pattern absolute inset-0" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-80 w-80 rounded-full bg-brand-100/60 dark:bg-brand-900/30 blur-3xl" />
        <div className="absolute top-1/2 -left-24 h-56 w-56 rounded-full bg-accent-200/40 dark:bg-accent-900/20 blur-3xl" />
        <div className="absolute bottom-0 -right-24 h-56 w-56 rounded-full bg-brand-200/40 dark:bg-brand-900/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: text */}
            <div>
              <Badge className="mb-4">
                <Icon className="h-3.5 w-3.5 text-brand-600" />
                {content.badge}
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                {content.headline}
                <span className="gradient-text">{content.highlightedText}</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {content.subtitle}
              </p>

              {/* Stats inline */}
              <div className="mt-8 flex flex-wrap gap-6 sm:gap-8">
                {content.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl sm:text-3xl font-bold text-brand-600 dark:text-brand-400">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: visual card */}
            <div className="flex justify-center lg:justify-end">
              <div className="aurora-card w-full max-w-sm rounded-2xl p-6 sm:p-8 shadow-2xl shadow-brand-900/30 ring-1 ring-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 border border-white/20">
                    <Icon className="h-6 w-6 text-brand-300" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{service.title}</p>
                    <p className="text-xs text-white/50">R4Referral</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {service.bullets.map((bullet) => (
                    <div
                      key={bullet}
                      className="flex items-start gap-3 rounded-lg bg-white/10 backdrop-blur-sm px-4 py-3"
                    >
                      <Check className="h-4 w-4 text-brand-300 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80 leading-relaxed">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between rounded-xl bg-white/10 border border-white/15 px-4 py-3">
                  <span className="text-xs text-white/50">{service.metric}</span>
                  <span className="text-xs font-semibold text-green-400">
                    {content.stats[0].value} {content.stats[0].label.toLowerCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 sm:mb-16">
            <Badge className="mb-4">Key Features</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">
              Why Choose Our{" "}
              <span className="gradient-text">{service.title}</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {content.features.map((feature, i) => {
              const FeatureIcon = feature.icon;
              return (
                <AnimatedSection key={feature.title} delay={i * 0.1}>
                  <div className="group glass-card rounded-xl p-5 sm:p-6 h-full hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-brand-600/5 hover:border-brand-200 dark:hover:border-brand-700">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-600 shadow-lg shadow-brand-600/20 group-hover:scale-110 transition-transform duration-300">
                      <FeatureIcon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Process Section (Dark) ── */}
      <section className="py-16 sm:py-24 bg-section-dark relative overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-10" />
        <div className="absolute top-1/4 -left-32 h-80 w-80 rounded-full bg-brand-600/15 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 h-72 w-72 rounded-full bg-accent-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 sm:mb-16">
            <Badge className="mb-4 border-white/30 bg-white/10 text-white">
              How It Works
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-white lg:text-4xl">
              From Start to{" "}
              <span className="text-accent-300">Results</span>
            </h2>
          </AnimatedSection>

          <div className="relative">
            {/* Desktop connecting line */}
            <div className="hidden lg:block absolute top-8 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px bg-gradient-to-r from-brand-400/50 via-accent-400/50 to-brand-400/50" />

            <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
              {content.process.map((step, i) => (
                <AnimatedSection key={step.step} delay={i * 0.12}>
                  <div className="flex flex-col items-center text-center">
                    <div className="relative z-10 mb-4 sm:mb-6 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-600 shadow-xl shadow-brand-600/30 border-4 border-section-dark">
                      <span className="text-xs sm:text-sm font-bold text-white">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-2 sm:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10 sm:mb-0 lg:hidden">
            <Badge className="mb-4">FAQ</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Common <span className="gradient-text">Questions</span>
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm">
              Everything you need to know about our {service.title.toLowerCase()} service.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left: sticky heading (desktop only) */}
            <div className="hidden lg:block lg:col-span-2 lg:sticky lg:top-32 lg:self-start">
              <AnimatedSection>
                <Badge className="mb-4">FAQ</Badge>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                  Common{" "}
                  <span className="gradient-text">Questions</span>
                </h2>
                <p className="mt-4 text-slate-600 dark:text-slate-400">
                  Everything you need to know about our {service.title.toLowerCase()} service.
                </p>
              </AnimatedSection>
            </div>

            {/* Right: accordion */}
            <div className="lg:col-span-3">
              <AnimatedSection delay={0.1}>
                <Accordion type="single" collapsible className="space-y-3">
                  {content.faq.map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`faq-${i}`}
                      className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 sm:px-6 data-[state=open]:shadow-md data-[state=open]:border-brand-200 dark:data-[state=open]:border-brand-700 transition-all"
                    >
                      <AccordionTrigger className="text-left text-sm font-semibold text-slate-900 dark:text-white hover:no-underline py-4">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pb-4">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-16 sm:py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-900">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-brand-100/50 dark:bg-brand-900/30 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl leading-tight">
              Ready to <span className="gradient-text">Get Started</span>?
            </h2>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Book a free consultation and see how we can help grow your business.
            </p>
            <div className="mt-8 sm:mt-10">
              <div className="btn-gradient-wrap rounded-md inline-block">
                <Button
                  asChild
                  size="lg"
                  className="btn-gradient text-white text-base px-8 border-0"
                >
                  <Link href="/contact">
                    Book Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
