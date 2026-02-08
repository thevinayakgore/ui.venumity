"use client";
import { motion } from "framer-motion";
import { SendHorizontal } from "lucide-react";

export default function FooterWithNewsletter() {
  const nav = ["Overview", "Case studies", "Services", "Contact"];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-4 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-6xl w-full h-full"
    >
      <footer className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-6 py-7 sm:px-8 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
              Studio notes
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md">
              A few times a year, receive concise breakdowns of shipped work, design systems, and patterns that help products feel smoother.
            </p>
            <form className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-1.5">
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="flex-1 bg-transparent px-1 py-1 text-sm text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none"
                  />
                </div>
                <p className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                  No weekly digests. Only when there is something substantial.
                </p>
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-4 py-2.5 text-sm font-medium text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors w-full sm:w-auto"
              >
                <SendHorizontal className="h-4 w-4" />
                Join list
              </button>
            </form>
          </div>
          <div className="flex flex-col justify-between gap-4">
            <nav className="flex flex-wrap gap-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              {nav.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="hover:text-neutral-900 dark:hover:text-neutral-100"
                >
                  {item}
                </button>
              ))}
            </nav>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
              <p>© {new Date().getFullYear()} Studio. All rights reserved.</p>
              <div className="flex gap-3">
                <button type="button">Privacy</button>
                <button type="button">Cookies</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </motion.main>
  );
}
