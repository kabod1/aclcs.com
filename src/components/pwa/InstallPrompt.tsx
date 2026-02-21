"use client";

import { useEffect, useState } from "react";
import { X, Share, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";

type Platform = "ios" | "android" | null;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [platform, setPlatform] = useState<Platform>(null);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Already installed (standalone mode) — don't show
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window.navigator as any).standalone === true
    ) {
      return;
    }

    const ua = window.navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !("MSStream" in window);
    const isAndroid = /Android/.test(ua);

    if (isIOS) {
      // Only show on Safari (not Chrome/Firefox on iOS which can't install PWAs)
      const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
      if (isSafari) setPlatform("ios");
    } else if (isAndroid) {
      // Listen for Chrome's beforeinstallprompt
      const handler = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setPlatform("android");
      };
      window.addEventListener("beforeinstallprompt", handler);
      return () => window.removeEventListener("beforeinstallprompt", handler);
    }
  }, []);

  if (!platform || dismissed) return null;

  async function handleAndroidInstall() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setPlatform(null);
    }
    setDeferredPrompt(null);
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-6 md:max-w-sm">
      <div className="bg-navy-900 text-white rounded-2xl shadow-2xl p-4 flex items-start gap-3">
        {/* App icon */}
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-navy-800 flex items-center justify-center">
          <span className="text-brand-500 text-xl font-bold">A</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-white">Install ACLCS Portal</p>
          {platform === "ios" ? (
            <p className="text-xs text-navy-300 mt-0.5 leading-relaxed">
              Tap{" "}
              <Share size={12} className="inline -mt-0.5 text-brand-400" />{" "}
              <span className="font-medium text-white">Share</span>, then{" "}
              <Plus size={12} className="inline -mt-0.5 text-brand-400" />{" "}
              <span className="font-medium text-white">Add to Home Screen</span>
            </p>
          ) : (
            <p className="text-xs text-navy-300 mt-0.5">
              Add to your home screen for quick access
            </p>
          )}

          {platform === "ios" && (
            <Link
              href="/login"
              className="inline-flex items-center gap-1 mt-2 px-3 py-1.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Open Portal <ArrowRight size={11} />
            </Link>
          )}

          {platform === "android" && (
            <button
              onClick={handleAndroidInstall}
              className="mt-2 px-3 py-1.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Install App
            </button>
          )}
        </div>

        {/* Dismiss */}
        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 text-navy-400 hover:text-white transition-colors p-0.5"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
