"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

/* -------------------------------------------------------------------------- */
/*                                  Types                                      */
/* -------------------------------------------------------------------------- */

export type LabelVariant =
  | "default"
  | "required"
  | "optional"
  | "muted"
  | "inline";

export type LabelStatus = "neutral" | "success" | "warning" | "danger" | "info";

/* -------------------------------------------------------------------------- */
/*                              Extended cva                                   */
/* -------------------------------------------------------------------------- */

const labelVariants = cva("text-[13px] leading-none tracking-[-0.01em]", {
  variants: {
    variant: {
      default: "mb-2 block font-medium text-foreground",
      required: "mb-2 block font-medium text-foreground",
      optional: "mb-2 block font-medium text-foreground",
      muted:
        "block text-[12px] font-normal leading-relaxed text-muted-foreground",
      inline:
        "inline-flex min-w-[7.5rem] items-center gap-2 font-medium text-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});

const statusDotVariants = cva("inline-block size-1.5 shrink-0 rounded-full", {
  variants: {
    status: {
      neutral: "bg-muted-foreground",
      success: "bg-emerald-500",
      warning: "bg-amber-500",
      danger: "bg-red-500",
      info: "bg-sky-500",
    },
  },
  defaultVariants: { status: "neutral" },
});

const iconSlotVariants = cva(
  "inline-flex shrink-0 items-center justify-center text-muted-foreground",
  {
    variants: {
      size: {
        sm: "[&_svg]:size-3",
        default: "[&_svg]:size-3.5",
        lg: "[&_svg]:size-4",
      },
    },
    defaultVariants: { size: "default" },
  },
);

/* -------------------------------------------------------------------------- */
/*                              Markers                                        */
/* -------------------------------------------------------------------------- */

function RequiredMarker() {
  return (
    <span
      aria-hidden
      className="ml-1 font-medium text-red-600 dark:text-red-400"
    >
      *
    </span>
  );
}

function OptionalMarker() {
  return (
    <span
      role="note"
      className="ml-2 text-[10px] font-medium text-muted-foreground"
    >
      Optional
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Root                                           */
/* -------------------------------------------------------------------------- */

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  variant?: LabelVariant;
  /** Secondary copy shown beside the label text — most useful with `inline`. */
  hint?: React.ReactNode;
  disabled?: boolean;
  /** Optional leading icon */
  icon?: React.ReactNode;
  /** Optional status dot color */
  status?: LabelStatus;
  /** Icon size hint */
  size?: "sm" | "default" | "lg";
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      variant = "default",
      hint,
      disabled = false,
      icon,
      status,
      size = "default",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const showRequired = variant === "required";
    const showOptional = variant === "optional";
    const isInline = variant === "inline";

    return (
      <label
        ref={ref}
        data-slot="label"
        data-variant={variant}
        data-status={status}
        data-disabled={disabled ? "" : undefined}
        className={cn(
          labelVariants({ variant }),
          disabled && "cursor-not-allowed opacity-45",
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            isInline
              ? "inline-flex items-center gap-2"
              : "inline-flex items-center gap-1.5",
          )}
        >
          {icon ? (
            <span className={cn(iconSlotVariants({ size }))}>{icon}</span>
          ) : null}
          <span>{children}</span>
          {status ? (
            <span aria-hidden className={cn(statusDotVariants({ status }))} />
          ) : null}
          {showRequired ? <RequiredMarker /> : null}
          {showOptional ? <OptionalMarker /> : null}
          {hint ? (
            <span
              className={cn(
                "font-normal text-muted-foreground",
                isInline
                  ? "text-[12px]"
                  : "mt-1 block text-[12px] leading-relaxed",
              )}
            >
              {hint}
            </span>
          ) : null}
        </span>
      </label>
    );
  },
);
Label.displayName = "Label";

/* -------------------------------------------------------------------------- */
/*                                  Exports                                    */
/* -------------------------------------------------------------------------- */

export {
  labelVariants as labelRootVariants,
  statusDotVariants as labelStatusDotVariants,
  iconSlotVariants as labelIconSlotVariants,
};
