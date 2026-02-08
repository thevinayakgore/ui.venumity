"use client";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, SendHorizontal, X } from "lucide-react";
import { useState } from "react";

export default function HelpWidgetDraggableDock() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full bg-white dark:bg-black"
    >
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.18}
        className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3"
      >
        <AnimatePresence>
          {open && (
            <motion.section
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="w-72 sm:w-80 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 py-4 shadow-xl"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-50">
                    Support
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="mt-2 text-[11px] text-neutral-600 dark:text-neutral-400">
                Share a short note and a link to where you are stuck. You will get a response inside your workspace.
              </p>
              <form
                className="mt-3 space-y-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  setValue("");
                }}
              >
                <textarea
                  rows={3}
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  placeholder="Describe the issue briefly..."
                  className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-xs text-neutral-900 dark:text-neutral-50 outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-200 resize-none"
                />
                <button
                  type="submit"
                  disabled={value.trim().length === 0}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-3 py-2 text-xs font-medium text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 disabled:opacity-50"
                >
                  <SendHorizontal className="h-3.5 w-3.5" />
                  Send to support
                </button>
              </form>
            </motion.section>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
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
