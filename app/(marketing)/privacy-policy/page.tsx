import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "R4Referral LLC's Privacy Policy — how we collect, use, and protect your data.",
};

export const dynamic = "force-dynamic";

export default async function PrivacyPolicyPage() {
  const { contactEmail } = await getSiteSettings();
  return (
    <>
      <PageHeader
        badge="Legal"
        title="Privacy Policy"
        subtitle="Last Updated: April 01, 2026"
      />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-10">
            <div className="space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed">

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">1. Introduction</h2>
                <p>
                  R4Referral LLC (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your
                  privacy and is committed to protecting your personal information.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">2. Information Collection and Use</h2>
                <p>
                  We may collect personal information such as your name, email address, phone number, and any other
                  details you provide when you fill out forms on our website or interact with our services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">3. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Provide, operate, and improve our services</li>
                  <li>Communicate with you regarding inquiries or services</li>
                  <li>Send SMS messages, updates, promotions, and notifications</li>
                  <li>Provide customer support</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">4. SMS Communication &amp; Consent</h2>
                <p>
                  By providing your phone number and submitting a form on our website, you consent to receive SMS
                  messages from R4Referral LLC. These messages may include alerts, promotions, reminders, and
                  service-related notifications.
                </p>
                <ul className="mt-3 space-y-1 list-disc list-inside">
                  <li>Message frequency may vary based on your interaction with our services.</li>
                  <li>Message and data rates may apply depending on your mobile carrier.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">5. Opt-Out Instructions</h2>
                <p>
                  You can opt out of receiving SMS messages at any time by replying{" "}
                  <strong className="text-slate-800 dark:text-slate-200">STOP</strong> to any message. After opting out,
                  you will no longer receive SMS communications from us.
                </p>
                <p className="mt-3">
                  For assistance, reply <strong className="text-slate-800 dark:text-slate-200">HELP</strong> or contact
                  us directly.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">6. Data Sharing &amp; Privacy</h2>
                <p>
                  No mobile information will be shared with third parties or affiliates for marketing or promotional
                  purposes. All SMS opt-in data and consent will not be shared with any third parties.
                </p>
                <p className="mt-3">
                  We may share your information only when required by law or to protect our legal rights.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">7. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal data from
                  unauthorized access, disclosure, or misuse.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">8. Cookies &amp; Tracking</h2>
                <p>
                  We may use cookies and similar technologies to enhance your experience on our website.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">9. Your Rights</h2>
                <p>
                  You may request to access, update, or delete your personal information by contacting us.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">10. Children&apos;s Privacy</h2>
                <p>
                  Our services are not intended for individuals under the age of 18.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">11. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy at any time. Changes will be posted on this page.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">12. Contact Information</h2>
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <p className="mt-3">
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
