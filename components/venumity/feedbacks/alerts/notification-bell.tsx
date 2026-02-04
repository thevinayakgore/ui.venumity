// components/feedback/notification-bell.tsx
"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type NotificationBellProps = {
  count?: number;
};

export default function NotificationBell({ count = 0 }: NotificationBellProps) {
  const [open, setOpen] = useState(false);

  const hasUnread = count > 0;

  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className="relative inline-flex items-center justify-center m-auto size-10 rounded-full border bg-background text-foreground shadow-sm transition hover:bg-muted"
    >
      <Bell className="h-4 w-4" />
      {hasUnread && (
        <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium text-white">
          {count > 9 ? "9+" : count}
        </span>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 top-10 z-20 w-64 rounded-lg border bg-popover p-3 text-xs shadow-lg"
          >
            <p className="font-medium mb-1">Notifications</p>
            <p className="text-muted-foreground">
              {hasUnread
                ? "You have unread activity."
                : "You’re all caught up ✨"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
