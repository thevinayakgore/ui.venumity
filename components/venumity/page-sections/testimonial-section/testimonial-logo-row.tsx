"use client";
import { motion } from "framer-motion";

type ClientLogo = {
  name: string;
};

export default function TestimonialsWithLogosRow() {
  const clients: ClientLogo[] = [
    { name: "Northwind" },
    { name: "Contoso" },
    { name: "Meridian" },
    { name: "Lighthouse" },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-6xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-6 py-7 sm:px-8 sm:py-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
          Trusted by
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-4 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-center rounded-lg border border-dashed border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-3 py-2"
            >
              {client.name}
            </div>
          ))}
        </div>
      </section>
    </motion.main>
  );
}
