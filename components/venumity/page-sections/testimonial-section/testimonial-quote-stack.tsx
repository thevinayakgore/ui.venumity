"use client";
import { motion } from "framer-motion";

export default function TestimonialsStackedQuotes() {
  const items = [
    "Thoughtful systems work that sped up our roadmap.",
    "Clear communication and detailed documentation.",
    "Interfaces that feel calm, not busy.",
  ];

  const author = {
    name: "Riley Scott",
    role: "VP Product, Linearwave",
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-4xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-6 py-7 sm:px-8 sm:py-8">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
            Feedback
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
            {items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-50">
              {author.name}
            </p>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              {author.role}
            </p>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
