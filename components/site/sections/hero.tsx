"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Icons from "../common/icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Shimmer from "@/components/utility/shimmer";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "motion/react";
import { buttonVariants } from "@/components/ui/button";
import { GRADIENT_ANIMATION } from "@/components/utility/gradient";
import { insetButtonVariants } from "@/components/ui/inset-button";
import { HeroMovingCards } from "@/components/site/common/label-moving-cards";
import {
  ArrowRight,
  ChevronsRight,
  GitPullRequestArrow,
  Layers,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const rotatingWords = [
  "ready-to-use",
  "production-ready",
  "customizable",
  "amazing",
  "animated",
  "accessible",
  "responsive",
  "modern",
  "open-source",
];

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden w-full h-full">
      <div className="relative flex flex-col items-center justify-center m-auto p-1 md:p-2 w-full">
        <div className="relative z-100 lg:aspect-video xl:aspect-5/2.5 flex flex-col items-center justify-center m-auto bg-background rounded-lg xl:rounded-xl overflow-hidden max-w-400 w-full">
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-5 z-70 p-3 sm:p-5 lg:p-10 text-center overflow-hidden w-full">
            <Link
              href="/components/data-display/tables#expandable-row-table"
              className={cn(
                buttonVariants({
                  variant: "outline",
                }),
                "pl-0! h-9! md:h-12! pr-1 hover:pr-3 z-20 group/intro bg-foreground/5! backdrop-blur-md border-foreground/25! text-xs md:text-sm font-semibold tracking-wide truncate min-w-0 w-fit shadow-lg rounded-full transition-all duration-500",
              )}
            >
              <div className="hidden md:block relative size-11.5 z-40 mr-1 p-0.75 rounded-full overflow-hidden">
                <Image
                  src="/brand-logo.png"
                  alt="Logo"
                  width={500}
                  height={500}
                  priority
                  unoptimized
                  loading="eager"
                  className="transform-gpu rounded-full w-full h-full"
                />
                <span className="absolute inset-0 -z-10 animate-spin bg-linear-to-tl from-blue-500 via-blue-500/60" />
              </div>
              <span className="hidden md:block">Introducing</span>
              <Separator
                orientation="vertical"
                className="hidden md:block mx-3 bg-foreground/30 h-7 my-auto"
              />
              <span className="pl-3 md:pl-0">Fixed Column Table</span>
              <span
                className={insetButtonVariants(
                  "relative md:ml-2 text-[0.7rem] font-semibold overflow-hidden rounded-full",
                  "sm",
                )}
              >
                NEW
                <Shimmer className="via-white/40 w-5!" />
              </span>
              <ChevronsRight className="opacity-40 group-hover/intro:opacity-100 size-7 group-hover/intro:size-8 stroke-[1.5px] -translate-x-1 group-hover/intro:translate-x-2 transition-all duration-500" />
            </Link>

            <div className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-medium lg:mt-5">
              <span className="sm:leading-8 md:leading-10 lg:leading-16 tracking-tight">
                Build your next website with <br /> these set of{" "}
                <AnimatePresence mode="wait">
                  <span
                    key={rotatingWords[wordIndex]}
                    className="text-primary inline-block"
                  >
                    {rotatingWords[wordIndex].split("").map((char, index) => (
                      <motion.span
                        key={`${rotatingWords[wordIndex]}-${index}`}
                        className="inline-block"
                        style={{
                          transformStyle: "preserve-3d",
                        }}
                        initial={{
                          rotateX: -90,
                          opacity: 0,
                          filter: "blur(5px)",
                        }}
                        animate={{
                          rotateX: 0,
                          opacity: 1,
                          filter: "blur(0px)",
                        }}
                        transition={{
                          delay: index * 0.04,
                          duration: 1.5,
                          ease: "easeOut",
                          type: "spring",
                          damping: 50,
                          stiffness: 200,
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                </AnimatePresence>{" "}
                <br />
                components
              </span>{" "}
              🎁 🎉
            </div>

            <div className="flex justify-center w-full">
              <Icons
                includeTech
                iconClassName="size-6 md:size-9"
                className="gap-3! md:gap-6! not-prose"
              />
            </div>

            <p className="text-xs sm:text-base md:text-lg tracking-wide text-foreground/80 px-3 w-full max-w-md sm:max-w-3xl">
              Copy, paste, customize & launch beautiful websites faster. Over
              100+ open-source components built with Next.js, Tailwind, and
              Framer Motion.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 my-5 w-full">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    target="_blank"
                    href="https://github.com/thevinayakgore/ui.venumity"
                    className={insetButtonVariants(
                      "relative group/btn text-sm md:text-base hover:shadow-lg shadow-primary/50 duration-500 rounded-lg overflow-hidden h-12",
                      "lg",
                    )}
                  >
                    <GitPullRequestArrow className="size-5 md:size-5" />
                    Contribute
                    <Shimmer className="via-white/60 w-25" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="font-semibold!">
                  <p>Contribute & Star</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/components"
                    className="inline-flex items-center gap-2.5 px-4 md:px-5 py-3 group text-sm md:text-base font-medium bg-foreground text-secondary hover:shadow-lg shadow-foreground/40 transition-all duration-500 rounded-lg"
                  >
                    <Layers className="size-4 md:size-5" />
                    Components
                    <ArrowRight className="size-4 md:size-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="font-semibold!">
                  <p>Use & share to community</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <Image
            src={
              mounted && resolvedTheme === "dark"
                ? "/brand.webp"
                : "/brand2.webp"
            }
            alt="Brand Image"
            width={5000}
            height={5000}
            loading="eager"
            className="absolute inset-x-0 top-1/5 -translate-y-1/4 left-1/4 -translate-x-1/3 z-0 transform-gpu scale-120 opacity-8 rotate-20 w-full h-auto"
          />
        </div>
      </div>

      {/* Hero Moving Cards Section - Responsive height */}
      <div className="w-full">
        <HeroMovingCards />
      </div>

      {/* Background Gradient Animation */}
      <motion.div
        className="absolute inset-0 z-0 w-full h-full"
        {...GRADIENT_ANIMATION}
      />
    </section>
  );
}
