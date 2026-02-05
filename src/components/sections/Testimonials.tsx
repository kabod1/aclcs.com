"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, MessageCircle } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Thomas Richter",
    role: "Founder, Richter Digital Ltd",
    text: "ACLCS made my company formation in Cyprus incredibly smooth. From structure selection to bank account opening, everything was handled professionally. Got my registration in just a few days.",
    rating: 5,
    nationality: "German",
  },
  {
    name: "Sarah Williams",
    role: "CEO, Williams Consulting Ltd",
    text: "The team's knowledge of Cyprus corporate regulations saved me thousands. They identified the best structure for my consultancy and handled everything end-to-end. Highly recommend.",
    rating: 5,
    nationality: "British",
  },
  {
    name: "Dimitris Papadopoulos",
    role: "Director, Mediterranean Imports Ltd",
    text: "I've set up three companies through ACLCS over the past 4 years. Their consistency and attention to detail keeps me coming back. Best corporate services firm in Nicosia.",
    rating: 5,
    nationality: "Greek",
  },
  {
    name: "Maria Fernandes",
    role: "Founder, Fernandes Ventures Ltd",
    text: "As a non-EU entrepreneur relocating to Cyprus, I was overwhelmed by the process. ACLCS simplified everything — from my company registration to residency permit. All done seamlessly.",
    rating: 5,
    nationality: "Brazilian",
  },
  {
    name: "James O'Connor",
    role: "Managing Partner, O'Connor & Associates",
    text: "Professional, transparent, and efficient. The cost calculator on their website gave me an accurate estimate, and there were zero hidden fees. Exactly as quoted.",
    rating: 5,
    nationality: "Irish",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const total = TESTIMONIALS.length;

  const next = () => setCurrent((c) => (c + 1) % total);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  return (
    <section className="section-padding bg-navy-50/30 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient" />
      <div className="relative container-wide">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label">
            <MessageCircle size={14} />
            Testimonials
          </span>
          <h2 className="section-title">
            What Our <span className="text-gradient">Clients</span> Say
          </h2>
        </div>

        {/* Desktop: show 3 */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 3).map((t) => (
            <div key={t.name} className="card p-7 flex flex-col">
              <Quote size={28} className="text-brand-200 mb-4" />
              <p className="text-sm text-navy-600 leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-1 mt-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-navy-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                  <span className="text-xs font-bold text-brand-600">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-navy-900">{t.name}</p>
                  <p className="text-xs text-navy-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="lg:hidden">
          <div className="card p-7">
            <Quote size={28} className="text-brand-200 mb-4" />
            <p className="text-sm text-navy-600 leading-relaxed min-h-[80px]">
              &ldquo;{TESTIMONIALS[current].text}&rdquo;
            </p>
            <div className="flex items-center gap-1 mt-5">
              {Array.from({ length: TESTIMONIALS[current].rating }).map((_, i) => (
                <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-navy-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                  <span className="text-xs font-bold text-brand-600">
                    {TESTIMONIALS[current].name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-navy-900">
                    {TESTIMONIALS[current].name}
                  </p>
                  <p className="text-xs text-navy-400">
                    {TESTIMONIALS[current].role}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-9 h-9 rounded-full border border-navy-200 flex items-center justify-center hover:bg-navy-50 transition-colors"
                >
                  <ChevronLeft size={16} className="text-navy-500" />
                </button>
                <button
                  onClick={next}
                  className="w-9 h-9 rounded-full border border-navy-200 flex items-center justify-center hover:bg-navy-50 transition-colors"
                >
                  <ChevronRight size={16} className="text-navy-500" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-1.5 mt-5">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? "bg-brand-500 w-6" : "bg-navy-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Reviews CTA */}
        <div className="text-center mt-10">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors"
          >
            <Star size={16} className="fill-brand-500" />
            Write a Review
          </a>
        </div>
      </div>
    </section>
  );
}
