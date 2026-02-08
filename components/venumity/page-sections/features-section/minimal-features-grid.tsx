"use client";
import { motion } from "framer-motion";
import { LayoutGrid, Sparkles, Gauge } from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function FeaturesGridMinimal() {
  const features: Feature[] = [
    {
      title: "Clear product flows",
      description: "Map journeys across onboarding, core tasks, and edge cases so nothing feels accidental.",
      icon: LayoutGrid,
    },
    {
      title: "Reusable systems",
      description: "Design tokens, components, and patterns that grow alongside the product surface.",
      icon: Sparkles,
    },
    {
      title: "Performance-aware UI",
      description: "Interfaces designed around loading states, skeletons, and real-world latency.",
      icon: Gauge,
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-6xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm px-6 py-7 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
              Features
            </p>
            <p className="mt-2 text-xl sm:text-2xl lg:text-3xl font-semibold text-neutral-900 dark:text-neutral-50">
              The pieces that keep your product consistent as it expands.
            </p>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md">
            Every feature is designed with reuse in mind, so new screens feel familiar without feeling repetitive.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="flex flex-col rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4 sm:p-5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <p className="mt-3 text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                {title}
              </p>
              <p className="mt-1.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </motion.main>
  );
}
