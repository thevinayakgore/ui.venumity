"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function NavbarPillNavigation() {
  const tabs = ["Overview", "Systems", "Work", "About"];
  const [active, setActive] = useState("Overview");

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-4 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-4xl w-full h-full"
    >
      <header className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-4 py-3 sm:px-5 sm:py-3.5">
        <nav className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
            Studio
          </span>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const isActive = tab === active;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActive(tab)}
                  className={`rounded-full px-3 py-1 text-xs sm:text-sm ${
                    isActive
                      ? "bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900"
                      : "bg-neutral-50 text-neutral-700 dark:bg-neutral-950 dark:text-neutral-300"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </nav>
      </header>
    </motion.main>
  );
}
