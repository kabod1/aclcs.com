"use client";

import { Newspaper } from "lucide-react";

const PRESS = [
  { name: "Arabian Business", initials: "AB" },
  { name: "Entrepreneur", initials: "EN" },
  { name: "Gulf Today", initials: "GT" },
  { name: "Khaleej Times", initials: "KT" },
  { name: "MSN", initials: "MS" },
  { name: "Gulf News", initials: "GN" },
];

export default function Press() {
  return (
    <section className="py-16 bg-navy-50/30 border-y border-navy-100/50">
      <div className="container-wide px-4 lg:px-8">
        <div className="text-center mb-10">
          <span className="section-label">
            <Newspaper size={14} />
            As Featured In
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {PRESS.map((outlet) => (
            <div
              key={outlet.name}
              className="group flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-navy-200/50 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                <span className="text-xs font-bold text-navy-500 group-hover:text-brand-600 transition-colors">
                  {outlet.initials}
                </span>
              </div>
              <span className="text-sm font-semibold text-navy-600 group-hover:text-navy-900 transition-colors">
                {outlet.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
