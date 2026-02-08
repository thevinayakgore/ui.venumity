"use client";
import { motion } from "framer-motion";
import { SendHorizontal } from "lucide-react";

export default function CtaWithEmailCapture() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-4xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm px-6 py-7 sm:px-8 sm:py-8">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
              Stay in the loop
            </p>
            <p className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
              Receive occasional notes on product UX and design systems.
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl">
              A few times a year, receive concise breakdowns of shipped work, patterns, and techniques that make interfaces feel smoother.
            </p>
          </div>

          <form className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1">
              <div className="flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-1.5">
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="flex-1 bg-transparent px-1 py-1 text-sm text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none"
                />
              </div>
              <p className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                Only occasional updates, unsubscribe in a click.
              </p>
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-4 py-2.5 text-sm font-medium text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors w-full sm:w-auto"
            >
              <SendHorizontal className="h-4 w-4" />
              Get notes
            </button>
          </form>
        </div>
      </section>
    </motion.main>
  );
}
