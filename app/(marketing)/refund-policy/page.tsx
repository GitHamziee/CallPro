import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "CallPro's Refund Policy — understand our billing and refund procedures.",
};

export default function RefundPolicyPage() {
  return (
    <>
      <PageHeader
        badge="Legal"
        title="Refund Policy"
        subtitle="Last updated: January 1, 2025"
      />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-10">
            <div className="space-y-8 text-slate-600 leading-relaxed">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Our Commitment</h2>
                <p>
                  At CallPro, we stand behind the quality of our work. We are committed to delivering
                  the services outlined in your agreement. This refund policy explains the circumstances
                  under which refunds may be issued.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Service Fees</h2>
                <p>
                  Monthly service fees are charged in advance at the beginning of each billing cycle.
                  Because we begin allocating agent time, resources, and campaign preparation immediately,
                  monthly service fees are generally non-refundable once a billing cycle has begun.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Eligible Refunds</h2>
                <p>Refunds may be considered in the following circumstances:</p>
                <ul className="mt-2 space-y-2 list-disc list-inside text-slate-600">
                  <li>
                    <strong className="text-slate-800">Service not delivered:</strong> If CallPro fails to
                    initiate services within the agreed timeframe and you have not been contacted with a
                    revised timeline, you may request a full refund of fees paid for the undelivered period.
                  </li>
                  <li>
                    <strong className="text-slate-800">Billing errors:</strong> If you were charged
                    incorrectly (duplicate charge, wrong amount), we will issue a full refund of the
                    erroneous amount within 5 business days of verification.
                  </li>
                  <li>
                    <strong className="text-slate-800">Cancellation before campaign launch:</strong> If you
                    cancel your subscription before your campaign has launched, you may be eligible for a
                    prorated refund of unused service fees.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Non-Refundable Items</h2>
                <p>The following are not eligible for refunds:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside text-slate-600">
                  <li>Fees for services already rendered</li>
                  <li>Onboarding and setup fees</li>
                  <li>Fees for campaigns that have been launched and are actively running</li>
                  <li>Fees where performance did not meet expectations but services were delivered as agreed</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">5. How to Request a Refund</h2>
                <p>
                  To request a refund, contact our billing team at billing@callpro.com within 30 days
                  of the charge in question. Please include your account name, the charge date, amount,
                  and a brief explanation of your refund request. We will respond within 3 business days.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Processing Time</h2>
                <p>
                  Approved refunds are processed within 5–10 business days and returned to the original
                  payment method. Credit card refunds may take an additional 3–5 business days to appear
                  on your statement depending on your bank.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Contact</h2>
                <p>
                  Questions about billing or refunds? Reach us at billing@callpro.com or call
                  +1 (800) 555-1234 Monday through Friday, 9am–6pm EST.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
