"use client";

import {
  Shield,
  Percent,
  FileCheck,
  Scale,
  Globe,
  HeadphonesIcon,
  Sparkles,
} from "lucide-react";

const REASONS = [
  {
    icon: Shield,
    title: "EU Member State",
    description: "Cyprus is a full EU member, giving your company access to the entire European single market and regulatory framework.",
  },
  {
    icon: Percent,
    title: "12.5% Corporate Tax",
    description: "One of the lowest corporate tax rates in the EU, with additional incentives for IP, shipping, and holding structures.",
  },
  {
    icon: FileCheck,
    title: "Double Tax Treaties",
    description: "Cyprus has signed over 65 double tax treaties worldwide, minimising withholding taxes on dividends, interest, and royalties.",
  },
  {
    icon: Scale,
    title: "English Common Law",
    description: "The Cyprus legal system is based on English common law, providing a familiar and transparent framework for international business.",
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description: "Our team speaks English, Greek, Russian, and German to serve our diverse international client base.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Account Manager",
    description: "A single point of contact who manages your entire setup journey from start to finish with personalised attention.",
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
            The <span className="text-gradient">ACLCS</span> Advantage
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            We&apos;ve helped over 5,000 businesses incorporate in Cyprus and across Europe. Here&apos;s
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
