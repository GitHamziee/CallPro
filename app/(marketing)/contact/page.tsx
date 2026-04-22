import type { Metadata } from "next";
import Badge from "@/components/shared/Badge";
import ContactForm from "@/components/contact/ContactForm";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with R4Referral LLC. Start receiving verified real estate referrals tailored to your market.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const { contactEmail } = await getSiteSettings();

  return (
    <>
      <div className="relative overflow-hidden bg-white dark:bg-slate-950 pt-24 pb-12 text-center">
        <div className="grid-pattern absolute inset-0" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-72 w-72 rounded-full bg-brand-100/60 dark:bg-brand-900/30 blur-3xl" />
        <div className="absolute top-1/2 -right-24 h-48 w-48 rounded-full bg-accent-100/40 dark:bg-accent-900/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4">
          <div className="flex justify-center mb-4">
            <Badge>Contact Us</Badge>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Book Your Free{" "}
            <span className="gradient-text">Strategy Call</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            No commitment. No pressure. Just a straight conversation about
            whether we can help you scale.
          </p>
        </div>
      </div>
      <ContactForm contactEmail={contactEmail} />
    </>
  );
}
