"use client";

import Link from "next/link";
import {
  Bitcoin,
  ShoppingCart,
  Globe,
  Briefcase,
  Building,
  Megaphone,
  ArrowRight,
  LayoutGrid,
} from "lucide-react";

const LICENSES = [
  {
    icon: Bitcoin,
    title: "Crypto Trading License",
    description: "Trade cryptocurrencies legally in the UAE with a regulated license.",
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50",
  },
  {
    icon: ShoppingCart,
    title: "General Trading License",
    description: "Import, export, and trade a wide range of goods across the UAE.",
    color: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50",
  },
  {
    icon: Globe,
    title: "E-Commerce License",
    description: "Launch your online store and sell products or services digitally.",
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50",
  },
  {
    icon: Briefcase,
    title: "Management Consultancy",
    description: "Provide professional consulting services to businesses in the region.",
    color: "from-violet-500 to-purple-600",
    bgLight: "bg-violet-50",
  },
  {
    icon: Building,
    title: "Real Estate License",
    description: "Operate in the UAE real estate market with a brokerage license.",
    color: "from-rose-500 to-pink-600",
    bgLight: "bg-rose-50",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Run a digital marketing agency or consultancy in the UAE.",
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
            Business Licenses
          </span>
          <h2 className="section-title">
            Popular <span className="text-gradient">Licenses</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Get the right license for your business activity. We handle the
            entire licensing process from application to approval.
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
