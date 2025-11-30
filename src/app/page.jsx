export const dynamic = "force-static";
import React from "react";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import DevicesSection from "@/components/DevicesSection";
import FAQSection from "@/components/FAQSection";
import PlansSection from "@/components/PlansSection";
import TrialSection from "@/components/TrialSection";

/**
 * Home Page
 * Renders landing page with Hero, Categories, Devices, FAQ, Plans, and Trial sections
 * Uses force-static (SSG) because content doesn't change frequently
 */
export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <DevicesSection />
      <FAQSection />
      <PlansSection />
      <TrialSection />
    </>
  );
}
