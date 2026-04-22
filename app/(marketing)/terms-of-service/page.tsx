import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "R4Referral LLC's Terms and Conditions — the rules governing your use of our platform and services.",
};

export const dynamic = "force-dynamic";

export default async function TermsOfServicePage() {
  const { contactEmail } = await getSiteSettings();
  return (
    <>
      <PageHeader
        badge="Legal"
        title="Terms &amp; Conditions"
        subtitle="Last Updated: April 01, 2026"
      />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-10">
            <div className="space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed">

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using the services of R4Referral LLC, you agree to the following Terms and Conditions.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">2. Use of Services</h2>
                <p>
                  You agree to use our services only for lawful purposes and in accordance with these terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">3. SMS Communication</h2>
                <p>
                  By providing your phone number and opting in through our website, you consent to receive SMS messages
                  from R4Referral LLC. These messages may include alerts, promotions, notifications, appointment
                  reminders, and customer support updates.
                </p>
                <ul className="mt-3 space-y-1 list-disc list-inside">
                  <li>Message frequency may vary based on user interaction.</li>
                  <li>Message and data rates may apply depending on your mobile carrier.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">4. Opt-Out Instructions</h2>
                <p>
                  You can opt out of receiving SMS messages at any time by replying{" "}
                  <strong className="text-slate-800 dark:text-slate-200">STOP</strong> to any message. After opting out,
                  you will no longer receive SMS messages from us.
                </p>
                <p className="mt-3">
                  For assistance, reply <strong className="text-slate-800 dark:text-slate-200">HELP</strong> or contact
                  us directly.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">5. User Responsibilities</h2>
                <p>
                  You agree to provide accurate and complete information when using our services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">6. Age Requirement</h2>
                <p>
                  You must be at least 18 years old to use our services and opt in to receive SMS communications.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">7. Carrier Disclaimer</h2>
                <p>
                  Carriers are not liable for delayed or undelivered messages.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">8. Limitation of Liability</h2>
                <p>
                  R4Referral LLC shall not be held liable for any indirect, incidental, or consequential damages arising
                  from the use of our services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">9. Changes to Terms</h2>
                <p>
                  We reserve the right to update or modify these Terms &amp; Conditions at any time. Changes will be
                  effective immediately upon posting.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">10. Contact Information</h2>
                <p>
                  <strong className="text-slate-800 dark:text-slate-200">Address:</strong> R4Referral LLC, 5900 Balcones
                  Drive STE 100, Austin, TX 78731, USA
                </p>
                <p className="mt-2">
                  <strong className="text-slate-800 dark:text-slate-200">Email:</strong>{" "}
                  <a href={`mailto:${contactEmail}`} className="text-brand-600 hover:underline">{contactEmail}</a>
                </p>
                <p className="mt-2">
                  <strong className="text-slate-800 dark:text-slate-200">Phone:</strong>{" "}
                  <a href="tel:+15126780096" className="text-brand-600 hover:underline">+1 (512) 678-0096</a>
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
