"use client";
import { motion, useReducedMotion } from "framer-motion";

export default function TextInlineLoader() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex items-center justify-center m-auto gap-1.5 p-5 md:p-10 w-full h-full">
      <span>Venumity UI is a modern library built to deliver fast and</span>
      <span className="flex items-center gap-1 mt-2" aria-hidden="true">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="size-1.5 bg-primary rounded-full"
            animate={
              prefersReducedMotion
                ? { opacity: 0.7 }
                : {
                    opacity: [0.3, 1, 0.3],
                    scale: [0.85, 1.15, 0.85],
                  }
            }
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: dot * 0.16,
            }}
          />
        ))}
      </span>
    </div>
  );
}
