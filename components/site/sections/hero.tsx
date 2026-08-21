"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Camera } from "@/components/utility/camera";
import { HeroMovingCards } from "@/components/ui/hero-moving-cards";
import TechIcons from "./tech-icons";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowBigUpDash, ArrowRight, Globe } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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
  const [isContributeHovered, setIsContributeHovered] = useState(false);

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
    <section className="flex flex-col items-center justify-center m-auto md:p-5 lg:p-10 max-w-400 w-full">
      <div className="relative z-100 flex flex-col items-center justify-center m-auto md:border-6 border-zinc-200 dark:border-zinc-900 bg-background shadow-xl md:rounded-3xl lg:rounded-[2rem] overflow-hidden w-full">
        <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 z-70 transform-gpu bg-zinc-200 dark:bg-zinc-900 rounded-b-2xl h-7 w-1/4">
          <Camera className="dark:bg-zinc-950! size-5! shadow-none! dark:shadow-lg/30!" />
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:gap-5 z-70 p-3 sm:p-5 md:pt-20 lg:pt-30 text-center font-semibold overflow-hidden w-full">
          <Link
            href="/components/data-display/tables#expandable-row-table"
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              "pl-0! h-9! md:h-12! hover:pr-4 md:hover:pr-6 z-20 group/intro bg-foreground/5! backdrop-blur-md border-foreground/15 text-xs md:text-sm tracking-wide truncate min-w-0 w-fit shadow-lg rounded-full transition-all duration-500",
            )}
          >
            <div className="hidden md:block relative size-11.5 z-40 mr-1 p-1 rounded-full overflow-hidden">
              <Image
                src="/brand-logo.png"
                alt="Logo"
                width={500}
                height={500}
                priority
                unoptimized
                className="transform-gpu rounded-full w-full h-full"
              />
              <span className="absolute inset-0 -z-10 animate-spin bg-linear-to-tl from-blue-500 via-blue-500/60" />
            </div>
            <span className="hidden md:block">Introducing</span>
            <Separator
              orientation="vertical"
              className="hidden md:block mx-3 bg-foreground/20 h-7 my-auto"
            />
            <span className="pl-3 md:pl-0">Expandable Row Table</span>
            <span className="hidden md:block ml-2 px-2 py-0.5 text-xs uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
              NEW
            </span>
            <ArrowRight className="ml-1 opacity-40 group-hover/intro:opacity-100 size-4 group-hover/intro:size-5 group-hover/intro:translate-x-3 transition-all duration-500" />
          </Link>

          <div className="text-xl sm:text-3xl md:text-4xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-linear-to-tl from-transparent via-foreground to-transparent sm:leading-8 md:leading-10 lg:leading-16 tracking-tight">
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

          <TechIcons />

          <p className="text-xs sm:text-base md:text-lg font-medium tracking-wide text-foreground/70 w-full sm:max-w-3xl">
            Copy, paste, customize & launch beautiful websites faster. Over 100+
            open-source components built with Next.js, Tailwind, and Framer
            Motion.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 w-full">
            <Link href="/components">
              <Button className="group/btn pl-2! pr-4! sm:pr-5! py-4! sm:py-5! gap-1.5! sm:gap-2 text-sm sm:text-base font-semibold tracking-tight bg-linear-to-tl! from-indigo-300 via-white to-white text-black! border-3 sm:border-4 border-indigo-500 inset-shadow-sm shadow-lg/10 transition-all duration-500 rounded-full">
                <Globe className="size-4 sm:size-5 group-hover/btn:animate-[wiggle_0.6s_ease-in-out]" />
                Get Started
              </Button>
            </Link>
            <Link
              href="https://github.com/thevinayakgore/ui.venumity"
              target="_blank"
            >
              <Button
                onMouseEnter={() => setIsContributeHovered(true)}
                onMouseLeave={() => setIsContributeHovered(false)}
                className="group/btn relative pl-1! sm:pl-1.5! pr-3! sm:pr-4! py-4! sm:py-5! gap-1.5! sm:gap-2 text-sm sm:text-base font-semibold tracking-tight bg-white! text-black! hover:text-pink-500! border-3 sm:border-4 border-primary hover:border-pink-500 shadow-lg/10 transition-all duration-500 overflow-hidden rounded-full"
              >
                <div className="relative flex items-center justify-center size-6 sm:size-7 bg-primary group-hover/btn:bg-pink-500 text-white rounded-full overflow-hidden">
                  {/* Arrow 1 – starts in place, moves up and fades out */}
                  <motion.span
                    className="absolute inset-0 flex items-center justify-center"
                    animate={
                      isContributeHovered
                        ? { y: -80, opacity: 0 }
                        : { y: 0, opacity: 1 }
                    }
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <ArrowBigUpDash className="size-3.5 sm:size-4.5" />
                  </motion.span>

                  {/* Arrow 2 – comes from below, rises higher, then exits above */}
                  <motion.span
                    className="absolute inset-0 flex items-center justify-center"
                    initial={false}
                    animate={
                      isContributeHovered
                        ? { y: [40, -40], opacity: [0, 1, 0] }
                        : { y: 40, opacity: 0 }
                    }
                    transition={
                      isContributeHovered
                        ? { duration: 0.4, ease: "easeInOut" }
                        : { duration: 0.4, ease: "easeInOut", delay: 0.1 }
                    }
                  >
                    <ArrowBigUpDash className="size-3.5 sm:size-4.5" />
                  </motion.span>

                  {/* Arrow 3 – comes from below, settles at the correct position */}
                  <motion.span
                    className="absolute inset-0 flex items-center justify-center"
                    initial={false}
                    animate={
                      isContributeHovered
                        ? { y: 0, opacity: 1, scale: 1.1 }
                        : { y: 80, opacity: 0, scale: 1 }
                    }
                    transition={
                      isContributeHovered
                        ? { duration: 0.4, ease: "easeInOut", delay: 0.1 }
                        : { duration: 0.4, ease: "easeInOut", delay: 0 }
                    }
                  >
                    <ArrowBigUpDash className="size-3.5 sm:size-4.5" />
                  </motion.span>
                </div>
                Contribute
                <span className="text-base sm:text-xl group-hover/btn:animate-[wiggle_0.6s_ease-in-out]">
                  ⏳
                </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Moving Cards Section - Responsive height */}
        <div className="mb-5 md:mb-10 lg:mb-15 z-50 w-full">
          <HeroMovingCards />
        </div>

        <Image
          src={
            mounted && resolvedTheme === "dark" ? "/brand.webp" : "/brand2.webp"
          }
          alt="Brand Image"
          width={5000}
          height={5000}
          loading="eager"
          className="absolute inset-x-0 top-1/5 -translate-y-1/4 left-1/4 -translate-x-1/3 z-0 scale-250 sm:scale-120 transform-gpu opacity-5 dark:opacity-8 w-full h-auto rotate-20"
        />

        <motion.div
          className="absolute inset-x-0 -bottom-1/7 z-0 left-0 opacity-40 rounded-3xl blur-[10rem] h-70 sm:h-100 max-w-400 m-auto w-full"
          animate={{
            background: [
              "radial-gradient(circle at top left, #3b82f6, #a855f7, #ec4899)",
              "radial-gradient(circle at top right, #6366f1, #8b5cf6, #d946ef)",
              "radial-gradient(circle at bottom right, #14b8a6, #0ea5e9, #3b82f6)",
              "radial-gradient(circle at bottom left, #f59e0b, #f97316, #ef4444)",
              "radial-gradient(circle at top left, #22c55e, #84cc16, #f59e0b)",
              "radial-gradient(circle at top right, #06b6d4, #3b82f6, #8b5cf6)",
              "radial-gradient(circle at bottom right, #ec4899, #f43f5e, #f97316)",
              "radial-gradient(circle at bottom left, #8b5cf6, #6366f1, #3b82f6)",
              "radial-gradient(circle at top right, #f43f5e, #ef4444, #f59e0b)",
              "radial-gradient(circle at bottom left, #0ea5e9, #06b6d4, #22c55e)",
            ],
          }}
          transition={{
            duration: 50,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </div>
    </section>
  );
}
