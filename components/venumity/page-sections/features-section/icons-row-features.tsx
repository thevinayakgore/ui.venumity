"use client";
import { motion } from "framer-motion";
import { ArrowRight, Layers3, Ruler, Workflow } from "lucide-react";

export default function FeaturesRowEmphasis() {
  const items = [
    {
      icon: Layers3,
      label: "System-first",
    },
    {
      icon: Ruler,
      label: "Precise",
    },
    {
      icon: Workflow,
      label: "Tightly integrated",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-5xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 dark:bg-black px-6 py-7 sm:px-8 sm:py-8">
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
                Features
              </p>
              <p className="mt-1 text-xl sm:text-2xl font-semibold text-neutral-50">
                Everything is built to slot into your existing stack.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-4 py-2 text-xs sm:text-sm font-medium text-neutral-50 hover:bg-neutral-800 transition-colors w-full sm:w-auto"
            >
              Explore the toolkit
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {items.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-3.5 py-1.5 text-xs text-neutral-200"
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  );
}
