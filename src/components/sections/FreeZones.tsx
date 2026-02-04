"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Building } from "lucide-react";
import { FREE_ZONES } from "@/lib/utils";

export default function FreeZones() {
  return (
    <section className="section-padding bg-navy-50/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-500/5 rounded-full blur-[100px] -translate-x-1/2" />
      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="section-label">
              <MapPin size={14} />
              Free Zone Network
            </span>
            <h2 className="section-title">
              50+ Free Zones,{" "}
              <span className="text-gradient">One Partner</span>
            </h2>
            <p className="section-subtitle mt-4">
              We are authorized representatives for all major UAE free zones.
              Whether you need a trading, consulting, or tech license, we&apos;ll
              match you with the perfect zone.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                "Full foreign ownership",
                "Zero income tax",
                "Repatriation of profits",
                "No currency restrictions",
                "Fast incorporation",
                "Visa allocation",
              ].map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-2 text-sm text-navy-600"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                  {benefit}
                </div>
              ))}
            </div>

            <Link
              href="/services#freezone"
              className="btn-primary mt-8 text-sm"
            >
              Explore Free Zones
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {FREE_ZONES.map((zone) => (
              <div
                key={zone}
                className="group bg-white rounded-xl p-4 border border-navy-100/60 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-300 text-center cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center mx-auto mb-2 group-hover:bg-brand-50 transition-colors">
                  <Building size={18} className="text-navy-400 group-hover:text-brand-500 transition-colors" />
                </div>
                <p className="text-xs font-bold text-navy-700 group-hover:text-brand-600 transition-colors">
                  {zone}
                </p>
              </div>
            ))}
            <div className="bg-brand-500 rounded-xl p-4 flex flex-col items-center justify-center text-white cursor-pointer hover:bg-brand-600 transition-colors">
              <span className="text-lg font-bold">37+</span>
              <span className="text-[10px] mt-1 opacity-80">More Zones</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
