import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "R4Referral's Refund Policy — effective for 60 days from the date of your Referral Agreement execution.",
};

export default function RefundPolicyPage() {
  return (
    <>
      <PageHeader
        badge="Legal"
        title="Refund Policy"
        subtitle="Effective for 60 days from the date of your Referral Agreement execution."
      />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-10">
            <div className="space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed">

              <div>
                <p>
                  This Refund Policy (&quot;Policy&quot;) outlines the terms and conditions related to the refund of sign-up
                  fees associated with the Referral Agreement executed with R4Referral LLC. This Policy remains effective
                  for 60 days from the date of your Referral Agreement execution.
                </p>
                <p className="mt-3">
                  All approved refunds are subject to a minimum 15% deduction to cover merchant processing and
                  administrative costs incurred during the original transaction. This deduction will be applied before
                  issuing any refund to the client.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Refund Eligibility</h2>
                <p>
                  Eligibility for a refund is determined by the specific terms and conditions outlined in the Referral
                  Agreement. Refunds may be considered under the following circumstances:
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-1">1. Non-Exclusivity of Referrals</h3>
                <p>
                  R4Referral LLC strives to provide exclusive referrals whenever possible. Exclusive referrals are
                  assigned to a single agent or broker and are not shared within the network, ensuring fair opportunity
                  and reduced competition. Each referral is verified for accuracy and relevance before distribution to
                  ensure high engagement and conversion potential.
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-1">2. Failure to Provide Referrals</h3>
                <p>
                  If R4Referral LLC fails to deliver any referrals to the agent or broker as stipulated in the Referral Agreement.
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-1">3. Referral&apos;s Reluctance to Engage</h3>
                <p>
                  If the referral(s) demonstrate an unwillingness to participate in business activities within 9 months
                  from the date of assignment.
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-1">4. Pre-existing Contract</h3>
                <p>
                  If the provided referral is already under an active contract with the agent or broker at the time of assignment.
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-1">5. Non-Responsiveness</h3>
                <p>
                  If the referral(s) remain unresponsive for 10 continuous working days.
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-1">6. Referrals Outside Preferred Location</h3>
                <p>
                  If the agent or broker chooses to receive referrals from areas or zip codes outside of their preferred
                  location, such referrals will count toward their monthly allocation and will not qualify for refund or replacement.
                </p>
                <p className="mt-3">
                  Acceptance of a referral is considered confirmed if no objections are raised within 48 hours of receipt.
                  Once accepted, the agent or broker waives the right to dispute or request a chargeback.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Refund Eligibility and Limitations</h2>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-1">Submission Period</h3>
                <p>
                  Refund or payment reconsideration requests must be submitted in writing within 60 calendar days of the
                  Referral Agreement execution date. Requests beyond this period are not eligible for review or refund.
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-1">No Services Rendered</h3>
                <p>
                  If no material service execution, operational labor, or referral delivery has occurred, a non-refundable
                  15% will be deducted to cover administrative and processing costs.
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-1">Services Commenced</h3>
                <p>
                  Once services have begun — including campaign setup, resource deployment, or marketing expenses —
                  R4Referral LLC reserves the right to withhold up to 50% of the total payment to cover labor,
                  infrastructure, and operational costs.
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-1">Voluntary Cancellations</h3>
                <p>
                  Refunds are not issued for voluntary cancellations, withdrawal from services, or change of mind by
                  the agent or broker.
                </p>
                <p className="mt-3">
                  Acceptance of any referral constitutes full transfer of responsibility and a waiver of refund or
                  chargeback rights.
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-1">Final Determination</h3>
                <p>
                  All refund decisions are made at the sole discretion of R4Referral LLC. All determinations are final,
                  binding, and not subject to dispute, chargeback, or third-party intervention unless required by law.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Refund Procedure</h2>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-1">Submitting a Request</h3>
                <p>
                  Refund requests must be submitted in writing to R4Referral LLC within the permitted timeframe, clearly
                  stating the reason and including any relevant supporting evidence.
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-1">Remediation Period</h3>
                <p>
                  Once a request is received, the agent or broker must allow up to one month for remediation through
                  referral replacement or service correction.
                </p>
                <p className="mt-3">
                  Refunds will only be considered if remediation is unsuccessful and the request meets the eligibility criteria.
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-1">Invalid Requests</h3>
                <p>
                  Requests that do not follow this procedure or are incomplete will be considered invalid and will not be processed.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Timely Reporting</h2>
                <p>
                  Agents or brokers must report any concerns or request referral replacement within 48 hours of receiving
                  the referral. Failure to report within this timeframe will render the referral satisfactory and
                  ineligible for replacement or refund.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Agreement Requirement</h2>
                <p>
                  Refund eligibility is contingent upon a signed Referral Agreement. Without a signed agreement, this
                  Refund Policy does not apply.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Effective Date</h2>
                <p>
                  This Refund Policy takes effect as of the date of your Referral Agreement execution and supersedes all
                  prior versions. By signing the Referral Agreement with R4Referral LLC, you acknowledge and agree to
                  abide by the terms stated in this Policy.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Need Assistance with a Refund?</h2>
                <p>
                  We appreciate your partnership with R4Referral LLC.<br />
                  For refund inquiries or support, please contact us at:
                </p>
                <p className="mt-3">
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
