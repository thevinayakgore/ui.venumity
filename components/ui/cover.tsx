"use client";
import React, { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { SparklesCore } from "@/components/ui/sparkles";

export const Cover = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const [hovered, setHovered] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [beamPositions, setBeamPositions] = useState<number[]>([]);
  const [beamTimings, setBeamTimings] = useState<
    { duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!ref.current) return;

      const width = ref.current.clientWidth;
      const height = ref.current.clientHeight;

      const numberOfBeams = Math.floor(height / 10);
      const positions = Array.from(
        { length: numberOfBeams },
        (_, i) => (i + 1) * (height / (numberOfBeams + 1))
      );

      setContainerWidth(width);
      setBeamPositions(positions);
      setBeamTimings(
        positions.map(() => ({
          duration: Math.random() * 2 + 1,
          delay: Math.random() * 2 + 1,
        }))
      );
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={ref}
      className="relative hover:bg-neutral-900  group/cover inline-block dark:bg-neutral-900 bg-neutral-100 px-2 py-2  transition duration-200 rounded-sm"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: {
                duration: 0.2,
              },
            }}
            className="h-full w-full overflow-hidden absolute inset-0"
          >
            <motion.div
              animate={{
                translateX: ["-50%", "0%"],
              }}
              transition={{
                translateX: {
                  duration: 10,
                  ease: "linear",
                  repeat: Infinity,
                },
              }}
              className="w-[200%] h-full flex"
            >
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={500}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={500}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {beamPositions.map((position, index) => (
        <Beam
          key={index}
          hovered={hovered}
          duration={beamTimings[index]?.duration}
          delay={beamTimings[index]?.delay}
          width={containerWidth}
          style={{
            top: `${position}px`,
          }}
        />
      ))}
      <motion.span
        key={String(hovered)}
        animate={{
          scale: hovered ? 0.8 : 1,
          x: hovered ? [0, -30, 30, -30, 30, 0] : 0,
          y: hovered ? [0, 30, -30, 30, -30, 0] : 0,
        }}
        exit={{
          filter: "none",
          scale: 1,
          x: 0,
          y: 0,
        }}
        transition={{
          duration: 0.2,
          x: {
            duration: 0.2,
            repeat: Infinity,
            repeatType: "loop",
          },
          y: {
            duration: 0.2,
            repeat: Infinity,
            repeatType: "loop",
          },
          scale: {
            duration: 0.2,
          },
          filter: {
            duration: 0.2,
          },
        }}
        className={cn(
          "dark:text-white inline-block text-neutral-900 relative z-20 group-hover/cover:text-white transition duration-200",
          className
        )}
      >
        {children}
      </motion.span>
      <CircleIcon className="absolute -right-0.5 -top-0.5" />
      <CircleIcon className="absolute -bottom-0.5 -right-0.5" delay={0.4} />
      <CircleIcon className="absolute -left-0.5 -top-0.5" delay={0.8} />
      <CircleIcon className="absolute -bottom-0.5 -left-0.5" delay={1.6} />
    </div>
  );
};

export const Beam = ({
  className,
  delay,
  duration,
  hovered,
  width = 600,
  ...svgProps
}: {
  className?: string;
  delay?: number;
  duration?: number;
  hovered?: boolean;
  width?: number;
} & React.ComponentProps<typeof motion.svg>) => {
  const id = useId();

  return (
    <motion.svg
      width={width ?? "600"}
      height="1"
      viewBox={`0 0 ${width ?? "600"} 1`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("absolute inset-x-0 w-full", className)}
      {...svgProps}
    >
      <motion.path
        d={`M0 0.5H${width ?? "600"}`}
        stroke={`url(#svgGradient-${id})`}
      />

      <defs>
        <motion.linearGradient
          id={`svgGradient-${id}`}
          key={String(hovered)}
          gradientUnits="userSpaceOnUse"
          initial={{
            x1: "0%",
            x2: hovered ? "-10%" : "-5%",
            y1: 0,
            y2: 0,
          }}
          animate={{
            x1: "110%",
            x2: hovered ? "100%" : "105%",
            y1: 0,
            y2: 0,
          }}
          transition={{
            duration: hovered ? 0.5 : (duration ?? 2),
            ease: "linear",
            repeat: Infinity,
            delay: hovered ? 0.3 : 0,
            repeatDelay: hovered ? 1.2 : (delay ?? 1),
          }}
        >
          <stop stopColor="#2EB9DF" stopOpacity="0" />
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </motion.svg>
  );
};

export const CircleIcon = ({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 0.2 }}
      transition={{
        delay,
        repeat: Infinity,
        repeatType: "mirror",
        duration: 1.2,
      }}
      className={cn(
        "pointer-events-none group-hover/cover:hidden h-2 w-2 rounded-full bg-neutral-600 dark:bg-white",
        className
      )}
    />
  );
};
