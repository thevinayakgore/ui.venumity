"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CtaPrimaryBanner() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-5xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-linear-to-r from-neutral-900 via-neutral-900 to-neutral-800 dark:from-neutral-100 dark:via-neutral-100 dark:to-neutral-200 px-6 py-7 sm:px-8 sm:py-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500">
              Next step
            </p>
            <p className="text-xl sm:text-2xl font-semibold text-neutral-50 dark:text-neutral-900">
              Ready to move your product from “works” to “feels great to use”?
            </p>
            <p className="text-sm text-neutral-300 dark:text-neutral-700 max-w-xl">
              Share a short overview of your product and what you want to improve, and you will receive a structured proposal, not a sales deck.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-50 px-4 py-2.5 text-sm font-medium text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              Start a project
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-[11px] text-neutral-400 dark:text-neutral-600">
              No mailing list, no automated follow-ups.
            </p>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
