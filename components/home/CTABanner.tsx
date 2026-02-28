import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/shared/AnimatedSection";
import MagneticButton from "@/components/shared/MagneticButton";

export default function CTABanner() {
  return (
    <section className="py-24 relative overflow-hidden bg-section-dark">
      <div className="grid-pattern absolute inset-0 opacity-30" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-brand-600/15 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl leading-tight">
            Ready to Scale Your Sales?
          </h2>
          <p className="mt-5 text-lg text-white/70 max-w-xl mx-auto">
            Book a free 30-minute strategy call. We&apos;ll audit your current
            outbound process and tell you exactly how we&apos;d fill your
            pipeline.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton>
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
            </MagneticButton>
            <MagneticButton magneticStrength={6}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white/80 hover:bg-white/10 hover:text-white text-base px-8"
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </MagneticButton>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
