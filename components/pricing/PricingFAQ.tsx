import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PRICING_FAQ } from "@/lib/constants";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Badge from "@/components/shared/Badge";

export default function PricingFAQ() {
  return (
    <section className="relative py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      <div className="absolute bottom-1/3 -right-24 h-[20rem] w-[20rem] rounded-full bg-brand-100/40 dark:bg-brand-900/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left heading — sticky on desktop */}
          <AnimatedSection className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start">
            <Badge className="mb-4">FAQ</Badge>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Common Questions
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
              Everything you need to know before getting started. Can&apos;t find
              what you&apos;re looking for? Reach out to our team.
            </p>
          </AnimatedSection>

          {/* Right accordion */}
          <AnimatedSection delay={0.1} className="lg:col-span-3">
            <Accordion type="single" collapsible className="space-y-3">
              {PRICING_FAQ.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="glass-card rounded-xl border-0 px-6"
                >
                  <AccordionTrigger className="text-slate-900 dark:text-white hover:text-brand-600 hover:no-underline text-left font-medium py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
