import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
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
      <PageHeader
        badge="Pricing"
        title="Simple, Transparent Pricing"
        subtitle="No hidden fees. No lock-in contracts. Pick the plan that fits your growth goals and scale up anytime."
      />
      <PricingCards />
      <PricingFAQ />
    </>
  );
}
