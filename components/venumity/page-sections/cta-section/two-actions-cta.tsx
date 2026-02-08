"use client";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export default function CtaDualActions() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-5xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 dark:bg-black px-6 py-7 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
              Call to action
            </p>
            <p className="text-xl sm:text-2xl font-semibold text-neutral-50">
              Choose the shortest path to see if collaborating makes sense.
            </p>
            <p className="text-sm text-neutral-400 max-w-xl">
              Watch a short walkthrough of recent work, or schedule a call to talk through your product directly.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:items-end w-full sm:w-auto">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-50 px-4 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-200 transition-colors w-full sm:w-auto"
            >
              <ArrowRight className="h-4 w-4" />
              Share project details
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-4 py-2.5 text-sm font-medium text-neutral-50 hover:bg-neutral-800 transition-colors w-full sm:w-auto"
            >
              <Play className="h-4 w-4" />
              Watch 3‑minute overview
            </button>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
