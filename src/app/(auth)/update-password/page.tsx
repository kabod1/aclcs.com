"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { updatePassword } from "@/lib/actions/auth";

export default function UpdatePasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const result = await updatePassword(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Set new password</h1>
        <p className="text-sm text-navy-400 mt-1">Choose a strong password for your account.</p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-navy-700 mb-2">New Password</label>
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
        <label className="block text-sm font-semibold text-navy-700 mb-2">Confirm Password</label>
        <div className="relative">
          <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            type="password"
            name="confirm"
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
            Updating...
          </span>
        ) : (
          <>
            <ShieldCheck size={16} />
            Update Password
          </>
        )}
      </button>
    </form>
  );
}
