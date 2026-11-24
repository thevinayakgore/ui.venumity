import * as React from "react";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

export type InsetButtonSize = "sm" | "default" | "lg" | "icon";

const sizeVariants: Record<InsetButtonSize, string> = {
  sm: "h-6 px-2 gap-1 text-xs text-shadow-lg/6 shadow-lg/6 rounded",
  default: "h-8 px-3 py-1.5 gap-1.5 text-shadow-lg/10 shadow-lg/10 rounded-md",
  lg: "h-11 px-5 gap-2 text-shadow-lg/10 shadow-lg/10 rounded-lg",
  icon: "size-8.5",
};

export const insetButtonVariants = (
  className?: string,
  size: InsetButtonSize = "default",
) =>
  cn(
    "active:translate-y-px",
    "inset-shadow-sm inset-shadow-white/60",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
    "bg-primary border border-primary text-white",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all outline-none select-none",
    sizeVariants[size],
    className,
  );

export interface ButtonProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
  size?: InsetButtonSize;
}

const InsetButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button";

    return (
      <Comp
        ref={ref}
        {...props}
        data-slot="button"
        className={insetButtonVariants(className, size)}
      />
    );
  },
);

InsetButton.displayName = "InsetButton";

export { InsetButton };