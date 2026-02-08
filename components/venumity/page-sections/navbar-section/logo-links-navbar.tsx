"use client";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function NavbarBasicResponsive() {
  const [open, setOpen] = useState(false);

  const links = ["Work", "Services", "About", "Notes"];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-4 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-6xl w-full h-full"
    >
      <header className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-4 py-3 sm:px-6 sm:py-3.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 text-xs font-semibold">
              S
            </div>
            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
              Studio
            </span>
          </div>

          <nav className="hidden sm:flex items-center gap-4 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            {links.map((item) => (
              <button
                key={item}
                type="button"
                className="hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-neutral-900 px-3.5 py-1.5 text-xs font-medium text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              Contact
            </button>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 sm:hidden"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-3 flex flex-col gap-2 border-t border-neutral-200 dark:border-neutral-800 pt-3 text-xs text-neutral-600 dark:text-neutral-400 sm:hidden">
            {links.map((item) => (
              <button
                key={item}
                type="button"
                className="text-left hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                {item}
              </button>
            ))}
            <button
              type="button"
              className="mt-1 inline-flex items-center justify-center rounded-full bg-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900"
            >
              Contact
            </button>
          </div>
        )}
      </header>
    </motion.main>
  );
}
