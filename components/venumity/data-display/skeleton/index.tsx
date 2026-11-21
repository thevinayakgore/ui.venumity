"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                  Types                                      */
/* -------------------------------------------------------------------------- */

export type SkeletonTone = "neutral" | "soft" | "contrast";

export interface SkeletonBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: SkeletonTone;
  pulse?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                              Tone styles                                    */
/* -------------------------------------------------------------------------- */

const toneStyles: Record<SkeletonTone, string> = {
  neutral: "bg-foreground/10",
  soft: "bg-foreground/5",
  contrast: "bg-foreground/15",
};

function useSkeletonClass({
  tone = "contrast",
  pulse = false,
  className,
}: SkeletonBaseProps) {
  return cn(toneStyles[tone], pulse && "animate-pulse", className);
}

/* -------------------------------------------------------------------------- */
/*                              Skeleton Box                                   */
/* -------------------------------------------------------------------------- */

export type SkeletonBoxProps = SkeletonBaseProps;

export function SkeletonBox({
  className,
  tone,
  pulse,
  ...props
}: SkeletonBoxProps) {
  return (
    <div
      aria-hidden
      data-slot="skeleton-box"
      className={useSkeletonClass({
        tone,
        pulse,
        className: cn("relative overflow-hidden", className),
      })}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                              Skeleton Line                                  */
/* -------------------------------------------------------------------------- */

export interface SkeletonTextProps extends SkeletonBaseProps {
  width?: string;
}

export function SkeletonText({
  className,
  tone,
  pulse,
  width = "w-full",
  ...props
}: SkeletonTextProps) {
  return (
    <div
      aria-hidden
      data-slot="skeleton-line"
      className={useSkeletonClass({
        tone,
        pulse,
        className: cn("h-3.5 rounded-md", width, className),
      })}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                              Skeleton Avatar                                */
/* -------------------------------------------------------------------------- */

export interface SkeletonAvatarProps extends SkeletonBaseProps {
  size?: "sm" | "md" | "lg";
}

const avatarSizes: Record<NonNullable<SkeletonAvatarProps["size"]>, string> = {
  sm: "size-8",
  md: "size-10",
  lg: "size-14",
};

export function SkeletonAvatar({
  className,
  tone,
  pulse,
  size = "md",
  ...props
}: SkeletonAvatarProps) {
  return (
    <div
      aria-hidden
      data-slot="skeleton-avatar"
      className={useSkeletonClass({
        tone,
        pulse,
        className: cn("rounded-full", avatarSizes[size], className),
      })}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                              Skeleton Button                                */
/* -------------------------------------------------------------------------- */

export interface SkeletonButtonProps extends SkeletonBaseProps {
  size?: "sm" | "md" | "lg";
}

const buttonSizes: Record<NonNullable<SkeletonButtonProps["size"]>, string> = {
  sm: "h-8 w-20 rounded-md",
  md: "h-10 w-28 rounded-lg",
  lg: "h-12 w-36 rounded-lg",
};

export function SkeletonButton({
  className,
  tone,
  pulse,
  size = "md",
  ...props
}: SkeletonButtonProps) {
  return (
    <div
      aria-hidden
      data-slot="skeleton-button"
      className={useSkeletonClass({
        tone,
        pulse,
        className: cn(buttonSizes[size], className),
      })}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                              Skeleton Image                                 */
/* -------------------------------------------------------------------------- */

export interface SkeletonImageProps extends SkeletonBaseProps {
  ratio?: "square" | "video" | "portrait";
}

const imageRatios: Record<NonNullable<SkeletonImageProps["ratio"]>, string> = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
};

export function SkeletonImage({
  className,
  tone,
  pulse,
  ratio = "video",
  ...props
}: SkeletonImageProps) {
  return (
    <div
      aria-hidden
      data-slot="skeleton-image"
      className={useSkeletonClass({
        tone,
        pulse,
        className: cn("w-full rounded-xl", imageRatios[ratio], className),
      })}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                              Skeleton Badge                                 */
/* -------------------------------------------------------------------------- */

export interface SkeletonBadgeProps extends SkeletonBaseProps {
  width?: string;
}

export function SkeletonBadge({
  className,
  tone,
  pulse,
  width = "w-16",
  ...props
}: SkeletonBadgeProps) {
  return (
    <div
      aria-hidden
      data-slot="skeleton-badge"
      className={useSkeletonClass({
        tone,
        pulse,
        className: cn("h-6 rounded-full", width, className),
      })}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                              Skeleton Input                                 */
/* -------------------------------------------------------------------------- */

export type SkeletonInputProps = SkeletonBaseProps;

export function SkeletonInput({
  className,
  tone,
  pulse,
  ...props
}: SkeletonInputProps) {
  return (
    <div
      aria-hidden
      data-slot="skeleton-input"
      className={useSkeletonClass({
        tone,
        pulse,
        className: cn("h-10 w-full rounded-lg", className),
      })}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                              Skeleton Card                                  */
/* -------------------------------------------------------------------------- */

export type SkeletonCardProps = SkeletonBaseProps;

export function SkeletonCard({
  className,
  tone,
  pulse,
  ...props
}: SkeletonCardProps) {
  return (
    <div
      aria-hidden
      data-slot="skeleton-card"
      className={cn(
        "rounded-xl border border-foreground/10 bg-foreground/3 p-4",
        className,
      )}
      {...props}
    >
      <SkeletonImage tone={tone} pulse={pulse} ratio="video" />
      <div className="mt-4 flex items-start gap-3">
        <SkeletonAvatar size="sm" tone={tone} pulse={pulse} />
        <div className="min-w-0 flex-1 pt-0.5">
          <SkeletonText tone={tone} pulse={pulse} />
        </div>
      </div>
    </div>
  );
}
