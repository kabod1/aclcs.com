import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";
import ScrollToTop from "@/components/ui/ScrollToTop";
import CallbackModal from "@/components/forms/CallbackModal";
import GoogleTranslate from "@/components/ui/GoogleTranslate";
import CookieBanner from "@/components/ui/CookieBanner";
import { Toaster } from "sonner";

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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppWidget />
        <ScrollToTop />
        <CallbackModal />
        <GoogleTranslate />
        <CookieBanner />
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
      </body>
    </html>
  );
}
