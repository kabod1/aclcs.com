import { ShieldCheck, FileText, Camera, Clock, Mail } from "lucide-react";

export const metadata = { title: "Verify Identity | ACLCS Client Portal" };

const STEPS = [
  {
    icon: FileText,
    title: "Government-Issued ID",
    desc: "Passport, National ID card, or Driver's licence (front and back).",
  },
  {
    icon: Camera,
    title: "Selfie with ID",
    desc: "A clear photo of yourself holding your ID document.",
  },
  {
    icon: Clock,
    title: "Review (1–2 business days)",
    desc: "Our team reviews your documents and activates full access.",
  },
];

export default function VerifyPage() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Identity Verification</h1>
        <p className="text-sm text-navy-500 mt-1">
          Complete verification to unlock case management and document access.
        </p>
      </div>

      {/* Steps */}
      <div className="bg-white rounded-2xl border border-navy-100 shadow-sm divide-y divide-navy-50">
        {STEPS.map(({ icon: Icon, title, desc }, i) => (
          <div key={i} className="px-6 py-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
              <Icon size={18} className="text-brand-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-navy-900">
                Step {i + 1}: {title}
              </p>
              <p className="text-sm text-navy-500 mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Submit instructions */}
      <div className="bg-navy-900 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
            <Mail size={18} className="text-white" />
          </div>
          <p className="font-semibold">Submit your documents</p>
        </div>
        <p className="text-sm text-white/70 mb-4">
          Email your ID documents and selfie to our compliance team. Include your registered email address in the subject line.
        </p>
        <a
          href="mailto:compliance@aclcs.com?subject=KYC Verification Documents"
          className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
        >
          <Mail size={16} />
          Email Documents to compliance@aclcs.com
        </a>
      </div>

      {/* Status note */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-4">
        <ShieldCheck size={18} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          Once verified, your account is automatically upgraded and you will receive a confirmation email. You can then access all portal features.
        </p>
      </div>
    </div>
  );
}
