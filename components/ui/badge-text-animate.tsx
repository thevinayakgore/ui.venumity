"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface BadgeTextAnimateProps {
  leftWords: string[]; // e.g. ["Tech", "Dev", "Build"]
  rightWords: string[]; // e.g. ["Helpers", "Vibes", "Blocks"]
  interval?: number; // optional, default 4000ms
}

export default function BadgeTextAnimate({
  leftWords,
  rightWords,
  interval = 4000,
}: BadgeTextAnimateProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // toggles animation direction

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % leftWords.length);
      setDirection((prev) => prev * -1);
    }, interval);

    return () => clearInterval(timer);
  }, [leftWords.length, interval]);

  return (
    <span className="flex items-center text-xs leading-none uppercase">
      {/* LEFT WORD */}
      <AnimatePresence mode="wait">
        <motion.span
          key={leftWords[index]}
          className="mr-1"
          initial={{ opacity: 0, y: -20 * direction }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 * direction }}
          transition={{ duration: 0.5 }}
        >
          {leftWords[index]}
        </motion.span>
      </AnimatePresence>

      {/* RIGHT WORD */}
      <AnimatePresence mode="wait">
        <motion.span
          key={rightWords[index]}
          initial={{ opacity: 0, y: 20 * direction }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 * direction }}
          transition={{ duration: 0.5 }}
        >
          {rightWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
