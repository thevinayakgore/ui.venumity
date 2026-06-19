"use client";
import { motion } from "motion/react";
import Hero from "@/components/site/sections/hero";
import Features from "@/components/site/sections/features";
import YouTubeSection from "@/components/site/sections/youtube-section";
import CTA from "@/components/site/sections/cta";
import FAQ from "./faq/page";
import LearningMaterials from "@/components/site/sections/learning-materials";

export default function page() {
  return (
    <>
      <main className="relative w-full">
        <div className="relative z-20 transform-gpu w-full">
          <Hero />
          <Features />
          <YouTubeSection />
          <LearningMaterials />
          <CTA />
          <FAQ />
        </div>

        {/* Background Gradient Animation */}
        <motion.div
          className="absolute inset-x-0 top-0 z-0 left-0 opacity-40 rounded-3xl blur-[10rem] h-100 max-w-400 m-auto w-full"
          animate={{
            background: [
              "radial-gradient(circle at top left, #3b82f6, #a855f7, #ec4899)",
              "radial-gradient(circle at top right, #6366f1, #8b5cf6, #d946ef)",
              "radial-gradient(circle at bottom right, #14b8a6, #0ea5e9, #3b82f6)",
              "radial-gradient(circle at bottom left, #f59e0b, #f97316, #ef4444)",
              "radial-gradient(circle at top left, #22c55e, #84cc16, #f59e0b)",
              "radial-gradient(circle at top right, #06b6d4, #3b82f6, #8b5cf6)",
              "radial-gradient(circle at bottom right, #ec4899, #f43f5e, #f97316)",
              "radial-gradient(circle at bottom left, #8b5cf6, #6366f1, #3b82f6)",
              "radial-gradient(circle at top right, #f43f5e, #ef4444, #f59e0b)",
              "radial-gradient(circle at bottom left, #0ea5e9, #06b6d4, #22c55e)",
            ],
          }}
          transition={{
            duration: 50,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </main>
    </>
  );
}
