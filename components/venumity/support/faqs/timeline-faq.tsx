"use client";
import { motion } from "framer-motion";

type Step = {
  label: string;
  detail: string;
};

export default function SupportFaqTimeline() {
  const steps: Step[] = [
    {
      label: "Before project",
      detail:
        "Ask clarifying questions, share documents, and confirm that scope and expectations match.",
    },
    {
      label: "During project",
      detail:
        "Use Slack and comments for ongoing questions, plus weekly async recaps for decisions.",
    },
    {
      label: "After launch",
      detail:
        "Review metrics, refine interfaces, and fold learnings into your design system.",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full bg-white dark:bg-black"
    >
      <section className="w-full max-w-3xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-6 py-7 sm:px-8 sm:py-8">
        <div className="mb-4 flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
            Support flow
          </p>
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
            How support typically works before, during, and after a project.
          </p>
        </div>
        <div className="relative pl-4 sm:pl-5">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute left-1 sm:left-1.5 top-0 w-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800"
          />
          <div className="space-y-5">
            {steps.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + index * 0.1, duration: 0.25 }}
                className="relative flex gap-3"
              >
                <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-semibold text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900">
                  {index + 1}
                </span>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                    {step.label}
                  </p>
                  <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400">
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  );
}
