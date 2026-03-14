"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { FAQDATA } from "@/registry/site/faq";

export default function FAQ() {
  const pathname = usePathname();
  const isFaqPage = pathname === "/faq";

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      className={`relative pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-4 md:px-8 lg:px-10 ${isFaqPage && "pt-12 sm:pt-16 md:pt-20 lg:pt-24 2xl:border-x-2 border-dashed m-auto max-w-360 overflow-x-hidden w-full"}`}
    >
      <h1
        className={`absolute ${isFaqPage ? "top-15 lg:top-10" : "top-10 md:-top-5 xl:-top-15"} left-1/2 -translate-x-1/2 text-center text-7xl md:text-[12rem] lg:text-[14rem] xl:text-[20rem] uppercase tracking-wide whitespace-nowrap font-extrabold text-transparent bg-clip-text bg-linear-to-b from-foreground/15 via-foreground/5 leading-none`}
      >
        Queries
      </h1>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4 pt-24 sm:pt-32 md:pt-36 lg:pt-40 w-full h-full">
        {FAQDATA.map((item, idx) => (
          <div
            key={idx}
            className="relative group block p-2 sm:p-3 w-full break-inside-avoid"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 -z-10 backdrop-blur-xl block rounded-lg sm:rounded-xl w-full"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    background: [
                      "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      "linear-gradient(135deg, #8b5cf6, #ec4899)",
                      "linear-gradient(135deg, #ec4899, #f43f5e)",
                      "linear-gradient(135deg, #f43f5e, #f97316)",
                      "linear-gradient(135deg, #f97316, #eab308)",
                      "linear-gradient(135deg, #eab308, #22c55e)",
                      "linear-gradient(135deg, #22c55e, #06b6d4)",
                      "linear-gradient(135deg, #06b6d4, #0ea5e9)",
                      "linear-gradient(135deg, #0ea5e9, #3b82f6)",
                      "linear-gradient(135deg, #3b82f6, #6366f1)",
                      "linear-gradient(135deg, #6366f1, #22c55e)",
                      "linear-gradient(135deg, #22c55e, #ec4899)",
                    ],
                    transition: {
                      opacity: { duration: 0.15 },
                      background: {
                        duration: 6,
                        ease: "linear",
                        repeat: Infinity,
                      },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <div className="bg-background rounded-lg w-full">
              <div className="relative p-2 sm:p-3 z-20 overflow-hidden border-2 border-transparent dark:border-foreground/5 hover:border-white dark:hover:border-transparent bg-zinc-500/5 backdrop-blur-sm rounded-lg transition-all duration-300 w-full">
                <div className="relative z-50 bg-background border group-hover:shadow-lg/10 transition-all duration-700 rounded-lg w-full">
                  <div className="p-4 sm:p-5 md:p-6 lg:p-7 w-full h-fit">
                    <h1 className="text-sm md:text-base xl:text-lg text-foreground">
                      {item.question}
                    </h1>
                    <p className="mt-2 font-light text-foreground/80 tracking-wide leading-relaxed text-xs xl:text-sm">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 z-10 transform-gpu bg-primary/40 blur-[3rem] sm:blur-3xl md:blur-[5rem] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-[2s] w-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
