"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Globe2,
  Landmark,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const SERVICES = [
  {
    icon: Building2,
    title: "Cyprus",
    price: "2,900",
    description:
      "Incorporate a private limited company in Cyprus with full EU market access, favourable tax rates, and robust legal framework.",
    features: [
      "12.5% corporate tax rate",
      "Full EU member state access",
      "100% foreign ownership",
      "No restrictions on directors",
      "Corporate bank account",
      "Residency permit eligibility",
    ],
    tag: "Most Popular",
    color: "brand",
    href: "/services#cyprus",
  },
  {
    icon: Landmark,
    title: "Europe",
    price: "4,500",
    description:
      "Establish your company in any EU member state with full cross-border compliance, passporting rights, and pan-European operations.",
    features: [
      "EU-wide market access",
      "Cross-border passporting",
      "VAT registration support",
      "Multi-jurisdiction compliance",
      "Nominee director options",
      "European banking solutions",
    ],
    tag: "EU Access",
    color: "navy",
    href: "/services#europe",
  },
  {
    icon: Globe2,
    title: "Outside Europe",
    price: "3,800",
    description:
      "Set up an international company structure for global operations with tax-efficient planning and asset protection.",
    features: [
      "Tax-efficient structures",
      "International banking",
      "100% foreign ownership",
      "Minimal reporting requirements",
      "Asset protection",
      "Global operations capability",
    ],
    tag: "International",
    color: "brand",
    href: "/services#outside-europe",
  },
];

export default function Services() {
  return (
    <section className="section-padding bg-white" id="services">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label">
            <Sparkles size={14} />
            Company Formation
          </span>
          <h2 className="section-title">
            Choose Your <span className="text-gradient">Jurisdiction</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Incorporate your business with the structure that best fits your
            goals. All packages include expert guidance and end-to-end support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            const isPopular = idx === 0;
            return (
              <div
                key={service.title}
                className={`relative rounded-3xl overflow-hidden transition-all duration-500 group hover:-translate-y-2 ${
                  isPopular
                    ? "bg-gradient-to-br from-navy-900 to-navy-950 text-white shadow-2xl shadow-navy-900/30 ring-1 ring-white/10 md:-mt-4 md:mb-0"
                    : "bg-white border border-navy-100 shadow-sm hover:shadow-xl"
                }`}
              >
                {isPopular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-brand-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
                      {service.tag}
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                      isPopular
                        ? "bg-brand-500/20"
                        : "bg-brand-50"
                    }`}
                  >
                    <Icon
                      size={26}
                      className={isPopular ? "text-brand-400" : "text-brand-500"}
                    />
                  </div>

                  <h3
                    className={`text-2xl font-bold ${
                      isPopular ? "text-white" : "text-navy-900"
                    }`}
                  >
                    {service.title}
                  </h3>

                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className={`text-sm ${isPopular ? "text-white/50" : "text-navy-400"}`}>
                      From
                    </span>
                    <span
                      className={`text-3xl font-bold ${
                        isPopular ? "text-brand-400" : "text-navy-900"
                      }`}
                    >
                      EUR {service.price}
                    </span>
                  </div>

                  <p
                    className={`mt-4 text-sm leading-relaxed ${
                      isPopular ? "text-white/60" : "text-navy-500"
                    }`}
                  >
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle2
                          size={16}
                          className={
                            isPopular ? "text-brand-400 shrink-0" : "text-green-500 shrink-0"
                          }
                        />
                        <span
                          className={`text-sm ${
                            isPopular ? "text-white/70" : "text-navy-600"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={service.href}
                    className={`mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 ${
                      isPopular
                        ? "bg-brand-500 text-white hover:bg-brand-400 shadow-lg shadow-brand-500/25"
                        : "bg-navy-900 text-white hover:bg-navy-800 shadow-lg shadow-navy-900/15"
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
      </div>
    </section>
  );
}
