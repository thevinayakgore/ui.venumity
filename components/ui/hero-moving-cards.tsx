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
          "flex min-w-full shrink-0 gap-5 pt-10 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:paused",
        )}
      >
        {items.map((item, idx) => (
          <li
            className="p-3 bg-white/5 backdrop-blur-sm border-2 border-foreground/5 max-w-100 rounded-2xl shrink-0 h-60"
            key={idx}
          >
            <div
              className={`relative flex flex-col items-start justify-between rounded-xl overflow-hidden ${item.gradient} w-full h-ull`}
            >
              <div className="flex flex-col items-start gap-2 w-full h-full">
                {item.image && (
                  <Image
                    src={item.image || "/card.png"}
                    alt={item.title || "Card"}
                    width={2000}
                    height={2000}
                    className="w-full h-auto"
                  />
                )}
                <div className="relative flex flex-col items-start p-4 w-full">
                  <div className="absolute top-3 left-10 transform-gpu flex items-center opacity-5 text-9xl scale-130 font-mono! font-semibold">
                    <span className="tracking-tighter">{item.title}</span>
                    <span
                      className={cn(
                        "-mt-6",
                        (() => {
                          const numericValue = parseInt(item.title ?? "", 10);
                          return !Number.isNaN(numericValue) &&
                            numericValue !== 100
                            ? "scale-140 ml-4 transform-gpu"
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

                  <h3 className="absolute top-20 right-10 transform-gpu text-4xl scale-120 font-sans font-medium uppercase opacity-70 tracking-wider!">
                    {item.subtitle}
                  </h3>

                  {item.description && (
                    <p
                      className={`mt-28 text-sm font-sans font-normal! py-2.5 pb-6! px-3.5 text-foreground! ${item.miniBg} backdrop-blur-3xl border-2 ${item.border} rounded-lg`}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
              {item.price && (
                <p className="p-4 pt-0 text-base font-medium text-primary">
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
