"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroCenteredPrimary() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-6xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 dark:bg-black px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center gap-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1 text-[11px] text-neutral-300">
            <Sparkles className="h-3.5 w-3.5 text-neutral-100" />
            <span>Design systems, product UX, motion.</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-50">
            Product design that feels calm, fast, and quietly opinionated.
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
            Partner with a small studio focused on shipping interfaces that feel familiar, reduce cognitive load, and keep your roadmap moving.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-50 px-4 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-200 transition-colors w-full sm:w-auto"
            >
              Share a project
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-4 py-2.5 text-sm font-medium text-neutral-50 hover:bg-neutral-800 transition-colors w-full sm:w-auto"
            >
              View selected work
            </button>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
