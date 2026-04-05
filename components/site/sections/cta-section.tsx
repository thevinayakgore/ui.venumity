"use client";
import Image from "next/image";
import Link from "next/link";
import { Quote } from "lucide-react";
import { motion } from "motion/react";
import { authorName, brandName, handle, portfolio } from "@/lib/brand";
import {
  GridLineHorizontal,
  GridLineVertical,
} from "@/components/utility/grid-lines";
import CTAButtons from "../common/cta-buttons";
import { Separator } from "@/components/ui/separator";
import { BorderBeam } from "@/components/ui/border-beam";

const GRADIENTS_12 = [
  "linear-gradient(270deg, #6366f1, #8b5cf6)",
  "linear-gradient(270deg, #8b5cf6, #ec4899)",
  "linear-gradient(270deg, #ec4899, #f43f5e)",
  "linear-gradient(270deg, #f43f5e, #f97316)",
  "linear-gradient(270deg, #f97316, #eab308)",
  "linear-gradient(270deg, #eab308, #22c55e)",
  "linear-gradient(270deg, #22c55e, #06b6d4)",
  "linear-gradient(270deg, #06b6d4, #0ea5e9)",
  "linear-gradient(270deg, #0ea5e9, #3b82f6)",
  "linear-gradient(270deg, #3b82f6, #6366f1)",
  "linear-gradient(270deg, #6366f1, #22c55e)",
  "linear-gradient(270deg, #22c55e, #ec4899)",
];

const GRADIENT_ANIMATION = {
  animate: { backgroundImage: GRADIENTS_12 },
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: (t: number) => t,
  },
};

export default function CTASection() {
  return (
    <section className="relative w-full">
      <GridLineHorizontal className="top-0" />
      <GridLineHorizontal className="bottom-0" />
      <GridLineVertical className="left-0" />
      <GridLineVertical className="right-0" />

      <div className="relative group p-6 md:p-10 lg:p-15 bg-muted/40 backdrop-blur-sm overflow-hidden w-full">
        <div className="relative flex flex-col xl:flex-row bg-background border border-foreground/15 rounded-lg overflow-hidden w-full">
          {/* Left section - Responsive widths */}
          <div className="p-6 md:p-8 lg:p-10 z-10 flex flex-col items-start justify-center w-full xl:w-2/3">
            <motion.span
              className="relative stackSans bg-clip-text text-transparent font-extrabold! text-5xl md:text-6xl lg:text-7xl xl:text-8xl xl:-mt-5 pb-2 sm:pb-3 leading-none!"
              {...GRADIENT_ANIMATION}
            >
              Supercharge
              <motion.div
                className="absolute inset-0 -z-10 opacity-30 blur-3xl rounded-full w-auto h-full"
                {...GRADIENT_ANIMATION}
              />
            </motion.span>

            <h1 className="stackSans text-lg sm:text-xl md:text-2xl mt-2 sm:mt-4">
              Your web with beautifully crafted Templates & wow your users.
              Build Faster, Launch Smarter!
            </h1>

            <p className="my-4 sm:my-6 font-mono text-xs sm:text-sm md:text-base leading-relaxed text-foreground/70 tracking-wide w-full">
              Browse quality web templates for professional websites, personal
              projects, and online services. Free and premium, easy to
              customize, quick export and deploy.
            </p>

            <CTAButtons />
          </div>

          {/* Right section - Responsive widths */}
          <div className="p-6 md:p-8 lg:p-10 border-t xl:border-t-0 xl:border-l border-foreground/15 w-full xl:w-2/5">
            <div className="relative flex flex-col items-start justify-between z-10 text-xs sm:text-sm md:text-base text-muted-foreground font-mono leading-relaxed tracking-wide w-full h-full gap-3 sm:gap-4">
              <p>
                Thanks for exploring{" "}
                <span className="font-bold text-foreground uppercase">
                  {brandName.slice(0, 4)}
                </span>
                <span className="font-bold text-primary uppercase">
                  {brandName.slice(4, 8)}
                </span>{" "}
                <span className="font-bold text-foreground uppercase">
                  {brandName.slice(8)} !
                </span>{" "}
                These templates are crafted to save your time, energy and to
                boost your productivity. Your feedback inspires continuous
                improvements and also do share your ideas.
              </p>

              <span className="text-blue-500 text-xs sm:text-sm wrap-break-words">
                #development #frontend #readymadeui #buildinginpublic
                #modernwebdev
              </span>

              <Quote className="absolute -top-10 sm:-top-20 md:-top-1/2 -right-10 sm:-right-20 md:-right-1/3 size-40 sm:size-60 md:size-80 opacity-10" />

              {/* Testimonial Footer with Avatar - Responsive */}
              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 font-sans bg-muted/40 border backdrop-blur-md rounded-sm w-full">
                <Link
                  href={portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grayscale-100 hover:grayscale-0 transition-all duration-500 shrink-0"
                >
                  <Image
                    src="/vinu.jpg"
                    alt={authorName}
                    width={500}
                    height={500}
                    className="size-8 sm:size-10 md:size-12 rounded"
                  />
                </Link>
                <div className="text-foreground min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm md:text-lg opacity-30 font-semibold uppercase truncate">
                    {authorName}
                  </h4>
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs md:text-sm font-medium">
                    <span className="truncate">Author - {brandName}</span>
                    <Separator orientation="vertical" className="h-3 sm:h-4" />
                    <Link
                      href={handle}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline truncate"
                    >
                      @thevinayakgore
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Background decorative image - Responsive positioning */}
          <Image
            src="/send.png"
            alt="Send Image"
            width={2000}
            height={2000}
            className="absolute inset-0 -top-10 sm:-top-20 -left-1/4 sm:-left-1/5 rotate-12 size-100 sm:size-150 md:size-200 grayscale-100 opacity-10 pointer-events-none"
          />

          <BorderBeam
            duration={6}
            size={400}
            className="from-transparent via-primary to-transparent"
          />
          <BorderBeam
            duration={6}
            delay={3}
            size={400}
            className="from-transparent via-green-500 to-transparent"
          />
        </div>

        {/* Decorative Icons - Responsive positioning */}
        <div className="hidden sm:block">
          {[
            { position: "-top-5 -left-5", color: "bg-primary" },
            { position: "-bottom-5 -right-5", color: "bg-green-500" },
          ].map(({ position, color }, i) => (
            <div key={i}>
              {[5, 15, 20].map((scale, j) => (
                <motion.span
                  key={j}
                  className={`absolute ${position} -z-10 size-6 sm:size-10 ${color} rounded-full`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{
                    scale: [scale * 0.4, scale * 1, scale * 0.4],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeatDelay: 10,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="hidden sm:block">
          {[
            { position: "-top-5 -right-5", color: "bg-primary" },
            { position: "-bottom-5 -left-5", color: "bg-green-500" },
          ].map(({ position, color }, i) => (
            <div key={i}>
              {[5, 15, 20].map((scale, j) => (
                <motion.span
                  key={j}
                  className={`absolute ${position} -z-10 size-6 sm:size-10 ${color} rounded-full`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{
                    scale: [scale * 0.4, scale * 1, scale * 0.4],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 10,
                    delay: 10,
                    repeatDelay: 10,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
