import {
  Ban,
  Flag,
  TrendingUp,
  TrendingDown,
  TrendingUpDown,
} from "lucide-react";
import { Badge } from "./index";

export default function PriorityBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="soft" className="gap-2 rounded-sm px-1.5 py-3">
        <TrendingUp />
        <span className="text-sm leading-none font-medium">High</span>
        <span className="size-3.5 rounded-[3px] bg-green-500" />
      </Badge>
      <Badge variant="soft" className="gap-2 rounded-sm px-1.5 py-3">
        <TrendingUpDown />
        <span className="text-sm leading-none font-medium">Medium</span>
        <span className="size-3.5 rounded-[3px] bg-yellow-400" />
      </Badge>
      <Badge variant="soft" className="gap-2 rounded-sm px-1.5 py-3">
        <TrendingDown />
        <span className="text-sm leading-none font-medium">Low</span>
        <span className="size-3.5 rounded-[3px] bg-red-500" />
      </Badge>
      <Badge
        tone="orange"
        variant="solid"
        className="pl-1.5 pb-0.5 inset-shadow-sm inset-shadow-white/60 border-0 rounded-sm"
      >
        <Flag />
        <span className="text-sm leading-none font-medium">Critical</span>
      </Badge>
      <Badge
        tone="red"
        variant="solid"
        className="pl-1.5 pb-0.5 inset-shadow-sm inset-shadow-white/60 border-0 rounded-sm"
      >
        <Ban />
        <span className="text-sm leading-none font-medium">Blocked</span>
      </Badge>
    </div>
  );
}
