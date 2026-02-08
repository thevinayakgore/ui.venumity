"use client";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function CtaWithProgress() {
  const steps = [
    "Send a short project summary.",
    "Receive a structured response.",
    "Agree on scope and start date.",
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-5xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm px-6 py-7 sm:px-8 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
              Get started
            </p>
            <p className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
              A short form, a clear plan, and a start date on the calendar.
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl">
              No need for a long RFP. A concise summary of your product and constraints is enough to map the next steps.
            </p>
            <button
              type="button"
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-4 py-2.5 text-sm font-medium text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              Start the short form
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-4 py-4 sm:px-5 sm:py-5">
            {steps.map((step, index) => (
              <div key={step} className="flex items-start gap-3">
                <div className="mt-0.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-neutral-800 dark:text-neutral-200" />
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                    Step {index + 1}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  );
}
