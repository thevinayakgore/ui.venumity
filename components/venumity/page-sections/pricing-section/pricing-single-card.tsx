"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function PricingSingleCard() {
  const plan = {
    label: "Embedded product design partner",
    price: "from $8k / month",
    summary:
      "Flexible, month-to-month collaboration with a focus on product UX, systems, and interface motion.",
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-4xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 dark:bg-black px-6 py-7 sm:px-8 sm:py-8">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
            Pricing
          </p>
          <p className="text-sm sm:text-base text-neutral-100">
            {plan.label}
          </p>
          <p className="text-sm font-semibold text-neutral-50">
            {plan.price}
          </p>
          <p className="text-xs sm:text-sm text-neutral-400">{plan.summary}</p>
          <button
            type="button"
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-neutral-50 px-4 py-2.5 text-xs sm:text-sm font-medium text-neutral-900 hover:bg-neutral-200 transition-colors"
          >
            Request a detailed proposal
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>
    </motion.main>
  );
}
