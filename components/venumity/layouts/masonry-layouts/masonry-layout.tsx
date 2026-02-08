"use client";
import { motion } from "framer-motion";

const items = [
  {
    id: 1,
    height: 320,
  },
  {
    id: 2,
    height: 280,
  },
  {
    id: 3,
    height: 400,
  },
  {
    id: 4,
    height: 240,
  },
  {
    id: 5,
    height: 360,
  },
  {
    id: 6,
    height: 300,
  },
  {
    id: 7,
    height: 260,
  },
  {
    id: 8,
    height: 320,
  },
  {
    id: 9,
    height: 360,
  },
  {
    id: 10,
    height: 300,
  },
  {
    id: 11,
    height: 200,
  },
];

export default function MinimalMasonryLayout() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-10 p-6 sm:p-10 md:py-14 max-w-7xl w-full h-full"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full columns-1 md:columns-2 lg:columns-3 gap-10"
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="mb-10 break-inside-avoid hover:scale-105 transition-all duration-500"
            style={{ height: item.height }}
          >
            {/* Card */}
            <div className="h-full border bg-card rounded-md shadow-lg" />
          </motion.div>
        ))}
      </motion.div>
    </motion.main>
  );
}
