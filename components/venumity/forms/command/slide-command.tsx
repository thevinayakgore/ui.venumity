"use client";
import { useState } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
} from "./index";

export default function SlideCommandDemo() {
  const [side, setSide] = useState<"top" | "bottom" | "left" | "right" | null>(
    null,
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(["top", "bottom", "left", "right"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSide(s)}
            className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-3 text-sm font-medium capitalize hover:bg-muted"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="max-w-md">
        {side ? (
          <Command key={side} animation="slide" side={side} className="h-auto">
            <CommandInput placeholder={`slide from ${side}`} />
            <CommandList>
              <CommandGroup heading="Direction">
                <CommandItem>Enters from the {side}</CommandItem>
                <CommandItem>Direction-aware spring</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        ) : (
          <div className="rounded-lg border border-dashed border-border/60 p-6 text-center text-sm text-muted-foreground">
            Pick a direction above.
          </div>
        )}
      </div>
    </div>
  );
}
