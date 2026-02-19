"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  CreditCard,
  Bitcoin,
} from "lucide-react";
import {
  PHONE,
  PHONE_LINK,
  EMAIL,
  EMAIL_LINK,
  ADDRESS,
  MAPS_LINK,
  SOCIAL_LINKS,
} from "@/lib/utils";

const FOOTER_LINKS = {
  "Company Setup": [
    { label: "Cyprus", href: "/services#cyprus" },
    { label: "Europe", href: "/services#europe" },
    { label: "Outside Europe", href: "/services#outside-europe" },
    { label: "Cost Calculator", href: "/#calculator" },
  ],
  Services: [
    { label: "License Management", href: "/services#licenses" },
    { label: "Residency & Permits", href: "/services#residency" },
    { label: "Banking & Finance", href: "/services#banking" },
    { label: "Office Spaces", href: "/services#offices" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/about#careers" },
    { label: "Contact", href: "/contact" },
    { label: "Referral Program", href: "/#referral" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "/privacy-policy#9-cookies" },
    { label: "GDPR Rights", href: "/privacy-policy#7-your-gdpr-rights" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      {/* Main footer */}
      <div className="container-wide px-4 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div>
                <span className="text-xl font-bold">
                  ACLCS<span className="text-brand-400"> Corporate</span>
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Leading Cyprus company formation, corporate services and residency
              specialist. Licensed and regulated.
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-3">
              <a
                href={PHONE_LINK}
                className="flex items-center gap-3 text-sm text-white/50 hover:text-brand-400 transition-colors"
              >
                <Phone size={14} className="shrink-0" />
                {PHONE}
              </a>
              <a
                href={EMAIL_LINK}
                className="flex items-center gap-3 text-sm text-white/50 hover:text-brand-400 transition-colors"
              >
                <Mail size={14} className="shrink-0" />
                {EMAIL}
              </a>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-white/50 hover:text-brand-400 transition-colors"
              >
                <MapPin size={14} className="shrink-0 mt-0.5" />
                <span>{ADDRESS}</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <Clock size={14} className="shrink-0" />
                Mon - Fri, 9:00am - 6:00pm
              </div>
            </div>

            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: Facebook, href: SOCIAL_LINKS.facebook },
                { icon: Instagram, href: SOCIAL_LINKS.instagram },
                { icon: Twitter, href: SOCIAL_LINKS.twitter },
                { icon: Linkedin, href: SOCIAL_LINKS.linkedin },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:bg-brand-500 hover:text-white transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-bold text-white mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-brand-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-wide px-4 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} ACLCS Corporate Services. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/20">We accept:</span>
            <div className="flex items-center gap-2">
              {["Visa", "MC", "Amex"].map((card) => (
                <div
                  key={card}
                  className="w-10 h-6 rounded bg-white/10 flex items-center justify-center"
                >
                  <CreditCard size={12} className="text-white/30" />
                </div>
              ))}
              <div className="w-10 h-6 rounded bg-white/10 flex items-center justify-center">
                <Bitcoin size={12} className="text-white/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
