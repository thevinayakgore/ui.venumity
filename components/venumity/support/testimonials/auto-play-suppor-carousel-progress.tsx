"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type SupportTestimonial = {
  quote: string;
  name: string;
  role: string;
};

export default function SupportTestimonialsAutoCarousel() {
  const testimonials: SupportTestimonial[] = [
    {
      quote:
        "Support was proactive, not reactive. We had answers before we even realized we needed them.",
      name: "Jordan Lee",
      role: "VP Product, Northwind",
    },
    {
      quote:
        "Design questions never blocked engineering. We always had a clear next step.",
      name: "Alex Rivera",
      role: "Head of Design, Contoso",
    },
    {
      quote:
        "Weekly async updates meant no one had to chase status. Everything was documented.",
      name: "Priya Nair",
      role: "Product Lead, Orbit",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(id);
  }, [testimonials.length]);

  const current = testimonials[index];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full bg-white dark:bg-black"
    >
      <section className="w-full max-w-3xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-6 py-7 sm:px-8 sm:py-8 shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-3"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
              Support feedback
            </p>
            <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200">
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
          </motion.div>
        </AnimatePresence>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex gap-1.5">
            {testimonials.map((item, i) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setIndex(i)}
                className="relative h-1.5 w-6 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800"
              >
                {i === index && (
                  <motion.span
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5.2, ease: "linear" }}
                    className="absolute inset-y-0 left-0 rounded-full bg-neutral-900 dark:bg-neutral-100"
                  />
                )}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
            {index + 1} / {testimonials.length}
          </p>
        </div>
      </section>
    </motion.main>
  );
}
