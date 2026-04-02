import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "R4Referral's Terms and Conditions — the rules governing your use of our platform and services.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <PageHeader
        badge="Legal"
        title="Terms &amp; Conditions"
        subtitle="Effective Date: October 17, 2025"
      />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-10">
            <div className="space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed">

              <div>
                <p>
                  These Terms and Conditions (&quot;Terms&quot;) govern the use of services provided by R4Referral LLC
                  (&quot;R4Referral,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By accessing or using
                  R4Referral&apos;s services, website, or related applications (collectively referred to as the
                  &quot;Services&quot;), you (&quot;you,&quot; &quot;your,&quot; or &quot;User&quot;) agree to be bound
                  by these Terms. If you do not agree, you must discontinue use of the Services immediately.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">1. About R4Referral LLC</h2>
                <p>
                  R4Referral LLC connects businesses and professionals with high-quality referrals and marketing
                  solutions designed to help streamline client acquisition. Our services are powered by human expertise
                  and data-driven systems to optimize engagement, conversions, and growth.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">2. Acceptance of Terms</h2>
                <p>
                  By using our Services, you agree to comply with and be bound by these Terms. If you are using the
                  Services on behalf of a company or organization, you represent that you have the authority to bind
                  that entity to these Terms. In such cases, &quot;you&quot; and &quot;your&quot; refer to that organization.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">3. Modifications to Terms</h2>
                <p>
                  R4Referral reserves the right to modify or update these Terms at any time. The revised version will be
                  effective immediately upon posting. The &quot;Effective Date&quot; at the top of this document will reflect the
                  latest update. Continued use of our Services after any modification constitutes your acceptance of the new Terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">4. Communications Consent</h2>
                <p>
                  By providing your contact information and using our Services, you agree that R4Referral and its
                  partners may contact you via phone, SMS, or email. This may include automated or pre-recorded
                  messages related to service updates, offers, or referrals.
                </p>
                <p className="mt-3">
                  Standard carrier rates may apply. You can opt out of SMS communication at any time by replying
                  &quot;STOP&quot; to any message. Opting out may affect your ability to receive certain service-related updates.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">5. Carrier Liability Disclaimer</h2>
                <p>
                  Mobile carriers are not liable for delayed or undelivered messages. R4Referral LLC is not responsible
                  for any delays or failures in SMS delivery caused by your mobile carrier or network conditions.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">6. Age Requirement</h2>
                <p>
                  You must be at least 18 years old to use our Services and opt in to receive SMS communications from
                  R4Referral LLC. By using our Services, you represent and warrant that you meet this age requirement.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">7. User Responsibilities</h2>
                <p>You agree to:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Provide accurate and complete information when registering or communicating with R4Referral.</li>
                  <li>Use the Services only for lawful purposes.</li>
                  <li>Promptly notify us of any change to your contact details, including your phone number or email address.</li>
                </ul>
                <p className="mt-3">
                  You are responsible for any damages, claims, or expenses resulting from your misuse of the Services or
                  failure to provide accurate information.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">8. Refund Policy</h2>
                <p>
                  Refund eligibility and conditions are governed by the official Refund Policy of R4Referral LLC,
                  effective as of the execution date of your Referral or Service Agreement.
                </p>
                <p className="mt-3">Refund requests must:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Be submitted in writing within sixty (60) calendar days of the agreement execution date.</li>
                  <li>Meet the specific eligibility terms described in the Refund Policy.</li>
                </ul>
                <p className="mt-3">
                  All approved refunds are subject to a minimum 15% non-refundable deduction for processing and
                  administrative costs. If services or campaigns have commenced, R4Referral reserves the right to
                  retain up to 50% of the total payment to cover operational expenses.
                </p>
                <p className="mt-3">
                  Voluntary cancellations, withdrawal from services, or change of mind do not qualify for refunds.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">9. Confidential Information</h2>
                <p>
                  Both parties agree to maintain the confidentiality of all non-public information shared in connection
                  with the Services. Confidential Information includes, but is not limited to, business strategies, data,
                  and client lists.
                </p>
                <p className="mt-3">Confidential Information does not include information that:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Is or becomes publicly available without breach of these Terms.</li>
                  <li>Was already known by the receiving party before disclosure.</li>
                  <li>Was lawfully obtained from a third party without confidentiality obligations.</li>
                </ul>
                <p className="mt-3">
                  R4Referral may share relevant information with authorized partners as necessary to deliver the Services,
                  in compliance with privacy laws.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">10. Data Usage and Disclosure</h2>
                <p>By using our Services, you authorize R4Referral to collect, process, and use your data for the following purposes:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Delivering and improving Services</li>
                  <li>Providing customer support</li>
                  <li>Detecting and preventing fraudulent activity</li>
                  <li>Complying with legal obligations</li>
                  <li>Responding to emergencies or government requests</li>
                </ul>
                <p className="mt-3">For more details, refer to our Privacy Policy.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">11. Warranty Disclaimer</h2>
                <p>
                  R4Referral provides all Services &quot;as is&quot; and makes no warranties, express or implied, including
                  but not limited to:
                </p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Warranties of merchantability or fitness for a particular purpose</li>
                  <li>Accuracy, reliability, or availability of the Services</li>
                  <li>Non-infringement of third-party rights</li>
                </ul>
                <p className="mt-3">You use the Services at your own risk.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">12. Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless R4Referral LLC, its officers, employees, and partners from
                  any claims, damages, losses, or expenses arising from:
                </p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Your use or misuse of the Services</li>
                  <li>Violation of these Terms</li>
                  <li>Violation of any law or third-party rights</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">13. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, R4Referral LLC shall not be liable for any indirect, incidental,
                  special, or consequential damages, including loss of revenue, profits, or data.
                </p>
                <p className="mt-3">
                  In no event shall R4Referral&apos;s total liability exceed the amount you paid within the twelve (12)
                  months preceding the claim.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">14. Governing Law and Dispute Resolution</h2>
                <p>
                  These Terms shall be governed by the laws of the State of Virginia, USA, without regard to conflict
                  of law principles.
                </p>
                <p className="mt-3">
                  Any dispute arising from these Terms shall be resolved through binding arbitration in Virginia, in
                  accordance with the rules of the American Arbitration Association (AAA). Each party shall bear its
                  own costs and share arbitration fees equally.
                </p>
                <p className="mt-3">
                  You agree not to participate in any class, collective, or representative action against R4Referral.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">15. Force Majeure</h2>
                <p>
                  R4Referral shall not be held liable for any failure or delay in performance caused by circumstances
                  beyond its control, including natural disasters, labor strikes, war, or government actions.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">16. Notices</h2>
                <p>All notices must be in writing and sent to:</p>
                <p className="mt-3">
                  R4Referral LLC<br />
                  Email:{" "}
                  <a href="mailto:info@r4referral.com" className="text-brand-600 hover:underline">info@r4referral.com</a><br />
                  Attn: Legal Department
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">17. Entire Agreement</h2>
                <p>
                  These Terms, along with any signed Referral or Service Agreement and incorporated policies (such as
                  Refund and Privacy Policies), represent the entire understanding between you and R4Referral LLC. Any
                  prior agreements or understandings are hereby superseded.
                </p>
                <p className="mt-3">
                  By using R4Referral&apos;s Services, you acknowledge that you have read, understood, and agreed to
                  these Terms and Conditions.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
