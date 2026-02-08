"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function NavbarUnderlineActive() {
  const items = ["Overview", "Work", "About", "Contact"];
  const [active, setActive] = useState("Overview");

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-4 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-5xl w-full h-full"
    >
      <header className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-4 py-3 sm:px-6 sm:py-3.5">
        <nav className="flex items-center justify-between gap-4">
          <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
            Studio
          </span>
          <div className="flex flex-1 justify-end gap-4 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            {items.map((item) => {
              const isActive = item === active;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setActive(item)}
                  className="relative pb-1 hover:text-neutral-900 dark:hover:text-neutral-100"
                >
                  {item}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </header>
    </motion.main>
  );
}
