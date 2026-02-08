"use client";
import { motion } from "framer-motion";
import { BadgeCheck, Users, Globe2 } from "lucide-react";

export default function AboutSplitLayout() {
  const highlights = [
    "Product-first mindset with emphasis on measurable outcomes.",
    "Design systems that align UI, engineering, and brand.",
    "Remote-friendly and async by default across time zones.",
  ];

  const badges = [
    { icon: Users, label: "Collaborative" },
    { icon: BadgeCheck, label: "Detail Oriented" },
    { icon: Globe2, label: "Global Reach" },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <section className="grid w-full gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-5 sm:gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
            About Studio
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-900 dark:text-neutral-50">
            A small, independent team crafting products that feel effortless.
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
            From early discovery to production-ready design systems, the focus stays on clarity, speed, and interfaces that feel familiar but refined.
          </p>

          <ul className="space-y-2">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-400"
              >
                <span className="mt-1 h-5 w-5 rounded-full bg-neutral-900/5 dark:bg-neutral-100/5 flex items-center justify-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-2 flex flex-wrap gap-2">
            {badges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 px-3 py-1 text-xs text-neutral-700 dark:text-neutral-300"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-sm">
            <div className="aspect-4/5 w-full rounded-3xl  bg-linear-to-br from-neutral-900 via-neutral-800 to-neutral-700 dark:from-neutral-50 dark:via-neutral-200 dark:to-neutral-400 shadow-xl" />
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  Studio snapshot
                </p>
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                  Based in Berlin, working worldwide.
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  Timezone
                </span>
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                  CET / Remote
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
