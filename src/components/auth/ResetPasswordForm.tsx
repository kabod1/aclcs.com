"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Send, ArrowLeft } from "lucide-react";
import { resetPassword } from "@/lib/actions/auth";

export default function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await resetPassword(formData);
    setLoading(false);
    if (result?.error) setError(result.error);
    if (result?.success) setSuccess(result.success);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Reset password</h1>
        <p className="text-sm text-navy-400 mt-1">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-700">
          {success}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-navy-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            type="email"
            name="email"
            required
            placeholder="you@company.com"
            className="input-field pl-10"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !!success}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:pointer-events-none"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </span>
        ) : (
          <>
            <Send size={16} />
            Send Reset Link
          </>
        )}
      </button>

      <Link
        href="/login"
        className="flex items-center justify-center gap-1.5 text-sm text-navy-400 hover:text-navy-600 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Sign In
      </Link>
    </form>
  );
}
