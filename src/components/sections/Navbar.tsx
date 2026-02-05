"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_ITEMS, PHONE, PHONE_LINK, EMAIL_LINK, WHATSAPP_LINK } from "@/lib/utils";
import {
  Phone,
  Mail,
  Menu,
  X,
  ChevronDown,
  Globe,
  Calculator,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "el", label: "Ελληνικά" },
  { code: "ru", label: "Русский" },
  { code: "de", label: "Deutsch" },
  { code: "zh-CN", label: "简体中文" },
  { code: "zh-TW", label: "繁體中文" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "hi", label: "हिन्दी" },
  { code: "th", label: "ไทย" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "id", label: "Bahasa Indonesia" },
  { code: "ms", label: "Bahasa Melayu" },
  { code: "tl", label: "Filipino" },
  { code: "bn", label: "বাংলা" },
  { code: "ur", label: "اردو" },
  { code: "ta", label: "தமிழ்" },
  { code: "my", label: "မြန်မာ" },
  { code: "km", label: "ខ្មែរ" },
  { code: "lo", label: "ລາວ" },
  { code: "ne", label: "नेपाली" },
  { code: "si", label: "සිංහල" },
  { code: "mn", label: "Монгол" },
  { code: "kk", label: "Қазақша" },
  { code: "uz", label: "O'zbek" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-navy-950 text-white/80 text-sm hidden lg:block">
        <div className="container-wide flex items-center justify-between py-2 px-8">
          <div className="flex items-center gap-6">
            <span className="font-semibold text-white">aclcs.com</span>
            <span className="text-white/20">|</span>
            <a href={PHONE_LINK} className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={13} />
              {PHONE}
            </a>
            <a href={EMAIL_LINK} className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={13} />
              admin@aclcs.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/#calculator"
              className="flex items-center gap-1.5 text-brand-400 hover:text-brand-300 font-medium transition-colors"
            >
              <Calculator size={13} />
              Cost Calculator
            </Link>
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Globe size={13} />
                EN
                <ChevronDown size={12} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-36 bg-white rounded-xl shadow-xl border border-navy-100 py-1 z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      className="w-full text-left px-4 py-2 text-sm text-navy-700 hover:bg-navy-50 transition-colors"
                      onClick={() => setLangOpen(false)}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-navy-900/5 border-b border-navy-100/50"
            : "bg-white"
        }`}
      >
        <div className="container-wide flex items-center justify-between h-[72px] px-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-brand-500/20">
              A
            </div>
            <div className="leading-tight">
              <span className="text-xl font-bold text-navy-900 tracking-tight">
                ACLCS
              </span>
              <p className="text-[10px] text-navy-400 font-medium -mt-0.5 tracking-wider uppercase">
                Corporate Services
              </p>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium text-navy-700 hover:text-brand-600 rounded-lg hover:bg-brand-50/50 transition-all"
                >
                  {item.label}
                  {item.children && <ChevronDown size={14} className="text-navy-400" />}
                </Link>
                {item.children && activeDropdown === item.label && (
                  <div className="absolute left-0 top-full pt-2 z-50">
                    <div className="w-72 bg-white rounded-2xl shadow-2xl border border-navy-100/60 py-2 overflow-hidden">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="flex items-start gap-3 px-5 py-3 hover:bg-brand-50/50 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand-100 transition-colors">
                            <ArrowRight size={14} className="text-brand-500" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-navy-800 group-hover:text-brand-600 transition-colors">
                              {child.label}
                            </p>
                            <p className="text-xs text-navy-400 mt-0.5">
                              {child.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm">
              <MessageCircle size={16} />
              Chat with Us
            </a>
            <Link href="/contact" className="btn-primary text-sm">
              Get Started
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile menu btn */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-navy-50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 top-[72px] bg-white z-40 overflow-y-auto">
            <div className="p-6 space-y-2">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === item.label ? null : item.label
                          )
                        }
                        className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-navy-800 rounded-xl hover:bg-navy-50 transition-colors"
                      >
                        {item.label}
                        <ChevronDown
                          size={18}
                          className={`text-navy-400 transition-transform ${
                            activeDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {activeDropdown === item.label && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block px-4 py-2.5 text-sm text-navy-600 rounded-lg hover:bg-brand-50 hover:text-brand-600 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-base font-medium text-navy-800 rounded-xl hover:bg-navy-50 transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-navy-100 space-y-3">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-outline w-full text-sm">
                  <MessageCircle size={16} />
                  Chat with Us
                </a>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full text-sm"
                >
                  Get Started
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
