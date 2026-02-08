"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FeaturesStepsLayout() {
  const steps = [
    {
      label: "Discovery",
      description:
        "Map product goals, constraints, and the current interface in detail.",
    },
    {
      label: "Systems",
      description:
        "Shape tokens, components, and patterns that support product work.",
    },
    {
      label: "Implementation support",
      description:
        "Stay close during build to adapt patterns and refine the details.",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-5xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-6 py-7 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
              Workflow
            </p>
            <p className="mt-1 text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
              A simple, repeatable way to ship product design together.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-xs sm:text-sm font-medium text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors w-full sm:w-auto"
          >
            See project example
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.label}
              className="flex flex-col rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black p-4"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900">
                {index + 1}
              </span>
              <p className="mt-3 text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                {step.label}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </motion.main>
  );
}
