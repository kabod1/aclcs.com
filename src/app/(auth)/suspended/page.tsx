import Link from "next/link";
import { ShieldOff, Mail } from "lucide-react";
import { EMAIL, EMAIL_LINK, WHATSAPP_LINK } from "@/lib/utils";

export const metadata = { title: "Account Suspended | ACLCS Client Portal" };

export default function SuspendedPage() {
  return (
    <div className="text-center space-y-5">
      <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto">
        <ShieldOff size={32} className="text-red-500" />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-navy-900">Account Suspended</h1>
        <p className="text-sm text-navy-500 mt-2 leading-relaxed">
          Your account has been suspended. Please contact us if you believe this
          is an error or to resolve the issue.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary justify-center"
        >
          Contact Support on WhatsApp
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
