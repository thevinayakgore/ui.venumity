"use client";
import { motion } from "framer-motion";

export default function CustomLoaderGradient() {
  return (
    <div className="relative size-16">
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
        animate={{
          rotate: 360,
          scale: [1, 0.9, 1],
        }}
        transition={{
          rotate: {
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />
      <div className="absolute inset-4 bg-background rounded-full" />
    </div>
  );
}
