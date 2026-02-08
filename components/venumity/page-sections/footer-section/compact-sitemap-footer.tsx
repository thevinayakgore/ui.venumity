"use client";
import { motion } from "framer-motion";

export default function FooterCompactSitemap() {
  const sections = {
    Product: ["Overview", "Features", "Pricing"],
    Company: ["About", "Team", "Contact"],
    Resources: ["Notes", "Guides", "FAQ"],
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-4 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-6xl w-full h-full"
    >
      <footer className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-6 py-7 sm:px-8 sm:py-8">
        <div className="grid gap-6 sm:grid-cols-3 text-xs sm:text-sm">
          {Object.entries(sections).map(([title, items]) => (
            <div key={title} className="space-y-2">
              <p className="font-medium text-neutral-800 dark:text-neutral-200">
                {title}
              </p>
              <ul className="space-y-1.5 text-neutral-600 dark:text-neutral-400">
                {items.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className="hover:text-neutral-900 dark:hover:text-neutral-100"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </motion.main>
  );
}
