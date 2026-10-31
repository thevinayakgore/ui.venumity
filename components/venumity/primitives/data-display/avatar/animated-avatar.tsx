"use client";
import { useState } from "react";
import { Play } from "lucide-react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  type AvatarAnimation,
} from "./index";

const ANIMATIONS: AvatarAnimation[] = [
  "none",
  "fade",
  "scale",
  "pop",
  "slide",
  "reveal",
  "ring",
];

function Trigger({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-xs font-medium transition-colors " +
        (active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-accent")
      }
    >
      {children}
    </button>
  );
}

export default function AnimatedAvatarDemo() {
  const [key, setKey] = useState(0);

  return (
    <div className="space-y-4">
      <Trigger onClick={() => setKey((k) => k + 1)}>
        <Play className="size-3" />
        Replay all
      </Trigger>

      <div className="flex flex-wrap items-center gap-6">
        {ANIMATIONS.map((a) => (
          <div key={`${a}-${key}`} className="flex flex-col items-center gap-2">
            <Avatar
              key={`${a}-${key}`}
              size="lg"
              status="online"
              animation={a}
              tooltip={`animation = "${a}"`}
            >
              <AvatarImage src="https://i.pravatar.cc/150?img=47" alt="Alice" />
              <AvatarFallback>Alice Johnson</AvatarFallback>
            </Avatar>
            <span className="text-[10px] tracking-wider text-muted-foreground uppercase">
              {a}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
