"use client";
import { motion } from "framer-motion";

const GRID_SIZE = 3;

export default function CustomLoaderGrid() {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => (
        <motion.div
          key={index}
          className="size-7 bg-linear-to-br from-yellow-400 to-primary rounded"
          animate={{
            scale: [1, 0.5, 1],
            opacity: [1, 0.3, 1],
          }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            delay: index * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
