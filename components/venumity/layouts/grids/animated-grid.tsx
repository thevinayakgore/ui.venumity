"use client";
import { motion } from "framer-motion";

// Animated Grid Layout
function AnimatedGrid({
  animation = "fade",
}: {
  animation?: "fade" | "slide" | "scale";
}) {
  const animations = {
    fade: (
      <motion.div className="rounded-lg border p-8 grid grid-cols-3 gap-5">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: i * 0.1,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 4,
            }}
            className="h-20 bg-blue-500 rounded-sm"
          />
        ))}
      </motion.div>
    ),
    slide: (
      <motion.div className="rounded-lg border p-8 grid grid-cols-3 gap-5">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1,
              delay: i * 0.1,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 4,
            }}
            className="h-20 bg-orange-500 rounded-sm"
          />
        ))}
      </motion.div>
    ),
    scale: (
      <motion.div className="rounded-lg border p-8 grid grid-cols-3 gap-5">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 1,
              delay: i * 0.1,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 4,
            }}
            className="h-20 bg-green-500 rounded-sm"
          />
        ))}
      </motion.div>
    ),
  };

  return animations[animation];
}

export default function AnimatedGridLayout() {
  return (
    <>
      <motion.main
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 items-center justify-center m-auto gap-10 p-6 sm:p-10 md:py-14 max-w-7xl w-full h-full"
      >
        <AnimatedGrid animation="fade" />
        <AnimatedGrid animation="slide" />
        <AnimatedGrid animation="scale" />
      </motion.main>
    </>
  );
}
