"use client";
import { motion } from "framer-motion";

type Stat = {
  label: string;
  value: string;
};

export default function HeroWithStatsRow() {
  const stats: Stat[] = [
    { label: "Products shipped", value: "35+" },
    { label: "Average engagement", value: "8 weeks" },
    { label: "Referrals", value: "70%" },
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
            Design that respects constraints but does not compromise on the details.
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
            Combining UX structure, visual design, and motion to help your product feel coherent, predictable, and quietly distinct.
          </p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-4 py-3 sm:px-5 sm:py-4"
            >
              <span className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                {stat.value}
              </span>
              <span className="mt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </motion.main>
  );
}
