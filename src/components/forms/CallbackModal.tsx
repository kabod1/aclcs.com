"use client";

import { useState, useEffect } from "react";
import { X, Phone, Send } from "lucide-react";
import { toast } from "sonner";

export default function CallbackModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 25000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-callback", handler);
    return () => window.removeEventListener("open-callback", handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("We'll call you within 55 seconds!");
    setForm({ firstName: "", lastName: "", email: "", phone: "" });
    setLoading(false);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
        <div className="relative bg-gradient-to-br from-navy-900 to-navy-950 px-8 py-8 text-white">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X size={16} />
          </button>
          <div className="w-14 h-14 rounded-2xl bg-brand-500/20 flex items-center justify-center mb-4">
            <Phone size={24} className="text-brand-400" />
          </div>
          <h3 className="text-2xl font-bold">Need Expert Advice?</h3>
          <p className="text-white/60 mt-2 text-sm">
            Fill in your details and we&apos;ll call you back within 55 seconds.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="First Name"
              required
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="input-field text-sm"
            />
            <input
              type="text"
              placeholder="Last Name"
              required
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="input-field text-sm"
            />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-field text-sm"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="input-field text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-sm disabled:opacity-60 disabled:pointer-events-none"
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
                Call Me!
              </>
            )}
          </button>
          <p className="text-center text-xs text-navy-400">
            Free consultation. No obligations.
          </p>
        </form>
      </div>
    </div>
  );
}
