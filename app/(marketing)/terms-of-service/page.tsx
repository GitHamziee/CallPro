import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "CallPro's Terms of Service — the rules governing your use of our platform and services.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <PageHeader
        badge="Legal"
        title="Terms of Service"
        subtitle="Last updated: January 1, 2025"
      />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-10">
            <div className="space-y-8 text-slate-600 leading-relaxed">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using CallPro&apos;s website and services, you agree to be bound by
                  these Terms of Service. If you do not agree to these terms, please do not use our
                  services. We reserve the right to modify these terms at any time with notice to users.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Description of Services</h2>
                <p>
                  CallPro provides outbound sales services including cold calling, appointment setting,
                  lead qualification, CRM management, and related services as described on our website
                  and in your service agreement. The specific services, scope, and deliverables are
                  defined in the applicable order form or service agreement.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Client Obligations</h2>
                <p>You agree to:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside text-slate-600">
                  <li>Provide accurate and complete information for campaign setup</li>
                  <li>Ensure all contact lists comply with applicable laws (TCPA, CAN-SPAM, etc.)</li>
                  <li>Promptly respond to CallPro communications</li>
                  <li>Pay all fees as specified in your service agreement</li>
                  <li>Not use our services for any unlawful purpose</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Payment Terms</h2>
                <p>
                  Fees are charged monthly in advance. Payment is due within 5 business days of invoice.
                  Late payments may incur a 1.5% monthly late fee. We reserve the right to suspend
                  services for accounts more than 15 days past due.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Intellectual Property</h2>
                <p>
                  All scripts, templates, processes, and methodologies developed by CallPro remain the
                  intellectual property of CallPro. Client-provided materials remain the property of the
                  client. Call recordings from campaigns are available to clients for review purposes.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Limitation of Liability</h2>
                <p>
                  CallPro shall not be liable for any indirect, incidental, special, or consequential
                  damages. Our total liability for any claim shall not exceed the fees paid in the
                  three months preceding the claim. We do not guarantee specific results from campaigns
                  as outcomes depend on multiple market factors.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Termination</h2>
                <p>
                  Either party may terminate services with 30 days written notice. CallPro may terminate
                  immediately for material breach, non-payment, or violation of these terms. Upon
                  termination, all outstanding fees become immediately due.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">8. Governing Law</h2>
                <p>
                  These terms are governed by the laws of the State of New York. Any disputes shall be
                  resolved through binding arbitration in New York City, NY.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
