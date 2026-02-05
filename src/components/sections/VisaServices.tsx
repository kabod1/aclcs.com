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

const RESIDENCY_OPTIONS = [
  {
    icon: Crown,
    title: "Permanent Residency",
    description: "Obtain permanent residency in Cyprus through investment or business ownership.",
    duration: "Indefinite",
  },
  {
    icon: UserCheck,
    title: "Temporary Residence",
    description: "Secure a temporary residence permit for yourself while your Cyprus company is active.",
    duration: "1-3 years",
  },
  {
    icon: FileCheck,
    title: "Work Permit",
    description: "Obtain work permits for yourself and your employees to operate in Cyprus.",
    duration: "1-2 years",
  },
  {
    icon: Laptop,
    title: "Digital Nomad Visa",
    description: "Live and work remotely from Cyprus while employed by an overseas company.",
    duration: "1 year",
  },
  {
    icon: Users,
    title: "Family Reunification",
    description: "Bring your spouse, children, and dependents to Cyprus under family reunification provisions.",
    duration: "Tied to sponsor",
  },
  {
    icon: Palette,
    title: "Fast-Track Processing",
    description: "Expedited processing for residency permits, work authorisations, and all immigration paperwork.",
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
              Residency & Permits
            </span>
            <h2 className="section-title">
              Cyprus <span className="text-gradient">Residency Solutions</span>
            </h2>
            <p className="section-subtitle mt-3">
              From permanent residency to work permits, we process all permit types with expert
              guidance.
            </p>
          </div>
          <Link href="/services#residency" className="btn-outline text-sm shrink-0">
            View All Residency Options
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {RESIDENCY_OPTIONS.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.title}
                className="group flex gap-4 p-5 rounded-2xl border border-navy-100/60 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-300 bg-white"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center shrink-0 group-hover:bg-brand-100 transition-colors">
                  <Icon size={22} className="text-brand-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-navy-900 group-hover:text-brand-600 transition-colors">
                      {option.title}
                    </h3>
                    <span className="text-[10px] font-semibold text-navy-400 bg-navy-50 px-2 py-0.5 rounded-full shrink-0">
                      {option.duration}
                    </span>
                  </div>
                  <p className="text-sm text-navy-500 mt-1.5 leading-relaxed">
                    {option.description}
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
