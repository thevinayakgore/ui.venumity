// components/utility/shimmer.tsx
"use client";
import { useState } from "react";
import { motion } from "motion/react";

type ShimmerProps = {
  className?: string;
  minDelay?: number;
  maxDelay?: number;
};

export default function Shimmer({
  className = "",
  minDelay = 0,
  maxDelay = 4,
}: ShimmerProps) {
  const [delay] = useState(
    () => minDelay + Math.random() * Math.max(0, maxDelay - minDelay),
  );

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r from-transparent via-blue-600/40 to-transparent ${className}`}
      initial={{
        x: "-250%",
        skewX: -20,
      }}
      animate={{
        x: ["-250%", "250%"],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "linear",
        times: [0, 0.6, 0.9, 1],
      }}
    />
  );
}
