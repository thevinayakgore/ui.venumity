"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, Clock3 } from "lucide-react";
import { useState } from "react";

type ChannelKey = "brief" | "support" | "async";

type ChannelConfig = {
  label: string;
  description: string;
  email: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  responseTime: string;
};

export default function ContactInfoChannelSelector() {
  const [active, setActive] = useState<ChannelKey>("brief");

  const channels: Record<ChannelKey, ChannelConfig> = {
    brief: {
      label: "New project",
      description: "Use this when you want to explore a new product engagement.",
      email: "projects@example.com",
      icon: Mail,
      responseTime: "Within 24 hours",
    },
    support: {
      label: "In-progress support",
      description: "Questions about active work, flows, and design files.",
      email: "support@example.com",
      icon: MessageSquare,
      responseTime: "Same day on weekdays",
    },
    async: {
      label: "Asynchronous feedback",
      description: "Send structured feedback that can be reviewed in deep-work blocks.",
      email: "feedback@example.com",
      icon: Clock3,
      responseTime: "Within 48 hours",
    },
  };

  const activeConfig = channels[active];

  const variants = {
    container: {
      hidden: { opacity: 0, y: 16 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" },
      },
    },
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full bg-white dark:bg-black"
    >
      <motion.section
        variants={variants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-3xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-6 py-7 sm:px-8 sm:py-8 shadow-sm"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
              Contact
            </p>
            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
              Pick the channel that best matches the type of help you need.
            </p>
            <div className="inline-flex flex-wrap gap-2">
              {(Object.keys(channels) as ChannelKey[]).map((key) => {
                const config = channels[key];
                const isActive = key === active;
                const Icon = config.icon;
                return (
                  <motion.button
                    key={key}
                    layout
                    type="button"
                    onClick={() => setActive(key)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] sm:text-xs transition-colors ${
                      isActive
                        ? "border-neutral-900 bg-neutral-900 text-neutral-50 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
                        : "border-neutral-200 bg-white text-neutral-700 dark:border-neutral-800 dark:bg-black dark:text-neutral-300"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {config.label}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <motion.div
            layout
            className="mt-2 w-full max-w-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-4 py-4 sm:px-5 sm:py-5"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900">
                    <activeConfig.icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-50">
                      {activeConfig.label}
                    </p>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      {activeConfig.responseTime}
                    </p>
                  </div>
                </div>
                <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400">
                  {activeConfig.description}
                </p>
                <div className="flex flex-col gap-1">
                  <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                    Email
                  </p>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.01, x: 2 }}
                    className="inline-flex max-w-full items-center justify-between rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-[11px] sm:text-xs text-neutral-800 dark:text-neutral-200"
                  >
                    <span className="truncate">{activeConfig.email}</span>
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>
    </motion.main>
  );
}
