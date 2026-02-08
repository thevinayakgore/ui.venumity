"use client";
import { motion } from "framer-motion";

export default function PricingWithNotesColumn() {
  const points = [
    "Pricing adjusts with scope and complexity.",
    "Most projects start with a small discovery phase.",
    "A clear written proposal is shared before any commitment.",
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-5xl w-full h-full"
    >
      <section className="w-full grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-6 py-7 sm:px-8 sm:py-8">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
            Pricing
          </p>
          <p className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
            Most work falls between $18k and $60k.
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Pricing is shaped by product complexity, timelines, and whether you are looking for a focused project or an ongoing collaboration.
          </p>
        </div>
        <div className="space-y-2 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-4 py-4 sm:px-5 sm:py-5">
          {points.map((point) => (
            <p
              key={point}
              className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400"
            >
              • {point}
            </p>
          ))}
        </div>
      </section>
    </motion.main>
  );
}
