"use client";
import { motion } from "framer-motion";

// Basic Grid Layout
function BasicGrid({ columns = 3 }: { columns?: 2 | 3 | 4 }) {
  const colClasses = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  return (
    <motion.div
      className={`bg-card rounded-lg border p-8 grid ${colClasses[columns]} gap-5 hover:scale-105 transition-all duration-500 w-full`}
    >
      {[...Array(columns * 2)].map((_, i) => (
        <div
          key={i}
          className="h-20 bg-muted rounded-sm hover:scale-105 transition-all duration-500"
        />
      ))}
    </motion.div>
  );
}

export default function BasicGridLayout() {
  return (
    <>
      <motion.main
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 items-center justify-center m-auto gap-10 p-6 sm:p-10 md:py-14 max-w-7xl w-full h-full"
      >
        <BasicGrid columns={2} />
        <BasicGrid columns={3} />
        <BasicGrid columns={4} />
      </motion.main>
    </>
  );
}
