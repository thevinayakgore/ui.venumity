"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function NavbarWithCtaBadge() {
  const links = ["Work", "Systems", "Notes"];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-4 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-6xl w-full h-full"
    >
      <header className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 dark:bg-black px-4 py-3 sm:px-6 sm:py-3.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-neutral-50">
              Studio
            </span>
            <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-[11px] text-neutral-400">
              Product design
            </span>
          </div>
          <nav className="hidden sm:flex items-center gap-4 text-xs sm:text-sm text-neutral-400">
            {links.map((item) => (
              <button
                key={item}
                type="button"
                className="hover:text-neutral-100"
              >
                {item}
              </button>
            ))}
          </nav>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-neutral-50 px-3.5 py-1.5 text-xs font-medium text-neutral-900 hover:bg-neutral-200 transition-colors"
          >
            Start a project
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>
    </motion.main>
  );
}
