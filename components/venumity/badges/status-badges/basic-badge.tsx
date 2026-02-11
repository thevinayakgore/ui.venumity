"use client";
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BasicBadgeProps = {
  label?: string;
  text?: string;
  count?: number;
  leftCount?: number;
  rightCount?: number;
  leftTip?: string;
  rightTip?: string;
  color?: string;
  icon?: ReactNode;
  showIcon?: boolean;
  showDot?: boolean;
  outline?: boolean;
  className?: string;
};

export function BasicBadge({
  label,
  text,
  count,
  leftCount,
  rightCount,
  leftTip,
  rightTip,
  color = "bg-muted",
  icon,
  showIcon = false,
  showDot = false,
  outline = false,
  className,
}: BasicBadgeProps) {
  return (
    <div className="flex items-center">
      {count && (
        <Badge
          className={cn(
            `min-w-5 h-5 px-1 justify-center text-xs text-white ${color}`,
            className,
          )}
        >
          {count}
        </Badge>
      )}

      {!label &&
        !text &&
        !showDot &&
        !showIcon &&
        (leftCount !== undefined || rightCount !== undefined) && (
          <Badge
            className={cn(
              `min-w-5 h-5 px-1 justify-center text-xs text-white ${color}`,
              className,
            )}
          >
            {leftCount !== undefined && (
              <span className="mr-1">{leftCount}</span>
            )}
            {rightCount !== undefined && <span>{rightCount}</span>}
          </Badge>
        )}

      {(label || text || showDot || showIcon) && (
        <Badge
          variant="secondary"
          className={cn(
            "gap-2 pl-2 pr-3 text-sm hover:shadow-lg transition-all duration-500",
            outline &&
              "bg-accent dark:bg-popover border border-foreground/15 text-foreground/60",
            className,
          )}
        >
          {showIcon && <span>{icon}</span>}
          {showDot && <span className={`size-3 rounded-full ${color}`} />}
          {leftTip && <span className="text-xs">{leftTip}</span>}
          {leftCount !== undefined && <span>{leftCount}</span>}
          {label && <span>{label}</span>}
          {text && <span>{text}</span>}
          {count !== undefined && <span>{count}</span>}
          {rightCount !== undefined && <span>{rightCount}</span>}
          {rightTip && <span className="text-xs">{rightTip}</span>}
        </Badge>
      )}
    </div>
  );
}

export default function BasicBadgeDemo() {
  return (
    <main className="flex flex-wrap items-center justify-center m-auto gap-3 p-6 sm:p-10 max-w-4xl overflow-auto w-full">
      <BasicBadge label="Online" showDot color="bg-green-500" />
      <BasicBadge label="Busy" showDot color="bg-red-500" />
      <BasicBadge label="Idle" showDot color="bg-blue-400" outline />
      <BasicBadge label="Beta" outline />
      <BasicBadge
        label="Verified"
        showIcon
        icon={<CheckCircle className="size-3" />}
        outline
      />
      <BasicBadge
        leftTip="50%"
        text="Offer"
        className="bg-linear-to-tl from-blue-500 to-sky-400 border-0! text-white"
      />
      <BasicBadge count={5} color="bg-blue-500" />
    </main>
  );
}
