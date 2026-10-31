"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

interface ThumbnailsResponse {
  total?: number;
  thumbnails?: string[];
}

async function fetchThumbnails(): Promise<string[]> {
  try {
    const res = await fetch("/api/thumbnails", {
      // Cache for 1 hour on the client; browser will reuse
      next: undefined,
      cache: "force-cache",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as ThumbnailsResponse;
    return Array.isArray(data.thumbnails) ? data.thumbnails : [];
  } catch (err) {
    console.warn("[footer] Failed to fetch thumbnails:", err);
    return [];
  }
}

export default function CTA() {
  const [baseImages, setBaseImages] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);

  // ── Fetch thumbnails once on mount ────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function load() {
      const urls = await fetchThumbnails();
      if (cancelled) return;
      setBaseImages(urls);
      setImages(urls);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Reshuffle images every 10s ────────────────────────────
  useEffect(() => {
    if (baseImages.length === 0) return;
    const interval = setInterval(() => {
      setImages(baseImages);
    }, 10000);
    return () => clearInterval(interval);
  }, [baseImages]);

  return (
    <section className="px-3 py-5 sm:px-5 md:p-10 lg:py-20 border-b w-full">
      <div className="flex items-center justify-center m-auto selection:bg-white! selection:text-primary! max-w-400 w-full">
        <section className="relative group/logo flex items-start gap-5 md:gap-10 lg:gap-20 m-auto rounded-2xl md:rounded-3xl lg:rounded-4xl bg-[radial-gradient(100%_100%_at_50%_0%,rgba(0,0,0,0)_31.25%,rgba(0,0,0,0.1)_100%),radial-gradient(200%_160%_at_-20%_-80%,#FFB457_0%,#FF6A00_100%)] after:pointer-events-none after:absolute after:inset-0 after:select-none after:bg-linear-to-b after:from-white/10 after:to-transparent p-5 md:p-10 lg:p-15 overflow-hidden w-full h-full">
          {/* Glow overlay */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 mt-[calc(-280/16*1rem)] select-none overflow-hidden pl-[35%] mix-blend-overlay">
            <div className="relative ml-[calc(-544/16*1rem)] w-[calc(1458/16*1rem)] max-w-none">
              {/* Replace with your own glow asset or keep as gradient */}
              <div className="h-64 w-full bg-linear-to-r from-orange-400/30 to-amber-600/30 blur-3xl" />
            </div>
          </div>

          <div className="relative z-10 space-y-5 md:space-y-10 text-white font-medium md:max-w-lg">
            <div className="space-y-5">
              <div className="text-balance text-3xl md:text-4xl lg:text-6xl tracking-tight leading-none">
                <span className="pt-3 text-transparent bg-clip-text bg-linear-to-br from-white/70 via-white to-white/30">
                  <span className="dancing text-5xl lg:text-8xl">
                    Start
                  </span>{" "}
                  building <br /> today, buddy
                </span>{" "}
                😎
              </div>
              <p className="text-sm md:text-base lg:text-lg leading-snug">
                Let&apos;s discuss your next project whether you need a custom
                blocks, templates, landing pages or a complete website crafted
                with Venumity&apos;s minimal design system & development
                experience.
              </p>
            </div>
            <Link
              target="_blank"
              href="https://www.venumity.com#contact"
              className="group relative isolate p-3! pl-5! inline-flex items-center justify-center overflow-hidden text-left text-base tracking-wide transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:transition-opacity before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] rounded-md text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),0_1px_1px_-0.5px_rgba(0,0,0,0.03),0_2px_2px_-1px_rgba(0,0,0,0.03),0_4px_4px_-2px_rgba(0,0,0,0.03)] after:pointer-events-none after:absolute after:inset-0 after:rounded-md after:bg-linear-to-b after:from-white after:from-32% after:to-white/40 after:to-68% after:opacity-20"
            >
              Let&apos;s Get Develope
              <svg
                viewBox="0 0 10 10"
                aria-hidden="true"
                className="ml-2 size-5 flex-none opacity-60 transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] group-hover:translate-x-6 group-hover:opacity-0"
              >
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m7.25 5-3.5-2.25v4.5L7.25 5Z"
                />
              </svg>
              <svg
                viewBox="0 0 10 10"
                aria-hidden="true"
                className="-ml-2.5 size-5 flex-none -translate-x-4 opacity-0 transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] group-hover:translate-x-0 group-hover:opacity-100"
              >
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m7.25 5-3.5-2.25v4.5L7.25 5Z"
                />
              </svg>
            </Link>
          </div>

          {/* Large background logo/mark */}
          <div className="pointer-events-none absolute inset-y-0 select-none mask-[radial-gradient(55%_25%_at_70%_50%,#D9D9D9_12%,rgba(217,217,217,0.20)_67.6%,rgba(217,217,217,0)_100%)] sm:mask-[radial-gradient(60%_75%_at_55%_45%,#D9D9D9_12%,rgba(217,217,217,0.20)_67.6%,rgba(217,217,217,0)_100%)] -ml-[calc(410/16*1rem)] -mt-[calc(770/16*1rem)] aspect-1216/1484 h-[calc(1484/16*1rem)] w-[calc(1216/16*1rem)] sm:-ml-[calc(200/16*1rem)] sm:-mt-[calc(830/16*1rem)] sm:aspect-1216/1484 sm:h-[calc(1484/16*1rem)] sm:w-[calc(1216/16*1rem)] md:-ml-[calc(70/16*1rem)] md:-mt-[calc(770/16*1rem)] md:aspect-1216/1484 md:h-[calc(1484/16*1rem)] md:w-[calc(1216/16*1rem)] lg:-mt-[calc(830/16*1rem)] lg:ml-[calc(100/16*1rem)] lg:aspect-1316/1608 lg:h-[calc(1608/16*1rem)] lg:w-[calc(1316/16*1rem)]">
            {/* You can replace this with your own logo mark or keep a canvas effect */}
            <div className="relative hidden md:block h-full">
              <div className="absolute inset-0 top-1/3 right-1/3 translate-y-20 rotate-20 opacity-20 flex items-center justify-center transition-all duration-[2s]">
                <Image
                  src="/brand.webp"
                  alt="Brand"
                  width={5000}
                  height={5000}
                  priority
                  unoptimized
                  loading="eager"
                  className="size-200"
                />
              </div>
            </div>
          </div>

          <div className="absolute -top-10 -right-20 z-100! scale-110 rotate-10 transform-gpu hidden xl:flex items-center gap-3 w-fit">
            <InfiniteMovingCards
              items={
                images.slice(0, 50).map((src) => ({ image: src })) as {
                  image: string;
                }[]
              }
              direction="down"
              speed="slow"
            />
            <InfiniteMovingCards
              items={
                images.slice(50, 100).map((src) => ({ image: src })) as {
                  image: string;
                }[]
              }
              direction="up"
              speed="slow"
            />
          </div>
        </section>
      </div>
    </section>
  );
}
