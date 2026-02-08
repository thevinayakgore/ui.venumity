"use client";
import { motion } from "framer-motion";

export default function SimpleRoundLoader() {
  return (
    <div className="relative size-20">
      <motion.div
        className="absolute inset-0 border-4 border-transparent border-t-primary border-r-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute inset-3 border-4 border-transparent border-b-yellow-400 border-l-yellow-400 rounded-full"
        animate={{ rotate: -360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
