"use client";
import { motion } from "framer-motion";
import { Info, ArrowRight } from "lucide-react";

export default function AboutMinimalOverview() {
  const stats = [
    { label: "Years Experience", value: "8+" },
    { label: "Projects Delivered", value: "120+" },
    { label: "Happy Clients", value: "90+" },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-900">
              <Info className="h-6 w-6 text-neutral-900 dark:text-neutral-100" />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                About
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-900 dark:text-neutral-50">
                Building thoughtful digital experiences for modern brands.
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
                Combining product thinking, clean interfaces, and smooth micro-interactions to help teams ship experiences that feel polished from the first click.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-5 w-full lg:w-auto">
            {stats.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-start justify-between rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-3 sm:px-4 sm:py-4"
              >
                <span className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                  {item.value}
                </span>
                <span className="mt-1 text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md">
            Currently partnering with SaaS, fintech, and product-led teams to design systems that scale without sacrificing craft.
          </p>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 px-4 py-2 text-xs sm:text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
          >
            View recent work
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </motion.main>
  );
}
