"use client";

import {
  Shield,
  Clock,
  HeadphonesIcon,
  BadgeCheck,
  Banknote,
  Globe,
  Sparkles,
} from "lucide-react";

const REASONS = [
  {
    icon: Shield,
    title: "ISO 9001 Certified",
    description: "Our processes are internationally certified ensuring consistent quality and reliability.",
  },
  {
    icon: Clock,
    title: "Same Day Incorporation",
    description: "Get your business license issued within 24 hours with our express processing service.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Account Manager",
    description: "A single point of contact who manages your entire setup journey from start to finish.",
  },
  {
    icon: BadgeCheck,
    title: "Transparent Pricing",
    description: "No hidden fees or surprise charges. Every cost is communicated upfront before you commit.",
  },
  {
    icon: Banknote,
    title: "Flexible Payment Plans",
    description: "Split your setup costs with our easy installment options. Pay in 2, 3, or 4 payments.",
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description: "Our team speaks English, Arabic, Chinese, Spanish, Portuguese, and more.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient" />
      <div className="relative container-wide">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label">
            <Sparkles size={14} />
            Why Choose Us
          </span>
          <h2 className="section-title">
            The <span className="text-gradient">Decisive</span> Advantage
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            We&apos;ve helped over 10,000 businesses launch in the UAE. Here&apos;s
            why entrepreneurs trust us.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="group p-7 rounded-2xl border border-navy-100/60 hover:border-brand-200 bg-white hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-5 group-hover:bg-brand-100 group-hover:scale-110 transition-all duration-300">
                  <Icon size={22} className="text-brand-500" />
                </div>
                <h3 className="text-lg font-bold text-navy-900">{reason.title}</h3>
                <p className="text-sm text-navy-500 mt-2 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
