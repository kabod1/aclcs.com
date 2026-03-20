"use client";

import Link from "next/link";
import { ShieldAlert, X } from "lucide-react";
import { useState } from "react";

export default function VerificationBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
      <ShieldAlert size={20} className="text-amber-500 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-amber-800">Identity Verification Required</p>
        <p className="text-sm text-amber-700 mt-0.5">
          Complete your ID verification to unlock all portal features including case management and document access.
        </p>
        <Link
          href="/portal/verify"
          className="inline-block mt-2 text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 px-4 py-1.5 rounded-lg transition-colors"
        >
          Verify My Identity →
        </Link>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="text-amber-400 hover:text-amber-600 shrink-0"
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
    </div>
  );
}
