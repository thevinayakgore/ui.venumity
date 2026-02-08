"use client";
import { motion } from "framer-motion";
import { Github, Twitter, Dribbble } from "lucide-react";

export default function FooterSimpleColumns() {
  const links = {
    product: ["Overview", "Work", "Process", "Pricing"],
    studio: ["About", "Journal", "Contact"],
  };

  const socials = [
    { icon: Github, label: "GitHub" },
    { icon: Twitter, label: "Twitter" },
    { icon: Dribbble, label: "Dribbble" },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-4 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-6xl w-full h-full"
    >
      <footer className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-6 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
              Studio
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xs">
              A small, independent product design studio focused on UX, systems, and motion for digital products.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="space-y-2">
              <p className="font-medium text-neutral-800 dark:text-neutral-200">
                Product
              </p>
              <ul className="space-y-1.5 text-neutral-600 dark:text-neutral-400">
                {links.product.map((item) => (
                  <li key={item}>
                    <button type="button" className="hover:text-neutral-900 dark:hover:text-neutral-100">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-neutral-800 dark:text-neutral-200">
                Studio
              </p>
              <ul className="space-y-1.5 text-neutral-600 dark:text-neutral-400">
                {links.studio.map((item) => (
                  <li key={item}>
                    <button type="button" className="hover:text-neutral-900 dark:hover:text-neutral-100">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Follow
            </p>
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-2 border-t border-neutral-200 dark:border-neutral-800 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
            © {new Date().getFullYear()} Studio. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-3 text-[11px] text-neutral-500 dark:text-neutral-400">
            <button type="button" className="hover:text-neutral-800 dark:hover:text-neutral-200">
              Terms
            </button>
            <button type="button" className="hover:text-neutral-800 dark:hover:text-neutral-200">
              Privacy
            </button>
            <button type="button" className="hover:text-neutral-800 dark:hover:text-neutral-200">
              Imprint
            </button>
          </div>
        </div>
      </footer>
    </motion.main>
  );
}
