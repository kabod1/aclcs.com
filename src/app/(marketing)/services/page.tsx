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
  ShoppingCart,
  Store,
  TrendingUp,
  Zap,
  Globe,
  BadgeCheck,
  Percent,
  Banknote,
  Truck,
  Star,
  ChevronDown,
  ChevronUp,
  MessageCircle,
} from "lucide-react";
import Stats from "@/components/sections/Stats";
import CTA from "@/components/sections/CTA";
import { WHATSAPP_LINK } from "@/lib/utils";
import { useState } from "react";

const ECOMMERCE_PACKAGES = [
  {
    id: "starter",
    badge: "Most Popular",
    featured: true,
    icon: ShoppingCart,
    title: "Amazon & Temu Starter",
    subtitle: "Everything to launch your EU marketplace presence",
    price: "7,995",
    period: "one-time setup",
    description:
      "The complete foundation package for Chinese sellers ready to launch legally on Amazon EU and Temu Europe with a Cyprus company.",
    features: [
      "Cyprus company registration (15–20 business days)",
      "EU VAT registration",
      "EORI customs import number",
      "Wise Business account setup",
      "Amazon seller account documentation",
      "Temu marketplace verification docs",
      "Registered office address (1 year)",
      "Company secretary service (1 year)",
      "All company documents in English",
      "Mandarin-speaking support",
    ],
    highlight: "Save €15,000+ in annual tax vs operating from China",
  },
  {
    id: "growth",
    badge: "Best Value",
    featured: false,
    icon: TrendingUp,
    title: "E-Commerce Growth",
    subtitle: "Scale with brand protection and full compliance",
    price: "13,995",
    period: "one-time setup",
    description:
      "For sellers who are serious about building a defensible European brand with trademark protection, accounting, and tax efficiency.",
    features: [
      "Everything in Starter package",
      "EU trademark filing (EUIPO)",
      "Amazon Brand Registry setup",
      "Eurobank account opening",
      "1 year bookkeeping & accounting",
      "Annual VAT compliance",
      "Corporate tax return filing",
      "Nominee director service",
      "GDPR privacy policy setup",
      "Dedicated account manager",
    ],
    highlight: "EU trademark protects your brand in all 27 EU countries",
  },
  {
    id: "enterprise",
    badge: "Maximum Value",
    featured: false,
    icon: Crown,
    title: "Brand Empire",
    subtitle: "Multi-brand holding structure for serious entrepreneurs",
    price: "27,995",
    period: "one-time setup",
    description:
      "The full corporate structure for Chinese entrepreneurs building a portfolio of European brands with maximum tax efficiency.",
    features: [
      "Cyprus holding + operating company",
      "IP holding under Cyprus IP Box (2.5% tax)",
      "Multi-currency banking setup",
      "EU trademark in 3 classes",
      "2 years full accounting",
      "Annual compliance & audit",
      "Cyprus digital nomad visa assistance",
      "Strategic tax planning session",
      "EPR registrations (Germany, France)",
      "Priority 24/7 Mandarin support",
    ],
    highlight: "IP Box regime: qualifying income taxed at just 2.5%",
  },
];

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
      "Quick incorporation (15–20 business days)",
      "Corporate bank account",
      "Registered office address",
      "Double tax treaty with China",
      "No restrictions on profit repatriation",
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
  { icon: Shield, title: "Temporary Residence", duration: "1–3 years" },
  { icon: Briefcase, title: "Work Permit", duration: "1–4 years" },
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

const CHINA_ADVANTAGES = [
  {
    icon: Percent,
    title: "12.5% Corporate Tax",
    desc: "One of the EU's lowest rates — versus 25% in mainland China. Save €10,000+ annually on every €100K in profit.",
    stat: "vs 25% China rate",
  },
  {
    icon: Globe,
    title: "All EU Marketplaces",
    desc: "Sell on Amazon.de, .fr, .it, .es, .nl, .pl and all EU Temu marketplaces with a single Cyprus company.",
    stat: "27 EU countries",
  },
  {
    icon: Zap,
    title: "15–20 Business Day Setup",
    desc: "Fastest EU incorporation timeline. No visits required — we handle everything remotely with Mandarin support.",
    stat: "100% remote process",
  },
  {
    icon: BadgeCheck,
    title: "Amazon & Temu Verified",
    desc: "Cyprus companies pass Amazon EU verification in 5–15 days. Avoid the 60-90 day delays non-EU entities face.",
    stat: "96% first-try approval",
  },
  {
    icon: Banknote,
    title: "Stripe & PayPal Access",
    desc: "EU entity status unlocks Stripe, PayPal Business, Wise, and Airwallex — all unavailable to Chinese-registered entities.",
    stat: "Full payment access",
  },
  {
    icon: Truck,
    title: "EU Import & EORI",
    desc: "Direct import to Amazon FBA warehouses with your EORI number — no third-party EU importers cutting into margins.",
    stat: "Pan-European FBA ready",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Free Consultation",
    desc: "Mandarin-speaking advisor reviews your business model and recommends the optimal Cyprus structure.",
    duration: "Same day",
  },
  {
    step: "02",
    title: "Document Preparation",
    desc: "We prepare all required company documents. You provide passport + proof of address. Document translation available.",
    duration: "1–2 days",
  },
  {
    step: "03",
    title: "Company Registration",
    desc: "Cyprus Registrar of Companies incorporation. Certificate of Incorporation, MOA, and all corporate documents issued.",
    duration: "15–20 business days",
  },
  {
    step: "04",
    title: "Banking Setup",
    desc: "Wise Business account opened immediately. Traditional bank application submitted concurrently.",
    duration: "1–5 days",
  },
  {
    step: "05",
    title: "VAT & EORI Registration",
    desc: "EU VAT number and EORI customs number registered. Pan-European FBA enrollment documentation prepared.",
    duration: "2–4 weeks",
  },
  {
    step: "06",
    title: "Launch on Amazon & Temu",
    desc: "Your Amazon EU seller account and Temu Europe account registered under Cyprus company. First shipment can proceed.",
    duration: "Final step",
  },
];

const FAQS = [
  {
    q: "Do I need to visit Cyprus to register my company?",
    a: "No. The entire process is fully remote. We act as your authorized representative in Cyprus, handling all in-person formalities. You never need to visit Cyprus to incorporate, open accounts, or manage your company.",
  },
  {
    q: "Can I still run my Amazon account while transitioning to a Cyprus entity?",
    a: "Yes. We handle the Cyprus company registration in parallel with your ongoing operations. Once the Cyprus entity is ready, we guide you through updating your Amazon seller account with minimal disruption — most clients experience zero sales downtime.",
  },
  {
    q: "How does the 12.5% tax rate actually apply to my Amazon/Temu revenue?",
    a: "Cyprus corporate tax of 12.5% applies to your net profit after all legitimate business deductions — product costs, Amazon/Temu fees, shipping, advertising, and professional services. For a business with €500K revenue and €100K profit, you pay just €12,500 in Cyprus corporate tax.",
  },
  {
    q: "Can I use Stripe and PayPal with a Cyprus company?",
    a: "Yes — this is one of the biggest advantages. Cyprus is an EU member state, so your company is eligible for Stripe, PayPal Business, Wise Business, Revolut Business, and Airwallex with standard application requirements. These payment processors are unavailable or heavily restricted for Chinese-registered entities.",
  },
  {
    q: "What documents do I need from China?",
    a: "Your valid passport (certified copy), proof of address (utility bill or bank statement), and a personal bank statement showing financial background. Documents in Chinese need English translation — we coordinate professional certified translation.",
  },
  {
    q: "Do I need to file taxes in China as well?",
    a: "This depends on your personal tax residency situation in China. Cyprus has a double tax treaty with China that prevents double taxation. We work with partner tax advisors in China who can advise on your specific personal obligations. Most of our clients' total tax burden is significantly reduced, not increased.",
  },
  {
    q: "How long until my Amazon EU account is approved?",
    a: "With a Cyprus company, Amazon typically completes verification in 5–15 days. Our clients using our documentation package have a 96% first-submission approval rate. Compare to 60-90+ days for non-EU entities and frequent rejections.",
  },
  {
    q: "Can my family members be included in residency applications?",
    a: "Yes. Cyprus residency permits cover immediate family members — spouse and dependent children. We handle family member applications as part of our residency services.",
  },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero - China-focused */}
      <section className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
        <div className="relative container-wide px-4 lg:px-8 py-24 md:py-36">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/20 text-gold-300 text-sm font-semibold border border-gold-500/30 mb-6">
              <Store size={14} />
              For Amazon & Temu Sellers from China
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Register Your{" "}
              <span className="text-brand-400">European Company</span>{" "}
              in Cyprus — Fast
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/60 leading-relaxed max-w-2xl">
              Join 5,000+ Chinese e-commerce entrepreneurs who chose Cyprus as their EU base.
              Sell legally on Amazon EU and Temu Europe, pay just 12.5% corporate tax, and
              access Stripe, PayPal & EU banking — from China, fully remote.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary text-base gap-3">
                Start Your Company Today
                <ArrowRight size={18} />
              </Link>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-all"
              >
                <MessageCircle size={18} />
                Free WhatsApp Consultation
              </a>
            </div>
            {/* Trust signals */}
            <div className="mt-10 flex flex-wrap gap-6">
              {[
                { icon: BadgeCheck, text: "5,000+ companies incorporated" },
                { icon: Star, text: "Mandarin-speaking advisors" },
                { icon: Zap, text: "15–20 business days incorporation" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-white/50 text-sm">
                  <item.icon size={16} className="text-brand-400 shrink-0" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Cyprus for Chinese Sellers */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label">Why Cyprus?</span>
            <h2 className="section-title mt-4">
              The EU Advantage Every Chinese Seller Needs
            </h2>
            <p className="section-subtitle mx-auto mt-4">
              Cyprus gives Chinese Amazon and Temu sellers something no other EU country offers —
              the perfect combination of tax efficiency, speed, banking access, and English-language simplicity.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHINA_ADVANTAGES.map((item) => (
              <div
                key={item.title}
                className="card p-7 hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-5 group-hover:bg-brand-100 transition-colors">
                  <item.icon size={22} className="text-brand-500" />
                </div>
                <span className="text-xs font-bold text-gold-600 bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
                  {item.stat}
                </span>
                <h3 className="font-bold text-navy-900 text-lg mt-3">{item.title}</h3>
                <p className="text-sm text-navy-500 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Tax savings bar */}
          <div className="mt-12 bg-gradient-to-r from-navy-900 to-navy-950 rounded-3xl p-8 lg:p-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Annual Tax Savings: Cyprus vs China
                </h3>
                <p className="text-white/50 mt-2">
                  Based on net annual profit. Cyprus 12.5% vs China 25% corporate tax.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { profit: "€100K profit", saving: "€12,500/year" },
                  { profit: "€300K profit", saving: "€37,500/year" },
                  { profit: "€1M profit", saving: "€125,000/year" },
                ].map((row) => (
                  <div key={row.profit} className="flex items-center justify-between gap-4">
                    <span className="text-white/60 text-sm">{row.profit}</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-400 rounded-full" style={{ width: "62.5%" }} />
                    </div>
                    <span className="text-brand-400 font-bold text-sm shrink-0">{row.saving} saved</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E-Commerce Specific Packages */}
      <section className="section-padding bg-navy-50/40" id="ecommerce-packages">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label">E-Commerce Packages</span>
            <h2 className="section-title mt-4">
              Designed Specifically for Amazon & Temu Sellers
            </h2>
            <p className="section-subtitle mx-auto mt-4">
              Purpose-built packages for Chinese online shop owners — not generic company formation.
              Every package is tailored to what marketplace sellers actually need.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {ECOMMERCE_PACKAGES.map((pkg) => {
              const Icon = pkg.icon;
              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                    pkg.featured
                      ? "bg-gradient-to-br from-navy-900 to-navy-950 ring-2 ring-brand-500 shadow-2xl shadow-brand-500/20"
                      : "bg-white border border-navy-100 shadow-sm hover:shadow-xl"
                  }`}
                >
                  {pkg.badge && (
                    <div className="absolute top-5 right-5">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          pkg.featured
                            ? "bg-brand-500 text-white"
                            : "bg-gold-100 text-gold-700 border border-gold-200"
                        }`}
                      >
                        {pkg.badge}
                      </span>
                    </div>
                  )}
                  <div className="p-8">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                        pkg.featured ? "bg-brand-500/20" : "bg-brand-50"
                      }`}
                    >
                      <Icon size={22} className={pkg.featured ? "text-brand-400" : "text-brand-500"} />
                    </div>
                    <h3
                      className={`text-xl font-bold ${
                        pkg.featured ? "text-white" : "text-navy-900"
                      }`}
                    >
                      {pkg.title}
                    </h3>
                    <p
                      className={`text-sm mt-1 ${
                        pkg.featured ? "text-white/50" : "text-navy-400"
                      }`}
                    >
                      {pkg.subtitle}
                    </p>
                    <div className="mt-5">
                      <span
                        className={`text-sm ${
                          pkg.featured ? "text-white/40" : "text-navy-400"
                        }`}
                      >
                        Starting from
                      </span>
                      <p
                        className={`text-3xl font-bold mt-1 ${
                          pkg.featured ? "text-brand-400" : "text-navy-900"
                        }`}
                      >
                        EUR {pkg.price}
                      </p>
                      <span
                        className={`text-xs ${
                          pkg.featured ? "text-white/30" : "text-navy-400"
                        }`}
                      >
                        {pkg.period}
                      </span>
                    </div>

                    {/* Highlight */}
                    <div
                      className={`mt-5 p-3 rounded-xl text-xs font-medium ${
                        pkg.featured
                          ? "bg-brand-500/20 text-brand-300"
                          : "bg-green-50 text-green-700"
                      }`}
                    >
                      ✓ {pkg.highlight}
                    </div>

                    {/* Features */}
                    <ul className="mt-5 space-y-2">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle2
                            size={15}
                            className={`shrink-0 mt-0.5 ${
                              pkg.featured ? "text-brand-400" : "text-green-500"
                            }`}
                          />
                          <span
                            className={`text-sm ${
                              pkg.featured ? "text-white/70" : "text-navy-600"
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/contact"
                      className={`mt-7 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                        pkg.featured
                          ? "bg-brand-500 text-white hover:bg-brand-400"
                          : "bg-navy-900 text-white hover:bg-navy-800"
                      }`}
                    >
                      Get Started
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-navy-400 mt-8">
            All packages include Mandarin-speaking support. Custom packages available for multi-brand and enterprise structures.{" "}
            <Link href="/contact" className="text-brand-600 hover:underline font-medium">
              Contact us for a custom quote →
            </Link>
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-white" id="process">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label">How It Works</span>
            <h2 className="section-title mt-4">
              From China to Cyprus Company in 4–6 Weeks
            </h2>
            <p className="section-subtitle mx-auto mt-4">
              A streamlined, fully remote process designed specifically for Chinese entrepreneurs.
              No flights. No visits. Just results.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.step}
                className="relative p-7 rounded-2xl border border-navy-100 hover:border-brand-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl font-black text-navy-100 group-hover:text-brand-100 transition-colors">
                    {step.step}
                  </span>
                  <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
                    {step.duration}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">{step.title}</h3>
                <p className="text-sm text-navy-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div className="mt-12 text-center">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-bold rounded-2xl hover:bg-[#1ebe5b] transition-all shadow-lg shadow-green-500/20 hover:-translate-y-0.5 text-base"
            >
              <MessageCircle size={20} />
              WhatsApp: Chat with Our Mandarin Team Now
            </a>
            <p className="mt-3 text-sm text-navy-400">Available Monday – Friday, 9:00am – 6:00pm Cyprus time</p>
          </div>
        </div>
      </section>

      {/* Standard Company Setup Options */}
      <section className="section-padding bg-navy-50/30" id="cyprus">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label">All Jurisdictions</span>
            <h2 className="section-title mt-4">Company Setup Options</h2>
            <p className="section-subtitle mx-auto mt-4">
              From Cyprus to full EU multi-jurisdiction structures and international setups.
              Choose the framework that best fits your growth ambitions.
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
                      <h4 className="font-bold text-navy-900 mb-4">What&apos;s Included</h4>
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
      <section className="section-padding bg-white" id="licenses">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="section-title">License Management</h2>
            <p className="section-subtitle mx-auto mt-4">
              Keep your Cyprus business license compliant and up to date with our management services.
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
      <section className="section-padding bg-navy-50/30" id="residency">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="section-title">Residency &amp; Permits</h2>
            <p className="section-subtitle mx-auto mt-4">
              All residency and permit types processed with expert guidance. Chinese entrepreneurs
              qualify for multiple Cyprus residency pathways through their business activity.
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
          <div className="mt-8 p-6 rounded-2xl bg-brand-50 border border-brand-100">
            <p className="text-sm text-brand-800 text-center">
              <strong>Digital Nomad Visa available for Chinese online business owners.</strong> Live in Cyprus while managing your Amazon or Temu business. Monthly income requirement: €3,500/month.{" "}
              <Link href="/contact" className="font-semibold underline">
                Ask us about eligibility →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Banking & Finance */}
      <section className="section-padding bg-white" id="banking">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="section-title">Finance &amp; Banking</h2>
            <p className="section-subtitle mx-auto mt-4">
              Complete financial services for Chinese e-commerce businesses operating in Cyprus and the EU.
              We guide you through every banking relationship.
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
      <section className="section-padding bg-navy-50/30" id="offices">
        <div className="container-wide">
          <div className="bg-gradient-to-br from-navy-900 to-navy-950 rounded-3xl p-8 lg:p-12 text-white flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="w-14 h-14 rounded-2xl bg-brand-500/20 flex items-center justify-center mb-5">
                <Home size={26} className="text-brand-400" />
              </div>
              <h2 className="text-3xl font-bold">Virtual & Physical Offices</h2>
              <p className="text-white/50 mt-3 max-w-lg">
                Registered office addresses, virtual offices, and premium co-working spaces
                across Nicosia and Limassol. The physical address your Amazon, Temu, and bank
                applications require — from €500/year.
              </p>
            </div>
            <Link href="/contact" className="btn-primary shrink-0 text-base">
              Explore Offices
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label">FAQ</span>
            <h2 className="section-title mt-4">
              Questions from Chinese Sellers
            </h2>
            <p className="section-subtitle mx-auto mt-4">
              The most common questions we receive from Amazon and Temu sellers from China,
              answered by our Mandarin-speaking advisors.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="border border-navy-100 rounded-2xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-navy-50/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-navy-900 text-base">
                    {faq.q}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp size={20} className="text-brand-500 shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-navy-400 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-navy-600 leading-relaxed text-sm">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-navy-500 mb-4">
              Have a specific question about your Amazon or Temu business?
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1ebe5b] transition-colors"
            >
              <MessageCircle size={18} />
              Ask on WhatsApp — Free Answer
            </a>
          </div>
        </div>
      </section>

      <Stats />
      <CTA />
    </>
  );
}
