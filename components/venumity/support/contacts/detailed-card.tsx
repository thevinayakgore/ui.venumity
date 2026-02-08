"use client";
import { motion } from "motion/react";
import { Clock3, Globe2, Mail } from "lucide-react";

export default function ContactInfoDetailedCard() {
  const email = "studio@example.com";
  const hours = "Mon–Fri, 9:00–17:00 CET";
  const regions = "Europe + North America overlap";

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <section className="w-full max-w-xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-6 py-7 sm:px-8 sm:py-8 shadow-sm">
        <div className="space-y-4">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-xs sm:text-sm font-medium text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900"
          >
            <Mail className="h-4 w-4" />
            {email}
          </button>
          <div className="grid gap-3 sm:grid-cols-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            <div className="flex items-start gap-2">
              <Clock3 className="mt-0.5 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
              <div>
                <p className="font-medium text-neutral-800 dark:text-neutral-200">
                  Hours
                </p>
                <p>{hours}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Globe2 className="mt-0.5 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
              <div>
                <p className="font-medium text-neutral-800 dark:text-neutral-200">
                  Regions
                </p>
                <p>{regions}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
