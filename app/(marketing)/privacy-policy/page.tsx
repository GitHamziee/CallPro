import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "R4Referral's Privacy Policy — how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        badge="Legal"
        title="Privacy Policy"
        subtitle="Last updated: March 24, 2026"
      />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-10">
            <div className="space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed">

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Overview</h2>
                <p>
                  This Privacy Policy explains how R4Referral (&quot;R4Referral,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
                  collects, uses, and protects your information when you use our websites, platforms, lead services,
                  tools, and related offerings (collectively, the &quot;Services&quot;).
                </p>
                <p className="mt-3">
                  By accessing or using the Services, you consent to the collection, use, and disclosure of
                  information as described in this Privacy Policy.
                </p>
                <p className="mt-3">
                  If you do not agree with this Privacy Policy, please discontinue use of the Services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Consent to Communications</h2>
                <p>
                  By submitting your contact information through the Services, you expressly consent to receive
                  communications from R4Referral and licensed real estate professionals in our referral network.
                </p>
                <p className="mt-3">These communications may include:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Phone calls</li>
                  <li>SMS / text messages</li>
                  <li>Automated telephone dialing systems</li>
                  <li>Artificial or prerecorded voice messages</li>
                  <li>Email communications</li>
                </ul>
                <p className="mt-3">These communications may relate to:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Real estate inquiries</li>
                  <li>Real estate services</li>
                  <li>Referral services</li>
                  <li>Marketing offers related to your inquiry</li>
                </ul>
                <p className="mt-3">
                  Consent to receive communications is not required to purchase property, goods, or services.
                </p>
                <p className="mt-3">
                  You may opt out of SMS messages at any time by replying <strong>STOP</strong>.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Types of Messaging</h2>
                <p>Our messaging may include three categories:</p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-1">Conversational Messages</h3>
                <p>
                  Messages sent during one-to-one conversations with users who have contacted us or requested information.
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-1">Informational Messages</h3>
                <p>
                  Messages providing updates regarding inquiries, services, or transactions.
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-1">Promotional Messages</h3>
                <p>
                  Marketing messages about services that may be relevant to your interests. Promotional messages
                  are sent only to users who have provided consent.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Information We Collect</h2>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">Information You Provide</h3>
                <p>We collect information when you:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Create an account</li>
                  <li>Submit a contact form</li>
                  <li>Request real estate information</li>
                  <li>Communicate with us</li>
                  <li>Participate in surveys or feedback</li>
                  <li>Subscribe to updates</li>
                </ul>
                <p className="mt-3">This information may include:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Physical address</li>
                  <li>Business or brokerage information</li>
                  <li>Real estate preferences</li>
                  <li>Campaign details</li>
                  <li>Billing information</li>
                </ul>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">Automatically Collected Information</h3>
                <p>When you access our Services, we may automatically collect certain technical information including:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>IP address</li>
                  <li>Device identifiers</li>
                  <li>Browser type and language</li>
                  <li>Operating system</li>
                  <li>Geolocation data</li>
                  <li>Pages visited and interactions</li>
                  <li>Referral sources</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Cookies and Tracking Technologies</h2>
                <p>We may use cookies, server logs, tracking pixels, and other technologies to:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Recognize returning users</li>
                  <li>Remember preferences</li>
                  <li>Analyze traffic patterns</li>
                  <li>Improve user experience</li>
                  <li>Measure advertising effectiveness</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Cross-Device Usage</h2>
                <p>
                  We may use certain information (such as login credentials, IP addresses, or device identifiers)
                  to recognize users across multiple devices or browsers.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Location Information</h2>
                <p>We may collect location information such as:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>IP-based geographic location</li>
                  <li>Mobile device GPS data (if enabled)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Information From Third Parties</h2>
                <p>We may obtain information from:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Marketing partners</li>
                  <li>Analytics providers</li>
                  <li>Identity verification services</li>
                  <li>Fraud prevention systems</li>
                  <li>Affiliated businesses</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">How We Use Your Information</h2>
                <p>We use collected information to:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Provide and operate the Services</li>
                  <li>Match real estate inquiries with licensed professionals</li>
                  <li>Verify user identity</li>
                  <li>Process transactions</li>
                  <li>Communicate regarding inquiries and services</li>
                  <li>Send marketing communications (with consent)</li>
                  <li>Analyze user behavior and improve the platform</li>
                  <li>Detect and prevent fraud or abuse</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Lead Distribution</h2>
                <p>
                  When you submit a real estate inquiry through R4Referral, your information may be shared with
                  licensed real estate professionals participating in our referral network.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">How We Share Information</h2>
                <p>
                  We may share your information with service providers, business partners, and for legal
                  requirements or business transfers. We do not sell or share SMS opt-in data or consent
                  information with third parties for marketing purposes.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Data Retention</h2>
                <p>
                  We retain personal information for as long as necessary to provide our Services and comply
                  with legal obligations, typically up to 24 months.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Managing Your Information</h2>
                <p>
                  You may access, update, or request deletion of your information by contacting us at{" "}
                  <a href="mailto:info@r4referral.com" className="text-brand-600 hover:underline">info@r4referral.com</a>.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Children&apos;s Privacy</h2>
                <p>
                  Our Services are not intended for individuals under the age of 13. We do not knowingly
                  collect personal information from children under 13.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Security</h2>
                <p>
                  We implement administrative, technical, and physical safeguards to protect personal
                  information. However, no system is completely secure and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Third-Party Links</h2>
                <p>
                  Our Services may contain links to external websites. We are not responsible for the privacy
                  practices of those sites and encourage you to review their policies.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">California Privacy Rights</h2>
                <p>
                  California residents may request information about their personal data or request deletion
                  under applicable California law, including the CCPA. To submit a request, contact us at{" "}
                  <a href="mailto:info@r4referral.com" className="text-brand-600 hover:underline">info@r4referral.com</a>.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy periodically. The &quot;Last Updated&quot; date at the top of
                  this page reflects any changes. Continued use of the Services after updates constitutes
                  your acceptance of the revised policy.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Contact Us</h2>
                <p>
                  R4Referral LLC<br />
                  5900 Balcones Dr, Ste 100, Austin, TX 78731<br />
                  Email:{" "}
                  <a href="mailto:info@r4referral.com" className="text-brand-600 hover:underline">info@r4referral.com</a>
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
