"use client";

import { useState } from "react";
import { Calculator, ArrowRight, ArrowLeft, Send, CheckCircle } from "lucide-react";
import { NATIONALITIES } from "@/lib/utils";
import { toast } from "sonner";

const ACTIVITIES = [
  "International Trading",
  "Management Consultancy",
  "IT & Technology",
  "Holding Company",
  "Shipping",
  "Forex / Investment",
  "E-Commerce",
  "Real Estate",
  "Tourism & Hospitality",
  "Education",
  "Healthcare",
  "Other",
];

const STEPS = ["Business Details", "Your Requirements", "Contact Info"];

export default function CostCalculator() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    activity: "",
    employees: "1",
    shareholders: "1",
    officeSpace: "no",
    nomineeDirector: "no",
    secretary: "no",
    nomineeShareholder: "no",
    taxCertificate: "no",
    vat: "no",
    name: "",
    email: "",
    phone: "",
    nationality: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canAdvance = () => {
    if (step === 0) return form.activity !== "";
    if (step === 1) return true;
    return form.name && form.email && form.phone;
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
    toast.success("Your cost estimate is on its way!");
  };

  if (submitted) {
    return (
      <section className="section-padding bg-white" id="calculator">
        <div className="container-wide max-w-2xl text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-navy-900">Thank You!</h2>
          <p className="text-navy-500 mt-3 text-lg">
            We&apos;ve received your information. Our team will send you a
            detailed cost breakdown within the next few hours.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-white relative" id="calculator">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-[120px]" />
      <div className="container-wide relative">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left info */}
          <div className="lg:col-span-2">
            <span className="section-label">
              <Calculator size={14} />
              Cost Calculator
            </span>
            <h2 className="section-title">
              Get Your <span className="text-gradient">Free Quote</span>
            </h2>
            <p className="section-subtitle mt-4">
              Tell us about your business requirements and we&apos;ll provide a
              transparent, detailed cost breakdown in EUR with no hidden fees.
            </p>

            <div className="mt-8 space-y-6">
              {STEPS.map((label, i) => (
                <div key={label} className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                      i <= step
                        ? "bg-brand-500 text-white"
                        : "bg-navy-100 text-navy-400"
                    }`}
                  >
                    {i < step ? <CheckCircle size={18} /> : i + 1}
                  </div>
                  <div>
                    <p
                      className={`font-semibold text-sm ${
                        i <= step ? "text-navy-900" : "text-navy-400"
                      }`}
                    >
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-navy-100 shadow-xl shadow-navy-900/5 p-8">
              {/* Progress */}
              <div className="flex gap-2 mb-8">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      i <= step ? "bg-brand-500" : "bg-navy-100"
                    }`}
                  />
                ))}
              </div>

              {/* Step 1: Business Details */}
              {step === 0 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-2">
                      Business Activity *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {ACTIVITIES.map((act) => (
                        <button
                          key={act}
                          type="button"
                          onClick={() => update("activity", act)}
                          className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                            form.activity === act
                              ? "border-brand-500 bg-brand-50 text-brand-600"
                              : "border-navy-100 text-navy-600 hover:border-navy-200"
                          }`}
                        >
                          {act}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Requirements */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-2">
                      Number of Employees
                    </label>
                    <select
                      value={form.employees}
                      onChange={(e) => update("employees", e.target.value)}
                      className="select-field"
                    >
                      {[1, 2, 3, 4, 5, 6, "7+"].map((n) => (
                        <option key={n} value={n}>
                          {n} {Number(n) === 1 ? "Employee" : "Employees"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-2">
                      Number of Shareholders
                    </label>
                    <select
                      value={form.shareholders}
                      onChange={(e) => update("shareholders", e.target.value)}
                      className="select-field"
                    >
                      {[1, 2, 3, 4, 5, "6+"].map((n) => (
                        <option key={n} value={String(n)}>
                          {n} {Number(n) === 1 ? "Shareholder" : "Shareholders"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-2">
                      Do you need office space?
                    </label>
                    <div className="flex gap-3">
                      {["yes", "no", "registered-address"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => update("officeSpace", opt)}
                          className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium border transition-all capitalize ${
                            form.officeSpace === opt
                              ? "border-brand-500 bg-brand-50 text-brand-600"
                              : "border-navy-100 text-navy-600 hover:border-navy-200"
                          }`}
                        >
                          {opt === "registered-address" ? "Registered Address" : opt === "yes" ? "Yes" : "No"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Nominee Director */}
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-1">
                      Nominee Director
                    </label>
                    <p className="text-xs text-navy-400 mb-2">A local Cyprus director to satisfy residency requirements</p>
                    <div className="flex gap-3">
                      {["yes", "no"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => update("nomineeDirector", opt)}
                          className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium border transition-all capitalize ${
                            form.nomineeDirector === opt
                              ? "border-brand-500 bg-brand-50 text-brand-600"
                              : "border-navy-100 text-navy-600 hover:border-navy-200"
                          }`}
                        >
                          {opt === "yes" ? "Yes" : "No"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Company Secretary */}
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-1">
                      Company Secretary
                    </label>
                    <p className="text-xs text-navy-400 mb-2">Mandatory under Cyprus Companies Law for all registered companies</p>
                    <div className="flex gap-3">
                      {["yes", "no"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => update("secretary", opt)}
                          className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium border transition-all capitalize ${
                            form.secretary === opt
                              ? "border-brand-500 bg-brand-50 text-brand-600"
                              : "border-navy-100 text-navy-600 hover:border-navy-200"
                          }`}
                        >
                          {opt === "yes" ? "Yes" : "No"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Nominee Shareholder */}
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-1">
                      Nominee Shareholder
                    </label>
                    <p className="text-xs text-navy-400 mb-2">Hold shares on your behalf for privacy and confidentiality</p>
                    <div className="flex gap-3">
                      {["yes", "no"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => update("nomineeShareholder", opt)}
                          className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium border transition-all capitalize ${
                            form.nomineeShareholder === opt
                              ? "border-brand-500 bg-brand-50 text-brand-600"
                              : "border-navy-100 text-navy-600 hover:border-navy-200"
                          }`}
                        >
                          {opt === "yes" ? "Yes" : "No"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tax Identification Certificate */}
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-1">
                      Tax Identification Certificate (TIC)
                    </label>
                    <p className="text-xs text-navy-400 mb-2">Required for opening bank accounts and official transactions</p>
                    <div className="flex gap-3">
                      {["yes", "no"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => update("taxCertificate", opt)}
                          className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium border transition-all capitalize ${
                            form.taxCertificate === opt
                              ? "border-brand-500 bg-brand-50 text-brand-600"
                              : "border-navy-100 text-navy-600 hover:border-navy-200"
                          }`}
                        >
                          {opt === "yes" ? "Yes" : "No"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* VAT Registration */}
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-1">
                      VAT Registration
                    </label>
                    <p className="text-xs text-navy-400 mb-2">Mandatory if turnover exceeds €15,600/year or for intra-EU trade</p>
                    <div className="flex gap-3">
                      {["yes", "no"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => update("vat", opt)}
                          className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium border transition-all capitalize ${
                            form.vat === opt
                              ? "border-brand-500 bg-brand-50 text-brand-600"
                              : "border-navy-100 text-navy-600 hover:border-navy-200"
                          }`}
                        >
                          {opt === "yes" ? "Yes" : "No"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Contact */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="John Smith"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="john@company.com"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+357 XX XXX XXX"
                      className="input-field"
                      required
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
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-navy-100">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="btn-ghost text-sm"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>
                ) : (
                  <div />
                )}
                {step < 2 ? (
                  <button
                    type="button"
                    onClick={() => canAdvance() && setStep(step + 1)}
                    disabled={!canAdvance()}
                    className="btn-primary text-sm disabled:opacity-40 disabled:pointer-events-none"
                  >
                    Next Step
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!canAdvance() || loading}
                    className="btn-primary text-sm disabled:opacity-40 disabled:pointer-events-none"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Calculating...
                      </span>
                    ) : (
                      <>
                        <Send size={16} />
                        Get My Quote
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
