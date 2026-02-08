"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function TestimonialsHighlightSingle() {
  const data = {
    quote:
      "The studio helped us simplify our signup and onboarding so new users understand the product in minutes, not days.",
    name: "Taylor Brooks",
    role: "Co-founder, Meridian",
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-4xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 dark:bg-black px-6 py-7 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-4">
          <Quote className="h-6 w-6 text-neutral-500" />
          <p className="text-sm sm:text-base text-neutral-100">
            {data.quote}
          </p>
          <div>
            <p className="text-xs font-semibold text-neutral-50">
              {data.name}
            </p>
            <p className="text-[11px] text-neutral-400">{data.role}</p>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
