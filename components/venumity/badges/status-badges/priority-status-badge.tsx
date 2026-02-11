"use client";
import {
  SeparatorHorizontal,
  TrendingDown,
  Flag,
  TrendingUp,
  Ban,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type PriorityStatusBadgeProps = {
  priority?: "low" | "medium" | "high" | "critical" | "blocked";
  text?: string;
  color?: string;
  icon?: LucideIcon;
  outline?: boolean;
  className?: string;
};

export function PriorityBadge({
  priority = "medium",
  text,
  color,
  icon,
  outline,
  className,
}: PriorityStatusBadgeProps) {
  const priorityConfig: Record<
    "low" | "medium" | "high" | "critical" | "blocked",
    { color: string; text: string; icon: LucideIcon; outline?: boolean }
  > = {
    low: {
      color: "bg-orange-500",
      text: "Low",
      icon: TrendingDown,
      outline: true,
    },
    medium: {
      color: "bg-yellow-400",
      text: "Medium",
      icon: SeparatorHorizontal,
    },
    high: { color: "bg-green-500", text: "High", icon: TrendingUp },
    critical: {
      color: "bg-red-500",
      text: "Critical",
      icon: Flag,
      outline: true,
    },
    blocked: { color: "bg-zinc-500", text: "Blocked", icon: Ban },
  };

  const config = priorityConfig[priority];

  const Icon = icon ?? config.icon;

  return (
    <div
      className={cn("p-0", className)}
    >
      <Badge
        variant={(outline ?? config.outline) ? "outline" : "secondary"}
        className={cn(
          "flex items-center gap-2 px-3 py-2 shadow-lg/5 rounded-sm",
          outline && "bg-accent dark:bg-popover",
        )}
      >
        <Icon className="size-4" />
        <span className="font-medium text-sm leading-none">
          {text ?? config.text}
        </span>

        {color && <span className={cn(`ml-1 size-3 rounded-full`, color)} />}
      </Badge>
    </div>
  );
}

export default function PriorityStatusBadgeDemo() {
  return (
    <main className="flex flex-wrap items-center justify-center m-auto gap-4 p-6 sm:p-10 max-w-4xl overflow-auto w-full">
      <PriorityBadge priority="high" text="High" color="bg-emerald-500" />
      <PriorityBadge
        priority="medium"
        text="Medium"
        color="bg-purple-500"
        icon={Flag}
        outline
      />
      <PriorityBadge priority="low" text="Low" />
      <PriorityBadge priority="critical" text="Critical" />
      <PriorityBadge priority="blocked" />
    </main>
  );
}
