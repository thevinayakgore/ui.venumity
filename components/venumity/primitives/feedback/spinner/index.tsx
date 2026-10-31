"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { motion, useReducedMotion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                                  Types                                      */
/* -------------------------------------------------------------------------- */

export type SpinnerVariant = "default" | "ring" | "dots" | "pulse" | "gradient";

export type SpinnerSize = "sm" | "md" | "lg" | "xl";
export type SpinnerTone = "neutral" | "success" | "warning" | "danger";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SpinnerVariant;
  size?: SpinnerSize;
  tone?: SpinnerTone;
  label?: string;
}

export interface SpinnerOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  size?: SpinnerSize;
  tone?: SpinnerTone;
  children?: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                              Extended cva                                   */
/* -------------------------------------------------------------------------- */

const spinnerRootVariants = cva("inline-flex items-center gap-2.5", {
  variants: {
    tone: {
      neutral: "text-foreground/75",
      success: "text-green-500",
      warning: "text-amber-500",
      danger: "text-red-500",
    },
  },
  defaultVariants: { tone: "neutral" },
});

const dotToneVariants = cva("rounded-full", {
  variants: {
    tone: {
      neutral: "bg-foreground/75",
      success: "bg-green-500",
      warning: "bg-amber-500",
      danger: "bg-red-500",
    },
  },
  defaultVariants: { tone: "neutral" },
});

/* -------------------------------------------------------------------------- */
/*                              Size maps                                      */
/* -------------------------------------------------------------------------- */

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "size-4",
  md: "size-6",
  lg: "size-9",
  xl: "size-14",
};

const dotSizes: Record<SpinnerSize, string> = {
  sm: "size-1.5",
  md: "size-2",
  lg: "size-2.5",
  xl: "size-3",
};

const ringLines = [
  "rotate-0",
  "rotate-[30deg]",
  "rotate-[60deg]",
  "rotate-90",
  "rotate-[120deg]",
  "rotate-[150deg]",
  "rotate-180",
  "rotate-[210deg]",
  "rotate-[240deg]",
  "rotate-[270deg]",
  "rotate-[300deg]",
  "rotate-[330deg]",
] as const;

/* -------------------------------------------------------------------------- */
/*                              CSS keyframes                                  */
/* -------------------------------------------------------------------------- */

function ensureSpinnerStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("venumity-spinner-styles")) return;

  const style = document.createElement("style");
  style.id = "venumity-spinner-styles";
  style.textContent = `
@media (prefers-reduced-motion: no-preference) {
  .vn-spinner-default  { animation: vn-spinner-spin 680ms linear infinite; }
  .vn-spinner-line     { animation: vn-spinner-line 840ms linear infinite; }
  .vn-spinner-dot      { animation: vn-spinner-dot 900ms cubic-bezier(0.22, 1, 0.36, 1) infinite; }
  .vn-spinner-pulse-ring { animation: vn-spinner-pulse 1.15s cubic-bezier(0.22, 1, 0.36, 1) infinite; }
}

@keyframes vn-spinner-spin {
  to { transform: rotate(360deg); }
}

@keyframes vn-spinner-dot {
  0%, 80%, 100% { opacity: 0.38; transform: translateY(0); }
  35%           { opacity: 1;    transform: translateY(-3px); }
}

@keyframes vn-spinner-line {
  0%   { opacity: 1; }
  100% { opacity: 0.2; }
}

@keyframes vn-spinner-pulse {
  from { opacity: 0.72; transform: scale(0.86); }
  to   { opacity: 0;    transform: scale(1.85); }
}

@media (prefers-reduced-motion: reduce) {
  .vn-spinner-default,
  .vn-spinner-line,
  .vn-spinner-dot,
  .vn-spinner-pulse-ring {
    animation: none !important;
  }
}
`;

  document.head.appendChild(style);
}

/* -------------------------------------------------------------------------- */
/*                              Spinner                                        */
/* -------------------------------------------------------------------------- */

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      tone = "neutral",
      label,
      ...props
    },
    ref,
  ) => {
    React.useEffect(() => {
      ensureSpinnerStyles();
    }, []);

    return (
      <div
        ref={ref}
        role="status"
        aria-label={label ?? "Loading"}
        data-slot="spinner"
        data-variant={variant}
        data-size={size}
        className={cn(spinnerRootVariants({ tone }), className)}
        {...props}
      >
        {variant === "dots" ? (
          <span aria-hidden className="inline-flex items-center gap-1.5">
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className={cn(
                  "vn-spinner-dot",
                  dotSizes[size],
                  dotToneVariants({ tone }),
                )}
                style={{ animationDelay: `${index * 120}ms` }}
              />
            ))}
          </span>
        ) : variant === "pulse" ? (
          <span
            aria-hidden
            className={cn(
              "vn-spinner-pulse relative inline-flex rounded-full",
              sizeClasses[size],
              dotToneVariants({ tone }),
            )}
          >
            <span className="vn-spinner-pulse-ring absolute -inset-1.25 rounded-full border border-current" />
          </span>
        ) : variant === "ring" ? (
          <span
            aria-hidden
            className={cn("relative inline-flex", sizeClasses[size])}
          >
            {ringLines.map((lineClassName, index) => (
              <span
                key={lineClassName}
                className={cn(
                  "vn-spinner-line absolute left-1/2 top-0 -ml-px h-[30%] w-0.5 origin-[50%_180%] rounded-full bg-current",
                  lineClassName,
                )}
                style={{
                  animationDelay: `${index * -70}ms`,
                  opacity: 0.22 + index * 0.045,
                }}
              />
            ))}
          </span>
        ) : variant === "gradient" ? (
          <GradientSpinner size={size} tone={tone} />
        ) : (
          <span
            aria-hidden
            className={cn(
              "vn-spinner-default relative inline-flex rounded-full border-2 border-[color-mix(in_srgb,currentColor_20%,transparent)] border-t-current",
              sizeClasses[size],
            )}
          />
        )}

        {label ? (
          <span className="text-sm font-medium tracking-[-0.01em] text-foreground">
            {label}
          </span>
        ) : (
          <span className="sr-only">Loading</span>
        )}
      </div>
    );
  },
);

Spinner.displayName = "Spinner";

/* -------------------------------------------------------------------------- */
/*                              Gradient Spinner                               */
/* -------------------------------------------------------------------------- */

const GRADIENT_SIZES: Record<SpinnerSize, string> = {
  sm: "size-10",
  md: "size-16",
  lg: "size-24",
  xl: "size-32",
};

function GradientSpinner({
  size = "md",
  tone = "neutral",
}: {
  size: SpinnerSize;
  tone: SpinnerTone;
}) {
  const reduceMotion = useReducedMotion();
  const sizeCls = GRADIENT_SIZES[size] ?? GRADIENT_SIZES.md;

  void tone;

  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex items-center justify-center",
        sizeCls,
      )}
    >
      <motion.span
        className="absolute inset-4 rounded-full bg-linear-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-2xl"
        animate={
          reduceMotion
            ? { opacity: 0.6, scale: 1 }
            : {
                opacity: [0.35, 0.7, 0.35],
                scale: [0.85, 1.1, 0.85],
              }
        }
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.span
        className="absolute inset-0 scale-130 rounded-full p-1 blur-2xl"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, #3b82f6 55deg, #8b5cf6 125deg, #ec4899 200deg, #22c55e 270deg, transparent 350deg)",
          maskImage:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          WebkitMaskImage:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
        }}
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      <motion.span
        className="absolute inset-0 rounded-full p-1"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, #3b82f6 55deg, #8b5cf6 125deg, #ec4899 200deg, #22c55e 270deg, transparent 350deg)",
          maskImage:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          WebkitMaskImage:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
        }}
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
      />

      <motion.span
        className="absolute inset-3 rounded-full p-1"
        style={{
          background:
            "conic-gradient(from 180deg, transparent 0deg, #22c55e 65deg, #06b6d4 145deg, #6366f1 220deg, transparent 320deg)",
          maskImage:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          WebkitMaskImage:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
        }}
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
      />
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Overlay                                        */
/* -------------------------------------------------------------------------- */

export const SpinnerOverlay = React.forwardRef<
  HTMLDivElement,
  SpinnerOverlayProps
>(
  (
    { className, label, tone = "neutral", size = "sm", children, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        data-slot="spinner-overlay"
        className={cn(
          "relative flex min-h-40 w-full items-center justify-center overflow-hidden rounded-xl",
          "border border-foreground/10",
          className,
        )}
        {...props}
      >
        {children ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60 blur-[1px]"
          >
            {children}
          </div>
        ) : null}

        <div className="relative z-10 rounded-lg border border-foreground/15 bg-background px-4 py-3 text-foreground">
          <Spinner variant="ring" tone={tone} size={size} label={label} />
        </div>
      </div>
    );
  },
);

SpinnerOverlay.displayName = "SpinnerOverlay";

/* -------------------------------------------------------------------------- */
/*                              Loading Dots                                   */
/* -------------------------------------------------------------------------- */

export function LoadingDots({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <span
      aria-hidden
      className={cn("inline-flex items-center justify-center gap-1", className)}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="text-current"
          animate={reduceMotion ? { opacity: 1 } : { opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          .
        </motion.span>
      ))}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Exports                                    */
/* -------------------------------------------------------------------------- */

export { spinnerRootVariants, dotToneVariants };
