// components/infinite-logo-moving-cards.tsx
"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";

export const InfiniteLogoMovingCards = ({
  items = [],
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items: {
    image: string;
    alt?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  const getDirection = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse",
      );
    }
  }, [direction]);

  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
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
        "scroller relative z-20 overflow-hidden w-full",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-5 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:paused",
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center justify-center shrink-0"
          >
            <Image
              src={item.image}
              alt={item.alt || "Logo"}
              width={500}
              height={500}
              className="size-15 object-contain rounded-lg" // adjust size as needed
            />
          </li>
        ))}
      </ul>
    </div>
  );
};