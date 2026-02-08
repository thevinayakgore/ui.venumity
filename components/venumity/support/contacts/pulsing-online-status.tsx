"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Clock3, Globe2 } from "lucide-react";

export default function ContactInfoPulsingStatus() {
  const base = useMotionValue(0);
  const scale = useTransform(base, [0, 1], [1, 1.15]);
  const opacity = useTransform(base, [0, 1], [0.6, 0]);

  // Kick off a simple breathing loop
  base.set(0);
  setTimeout(() => base.set(1), 0);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full bg-white dark:bg-black"
    >
      <section className="relative w-full max-w-md rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 dark:bg-black px-6 py-7 sm:px-7 sm:py-8 overflow-hidden">
        <motion.div
          style={{ scale, opacity }}
          animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2.4,
            ease: "easeOut",
          }}
          className="pointer-events-none absolute -inset-6 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.30),transparent_60%)]"
        />
        <div className="relative space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-3 py-1.5 text-[11px] text-neutral-200">
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Currently online for support.
          </div>
          <p className="text-xs sm:text-sm text-neutral-200">
            Expect a quick reply for active projects; other questions will receive a response within a day.
          </p>
          <div className="grid gap-2 text-[11px] sm:text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <Clock3 className="h-3.5 w-3.5" />
              <span>Typical reply: under 24 hours on weekdays.</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe2 className="h-3.5 w-3.5" />
              <span>Timezone: CET · Shared overlap with Europe and US mornings.</span>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
