// components/venumity/primitives/display/badge/index.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                              Extended cva                                   */
/* -------------------------------------------------------------------------- */

const badgeVariants = cva(
  cn(
    "group/badge relative inline-flex w-fit shrink-0 items-center justify-center gap-1.5",
    "overflow-hidden rounded-md border text-xs font-medium whitespace-nowrap",
    "transition-colors outline-none select-none",
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
    "[&>svg]:pointer-events-none [&>svg]:size-3 [&>svg]:shrink-0",
  ),
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        outline: "border-border bg-transparent text-foreground",
        destructive: "border-transparent bg-destructive text-white",
        ghost:
          "border-transparent bg-transparent text-foreground hover:bg-accent",
        link: "cursor-pointer border-transparent bg-transparent px-0 text-primary underline-offset-4 hover:underline",
        soft: "border-transparent bg-foreground/10 backdrop-blur-sm text-foreground",
        gradient:
          "border-0 bg-gradient-to-tl from-pink-400 via-rose-500 to-red-400 text-white",
        ring: "border-transparent bg-background text-foreground ring-2",
        solid: "border-transparent text-white",
        shiny: "border-0 bg-foreground text-background shadow-sm",
      },
      size: {
        sm: "h-5 px-2 text-[10px] [&>svg]:size-2.5",
        default: "h-6 px-2.5 text-xs [&>svg]:size-3.5",
        lg: "h-7 px-3 text-sm [&>svg]:size-4",
        xl: "h-9 px-3 text-sm [&>svg]:size-6",
        icon: "size-6 p-0 [&>svg]:size-3",
        "icon-sm": "size-5 p-0 [&>svg]:size-2.5",
        status: "h-8 pl-1 pr-3 text-sm [&>svg]:size-6",
      },
      shape: {
        pill: "rounded-full",
        square: "rounded-md",
        circle: "rounded-full aspect-square",
        dot: "rounded-full size-2 p-0 [&>svg]:size-2",
      },
      tone: {
        neutral: "",
        success: "",
        warning: "",
        info: "",
        danger: "",
        brand: "",
        green: "",
        red: "",
        blue: "",
        yellow: "",
        orange: "",
        rose: "",
        indigo: "",
        pink: "",
      },
    },
    compoundVariants: [
      /* ── default variant: bg-primary → tone override ─────────── */
      {
        variant: "default",
        tone: "success",
        className: "bg-green-500 text-white",
      },
      {
        variant: "default",
        tone: "warning",
        className: "bg-amber-500 text-white",
      },
      { variant: "default", tone: "info", className: "bg-sky-500 text-white" },
      {
        variant: "default",
        tone: "danger",
        className: "bg-red-500 text-white",
      },
      {
        variant: "default",
        tone: "brand",
        className:
          "bg-gradient-to-br from-pink-300 via-violet-500 to-indigo-400 text-white border-0",
      },

      /* ── outline variant ─────────────────────────────────────── */
      {
        variant: "outline",
        tone: "success",
        className:
          "border-green-500/50 bg-green-500/10 text-green-600 dark:text-green-400",
      },
      {
        variant: "outline",
        tone: "warning",
        className:
          "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400",
      },
      {
        variant: "outline",
        tone: "info",
        className:
          "border-sky-500/50 bg-sky-500/10 text-sky-600 dark:text-sky-400",
      },
      {
        variant: "outline",
        tone: "danger",
        className:
          "border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400",
      },
      {
        variant: "outline",
        tone: "brand",
        className:
          "border-indigo-500/50 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
      },

      /* ── ghost variant ───────────────────────────────────────── */
      {
        variant: "ghost",
        tone: "success",
        className: "text-green-600 hover:bg-green-500/10 dark:text-green-400",
      },
      {
        variant: "ghost",
        tone: "warning",
        className: "text-amber-600 hover:bg-amber-500/10 dark:text-amber-400",
      },
      {
        variant: "ghost",
        tone: "info",
        className: "text-sky-600 hover:bg-sky-500/10 dark:text-sky-400",
      },
      {
        variant: "ghost",
        tone: "danger",
        className: "text-red-600 hover:bg-red-500/10 dark:text-red-400",
      },
      {
        variant: "ghost",
        tone: "brand",
        className:
          "text-indigo-600 hover:bg-indigo-500/10 dark:text-indigo-400",
      },

      /* ── soft variant ────────────────────────────────────────── */
      {
        variant: "soft",
        tone: "success",
        className: "bg-green-500/20 text-green-700 dark:text-green-300",
      },
      {
        variant: "soft",
        tone: "warning",
        className: "bg-amber-500/20 text-amber-700 dark:text-amber-300",
      },
      {
        variant: "soft",
        tone: "info",
        className: "bg-sky-500/20 text-sky-700 dark:text-sky-300",
      },
      {
        variant: "soft",
        tone: "danger",
        className: "bg-red-500/20 text-red-700 dark:text-red-300",
      },
      {
        variant: "soft",
        tone: "brand",
        className: "bg-indigo-500/20 text-indigo-700 dark:text-indigo-300",
      },

      /* ── ring variant ────────────────────────────────────────── */
      { variant: "ring", tone: "success", className: "ring-green-500/60" },
      { variant: "ring", tone: "warning", className: "ring-amber-500/60" },
      { variant: "ring", tone: "info", className: "ring-sky-500/60" },
      { variant: "ring", tone: "danger", className: "ring-red-500/60" },
      { variant: "ring", tone: "brand", className: "ring-indigo-500/60" },

      /* ── solid variant ───────────────────────────────────────── */
      { variant: "solid", tone: "green", className: "bg-green-500" },
      { variant: "solid", tone: "red", className: "bg-red-500" },
      { variant: "solid", tone: "blue", className: "bg-blue-500" },
      { variant: "solid", tone: "yellow", className: "bg-yellow-500" },
      { variant: "solid", tone: "orange", className: "bg-orange-500" },
      { variant: "solid", tone: "rose", className: "bg-rose-500" },
      { variant: "solid", tone: "indigo", className: "bg-indigo-500" },
      {
        variant: "solid",
        tone: "pink",
        className: "bg-gradient-to-tl from-pink-500 to-fuchsia-300",
      },
      {
        variant: "solid",
        tone: "brand",
        className: "bg-gradient-to-tl from-blue-500 to-sky-400",
      },
      { variant: "solid", tone: "success", className: "bg-green-500" },
      { variant: "solid", tone: "warning", className: "bg-amber-500" },
      { variant: "solid", tone: "info", className: "bg-sky-500" },
      { variant: "solid", tone: "danger", className: "bg-red-500" },

      /* ── shiny variant: tone paints the base fill, the sweep stays ─ */
      {
        variant: "shiny",
        tone: "success",
        className: "bg-green-500 text-white",
      },
      {
        variant: "shiny",
        tone: "warning",
        className: "bg-amber-500 text-white",
      },
      { variant: "shiny", tone: "info", className: "bg-sky-500 text-white" },
      { variant: "shiny", tone: "danger", className: "bg-red-500 text-white" },
      {
        variant: "shiny",
        tone: "brand",
        className:
          "bg-gradient-to-br from-pink-400 via-violet-500 to-indigo-400 text-white",
      },

      /* ── shape adjustments ───────────────────────────────────── */
      { shape: "pill", size: "icon", className: "size-auto p-1" },
      { shape: "pill", size: "icon-sm", className: "size-auto p-0.75" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "pill",
      tone: "neutral",
    },
  },
);

/* -------------------------------------------------------------------------- */
/*                                  Root                                       */
/* -------------------------------------------------------------------------- */

export interface BadgeProps
  extends
    Omit<React.ComponentProps<"span">, "color">,
    Omit<VariantProps<typeof badgeVariants>, "tone"> {
  asChild?: boolean;
  tone?:
    | "neutral"
    | "success"
    | "warning"
    | "info"
    | "danger"
    | "brand"
    | "green"
    | "red"
    | "blue"
    | "yellow"
    | "orange"
    | "rose"
    | "indigo"
    | "pink";
}

function Badge({
  className,
  variant = "default",
  size = "default",
  shape = "pill",
  tone = "neutral",
  asChild = false,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";
  const isShiny = variant === "shiny";

  useBadgeShinyStyles(isShiny);

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      data-size={size}
      data-shape={shape}
      data-tone={tone}
      className={cn(
        badgeVariants({ variant, size, shape, tone }),
        isShiny && "badge-shiny",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Pulse Indicator                                */
/* -------------------------------------------------------------------------- */

export interface BadgePulseProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string;
  dotSize?: string;
}

function BadgePulse({
  className,
  color = "bg-green-500",
  dotSize = "size-2.5",
  ...props
}: BadgePulseProps) {
  return (
    <span
      aria-hidden
      className={cn("relative inline-flex", className)}
      {...props}
    >
      <span
        className={cn(
          "absolute inset-0 animate-ping rounded-full opacity-60 motion-reduce:animate-none",
          color,
        )}
      />
      <span className={cn("relative rounded-full", color, dotSize)} />
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Shiny styles                                   */
/* -------------------------------------------------------------------------- */

const BADGE_SHINY_STYLE_ID = "venumity-badge-shiny-styles-v1";

function useBadgeShinyStyles(enabled: boolean) {
  React.useEffect(() => {
    if (!enabled) return;
    if (typeof document === "undefined") return;
    if (document.getElementById(BADGE_SHINY_STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = BADGE_SHINY_STYLE_ID;
    style.textContent = `
/* Shimmer sweep — background-position scroll, no transform.
   The sweep lives on a ::before pseudo so it never fights the
   variant's own background-color or gradient. */
.badge-shiny::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  background-image: linear-gradient(
    110deg,
    transparent 35%,
    rgba(255, 255, 255, 0.55) 50%,
    transparent 65%
  );
  background-size: 200% 100%;
  background-repeat: no-repeat;
  background-position: 200% 0;
  animation: badge-shiny-sweep 2.2s linear infinite;
  will-change: background-position;
}

@keyframes badge-shiny-sweep {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}

/* Reduced motion — no sweep, no animation. */
@media (prefers-reduced-motion: reduce) {
  .badge-shiny::before {
    animation: none !important;
    background-image: none !important;
  }
}
`;
    document.head.appendChild(style);
  }, [enabled]);
}

export { Badge, BadgePulse, badgeVariants };
