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
        subtitle="R4Referral LLC"
      />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-10">
            <div className="space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed">

              <p className="text-sm text-slate-500 dark:text-slate-400">Effective Date: April 8, 2026</p>

              <div>
                <p>
                  R4Referral LLC (&quot;R4Referral,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) values your
                  privacy and is committed to protecting your personal information. This Privacy Policy explains how we
                  collect, use, share, and safeguard your information when you use our websites, services, tools, and
                  applications (collectively, the &quot;Services&quot;). This policy also ensures compliance with A2P 10DLC
                  messaging requirements, the Telephone Consumer Protection Act (TCPA), and CTIA guidelines.
                </p>
                <p className="mt-3">
                  By using our Services, you consent to the practices described in this Privacy Policy.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">1. Business Information</h2>
                <ul className="space-y-1">
                  <li><strong className="text-slate-800 dark:text-slate-200">Business Name:</strong> R4Referral LLC</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Legal Business Name:</strong> R4Referral LLC</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">EIN:</strong> 41-4535461</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Business Type:</strong> Limited Liability Company</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Industry:</strong> Real Estate</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Website:</strong>{" "}
                    <a href="https://r4referral.com" className="text-brand-600 hover:underline">https://r4referral.com</a>
                  </li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Address:</strong> 5900 Balcones Drive STE 100, Austin, TX 78731, USA</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Phone:</strong>{" "}
                    <a href="tel:+15126780096" className="text-brand-600 hover:underline">+1 (512) 678-0096</a>
                  </li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Email:</strong>{" "}
                    <a href="mailto:r4referral@gmail.com" className="text-brand-600 hover:underline">r4referral@gmail.com</a>
                  </li>
                  <li><strong className="text-slate-800 dark:text-slate-200">CEO / Authorized Representative:</strong> Muhammad Hamza Lon</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">2. Information We Collect</h2>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">2.1 Personal Information</h3>
                <p>We may collect the following information when you voluntarily provide it:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Physical or business address</li>
                  <li>Payment information (if applicable)</li>
                  <li>Referral or service-related details</li>
                  <li>SMS and email consent records, including timestamps and source of opt-in</li>
                </ul>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">2.2 Non-Personal Information</h3>
                <p>We automatically collect certain technical information, such as:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>IP address</li>
                  <li>Browser type and device information</li>
                  <li>Website usage data and analytics</li>
                  <li>Cookies, pixels, and similar tracking technologies</li>
                </ul>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">2.3 Third-Party Information</h3>
                <p>We may receive information from:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Marketing or advertising partners</li>
                  <li>Analytics providers</li>
                  <li>CRM and communication platforms</li>
                  <li>Verification or demographic services</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">3. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Provide, operate, and improve our Services</li>
                  <li>Process inquiries, referrals, and transactions</li>
                  <li>Send service-related updates and notifications</li>
                  <li>Deliver marketing and promotional communications (only with consent)</li>
                  <li>Conduct analytics and performance monitoring</li>
                  <li>Maintain legal and regulatory compliance</li>
                  <li>Prevent fraud and enhance security</li>
                </ul>
                <p className="mt-3">
                  We may contact you via phone, SMS, email, WhatsApp, LinkedIn, or Facebook, but promotional messages
                  are only sent to users who have explicitly opted in.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">4. SMS Messaging &amp; A2P Compliance</h2>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">4.1 Consent &amp; Opt-In</h3>
                <p>
                  By providing your phone number and opting in through our website forms, checkboxes, or other
                  communication channels, you expressly consent to receive SMS messages from R4Referral LLC. All
                  opt-ins are recorded with a timestamp and source for compliance.
                </p>
                <p className="mt-3"><strong className="text-slate-800 dark:text-slate-200">Types of Messages:</strong></p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Appointment confirmations and reminders</li>
                  <li>Referral updates</li>
                  <li>Service notifications</li>
                  <li>Promotional and marketing messages (only with explicit consent)</li>
                </ul>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">4.2 Opt-Out Instructions</h3>
                <p>
                  You may opt out of SMS communications at any time by replying{" "}
                  <strong className="text-slate-800 dark:text-slate-200">STOP</strong> to any message. After opting out,
                  you will receive a confirmation message, and no further SMS messages will be sent unless you opt in again.
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">4.3 Help &amp; Support</h3>
                <p>
                  For assistance, reply <strong className="text-slate-800 dark:text-slate-200">HELP</strong> to any SMS
                  message or contact us:
                </p>
                <p className="mt-2">
                  Email:{" "}
                  <a href="mailto:r4referral@gmail.com" className="text-brand-600 hover:underline">r4referral@gmail.com</a><br />
                  Phone:{" "}
                  <a href="tel:+15126780096" className="text-brand-600 hover:underline">+1 (512) 678-0096</a>
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">4.4 Message Frequency</h3>
                <p>
                  Message frequency varies depending on your interactions with our Services. Message and data rates may apply.
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">4.5 Carrier Disclaimer</h3>
                <p>
                  Mobile carriers are not responsible for delayed or undelivered messages.
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">4.6 No Sharing of SMS Opt-In Information (CRITICAL)</h3>
                <p>
                  R4Referral LLC does not sell, rent, or share SMS opt-in information or phone numbers with third parties
                  for their marketing or promotional purposes.
                </p>
                <p className="mt-3">
                  SMS consent is used solely for communicating with you regarding the services you have requested. We may
                  share your information only with trusted service providers (such as CRM systems or SMS delivery platforms)
                  strictly for operational purposes and under confidentiality obligations. These providers are not permitted
                  to use your information for their own marketing purposes.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">5. Information Sharing &amp; Disclosure</h2>
                <p>We do not sell or trade your personal information. We may share information only in the following circumstances:</p>
                <ul className="mt-2 space-y-2 list-disc list-inside">
                  <li><strong className="text-slate-800 dark:text-slate-200">Service Providers:</strong> With trusted vendors (e.g., CRM platforms, SMS providers, analytics tools) who assist in operating our business and are bound by confidentiality agreements.</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">With Your Consent:</strong> When you explicitly authorize us to share your information.</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Legal Compliance:</strong> To comply with applicable laws, regulations, legal processes, or governmental requests.</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Protection of Rights:</strong> To protect the rights, property, or safety of R4Referral, our users, or others.</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Business Transfers:</strong> In connection with a merger, acquisition, or sale of company assets.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">6. Data Security</h2>
                <p>We implement industry-standard security measures, including:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Encryption of sensitive data</li>
                  <li>Secure access controls</li>
                  <li>Employee training on data protection</li>
                  <li>System monitoring and regular backups</li>
                </ul>
                <p className="mt-3">
                  While we strive to protect your information, no method of transmission over the internet is completely
                  secure. Users are encouraged to safeguard their account credentials.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">7. Cookies &amp; Tracking Technologies</h2>
                <p>We use cookies and similar technologies to:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Enhance website functionality</li>
                  <li>Analyze user behavior</li>
                  <li>Remember user preferences</li>
                </ul>
                <p className="mt-3">You can manage or disable cookies through your browser settings.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">8. User Rights &amp; Choices</h2>
                <p>You have the right to:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Access, update, or delete your personal information</li>
                  <li>Opt out of SMS or email communications at any time</li>
                  <li>Withdraw consent for data processing</li>
                  <li>Request details about how your data is used</li>
                </ul>
                <p className="mt-3">To exercise these rights, please contact us using the information below.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">9. Children&apos;s Privacy</h2>
                <p>
                  Our Services are not intended for children under the age of 13. We do not knowingly collect personal
                  information from minors. If such information is discovered, it will be promptly deleted.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">10. Third-Party Links</h2>
                <p>
                  Our website may contain links to third-party websites. We are not responsible for their privacy practices
                  or content. We encourage users to review the privacy policies of those websites.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">11. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with a
                  revised Effective Date. Continued use of our Services after such updates constitutes acceptance of the
                  revised policy.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">12. Contact Information</h2>
                <p>
                  R4Referral LLC<br />
                  5900 Balcones Drive STE 100<br />
                  Austin, TX 78731, USA
                </p>
                <p className="mt-3">
                  Phone:{" "}
                  <a href="tel:+15126780096" className="text-brand-600 hover:underline">+1 (512) 678-0096</a><br />
                  Email:{" "}
                  <a href="mailto:r4referral@gmail.com" className="text-brand-600 hover:underline">r4referral@gmail.com</a><br />
                  Website:{" "}
                  <a href="https://r4referral.com" className="text-brand-600 hover:underline">https://r4referral.com</a>
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
