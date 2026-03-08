import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Badge from "@/components/shared/Badge";
import AnimatedSection from "@/components/shared/AnimatedSection";
import PricingCards from "@/components/pricing/PricingCards";
import PricingFAQ from "@/components/pricing/PricingFAQ";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for outbound sales teams of every size. No hidden fees, no long-term contracts.",
};

export default function PricingPage() {
  return (
    <>
      {/* Header */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-950 py-24 text-center">
        <div className="grid-pattern absolute inset-0" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-72 w-72 rounded-full bg-brand-100/60 dark:bg-brand-900/30 blur-3xl" />
        <div className="absolute top-1/2 -right-24 h-48 w-48 rounded-full bg-accent-100/40 dark:bg-accent-900/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4">
          <div className="flex justify-center mb-4">
            <Badge>Pricing</Badge>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            No hidden fees. No lock-in contracts. Pick the plan that fits your
            growth goals and scale up anytime.
          </p>
        </div>
      </div>

      <PricingCards />
      <PricingFAQ />

      {/* Bottom CTA */}
      <section className="py-24 relative overflow-hidden bg-section-dark">
        <div className="grid-pattern absolute inset-0 opacity-30" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-brand-600/15 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-white sm:text-4xl leading-tight">
              Not Sure Which Plan Is Right?
            </h2>
            <p className="mt-5 text-lg text-white/70 max-w-xl mx-auto">
              Book a free 30-minute strategy call. We&apos;ll help you pick the
              perfect plan and get your first leads rolling in days.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <div className="btn-gradient-wrap rounded-md">
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
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white/80 hover:bg-white/10 hover:text-white text-base px-8"
              >
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
