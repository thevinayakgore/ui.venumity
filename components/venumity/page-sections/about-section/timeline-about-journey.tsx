"use client";
import { motion } from "framer-motion";
import { Rocket, Target, Sparkles } from "lucide-react";

type Milestone = {
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function AboutTimeline() {
  const milestones: Milestone[] = [
    {
      year: "2017",
      title: "First shipped product",
      description:
        "Launched a small internal tool that evolved into a full SaaS product.",
      icon: Rocket,
    },
    {
      year: "2020",
      title: "Design system focus",
      description:
        "Started helping teams consolidate fragmented UI into unified systems.",
      icon: Target,
    },
    {
      year: "2024",
      title: "Independent studio",
      description:
        "Partnering with product teams as a flexible, embedded design resource.",
      icon: Sparkles,
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
            Journey
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-900 dark:text-neutral-50">
            A decade of building, refining, and simplifying interfaces.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            The work has evolved from quick experiments to long-term
            partnerships, but the core goal remains the same: ship digital
            experiences that feel considered.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="relative">
            <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800" />
            <div className="space-y-6 sm:space-y-8">
              {milestones.map((item, index) => (
                <div key={item.year} className="relative flex gap-4 sm:gap-5">
                  <div className="mt-1 sm:mt-1.5 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 z-10">
                    <item.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <div className="flex-1 rounded-xl bg-neutral-50 dark:bg-neutral-950 px-4 py-3 sm:px-5 sm:py-4 border border-neutral-100 dark:border-neutral-800">
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {item.year}
                    </p>
                    <h3 className="mt-1 text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-50">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                      {item.description}
                    </p>
                    {index === milestones.length - 1 && (
                      <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                        Today, the studio partners with teams from early-stage
                        startups to established companies.
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4">
            <div className="rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-4 py-4 sm:px-5 sm:py-5">
              <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                Focus today
              </p>
              <p className="mt-1 text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
                Helping product teams move faster with solid UX foundations,
                motion principles, and UI systems that can be reused across
                surfaces.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-4 py-4 sm:px-5 sm:py-5">
              <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                Typical engagement
              </p>
              <ul className="mt-2 space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                <li>Discovery, product mapping, and initial UX flows.</li>
                <li>
                  Component libraries and design tokens aligned with
                  engineering.
                </li>
                <li>
                  Guided handoff with async documentation and Loom walkthroughs.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
