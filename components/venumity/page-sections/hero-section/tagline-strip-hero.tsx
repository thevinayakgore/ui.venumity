"use client";
import { motion } from "framer-motion";

export default function HeroTaglineStrip() {
  const tags = [
    "Design systems",
    "Product UX",
    "Interface motion",
    "Design ops",
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-6xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm px-6 py-8 sm:px-8 sm:py-10">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-900 dark:text-neutral-50 max-w-3xl">
            Quiet, systematic product design support for teams in motion.
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
            No big reveals, just steady progress, clear communication, and product surfaces that get sharper every week.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 px-3 py-1 text-xs text-neutral-700 dark:text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  );
}
