"use client";
import FAQ from "./faq/page";
import CTA from "@/components/site/sections/cta";
import Hero from "@/components/site/sections/hero";
import Blocks from "@/components/site/sections/blocks";
import YouTube from "@/components/site/sections/youtube";
import Articles from "@/components/site/sections/articles";
import Primitives from "@/components/site/sections/primitives";

export default function page() {
  return (
    <div className="w-full">
      <Hero />
      <Primitives />
      <Blocks />
      <YouTube />
      <Articles />
      <CTA />
      <FAQ />
    </div>
  );
}
