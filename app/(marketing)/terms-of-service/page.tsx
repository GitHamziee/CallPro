import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "R4Referral's Terms of Service — the rules governing your use of our platform and services.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <PageHeader
        badge="Legal"
        title="Terms &amp; Conditions"
        subtitle="Last updated: February 28, 2026"
      />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-10">
            <div className="space-y-8 text-slate-600 leading-relaxed">

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">About R4Referral</h2>
                <p>
                  R4Referral provides outbound sales services designed to help B2B companies scale their
                  pipeline. Through our trained agents, proven calling frameworks, and data-driven approach,
                  we deliver appointment setting, lead qualification, and outbound calling campaigns that
                  drive measurable results.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Definitions</h2>
                <p>
                  The terms &quot;we,&quot; &quot;us,&quot; &quot;our,&quot; and &quot;R4Referral&quot; refer to
                  R4Referral and its affiliates. &quot;You,&quot; &quot;your,&quot; and &quot;user&quot; refer to
                  the user. The term &quot;R4Referral services&quot; encompasses our phone-based and digital
                  services, our website and web application, along with various communications, email
                  notifications, and other media offered by R4Referral.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Changes to Terms</h2>
                <p>
                  We reserve the right to make changes to R4Referral&apos;s Terms and Conditions at any time
                  and for any reason. We will alert you about any changes by updating the &quot;Last
                  Updated&quot; date. Any changes or modifications will be effective immediately upon posting
                  the updated Terms and Conditions on the Site, and you waive the right to receive specific
                  notice of each such change.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Acceptance of Terms</h2>
                <p>
                  By utilizing R4Referral services, you consent to our Terms. Your usage of R4Referral services
                  implies that you have accepted and agreed to abide by these Terms. If you are accessing
                  R4Referral services on behalf of an entity, you agree to these Terms on behalf of that
                  organization and assure R4Referral that you possess the authority to bind that entity to
                  these Terms. However, if that organization has an independent written agreement with
                  R4Referral, that agreement shall govern such usage if any provisions in these Terms conflict
                  with it.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Communications</h2>
                <p>
                  Using R4Referral services indicates your acceptance of receiving phone calls and messages
                  from us and our associates. By using R4Referral services, you grant R4Referral, its subsidiaries,
                  and its partners express permission to communicate with you via phone or text message at
                  the number provided. Please note that your wireless service provider contract may incur
                  message and data rates. Your consent to text messages and phone calls is not a prerequisite
                  to utilizing any of our services. If you do not wish to receive these communications,
                  please refrain from using R4Referral services or submitting your information to us.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Client Obligations</h2>
                <p>You agree to:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside text-slate-600">
                  <li>Provide accurate and complete information for campaign setup</li>
                  <li>Ensure all contact lists comply with applicable laws (TCPA, CAN-SPAM, etc.)</li>
                  <li>Promptly respond to R4Referral communications</li>
                  <li>Pay all fees as specified in your service agreement</li>
                  <li>Not use our services for any unlawful purpose</li>
                  <li>Promptly notify us of any changes in your contact information</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Payment Terms</h2>
                <p>
                  Fees are charged monthly in advance. Payment is due within 5 business days of invoice.
                  Late payments may incur a 1.5% monthly late fee. We reserve the right to suspend
                  services for accounts more than 15 days past due.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Dispute/Chargeback Waiver</h2>
                <p>
                  All payments made are final and non-disputable. The Client expressly waives any right to
                  initiate chargebacks or payment reversals through their bank or card provider. Any concerns
                  or disputes must be addressed solely through R4Referral&apos;s internal resolution process.
                  Any chargeback attempt will be treated as a breach of contract, with R4Referral reserving full
                  rights to dispute, recover losses, and pursue legal remedies.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Refunds</h2>
                <p>
                  Any request for reconsideration of payment must be formally submitted in writing within
                  sixty (60) calendar days of the original service agreement execution date. Requests made
                  beyond this period shall be deemed irrevocably waived.
                </p>
                <p className="mt-3">
                  In cases where no material service execution, operational labor, or lead delivery has taken
                  place, the Company shall deduct a non-refundable 15% to cover merchant processing,
                  administrative, and handling expenses.
                </p>
                <p className="mt-3">
                  Once services have commenced — including resource deployment, campaign initiation, or
                  marketing expenditure — the Company reserves the right to withhold up to 50% of the total
                  payment to cover labor, infrastructure, and operational costs.
                </p>
                <p className="mt-3">
                  Refunds shall not be issued for voluntary cancellations, withdrawal from services, or a
                  change of mind by the Client. All refund assessments and determinations are made at the
                  sole discretion of the Company. Such decisions are final, binding, and not subject to
                  dispute, chargeback, or third-party intervention unless otherwise required by law.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Intellectual Property</h2>
                <p>
                  All scripts, templates, processes, and methodologies developed by R4Referral remain the
                  intellectual property of R4Referral. Client-provided materials remain the property of the
                  client. Call recordings from campaigns are available to clients for review purposes.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Data Disclosure</h2>
                <p>We may need to access or reveal your data for the following reasons:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside text-slate-600">
                  <li>Delivering R4Referral services as required</li>
                  <li>Resolving technical concerns, extending assistance, or maintaining our services</li>
                  <li>Safeguarding R4Referral, our users, or the broader community</li>
                  <li>Responding to emergency situations</li>
                  <li>Adhering to legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Confidential Information</h2>
                <p>
                  &quot;Confidential Information&quot; refers to any information or data disclosed by either
                  party that is marked as confidential or proprietary, or which should reasonably be
                  understood to be confidential. Both parties agree to use Confidential Information only in
                  accordance with these Terms and not to disclose it to any third party without prior written
                  consent, except as allowed under these Terms.
                </p>
                <p className="mt-3">
                  The parties acknowledge that a breach of this provision may cause irreparable harm, and
                  therefore, the non-breaching party may seek injunctive relief without waiving any other
                  rights or remedies available to them.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Warranty Disclaimer</h2>
                <p>
                  We offer R4Referral services &quot;as is&quot; and provide no warranties or representations
                  regarding these services. We explicitly deny any and all warranties, whether explicitly
                  stated or implied, including, but not limited to, warranties of merchantability,
                  non-infringement, and fitness for a particular purpose. We do not guarantee specific
                  results from campaigns as outcomes depend on multiple market factors.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Indemnification</h2>
                <p>
                  R4Referral will not be responsible for any bills, damages, or costs resulting from any claims
                  arising from your use of our services. You agree to indemnify R4Referral against all claims
                  related to your use of our services. You will defend, indemnify, and hold harmless R4Referral,
                  its officers, directors, employees, members, stockholders, and affiliates against all claims
                  brought or threatened by a third party and any losses related thereto arising out of your
                  breach of these Terms or your use of R4Referral services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Limitation of Liability</h2>
                <p>
                  Neither party will be liable to the other party for any indirect, special, incidental,
                  consequential, or punitive damages of any kind, including damages for loss of goodwill,
                  lost profits, lost sales or business, work stoppage, computer failure or malfunction, or
                  lost data, whether in tort, contract, or otherwise. Under no circumstances will either
                  party be liable for direct damages exceeding the amounts paid or payable by you during the
                  twelve (12) months preceding the incident or claim.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Termination</h2>
                <p>
                  Either party may terminate services with 30 days written notice. R4Referral may suspend
                  services immediately if we have reason to believe you have violated these Terms, if your
                  use of the services is fraudulent or negatively impacting the services, or if it has become
                  illegal or impractical to provide the services. Upon termination, all outstanding fees
                  become immediately due.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Eligibility</h2>
                <p>
                  R4Referral services are intended for use by adults only and are not directed at minors. We do
                  not knowingly collect personally identifiable information from anyone under the age of 13.
                  R4Referral services are only intended for use by citizens and residents of the United States
                  and Canada.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">No Waiver</h2>
                <p>
                  Our failure to enforce any provision of these Terms does not waive our right to do so in
                  the future. Even if we waive a provision, it is not waived for all time unless it is in
                  writing and signed by both parties.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Force Majeure</h2>
                <p>
                  If a party fails to perform any obligation due to a cause beyond its control and without
                  negligence, such as a natural disaster, civil or military authority&apos;s action, fire,
                  strike, lockout, terrorist acts, war, riot, or earthquake, it will not be considered an
                  event of default or a breach of these terms. The affected party must take all reasonable
                  actions to minimize the consequences.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Governing Law and Venue</h2>
                <p>
                  The Federal Arbitration Act will govern the enforceability and interpretation of the
                  arbitration agreement section below. Apart from the arbitration provision, these terms will
                  be interpreted according to the laws of the State of New York without regard to any
                  conflicts of laws. The United Nations Convention on Contracts for the International Sale
                  of Goods will not govern these terms. Any legal action arising out of or related to these
                  terms or R4Referral services will be brought in state or federal courts in New York, and both
                  parties agree to the personal jurisdiction of these courts.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Agreement to Arbitrate</h2>
                <p>
                  Before initiating any formal legal case, the parties should first attempt to resolve the
                  dispute through R4Referral&apos;s Customer Support. If the dispute remains unresolved, both
                  parties agree to resolve any dispute relating to these terms or R4Referral services through
                  binding arbitration in New York, or any other location agreed upon by both parties. The
                  agreement to arbitrate remains effective even after the parties stop using R4Referral services.
                </p>
                <p className="mt-3">
                  The parties agree that disputes related to intellectual property will be resolved in court
                  instead of through arbitration. The parties agree not to bring claims on behalf of others
                  in any class, consolidated, or representative action. If the class action waiver provision
                  is deemed unenforceable, the entire arbitration agreement will be null and void, but the
                  rest of the terms will remain in effect.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Entire Agreement</h2>
                <p>
                  These terms and their attachments replace all previous and current proposals, statements,
                  marketing materials, presentations, and agreements, both oral and written. Any information
                  or advice given by R4Referral&apos;s employees or members, whether written or oral, does not
                  create any additional warranty or expand the scope of the warranties mentioned in these terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us at info@r4referral.com.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
