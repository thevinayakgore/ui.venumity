"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

export default function SupportFaqAdvancedAccordion() {
  const faqs: FaqItem[] = [
    {
      id: 1,
      question: "How quickly do you respond during active projects?",
      answer:
        "Slack messages are typically answered the same day, with a dedicated weekly async update summarizing decisions, open questions, and next steps.",
    },
    {
      id: 2,
      question: "What is the best way to share context?",
      answer:
        "Links to your product, screenshots, and short Looms help a lot. The more real examples you share, the more precise the support can be.",
    },
    {
      id: 3,
      question: "Can we request follow-up iterations after launch?",
      answer:
        "Yes. Many teams extend support for a few weeks after launch to refine details based on real usage and product metrics.",
    },
  ];

  const [openId, setOpenId] = useState<number | null>(faqs[0]?.id ?? null);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full bg-white dark:bg-black"
    >
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-3xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-6 py-7 sm:px-8 sm:py-8 shadow-sm"
      >
        <div className="mb-5 space-y-2">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Support FAQ
          </p>
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
            Answers to the most common questions that come up during projects.
          </p>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.06,
              },
            },
          }}
          className="space-y-2"
        >
          {faqs.map((item) => {
            const isOpen = item.id === openId;
            return (
              <motion.article
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.22 } },
                }}
                className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-3 sm:px-5 sm:py-3.5"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="mt-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                    <p className="text-xs sm:text-sm font-medium text-neutral-900 dark:text-neutral-50">
                      {item.question}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900"
                  >
                    <ChevronRight className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="border-t border-neutral-200 dark:border-neutral-800"
                    >
                      <p className="px-4 py-3 sm:px-5 sm:py-3 text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </motion.div>
      </motion.section>
    </motion.main>
  );
}
