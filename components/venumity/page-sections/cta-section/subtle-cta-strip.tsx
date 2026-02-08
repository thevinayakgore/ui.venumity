"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function CtaSubtleStrip() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-4 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-5xl w-full h-full"
    >
      <section className="w-full rounded-xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-4 py-4 sm:px-5 sm:py-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            Want to see how these patterns work inside your product?
          </p>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-neutral-900 px-3.5 py-1.5 text-xs font-medium text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors w-full sm:w-auto"
          >
            Walk through a prototype
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>
    </motion.main>
  );
}
