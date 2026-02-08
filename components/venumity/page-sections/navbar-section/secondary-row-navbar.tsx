"use client";
import { motion } from "framer-motion";

export default function NavbarSecondaryRow() {
  const primary = ["Work", "Services", "About"];
  const secondary = ["Notes", "FAQ", "Contact"];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-4 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-6xl w-full h-full"
    >
      <header className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-4 py-3 sm:px-6 sm:py-3.5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
            Studio
          </span>
          <nav className="hidden sm:flex items-center gap-4 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            {primary.map((item) => (
              <button
                key={item}
                type="button"
                className="hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-neutral-600 dark:text-neutral-400">
          {secondary.map((item) => (
            <button
              key={item}
              type="button"
              className="hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              {item}
            </button>
          ))}
        </div>
      </header>
    </motion.main>
  );
}
