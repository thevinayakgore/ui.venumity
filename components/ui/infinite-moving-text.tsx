"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const InfiniteMovingText = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  const getDirection = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  }, [direction]);

  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "100s" : speed === "normal" ? "150s" : "200s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  }, [speed]);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [getDirection, getSpeed]);

  useEffect(() => {
    setTimeout(() => addAnimation(), 0);
  }, [addAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 overflow-hidden scale-[1.2] w-full",
        className
      )}
    >
      <div
        ref={scrollerRef}
        className={cn(
          "flex gap-3 min-w-full shrink-0 py-3 w-max flex-nowrap whitespace-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:paused"
        )}
      >
        {items.map((item, idx) => (
          <h1
            key={idx}
            className="inline-flex items-center gap-3 text-2xl md:text-4xl orbitron uppercase font-extrabold leading-none! w-auto"
          >
            <span className="opacity-10">{item}</span>
            <span className="opacity-80">⚡️</span>
          </h1>
        ))}
      </div>

      <motion.div
        className="absolute top-0 right-0 z-50 h-0.5 opacity-40 w-full"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, hsl(262 90% 65%) 50%, transparent 100%)",
          backgroundSize: "150% -150%",
        }}
        animate={{
          backgroundPositionX: [
            "0%",
            "100%",
            "200%",
            "300%",
            "400%",
            "500%",
            "600%",
            "700%",
            "800%",
            "900%",
            "1000%",
            "1100%",
          ],
          backgroundImage: [
            "linear-gradient(90deg, transparent 0%, hsl(45 100% 55%) 50%, transparent 100%)", // yellow
            "linear-gradient(90deg, transparent 0%, hsl(262 90% 65%) 50%, transparent 100%)", // violet
            "linear-gradient(90deg, transparent 0%, hsl(217 95% 65%) 50%, transparent 100%)", // blue
            "linear-gradient(90deg, transparent 0%, hsl(195 95% 60%) 50%, transparent 100%)", // cyan
            "linear-gradient(90deg, transparent 0%, hsl(160 90% 55%) 50%, transparent 100%)", // emerald
            "linear-gradient(90deg, transparent 0%, hsl(120 90% 55%) 50%, transparent 100%)", // green
            "linear-gradient(90deg, transparent 0%, hsl(85 95% 55%) 50%, transparent 100%)", // lime
            "linear-gradient(90deg, transparent 0%, hsl(25 100% 60%) 50%, transparent 100%)", // orange
            "linear-gradient(90deg, transparent 0%, hsl(0 95% 60%) 50%, transparent 100%)", // red
            "linear-gradient(90deg, transparent 0%, hsl(330 95% 65%) 50%, transparent 100%)", // pink
            "linear-gradient(90deg, transparent 0%, hsl(300 90% 65%) 50%, transparent 100%)", // magenta
            "linear-gradient(90deg, transparent 0%, hsl(280 90% 65%) 50%, transparent 100%)", // indigo
          ],
        }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-0.5 opacity-40 w-full"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, hsl(262 90% 65%) 50%, transparent 100%)",
          backgroundSize: "150% -150%",
        }}
        animate={{
          backgroundPositionX: [
            "0%",
            "100%",
            "200%",
            "300%",
            "400%",
            "500%",
            "600%",
            "700%",
            "800%",
            "900%",
            "1000%",
            "1100%",
          ],
          backgroundImage: [
            "linear-gradient(90deg, transparent 0%, hsl(45 100% 55%) 50%, transparent 100%)", // yellow
            "linear-gradient(90deg, transparent 0%, hsl(262 90% 65%) 50%, transparent 100%)", // violet
            "linear-gradient(90deg, transparent 0%, hsl(217 95% 65%) 50%, transparent 100%)", // blue
            "linear-gradient(90deg, transparent 0%, hsl(195 95% 60%) 50%, transparent 100%)", // cyan
            "linear-gradient(90deg, transparent 0%, hsl(160 90% 55%) 50%, transparent 100%)", // emerald
            "linear-gradient(90deg, transparent 0%, hsl(120 90% 55%) 50%, transparent 100%)", // green
            "linear-gradient(90deg, transparent 0%, hsl(85 95% 55%) 50%, transparent 100%)", // lime
            "linear-gradient(90deg, transparent 0%, hsl(25 100% 60%) 50%, transparent 100%)", // orange
            "linear-gradient(90deg, transparent 0%, hsl(0 95% 60%) 50%, transparent 100%)", // red
            "linear-gradient(90deg, transparent 0%, hsl(330 95% 65%) 50%, transparent 100%)", // pink
            "linear-gradient(90deg, transparent 0%, hsl(300 90% 65%) 50%, transparent 100%)", // magenta
            "linear-gradient(90deg, transparent 0%, hsl(280 90% 65%) 50%, transparent 100%)", // indigo
          ],
        }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </div>
  );
};
