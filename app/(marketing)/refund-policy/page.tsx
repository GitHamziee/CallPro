import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "R4Referral's Refund Policy — transparency, performance accountability, and service clarity for all clients.",
};

export default function RefundPolicyPage() {
  return (
    <>
      <PageHeader
        badge="Legal"
        title="Refund Policy"
        subtitle="Transparency, performance accountability, and service clarity for all R4Referral clients."
      />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-10">
            <div className="space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed">

              <div>
                <p>
                  This Refund Policy governs eligibility for refunds under service agreements with R4Referral.
                  The purpose of this policy is to clearly define when refunds may apply based on the structure
                  of each service program offered.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">1. Programs Covered Under This Policy</h2>
                <p>R4Referral currently offers:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Pay-Per-Lead Program</li>
                  <li>Bundle Lead Program</li>
                  <li>Referral Fee Program (4-Month Performance Plan)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">2. Pay-Per-Lead Program</h2>
                <p>All purchases under this program are final and non-refundable.</p>
                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-1">Lead Replacement Policy</h3>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Issues must be reported within 24 hours of lead delivery.</li>
                  <li>Replacement leads may be issued at R4Referral&apos;s discretion.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">3. Bundle Lead Program</h2>
                <p>
                  Refunds apply only in the event that the full contracted number of leads (10) are not
                  delivered. Partial refunds will be calculated proportionally based on the number of
                  undelivered leads.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">4. Referral Fee Program</h2>
                <p>Performance is evaluated after the completion of 4 months:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li><strong className="text-slate-800 dark:text-slate-200">8 or more leads delivered:</strong> No refund is applicable.</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Fewer than 8 leads delivered:</strong> Client is eligible for a refund review.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">5. Refund Structure</h2>
                <p>
                  Where no meaningful service has been delivered, a full refund minus a 15% administrative
                  fee may be issued. Where services have been partially delivered, partial refunds will be
                  calculated based on campaign performance and work completed.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">6. 60-Day Refund Window</h2>
                <p>
                  A refund request under the 60-day window applies only in cases where no valid leads have
                  been received within that period. Requests outside this window will not be considered.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">7. Lead Acceptance</h2>
                <p>
                  Leads are considered accepted if not disputed within the applicable reporting window.
                  Lead attribution to R4Referral remains in effect for 12 months from the date of delivery.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">8. Lead Quality Disclaimer</h2>
                <p>
                  R4Referral does not guarantee lead responsiveness, conversion rates, or transaction
                  outcomes. Refunds are not issued based on a lead&apos;s failure to respond or transact
                  after delivery.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">9. Refund Review Process</h2>
                <p>
                  All refund requests are reviewed on a case-by-case basis. R4Referral will evaluate
                  campaign performance data, lead delivery records, and service history before making
                  a determination. Decisions are made at the sole discretion of R4Referral and are final.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">10. Agreement Requirement</h2>
                <p>
                  Refund eligibility applies only to clients with a signed service agreement in place.
                  Verbal commitments or informal arrangements are not eligible.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">11. Final Terms</h2>
                <p>
                  This Refund Policy is incorporated into and forms part of R4Referral&apos;s Terms and
                  Conditions. By engaging R4Referral&apos;s services, you agree to the terms outlined in
                  this policy.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Contact Us</h2>
                <p>
                  For refund inquiries, contact us at{" "}
                  <a href="mailto:info@r4referral.com" className="text-brand-600 hover:underline">info@r4referral.com</a>
                  {" "}or call{" "}
                  <a href="tel:+15126780096" className="text-brand-600 hover:underline">+1 (512) 678-0096</a>{" "}
                  Monday through Friday, 9am–6pm EST.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
