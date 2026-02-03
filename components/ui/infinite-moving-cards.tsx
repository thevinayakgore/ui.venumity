"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState, useRef, useCallback } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
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
        direction === "left" ? "forwards" : "reverse"
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
      className={cn("scroller relative z-20 overflow-hidden w-full", className)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-5 pt-10 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:paused"
        )}
      >
        {items.map((item, idx) => (
          <li className="p-3 bg-white/5 backdrop-blur-sm border-2 border-foreground/5 max-w-100 rounded-2xl shrink-0 h-60" key={idx}>
            <div className={`relative flex flex-col items-start justify-between rounded-xl overflow-hidden bg-linear-to-bl ${item.gradient} via-transparent! to-transparent! w-full h-ull`}>
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
                <div className="flex flex-col items-start p-4 w-full">
                  <h1 className="text-6xl font-mono! tracking-normal font-normal">
                    {item.title}
                  </h1>
                  <h3 className="text-2xl font-normal my-2">{item.subtitle}</h3>
                  {item.description && (
                    <p
                      className={`text-sm font-sans font-normal! transform-gpu py-3 pb-6! px-4 text-foreground! ${item.miniBg} backdrop-blur-sm border-2 ${item.border} rounded-lg`}
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
