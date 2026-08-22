"use client";
import { cn } from "@/lib/utils";
import { FEATURES } from "@/registry/site/hero";
import Image from "next/image";
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
      className={cn("scroller relative z-20 overflow-hidden w-full", className)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-3 sm:gap-4 md:gap-5 pt-6 sm:pt-8 md:pt-10 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:paused",
        )}
      >
        {items.map((item, idx) => (
          <li
            className="p-0 sm:p-3 md:p-4 bg-linear-to-tr from-foreground/5 backdrop-blur-sm w-80 md:w-100 lg:w-110 max-w-110 rounded-2xl sm:rounded-3xl shrink-0"
            key={idx}
          >
            <div
              className={`relative flex flex-col items-start justify-between rounded-lg sm:rounded-xl overflow-hidden ${item.gradient} w-full`}
            >
              <div className="flex flex-col items-start w-full h-full">
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
                <div className="relative flex flex-col items-start p-3 sm:p-4 w-full">
                  <div className="absolute top-1 sm:top-2 md:top-3 left-6 sm:left-8 md:left-10 transform-gpu flex items-center opacity-5 text-7xl md:text-8xl lg:text-9xl scale-110 sm:scale-120 md:scale-130 font-mono! font-semibold">
                    <span className="tracking-tighter">{item.title}</span>
                    <span
                      className={cn(
                        "-mt-4 sm:-mt-5 md:-mt-6",
                        (() => {
                          const numericValue = parseInt(item.title ?? "", 10);
                          return !Number.isNaN(numericValue) &&
                            numericValue !== 100
                            ? "scale-120 sm:scale-130 md:scale-140 ml-2 sm:ml-3 md:ml-4 transform-gpu"
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

                  <h3 className="absolute top-12 sm:top-16 md:top-20 right-6 sm:right-8 md:right-10 transform-gpu text-white text-2xl md:text-3xl lg:text-4xl scale-110 sm:scale-115 md:scale-120 font-semibold uppercase tracking-wide! sm:tracking-wider!">
                    {item.subtitle}
                  </h3>

                  {item.description && (
                    <p
                      className={`mt-16 sm:mt-20 md:mt-28 text-xs sm:text-sm tracking-wide text-white font-semibold py-1.5 sm:py-2 px-2.5 sm:px-3.5 ${item.miniBg} backdrop-blur-3xl border sm:border-2 ${item.border} rounded-md sm:rounded-lg`}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
              {item.price && (
                <p className="p-3 sm:p-4 pt-0 text-sm sm:text-base font-medium text-primary">
                  ${item.price}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
