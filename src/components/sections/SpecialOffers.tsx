"use client";

import Link from "next/link";
import { ArrowRight, Zap, Check, Star } from "lucide-react";

const OFFERS = [
  {
    badge: "Best Value",
    title: "Cyprus Starter",
    subtitle: "Private Limited Company",
    price: "2,900",
    originalPrice: "3,800",
    features: [
      "Company registration",
      "Registered office address",
      "Company secretary for 1 year",
      "Bank account introduction",
      "Tax registration (Income & VAT)",
    ],
    featured: false,
  },
  {
    badge: "Recommended",
    title: "Cyprus Business+",
    subtitle: "Full Incorporation Package",
    price: "4,200",
    originalPrice: "5,500",
    features: [
      "Company registration & apostille",
      "Registered office for 1 year",
      "Nominee director available",
      "Corporate bank account opening",
      "Residency permit application",
    ],
    featured: true,
  },
  {
    badge: "International",
    title: "Global Structure",
    subtitle: "Outside Europe Package",
    price: "3,800",
    originalPrice: "4,900",
    features: [
      "International company formation",
      "Corporate bank account",
      "100% foreign ownership",
      "Minimal reporting obligations",
      "Asset protection structure",
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
            Take advantage of our limited-time offers and save on your company
            formation in Cyprus and internationally.
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
                    EUR {offer.price}
                  </span>
                  <span className="text-sm text-navy-400 line-through">
                    EUR {offer.originalPrice}
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
