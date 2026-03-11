"use client";
import { motion } from "motion/react";
import { Star, Rocket } from "lucide-react";
import CTAButtons from "../common/cta-buttons";
import { BorderBeam } from "@/components/ui/border-beam";

function AxisGrid({ size, position }: { size: string; position: string }) {
  return (
    <div className={`absolute ${position} -z-10 p-2 ${size}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-linear-to-t from-foreground/3 via-foreground/15 to-foreground/3 w-[1.5px] h-full" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 bg-linear-to-l from-foreground/3 via-foreground/15 to-foreground/3 w-full h-[1.5px]" />
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-foreground/30 backdrop-blur-md size-2 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-0 bg-transparent/95 backdrop-blur-md size-4 rounded-full" />
    </div>
  );
}

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
    duration: 10,
    repeat: Infinity,
    ease: (t: number) => t,
  },
};

const BORDER_BEAMS = [
  { duration: 6, className: "from-transparent via-pink-500 to-transparent" },
  {
    duration: 6,
    delay: 3,
    className: "from-transparent via-blue-500 to-transparent",
  },
];

export default function CTA() {
  return (
    <section className="relative w-full">
      <h1 className="absolute top-0 md:-top-15 xl:-top-30 left-1/2 -translate-x-1/2 text-center text-7xl md:text-[12rem] lg:text-[14rem] xl:text-[20rem] uppercase tracking-wide whitespace-nowrap font-extrabold text-transparent bg-clip-text bg-linear-to-b from-foreground/15 via-foreground/5 leading-none">
        Explore
      </h1>
      <div className="px-4 sm:px-6 lg:px-10 mt-12 sm:mt-16 lg:mt-20 w-full">
        <div className="p-4 md:p-6 xl:p-8 bg-foreground/3 backdrop-blur-sm border rounded-2xl sm:rounded-3xl lg:rounded-4xl w-full h-full">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl bg-linear-to-tl from-foreground/2 via-background/80 to-foreground/2 backdrop-blur-sm border p-6 sm:p-10 md:p-16 lg:p-20">
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 sm:gap-3 py-1.5 sm:py-2 px-3 sm:px-4 mb-8 sm:mb-12 bg-background border-2 sm:border-4 border-foreground/15 border-b-primary inset-shadow-sm inset-shadow-foreground/30 shadow-xl shadow-primary/30 rounded-full w-auto">
                <Rocket className="w-4 h-4" />
                <span className="uppercase font-bold text-sm">
                  Build Faster + Launch Smarter
                </span>
              </div>

              <h1 className="orbitron uppercase text-3xl sm:text-5xl xl:text-[4.5rem] font-extrabold! leading-tight xl:leading-22 mb-4 sm:mb-5">
                <span className="opacity-10">Latest UI</span> <br />
                <motion.span
                  className="relative bg-clip-text text-transparent -mx-2 sm:-mx-6 lg:-mx-10 px-2 sm:px-6 lg:px-10!"
                  {...GRADIENT_ANIMATION}
                >
                  Superpower
                  <motion.div
                    className="absolute inset-0 -z-10 opacity-30 blur-3xl rounded-full w-auto h-full"
                    {...GRADIENT_ANIMATION}
                  />
                </motion.span>{" "}
                <span className="opacity-10">for</span> <br />
                <span className="opacity-10">the Modern Web</span>{" "}
                <span>🎉</span>
              </h1>

              <p className="text-foreground/90 text-base sm:text-lg mb-8 sm:mb-10 max-w-4xl mx-auto px-2 sm:px-0">
                Build with{" "}
                <strong className="text-foreground font-medium">Next.js</strong>
                , scale with{" "}
                <strong className="text-foreground font-medium">React</strong>,
                ship fast using{" "}
                <strong className="text-foreground font-medium">Vite</strong>,
                style with{" "}
                <strong className="text-foreground font-medium">
                  Tailwind CSS
                </strong>
                , animate with{" "}
                <strong className="text-foreground font-medium">
                  Framer Motion
                </strong>{" "}
                - all powered by beautiful, production-ready UI components !!
              </p>

              <CTAButtons />

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 sm:mt-10">
                <div
                  className="flex items-center gap-2 opacity-20"
                  title="Quality-focused UI components (not ratings)"
                  aria-label="Quality-focused UI components (not ratings)"
                >
                  <Star className="size-5 fill-current" />
                  <Star className="size-5 fill-current" />
                  <Star className="size-5 fill-current" />
                  <Star className="size-5 fill-current" />
                  <Star className="size-5 fill-current" />
                  <span className="sr-only">
                    Stars indicate quality and polish, not user ratings.
                  </span>
                </div>
                <span className="hidden sm:inline text-3xl leading-none opacity-30 font-mono font-thin!">
                  |
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-mono tracking-normal font-normal capitalize text-center">
                  <span className="opacity-50">Copy-Paste Ready</span>
                  <span className="relative size-2 z-50 mx-2 bg-primary opacity-100 scale-100 rounded-full transition-all duration-700">
                    <span className="absolute top-0 left-0 size-2 scale-130 bg-primary animate-ping rounded-full -z-10" />
                  </span>
                  <span className="opacity-50">Open-Source Library</span>
                  <span className="relative size-2 z-50 mx-2 bg-green-500 opacity-100 scale-100 rounded-full transition-all duration-700">
                    <span className="absolute top-0 left-0 size-2 scale-130 bg-green-500 animate-ping rounded-full -z-10" />
                  </span>
                  <span className="opacity-50">Developer First</span>
                </div>
              </div>
            </div>
            {BORDER_BEAMS.map((beam, i) => (
              <BorderBeam key={i} size={300} {...beam} />
            ))}
            <AxisGrid size="size-250 lg:size-400 xl:size-500" position="md:-top-115 md:-left-115 lg:-top-190 lg:-left-190 xl:-top-240 xl:-left-240" />
            {/* <AxisGrid size="size-60 lg:size-80 xl:size-120" position="-top-15 -left-15 xl:-top-25 -left-25" />
            <AxisGrid size="size-60 lg:size-80 xl:size-120" position="-bottom-15 -right-15 xl:-bottom-25 -right-25" />
            <AxisGrid size="size-200 lg:size-300 xl:size-500" position="-bottom-180 -right-180 xl:-bottom-240 -right-240" /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
