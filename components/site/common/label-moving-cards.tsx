"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FEATURES } from "@/registry/site/hero";
import { useEffect, useState, useRef, useCallback } from "react";

export const HeroMovingCards = ({
  items = FEATURES,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items?: {
    title?: string;
    subtitle?: string;
    description?: string;
    price?: string;
    gradient?: string;
    miniBg?: string;
    border?: string;
    image?: string;
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
        speed === "fast" ? "40s" : speed === "normal" ? "60s" : "80s";
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
      className={cn("scroller relative z-50 overflow-hidden w-full", className)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-2 py-3 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:paused",
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className={`relative aspect-video flex flex-col items-start justify-between bg-linear-to-br from-white/40 via-white/20 to-white/10 backdrop-blur-lg shadow-lg/10 inset-shadow-sm inset-shadow-white/40 rounded-md overflow-hidden w-35 lg:w-45`}
          >
            {item.image && (
              <Image
                src={item.image || "/card.png"}
                alt={item.title || "Card"}
                width={2000}
                height={2000}
                priority
                unoptimized
                className="w-full h-auto"
              />
            )}
            <div className="relative flex flex-col items-start p-1 w-full h-full">
              <div className="flex items-center text-white/40 text-5xl lg:text-7xl leading-none -mt-0.5 font-mono! font-semibold">
                <span className="tracking-tighter ml-1.5">{item.title}</span>
                <span
                  className={cn(
                    (() => {
                      const numericValue = parseInt(item.title ?? "", 10);
                      return !Number.isNaN(numericValue) && numericValue !== 100
                        ? "-translate-y-1.5"
                        : "";
                    })(),
                  )}
                >
                  {(() => {
                    const numericValue = parseInt(item.title ?? "", 10);
                    if (!Number.isNaN(numericValue)) {
                      return numericValue === 100 ? "%" : "+";
                    }
                    return "";
                  })()}
                </span>
              </div>

              <p className="px-2 py-1 bg-white text-black text-center text-xs font-semibold uppercase tracking-wider rounded-sm w-full">
                {item.subtitle}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
