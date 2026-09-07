"use client";
import Hero from "@/components/site/sections/hero";
import Features from "@/components/site/sections/features";
import YouTubeSection from "@/components/site/sections/youtube-section";
import CTA from "@/components/site/sections/cta";
import FAQ from "./faq/page";
import LearningMaterials from "@/components/site/sections/learning-materials";

export default function page() {
  return (
    <main className="w-full">
      <Hero />
      <Features />
      <YouTubeSection />
      <LearningMaterials />
      <CTA />
      <FAQ />
    </main>
  );
}
