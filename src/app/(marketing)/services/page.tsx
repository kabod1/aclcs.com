"use client";

import Link from "next/link";
import {
  Building2,
  Globe2,
  Landmark,
  CheckCircle2,
  ArrowRight,
  FileText,
  UserCheck,
  Home,
  Shield,
  RefreshCw,
  PenTool,
  XCircle,
  Snowflake,
  Laptop,
  Crown,
  Briefcase,
  CreditCard,
  Calculator,
  BookOpen,
  Package,
  HeartHandshake,
} from "lucide-react";
import Stats from "@/components/sections/Stats";
import CTA from "@/components/sections/CTA";

const SETUP_OPTIONS = [
  {
    id: "cyprus",
    icon: Building2,
    title: "Cyprus Company Formation",
    price: "2,000",
    description:
      "Incorporate a private limited company in Cyprus with full EU market access, favourable tax regime, and English common law legal system.",
    features: [
      "100% foreign ownership",
      "12.5% corporate tax rate",
      "EU member state access",
      "Quick incorporation (5-7 days)",
      "Corporate bank account",
      "Registered office address",
      "Double tax treaty network",
      "No restrictions on repatriation of profits",
    ],
  },
  {
    id: "europe",
    icon: Landmark,
    title: "European Structure Setup",
    price: "7,000",
    description:
      "Establish your business across the EU with compliant corporate structures in leading European jurisdictions.",
    features: [
      "EU-wide operations",
      "Multi-jurisdiction planning",
      "Full regulatory compliance",
      "Holding company structures",
      "VAT registration included",
      "Nominee director services",
      "Cross-border tax planning",
      "Annual compliance support",
    ],
  },
  {
    id: "outside-europe",
    icon: Globe2,
    title: "International Company Setup",
    price: "12,000",
    description:
      "Set up your international company outside Europe with efficient corporate structures and global banking access.",
    features: [
      "Tax-efficient structures",
      "Corporate banking access",
      "100% foreign ownership",
      "Flexible reporting requirements",
      "Asset protection",
      "Global operations",
      "Annual renewal only",
      "Multi-currency accounts",
    ],
  },
];

const LICENSE_SERVICES = [
  { icon: RefreshCw, title: "License Renewal", desc: "Keep your Cyprus business license active and compliant." },
  { icon: PenTool, title: "License Modification", desc: "Add or change activities on your existing license." },
  { icon: XCircle, title: "License Cancellation", desc: "Properly close your business with full regulatory compliance." },
  { icon: Snowflake, title: "License Dormancy", desc: "Temporarily suspend your license while maintaining registration." },
];

const RESIDENCY_SERVICES = [
  { icon: UserCheck, title: "Permanent Residency", duration: "Indefinite" },
  { icon: Shield, title: "Temporary Residence", duration: "1-3 years" },
  { icon: Briefcase, title: "Work Permit", duration: "1-4 years" },
  { icon: Laptop, title: "Digital Nomad Visa", duration: "1 year" },
  { icon: HeartHandshake, title: "Family Reunification", duration: "Tied to sponsor" },
  { icon: Crown, title: "Fast-Track Processing", duration: "Express" },
];

const BANKING_SERVICES = [
  { icon: CreditCard, title: "Bank Account Opening", desc: "Corporate and personal accounts with major Cyprus and EU banks." },
  { icon: Calculator, title: "Corporate Tax Advisory", desc: "Expert advice on Cyprus and EU corporate tax requirements." },
  { icon: BookOpen, title: "Bookkeeping", desc: "Professional accounting and financial record keeping." },
  { icon: FileText, title: "VAT Registration", desc: "Complete VAT registration and filing services across the EU." },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative container-wide px-4 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-300 text-sm font-medium border border-white/10 mb-6">
              <Package size={14} />
              Our Services
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Complete <span className="text-brand-400">Corporate Setup</span>{" "}
              Services
            </h1>
            <p className="mt-6 text-lg text-white/50 leading-relaxed">
              From company formation to residency permits, banking, and beyond.
              Everything you need under one roof.
            </p>
          </div>
        </div>
      </section>

      {/* Company Setup Options */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="section-title">Company Setup Options</h2>
            <p className="section-subtitle mx-auto mt-4">
              Choose the structure that best fits your business goals and
              operational requirements.
            </p>
          </div>
          <div className="space-y-8">
            {SETUP_OPTIONS.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.id}
                  id={option.id}
                  className="scroll-mt-24 bg-white rounded-3xl border border-navy-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="grid lg:grid-cols-5 gap-0">
                    <div className="lg:col-span-2 bg-gradient-to-br from-navy-900 to-navy-950 p-8 lg:p-10 text-white">
                      <div className="w-14 h-14 rounded-2xl bg-brand-500/20 flex items-center justify-center mb-6">
                        <Icon size={26} className="text-brand-400" />
                      </div>
                      <h3 className="text-2xl font-bold">{option.title}</h3>
                      <p className="text-white/50 mt-3 text-sm leading-relaxed">
                        {option.description}
                      </p>
                      <div className="mt-6">
                        <span className="text-sm text-white/40">Starting from</span>
                        <p className="text-3xl font-bold text-brand-400 mt-1">
                          EUR {option.price}
                        </p>
                      </div>
                      <Link
                        href="/contact"
                        className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-brand-500 text-white font-semibold rounded-xl text-sm hover:bg-brand-400 transition-colors"
                      >
                        Get Started
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                    <div className="lg:col-span-3 p-8 lg:p-10">
                      <h4 className="font-bold text-navy-900 mb-4">
                        What&apos;s Included
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {option.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-3 p-3 rounded-xl bg-navy-50/50"
                          >
                            <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                            <span className="text-sm text-navy-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* License Management */}
      <section className="section-padding bg-navy-50/30" id="licenses">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="section-title">License Management</h2>
            <p className="section-subtitle mx-auto mt-4">
              Keep your Cyprus business license compliant and up to date with our
              management services.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LICENSE_SERVICES.map((svc) => {
              const Icon = svc.icon;
              return (
                <div key={svc.title} className="card p-7 text-center">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-brand-500" />
                  </div>
                  <h3 className="font-bold text-navy-900">{svc.title}</h3>
                  <p className="text-sm text-navy-500 mt-2">{svc.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Residency & Permits */}
      <section className="section-padding bg-white" id="residency">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="section-title">Residency &amp; Permits</h2>
            <p className="section-subtitle mx-auto mt-4">
              All residency and permit types processed with expert guidance and dedicated support.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESIDENCY_SERVICES.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="card p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                    <Icon size={22} className="text-brand-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-900">{item.title}</h3>
                    <p className="text-sm text-navy-400 mt-0.5">{item.duration}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Banking */}
      <section className="section-padding bg-navy-50/30" id="banking">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="section-title">Finance &amp; Banking</h2>
            <p className="section-subtitle mx-auto mt-4">
              Complete financial services to support your business operations in Cyprus and the EU.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BANKING_SERVICES.map((svc) => {
              const Icon = svc.icon;
              return (
                <div key={svc.title} className="card p-7 text-center">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-brand-500" />
                  </div>
                  <h3 className="font-bold text-navy-900">{svc.title}</h3>
                  <p className="text-sm text-navy-500 mt-2">{svc.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Office Spaces */}
      <section className="section-padding bg-white" id="offices">
        <div className="container-wide">
          <div className="bg-gradient-to-br from-navy-900 to-navy-950 rounded-3xl p-8 lg:p-12 text-white flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="w-14 h-14 rounded-2xl bg-brand-500/20 flex items-center justify-center mb-5">
                <Home size={26} className="text-brand-400" />
              </div>
              <h2 className="text-3xl font-bold">Office Spaces</h2>
              <p className="text-white/50 mt-3 max-w-lg">
                From registered office addresses to premium office suites, we have workspace
                solutions for every budget and business need across Nicosia and
                Cyprus.
              </p>
            </div>
            <Link
              href="/contact"
              className="btn-primary shrink-0 text-base"
            >
              Explore Offices
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Stats />
      <CTA />
    </>
  );
}
