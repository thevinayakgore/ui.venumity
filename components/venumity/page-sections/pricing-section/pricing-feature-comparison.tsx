"use client";
import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";

type Row = {
  feature: string;
  project: boolean;
  partner: boolean;
};

export default function PricingFeatureComparison() {
  const rows: Row[] = [
    {
      feature: "Product discovery workshop",
      project: true,
      partner: true,
    },
    {
      feature: "Design system maintenance",
      project: false,
      partner: true,
    },
    {
      feature: "Async reviews during implementation",
      project: true,
      partner: true,
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-5xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-6 py-7 sm:px-8 sm:py-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
          Included
        </p>
        <div className="mt-4 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm">
          <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] bg-neutral-50 dark:bg-neutral-950 px-4 py-2 font-medium text-neutral-600 dark:text-neutral-300">
            <div>Scope</div>
            <div className="text-center">Project</div>
            <div className="text-center">Partner</div>
          </div>
          <div className="divide-y divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-black">
            {rows.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] px-4 py-3 text-neutral-700 dark:text-neutral-300"
              >
                <div>{row.feature}</div>
                <div className="flex items-center justify-center">
                  {row.project ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Minus className="h-4 w-4 text-neutral-400" />
                  )}
                </div>
                <div className="flex items-center justify-center">
                  {row.partner ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Minus className="h-4 w-4 text-neutral-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  );
}
