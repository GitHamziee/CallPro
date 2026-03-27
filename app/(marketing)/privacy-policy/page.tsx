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
        subtitle="How we collect, use, share, and protect your information."
      />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-10">
            <div className="space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed">

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Policy Overview</h2>
                <p>
                  This Privacy Policy explains how R4Referral LLC (&quot;R4Referral,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
                  collects, uses, shares, and protects information in connection with your use of our websites, products,
                  services, promotions, and tools, including www.r4referral.com (collectively referred to as the &quot;Services&quot;).
                </p>
                <p className="mt-3">
                  By using our Services, you authorize R4Referral LLC, its affiliates, partners, and service providers
                  to contact you via phone calls, text messages, and emails (including automated or prerecorded messages)
                  about services or offers that may interest you. Your consent to receive these communications is not a
                  condition for purchasing any property, product, or service.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Policy Changes</h2>
                <p>
                  We may update this Privacy Policy at any time to reflect changes in our practices or legal requirements.
                  Any updates will be posted on this page with a &quot;Last Updated&quot; date. You waive the right to receive
                  specific notice of each modification.
                </p>
                <p className="mt-3">
                  Please review this Policy periodically. By continuing to use our Services after any changes are posted,
                  you agree to the revised terms. If you do not agree, please discontinue using the Services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Information We Collect</h2>
                <p>
                  We collect information both directly (when you provide it to us) and automatically (through your device or browser).
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">1. Information You Provide</h3>
                <p>We may collect information when you:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Respond to our messages or promotions</li>
                  <li>Create an account</li>
                  <li>Request information, newsletters, or services</li>
                  <li>Participate in surveys or provide feedback</li>
                  <li>Share user-generated content such as comments or media</li>
                </ul>
                <p className="mt-3">The information you provide may include:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Physical address or workplace</li>
                  <li>Date of birth</li>
                  <li>Property preferences or interests</li>
                  <li>Financial or payment details (if applicable)</li>
                  <li>Photos, audio, or video content</li>
                </ul>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">2. Information Collected Automatically</h3>
                <p>We automatically collect certain data about how you access and use our Services, including:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>IP address, browser type, and operating system</li>
                  <li>Device identifiers (e.g., IMEI, MAC address)</li>
                  <li>Geographic location (general or GPS-based)</li>
                  <li>Usage data (pages viewed, time spent, actions taken)</li>
                </ul>
                <p className="mt-3">
                  We may use cookies, tracking pixels, and similar technologies to improve your experience and tailor
                  content or advertising. You can manage cookie preferences through your browser settings.
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">3. Information from Third Parties</h3>
                <p>
                  We may receive additional information about you from third parties, affiliates, or marketing partners.
                  This may include verification data, demographic insights, or fraud prevention data. We may combine
                  this with information we collect directly from you.
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">4. Cross-Device Tracking</h3>
                <p>
                  To provide a seamless experience across devices, we may use technologies to identify and link your
                  activities across multiple browsers or devices.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Provide, improve, and personalize our Services</li>
                  <li>Verify your identity and manage your account</li>
                  <li>Process transactions and deliver requested features</li>
                  <li>Send updates, offers, or service-related notifications</li>
                  <li>Conduct analytics, research, and performance tracking</li>
                  <li>Prevent fraud, ensure security, and comply with legal obligations</li>
                </ul>
                <p className="mt-3">
                  We may contact you via phone, SMS, WhatsApp, LinkedIn, Facebook, or email. You may opt out of
                  promotional communications at any time by following the instructions in the message or by contacting
                  us directly.
                </p>
                <p className="mt-3">
                  <strong className="text-slate-800 dark:text-slate-200">Note:</strong> We do not share text messaging
                  originator opt-in data or consent with third parties for marketing or promotional purposes.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Disclosure of Information</h2>
                <p>We may share your information in the following cases:</p>
                <ul className="mt-2 space-y-2 list-disc list-inside">
                  <li><strong className="text-slate-800 dark:text-slate-200">With your consent:</strong> When you allow us to share your information with partners or affiliates.</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">With service providers:</strong> Who perform functions such as marketing, analytics, or legal support on our behalf.</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">With business partners:</strong> When offering joint products or promotions.</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">For legal reasons:</strong> To comply with laws, protect our rights, or prevent fraud.</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">In business transfers:</strong> If R4Referral LLC merges, acquires, or sells assets, user data may be included in the transaction.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Online Analytics and Advertising</h2>
                <p>
                  We use third-party tools such as Google Analytics, Facebook, and DoubleClick to track performance
                  and deliver targeted ads. These tools may use cookies and other technologies to collect data about
                  your browsing behavior.
                </p>
                <p className="mt-3">
                  You can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.
                </p>
                <p className="mt-3">
                  Even if you opt out, you may still see ads — they just won&apos;t be personalized based on your data.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Do Not Track (DNT)</h2>
                <p>
                  Currently, we do not respond to DNT signals due to the lack of a standard definition across the industry.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Managing Your Data</h2>
                <p>
                  You may review, update, or request deletion of your personal information by contacting us at{" "}
                  <a href="mailto:info@r4referral.com" className="text-brand-600 hover:underline">info@r4referral.com</a>.
                </p>
                <p className="mt-3">
                  We will close your account and remove your information as soon as possible, subject to any legal or
                  business obligations that require us to retain certain data (such as fraud prevention, legal compliance,
                  or dispute resolution).
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Consent to Data Transfer</h2>
                <p>
                  By using our Services, you consent to the transfer and processing of your data in the United States
                  and other countries where our systems operate. Data protection laws in these jurisdictions may differ
                  from those in your country.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Children&apos;s Privacy</h2>
                <p>
                  Our Services are not intended for children under 13. We do not knowingly collect data from minors.
                  If we discover such data, it will be deleted promptly.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Security</h2>
                <p>
                  We use administrative, technical, and physical safeguards to protect your information. However, no
                  system is entirely secure. You are responsible for protecting your account credentials and notifying
                  us immediately if you suspect unauthorized access.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Third-Party Links</h2>
                <p>
                  Our Services may link to third-party websites or apps. We are not responsible for their content or
                  privacy practices. We encourage you to review their privacy policies before sharing any information.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">California Privacy Rights (CCPA)</h2>
                <p>
                  California residents have the right to request details about how we share personal information for
                  marketing purposes and to opt out of having their information &quot;sold&quot; under the California Consumer
                  Privacy Act (CCPA).
                </p>
                <p className="mt-3">
                  To submit a request, contact us at{" "}
                  <a href="mailto:info@r4referral.com" className="text-brand-600 hover:underline">info@r4referral.com</a>{" "}
                  with &quot;CCPA Request&quot; in the subject line.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Changes to This Policy</h2>
                <p>
                  We may revise this Privacy Policy periodically. Updates take effect when posted on our website.
                  Your continued use of our Services means you accept the updated terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Contact Us</h2>
                <p>
                  For questions or concerns about this Privacy Policy or our data practices, please contact us at:
                </p>
                <p className="mt-3">
                  R4Referral LLC<br />
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
