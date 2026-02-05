"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { PHONE_LINK, PHONE } from "@/lib/utils";

export default function CTA() {
  return (
    <section className="section-padding bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[150px]" />

      <div className="relative container-wide text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl mx-auto">
          Ready to Start Your{" "}
          <span className="text-brand-400">Business in Cyprus?</span>
        </h2>
        <p className="mt-5 text-lg text-white/50 max-w-xl mx-auto">
          Take the first step today. Our experts are ready to guide you
          through every step of your company formation in Cyprus and Europe.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="btn-primary text-base"
          >
            Get Started Now
            <ArrowRight size={18} />
          </Link>
          <a
            href={PHONE_LINK}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/15 transition-all duration-200 backdrop-blur-sm border border-white/10 hover:-translate-y-0.5"
          >
            <Phone size={18} />
            {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}
