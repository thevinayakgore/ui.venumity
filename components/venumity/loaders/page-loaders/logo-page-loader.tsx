"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function LogoPageLoader() {
  const prefersReducedMotion = useReducedMotion();

  const motionTransition = prefersReducedMotion
    ? { duration: 0 }
    : {
        duration: 2.8,
        repeat: Infinity,
        ease: "easeInOut" as const,
      };

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full h-full"
      role="status"
      aria-live="polite"
      aria-label="Loading Page"
    >
      {/* Orbiting logo loader */}
      <div className="relative flex size-45 items-center justify-center">
        <motion.div
          aria-hidden="true"
          className="absolute inset-3 z-10 bg-background border-2 border-primary/70 rounded-full"
          animate={prefersReducedMotion ? { opacity: 0.5 } : { rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-primary/15 backdrop-blur-sm border border-dashed border-primary/70 rounded-full"
          animate={prefersReducedMotion ? { opacity: 0.6 } : { rotate: -360 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Orbiting dots */}
        {!prefersReducedMotion &&
          [0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 z-20 size-2.5 bg-primary shadow-lg shadow-primary/50 rounded-full"
              animate={{
                rotate: 360,
                x: "-50%",
                y: "-50%",
              }}
              style={{
                transformOrigin: `${46 + dot * 8}px 0`,
              }}
              transition={{
                duration: 3 + dot * 0.8,
                repeat: Infinity,
                ease: "linear",
                delay: dot * 0.35,
              }}
            />
          ))}

        {/* Logo container */}
        <motion.div
          className="relative z-50 size-25 border-3 border-white shadow-xl shadow-primary/20 rounded-full overflow-hidden"
          animate={
            prefersReducedMotion
              ? { scale: 1 }
              : {
                  scale: [1, 1.04, 1],
                }
          }
          transition={motionTransition}
        >
          <Image
            src="/brand-logo.png"
            alt="Venumity UI Logo"
            width={500}
            height={500}
            priority
            unoptimized
            className="object-cover w-full h-full"
          />
        </motion.div>

        {/* Ambient primary glow */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute size-80 bg-primary blur-3xl rounded-full"
          animate={
            prefersReducedMotion
              ? { opacity: 0.3 }
              : {
                  opacity: [0.2, 0.3, 0.2],
                  scale: [0.85, 1.1, 0.85],
                }
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Brand and progress indicator */}
      <div className="relative z-60 mt-8 flex flex-col items-center text-center">
        <motion.h1
          className="text-2xl font-semibold tracking-tight text-foreground"
          animate={
            prefersReducedMotion ? { opacity: 1 } : { opacity: [0.8, 1, 0.8] }
          }
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Venumity UI
        </motion.h1>

        <p className="mt-1 text-sm text-foreground/50">
          Preparing your experience
        </p>

        <div className="mt-6 flex items-center gap-1.5" aria-hidden="true">
          {[0, 1, 2, 3].map((dot) => (
            <motion.span
              key={dot}
              className="size-2 rounded-full bg-primary"
              animate={
                prefersReducedMotion
                  ? { opacity: 0.7 }
                  : {
                      y: [0, -7, 0],
                      opacity: [0.35, 1, 0.35],
                      scale: [0.85, 1.15, 0.85],
                    }
              }
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: dot * 0.14,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Animated progress line */}
        <div className="mt-5 h-1 w-40 overflow-hidden rounded-full bg-primary/10">
          <motion.div
            className="h-full rounded-full bg-primary"
            animate={
              prefersReducedMotion ? { width: "45%" } : { x: ["-100%", "220%"] }
            }
            transition={{
              duration: 1.7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ width: "45%" }}
          />
        </div>
      </div>
    </div>
  );
}
