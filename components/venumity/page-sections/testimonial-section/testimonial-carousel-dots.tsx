"use client";
import { motion } from "framer-motion";
import { useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export default function TestimonialsCarouselDots() {
  const testimonials: Testimonial[] = [
    {
      quote:
        "We finally have a clear, documented design system that our engineers actually enjoy using.",
      name: "Morgan Hill",
      role: "Design Lead, Acme",
    },
    {
      quote:
        "The work uncovered gaps in our flows and helped us simplify decisions for users.",
      name: "Jamie Chen",
      role: "Product Manager, Aurora",
    },
    {
      quote:
        "Having a calm, steady partner during a fast product cycle made a huge difference.",
      name: "Priya Nair",
      role: "Founder, Orbit",
    },
  ];

  const [index, setIndex] = useState(0);

  const current = testimonials[index];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-3xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-6 py-7 sm:px-8 sm:py-8">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
            Teams
          </p>
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
            “{current.quote}”
          </p>
          <div>
            <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-50">
              {current.name}
            </p>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              {current.role}
            </p>
          </div>
          <div className="mt-2 flex gap-2">
            {testimonials.map((item, i) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-1.5 w-5 rounded-full ${
                  i === index
                    ? "bg-neutral-900 dark:bg-neutral-100"
                    : "bg-neutral-200 dark:bg-neutral-800"
                }`}
                aria-label={`Show testimonial from ${item.name}`}
              />
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  );
}
