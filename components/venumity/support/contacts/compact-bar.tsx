"use client";
import { motion } from "motion/react";
import { Mail } from "lucide-react";

export default function ContactInfoCompactBar() {
  const email = "support@example.com";

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            Need help with a current engagement or have a pre-project question?
          </p>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-xs sm:text-sm font-medium text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900"
          >
            <Mail className="h-4 w-4" />
            {email}
          </button>
        </div>
      </section>
    </motion.main>
  );
}
