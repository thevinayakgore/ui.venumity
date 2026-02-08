"use client";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, SendHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function HelpWidgetTypingSupport() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTyping(true); // ✔ Safe
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex flex-col items-center justify-center m-auto gap-10 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full bg-white dark:bg-black"
    >
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.18}
        className="fixed bottom-8 right-6 z-30 flex flex-col items-end gap-3"
      >
        <AnimatePresence>
          {open && (
            <motion.section
              key="widget"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              className="w-72 sm:w-80 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-4 py-4 shadow-xl"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-50">
                      Support
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-neutral-500 dark:text-neutral-400">
                      <span className="h-1 w-1 rounded-full bg-emerald-500" />
                      <span>Usually replies in &lt; 24h</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-3 space-y-2">
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                  Send a quick note with links and context. You will receive a
                  reply inside your workspace.
                </p>
                <textarea
                  rows={3}
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  placeholder="Describe what you need help with..."
                  className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-3 py-2 text-xs text-neutral-900 dark:text-neutral-50 outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-200 resize-none"
                />
                <div className="flex items-center justify-between gap-3">
                  <div className="h-4">
                    <AnimatePresence initial={false}>
                      {typing && (
                        <motion.div
                          key="typing"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-1 text-[10px] text-neutral-500 dark:text-neutral-400"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-bounce" />
                          <span>Preparing reply...</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <button
                    type="button"
                    disabled={value.trim().length === 0}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-neutral-900 px-3 py-1.5 text-[11px] font-medium text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 disabled:opacity-50"
                  >
                    <SendHorizontal className="h-3.5 w-3.5" />
                    Send
                  </button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 shadow-lg"
        >
          <MessageCircle className="h-5 w-5" />
        </motion.button>
      </motion.div>
    </motion.main>
  );
}
