"use client";

import { useEffect, useState } from "react";

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
  "ne", "si", "mn", "kk", "uz", "ar", "fr", "es", "pt", "tr",
];

export function changeLanguage(langCode: string) {
  const select = document.querySelector(
    ".goog-te-combo"
  ) as HTMLSelectElement | null;
  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event("change"));
    localStorage.setItem("preferredLang", langCode);
    return true;
  }
  return false;
}

export function getCurrentLanguage(): string {
  return localStorage.getItem("preferredLang") || "en";
}

function detectBrowserLang(): string | null {
  const browserLang = navigator.language || "";
  const langCode = browserLang.toLowerCase();

  // Exact match (e.g. zh-cn, zh-tw)
  const exact = SUPPORTED_LANGS.find((l) => l.toLowerCase() === langCode);
  if (exact && exact !== "en") return exact;

  // Prefix match (e.g. "ja" from "ja-JP", "zh" from "zh-Hans-CN")
  const prefix = langCode.split("-")[0];
  const match = SUPPORTED_LANGS.find(
    (l) => l.toLowerCase() === prefix || l.toLowerCase().startsWith(prefix + "-")
  );
  if (match && match !== "en") return match;

  return null;
}

function applyLanguageWhenReady(langCode: string, attempts = 0) {
  if (attempts > 30) return;
  const success = changeLanguage(langCode);
  if (!success) {
    setTimeout(() => applyLanguageWhenReady(langCode, attempts + 1), 200);
  }
}

// ─── Baidu Translate Button (for mainland China) ───────────────────────────

function BaiduTranslateWidget() {
  const handleTranslate = () => {
    const url = encodeURIComponent(window.location.href);
    window.location.href = `https://fanyi.baidu.com/transpage?query=${url}&from=en&to=zh&source=url&render=1`;
  };

  return (
    <div className="fixed bottom-28 right-4 z-50 flex flex-col items-end gap-2">
      <button
        onClick={handleTranslate}
        className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-2.5 rounded-full shadow-lg transition-colors flex items-center gap-2"
        aria-label="百度翻译 - 查看中文版"
        title="百度翻译 - 查看中文版"
      >
        <span className="text-base leading-none">中</span>
        <span>中文翻译</span>
      </button>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

interface Props {
  isChina?: boolean;
}

export default function GoogleTranslate({ isChina = false }: Props) {
  const [showBaidu, setShowBaidu] = useState(isChina);

  useEffect(() => {
    // For confirmed China visitors: use Baidu only (don't load blocked Google script)
    if (isChina) {
      setShowBaidu(true);
      return;
    }

    // For everyone else: load Google Translate + auto-detect language
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

      // Apply saved or auto-detected language after widget initializes
      const saved = localStorage.getItem("preferredLang");
      if (saved && saved !== "en") {
        applyLanguageWhenReady(saved);
      } else if (!saved) {
        const detected = detectBrowserLang();
        if (detected) {
          applyLanguageWhenReady(detected);
        }
      }
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, [isChina]);

  if (showBaidu) {
    return (
      <>
        <div id="google_translate_element" className="hidden" />
        <BaiduTranslateWidget />
      </>
    );
  }

  return <div id="google_translate_element" className="hidden" />;
}
