"use client";
import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";

type ComparisonRow = {
  label: string;
  studio: boolean;
  generic: boolean;
};

export default function FeaturesComparisonColumns() {
  const rows: ComparisonRow[] = [
    {
      label: "Async-first communication",
      studio: true,
      generic: false,
    },
    {
      label: "Design systems aligned to codebase",
      studio: true,
      generic: false,
    },
    {
      label: "One-off screens only",
      studio: false,
      generic: true,
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-5xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm px-6 py-7 sm:px-8 sm:py-8">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
              Approach
            </p>
            <p className="mt-1 text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
              What this studio focuses on vs. generic design services.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
            <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] bg-neutral-50 dark:bg-neutral-950 px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-300">
              <div>Focus</div>
              <div className="text-center">Studio</div>
              <div className="text-center">Generic</div>
            </div>
            <div className="divide-y divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-black">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] px-4 py-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300"
                >
                  <div>{row.label}</div>
                  <div className="flex items-center justify-center">
                    {row.studio ? (
                      <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Minus className="h-4 w-4 text-neutral-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-center">
                    {row.generic ? (
                      <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Minus className="h-4 w-4 text-neutral-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
