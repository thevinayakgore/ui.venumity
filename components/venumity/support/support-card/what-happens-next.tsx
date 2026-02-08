"use client";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function SupportCard3DNextSteps() {
  const steps = [
    "You send a short note with links and context.",
    "Support reviews your product surface and constraints.",
    "You receive clear suggestions or a short call invite.",
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full bg-white dark:bg-black"
    >
      <div className="perspective-[1600px] w-full max-w-xl">
        <motion.section
          initial={{ rotateX: 8, rotateY: -6, y: 12, opacity: 0 }}
          animate={{ rotateX: 0, rotateY: 0, y: 0, opacity: 1 }}
          whileHover={{ rotateX: -4, rotateY: 4, y: -4 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          className="relative rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 dark:bg-black px-6 py-7 sm:px-8 sm:py-8 shadow-2xl"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(248,250,252,0.08),transparent_60%),radial-gradient(circle_at_100%_0%,rgba(248,250,252,0.05),transparent_60%)]" />
          <div className="relative space-y-4">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Support
            </p>
            <p className="text-sm sm:text-base text-neutral-100">
              A calm, structured way to get design help while you keep shipping.
            </p>
            <div className="space-y-2">
              {steps.map((step) => (
                <div key={step} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-[3px] h-3.5 w-3.5 text-emerald-400" />
                  <p className="text-[11px] sm:text-xs text-neutral-300">{step}</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-neutral-50 px-4 py-2.5 text-xs sm:text-sm font-medium text-neutral-900 hover:bg-neutral-200 transition-colors"
            >
              Start with a short note
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.section>
      </div>
    </motion.main>
  );
}
