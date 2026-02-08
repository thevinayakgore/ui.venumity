"use client";
import { motion } from "framer-motion";
import { HeartHandshake, Clock3, LineChart } from "lucide-react";

type Value = {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function AboutValuesColumns() {
  const values: Value[] = [
    {
      title: "Long-term thinking",
      description:
        "Design systems, tokens, and patterns that keep shipping smooth, even as teams and products grow.",
      icon: LineChart,
    },
    {
      title: "Respect for time",
      description:
        "Work async-first with clear timelines, Loom walkthroughs, and structured updates instead of noisy check-ins.",
      icon: Clock3,
    },
    {
      title: "Practical partnership",
      description:
        "Collaborate closely with founders and engineers to keep decisions grounded in constraints and trade-offs.",
      icon: HeartHandshake,
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
            Values
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-900 dark:text-neutral-50">
            Grounded in calm, deliberate work that is easy to build on.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            A small studio by design, keeping the work close and focused while staying flexible enough to adapt to different teams and product stages.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="flex flex-col rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-50">
                {title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </motion.main>
  );
}
