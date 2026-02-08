"use client";
import { motion, LayoutGroup } from "framer-motion";
import { useState } from "react";

type CloudFaq = {
  id: number;
  label: string;
  answer: string;
};

export default function FaqQuestionCloud() {
  const items: CloudFaq[] = [
    {
      id: 1,
      label: "How do we flag urgent issues?",
      answer:
        "Mark messages with a clear “urgent” prefix in Slack and include impact and links. They are handled first.",
    },
    {
      id: 2,
      label: "What about small UI polish tweaks?",
      answer:
        "Group small tweaks into a single message where possible. They are reviewed together and prioritized in batches.",
    },
    {
      id: 3,
      label: "Can we get async Loom feedback?",
      answer:
        "Yes. Looms are ideal for walking through flows. Expect detailed comments and a written summary if needed.",
    },
  ];

  const [activeId, setActiveId] = useState<number>(1);
  const active = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-10 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full bg-white dark:bg-black"
    >
      <LayoutGroup>
        <section className="w-full max-w-4xl rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-6 py-7 sm:px-8 sm:py-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.1fr)]">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
                Support FAQ
              </p>
              <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
                Hover a question to see how that situation is usually handled.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {items.map((item) => {
                  const isActive = item.id === activeId;
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      layout
                      onMouseEnter={() => setActiveId(item.id)}
                      className={`relative rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs transition-colors ${
                        isActive
                          ? "bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900"
                          : "bg-white text-neutral-700 dark:bg-black dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="faq-cloud-pill"
                          className="absolute inset-0 rounded-full bg-neutral-900 dark:bg-neutral-100"
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <motion.div
              layout
              className="relative rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-4 sm:px-5 sm:py-5"
            >
              <motion.div
                key={active.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="space-y-2"
              >
                <p className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                  {active.label}
                </p>
                <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400">
                  {active.answer}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </LayoutGroup>
    </motion.main>
  );
}
