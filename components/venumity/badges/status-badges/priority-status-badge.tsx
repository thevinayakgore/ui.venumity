"use client";
import { Badge } from "@/components/ui/badge";
import {
  TrendingDown,
  Flag,
  TrendingUp,
  Ban,
  TrendingUpDown,
} from "lucide-react";

export default function PriorityStatusBadge() {
  return (
    <div className="flex flex-wrap items-center justify-center m-auto gap-3 p-5 md:p-10 max-w-3xl w-full h-full">
      {/* High */}
      <Badge className="gap-2 [&>svg]:size-4! px-2 py-3.5 text-xs bg-foreground/5 border-foreground/10 text-foreground shadow-md/10 rounded-sm transition-all duration-500">
        <TrendingUp />
        <span className="font-medium text-sm leading-none">High</span>
        <span className="size-4 bg-green-500 rounded" />
      </Badge>

      {/* Medium */}
      <Badge className="gap-2 [&>svg]:size-4! px-2 py-3.5 text-xs bg-foreground/5 border-foreground/10 text-foreground shadow-md/10 rounded-sm transition-all duration-500">
        <TrendingUpDown />
        <span className="font-medium text-sm leading-none">Medium</span>
        <span className="size-4 bg-yellow-400 rounded" />
      </Badge>

      {/* Low */}
      <Badge className="gap-2 [&>svg]:size-4! px-2 py-3.5 text-xs bg-background! border-foreground/10 text-foreground rounded-sm transition-all duration-500">
        <TrendingDown />
        <span className="font-medium text-sm leading-none">Low</span>
        <span className="size-4 bg-red-500 rounded" />
      </Badge>

      {/* Critical */}
      <Badge className="gap-2 [&>svg]:size-4! px-2 py-3.5 text-xs bg-orange-600! text-white rounded-sm transition-all duration-500">
        <Flag />
        <span className="font-medium text-sm leading-none">Critical</span>
      </Badge>

      {/* Blocked */}
      <Badge className="gap-2 [&>svg]:size-4! px-2 py-3.5 text-xs bg-red-500! text-white rounded-sm transition-all duration-500">
        <Ban />
        <span className="font-medium text-sm leading-none">Blocked</span>
      </Badge>
    </div>
  );
}
