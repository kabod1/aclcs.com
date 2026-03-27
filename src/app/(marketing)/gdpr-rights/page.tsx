import Link from "next/link";
import type { Metadata } from "next";
import { ShieldCheck, Mail, Eye, PenLine, Trash2, PauseCircle, Download, Ban, Undo2, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Your GDPR Rights | ACLCS Corporate Services",
  description:
    "Understand your rights under GDPR as a data subject. Learn how to access, correct, delete, or port your personal data held by ACLCS Corporate Services.",
};

const RIGHTS = [
  {
    icon: Eye,
    title: "Right of Access",
    article: "Article 15 GDPR",
    description:
      "You have the right to obtain a copy of the personal data we hold about you, along with information about how and why we process it. This is called a Subject Access Request (SAR).",
    howTo: "Submit a SAR by emailing admin@aclcs.com with subject line \"Subject Access Request\". Include your full name and enough information to verify your identity. We will respond within 30 days.",
  },
  {
    icon: PenLine,
    title: "Right to Rectification",
    article: "Article 16 GDPR",
    description:
      "You have the right to have inaccurate personal data corrected, or incomplete data completed. If you believe data we hold about you is wrong or out of date, you can ask us to update it.",
    howTo: "Contact us at admin@aclcs.com specifying what data is inaccurate and what the correct information should be.",
  },
  {
    icon: Trash2,
    title: "Right to Erasure (Right to be Forgotten)",
    article: "Article 17 GDPR",
    description:
      "You have the right to request that we delete your personal data where there is no compelling reason for its continued processing. This right applies where: the data is no longer necessary; you withdraw consent; you object to processing; the data was unlawfully processed.",
    howTo: "Note: This right is not absolute. We may be required to retain certain data for legal compliance purposes (e.g., anti-money laundering records for 7 years). We will inform you of any such legal obligation when responding to your request.",
  },
  {
    icon: PauseCircle,
    title: "Right to Restriction of Processing",
    article: "Article 18 GDPR",
    description:
      "You have the right to request that we restrict the processing of your personal data in certain circumstances — for example, while you contest the accuracy of data, or while we verify whether our legitimate grounds override your interests.",
    howTo: "When processing is restricted, we may still store your data but will not use it for other purposes without your consent, except for legal claims or protecting others' rights.",
  },
  {
    icon: Download,
    title: "Right to Data Portability",
    article: "Article 20 GDPR",
    description:
      "Where we process your personal data by automated means on the basis of your consent or a contract, you have the right to receive that data in a structured, commonly used, machine-readable format (such as JSON or CSV), and to have it transmitted to another data controller.",
    howTo: "This right applies to data you provided to us directly, and only where processing is automated. Contact us at admin@aclcs.com to request a data export.",
  },
  {
    icon: Ban,
    title: "Right to Object",
    article: "Article 21 GDPR",
    description:
      "You have the right to object to processing of your personal data where we rely on legitimate interests as the legal basis, or where we process your data for direct marketing purposes. If you object to direct marketing, we will stop processing your data for that purpose immediately with no exceptions.",
    howTo: "To object to processing, contact admin@aclcs.com. For direct marketing opt-outs, you can also use the unsubscribe link in any marketing email.",
  },
  {
    icon: Undo2,
    title: "Right to Withdraw Consent",
    article: "Article 7(3) GDPR",
    description:
      "Where we process your personal data on the basis of your consent (e.g., marketing communications, optional cookies), you have the right to withdraw that consent at any time. Withdrawal does not affect the lawfulness of processing carried out before withdrawal.",
    howTo: "To withdraw consent: for marketing emails, use the unsubscribe link. For cookie consent, use the cookie settings button on our website. For other consent-based processing, contact admin@aclcs.com.",
  },
  {
    icon: AlertCircle,
    title: "Right to Lodge a Complaint",
    article: "Article 77 GDPR",
    description:
      "If you believe your data protection rights have been violated, you have the right to lodge a complaint with the relevant supervisory authority. In Cyprus, this is the Commissioner for Personal Data Protection.",
    howTo: "We encourage you to contact us first so we can resolve your concern. However, you are entitled to contact the supervisory authority directly at any time.",
  },
];

export default function GdprRightsPage() {
  const lastUpdated = "27 March 2026";

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative container-wide px-4 lg:px-8 py-24 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-300 text-sm font-medium border border-white/10 mb-6">
              <ShieldCheck size={14} />
              Your Rights
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Your <span className="text-brand-400">GDPR Rights</span>
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-xl">
              Under the General Data Protection Regulation (GDPR), you have powerful rights over your personal data. We are committed to upholding these rights and making them easy to exercise.
            </p>
            <p className="mt-3 text-sm text-white/40">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Quick summary banner */}
      <section className="bg-brand-600 text-white">
        <div className="container-wide px-4 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <p className="text-sm font-medium text-white/90">
              To exercise any of your rights, contact our Data Protection point of contact:
            </p>
            <a
              href="mailto:admin@aclcs.com?subject=GDPR%20Rights%20Request"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-brand-700 text-sm font-semibold hover:bg-white/90 transition-colors shrink-0"
            >
              <Mail size={14} />
              admin@aclcs.com
            </a>
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
                ACLCS Corporate Services Ltd processes personal data as a Data Controller under the{" "}
                <strong>General Data Protection Regulation (EU) 2016/679</strong> and the{" "}
                <strong>Cyprus Law 125(I)/2018</strong>. As a data subject, you have the following rights.
                All rights can be exercised free of charge, and we will respond within{" "}
                <strong>30 days</strong> of receiving a verifiable request.
              </p>
            </div>

            {/* Rights grid */}
            <div className="space-y-6">
              {RIGHTS.map((right, i) => {
                const Icon = right.icon;
                return (
                  <div key={i} className="border border-navy-100 rounded-2xl overflow-hidden">
                    <div className="flex items-start gap-4 px-6 py-5 bg-navy-50">
                      <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={18} className="text-brand-600" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-base font-bold text-navy-900">{right.title}</h2>
                          <span className="text-xs font-medium text-brand-600 bg-brand-50 border border-brand-200 px-2.5 py-0.5 rounded-full">
                            {right.article}
                          </span>
                        </div>
                        <p className="text-sm text-navy-600 mt-2">{right.description}</p>
                      </div>
                    </div>
                    <div className="px-6 py-4 border-t border-navy-100">
                      <p className="text-xs font-semibold text-navy-500 uppercase tracking-wide mb-1">How to exercise this right</p>
                      <p className="text-sm text-navy-700">{right.howTo}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Response timeframes */}
            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-4">Our Response Timeframes</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-navy-50">
                      <th className="text-left p-3 font-semibold text-navy-800 border border-navy-100">Stage</th>
                      <th className="text-left p-3 font-semibold text-navy-800 border border-navy-100">Timeframe</th>
                      <th className="text-left p-3 font-semibold text-navy-800 border border-navy-100">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Acknowledgement of request", "Within 5 business days", "We confirm receipt and may ask for identity verification"],
                      ["Substantive response", "Within 30 days of receipt", "GDPR standard deadline"],
                      ["Complex / multiple requests", "Up to 90 days total", "We will notify you within 30 days if extension is needed and explain why"],
                      ["Rejection of request", "Within 30 days", "We will provide reasons and inform you of your right to complain to the supervisory authority"],
                    ].map(([stage, time, notes], i) => (
                      <tr key={i} className="border-b border-navy-100 hover:bg-navy-50/50">
                        <td className="p-3 border border-navy-100 font-medium text-navy-800">{stage}</td>
                        <td className="p-3 border border-navy-100 text-brand-700 font-semibold">{time}</td>
                        <td className="p-3 border border-navy-100 text-navy-600">{notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Identity verification */}
            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-3">Identity Verification</h2>
              <p>
                To protect your privacy and prevent unauthorised disclosure of personal data, we may ask you to verify your identity before fulfilling a rights request. This is especially important for Subject Access Requests.
              </p>
              <p className="mt-3">
                We may ask for: your full name, email address or phone number on file with us, and in some cases a copy of a government-issued ID. We will use this information solely for verification and will not retain it beyond what is necessary.
              </p>
              <p className="mt-3">
                We will not charge a fee for exercising your rights unless a request is manifestly unfounded or excessive, in which case we may charge a reasonable fee or refuse to act.
              </p>
            </div>

            {/* Supervisory authority */}
            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-4">Supervisory Authority — Cyprus</h2>
              <p className="mb-4">
                If you are not satisfied with our response to your rights request, or if you believe we are processing your personal data unlawfully, you have the right to lodge a complaint with the Cyprus Commissioner for Personal Data Protection (the supervisory authority for Cyprus under GDPR).
              </p>
              <div className="p-5 bg-navy-50 rounded-2xl border border-navy-100">
                <p className="font-bold text-navy-800 mb-3">Office of the Commissioner for Personal Data Protection</p>
                <div className="space-y-1.5 text-sm text-navy-700">
                  <p>1 Iasonos Street, 1082 Nicosia, Cyprus</p>
                  <p>Tel: +357 22 818 456</p>
                  <p>Fax: +357 22 304 565</p>
                  <p>
                    Email:{" "}
                    <a href="mailto:commissioner@dataprotection.gov.cy" className="text-brand-600 hover:underline">
                      commissioner@dataprotection.gov.cy
                    </a>
                  </p>
                  <p>
                    Website:{" "}
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
              </div>
              <p className="mt-4 text-sm text-navy-500">
                If you are based in another EU/EEA country, you may also contact your local data protection authority. A list of all EU supervisory authorities is available at{" "}
                <a
                  href="https://edpb.europa.eu/about-edpb/about-edpb/members_en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:underline"
                >
                  edpb.europa.eu
                </a>
                .
              </p>
            </div>

            {/* Contact card */}
            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-4">Contact Our Data Protection Point of Contact</h2>
              <div className="p-6 bg-navy-50 rounded-2xl border border-navy-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-brand-600" />
                </div>
                <div>
                  <p className="font-bold text-navy-800">ACLCS Corporate Services Ltd</p>
                  <p className="text-sm text-navy-600 mt-1">Katsoni 19, Nicosia, Cyprus</p>
                  <a href="mailto:admin@aclcs.com?subject=GDPR%20Rights%20Request" className="text-sm text-brand-600 hover:underline mt-1 inline-block">
                    admin@aclcs.com
                  </a>
                  <p className="text-sm text-navy-600">+357 96 186 440</p>
                  <p className="text-xs text-navy-400 mt-2">
                    Please include &ldquo;GDPR Rights Request&rdquo; in the subject line and specify which right you wish to exercise.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-navy-100 pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
              <p className="text-sm text-navy-400">
                These rights are provided under EU GDPR (2016/679) and Cyprus Law 125(I)/2018.
              </p>
              <div className="flex gap-4 text-sm">
                <Link href="/privacy-policy" className="text-brand-600 hover:underline">
                  Privacy Policy
                </Link>
                <Link href="/cookie-policy" className="text-brand-600 hover:underline">
                  Cookie Policy
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
