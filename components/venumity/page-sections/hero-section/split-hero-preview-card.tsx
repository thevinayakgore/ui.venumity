"use client";
import { motion } from "framer-motion";
import { ArrowRight, LayoutTemplate } from "lucide-react";

export default function HeroSplitPreview() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-6xl w-full h-full"
    >
      <section className="w-full grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm px-6 py-8 sm:px-8 sm:py-10">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
            Product design studio
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-900 dark:text-neutral-50">
            Design systems and product UX for teams that move quickly.
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
            Work together to shape the product surface, tidy up interaction patterns, and make sure every new feature feels like it already belongs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-4 py-2.5 text-sm font-medium text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors w-full sm:w-auto"
            >
              Start a project
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 px-4 py-2.5 text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors w-full sm:w-auto"
            >
              Download capabilities
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-sm">
            <div className="aspect-4/3 w-full rounded-3xl bg-linear-to-br from-neutral-900 via-neutral-700 to-neutral-500 dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-500 shadow-xl" />
            <div className="absolute inset-x-4 -bottom-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900">
                  <LayoutTemplate className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                    Latest project shipped
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    New onboarding for B2B analytics product.
                  </p>
                </div>
              </div>
              <span className="text-[11px] rounded-full bg-neutral-900/5 dark:bg-neutral-50/5 px-2 py-1 text-neutral-600 dark:text-neutral-300">
                Case study soon
              </span>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
