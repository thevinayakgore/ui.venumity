"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { WORDS } from "@/registry/site/hero";

interface WordAnimateProps {
  duration?: number;
  onWordChange?: (index: number) => void;
}

export const WordAnimate = ({
  duration = 7000,
  onWordChange,
}: WordAnimateProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const onWordChangeRef = useRef(onWordChange);

  // Update ref when callback changes
  useEffect(() => {
    onWordChangeRef.current = onWordChange;
  }, [onWordChange]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % WORDS.length;

        // Schedule the callback for next tick to avoid render-phase updates
        setTimeout(() => {
          onWordChangeRef.current?.(newIndex);
        }, 0);

        return newIndex;
      });
    }, duration);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <>
      <motion.span layout>
        <AnimatePresence mode="popLayout">
          {`${WORDS[currentIndex].suffix}`.split("").map((letter, index) => {
            const directions = [
              {
                initial: { x: -250, y: 0 },
                exit: { x: -250, y: 0 },
              },
              {
                initial: { y: -250 },
                exit: { y: -250 },
              },
              {
                initial: { y: 250 },
                exit: { y: 250 },
              },
              {
                initial: { x: 250, y: 0 },
                exit: { x: 250, y: 0 },
              },
            ];
            const dir = directions[index % directions.length];
            return (
              <motion.span
                key={currentIndex + "-" + index}
                initial={{
                  ...dir.initial,
                  scale: 0,
                  opacity: 0,
                  rotateZ: 100,
                  filter: "blur(50px)",
                }}
                animate={{
                  x: 0,
                  y: 0,
                  scale: 1,
                  opacity: 1,
                  rotateZ: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  ...dir.exit,
                  scale: 0,
                  opacity: 0,
                  rotateZ: 0,
                  filter: "blur(50px)",
                  transition: { duration: 2.5 },
                }}
                transition={{ duration: 2, delay: index * 0.5 }}
                className={cn(
                  "inline-block py-3 text-transparent bg-clip-text whitespace-nowrap leading-none",
                  WORDS[currentIndex].className,
                )}
              >
                {letter}
              </motion.span>
            );
          })}
        </AnimatePresence>
      </motion.span>
    </>
  );
};
