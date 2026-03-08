import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Badge from "@/components/shared/Badge";
import AnimatedSection from "@/components/shared/AnimatedSection";
import ServiceCards from "@/components/services/ServiceCards";
import ServiceProcess from "@/components/services/ServiceProcess";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our full suite of services: real estate lead generation, virtual assistant, CRM platform, virtual staging, and website development.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-950 pt-24 pb-12 text-center">
        <div className="grid-pattern absolute inset-0" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-72 w-72 rounded-full bg-brand-100/60 dark:bg-brand-900/30 blur-3xl" />
        <div className="absolute top-1/2 -left-24 h-48 w-48 rounded-full bg-accent-100/40 dark:bg-accent-900/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4">
          <div className="flex justify-center mb-4">
            <Badge>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-600 animate-pulse" />
              Our Services
            </Badge>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Everything You Need to{" "}
            <span className="gradient-text">Grow Your Business</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            End-to-end solutions powered by trained professionals. No
            freelancers, no offshore chaos — just results.
          </p>
        </div>
      </div>

      <ServiceCards />
      <ServiceProcess />

      {/* Bottom CTA */}
      <section className="py-24 relative overflow-hidden bg-white dark:bg-slate-950">
        <div className="grid-pattern absolute inset-0" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-brand-100/50 dark:bg-brand-900/30 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <Badge className="mb-4">Get Started</Badge>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl leading-tight">
              Ready to <span className="gradient-text">Grow Your Business</span>?
            </h2>
            <p className="mt-5 text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Get started with verified leads tailored to your market.
              Sign up today and start receiving leads within days.
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
                className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-base px-8"
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
