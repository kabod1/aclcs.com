"use client";

import Link from "next/link";
import { ArrowRight, Calculator, Play, Shield, Award, Clock } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950" />
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-600/8 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />

      <div className="relative container-wide px-4 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-36 lg:pb-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-300 text-sm font-medium border border-white/10 mb-6 backdrop-blur-sm">
              <Shield size={14} />
              Licensed Corporate Services Provider
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              Incorporate Your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-gradient bg-gradient-to-r from-brand-400 to-brand-500 bg-clip-text text-transparent">
                  Business
                </span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-brand-500/20 rounded-full -z-0" />
              </span>{" "}
              in Cyprus
            </h1>

            <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-lg">
              Cyprus company formation, EU residency, banking and much more.
              Start your business journey with a trusted partner that has helped
              5,000+ entrepreneurs across Europe and beyond.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/#calculator" className="btn-primary text-base">
                <Calculator size={18} />
                Cost Calculator
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/15 transition-all duration-200 backdrop-blur-sm border border-white/10 hover:-translate-y-0.5">
                Contact Us
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Trust signals */}
            <div className="mt-10 flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2 text-white/50">
                <Award size={16} className="text-brand-400" />
                <span className="text-sm">5,000+ Companies Formed</span>
              </div>
              <div className="flex items-center gap-2 text-white/50">
                <Clock size={16} className="text-brand-400" />
                <span className="text-sm">Fast-Track Registration</span>
              </div>
              <div className="flex items-center gap-2 text-white/50">
                <Shield size={16} className="text-brand-400" />
                <span className="text-sm">EU-Regulated</span>
              </div>
            </div>
          </div>

          {/* Right - Stats card */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Floating accent */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-500/20 rounded-3xl rotate-12 blur-sm" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-brand-400/15 rounded-2xl -rotate-6 blur-sm" />

              <div className="relative glass-dark rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-3 h-3 rounded-full bg-brand-500 animate-pulse-slow" />
                  <span className="text-sm text-white/50 font-medium">Incorporation Packages</span>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Cyprus", price: "2,900", tag: "Most Popular", color: "brand" },
                    { label: "Europe", price: "4,500", tag: "EU Access", color: "navy" },
                    { label: "Outside Europe", price: "3,800", tag: "International", color: "brand" },
                  ].map((pkg) => (
                    <div
                      key={pkg.label}
                      className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/8 hover:border-white/10 transition-all group cursor-pointer"
                    >
                      <div>
                        <p className="text-white font-semibold">{pkg.label}</p>
                        <p className="text-xs text-white/40 mt-0.5">{pkg.tag}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-brand-400">
                          EUR {pkg.price}
                        </p>
                        <p className="text-xs text-white/30">starting from</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 border-2 border-navy-900 flex items-center justify-center text-[10px] text-white font-bold"
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-white/40">
                    <span className="text-brand-400 font-semibold">120+</span> companies
                    formed this month
                  </p>
                </div>
              </div>

              {/* Play video hint */}
              <div className="absolute -bottom-6 right-8 glass rounded-2xl px-4 py-3 flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center">
                  <Play size={16} className="text-white ml-0.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-navy-800">Watch How It Works</p>
                  <p className="text-[10px] text-navy-400">2 min overview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 64" fill="none" className="w-full h-auto">
          <path
            d="M0 32C240 64 480 0 720 32C960 64 1200 0 1440 32V64H0V32Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
