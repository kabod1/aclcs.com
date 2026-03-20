import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function VerificationGate({ feature }: { feature: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mb-4">
        <ShieldCheck size={32} className="text-amber-500" />
      </div>
      <h2 className="text-xl font-bold text-navy-900 mb-2">Verification Required</h2>
      <p className="text-sm text-navy-500 max-w-sm mb-6">
        You need to complete identity verification before accessing {feature}. This helps us keep your account secure.
      </p>
      <Link
        href="/portal/verify"
        className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
      >
        <ShieldCheck size={16} />
        Complete Verification
      </Link>
    </div>
  );
}
