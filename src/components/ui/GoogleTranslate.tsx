"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: {
          new (config: object, element: string): void;
          InlineLayout: { SIMPLE: number };
        };
      };
    };
    googleTranslateElementInit: () => void;
  }
}

const SUPPORTED_LANGS = [
  "en", "el", "ru", "de", "zh-CN", "zh-TW", "ja", "ko", "hi", "th",
  "vi", "id", "ms", "tl", "bn", "ur", "ta", "my", "km", "lo",
  "ne", "si", "mn", "kk", "uz",
];

export function changeLanguage(langCode: string) {
  const select = document.querySelector(
    ".goog-te-combo"
  ) as HTMLSelectElement | null;
  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event("change"));
    localStorage.setItem("preferredLang", langCode);
  }
}

export function getCurrentLanguage(): string {
  return localStorage.getItem("preferredLang") || "en";
}

export default function GoogleTranslate() {
  useEffect(() => {
    // Don't re-initialize if already loaded
    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: SUPPORTED_LANGS.join(","),
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );

      // Auto-detect browser language after a short delay for the widget to initialize
      setTimeout(() => {
        const saved = localStorage.getItem("preferredLang");
        if (saved && saved !== "en") {
          changeLanguage(saved);
        } else if (!saved) {
          const browserLang = navigator.language || "";
          const langCode = browserLang.toLowerCase();

          // Try exact match first (e.g. zh-cn, zh-tw)
          const exact = SUPPORTED_LANGS.find(
            (l) => l.toLowerCase() === langCode
          );
          if (exact && exact !== "en") {
            changeLanguage(exact);
            return;
          }

          // Try prefix match (e.g. "ja" from "ja-JP")
          const prefix = langCode.split("-")[0];
          const match = SUPPORTED_LANGS.find(
            (l) => l.toLowerCase() === prefix || l.toLowerCase().startsWith(prefix + "-")
          );
          if (match && match !== "en") {
            changeLanguage(match);
          }
        }
      }, 1500);
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return <div id="google_translate_element" className="hidden" />;
}
