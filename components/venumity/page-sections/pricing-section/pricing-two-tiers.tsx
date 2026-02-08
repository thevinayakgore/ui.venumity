"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export default function PricingTwoTiers() {
  const plans: Plan[] = [
    {
      name: "Project",
      price: "from $18k",
      description: "Short, focused engagement for a specific product area.",
      features: [
        "Product discovery workshop",
        "Core flows and states",
        "Component starter kit",
      ],
    },
    {
      name: "Partner",
      price: "from $32k",
      description: "Embedded support across multiple product initiatives.",
      features: [
        "Ongoing UX and UI work",
        "Design systems and tokens",
        "Async reviews and check-ins",
      ],
      highlighted: true,
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-6xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-6 py-7 sm:px-8 sm:py-8">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
            Pricing
          </p>
          <p className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
            Two simple ways to work together.
          </p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`flex flex-col rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-5 ${
                plan.highlighted
                  ? "ring-1 ring-neutral-900 dark:ring-neutral-100"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                    {plan.name}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {plan.description}
                  </p>
                </div>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                  {plan.price}
                </p>
              </div>
              <ul className="mt-4 space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 text-neutral-900 dark:text-neutral-100" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </motion.main>
  );
}
