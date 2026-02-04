"use client";

import Link from "next/link";
import { ArrowRight, Zap, Check, Star } from "lucide-react";

const OFFERS = [
  {
    badge: "Best Value",
    title: "1 Visa - Business License",
    subtitle: "UAE Free Zone",
    price: "12,000",
    originalPrice: "15,000",
    features: [
      "Business license with 1 activity",
      "1 shareholder",
      "100% ownership",
      "Establishment card",
      "Immigration card",
    ],
    featured: false,
  },
  {
    badge: "Recommended",
    title: "1 Visa - IFZA License",
    subtitle: "International Free Zone",
    price: "17,900",
    originalPrice: "22,000",
    features: [
      "IFZA business license",
      "Establishment card",
      "1 residence visa",
      "Medical & Emirates ID",
      "Full incorporation support",
    ],
    featured: true,
  },
  {
    badge: "Tax Free",
    title: "Offshore Company",
    subtitle: "Global Operations",
    price: "18,500",
    originalPrice: "23,000",
    features: [
      "Tax-free operation",
      "Corporate bank account",
      "100% foreign ownership",
      "No audit requirement",
      "Asset protection",
    ],
    featured: false,
  },
];

export default function SpecialOffers() {
  return (
    <section className="section-padding bg-navy-50/50 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient" />
      <div className="relative container-wide">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label">
            <Zap size={14} />
            Special Offers
          </span>
          <h2 className="section-title">
            Exclusive <span className="text-gradient">Packages</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Take advantage of our limited-time offers and save on your business
            setup in the UAE.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {OFFERS.map((offer) => (
            <div
              key={offer.title}
              className={`relative card overflow-hidden ${
                offer.featured
                  ? "ring-2 ring-brand-500 md:-mt-3 md:mb-0"
                  : ""
              }`}
            >
              {offer.featured && (
                <div className="bg-gradient-to-r from-brand-500 to-brand-600 text-white text-center py-2 text-xs font-bold tracking-wider uppercase">
                  <Star size={12} className="inline mr-1.5 -mt-0.5" />
                  {offer.badge}
                </div>
              )}
              <div className="p-7">
                {!offer.featured && (
                  <span className="inline-block px-3 py-1 rounded-full bg-navy-100 text-navy-600 text-xs font-semibold mb-4">
                    {offer.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold text-navy-900">{offer.title}</h3>
                <p className="text-sm text-navy-400 mt-1">{offer.subtitle}</p>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-navy-900">
                    AED {offer.price}
                  </span>
                  <span className="text-sm text-navy-400 line-through">
                    AED {offer.originalPrice}
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {offer.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check size={16} className="text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-navy-600">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`mt-7 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 ${
                    offer.featured
                      ? "bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/25"
                      : "bg-navy-900 text-white hover:bg-navy-800"
                  }`}
                >
                  Enquire Now
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
