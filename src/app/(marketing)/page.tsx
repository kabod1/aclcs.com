"use client";

import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import SpecialOffers from "@/components/sections/SpecialOffers";
import FreeZones from "@/components/sections/FreeZones";
import Licenses from "@/components/sections/Licenses";
import VisaServices from "@/components/sections/VisaServices";
import Stats from "@/components/sections/Stats";
import Process from "@/components/sections/Process";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import CostCalculator from "@/components/sections/CostCalculator";
import Referral from "@/components/sections/Referral";
import Press from "@/components/sections/Press";
import CTA from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Press />
      <Services />
      <SpecialOffers />
      <FreeZones />
      <Stats />
      <Process />
      <Licenses />
      <VisaServices />
      <WhyChooseUs />
      <Testimonials />
      <CostCalculator />
      <Referral />
      <CTA />
    </>
  );
}
