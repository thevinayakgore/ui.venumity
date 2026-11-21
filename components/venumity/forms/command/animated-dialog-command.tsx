"use client";
import { useEffect, useState } from "react";
import {
  Calendar,
  Calculator,
  CreditCard,
  Settings,
  Smile,
  User,
  Search,
  Moon,
  Sun,
  Laptop,
} from "lucide-react";
import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  CommandDialog,
  type CommandAnimation,
} from "./index";

export default function AnimatedDialogCommandDemo() {
  const [open, setOpen] = useState(false);
  const [animation, setAnimation] = useState<CommandAnimation>("scale");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(["scale", "slide", "elastic"] as CommandAnimation[]).map((a) => (
          <button
            key={a}
            onClick={() => setAnimation(a)}
            className={
              "inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm font-medium transition-colors " +
              (animation === a
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background hover:bg-muted")
            }
          >
            {a}
          </button>
        ))}
        <button
          onClick={() => setOpen(true)}
          className="inline-flex h-9 items-center gap-1.5 rounded-md bg-foreground px-3 text-sm font-medium text-background hover:opacity-90"
        >
          <Search className="size-3.5" />
          Open palette (⌘K)
        </button>
      </div>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        animation={animation}
        side="top"
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => setOpen(false)}>
              <Calendar /> Calendar
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <Smile /> Search Emoji
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <Calculator /> Calculator
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => setOpen(false)}>
              <User /> Profile
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <CreditCard /> Billing
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <Settings /> Settings
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => setOpen(false)}>
              <Sun /> Light
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <Moon /> Dark
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <Laptop /> System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
