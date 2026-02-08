"use client";
import { motion } from "framer-motion";

export default function FooterCenteredMinimal() {
  const nav = ["Work", "About", "Notes", "Contact"];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-4 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-4xl w-full h-full"
    >
      <footer className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
            Studio
          </p>
          <nav className="flex flex-wrap justify-center gap-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
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
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
            Crafted in Berlin, collaborating with teams worldwide.
          </p>
        </div>
      </footer>
    </motion.main>
  );
}
