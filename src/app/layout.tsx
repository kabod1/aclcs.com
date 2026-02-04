import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";
import ScrollToTop from "@/components/ui/ScrollToTop";
import CallbackModal from "@/components/forms/CallbackModal";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Decisive Zone | Business Setup in Dubai & UAE",
  description:
    "Leading UAE company formation, business services and residency specialist. Setup your business in Dubai with free zone, mainland, or offshore options starting from AED 12,900.",
  keywords: [
    "business setup dubai",
    "free zone company",
    "mainland company setup",
    "offshore company UAE",
    "company formation dubai",
    "UAE business license",
    "dubai visa services",
  ],
  openGraph: {
    title: "Decisive Zone | Business Setup in Dubai & UAE",
    description:
      "Setup your business in Dubai. Free zone, mainland, or offshore company formation starting from AED 12,900.",
    url: "https://www.decisivezone.ae",
    siteName: "Decisive Zone",
    locale: "en_AE",
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
