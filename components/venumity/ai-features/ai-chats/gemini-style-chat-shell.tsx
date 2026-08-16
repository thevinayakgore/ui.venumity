"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Mic, Paperclip, PanelLeft, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

type ChatItem = {
  id: string;
  title: string;
  active?: boolean;
};

const chats: ChatItem[] = [
  { id: "1", title: "Design a cleaner dashboard", active: true },
  { id: "2", title: "Rewrite hero copy" },
  { id: "3", title: "Build a pricing section" },
  { id: "4", title: "Compare auth providers" },
];

function ShellLogo() {
  return (
    <div className="size-5">
      <Image
        src="/assets/gemini.webp"
        alt="Gemini Logo"
        width={200}
        height={200}
        className="object-cover w-full h-full"
      />
    </div>
  );
}

function SidebarLink({
  item,
  collapsed,
}: {
  item: ChatItem;
  collapsed: boolean;
}) {
  return (
    <button
      className={cn(
        "group rounded-full px-3.5 py-1.5 text-left text-sm transition-all duration-500 w-full",
        item.active
          ? "bg-muted text-foreground"
          : "text-foreground/40 hover:bg-muted/70 hover:text-foreground",
      )}
    >
      {!collapsed && <span className="truncate">{item.title}</span>}
    </button>
  );
}

export default function GeminiStyleChatShell() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [value, setValue] = useState("");

  const canSend = value.trim().length > 0;

  return (
    <main className="flex h-dvh w-full overflow-hidden bg-background text-foreground">
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.button
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/20 md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar overlay"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          width: sidebarOpen ? 280 : 60,
          x: mobileOpen ? 0 : undefined,
        }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "z-40 flex h-full shrink-0 flex-col border-r border-border bg-muted/30",
          "fixed left-0 top-0 md:static",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="h-15 p-3">
          {sidebarOpen ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <ShellLogo />
                <span className="font-semibold">Gemini Shell</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="p-4.5! hidden md:inline-flex rounded-full"
                aria-label="Toggle sidebar"
                onClick={() => setSidebarOpen((prev) => !prev)}
              >
                <PanelLeft className="size-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle sidebar"
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="p-4.5! hidden md:inline-flex rounded-full"
            >
              <PanelLeft className="size-4" />
            </Button>
          )}
        </div>

        <div className="px-3">
          <Button
            variant="ghost"
            className="gap-2! font-semibold bg-background! hover:bg-blue-500! hover:border-blue-500 hover:text-white! rounded-full w-full"
          >
            <Plus className="size-4" />
            {sidebarOpen && <span>New chat</span>}
          </Button>
        </div>

        <div className="p-3 pt-1">
          <Button
            variant="ghost"
            className="px-2! items-center justify-start text-start shadow-none rounded-full w-full"
          >
            <Search className="size-4" />
            {sidebarOpen && <span>Search chats</span>}
          </Button>
        </div>

        {sidebarOpen && (
          <ScrollArea className="flex-1 px-3 py-5 mt-2 border-t border-dashed w-full">
            <div className="space-y-0.75">
              <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-widest text-foreground/40">
                Recent Chats
              </p>
              {chats.map((item) => (
                <SidebarLink
                  key={item.id}
                  item={item}
                  collapsed={!sidebarOpen}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </motion.aside>

      <div className="relative flex flex-1 flex-col w-full h-full">
        <Button className="absolute top-3 right-3 pl-3 pr-5 h-10 gap-1.5 text-base font-semibold bg-sky-700! text-sky-200! rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4.5 fill-sky-200"
          >
            <path d="M12.983 21.186a1 1 0 0 1-1.966 0 10 10 0 0 0-8.203-8.203 1 1 0 0 1 0-1.966 10 10 0 0 0 8.203-8.203 1 1 0 0 1 1.966 0 10 10 0 0 0 8.203 8.203 1 1 0 0 1 0 1.966 10 10 0 0 0-8.203 8.203" />
          </svg>
          Upgrade
        </Button>

        <section className="flex flex-col items-center justify-center m-auto gap-5 md:gap-8 text-center w-full">
          <h1 className="relative z-50 text-3xl md:text-4xl">
            What&apos;s next, Vinayak ?
          </h1>

          <div className="relative z-50 flex items-start bg-card rounded-full max-w-xl m-auto w-full">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="m-2 size-10 shrink-0 hover:bg-foreground/5! rounded-full text-foreground"
              aria-label="Add tools"
            >
              <Plus className="size-5" />
            </Button>

            <Textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Ask Gemini"
              rows={1}
              className={cn(
                "flex-1 resize-none border-0 bg-transparent! -ml-4 p-4 text-sm shadow-none min-h-10 rounded-full",
                "placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:ring-offset-0 md:text-base",
              )}
            />

            <div className="flex items-center gap-1 m-2 self-end">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Attach file"
                className="size-10 rounded-full"
              >
                <Paperclip className="size-4" />
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Voice input"
                className="size-10 rounded-full"
              >
                <Mic className="size-4" />
              </Button>

              <Button
                type="button"
                size="icon"
                disabled={!canSend}
                aria-label="Send message"
                className="size-10 bg-foreground! text-secondary! rounded-full"
              >
                <ArrowUp className="size-4" />
              </Button>
            </div>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 mt-5 md:mt-10 left-1/2 -translate-x-1/2 z-0 bg-blue-600/30 blur-[5rem] rounded-full h-60 w-200" />
        </section>
      </div>
    </main>
  );
}
