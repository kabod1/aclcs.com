import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";
import ScrollToTop from "@/components/ui/ScrollToTop";
import CallbackModal from "@/components/forms/CallbackModal";
import GoogleTranslate from "@/components/ui/GoogleTranslate";
import CookieBanner from "@/components/ui/CookieBanner";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppWidget />
      <ScrollToTop />
      <CallbackModal />
      <GoogleTranslate />
      <CookieBanner />
    </>
  );
}
