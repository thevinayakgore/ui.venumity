"use client";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

type ItemKey = "email" | "phone" | "location";

type ItemConfig = {
  label: string;
  value: string;
  context: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function ContactInfoHoverReveal() {
  const [active, setActive] = useState<ItemKey>("email");

  const items: Record<ItemKey, ItemConfig> = {
    email: {
      label: "Email",
      value: "studio@example.com",
      context: "Best for briefs, documents, and links that need context.",
      icon: Mail,
    },
    phone: {
      label: "Phone",
      value: "+1 (407) 555-0199",
      context: "Use for time-sensitive questions or launch-critical issues.",
      icon: Phone,
    },
    location: {
      label: "Location",
      value: "Berlin, Germany · CET",
      context: "Expect overlap with Europe and US mornings.",
      icon: MapPin,
    },
  };

  const activeItem = items[active];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-10 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full bg-white dark:bg-black"
    >
      <LayoutGroup>
        <section className="w-full max-w-4xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-6 py-7 sm:px-8 sm:py-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)]">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
                Contact
              </p>
              <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
                Move your cursor across the options to see how each channel is used.
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {(Object.keys(items) as ItemKey[]).map((key) => {
                  const item = items[key];
                  const Icon = item.icon;
                  const isActive = key === active;
                  return (
                    <motion.button
                      key={key}
                      type="button"
                      layout
                      onMouseEnter={() => setActive(key)}
                      className="group relative flex items-center gap-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-3.5 py-2.5 text-left transition-colors"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="contact-hover-bg"
                          className="absolute inset-0 rounded-xl bg-neutral-900/5 dark:bg-neutral-50/5"
                        />
                      )}
                      <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 group-hover:scale-105 transition-transform">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="relative">
                        <p className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                          {item.label}
                        </p>
                        <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                          {item.value}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <motion.div
              layout
              className="relative rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-4 sm:px-5 sm:py-5"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="space-y-2"
                >
                  <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-50">
                    {activeItem.label}
                  </p>
                  <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400">
                    {activeItem.context}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </LayoutGroup>
    </motion.main>
  );
}
