"use client";
import { motion } from "framer-motion";
import { LayoutTemplate, Palette, Cpu, Figma } from "lucide-react";

type Skill = {
  label: string;
  level: "Core" | "Advanced" | "Support";
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function AboutSkillsGrid() {
  const skills: Skill[] = [
    { label: "Product UX", level: "Core", icon: LayoutTemplate },
    { label: "Design Systems", level: "Core", icon: Palette },
    { label: "Interface Motion", level: "Advanced", icon: Cpu },
    { label: "Figma Libraries", level: "Advanced", icon: Figma },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
              What comes with the collaboration
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-900 dark:text-neutral-50">
              A combination of UX structure, visual craft, and motion that feels natural.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              Projects are shaped around outcomes, with small, focused cycles that ship frequently and keep the surface evolving without heavy redesigns.
            </p>
            <div className="mt-3 inline-flex flex-wrap gap-2 text-xs text-neutral-600 dark:text-neutral-400">
              <span className="rounded-full bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900 px-3 py-1">
                Product journeys
              </span>
              <span className="rounded-full bg-neutral-100 dark:bg-neutral-900 px-3 py-1">
                Component systems
              </span>
              <span className="rounded-full bg-neutral-100 dark:bg-neutral-900 px-3 py-1">
                Interaction patterns
              </span>
            </div>
          </div>

          <div className="grid w-full max-w-md grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map(({ label, level, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col justify-between rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <span className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                      {label}
                    </span>
                  </div>
                  <span className="text-[11px] rounded-full bg-neutral-900/5 dark:bg-neutral-50/5 px-2 py-1 text-neutral-600 dark:text-neutral-300">
                    {level}
                  </span>
                </div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-neutral-900 dark:bg-neutral-100"
                    style={{
                      width:
                        level === "Core"
                          ? "90%"
                          : level === "Advanced"
                          ? "75%"
                          : "55%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  );
}
