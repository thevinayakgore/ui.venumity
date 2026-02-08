"use client";
import { motion } from "framer-motion";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export default function TestimonialsCardsGrid() {
  const testimonials: Testimonial[] = [
    {
      quote:
        "The work helped us understand our product surface as a system, not a collection of screens.",
      name: "Jordan Lee",
      role: "VP Product, Northwind",
    },
    {
      quote:
        "We finally have a design system that matches how our engineering team builds.",
      name: "Alex Rivera",
      role: "Head of Design, Contoso",
    },
    {
      quote:
        "Clear communication, thoughtful decisions, and a steady pace throughout the project.",
      name: "Sam Patel",
      role: "Founder, Lighthouse",
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
            Testimonials
          </p>
          <p className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
            Teams that keep coming back when new product work appears.
          </p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="flex flex-col justify-between rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4 sm:p-5"
            >
              <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                {item.quote}
              </p>
              <div className="mt-4">
                <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-50">
                  {item.name}
                </p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  {item.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </motion.main>
  );
}
