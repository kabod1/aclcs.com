"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Check, Settings2, ChevronDown, ChevronUp, Shield } from "lucide-react";

const STORAGE_KEY = "aclcs-cookie-consent";

type ConsentState = {
  essential: true;
  functional: boolean;
  analytics: boolean;
  timestamp: string;
};

function getStoredConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed === "string") {
      // Migrate legacy "accepted"/"declined" string
      return {
        essential: true,
        functional: parsed === "accepted",
        analytics: parsed === "accepted",
        timestamp: new Date().toISOString(),
      };
    }
    return parsed as ConsentState;
  } catch {
    return null;
  }
}

function saveConsent(consent: ConsentState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [functional, setFunctional] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const acceptAll = () => {
    saveConsent({ essential: true, functional: true, analytics: true, timestamp: new Date().toISOString() });
    setVisible(false);
    setShowPreferences(false);
  };

  const rejectAll = () => {
    saveConsent({ essential: true, functional: false, analytics: false, timestamp: new Date().toISOString() });
    setVisible(false);
    setShowPreferences(false);
  };

  const savePreferences = () => {
    saveConsent({ essential: true, functional, analytics, timestamp: new Date().toISOString() });
    setVisible(false);
    setShowPreferences(false);
  };

  if (!visible) return null;

  const toggle = (category: string) =>
    setExpandedCategory(expandedCategory === category ? null : category);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[999] p-3 sm:p-5 animate-in slide-in-from-bottom-4 duration-300"
    >
      {!showPreferences ? (
        /* ── Simple banner ── */
        <div className="max-w-4xl mx-auto bg-navy-950 text-white rounded-2xl shadow-2xl border border-white/10 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center shrink-0">
              <Cookie size={20} className="text-brand-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white mb-0.5">We use cookies</p>
              <p className="text-xs text-white/50 leading-relaxed">
                We use essential cookies to keep the site running, plus optional cookies for functionality and analytics. See our{" "}
                <Link href="/cookie-policy" className="text-brand-400 hover:text-brand-300 underline underline-offset-2">
                  Cookie Policy
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="text-brand-400 hover:text-brand-300 underline underline-offset-2">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto">
              <button
                onClick={rejectAll}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium text-white/60 border border-white/10 hover:border-white/20 hover:text-white/80 transition-all"
              >
                <X size={12} />
                Reject All
              </button>
              <button
                onClick={() => setShowPreferences(true)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium text-white/60 border border-white/10 hover:border-white/20 hover:text-white/80 transition-all"
              >
                <Settings2 size={12} />
                Preferences
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold bg-brand-500 text-white hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/25"
              >
                <Check size={12} />
                Accept All
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ── Preferences panel ── */
        <div className="max-w-2xl mx-auto bg-navy-950 text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center">
                <Settings2 size={16} className="text-brand-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Cookie Preferences</p>
                <p className="text-[11px] text-white/40">Manage your consent by category</p>
              </div>
            </div>
            <button
              onClick={() => setShowPreferences(false)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/10 transition-all"
              aria-label="Back to banner"
            >
              <X size={14} />
            </button>
          </div>

          {/* Categories */}
          <div className="px-4 py-3 space-y-2 max-h-[60vh] overflow-y-auto">

            {/* Essential — always on */}
            <CategoryRow
              title="Essential Cookies"
              description="Required for the website to function correctly. Cannot be disabled — these include session management and your cookie consent preference."
              isExpanded={expandedCategory === "essential"}
              onToggle={() => toggle("essential")}
              enabled={true}
              locked
              examples={["aclcs-cookie-consent (localStorage)", "Supabase auth session"]}
            />

            {/* Functional */}
            <CategoryRow
              title="Functional Cookies"
              description="Enable enhanced features such as Google Translate language preferences. Disabling these may affect translation functionality."
              isExpanded={expandedCategory === "functional"}
              onToggle={() => toggle("functional")}
              enabled={functional}
              onEnabledChange={setFunctional}
              examples={["googtrans (Google Translate)", "NID, CONSENT (Google)"]}
            />

            {/* Analytics */}
            <CategoryRow
              title="Analytics & Performance"
              description="Help us understand how visitors use our website using Google Analytics. All data is anonymised and aggregated."
              isExpanded={expandedCategory === "analytics"}
              onToggle={() => toggle("analytics")}
              enabled={analytics}
              onEnabledChange={setAnalytics}
              examples={["_ga, _ga_*, _gid (Google Analytics)"]}
            />
          </div>

          {/* Footer */}
          <div className="px-4 py-4 border-t border-white/10 bg-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={11} className="text-white/30" />
              <p className="text-[11px] text-white/30">
                Your preferences are stored for 12 months. See our{" "}
                <Link href="/cookie-policy" className="text-brand-400/70 hover:text-brand-400 underline underline-offset-2">
                  Cookie Policy
                </Link>{" "}
                for full details.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={rejectAll}
                className="flex-1 py-2.5 rounded-xl text-xs font-medium text-white/50 border border-white/10 hover:border-white/20 hover:text-white/70 transition-all"
              >
                Reject All
              </button>
              <button
                onClick={savePreferences}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-brand-500 text-white hover:bg-brand-600 transition-colors"
              >
                Save Preferences
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/15 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CategoryRow({
  title,
  description,
  isExpanded,
  onToggle,
  enabled,
  locked,
  onEnabledChange,
  examples,
}: {
  title: string;
  description: string;
  isExpanded: boolean;
  onToggle: () => void;
  enabled: boolean;
  locked?: boolean;
  onEnabledChange?: (v: boolean) => void;
  examples?: string[];
}) {
  return (
    <div className="rounded-xl border border-white/10 overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Toggle or locked indicator */}
        <div className="shrink-0">
          {locked ? (
            <div className="w-10 h-5 rounded-full bg-brand-500/30 flex items-center justify-end pr-0.5 cursor-not-allowed">
              <div className="w-4 h-4 rounded-full bg-brand-400" />
            </div>
          ) : (
            <button
              role="switch"
              aria-checked={enabled}
              onClick={() => onEnabledChange?.(!enabled)}
              className={`w-10 h-5 rounded-full transition-colors ${enabled ? "bg-brand-500" : "bg-white/20"} flex items-center px-0.5`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
          )}
        </div>
        {/* Title */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold text-white">{title}</p>
            {locked && (
              <span className="text-[10px] text-brand-400 bg-brand-500/10 px-1.5 py-0.5 rounded-full font-medium">
                Always on
              </span>
            )}
          </div>
        </div>
        {/* Expand */}
        <button
          onClick={onToggle}
          className="w-6 h-6 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors"
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {isExpanded && (
        <div className="px-4 pb-3 pt-0 border-t border-white/5">
          <p className="text-[11px] text-white/40 leading-relaxed mt-2">{description}</p>
          {examples && examples.length > 0 && (
            <div className="mt-2">
              <p className="text-[10px] text-white/25 font-medium uppercase tracking-wide mb-1">Examples</p>
              <ul className="space-y-0.5">
                {examples.map((ex) => (
                  <li key={ex} className="text-[11px] text-white/30 font-mono">{ex}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
