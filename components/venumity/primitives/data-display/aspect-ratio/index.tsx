"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { motion, useReducedMotion } from "motion/react";

/* -------------------------------------------------------------------------- */
/*                                  Types                                     */
/* -------------------------------------------------------------------------- */

export type AspectRatioVariant =
  | "video" // 16/9
  | "portrait" // 9/16
  | "square" // 1/1
  | "cinema" // 21/9
  | "photo"; // 4/3

export type AspectRatioAnimation =
  | "none"
  | "shimmer"
  | "wipe-right"
  | "wipe-up"
  | "wipe-down"
  | "wipe-left";

export interface AspectRatioProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /**
   * Preset variant or custom ratio string like "16/9", "4/3", "15/5", etc.
   * If you pass a custom string, it will be parsed as width/height.
   */
  variant?: AspectRatioVariant | (string & {});
  /** Explicit numeric ratio. Overrides `variant` if provided. */
  ratio?: number;
  children?: React.ReactNode;
}

export interface AspectRatioImageProps extends Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "onLoad"
> {
  fallback?: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                              Ratio presets                                 */
/* -------------------------------------------------------------------------- */

const RATIO_PRESETS: Record<AspectRatioVariant, number> = {
  video: 16 / 9,
  portrait: 9 / 16,
  square: 1,
  cinema: 21 / 9,
  photo: 4 / 3,
};

function parseRatio(input: string | undefined): number | undefined {
  if (!input) return undefined;
  // If it's a preset, let the caller handle it
  if (["video", "portrait", "square", "cinema", "photo"].includes(input)) {
    return undefined;
  }
  // Support "16/9", "4/3", "15/5", or plain number "1.78"
  if (input.includes("/")) {
    const [w, h] = input.split("/").map((s) => parseFloat(s.trim()));
    if (Number.isFinite(w) && Number.isFinite(h) && h !== 0) {
      return w / h;
    }
  } else {
    const num = parseFloat(input);
    if (Number.isFinite(num) && num > 0) {
      return num;
    }
  }
  return undefined;
}

const aspectRatioVariants = cva(
  "relative w-full overflow-hidden rounded-xl bg-foreground/4",
  {
    variants: {
      variant: {
        video: "",
        portrait: "",
        square: "",
        cinema: "",
        photo: "",
      },
    },
    defaultVariants: { variant: "video" },
  },
);

/* -------------------------------------------------------------------------- */
/*                              Root                                          */
/* -------------------------------------------------------------------------- */

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ variant = "video", ratio, className, style, children, ...props }, ref) => {
    const safeVariant: AspectRatioVariant | (string & {}) = variant ?? "video";

    // If ratio is explicitly passed, use it
    let resolvedRatio: number | undefined = ratio;

    // Else if variant is a custom string, try to parse it
    if (resolvedRatio == null) {
      const parsed = parseRatio(variant as string);
      if (parsed != null) {
        resolvedRatio = parsed;
      }
    }

    // Else use preset map if it's a known variant
    if (
      resolvedRatio == null &&
      RATIO_PRESETS[safeVariant as AspectRatioVariant]
    ) {
      resolvedRatio = RATIO_PRESETS[safeVariant as AspectRatioVariant];
    }

    // Fallback
    if (resolvedRatio == null) {
      resolvedRatio = RATIO_PRESETS.video;
    }

    const isPresetVariant =
      variant == null ||
      ["video", "portrait", "square", "cinema", "photo"].includes(variant);

    return (
      <div
        ref={ref}
        data-slot="aspect-ratio"
        data-variant={isPresetVariant ? (variant ?? "video") : undefined}
        style={{ aspectRatio: resolvedRatio, ...style }}
        className={cn(
          aspectRatioVariants({
            variant: isPresetVariant
              ? (variant as AspectRatioVariant)
              : "video",
          }),
          "[&>img]:absolute [&>img]:inset-0 [&>img]:size-full [&>img]:object-cover",
          "[&>video]:absolute [&>video]:inset-0 [&>video]:size-full [&>video]:object-cover",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
AspectRatio.displayName = "AspectRatio";

/* -------------------------------------------------------------------------- */
/*                              Image                                         */
/* -------------------------------------------------------------------------- */

export const AspectRatioImage = React.forwardRef<
  HTMLImageElement,
  AspectRatioImageProps
>(({ className, fallback, src, ...props }, ref) => {
  const reduceMotion = useReducedMotion() ?? false;
  const [loaded, setLoaded] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  const setRefs = React.useCallback(
    (node: HTMLImageElement | null) => {
      imgRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLImageElement | null>).current = node;
    },
    [ref],
  );

  return (
    <>
      {!loaded ? (
        <div
          aria-hidden
          data-slot="aspect-ratio-fallback"
          className="absolute inset-0 z-1"
        >
          {fallback ?? <div className="size-full bg-foreground/6" />}
        </div>
      ) : null}

      <motion.img
        ref={setRefs}
        data-slot="aspect-ratio-image"
        data-loaded={loaded}
        initial={{ opacity: 0 }}
        animate={{ opacity: reduceMotion ? 1 : loaded ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.2 }}
        onLoad={() => setLoaded(true)}
        src={src}
        className={cn("absolute inset-0 size-full object-cover", className)}
        alt={props.alt}
        onLoadCapture={props.onLoadCapture}
        onError={props.onError}
      />
    </>
  );
});
AspectRatioImage.displayName = "AspectRatioImage";

/* -------------------------------------------------------------------------- */
/*                           AnimationBar                                     */
/* -------------------------------------------------------------------------- */

export interface AnimationBarProps extends React.HTMLAttributes<HTMLDivElement> {
  animation?: AspectRatioAnimation;
  duration?: number;
  repeat?: "infinite" | "none";
  delay?: number;
}

const AnimationBar = React.forwardRef<HTMLDivElement, AnimationBarProps>(
  (
    {
      animation = "shimmer",
      duration,
      repeat = "infinite",
      delay = 0,
      className,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion() ?? false;
    const safeAnimation: AspectRatioAnimation = reduceMotion
      ? "none"
      : animation;

    if (safeAnimation === "none") {
      return null;
    }

    if (
      safeAnimation === "wipe-right" ||
      safeAnimation === "wipe-up" ||
      safeAnimation === "wipe-down" ||
      safeAnimation === "wipe-left"
    ) {
      return (
        <WipeBar
          animation={safeAnimation}
          className={className}
          ref={ref}
          {...props}
          duration={duration}
          repeat={repeat}
          delay={delay}
        />
      );
    }

    return (
      <ShimmerBar
        className={className}
        ref={ref}
        {...props}
        duration={duration}
        repeat={repeat}
        delay={delay}
      />
    );
  },
);
AnimationBar.displayName = "AnimationBar";

/* ----------------------------- shimmer ------------------------------ */

interface ShimmerBarProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
  repeat?: "infinite" | "none";
  delay?: number;
}

const ShimmerBar = React.forwardRef<HTMLDivElement, ShimmerBarProps>(
  (
    { className, duration = 1.65, repeat = "infinite", delay = 0, ...props },
    ref,
  ) => {
    const repeatValue: number | undefined =
      repeat === "infinite" ? Infinity : 0;

    return (
      <motion.div
        ref={ref}
        className={cn(
          "absolute inset-0 bg-linear-to-r from-transparent via-foreground/14 to-transparent",
          className,
        )}
        style={{ backgroundSize: "200% 100%", ...props.style }}
        animate={{ backgroundPositionX: ["0%", "100%", "0%"] }}
        transition={{
          duration,
          repeat: repeatValue,
          ease: "linear",
          delay,
        }}
      />
    );
  },
);
ShimmerBar.displayName = "ShimmerBar";

/* ----------------------------- wipes -------------------------------- */

interface WipeBarProps extends React.HTMLAttributes<HTMLDivElement> {
  animation: AspectRatioAnimation;
  duration?: number;
  repeat?: "infinite" | "none";
  delay?: number;
}

const WipeBar = React.forwardRef<HTMLDivElement, WipeBarProps>(
  (
    {
      animation,
      className,
      duration = 1.6,
      repeat = "infinite",
      delay = 0,
      ...props
    },
    ref,
  ) => {
    const dir =
      animation === "wipe-right"
        ? "right"
        : animation === "wipe-left"
          ? "left"
          : animation === "wipe-up"
            ? "up"
            : "down";

    const repeatValue: number | undefined =
      repeat === "infinite" ? Infinity : 0;

    const clipVariants: Record<typeof dir, Record<string, string>> = {
      right: {
        hidden: "inset(0 100% 0 0)",
        visible: "inset(0 0 0 0)",
        exit: "inset(0 0 0 100%)",
      },
      left: {
        hidden: "inset(0 0 0 100%)",
        visible: "inset(0 0 0 0)",
        exit: "inset(0 100% 0 0)",
      },
      up: {
        hidden: "inset(100% 0 0 0)",
        visible: "inset(0 0 0 0)",
        exit: "inset(0 0 100% 0)",
      },
      down: {
        hidden: "inset(0 0 100% 0)",
        visible: "inset(0 0 0 0)",
        exit: "inset(100% 0 0 0)",
      },
    };

    return (
      <div
        ref={ref}
        {...props}
        className={cn("relative size-full overflow-hidden", className)}
      >
        <ShimmerBar
          className="absolute inset-0"
          duration={duration}
          repeat={repeat}
          delay={delay}
        />

        <motion.div
          className="absolute inset-0 bg-white/10"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { clipPath: clipVariants[dir].hidden },
            visible: { clipPath: clipVariants[dir].visible },
            exit: { clipPath: clipVariants[dir].exit },
          }}
          transition={{
            duration,
            repeat: repeatValue,
            ease: "easeOut",
            delay,
          }}
        />
      </div>
    );
  },
);
WipeBar.displayName = "WipeBar";

/* -------------------------------------------------------------------------- */
/*                                  Exports                                   */
/* -------------------------------------------------------------------------- */

export {
  aspectRatioVariants,
  RATIO_PRESETS as aspectRatioPresets,
  AnimationBar,
};
