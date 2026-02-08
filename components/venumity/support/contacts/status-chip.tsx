"use client";
import { motion } from "motion/react";

export default function ContactInfoStatusChip() {
  const status = "Replies within 24–48 hours on weekdays.";

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <section className="w-full max-w-lg rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-6 py-5 sm:px-7 sm:py-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <p className="text-[11px] sm:text-xs text-neutral-700 dark:text-neutral-300">
            {status}
          </p>
        </div>
      </section>
    </motion.main>
  );
}
