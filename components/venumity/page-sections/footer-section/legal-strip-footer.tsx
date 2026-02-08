"use client";
import { motion } from "framer-motion";

export default function FooterLegalStrip() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-4 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-5xl w-full h-full"
    >
      <footer className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-4 py-4 sm:px-6 sm:py-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} Studio. All rights reserved.</p>
          <div className="flex flex-wrap gap-3">
            <button type="button" className="hover:text-neutral-800 dark:hover:text-neutral-200">
              Terms
            </button>
            <button type="button" className="hover:text-neutral-800 dark:hover:text-neutral-200">
              Privacy
            </button>
            <button type="button" className="hover:text-neutral-800 dark:hover:text-neutral-200">
              Cookies
            </button>
          </div>
        </div>
      </footer>
    </motion.main>
  );
}
