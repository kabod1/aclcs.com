import Link from "next/link";
import type { Metadata } from "next";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | ACLCS Corporate Services",
  description:
    "Terms and conditions governing use of the ACLCS Corporate Services website and engagement of our Cyprus corporate services.",
};

export default function TermsPage() {
  const lastUpdated = "19 February 2026";

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative container-wide px-4 lg:px-8 py-24 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-300 text-sm font-medium border border-white/10 mb-6">
              <FileText size={14} />
              Legal
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Terms &amp; <span className="text-brand-400">Conditions</span>
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
          <div className="space-y-10 text-navy-700 text-[15px] leading-relaxed">

            {/* Intro */}
            <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6">
              <p className="text-navy-800 font-medium">
                Please read these Terms and Conditions carefully before using
                the ACLCS Corporate Services website (&ldquo;Site&rdquo;) or engaging our
                services. By accessing the Site or instructing us to provide
                services, you agree to be bound by these Terms. If you do not
                agree, please do not use the Site.
              </p>
            </div>

            <Section title="1. About Us">
              <p>
                ACLCS Corporate Services Ltd is a company registered in the
                Republic of Cyprus, with its registered office at Katsoni 19,
                Nicosia, Cyprus. We provide company formation, corporate
                administration, and related professional services.
              </p>
              <p className="mt-3">
                Contact:{" "}
                <a href="mailto:admin@aclcs.com" className="text-brand-600 hover:underline">
                  admin@aclcs.com
                </a>{" "}
                | +357 96 186 440
              </p>
            </Section>

            <Section title="2. Use of the Website">
              <p>You may use this Site for lawful purposes only. You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Use the Site in any way that violates applicable local, national, or international laws or regulations</li>
                <li>Transmit unsolicited or unauthorised advertising or promotional material</li>
                <li>Attempt to gain unauthorised access to any part of our systems or networks</li>
                <li>Introduce viruses, trojans, worms, or other malicious or harmful material</li>
                <li>Scrape, crawl, or harvest data from the Site without our prior written consent</li>
                <li>Impersonate ACLCS or any of our staff</li>
              </ul>
              <p className="mt-3">
                We reserve the right to suspend or terminate access to the Site for any user who breaches these Terms.
              </p>
            </Section>

            <Section title="3. Information on This Site">
              <p>
                The content on this Site is provided for general informational purposes only. It does <strong>not</strong> constitute legal, tax, financial, or professional advice. While we strive to keep information accurate and up to date, we make no representations or warranties about the completeness, accuracy, or suitability of the content for any particular purpose.
              </p>
              <p className="mt-3">
                Cost estimates provided by our calculator are indicative only and subject to change. A formal engagement letter and fee proposal will be issued upon instruction.
              </p>
            </Section>

            <Section title="4. Engagement of Services">
              <p>
                A legally binding engagement between you and ACLCS is only formed when:
              </p>
              <ol className="list-decimal pl-6 space-y-2 mt-3">
                <li>You receive and accept our written fee proposal or engagement letter</li>
                <li>You complete our client onboarding and KYC/AML verification process</li>
                <li>The agreed engagement fee or retainer is received by us</li>
              </ol>
              <p className="mt-3">
                Submitting an enquiry form or cost calculator request on this Site does not constitute an instruction to act and does not create any contractual obligation on either party.
              </p>
            </Section>

            <Section title="5. Fees and Payment">
              <p>
                All fees are quoted in Euros (EUR) unless otherwise stated. Fees are subject to applicable taxes including Cyprus VAT where applicable. We reserve the right to adjust fees upon 30 days&apos; written notice for ongoing retainer arrangements.
              </p>
              <p className="mt-3">
                Disbursements (government filing fees, third-party costs) are invoiced at cost plus an administration charge, unless included in a fixed-fee proposal.
              </p>
            </Section>

            <Section title="6. Intellectual Property">
              <p>
                All content on this Site — including text, graphics, logos, icons, images, and software — is the property of ACLCS Corporate Services Ltd or its content suppliers and is protected by Cyprus and international copyright law.
              </p>
              <p className="mt-3">
                You may view, download, and print content from the Site for your own personal, non-commercial use. You must not reproduce, redistribute, or exploit any content commercially without our prior written consent.
              </p>
            </Section>

            <Section title="7. Third-Party Links">
              <p>
                Our Site may contain links to third-party websites. These links are provided for convenience only. ACLCS has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.
              </p>
            </Section>

            <Section title="8. Limitation of Liability">
              <p>
                To the maximum extent permitted by law, ACLCS Corporate Services Ltd:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Excludes all implied conditions, warranties, representations, or other terms that may apply to the Site or any content on it</li>
                <li>Will not be liable for any loss or damage, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, arising under or in connection with use of or inability to use the Site</li>
                <li>Will not be liable for loss of profits, sales, business or revenue; business interruption; loss of anticipated savings; loss of business opportunity or goodwill; or any indirect or consequential loss</li>
              </ul>
              <p className="mt-3">
                This does not affect our liability for death or personal injury arising from our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded under applicable law.
              </p>
            </Section>

            <Section title="9. Data Protection and Privacy">
              <p>
                Our use of your personal data is governed by our{" "}
                <Link href="/privacy-policy" className="text-brand-600 hover:underline">
                  Privacy Policy
                </Link>
                , which forms part of these Terms. By using this Site, you consent to our processing of your personal data as described in the Privacy Policy.
              </p>
            </Section>

            <Section title="10. Anti-Money Laundering (AML) Compliance">
              <p>
                ACLCS is subject to Cyprus and EU anti-money laundering legislation. We are required to conduct customer due diligence (KYC) checks on all clients before providing services. This includes verifying identity, beneficial ownership, and the source of funds. We may refuse to accept an engagement or may terminate services if we cannot complete these checks satisfactorily.
              </p>
              <p className="mt-3">
                Information obtained for AML purposes is held confidentially and used solely for compliance obligations.
              </p>
            </Section>

            <Section title="11. Confidentiality">
              <p>
                We treat all client information as strictly confidential. We will not disclose your information to third parties except as set out in our Privacy Policy, required by law, or with your prior written consent.
              </p>
            </Section>

            <Section title="12. Complaints">
              <p>
                If you are dissatisfied with any aspect of our services, please contact us in the first instance at{" "}
                <a href="mailto:admin@aclcs.com" className="text-brand-600 hover:underline">
                  admin@aclcs.com
                </a>
                . We aim to acknowledge complaints within 2 business days and resolve them within 20 business days.
              </p>
            </Section>

            <Section title="13. Changes to These Terms">
              <p>
                We may update these Terms at any time. The updated version will be posted on this page with a revised &ldquo;Last updated&rdquo; date. Continued use of the Site after any changes constitutes acceptance of the new Terms.
              </p>
            </Section>

            <Section title="14. Governing Law and Jurisdiction">
              <p>
                These Terms and any dispute or claim arising out of or in connection with them (including non-contractual disputes) shall be governed by and construed in accordance with the laws of the{" "}
                <strong>Republic of Cyprus</strong>.
              </p>
              <p className="mt-3">
                Any disputes shall be subject to the exclusive jurisdiction of the courts of the Republic of Cyprus, except where mandatory EU consumer protection law provides otherwise.
              </p>
            </Section>

            <Section title="15. Severability">
              <p>
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
              </p>
            </Section>

            <div className="border-t border-navy-100 pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
              <p className="text-sm text-navy-400">
                These Terms are governed by the laws of the Republic of Cyprus.
              </p>
              <div className="flex gap-4 text-sm">
                <Link href="/privacy-policy" className="text-brand-600 hover:underline">
                  Privacy Policy
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
