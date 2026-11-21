"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Camera, UserRound } from "lucide-react";
import { cva } from "class-variance-authority";
import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type MotionProps,
  type Transition,
} from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                                 Axis                                        */
/* -------------------------------------------------------------------------- */

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export type AvatarStatus = "online" | "offline" | "away" | "busy";

export type AvatarAnimation =
  | "none"
  | "fade"
  | "scale"
  | "pop"
  | "slide"
  | "reveal"
  | "ring";

export type AvatarTone =
  | "neutral"
  | "blue"
  | "emerald"
  | "amber"
  | "rose"
  | "violet"
  | "red"
  | "sky";

/* -------------------------------------------------------------------------- */
/*                              Animation presets                              */
/* -------------------------------------------------------------------------- */

interface Preset {
  initial: MotionProps["initial"];
  animate: MotionProps["animate"];
  exit: MotionProps["exit"];
  transition: Transition;
  style?: React.CSSProperties;
}

/**
 * Every preset here is fast (<= 260ms) and produces a *purposeful* motion.
 * Nothing here is decorative flicker.
 */
const presets: Record<AvatarAnimation, Preset> = {
  none: {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: { opacity: 1 },
    transition: { duration: 0 },
  },

  /** Content appears quietly — good for lists and dense UIs. */
  fade: {
    initial: { opacity: 0, y: 2 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 2 },
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },

  /** Default — small scale from 0.94 to 1 with a spring. */
  scale: {
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.97 },
    transition: { type: "spring", stiffness: 480, damping: 26, mass: 0.7 },
  },

  /** Notification-style pop — for new/unread. Snappy but short. */
  pop: {
    initial: { opacity: 0, scale: 0.6 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.7 },
    transition: { type: "spring", stiffness: 700, damping: 18, mass: 0.6 },
  },

  /** Enter from the left — for appearing in a conversation thread. */
  slide: {
    initial: { opacity: 0, x: -12 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -8 },
    transition: { type: "spring", stiffness: 460, damping: 30 },
  },

  /** Image unblurs into focus — subtle and premium. */
  reveal: {
    initial: { opacity: 0, filter: "blur(8px)", scale: 1.02 },
    animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
    exit: { opacity: 0, filter: "blur(6px)", scale: 0.98 },
    transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1] },
  },

  /** Ring emphasis — for when the status just changed. Uses a pulse. */
  ring: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { type: "spring", stiffness: 500, damping: 24, mass: 0.7 },
  },
};

/* -------------------------------------------------------------------------- */
/*                              Size maps                                      */
/* -------------------------------------------------------------------------- */

const sizeClasses: Record<AvatarSize, string> = {
  xs: "size-6 text-[10px] [&_[data-slot=avatar-status]]:size-1.5 [&_[data-slot=avatar-status]]:ring-[1.5px]",
  sm: "size-8 text-[11px] [&_[data-slot=avatar-status]]:size-2 [&_[data-slot=avatar-status]]:ring-2",
  md: "size-10 text-xs [&_[data-slot=avatar-status]]:size-2.5 [&_[data-slot=avatar-status]]:ring-2",
  lg: "size-12 text-sm [&_[data-slot=avatar-status]]:size-3 [&_[data-slot=avatar-status]]:ring-2",
  xl: "size-16 text-base [&_[data-slot=avatar-status]]:size-3.5 [&_[data-slot=avatar-status]]:ring-[2.5px]",
};

const iconSizes: Record<AvatarSize, string> = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
  xl: "size-6",
};

const groupOverlap: Record<AvatarSize, string> = {
  xs: "-ml-2",
  sm: "-ml-2.5",
  md: "-ml-3",
  lg: "-ml-3.5",
  xl: "-ml-4",
};

const tooltipOffsets: Record<AvatarSize, string> = {
  xs: "bottom-[calc(100%+6px)]",
  sm: "bottom-[calc(100%+7px)]",
  md: "bottom-[calc(100%+8px)]",
  lg: "bottom-[calc(100%+9px)]",
  xl: "bottom-[calc(100%+10px)]",
};

/* -------------------------------------------------------------------------- */
/*                              Tone maps                                      */
/* -------------------------------------------------------------------------- */

const TONES: AvatarTone[] = [
  "blue",
  "emerald",
  "amber",
  "rose",
  "violet",
  "red",
];

const fallbackTones: Record<AvatarTone, string> = {
  neutral: "bg-foreground/10 text-foreground",
  blue: "bg-gradient-to-br from-blue-500 to-blue-600 text-white",
  emerald: "bg-gradient-to-br from-emerald-500 to-green-600 text-white",
  amber: "bg-gradient-to-br from-amber-500 to-orange-600 text-white",
  rose: "bg-gradient-to-br from-rose-500 to-pink-600 text-white",
  violet: "bg-gradient-to-br from-violet-500 to-purple-600 text-white",
  red: "bg-gradient-to-br from-red-500 to-rose-600 text-white",
  sky: "bg-gradient-to-br from-sky-400 to-blue-500 text-white",
};

const statusColors: Record<AvatarStatus, string> = {
  online: "bg-emerald-500",
  offline: "bg-zinc-400",
  away: "bg-amber-500",
  busy: "bg-red-500",
};

/* -------------------------------------------------------------------------- */
/*                              Extended cva                                   */
/* -------------------------------------------------------------------------- */

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
  {
    variants: {
      size: {
        xs: "size-6",
        sm: "size-8",
        md: "size-10",
        lg: "size-12",
        xl: "size-16",
      },
    },
    defaultVariants: { size: "md" },
  },
);

/* -------------------------------------------------------------------------- */
/*                              Helpers                                        */
/* -------------------------------------------------------------------------- */

function getInitials(value: string) {
  const parts = value
    .trim()
    .split(/[\s@._-]+/)
    .filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function toneFromSeed(seed: string): AvatarTone {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash + seed.charCodeAt(i) * (i + 1)) % TONES.length;
  }
  return TONES[hash] ?? "blue";
}

/* -------------------------------------------------------------------------- */
/*                              Context                                        */
/* -------------------------------------------------------------------------- */

interface AvatarContextValue {
  size: AvatarSize;
  animation: AvatarAnimation;
}

const AvatarContext = React.createContext<AvatarContextValue>({
  size: "md",
  animation: "scale",
});

const useAvatarContext = () => React.useContext(AvatarContext);

/* -------------------------------------------------------------------------- */
/*                              Subcomponents                                  */
/* -------------------------------------------------------------------------- */

export interface AvatarProps extends Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  "children"
> {
  size?: AvatarSize;
  status?: AvatarStatus | null;
  /** Show a status dot even without an explicit status (defaults to "online"). */
  showStatus?: boolean;
  /** Tooltip label anchored above the avatar. */
  tooltip?: React.ReactNode;
  /** Enable hover affordance. Auto-enabled when tooltip is set. */
  interactive?: boolean;
  animation?: AvatarAnimation;
  /** Custom overrides for the preset's motion */
  motionOverrides?: {
    initial?: MotionProps["initial"];
    animate?: MotionProps["animate"];
    exit?: MotionProps["exit"];
    transition?: Transition;
    style?: React.CSSProperties;
  };
  children?: React.ReactNode;
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      className,
      size = "md",
      status = null,
      showStatus = false,
      tooltip,
      interactive,
      animation = "scale",
      motionOverrides,
      children,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion() ?? false;
    const [revealed, setRevealed] = React.useState(false);
    const [hovered, setHovered] = React.useState(false);

    const safeSize: AvatarSize = size ?? "md";
    const safeAnimation: AvatarAnimation = animation ?? "scale";
    const resolvedStatus = showStatus && !status ? "online" : status;

    const base = presets[safeAnimation];
    const effectivePreset = reduceMotion
      ? { ...base, transition: { duration: 0 } }
      : base;

    const preset: Preset = {
      initial: motionOverrides?.initial ?? effectivePreset.initial,
      animate: motionOverrides?.animate ?? effectivePreset.animate,
      exit: motionOverrides?.exit ?? effectivePreset.exit,
      transition: motionOverrides?.transition ?? effectivePreset.transition,
      style: { ...effectivePreset.style, ...(motionOverrides?.style ?? {}) },
    };

    const isInteractive = interactive ?? Boolean(tooltip);
    const tooltipVisible = isInteractive && revealed;

    const contextValue = React.useMemo<AvatarContextValue>(
      () => ({
        size: safeSize,
        animation: safeAnimation,
      }),
      [safeSize, safeAnimation],
    );

    return (
      <AvatarContext.Provider value={contextValue}>
        <span
          ref={ref}
          data-slot="avatar-root"
          className={cn(
            "group/avatar-root relative inline-flex align-middle",
            isInteractive && "cursor-default",
            className,
          )}
          tabIndex={tooltip ? 0 : undefined}
          onMouseEnter={() => {
            setRevealed(true);
            setHovered(true);
          }}
          onMouseLeave={() => {
            setRevealed(false);
            setHovered(false);
          }}
          onFocus={(e) => {
            setRevealed(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setRevealed(false);
            onBlur?.(e);
          }}
          {...rest}
        >
          <span
            data-slot="avatar-shell"
            data-size={safeSize}
            className={cn(
              "relative inline-flex shrink-0 align-middle",
              sizeClasses[safeSize],
            )}
          >
            <motion.span
              initial={preset.initial}
              animate={preset.animate}
              exit={preset.exit}
              transition={preset.transition}
              style={preset.style}
              className="relative flex size-full overflow-hidden rounded-full"
            >
              {/* Hover ring — very subtle, always present when interactive */}
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset transition-all duration-200",
                  isInteractive && hovered
                    ? "ring-2 ring-foreground/25"
                    : "ring-1 ring-foreground/10",
                )}
              />
              <BaseAvatar.Root className="relative flex size-full overflow-hidden rounded-full bg-foreground/6">
                {children}
              </BaseAvatar.Root>
            </motion.span>

            {resolvedStatus ? (
              <AvatarStatusDot
                status={resolvedStatus}
                emphasis={safeAnimation === "ring" && !reduceMotion}
              />
            ) : null}
          </span>

          {tooltip ? (
            <AvatarTooltip
              label={tooltip}
              size={safeSize}
              visible={tooltipVisible}
              reduceMotion={reduceMotion}
            />
          ) : null}
        </span>
      </AvatarContext.Provider>
    );
  },
);
Avatar.displayName = "Avatar";

/* -------------------------------------------------------------------------- */
/*                              Status dot                                     */
/* -------------------------------------------------------------------------- */

function AvatarStatusDot({
  status,
  emphasis,
}: {
  status: AvatarStatus;
  emphasis: boolean;
}) {
  return (
    <span
      data-slot="avatar-status"
      aria-hidden="true"
      className={cn(
        "absolute right-0 bottom-0 z-10 ring-(--background,var(--color-white)) rounded-full",
        statusColors[status],
        emphasis && "motion-safe:animate-[avatar-ring-pulse_1.4s_ease-out_1]",
      )}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                              Tooltip                                        */
/* -------------------------------------------------------------------------- */

function AvatarTooltip({
  label,
  size,
  visible,
  reduceMotion,
}: {
  label: React.ReactNode;
  size: AvatarSize;
  visible: boolean;
  reduceMotion: boolean;
}) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.span
          role="tooltip"
          data-slot="avatar-tooltip"
          initial={reduceMotion ? false : { opacity: 0, y: 4, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            reduceMotion
              ? undefined
              : { opacity: 0, y: 3, scale: 0.97, transition: { duration: 0.1 } }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 420, damping: 30, mass: 0.5 }
          }
          className={cn(
            "pointer-events-none absolute left-1/2 z-130 w-max max-w-[16rem] -translate-x-1/2",
            tooltipOffsets[size],
          )}
          style={{ transformOrigin: "bottom center" }}
        >
          <span
            className={cn(
              "relative inline-flex w-full items-center rounded-md border border-border",
              "bg-popover px-2.5 py-1.5 text-left text-xs font-medium text-popover-foreground",
              "shadow-md wrap-break-words",
            )}
          >
            {label}
          </span>
        </motion.span>
      ) : null}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Image                                          */
/* -------------------------------------------------------------------------- */

export type AvatarImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "size"
>;

export const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, alt = "", src, ...props }, ref) => {
    const reduceMotion = useReducedMotion() ?? false;
    return (
      <BaseAvatar.Image
        ref={ref}
        src={src}
        alt={alt}
        data-slot="avatar-image"
        className={cn(
          "absolute inset-0 size-full object-cover",
          "transition-opacity duration-200",
          "data-starting-style:opacity-0 data-ending-style:opacity-0",
          reduceMotion && "transition-none",
          className,
        )}
        {...props}
      />
    );
  },
);
AvatarImage.displayName = "AvatarImage";

/* -------------------------------------------------------------------------- */
/*                              Fallback                                       */
/* -------------------------------------------------------------------------- */

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {
  delayMs?: number;
  tone?: AvatarTone;
}

export const AvatarFallback = React.forwardRef<
  HTMLSpanElement,
  AvatarFallbackProps
>(({ className, delayMs = 0, tone, children }, ref) => {
  const { size } = useAvatarContext();
  const seed = typeof children === "string" ? children : "";
  const resolvedTone: AvatarTone =
    tone ?? (seed ? toneFromSeed(seed) : "neutral");
  const content = seed ? getInitials(seed) : children;

  return (
    <BaseAvatar.Fallback
      ref={ref}
      delay={delayMs}
      data-slot="avatar-fallback"
      data-tone={resolvedTone}
      className={cn(
        "absolute inset-0 flex size-full items-center justify-center font-semibold tracking-tight",
        fallbackTones[resolvedTone],
        className,
      )}
    >
      {content ?? (
        <UserRound className={iconSizes[size]} strokeWidth={1.75} aria-hidden />
      )}
    </BaseAvatar.Fallback>
  );
});
AvatarFallback.displayName = "AvatarFallback";

/* -------------------------------------------------------------------------- */
/*                              Group                                          */
/* -------------------------------------------------------------------------- */

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: AvatarSize;
  animation?: AvatarAnimation;
  interactive?: boolean;
  children: React.ReactNode;
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      className,
      max = 4,
      size = "md",
      animation = "scale",
      interactive = true,
      children,
      ...props
    },
    ref,
  ) => {
    const childArray = React.Children.toArray(children);
    const visible = childArray.slice(0, max);
    const overflow = childArray.length - max;
    const safeSize: AvatarSize = size ?? "md";

    return (
      <div
        ref={ref}
        data-slot="avatar-group"
        className={cn("inline-flex items-center", className)}
        {...props}
      >
        {visible.map((child, index) => (
          <div
            key={index}
            data-slot="avatar-group-item"
            className={cn("relative", index > 0 && groupOverlap[safeSize])}
            style={{ zIndex: visible.length - index }}
          >
            {React.isValidElement<AvatarProps>(child)
              ? React.cloneElement(child, {
                  size: child.props.size ?? safeSize,
                  animation: child.props.animation ?? animation,
                  interactive:
                    child.props.interactive ??
                    (interactive ? Boolean(child.props.tooltip) : false),
                })
              : child}
          </div>
        ))}
        {overflow > 0 ? (
          <div className={cn("relative", groupOverlap[safeSize])}>
            <Avatar
              size={safeSize}
              animation="pop"
              tooltip={interactive ? `+${overflow} more` : undefined}
              interactive={interactive}
            >
              <AvatarFallback
                tone="neutral"
                className="text-[11px] font-medium"
              >
                +{overflow}
              </AvatarFallback>
            </Avatar>
          </div>
        ) : null}
      </div>
    );
  },
);
AvatarGroup.displayName = "AvatarGroup";

/* -------------------------------------------------------------------------- */
/*                              Upload                                         */
/* -------------------------------------------------------------------------- */

export interface AvatarUploadProps extends Omit<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  "onChange"
> {
  size?: AvatarSize;
  src?: string | null;
  alt?: string;
  initials?: string;
  accept?: string;
  disabled?: boolean;
  onChange?: (file: File | null) => void;
  uploadLabel?: string;
}

export const AvatarUpload = React.forwardRef<
  HTMLLabelElement,
  AvatarUploadProps
>(
  (
    {
      className,
      size = "lg",
      src,
      alt = "Profile photo",
      initials,
      accept = "image/*",
      disabled = false,
      onChange,
      uploadLabel = "Upload profile photo",
      children,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion() ?? false;
    const inputRef = React.useRef<HTMLInputElement>(null);
    const localPreviewRef = React.useRef<string | null>(null);
    const [preview, setPreview] = React.useState<string | null>(src ?? null);
    const [hovered, setHovered] = React.useState(false);

    const revokeLocalPreview = React.useCallback(() => {
      if (!localPreviewRef.current) return;
      URL.revokeObjectURL(localPreviewRef.current);
      localPreviewRef.current = null;
    }, []);

    const [lastSrc, setLastSrc] = React.useState(src);
    if (src !== lastSrc) {
      setLastSrc(src);
      setPreview(src ?? null);
    }

    React.useEffect(() => revokeLocalPreview, [revokeLocalPreview, src]);
    React.useEffect(() => revokeLocalPreview, [revokeLocalPreview]);

    return (
      <label
        ref={ref}
        data-slot="avatar-upload"
        aria-label={uploadLabel}
        className={cn(
          "group/avatar-upload relative inline-flex cursor-pointer align-middle",
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        {...props}
      >
        <Avatar size={size} animation="scale" interactive={false}>
          {preview ? (
            <AvatarImage src={preview} alt={alt} />
          ) : (
            <AvatarFallback
              delayMs={0}
              tone={initials ? toneFromSeed(initials) : "neutral"}
            >
              {initials ?? <UserRound strokeWidth={1.75} />}
            </AvatarFallback>
          )}

          <motion.span
            aria-hidden
            className="absolute inset-0 z-10 flex items-center justify-center rounded-full text-white"
            initial={false}
            animate={{
              backgroundColor: hovered ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)",
            }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.18, ease: "easeOut" }
            }
          >
            <motion.span
              animate={{
                opacity: hovered ? 1 : 0,
                y: hovered ? 0 : 3,
                scale: hovered ? 1 : 0.94,
              }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 420, damping: 30, mass: 0.5 }
              }
            >
              <Camera className={iconSizes[size]} strokeWidth={1.75} />
            </motion.span>
          </motion.span>
        </Avatar>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          disabled={disabled}
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            if (file) {
              const objectUrl = URL.createObjectURL(file);
              revokeLocalPreview();
              localPreviewRef.current = objectUrl;
              setPreview(objectUrl);
            } else {
              revokeLocalPreview();
              setPreview(src ?? null);
            }
            onChange?.(file);
          }}
        />
        {children}
      </label>
    );
  },
);
AvatarUpload.displayName = "AvatarUpload";

/* -------------------------------------------------------------------------- */
/*                        Ring pulse (keyframes injection)                     */
/* -------------------------------------------------------------------------- */

const AVATAR_STYLE_ID = "venumity-avatar-styles-v1";

function ensureAvatarStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(AVATAR_STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = AVATAR_STYLE_ID;
  style.textContent = `
    @keyframes avatar-ring-pulse {
      0%   { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.55); }
      100% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
    }
    @media (prefers-reduced-motion: reduce) {
      [data-slot="avatar-status"] { animation: none !important; }
    }
  `;
  document.head.appendChild(style);
}

if (typeof document !== "undefined") {
  ensureAvatarStyles();
}

/* -------------------------------------------------------------------------- */
/*                                  Exports                                    */
/* -------------------------------------------------------------------------- */

export { avatarVariants, presets as avatarPresets };
export { getInitials as getAvatarInitials, toneFromSeed as avatarToneFromSeed };
