import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import StatsBar from "@/components/home/StatsBar";
import ServicesOverview from "@/components/home/ServicesOverview";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <StatsBar />
      <HowItWorks />
      <ServicesOverview />
      <Testimonials />
    </>
  );
}
