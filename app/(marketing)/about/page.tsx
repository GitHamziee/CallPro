import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import MissionSection from "@/components/about/MissionSection";
import TeamSection from "@/components/about/TeamSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about R4Referral — our mission, values, and the team behind your outbound success.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        badge="About R4Referral"
        title="Built by Sales Leaders, For Sales Leaders"
        subtitle="We started R4Referral because we were frustrated with the inconsistency of outbound. We built the team and systems we always wished existed."
      />
      <MissionSection />
      <TeamSection />
    </>
  );
}
