"use client";
import { motion, spring } from "motion/react";

const float = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: spring, stiffness: 120, damping: 18 },
  },
};

export default function NoComponent({
  error,
  componentItemName,
}: {
  error?: string;
  componentItemName?: string;
}) {
  return (
    <>
      <div
        className={`flex flex-col items-center justify-center m-auto overflow-hidden rounded-lg p-4 sm:p-6 md:p-9 pb-0! backdrop-blur-xl w-full h-full`}
      >
        {/* Grid overlay */}
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#bfbfbf2e_1px,transparent_1px),linear-gradient(to_bottom,#bfbfbf2e_1px,transparent_1px)] bg-size-[55px_55px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_150%)] opacity-50"></div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full h-full">
          {/* Code‑like top bar */}
          <div className="absolute left-0 top-0 flex items-center justify-between font-normal w-full rounded-sm border border-foreground/15 bg-background p-2 sm:p-2.5 text-xs font-mono uppercase tracking-[0.2em] text-foreground">
            <span className="flex items-center gap-1">
              <span className="size-2 sm:size-2.5 rounded-full bg-red-500" />
              <span className="size-2 sm:size-2.5 rounded-full bg-yellow-400" />
              <span className="size-2 sm:size-2.5 rounded-full bg-green-500" />
              <span className="ml-1 sm:ml-2 text-[10px]">
                status : 404_not_found
              </span>
            </span>
            <span className="text-[10px]">
              route / {componentItemName || "<Preparing_Soon/>"}
            </span>
          </div>

          {/* Big 404 + message */}
          <motion.div
            variants={float}
            className="mb-3 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 font-semibold tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-6xl"
          >
            <span className="bg-linear-to-br from-blue-400 via-sky-400 to-emerald-400 pb-2 sm:pb-3 bg-clip-text text-transparent dark:drop-shadow-[0_0_20px_rgba(56,189,248,0.55)]">
              Coming Soon
            </span>
            <span className="font-extralight opacity-10 sm:inline-block pb-2 sm:pb-3 hidden">
              |
            </span>
            <span className="text-2xl sm:text-3xl opacity-20 sm:inline-block pb-2 sm:pb-3">
              Oops.
            </span>
          </motion.div>

          <motion.p
            variants={float}
            className="text-xs sm:text-sm md:text-base opacity-50! max-w-2xl px-4 sm:px-0"
          >
            {error ||
              "This component is currently under active development. It will be available here once implementation and documentation are complete."}
          </motion.p>

          {/* Accent tagline */}
          <motion.p
            variants={float}
            className="my-6 sm:my-8 md:my-10 text-xs font-mono font-medium uppercase tracking-[0.3em] text-sky-500"
          >
            explore_other_components();
          </motion.p>

          {/* Bottom subtle hint */}
          <motion.p
            variants={float}
            className="text-[10px] sm:text-[11px] font-mono font-light tracking-normal opacity-50! px-4 sm:px-0"
          >
            We are building this component and our other components / sources
            are available in the meantime.
          </motion.p>
        </div>
      </div>
    </>
  );
}
