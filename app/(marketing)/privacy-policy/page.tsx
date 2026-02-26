import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "CallPro's Privacy Policy — how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        badge="Legal"
        title="Privacy Policy"
        subtitle="Last updated: January 1, 2025"
      />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-10">
            <div className="space-y-8 text-slate-600 leading-relaxed">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Information We Collect</h2>
                <p>
                  We collect information you provide directly to us, such as when you fill out a contact form,
                  subscribe to our communications, or engage with our services. This may include your name,
                  email address, phone number, company name, and any other information you choose to provide.
                </p>
                <p className="mt-3">
                  We also automatically collect certain information when you visit our website, including
                  your IP address, browser type, operating system, referring URLs, and information about
                  your usage of the site through cookies and similar tracking technologies.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">2. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside text-slate-600">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Respond to your inquiries and send you requested information</li>
                  <li>Send you marketing and promotional communications (with your consent)</li>
                  <li>Analyze usage patterns and optimize our website performance</li>
                  <li>Comply with legal obligations and protect our rights</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Sharing of Information</h2>
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to outside parties
                  without your consent, except as described in this policy. We may share your information
                  with trusted third-party service providers who assist us in operating our website and
                  conducting our business, subject to confidentiality agreements.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Data Security</h2>
                <p>
                  We implement industry-standard security measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction. However, no method
                  of transmission over the Internet or electronic storage is 100% secure.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Cookies</h2>
                <p>
                  Our website uses cookies to enhance your browsing experience, analyze site traffic, and
                  personalize content. You can control cookie settings through your browser preferences.
                  Disabling cookies may affect certain features of our website.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Your Rights</h2>
                <p>
                  You have the right to access, correct, or delete your personal information at any time.
                  You may also opt out of marketing communications by following the unsubscribe instructions
                  in our emails or contacting us directly at privacy@callpro.com.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at
                  privacy@callpro.com or write to us at 123 Business Ave, New York, NY 10001.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
