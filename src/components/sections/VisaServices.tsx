"use client";

import Link from "next/link";
import {
  ArrowRight,
  UserCheck,
  Users,
  Laptop,
  Crown,
  Palette,
  FileCheck,
} from "lucide-react";

const VISAS = [
  {
    icon: UserCheck,
    title: "Residence Visa",
    description: "Live and work in the UAE with a renewable residence visa tied to your company.",
    duration: "2-3 years",
  },
  {
    icon: Users,
    title: "Dependent Visa",
    description: "Sponsor your family members including spouse and children.",
    duration: "Tied to sponsor",
  },
  {
    icon: Laptop,
    title: "Remote Work Visa",
    description: "Work remotely from the UAE for an overseas employer.",
    duration: "1 year",
  },
  {
    icon: Crown,
    title: "Golden Visa",
    description: "Long-term residency for investors, entrepreneurs, and specialists.",
    duration: "5-10 years",
  },
  {
    icon: Palette,
    title: "Freelance Visa",
    description: "Work independently as a freelancer in your area of expertise.",
    duration: "1-3 years",
  },
  {
    icon: FileCheck,
    title: "VIP Services",
    description: "Expedited medical testing, Emirates ID, and visa stamping.",
    duration: "Express",
  },
];

export default function VisaServices() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="section-label">
              <FileCheck size={14} />
              Visa Services
            </span>
            <h2 className="section-title">
              UAE <span className="text-gradient">Visa Solutions</span>
            </h2>
            <p className="section-subtitle mt-3">
              From residence to golden visas, we process all visa types with expert
              guidance.
            </p>
          </div>
          <Link href="/services#visas" className="btn-outline text-sm shrink-0">
            View All Visa Options
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VISAS.map((visa) => {
            const Icon = visa.icon;
            return (
              <div
                key={visa.title}
                className="group flex gap-4 p-5 rounded-2xl border border-navy-100/60 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-300 bg-white"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center shrink-0 group-hover:bg-brand-100 transition-colors">
                  <Icon size={22} className="text-brand-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-navy-900 group-hover:text-brand-600 transition-colors">
                      {visa.title}
                    </h3>
                    <span className="text-[10px] font-semibold text-navy-400 bg-navy-50 px-2 py-0.5 rounded-full shrink-0">
                      {visa.duration}
                    </span>
                  </div>
                  <p className="text-sm text-navy-500 mt-1.5 leading-relaxed">
                    {visa.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
