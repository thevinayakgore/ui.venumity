"use client";
import { motion, useReducedMotion } from "framer-motion";

export default function GradientSpinner() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col items-center justify-center gap-5 md:gap-10 w-full h-full">
      {/* Gradient loader */}
      <div className="relative flex size-32 items-center justify-center">
        {/* Soft ambient glow */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-4 rounded-full bg-linear-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-2xl"
          animate={
            prefersReducedMotion
              ? { opacity: 0.6, scale: 1 }
              : {
                  opacity: [0.35, 0.7, 0.35],
                  scale: [0.85, 1.1, 0.85],
                }
          }
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Outer gradient blur ring */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 p-1 scale-130 blur-2xl rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, #3b82f6 55deg, #8b5cf6 125deg, #ec4899 200deg, #22c55e 270deg, transparent 350deg)",
            maskImage:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            maskComposite: "exclude",
            WebkitMaskImage:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
          }}
          animate={prefersReducedMotion ? undefined : { rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Outer conic-gradient ring */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-full p-1"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, #3b82f6 55deg, #8b5cf6 125deg, #ec4899 200deg, #22c55e 270deg, transparent 350deg)",
            maskImage:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            maskComposite: "exclude",
            WebkitMaskImage:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
          }}
          animate={prefersReducedMotion ? undefined : { rotate: 360 }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Secondary counter-rotating ring */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-3 rounded-full p-1"
          style={{
            background:
              "conic-gradient(from 180deg, transparent 0deg, #22c55e 65deg, #06b6d4 145deg, #6366f1 220deg, transparent 320deg)",
            maskImage:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            maskComposite: "exclude",
            WebkitMaskImage:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
          }}
          animate={prefersReducedMotion ? undefined : { rotate: -360 }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Loading copy */}
      <div className="space-y-1 text-center">
        <h3 className="text-2xl font-semibold">Processing Request</h3>
        <p className="text-sm text-foreground/50">
          Please wait a moment while we prepare everything.
        </p>
      </div>
    </div>
  );
}
