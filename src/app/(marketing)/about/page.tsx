"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building,
  Globe,
  Users,
  Target,
  Heart,
  Briefcase,
  Shield,
} from "lucide-react";
import Stats from "@/components/sections/Stats";
import CTA from "@/components/sections/CTA";

const LEADERSHIP = [
  { name: "Andreas Georgiou", role: "Founder & Chairman", initials: "AG" },
  { name: "Elena Konstantinou", role: "Chief Executive Officer", initials: "EK" },
  { name: "Marcus Weber", role: "Chief Financial Officer", initials: "MW" },
  { name: "Sofia Papadopoulos", role: "Chief Operations Officer", initials: "SP" },
  { name: "Nikolaos Christodoulou", role: "Head of Legal & Compliance", initials: "NC" },
  { name: "Anna Petridou", role: "Chief Strategy Officer", initials: "AP" },
  { name: "Lukas Hartmann", role: "Director of Corporate Services", initials: "LH" },
  { name: "Maria Ioannou", role: "Director of Client Relations", initials: "MI" },
];

const VALUES = [
  {
    icon: Target,
    title: "Precision & Clarity",
    description: "We help you make informed, strategic choices for your business journey in Cyprus and the EU.",
  },
  {
    icon: Heart,
    title: "Client First",
    description: "Building trusted, long-term relationships through bespoke, personalized service.",
  },
  {
    icon: Shield,
    title: "EU Compliance",
    description: "Full adherence to EU regulations, Cyprus company law, and international best practices.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Serving clients from 150+ nationalities with multilingual support and international expertise.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px]" />
        <div className="relative container-wide px-4 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-300 text-sm font-medium border border-white/10 mb-6">
              <Building size={14} />
              About ACLCS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Your Trusted <span className="text-brand-400">Corporate Services Partner</span> in Cyprus
            </h1>
            <p className="mt-6 text-lg text-white/50 leading-relaxed">
              ACLCS is a leading Cyprus corporate services firm specialising in
              company formation, EU business structures, and international
              incorporation. We provide personalised business setup services to
              corporations and individuals establishing companies in Cyprus and
              across Europe.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label">
                <Target size={14} />
                Our Mission
              </span>
              <h2 className="section-title">
                Empowering <span className="text-gradient">Entrepreneurs</span>{" "}
                Worldwide
              </h2>
              <p className="text-navy-500 mt-5 leading-relaxed">
                We serve individuals, startups, and small to medium-sized
                companies with bespoke corporate setup advice. Our goal is to
                build trusted, long-term relationships while managing the entire
                formation process from start to finish.
              </p>
              <p className="text-navy-500 mt-4 leading-relaxed">
                We assist with corporate structure selection, jurisdiction
                guidance, and comprehensive administrative, legal, and
                financial aspects of business formation. Our post-establishment
                support includes accounting, tax advisory, and HR services to help
                your business thrive within the EU framework.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { value: "5,000+", label: "Companies Formed" },
                  { value: "30+", label: "EU Jurisdictions" },
                  { value: "150+", label: "Nationalities Served" },
                  { value: "15+", label: "Years Experience" },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl bg-navy-50">
                    <p className="text-2xl font-bold text-navy-900">{stat.value}</p>
                    <p className="text-sm text-navy-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-brand-50 to-brand-100/50 rounded-3xl p-8 lg:p-12">
                <div className="grid grid-cols-2 gap-6">
                  {VALUES.map((value) => {
                    const Icon = value.icon;
                    return (
                      <div key={value.title}>
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm">
                          <Icon size={20} className="text-brand-500" />
                        </div>
                        <h3 className="font-bold text-navy-900 text-sm">
                          {value.title}
                        </h3>
                        <p className="text-xs text-navy-500 mt-1 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Stats />

      {/* Leadership */}
      <section className="section-padding bg-white" id="team">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label">
              <Users size={14} />
              Leadership
            </span>
            <h2 className="section-title">
              Meet Our <span className="text-gradient">Team</span>
            </h2>
            <p className="section-subtitle mx-auto mt-4">
              Experienced professionals dedicated to making your business setup
              journey seamless and successful.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {LEADERSHIP.map((person) => (
              <div
                key={person.name}
                className="text-center group"
              >
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-navy-100 to-navy-200 flex items-center justify-center mx-auto mb-4 group-hover:from-brand-100 group-hover:to-brand-200 transition-all duration-300">
                  <span className="text-xl font-bold text-navy-500 group-hover:text-brand-600 transition-colors">
                    {person.initials}
                  </span>
                </div>
                <h3 className="font-bold text-navy-900 text-sm">{person.name}</h3>
                <p className="text-xs text-navy-400 mt-1">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="section-padding bg-navy-50/30" id="careers">
        <div className="container-wide">
          <div className="bg-white rounded-3xl border border-navy-100 p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <span className="section-label">
                <Briefcase size={14} />
                Careers
              </span>
              <h2 className="text-3xl font-bold text-navy-900 mt-2">
                Join Our Growing Team
              </h2>
              <p className="text-navy-500 mt-3">
                We&apos;re always looking for talented individuals to join our
                team in Nicosia. If you&apos;re passionate about helping businesses succeed,
                we&apos;d love to hear from you.
              </p>
            </div>
            <Link href="/contact" className="btn-primary shrink-0">
              View Open Positions
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
