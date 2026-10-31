"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef, useCallback } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items:
    | {
        title?: string;
        subtitle?: string;
        description?: string | undefined;
        price?: string | undefined;
        gradient?: string | undefined;
        miniBg?: string | undefined;
        border?: string | undefined;
        image?: string | undefined;
      }[]
    | undefined;
  direction?: "left" | "right" | "up" | "down";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  const isVertical = direction === "up" || direction === "down";

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

      getSpeed();
      setStart(true);
    }
  }, [getSpeed]);

  useEffect(() => {
    setTimeout(() => addAnimation(), 0);
  }, [addAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 overflow-hidden w-full",
        isVertical && "h-150",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 w-max flex-nowrap",
          isVertical && "flex-col h-max",
          !isVertical && "flex-row",
          start &&
            (isVertical
              ? direction === "up"
                ? "animate-scroll-vertical"
                : "animate-scroll-vertical-reverse"
              : direction === "left"
                ? "animate-scroll"
                : "animate-scroll-reverse"),
          pauseOnHover && "hover:paused",
        )}
      >
        {items &&
          items.map((item, idx) => (
            <li
              className={cn(
                "aspect-video max-h-45 rounded-2xl shrink-0",
                isVertical && "w-full max-h-45",
              )}
              key={idx}
            >
              <div
                className={`relative flex flex-col items-start justify-between rounded-xl overflow-hidden bg-linear-to-bl ${item.gradient} via-transparent! to-transparent! w-full h-ull`}
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
                      className="object-cover w-full h-auto"
                    />
                  )}
                  {item.title && item.description && (
                    <div className="flex flex-col items-start p-4 mt-2 w-full">
                      <h1 className="text-6xl font-mono! tracking-normal font-normal">
                        {item?.title || "Card"}
                      </h1>
                      <h3 className="text-2xl font-normal my-2">
                        {item.subtitle}
                      </h3>
                      {item.description && (
                        <p
                          className={`text-sm font-sans font-normal! transform-gpu py-3 pb-6! px-4 text-foreground! ${item.miniBg} backdrop-blur-sm border-2 ${item.border} rounded-lg`}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
                  )}
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
