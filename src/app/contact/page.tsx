"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { PHONE, PHONE_LINK, EMAIL, EMAIL_LINK, ADDRESS, MAPS_LINK, WHATSAPP_LINK } from "@/lib/utils";
import { NATIONALITIES } from "@/lib/utils";
import { toast } from "sonner";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "",
    service: "",
    message: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
    toast.success("Message sent successfully!");
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative container-wide px-4 lg:px-8 py-24 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-300 text-sm font-medium border border-white/10 mb-6">
              <MessageSquare size={14} />
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Let&apos;s <span className="text-brand-400">Talk Business</span>
            </h1>
            <p className="mt-5 text-lg text-white/50 leading-relaxed">
              Ready to start your business in the UAE? Contact us for a free
              consultation and we&apos;ll guide you through the entire process.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-navy-900">
                  Contact Information
                </h2>
                <p className="text-navy-500 mt-2">
                  Reach out through any channel and we&apos;ll get back to you
                  within 55 seconds during business hours.
                </p>
              </div>

              <div className="space-y-5">
                {[
                  {
                    icon: Phone,
                    label: "Phone",
                    value: PHONE,
                    href: PHONE_LINK,
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: EMAIL,
                    href: EMAIL_LINK,
                  },
                  {
                    icon: MapPin,
                    label: "Office",
                    value: ADDRESS,
                    href: MAPS_LINK,
                  },
                  {
                    icon: Clock,
                    label: "Hours",
                    value: "Monday - Friday, 8:30am - 6:00pm",
                    href: undefined,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const Wrapper = item.href ? "a" : "div";
                  return (
                    <Wrapper
                      key={item.label}
                      {...(item.href
                        ? {
                            href: item.href,
                            target: item.href.startsWith("http") ? "_blank" : undefined,
                            rel: item.href.startsWith("http") ? "noopener noreferrer" : undefined,
                          }
                        : {})}
                      className="flex gap-4 p-4 rounded-2xl border border-navy-100 hover:border-brand-200 hover:shadow-md transition-all group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center shrink-0 group-hover:bg-brand-100 transition-colors">
                        <Icon size={20} className="text-brand-500" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider">
                          {item.label}
                        </p>
                        <p className="text-sm text-navy-800 font-medium mt-0.5">
                          {item.value}
                        </p>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25d366] text-white font-semibold rounded-xl hover:bg-[#20bd5a] transition-colors shadow-lg shadow-[#25d366]/20"
              >
                <MessageSquare size={18} />
                Chat on WhatsApp
              </a>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-navy-100 h-56">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.3!2d55.26!3d25.19!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBay+Square+Business+Bay+Dubai!5e0!3m2!1sen!2sae!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-white rounded-3xl border border-navy-100 shadow-xl p-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy-900">
                    Thank You!
                  </h3>
                  <p className="text-navy-500 mt-3">
                    We&apos;ve received your message. Our team will get back to
                    you within 55 seconds during business hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-3xl border border-navy-100 shadow-xl shadow-navy-900/5 p-8 lg:p-10"
                >
                  <h3 className="text-2xl font-bold text-navy-900 mb-1">
                    Send Us a Message
                  </h3>
                  <p className="text-sm text-navy-400 mb-8">
                    Fill in the form below and we&apos;ll get back to you promptly.
                  </p>

                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-navy-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          placeholder="Your full name"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-navy-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="you@company.com"
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-navy-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="+971 XX XXX XXXX"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-navy-700 mb-2">
                          Nationality
                        </label>
                        <select
                          value={form.nationality}
                          onChange={(e) => update("nationality", e.target.value)}
                          className="select-field"
                        >
                          <option value="">Select nationality</option>
                          {NATIONALITIES.map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-navy-700 mb-2">
                        Service Interested In
                      </label>
                      <select
                        value={form.service}
                        onChange={(e) => update("service", e.target.value)}
                        className="select-field"
                      >
                        <option value="">Select a service</option>
                        <option value="freezone">Free Zone Company Setup</option>
                        <option value="mainland">Mainland Company Setup</option>
                        <option value="offshore">Offshore Company Setup</option>
                        <option value="license">License Management</option>
                        <option value="visa">Visa Services</option>
                        <option value="banking">Banking & Finance</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-navy-700 mb-2">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="Tell us about your business plans..."
                        className="input-field resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full text-base disabled:opacity-60 disabled:pointer-events-none"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-navy-400">
                      By submitting this form, you agree to our{" "}
                      <a href="#" className="text-brand-500 hover:underline">
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-brand-500 hover:underline">
                        Terms of Service
                      </a>
                      .
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
