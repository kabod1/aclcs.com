"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, Phone, Eye, EyeOff, UserPlus } from "lucide-react";
import { signUp } from "@/lib/actions/auth";
import { NATIONALITIES } from "@/lib/utils";

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm_password") as string;

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const result = await signUp(formData);
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else if (result?.redirectTo) {
        router.push(result.redirectTo);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Create an account</h1>
        <p className="text-sm text-navy-400 mt-1">
          Register to track your company formation progress
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-navy-700 mb-1.5">
          Full Name *
        </label>
        <div className="relative">
          <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            type="text"
            name="full_name"
            required
            placeholder="Your full name"
            className="input-field pl-10"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy-700 mb-1.5">
          Email Address *
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

      <div>
        <label className="block text-sm font-semibold text-navy-700 mb-1.5">
          Phone Number
        </label>
        <div className="relative">
          <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            type="tel"
            name="phone"
            placeholder="+357 XX XXX XXX"
            className="input-field pl-10"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy-700 mb-1.5">
          Nationality
        </label>
        <select name="nationality" className="select-field">
          <option value="">Select nationality</option>
          {NATIONALITIES.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy-700 mb-1.5">
          Password *
        </label>
        <div className="relative">
          <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            placeholder="Min 8 characters"
            className="input-field pl-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy-700 mb-1.5">
          Confirm Password *
        </label>
        <div className="relative">
          <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            type="password"
            name="confirm_password"
            required
            placeholder="Repeat password"
            className="input-field pl-10"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:pointer-events-none"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Creating account...
          </span>
        ) : (
          <>
            <UserPlus size={16} />
            Create Account
          </>
        )}
      </button>

      <p className="text-center text-xs text-navy-400">
        By registering, you agree to our{" "}
        <Link href="/privacy-policy" className="text-brand-500 hover:underline">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/terms" className="text-brand-500 hover:underline">
          Terms &amp; Conditions
        </Link>
        .
      </p>

      <p className="text-center text-sm text-navy-400">
        Already have an account?{" "}
        <Link href="/login" className="text-brand-500 font-semibold hover:text-brand-600">
          Sign In
        </Link>
      </p>
    </form>
  );
}
