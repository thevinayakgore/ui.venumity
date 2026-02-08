"use client";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function HeroVideoInline() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-6xl w-full h-full"
    >
      <section className="w-full grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 dark:bg-black px-6 py-8 sm:px-8 sm:py-10">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
            Overview
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-50">
            A focused product design partner for teams that care about the small things.
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl">
            See how the work comes together in practice through a short walkthrough of recent product interfaces and systems.
          </p>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-50 px-4 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-200 transition-colors"
          >
            <Play className="h-4 w-4" />
            Watch 4‑minute reel
          </button>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-sm">
            <div className="aspect-video w-full rounded-2xl bg-neutral-900 flex items-center justify-center">
              <button
                type="button"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-50 text-neutral-900 hover:bg-neutral-200 transition-colors"
              >
                <Play className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
