"use client";
import { motion } from "framer-motion";
import { SignalHigh, MailOpen } from "lucide-react";

export default function ContactStatusInline() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-3xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm px-6 py-7 sm:px-7 sm:py-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                Currently accepting 2 new projects.
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <SignalHigh className="h-4 w-4" />
              <span>Avg. response time: under 48 hours.</span>
            </div>
          </div>

          <form className="grid gap-4 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                  Work email
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-50 outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-200"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                  Short intro
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your product, team size, and what you want to improve."
                  className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-50 outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-200 resize-none"
                />
              </div>
            </div>
            <div className="flex flex-col justify-between gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                  Ideal collaboration start
                </label>
                <select
                  className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-50 outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-200"
                  defaultValue="within-4"
                >
                  <option value="within-2">Within 2 weeks</option>
                  <option value="within-4">Within 4 weeks</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
              >
                <MailOpen className="h-4 w-4" />
                Share details
              </button>
            </div>
          </form>
        </div>
      </section>
    </motion.main>
  );
}
