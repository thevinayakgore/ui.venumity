"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Folder,
  User,
  Settings,
  BarChart3,
  PlusSquare,
  Search,
  Palette,
  FileText,
  Users,
  MessageSquare,
  Bell,
  Code2,
  Terminal,
  Bug,
  Shield,
  Database,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type CommandItemType = {
  icon: LucideIcon;
  label: string;
  shortcut: string;
};

const commandGroups: {
  heading: string;
  items: CommandItemType[];
}[] = [
  {
    heading: "Navigation",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", shortcut: "⌘KD" },
      { icon: Folder, label: "Projects", shortcut: "⌘KP" },
      { icon: User, label: "Profile", shortcut: "⌘KU" },
    ],
  },
  {
    heading: "Management",
    items: [
      { icon: PlusSquare, label: "New Project", shortcut: "⌘KN" },
      { icon: Settings, label: "Settings", shortcut: "⌘KS" },
      { icon: BarChart3, label: "Analytics", shortcut: "⌘KA" },
    ],
  },
  {
    heading: "Search & Preferences",
    items: [
      { icon: Search, label: "Search Files", shortcut: "⌘KF" },
      { icon: Palette, label: "Change Theme", shortcut: "⌘KT" },
      { icon: Palette, label: "Language", shortcut: "⌘KL" },
      { icon: Palette, label: "Region", shortcut: "⌘KR" },
    ],
  },
  {
    heading: "Content",
    items: [
      { icon: FileText, label: "All Articles", shortcut: "⌘CA" },
      { icon: FileText, label: "New Article", shortcut: "⌘CN" },
      { icon: FileText, label: "Drafts", shortcut: "⌘CD" },
    ],
  },
  {
    heading: "Collaboration",
    items: [
      { icon: Users, label: "Team Members", shortcut: "⌘TM" },
      { icon: MessageSquare, label: "Messages", shortcut: "⌘MG" },
      { icon: Bell, label: "Notifications", shortcut: "⌘NT" },
    ],
  },
  {
    heading: "Developer",
    items: [
      { icon: Code2, label: "API Explorer", shortcut: "⌘AP" },
      { icon: Terminal, label: "CLI Tools", shortcut: "⌘CL" },
      { icon: Bug, label: "Report Issue", shortcut: "⌘BG" },
    ],
  },
  {
    heading: "System",
    items: [
      { icon: Shield, label: "Security", shortcut: "⌘SC" },
      { icon: Database, label: "Database", shortcut: "⌘DB" },
      { icon: Activity, label: "System Status", shortcut: "⌘SS" },
    ],
  },
];

function AnimatedText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-flex flex-wrap">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ x: -10, opacity: 0.2, filter: "blur(10px)" }}
          animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 1,
            delay: delay,
            ease: "easeOut",
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "v") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="p-6 font-medium cursor-pointer border-2 bg-background hover:bg-primary! hover:border-white! shadow-none hover:shadow-xl shadow-primary/30 transition-all duration-500"
      >
        All Commands
      </Button>

      <AnimatePresence>
        {open && (
          <CommandDialog
            open={open}
            onOpenChange={setOpen}
            className="border-7 rounded-3xl overflow-hidden max-w-sm!"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 10, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Command className="">
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>

                  {commandGroups.map((group, index) => (
                    <div key={group.heading}>
                      <CommandGroup heading={group.heading}>
                        {group.items.map((cmd, index) => (
                          <CommandItem
                            key={cmd.label}
                            onSelect={() => setOpen(false)}
                            className="py-2! cursor-pointer font-medium text-sm leading-none transition-all duration-500"
                          >
                            <div className="flex items-center gap-3 w-full">
                              <cmd.icon className="size-4!" />
                              <span className="font-medium">
                                <AnimatedText
                                  key={`${cmd.label}-${index}`}
                                  text={cmd.label}
                                  delay={index * 0.5}
                                />
                              </span>
                              <CommandShortcut>{cmd.shortcut}</CommandShortcut>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      {index !== commandGroups.length - 1 && (
                        <CommandSeparator className="my-1" />
                      )}
                    </div>
                  ))}

                  <div className="sticky bottom-0 flex items-center justify-between p-3 mt-2 bg-popover border-t text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <kbd className="rounded border bg-muted px-1.5 py-0.5">
                          ↑
                        </kbd>
                        <kbd className="rounded border bg-muted px-1.5 py-0.5">
                          ↓
                        </kbd>
                        Navigate
                      </span>
                      <span className="flex items-center gap-1">
                        <kbd className="rounded border bg-muted px-1.5 py-0.5">
                          ↵
                        </kbd>
                        Select
                      </span>
                    </div>
                    <span className="flex items-center gap-1">
                      Close
                      <kbd className="rounded border bg-muted px-1.5 py-0.5">
                        Esc
                      </kbd>
                    </span>
                  </div>
                </CommandList>
              </Command>
            </motion.div>
          </CommandDialog>
        )}
      </AnimatePresence>
    </>
  );
}
