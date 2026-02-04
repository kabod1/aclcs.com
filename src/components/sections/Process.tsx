"use client";

import {
  MessageSquare,
  FileSearch,
  FileCheck,
  Building2,
  CreditCard,
  PartyPopper,
  ArrowDown,
} from "lucide-react";

const STEPS = [
  {
    icon: MessageSquare,
    title: "Free Consultation",
    description: "Share your business idea and requirements. We assess the best structure and jurisdiction for you.",
  },
  {
    icon: FileSearch,
    title: "Document Preparation",
    description: "We prepare all required documents and guide you through the KYC process.",
  },
  {
    icon: FileCheck,
    title: "License Application",
    description: "We submit your application and liaise with government authorities on your behalf.",
  },
  {
    icon: Building2,
    title: "Company Registration",
    description: "Your company is officially registered and trade license issued.",
  },
  {
    icon: CreditCard,
    title: "Banking & Visa",
    description: "We open your corporate bank account and process all visa applications.",
  },
  {
    icon: PartyPopper,
    title: "You're in Business",
    description: "Start operating your business in the UAE. We continue supporting you post-setup.",
  },
];

export default function Process() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label">
            <FileCheck size={14} />
            How It Works
          </span>
          <h2 className="section-title">
            Simple <span className="text-gradient">6-Step</span> Process
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            From initial consultation to business operation, here&apos;s how we
            get your company up and running in the UAE.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative group">
                {/* Connector line (visible between rows on desktop) */}
                {idx < STEPS.length - 1 && idx % 3 !== 2 && (
                  <div className="hidden lg:block absolute top-8 left-full w-8 h-px bg-navy-200 z-0" />
                )}

                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 group-hover:scale-105 transition-all duration-300">
                      <Icon size={26} className="text-brand-500" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-navy-900 text-white text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-navy-900 group-hover:text-brand-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-navy-500 mt-1.5 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
