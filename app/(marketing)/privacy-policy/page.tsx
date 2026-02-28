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
        subtitle="Last updated: February 28, 2026"
      />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-10">
            <div className="space-y-8 text-slate-600 leading-relaxed">

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Policy Overview</h2>
                <p>
                  This Policy governs the information practices of callpro.com and its affiliates
                  or subsidiaries (&quot;we,&quot; &quot;us,&quot; and &quot;our&quot;) regarding your use of the
                  Services offered on CallPro&apos;s websites, products, tools, promotions, and any other
                  services that refer to this Policy. By using these Services, you authorize CallPro,
                  its corporate parents, affiliates, and partners to send you communications via automated
                  telephone dialing systems, artificial or prerecorded voices, and text messages for products
                  or services that may be of interest to you. However, your agreement to this policy is not
                  required to purchase any goods or services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Policy Changes</h2>
                <p>
                  We reserve the right to modify this Privacy Policy at any time and for any reason,
                  with the &quot;Last Updated&quot; date reflecting such changes. Any modifications will be
                  communicated through the updated Privacy Policy on the Site. You waive the right to receive
                  specific notice of each modification. Prior to using or submitting any information through
                  or in connection with the Services, please carefully review this Policy. By accessing any
                  part of the Services, you consent to the collection, use, and disclosure of your information
                  as outlined in this Policy. If you do not agree with this Policy, please refrain from using
                  the Services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Information We Collect</h2>
                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">Direct Information You Provide to Us</h3>
                <p>
                  There are many ways we may collect information from you, including when you:
                </p>
                <ul className="mt-2 space-y-1 list-disc list-inside text-slate-600">
                  <li>Respond to our communications or engage in communication with us</li>
                  <li>Create an account with us</li>
                  <li>Use features that require your information to work properly</li>
                  <li>Participate in a survey</li>
                  <li>Provide feedback to us</li>
                  <li>Request specific features, such as newsletters, updates, or other products</li>
                  <li>Share user content, including comments, on any of our Services</li>
                </ul>
                <p className="mt-3">The information you provide directly to us may include, but is not limited to:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside text-slate-600">
                  <li>Your Name</li>
                  <li>Email Address</li>
                  <li>Physical addresses, including your place of work</li>
                  <li>Phone number</li>
                  <li>Company name and industry</li>
                  <li>Details about your business needs and campaign preferences</li>
                  <li>Financial information</li>
                </ul>

                <h3 className="text-base font-semibold text-slate-800 mt-4 mb-2">Information That Is Passively or Automatically Gathered</h3>
                <p>
                  <strong>Device/Usage Information:</strong> We automatically collect specific information about
                  the computer or device you use to access the Services. This includes data such as your IP address,
                  geolocation information, unique device identifiers, browser types, browser language, operating system,
                  the state or country from which you accessed the Services, and other information related to how you
                  interact with the Services. We may use third-party analytics providers and technologies, including
                  cookies and similar tools, to help collect this information.
                </p>
                <p className="mt-3">
                  <strong>Cookies and Other Electronic Technologies:</strong> We may collect information about your
                  use of the Services through Internet server logs, cookies, and tracking pixels. Cookies are small
                  text files that are placed on your computer when you visit a website, enabling us to recognize your
                  computer, store your preferences and settings, and enhance your user experience by delivering content
                  specific to your inferred interests. You can manage the use of cookies through your browser settings.
                </p>
                <p className="mt-3">
                  <strong>Location Information:</strong> We may collect different types of location information,
                  including general information and more specific information through GPS-based functionality on
                  mobile devices, to customize the Services with location-based information and features. You can
                  disable location-tracking functions on your device if you do not want to provide us with this information.
                </p>
                <p className="mt-3">
                  <strong>Information from Third Parties:</strong> We may collect information about you or others
                  through our affiliates or non-affiliated third parties. We may also collect supplemental information
                  from third parties, such as information to verify your identity or trustworthiness, for fraud or
                  safety protection purposes. We may combine this information with data we collect from you through
                  the Services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">How We Use Your Information</h2>
                <p>The following outlines the purposes for which we may use the information we collect:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside text-slate-600">
                  <li>To fulfill the purpose for which you provided the information</li>
                  <li>To verify your identity and allow you to access and use our services</li>
                  <li>To provide and improve the features, services, and products available through our services, and to process transactions</li>
                  <li>To send you communications about your transactions, technical notices, updates, account or security alerts, and newsletters</li>
                  <li>To contact you with information, surveys, or services that we believe may be of interest to you</li>
                  <li>To respond to your inquiries, conduct internal research and reporting, and analyze trends</li>
                  <li>To measure and improve the effectiveness of our content, features, and services</li>
                  <li>To detect, investigate, and prevent fraud and other illegal activities, and to enforce our legal terms</li>
                  <li>To administer and troubleshoot our services</li>
                </ul>
                <p className="mt-3">
                  Mobile information will not be shared with third parties/affiliates for marketing/promotional
                  purposes. All the above categories exclude text messaging originator opt-in data and consent;
                  this information will not be shared with any third parties.
                </p>
                <p className="mt-3">
                  Our communication channels may include SMS, email, and apps. You have the option to opt-out
                  at any time by texting &quot;STOP&quot; to us or following the unsubscribe link in our emails.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Disclosing Your Information</h2>
                <p>Under certain circumstances, we may need to disclose or share your information with non-affiliated third parties:</p>
                <ul className="mt-2 space-y-2 text-slate-600">
                  <li><strong>Your consent:</strong> We may share your information with third parties if you have provided us with consent to do so.</li>
                  <li><strong>Service providers and subcontractors:</strong> We may grant select third parties access to your information if they carry out services on our behalf, such as marketing, customer support, or legal services.</li>
                  <li><strong>Business partners:</strong> In cases where we partner with other businesses to provide products and services, we may share your information with those partners.</li>
                  <li><strong>Protection of CallPro and others:</strong> We may access, preserve, and disclose your information if required by law or in the good faith belief that it is necessary to protect our rights, property, or personal safety.</li>
                  <li><strong>Business transfers:</strong> In business transactions such as acquisitions or mergers, user information may be among the assets transferred.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Online Analytics and Advertising</h2>
                <p>
                  We may utilize third-party web analytics services, such as Google Analytics, to gather and
                  analyze information. These service providers collect data, including your IP address, through
                  various analytics technologies. They employ this information to assess your use of our Services
                  and track usage patterns.
                </p>
                <p className="mt-3">
                  We may utilize third-party advertising technologies to deliver relevant content and advertisements
                  on our Services as well as other websites you visit. Please note that we do not control any opt-out
                  links, and you may still receive advertisements even if you opt out.
                </p>
                <p className="mt-3">
                  To prevent Google Analytics from utilizing your information, you can install the Google Analytics
                  Opt-out Browser Add-on.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Managing Your Data</h2>
                <p>
                  To ensure the accuracy of your information, you have the ability to access and modify certain
                  data in accordance with applicable laws. Should your provided information change or become
                  inaccurate, it is imperative that you promptly update us. You can request deletion or
                  modification through the Services or by emailing info@callpro.com. Upon your request, we will
                  close your account and remove your information as expeditiously as possible. Please be aware
                  that we may retain information from closed accounts for legal compliance, fee collection,
                  dispute resolution, and other purposes permitted by law.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Children&apos;s Privacy</h2>
                <p>
                  CallPro&apos;s Services are not designed for children under the age of 13. In the event that
                  we become aware of collecting personal information from children under 13, we will promptly
                  take reasonable steps to delete it, as mandated by the Children&apos;s Online Privacy
                  Protection Act (COPPA).
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Security</h2>
                <p>
                  CallPro has implemented administrative, technical, and physical measures to safeguard against
                  unauthorized access, use, or alteration of your information. Nevertheless, we cannot guarantee
                  that these measures will prevent every unauthorized attempt to access, use, or disclose your
                  information, as no electronic transmissions can be entirely secure. If you suspect unauthorized
                  access to your account, you must promptly contact us at info@callpro.com.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Third-Party Links and Services</h2>
                <p>
                  CallPro&apos;s Services may include links to third-party websites, applications, and services.
                  However, we do not assume responsibility for the privacy practices of these external sites and
                  services. We strongly encourage you to review their privacy policies whenever you visit them.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Your California Privacy Rights</h2>
                <p>
                  If you are a California resident, you have the right, once a year, to request information about
                  our disclosure of your &quot;personal information&quot; to third parties for direct marketing
                  purposes under California law. Starting from January 1, 2020, the California Consumer Privacy
                  Act (CCPA) granted Californians data privacy rights, including the right to opt out of having
                  their personal information &quot;sold&quot; as defined by the CCPA. To initiate such a request,
                  please send an email to info@callpro.com with &quot;Privacy Support&quot; in the subject line.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Changes to this Privacy Policy</h2>
                <p>
                  We reserve the right to modify this Privacy Policy at any time to reflect changes in the law,
                  our data collection and use practices, the features of our Services, or advancements in
                  technology. Please check this page periodically for updates. Your continued use of the Services
                  after changes to this Privacy Policy are posted indicates your acceptance of those changes.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at info@callpro.com.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
