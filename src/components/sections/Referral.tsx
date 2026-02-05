"use client";

import Link from "next/link";
import { Gift, ArrowRight, Users, Wallet, Share2 } from "lucide-react";

export default function Referral() {
  return (
    <section className="section-padding bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2" />

      <div className="relative container-wide">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium border border-white/20 mb-6 backdrop-blur-sm">
              <Gift size={14} />
              Referral Program
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Refer & Earn Up To{" "}
              <span className="underline decoration-white/30 decoration-4 underline-offset-4">
                EUR 1,000
              </span>
            </h2>
            <p className="mt-5 text-lg text-white/70 leading-relaxed max-w-lg">
              Know someone looking to incorporate a company in Cyprus or Europe? Refer them to
              us and earn a cash reward for every successful signup.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 mt-8 bg-white text-brand-600 font-bold rounded-xl hover:bg-white/90 transition-all duration-200 shadow-xl shadow-black/10 hover:-translate-y-0.5 text-base"
            >
              Start Earning Now
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Share2,
                step: "01",
                title: "Share",
                desc: "Share your referral link with friends or colleagues.",
              },
              {
                icon: Users,
                step: "02",
                title: "They Sign Up",
                desc: "Your referral incorporates their company through us.",
              },
              {
                icon: Wallet,
                step: "03",
                title: "Get Paid",
                desc: "Receive up to EUR 1,000 per successful referral.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-white" />
                  </div>
                  <span className="text-xs font-bold text-white/40">STEP {item.step}</span>
                  <h3 className="text-lg font-bold text-white mt-1">{item.title}</h3>
                  <p className="text-sm text-white/60 mt-2">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
