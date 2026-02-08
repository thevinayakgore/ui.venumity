"use client";
import { motion } from "framer-motion";

export default function PricingToggleHintStatic() {
  const monthly = "from $8k / month";
  const project = "from $18k / project";

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-4xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 dark:bg-black px-6 py-7 sm:px-8 sm:py-8">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
            Options
          </p>
          <p className="text-sm sm:text-base text-neutral-200">
            Monthly:
            <span className="ml-2 font-semibold text-neutral-50">
              {monthly}
            </span>
          </p>
          <p className="text-sm sm:text-base text-neutral-200">
            Project:
            <span className="ml-2 font-semibold text-neutral-50">
              {project}
            </span>
          </p>
          <p className="text-xs sm:text-sm text-neutral-400">
            Share a bit about your product and preferred way of working to receive a tailored estimate.
          </p>
        </div>
      </section>
    </motion.main>
  );
}
