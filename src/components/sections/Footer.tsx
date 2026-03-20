"use client";

import Link from "next/link";
import Image from "next/image";
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
            <Link href="/" className="flex items-center mb-5">
              <Image
                src="/images/20260305_055231.png"
                alt="ACLCS – A&C Lazarou Corporate Services Limited"
                width={260}
                height={78}
                className="h-20 w-auto"
              />
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs font-medium">
              Leading Cyprus company formation, corporate services and residency
              specialist. Licensed and regulated.
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-3">
              <a
                href={PHONE_LINK}
                className="flex items-center gap-3 text-sm text-white/80 hover:text-brand-400 transition-colors font-medium"
              >
                <Phone size={14} className="shrink-0 text-brand-400" />
                {PHONE}
              </a>
              <a
                href={EMAIL_LINK}
                className="flex items-center gap-3 text-sm text-white/80 hover:text-brand-400 transition-colors font-medium"
              >
                <Mail size={14} className="shrink-0 text-brand-400" />
                {EMAIL}
              </a>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-white/80 hover:text-brand-400 transition-colors font-medium"
              >
                <MapPin size={14} className="shrink-0 mt-0.5 text-brand-400" />
                <span>{ADDRESS}</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-white/80 font-medium">
                <Clock size={14} className="shrink-0 text-brand-400" />
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
                  className="w-10 h-10 rounded-xl bg-white/15 border border-white/10 flex items-center justify-center text-white hover:bg-brand-500 hover:border-brand-500 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
              {/* TikTok */}
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/15 border border-white/10 flex items-center justify-center text-white hover:bg-brand-500 hover:border-brand-500 transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-extrabold text-white mb-4 tracking-wide uppercase">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-brand-400 transition-colors font-medium"
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
          <p className="text-xs text-white/60 font-medium">
            &copy; {new Date().getFullYear()} ACLCS Corporate Services. All rights reserved.
          </p>
          <p className="text-sm font-semibold text-white">
            Developed by{" "}
            <a
              href="https://townshub.cy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 underline decoration-gold-400/40 hover:text-gold-300 transition-colors"
            >
              TOWNSHUB LIMITED
            </a>
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/60 font-medium">We accept:</span>
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
