import { redirect } from "next/navigation";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Process from "@/components/sections/Process";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import CostCalculator from "@/components/sections/CostCalculator";
import Referral from "@/components/sections/Referral";
import Press from "@/components/sections/Press";
import CTA from "@/components/sections/CTA";

export default function HomePage({
  searchParams,
}: {
  searchParams: { code?: string; error?: string; error_code?: string };
}) {
  // Supabase PKCE auth code lands here when redirectTo isn't matched — forward to confirm route
  if (searchParams.code) {
    redirect(`/api/auth/confirm?code=${searchParams.code}`);
  }

  // Supabase auth errors land here — send to login with readable message
  if (searchParams.error === "access_denied" || searchParams.error_code === "otp_expired") {
    redirect("/login?error=link_expired");
  }

  return (
    <>
      <Hero />
      <Press />
      <Stats />
      <Process />
      <WhyChooseUs />
      <Testimonials />
      <CostCalculator />
      <Referral />
      <CTA />
    </>
  );
}
