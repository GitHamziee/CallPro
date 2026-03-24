import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "R4Referral's Terms and Conditions — the rules governing your use of our platform and services.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <PageHeader
        badge="Legal"
        title="Terms &amp; Conditions"
        subtitle="Last updated: March 24, 2026"
      />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-10">
            <div className="space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed">

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">1. About R4Referral</h2>
                <p>
                  R4Referral LLC is a digital real estate referral network that connects verified, high-intent
                  buyers and sellers with licensed agents across all 50 states. Our platform delivers
                  pre-qualified referrals directly to agents, helping them grow their business with
                  real opportunities — not cold contacts.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">2. Definitions</h2>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot; refers to R4Referral and its affiliates.</li>
                  <li>&quot;Client,&quot; &quot;you,&quot; &quot;your,&quot; or &quot;user&quot; refers to any individual or entity using R4Referral services.</li>
                  <li>&quot;Services&quot; refers to all offerings provided by R4Referral.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">3. Acceptance of Terms</h2>
                <p>
                  By accessing or using R4Referral services, you agree to be bound by these Terms and Conditions.
                  If you do not agree, you may not use our services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">4. Changes to Terms</h2>
                <p>
                  R4Referral may update these Terms at any time. We will notify you of material changes by
                  updating the &quot;Last Updated&quot; date. Continued use of our services after any update
                  constitutes your acceptance of the revised Terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">5. Communications &amp; SMS Messaging</h2>
                <p>
                  By providing your contact information and opting in, you consent to receive SMS messages,
                  phone calls, and emails from R4Referral including referral notifications, appointment
                  reminders, and account-related updates. Message frequency varies. Message and data rates
                  may apply.
                </p>
                <p className="mt-3">
                  Consent to receive communications is not a condition of purchase. You may opt out of SMS
                  at any time by replying <strong>STOP</strong> to any message. For help, reply <strong>HELP</strong> or
                  contact us at hello@r4referral.com.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">6. Client Obligations</h2>
                <p>You agree to:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Provide accurate and complete information</li>
                  <li>Comply with all applicable laws including TCPA and CAN-SPAM</li>
                  <li>Promptly respond to R4Referral communications</li>
                  <li>Pay all fees as agreed in your service arrangement</li>
                  <li>Not use our services for any unlawful purpose</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">7. Compliance with Laws</h2>
                <p>
                  Both parties agree to comply with all applicable federal, state, and local laws and
                  regulations in connection with the use of R4Referral services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">8. Payment Terms</h2>
                <p>
                  Fees are billed as agreed upon in your service arrangement. Payment is due within 5 business
                  days of invoice. Late payments may incur a 1.5% monthly late fee. R4Referral reserves the
                  right to suspend services for accounts more than 15 days past due.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">9. Chargeback and Payment Disputes</h2>
                <p>
                  All payments made are final. The Client expressly waives any right to initiate chargebacks
                  or payment reversals through their bank or card provider. Any disputes must be addressed
                  through R4Referral&apos;s internal resolution process. Any chargeback attempt will be treated
                  as a breach of contract, with R4Referral reserving full rights to dispute and recover losses.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">10. Refund Policy</h2>
                <p>
                  Refund requests must be submitted in writing within 60 calendar days of the original service
                  agreement date. A non-refundable 15% administrative fee applies to all refunds where no
                  material service has been rendered. Once services have commenced, up to 50% of total payment
                  may be withheld to cover operational costs. Refunds are not issued for voluntary cancellations
                  or change of mind. All refund determinations are made at the sole discretion of R4Referral
                  and are final.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">11. Lead Ownership &amp; Attribution</h2>
                <p>
                  Any referral or lead introduced through R4Referral&apos;s platform or network remains
                  attributable to R4Referral for a period of 12 months from the date of introduction.
                  Clients may not bypass R4Referral to independently engage with referred contacts during
                  this period without written consent.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">12. Non-Circumvention</h2>
                <p>
                  Clients may not directly solicit, hire, or engage any R4Referral employee, agent, or
                  contractor for a period of 12 months following the end of their service agreement without
                  prior written consent from R4Referral.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">13. Intellectual Property</h2>
                <p>
                  All scripts, processes, methodologies, software, and materials developed by R4Referral
                  remain the exclusive intellectual property of R4Referral. Client-provided materials remain
                  the property of the client.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">14. Confidential Information</h2>
                <p>
                  Both parties agree to keep confidential any proprietary or sensitive information received
                  from the other party and not to disclose it to third parties without prior written consent,
                  except as required by law.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">15. Data Disclosure</h2>
                <p>R4Referral may access or disclose your data in order to:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Deliver R4Referral services</li>
                  <li>Resolve technical issues or provide support</li>
                  <li>Protect R4Referral, its users, or the public</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">16. Service Disclaimer</h2>
                <p>
                  R4Referral services are provided &quot;as is&quot; without warranties of any kind, express or implied.
                  We do not guarantee specific outcomes, conversion rates, or results, as these depend on
                  factors outside our control.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">17. Indemnification</h2>
                <p>
                  You agree to defend, indemnify, and hold harmless R4Referral and its officers, directors,
                  employees, and affiliates from any claims, damages, or costs arising from your use of our
                  services or breach of these Terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">18. Limitation of Liability</h2>
                <p>
                  R4Referral&apos;s total liability to you for any claim arising out of or relating to these Terms
                  or our services shall not exceed the total fees paid by you in the 12 months preceding the
                  claim. In no event shall R4Referral be liable for indirect, incidental, or consequential damages.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">19. Termination</h2>
                <p>
                  Either party may terminate services with 30 days written notice. R4Referral may suspend or
                  terminate services immediately for breach of these Terms, non-payment, or conduct that
                  negatively impacts our platform or other clients. Upon termination, all outstanding fees
                  become immediately due.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">20. Force Majeure</h2>
                <p>
                  Neither party will be liable for failure to perform obligations due to causes beyond their
                  reasonable control, including natural disasters, acts of government, or other unforeseeable events.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">21. Governing Law</h2>
                <p>
                  These Terms are governed by the laws of the State of New York, without regard to conflict
                  of law principles. Any legal action shall be brought in state or federal courts in New York.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">22. Arbitration</h2>
                <p>
                  Any dispute arising from these Terms or R4Referral services shall be resolved through
                  binding arbitration in New York, or such other location as agreed upon by both parties.
                  The parties waive the right to a jury trial and agree not to bring class action claims.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">23. Entire Agreement</h2>
                <p>
                  These Terms constitute the entire agreement between you and R4Referral and supersede all
                  prior agreements, representations, or understandings, whether written or oral.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">24. Contact Information</h2>
                <p>
                  R4Referral LLC<br />
                  5900 Balcones Dr, Ste 100, Austin, TX 78731<br />
                  Email: <a href="mailto:info@r4referral.com" className="text-brand-600 hover:underline">info@r4referral.com</a>
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
