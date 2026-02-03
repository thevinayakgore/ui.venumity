"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface WordItem {
  word: string;
  className?: string;
}

interface LayoutTextFlipProps {
  words: WordItem[];
  duration?: number;
  onWordChange?: (index: number) => void;
}

export const LayoutTextFlip = ({
  words = [
    {
      word: "Magical",
      className: "bg-linear-to-b from-primary to-transparent",
    },
    {
      word: "Animated",
      className: "bg-linear-to-b from-green-500 to-transparent",
    },
    {
      word: "Flexible",
      className: "bg-linear-to-b from-purple-500 to-transparent",
    },
    {
      word: "Smooth",
      className: "bg-linear-to-b from-yellow-400 to-transparent",
    },
    {
      word: "Beautiful",
      className: "bg-linear-to-b from-pink-500 to-transparent",
    },
    {
      word: "Stunning",
      className: "bg-linear-to-b from-lime-500 to-transparent",
    },
    {
      word: "Powerful",
      className: "bg-linear-to-b from-rose-500 to-transparent",
    },
    {
      word: "Modern",
      className: "bg-linear-to-b from-zinc-500 to-transparent",
    },
    {
      word: "Elegant",
      className: "bg-linear-to-b from-blue-500 to-transparent",
    },
    {
      word: "Polished",
      className: "bg-linear-to-b from-sky-500 to-transparent",
    },
    {
      word: "Animated",
      className: "bg-linear-to-b from-teal-500 to-transparent",
    },
  ],
  duration = 7000,
  onWordChange,
}: LayoutTextFlipProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const onWordChangeRef = useRef(onWordChange);

  // Update ref when callback changes
  useEffect(() => {
    onWordChangeRef.current = onWordChange;
  }, [onWordChange]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % words.length;

        // Schedule the callback for next tick to avoid render-phase updates
        setTimeout(() => {
          onWordChangeRef.current?.(newIndex);
        }, 0);

        return newIndex;
      });
    }, duration);

    return () => clearInterval(interval);
  }, [duration, words.length]);

  return (
    <>
      <motion.span layout>
        <AnimatePresence mode="popLayout">
          {words[currentIndex].word.split("").map((letter, index) => {
            const directions = [
              {
                initial: { x: -400, y: 0 },
                exit: { x: 400, y: 0 },
              },
              {
                initial: { y: -400 },
                exit: { y: 400 },
              },
              {
                initial: { y: 400 },
                exit: { y: -400 },
              },
              {
                initial: { x: 400, y: 0 },
                exit: { x: -400, y: 0 },
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
                  filter: "blur(10px)",
                }}
                animate={{
                  x: 0,
                  y: 0,
                  scale: 1,
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  ...dir.exit,
                  scale: 0,
                  opacity: 0,
                  filter: "blur(10px)",
                  transition: { duration: 2.5 },
                }}
                transition={{ duration: 2, delay: index * 0.5 }}
                className={cn(
                  "inline-block py-3 text-transparent bg-clip-text whitespace-nowrap leading-none",
                  words[currentIndex].className
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
