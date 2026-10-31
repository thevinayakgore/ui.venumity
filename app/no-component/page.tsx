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
    <div className="aspect-5/2.5 flex flex-col items-center justify-center m-auto p-3 sm:p-5 md:p-10 bg-linear-to-t from-cyan-500/40 via-cyan-500/5 backdrop-blur-xl to-background border-3 border-background ring-5 ring-cyan-500/80 overflow-hidden rounded-2xl w-full">
      {/* Grid overlay */}
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#bfbfbf2e_1px,transparent_1px),linear-gradient(to_bottom,#bfbfbf2e_1px,transparent_1px)] bg-size-[55px_55px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_150%)] opacity-70"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-between gap-5 text-center w-full h-full">
        {/* Code‑like top bar */}
        <div className="flex items-center justify-between bg-background p-2 sm:p-4 text-xs font-mono uppercase tracking-[0.2em] text-foreground border border-cyan-500/60 shadow-lg shadow-cyan-500/20 rounded-lg w-full">
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

        <div className="flex flex-col items-center w-full">
          {/* Big 404 + message */}
          <motion.div
            variants={float}
            className="mt-5 mb-3 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 font-semibold tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-6xl"
          >
            <span className="bg-linear-to-br from-blue-400 via-sky-400 to-emerald-400 pb-2 sm:pb-3 bg-clip-text text-transparent dark:drop-shadow-[0_0_20px_rgba(56,189,248,0.55)]">
              Coming Soon
            </span>
            <span className="font-extralight text-foreground/30 sm:inline-block pb-2 sm:pb-3 hidden">
              |
            </span>
            <span className="text-2xl sm:text-3xl text-foreground/30 sm:inline-block pb-2 sm:pb-3">
              Oops.
            </span>
          </motion.div>

          <motion.p
            variants={float}
            className="text-xs sm:text-sm md:text-base opacity-40! max-w-2xl px-4 sm:px-0"
          >
            {error ||
              "This component is currently under active development. It will be available here once implementation and documentation are complete."}
          </motion.p>
        </div>

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
          className="text-xs sm:text-sm tracking-wide"
        >
          We are building this component and our other components / sources are
          available in the meantime.
        </motion.p>
      </div>
    </div>
  );
}
