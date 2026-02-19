import Link from "next/link";
import type { Metadata } from "next";
import { Shield, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | ACLCS Corporate Services",
  description:
    "How ACLCS Corporate Services collects, uses, and protects your personal data. GDPR-compliant privacy notice for Cyprus corporate services.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "19 February 2026";

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative container-wide px-4 lg:px-8 py-24 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-300 text-sm font-medium border border-white/10 mb-6">
              <Shield size={14} />
              Legal
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Privacy <span className="text-brand-400">Policy</span>
            </h1>
            <p className="mt-5 text-lg text-white/50">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-wide max-w-4xl">
          <div className="prose prose-navy max-w-none space-y-10 text-navy-700 text-[15px] leading-relaxed">

            {/* Intro */}
            <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6">
              <p className="text-navy-800 font-medium">
                ACLCS Corporate Services Ltd (&ldquo;ACLCS&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
                &ldquo;our&rdquo;) is committed to protecting your personal data and
                respecting your privacy. This Privacy Policy explains how we
                collect, use, store, and protect your personal information in
                accordance with the{" "}
                <strong>
                  General Data Protection Regulation (EU) 2016/679 (GDPR)
                </strong>{" "}
                and the Cyprus Law on the Protection of Natural Persons with
                regard to the Processing of Personal Data (Law 125(I)/2018).
              </p>
            </div>

            <Section title="1. Who We Are">
              <p>
                <strong>Data Controller:</strong> ACLCS Corporate Services Ltd<br />
                <strong>Address:</strong> Katsoni 19, Nicosia, Cyprus<br />
                <strong>Email:</strong>{" "}
                <a href="mailto:admin@aclcs.com" className="text-brand-600 hover:underline">
                  admin@aclcs.com
                </a>
                <br />
                <strong>Phone:</strong> +357 96 186 440
              </p>
              <p className="mt-3">
                If you have any questions about how we handle your personal
                data, please contact us at the details above.
              </p>
            </Section>

            <Section title="2. Data We Collect">
              <p>We collect personal data only when you actively provide it to us or when it is generated through your use of our website. The categories of data we may collect include:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Identity data:</strong> full name, nationality</li>
                <li><strong>Contact data:</strong> email address, phone number</li>
                <li><strong>Business data:</strong> company name, business activity, intended structure (collected via our cost calculator)</li>
                <li><strong>Communications:</strong> messages you send us through our contact form or by email</li>
                <li><strong>Technical data:</strong> IP address, browser type, operating system, pages visited, time of access — collected automatically via server logs</li>
                <li><strong>Cookie data:</strong> your cookie consent preference stored in your browser (see Section 9)</li>
              </ul>
              <p className="mt-3">
                We do <strong>not</strong> collect sensitive personal data (such as health, racial origin, or financial account data) through this website.
              </p>
            </Section>

            <Section title="3. How and Why We Use Your Data">
              <p>We process your personal data on the following legal bases:</p>
              <div className="overflow-x-auto mt-3">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-navy-50">
                      <th className="text-left p-3 font-semibold text-navy-800 border border-navy-100 rounded-tl-lg">Purpose</th>
                      <th className="text-left p-3 font-semibold text-navy-800 border border-navy-100">Legal Basis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Responding to your enquiries and contact form submissions", "Legitimate interest / Pre-contractual steps"],
                      ["Providing cost estimates via our calculator", "Consent / Legitimate interest"],
                      ["Delivering corporate services you engage us for", "Performance of a contract"],
                      ["Complying with legal obligations (AML, KYC, tax)", "Legal obligation"],
                      ["Improving our website and services", "Legitimate interest"],
                      ["Sending service-related communications", "Contract performance / Legitimate interest"],
                      ["Marketing communications (only with explicit opt-in)", "Consent"],
                    ].map(([purpose, basis], i) => (
                      <tr key={i} className="border-b border-navy-100">
                        <td className="p-3 border border-navy-100">{purpose}</td>
                        <td className="p-3 border border-navy-100 text-brand-700 font-medium">{basis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section title="4. Data Retention">
              <p>We retain your personal data only for as long as necessary to fulfil the purpose for which it was collected:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Contact form enquiries:</strong> up to 2 years from last contact</li>
                <li><strong>Client service records:</strong> 7 years from the end of the business relationship (required by Cyprus and EU anti-money laundering law)</li>
                <li><strong>Cost calculator submissions:</strong> up to 12 months</li>
                <li><strong>Website technical logs:</strong> up to 90 days</li>
                <li><strong>Cookie preferences:</strong> 12 months, or until cleared by you</li>
              </ul>
              <p className="mt-3">
                After these periods, data is securely deleted or anonymised.
              </p>
            </Section>

            <Section title="5. Who We Share Your Data With">
              <p>We do not sell or rent your personal data. We may share it with:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Service providers:</strong> IT hosting, email services, and CRM platforms that process data on our behalf under written data processing agreements</li>
                <li><strong>Professional advisors:</strong> legal, accounting, or compliance partners engaged to deliver services to you</li>
                <li><strong>Regulatory authorities:</strong> when required by law (e.g., Cyprus Registrar of Companies, Tax Department, Cyprus Bar Association)</li>
                <li><strong>Google LLC:</strong> for embedded Google Maps and Google Translate on our website (see their Privacy Policy at policies.google.com/privacy)</li>
              </ul>
              <p className="mt-3">
                Any third-party processors are contractually bound to process your data only on our instructions and in accordance with GDPR.
              </p>
            </Section>

            <Section title="6. International Transfers">
              <p>
                ACLCS operates primarily in Cyprus (an EU member state). Where data is transferred outside the EU/EEA, we ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by the European Commission or adequacy decisions.
              </p>
            </Section>

            <Section title="7. Your GDPR Rights">
              <p>Under the GDPR, you have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-6 space-y-2.5 mt-3">
                <li><strong>Right of access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Right to rectification:</strong> Ask us to correct inaccurate or incomplete data</li>
                <li><strong>Right to erasure (&ldquo;right to be forgotten&rdquo;):</strong> Request deletion of your data where there is no compelling reason to continue processing it</li>
                <li><strong>Right to restriction:</strong> Ask us to restrict processing of your data in certain circumstances</li>
                <li><strong>Right to data portability:</strong> Receive your data in a structured, machine-readable format</li>
                <li><strong>Right to object:</strong> Object to processing based on legitimate interests or for direct marketing</li>
                <li><strong>Right to withdraw consent:</strong> Where processing is based on consent, withdraw it at any time without affecting prior processing</li>
                <li><strong>Right to lodge a complaint:</strong> Complain to the Cyprus Commissioner for Personal Data Protection (dataprotection.gov.cy) if you believe your rights have been violated</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, contact us at{" "}
                <a href="mailto:admin@aclcs.com" className="text-brand-600 hover:underline">
                  admin@aclcs.com
                </a>
                . We will respond within 30 days of receiving your request.
              </p>
            </Section>

            <Section title="8. Data Security">
              <p>
                We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or disclosure. These include:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>HTTPS encryption for all website traffic</li>
                <li>Access controls limiting who can view personal data internally</li>
                <li>Regular security assessments of our systems</li>
                <li>Secure deletion procedures for data past its retention period</li>
              </ul>
              <p className="mt-3">
                In the event of a personal data breach that poses a risk to your rights and freedoms, we will notify the relevant supervisory authority within 72 hours and inform affected individuals without undue delay.
              </p>
            </Section>

            <Section title="9. Cookies">
              <p>
                Our website uses cookies — small text files placed on your device — to ensure the website functions correctly and to improve your experience.
              </p>
              <div className="mt-4 space-y-4">
                <CookieCategory
                  name="Strictly Necessary Cookies"
                  description="Required for the website to function. These cannot be disabled and do not require consent (e.g., security tokens, load balancing)."
                  consent="No consent required"
                />
                <CookieCategory
                  name="Functionality Cookies"
                  description="Remember your preferences such as language selection and cookie consent choice."
                  consent="Stored in localStorage — cleared when you clear browser data"
                />
                <CookieCategory
                  name="Third-Party Cookies (Google)"
                  description="Google Maps and Google Translate may set cookies when you interact with those features. These are governed by Google's Privacy Policy."
                  consent="Consent required — controlled via our cookie banner"
                />
              </div>
              <p className="mt-4">
                You can manage cookie preferences at any time through your browser settings. Note that disabling certain cookies may affect website functionality.
              </p>
            </Section>

            <Section title="10. Links to Third-Party Websites">
              <p>
                Our website may contain links to external websites (e.g., Google Maps, social media platforms). We are not responsible for the privacy practices of those sites. We encourage you to read their privacy policies before providing any personal data.
              </p>
            </Section>

            <Section title="11. Children's Privacy">
              <p>
                Our website and services are intended for adults and business entities. We do not knowingly collect personal data from anyone under the age of 16. If we become aware that we have collected data from a child, we will delete it promptly.
              </p>
            </Section>

            <Section title="12. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The &ldquo;Last updated&rdquo; date at the top of this page will always reflect the most recent version. For significant changes, we will notify you via a prominent notice on our website.
              </p>
            </Section>

            <Section title="13. Contact &amp; Supervisory Authority">
              <p>
                For any privacy-related queries or to exercise your rights, contact our Data Protection point of contact:
              </p>
              <div className="mt-4 p-5 bg-navy-50 rounded-2xl border border-navy-100 flex items-start gap-4">
                <Mail size={20} className="text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-navy-800">ACLCS Corporate Services Ltd</p>
                  <p className="text-sm text-navy-600">Katsoni 19, Nicosia, Cyprus</p>
                  <a href="mailto:admin@aclcs.com" className="text-sm text-brand-600 hover:underline">
                    admin@aclcs.com
                  </a>
                </div>
              </div>
              <p className="mt-4">
                You also have the right to lodge a complaint with the{" "}
                <strong>Cyprus Commissioner for Personal Data Protection</strong>:
              </p>
              <div className="mt-3 p-5 bg-navy-50 rounded-2xl border border-navy-100 text-sm text-navy-700 space-y-1">
                <p className="font-semibold text-navy-800">Office of the Commissioner for Personal Data Protection</p>
                <p>1 Iasonos Street, 1082 Nicosia, Cyprus</p>
                <p>Tel: +357 22 818 456</p>
                <p>
                  Web:{" "}
                  <a
                    href="https://www.dataprotection.gov.cy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-600 hover:underline"
                  >
                    www.dataprotection.gov.cy
                  </a>
                </p>
              </div>
            </Section>

            <div className="border-t border-navy-100 pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
              <p className="text-sm text-navy-400">
                This policy is governed by the laws of the Republic of Cyprus and the GDPR.
              </p>
              <div className="flex gap-4 text-sm">
                <Link href="/terms" className="text-brand-600 hover:underline">
                  Terms &amp; Conditions
                </Link>
                <Link href="/contact" className="text-brand-600 hover:underline">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-navy-900 mb-3">{title}</h2>
      {children}
    </div>
  );
}

function CookieCategory({
  name,
  description,
  consent,
}: {
  name: string;
  description: string;
  consent: string;
}) {
  return (
    <div className="p-4 border border-navy-100 rounded-xl">
      <p className="font-semibold text-navy-800 text-sm">{name}</p>
      <p className="text-sm text-navy-600 mt-1">{description}</p>
      <p className="text-xs text-brand-600 font-medium mt-2">{consent}</p>
    </div>
  );
}
