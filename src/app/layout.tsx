import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "sonner";
import InstallPrompt from "@/components/pwa/InstallPrompt";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ACLCS | Company Formation in Cyprus & Europe",
  description:
    "Leading Cyprus company formation, corporate services and residency specialist. Incorporate your business in Cyprus with local, European, or international structures starting from EUR 2,000.",
  keywords: [
    "company formation cyprus",
    "cyprus incorporation",
    "europe company setup",
    "international company cyprus",
    "cyprus business license",
    "cyprus residency permit",
    "eu company registration",
  ],
  themeColor: "#0f172a",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ACLCS",
  },
  openGraph: {
    title: "ACLCS | Company Formation in Cyprus & Europe",
    description:
      "Incorporate your business in Cyprus. Local, European, or international company formation starting from EUR 2,000.",
    url: "https://www.aclcs.com",
    siteName: "ACLCS",
    locale: "en_CY",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        {children}
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            style: {
              borderRadius: "12px",
              fontFamily: "var(--font-inter)",
            },
          }}
        />
        <InstallPrompt />
        <Script
          id="sw-register"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
