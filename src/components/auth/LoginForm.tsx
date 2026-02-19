"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import { signIn } from "@/lib/actions/auth";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await signIn(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Welcome back</h1>
        <p className="text-sm text-navy-400 mt-1">Sign in to your client portal</p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
          {error}
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

      <div>
        <label className="block text-sm font-semibold text-navy-700 mb-2">
          Password
        </label>
        <div className="relative">
          <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            placeholder="Your password"
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

      <div className="flex justify-end">
        <Link
          href="/reset-password"
          className="text-xs text-brand-500 hover:text-brand-600 font-medium"
        >
          Forgot password?
        </Link>
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
            Signing in...
          </span>
        ) : (
          <>
            <LogIn size={16} />
            Sign In
          </>
        )}
      </button>

      <p className="text-center text-sm text-navy-400">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-brand-500 font-semibold hover:text-brand-600">
          Register
        </Link>
      </p>
    </form>
  );
}
