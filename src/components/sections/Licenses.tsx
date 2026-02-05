"use client";

import Link from "next/link";
import {
  Globe,
  TrendingUp,
  Ship,
  Laptop,
  Briefcase,
  Building,
  ArrowRight,
  LayoutGrid,
} from "lucide-react";

const LICENSES = [
  {
    icon: Globe,
    title: "International Trading",
    description: "Set up an international trading company in Cyprus with full EU market access and competitive tax rates.",
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50",
  },
  {
    icon: TrendingUp,
    title: "Forex / Investment Firm",
    description: "Establish a CySEC-regulated investment or forex firm in one of Europe's leading financial centres.",
    color: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50",
  },
  {
    icon: Ship,
    title: "Shipping Company",
    description: "Leverage Cyprus's tonnage tax system and maritime heritage for your shipping operations.",
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50",
  },
  {
    icon: Laptop,
    title: "IT & Technology",
    description: "Launch your tech company with access to skilled talent, IP box regime, and EU-wide operations.",
    color: "from-violet-500 to-purple-600",
    bgLight: "bg-violet-50",
  },
  {
    icon: Briefcase,
    title: "Management Consultancy",
    description: "Provide professional consulting services across Europe from a Cyprus-based entity.",
    color: "from-rose-500 to-pink-600",
    bgLight: "bg-rose-50",
  },
  {
    icon: Building,
    title: "Holding Company",
    description: "Benefit from Cyprus's extensive double tax treaty network and participation exemption for holding structures.",
    color: "from-sky-500 to-cyan-600",
    bgLight: "bg-sky-50",
  },
];

export default function Licenses() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label">
            <LayoutGrid size={14} />
            Business Types
          </span>
          <h2 className="section-title">
            Popular <span className="text-gradient">Business Types</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Choose the right company structure for your business activity. We handle the
            entire incorporation process from application to registration.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LICENSES.map((license) => {
            const Icon = license.icon;
            return (
              <Link
                key={license.title}
                href="/services#licenses"
                className="group card p-7 flex flex-col"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${license.bgLight} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={22} className={`bg-gradient-to-br ${license.color} bg-clip-text`} style={{ color: 'inherit' }} />
                </div>
                <h3 className="text-lg font-bold text-navy-900 group-hover:text-brand-600 transition-colors">
                  {license.title}
                </h3>
                <p className="text-sm text-navy-500 mt-2 leading-relaxed flex-1">
                  {license.description}
                </p>
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-brand-500 group-hover:gap-3 transition-all">
                  Read More
                  <ArrowRight size={14} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
