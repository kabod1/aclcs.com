import Link from "next/link";
import { Clock, Mail } from "lucide-react";
import { EMAIL, EMAIL_LINK, WHATSAPP_LINK } from "@/lib/utils";

export const metadata = { title: "Pending Approval | ACLCS Client Portal" };

export default function PendingApprovalPage() {
  return (
    <div className="text-center space-y-5">
      <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto">
        <Clock size={32} className="text-amber-500" />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-navy-900">Account Pending Approval</h1>
        <p className="text-sm text-navy-500 mt-2 leading-relaxed">
          Thank you for registering! Your account is currently under review.
          Our team will approve it shortly.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left space-y-2">
        <p className="text-sm font-semibold text-amber-800">What happens next?</p>
        <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
          <li>Our team reviews your registration (usually within 1 business day)</li>
          <li>You&apos;ll receive an email once your account is activated</li>
          <li>After activation, you can sign in to your portal</li>
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary justify-center"
        >
          Chat on WhatsApp
        </a>
        <a
          href={EMAIL_LINK}
          className="flex items-center justify-center gap-2 text-sm text-navy-500 hover:text-brand-500 transition-colors"
        >
          <Mail size={14} />
          {EMAIL}
        </a>
      </div>

      <Link href="/login" className="block text-sm text-navy-400 hover:text-navy-600 transition-colors">
        Back to Sign In
      </Link>
    </div>
  );
}
