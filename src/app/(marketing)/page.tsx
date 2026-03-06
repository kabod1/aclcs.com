"use client";

import Hero from "@/components/sections/Hero";
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
