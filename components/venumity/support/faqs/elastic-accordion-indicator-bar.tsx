"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

export default function FaqElasticAccordion() {
  const items: FaqItem[] = [
    {
      id: 1,
      question: "How does support work during a live product launch?",
      answer:
        "Live launches get priority. A dedicated Slack thread remains open, and design questions are answered within a few hours during business time.",
    },
    {
      id: 2,
      question: "What is the best channel for non-urgent questions?",
      answer:
        "Detailed, non-urgent questions are best shared over email or in a shared doc with screenshots and links. These get a structured response once a day.",
    },
    {
      id: 3,
      question: "Can we request a quick review before shipping a feature?",
      answer:
        "Yes. Send a Loom or screenshots with context. Most small reviews can be turned around within 24 hours on weekdays.",
    },
  ];

  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-10 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full bg-white dark:bg-black"
    >
      <section className="w-full max-w-3xl rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-6 py-7 sm:px-8 sm:py-8 shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Support FAQ
            </p>
            <p className="mt-1 text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
              How support behaves when your team is shipping quickly.
            </p>
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 56 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="hidden sm:block h-1 rounded-full bg-linear-to-r from-neutral-900 via-neutral-700 to-neutral-500 dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-500"
          />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.06 },
            },
          }}
          className="space-y-3"
        >
          {items.map((item, index) => {
            const isOpen = item.id === openId;
            const delay = 0.05 + index * 0.04;
            return (
              <motion.article
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.26, delay },
                  },
                }}
                className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-4 py-3 sm:px-5 sm:py-4"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                    <p className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                      {item.question}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 1.05 : 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900"
                  >
                    <ChevronRight className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, y: -6 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -4 }}
                      transition={{ duration: 0.26, ease: "easeOut" }}
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
      </section>
    </motion.main>
  );
}
