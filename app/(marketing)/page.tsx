import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";

// Below-fold sections — lazy loaded to reduce initial JS bundle
const StatsBar = dynamic(() => import("@/components/home/StatsBar"));
const HowItWorks = dynamic(() => import("@/components/home/HowItWorks"));
const ServicesOverview = dynamic(() => import("@/components/home/ServicesOverview"));
const Testimonials = dynamic(() => import("@/components/home/Testimonials"));

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <HowItWorks />
      <ServicesOverview />
      <TrustBar />
      <Testimonials />
    </>
  );
}
