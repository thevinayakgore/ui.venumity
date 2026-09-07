// components/utility/shimmer.tsx
"use client";
import { motion } from "motion/react";

type ShimmerProps = {
  className?: string;
};

export default function Shimmer({ className = "" }: ShimmerProps) {
  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r from-transparent via-blue-500/40 to-transparent ${className}`}
      initial={{ x: "-250%", skewX: -20 }}
      animate={{ x: ["-250%", "250%"] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "linear",
        times: [0, 0.6, 0.9, 1],
      }}
    />
  );
}