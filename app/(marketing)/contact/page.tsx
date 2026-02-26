import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with CallPro. Book a free strategy call and find out how we can fill your pipeline.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        badge="Contact Us"
        title="Book Your Free Strategy Call"
        subtitle="No commitment. No pressure. Just a straight conversation about whether we can help you scale."
      />
      <ContactForm />
    </>
  );
}
