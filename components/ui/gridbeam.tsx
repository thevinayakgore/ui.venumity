// components/beam.tsx
"use client";
import { motion } from "framer-motion";
import { useId } from "react";

export const Beam = () => {
  const gradientId = useId(); // unique ID for the gradient (prevents hydration issues)

  // Left half of the window frame (rounded top-left)
  const leftPath = "M20 120 L20 30 Q20 10 40 10 L150 10";
  // Right half (rounded top-right)
  const rightPath = "M150 10 L260 10 Q280 10 280 30 L280 120";

  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 flex items-center justify-center w-fit h-fit">
      {/* Left half – slides in from left */}
      <motion.svg
        width="300"
        height="150"
        viewBox="0 0 300 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <path
          d={leftPath}
          stroke={`url(#${gradientId})`}
          strokeWidth="3"
          fill="none"
        />
        <defs>
          <motion.linearGradient
            id={gradientId}
            variants={{
              initial: {
                x1: "40%",
                x2: "50%",
                y1: "160%",
                y2: "180%",
              },
              animate: {
                x1: "0%",
                x2: "10%",
                y1: "-40%",
                y2: "-20%",
              },
            }}
            animate="animate"
            initial="initial"
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              repeatDelay: 2,
            }}
          >
            <stop stopColor="#fe6a00" stopOpacity="0" />
            <stop stopColor="#fe6a00" />
            <stop offset="0.325" stopColor="#fe6a00" />
            <stop offset="1" stopColor="#fe6a00" stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </motion.svg>

      {/* Right half – slides in from right */}
      <motion.svg
        width="300"
        height="150"
        viewBox="0 0 300 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ x: 200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <path
          d={rightPath}
          stroke={`url(#${gradientId})`}
          strokeWidth="3"
          fill="none"
        />
        <defs>
          <motion.linearGradient
            id={gradientId}
            // reuse the same gradient definition (unique ID guarantees correct linking)
            variants={{
              initial: {
                x1: "40%",
                x2: "50%",
                y1: "160%",
                y2: "180%",
              },
              animate: {
                x1: "0%",
                x2: "10%",
                y1: "-40%",
                y2: "-20%",
              },
            }}
            animate="animate"
            initial="initial"
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              repeatDelay: 2,
            }}
          >
            <stop stopColor="#fe6a00" stopOpacity="0" />
            <stop stopColor="#fe6a00" />
            <stop offset="0.325" stopColor="#fe6a00" />
            <stop offset="1" stopColor="#fe6a00" stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};
