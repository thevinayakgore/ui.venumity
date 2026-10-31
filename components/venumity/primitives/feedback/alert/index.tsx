"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  AnimatePresence,
  type MotionProps,
  type MotionStyle,
  type Transition,
  type Variants,
  type HTMLMotionProps,
} from "motion/react";

export type AlertAnimation =
  | "none"
  | "fade"
  | "scale"
  | "slide"
  | "bounce"
  | "flip"
  | "blur"
  | "elastic";

interface Preset {
  initial: MotionProps["initial"];
  animate: MotionProps["animate"];
  exit: MotionProps["exit"];
  transition: Transition;
  motionProps?: Partial<MotionProps>;
  style?: MotionStyle;
}

const presets: Record<AlertAnimation, Preset> = {
  none: {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: { opacity: 1 },
    transition: { duration: 0 },
  },

  fade: {
    initial: { opacity: 0, y: -6, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -4, filter: "blur(4px)" },
    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
  },

  scale: {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.94 },
    transition: {
      type: "spring" as const,
      stiffness: 480,
      damping: 26,
      mass: 0.7,
    },
    style: { transformOrigin: "top left" },
  },

  slide: {
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    transition: { type: "spring" as const, stiffness: 420, damping: 30 },
    style: { transformOrigin: "top left" },
  },

  bounce: {
    initial: { opacity: 0, y: -12, scale: 0.94 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -8, scale: 0.96 },
    transition: {
      type: "spring" as const,
      stiffness: 620,
      damping: 16,
      mass: 0.7,
    },
    style: { transformOrigin: "top left" },
  },

  flip: {
    initial: { opacity: 0, rotateX: -28, y: -8 },
    animate: { opacity: 1, rotateX: 0, y: 0 },
    exit: { opacity: 0, rotateX: -22, y: -6 },
    transition: { type: "spring" as const, stiffness: 460, damping: 26 },
    style: { transformPerspective: 900, transformOrigin: "top center" },
  },

  blur: {
    initial: { opacity: 0, filter: "blur(12px)", scale: 0.96, y: -4 },
    animate: { opacity: 1, filter: "blur(0px)", scale: 1, y: 0 },
    exit: { opacity: 0, filter: "blur(8px)", scale: 0.98, y: -4 },
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
    style: { transformOrigin: "top left" },
  },

  elastic: {
    initial: { opacity: 0, scale: 0.8, rotate: -1.5, y: -6 },
    animate: { opacity: 1, scale: 1, rotate: 0, y: 0 },
    exit: { opacity: 0, scale: 0.9, rotate: 1, y: -4 },
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 12,
      mass: 0.65,
    },
    style: { transformOrigin: "top left" },
  },
};

const slideVariants: Variants = {
  hidden: (side: string) => {
    switch (side) {
      case "top":
        return { opacity: 0, y: 12 };
      case "bottom":
        return { opacity: 0, y: -12 };
      case "left":
        return { opacity: 0, x: 16 };
      case "right":
        return { opacity: 0, x: -16 };
      default:
        return { opacity: 0, y: -12 };
    }
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring" as const, stiffness: 420, damping: 30 },
  },
  exit: (side: string) => {
    switch (side) {
      case "top":
        return { opacity: 0, y: 10, transition: { duration: 0.14 } };
      case "bottom":
        return { opacity: 0, y: -10, transition: { duration: 0.14 } };
      case "left":
        return { opacity: 0, x: 12, transition: { duration: 0.14 } };
      case "right":
        return { opacity: 0, x: -12, transition: { duration: 0.14 } };
      default:
        return { opacity: 0, y: -10, transition: { duration: 0.14 } };
    }
  },
};

const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 backdrop-blur-sm rounded-lg border px-3 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "bg-destructive/5 dark:bg-destructive/15 border-destructive/60 text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current",
        success:
          "bg-emerald-500/5 dark:bg-emerald-500/15 border-emerald-500/60 text-emerald-500 dark:text-emerald-400 *:data-[slot=alert-description]:text-emerald-500/90 dark:*:data-[slot=alert-description]:text-emerald-400/90 *:[svg]:text-emerald-500 dark:*:[svg]:text-emerald-400",
        warning:
          "bg-amber-500/5 dark:bg-amber-500/15 border-amber-500/60 text-amber-500 dark:text-amber-400 *:data-[slot=alert-description]:text-amber-500/90 dark:*:data-[slot=alert-description]:text-amber-400/90 *:[svg]:text-amber-500 dark:*:[svg]:text-amber-400",
        info: "bg-sky-500/5 dark:bg-sky-500/15 border-sky-500/60 text-sky-500 dark:text-sky-400 *:data-[slot=alert-description]:text-sky-500/90 dark:*:data-[slot=alert-description]:text-sky-400/90 *:[svg]:text-sky-500 dark:*:[svg]:text-sky-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface AlertContextValue {
  animation: AlertAnimation;
}

const AlertContext = React.createContext<AlertContextValue>({
  animation: "fade",
});

export interface AlertProps
  extends
    Omit<
      HTMLMotionProps<"div">,
      "initial" | "animate" | "exit" | "transition" | "style" | "title"
    >,
    VariantProps<typeof alertVariants> {
  animation?: AlertAnimation;
  side?: "top" | "bottom" | "left" | "right";
  open?: boolean;
  children?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = "default",
      animation = "fade",
      side = "top",
      open,
      children,
      ...props
    },
    ref,
  ) => {
    const safeAnimation: AlertAnimation = animation ?? "fade";
    const preset = presets[safeAnimation];

    const content = (
      <motion.div
        ref={ref}
        {...preset.motionProps}
        initial={preset.initial}
        animate={preset.animate}
        exit={preset.exit}
        transition={preset.transition}
        custom={side}
        variants={safeAnimation === "slide" ? slideVariants : undefined}
        style={preset.style}
        role="alert"
        data-slot="alert"
        data-animation={safeAnimation}
        data-variant={variant}
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {children}
      </motion.div>
    );

    return (
      <AlertContext.Provider value={{ animation: safeAnimation }}>
        {open !== undefined ? (
          <AnimatePresence initial={false}>
            {open ? content : null}
          </AnimatePresence>
        ) : (
          content
        )}
      </AlertContext.Provider>
    );
  },
);
Alert.displayName = "Alert";

export type AlertTitleProps = React.ComponentProps<"div">;

function AlertTitle({ className, ...props }: AlertTitleProps) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}
AlertTitle.displayName = "AlertTitle";

export type AlertDescriptionProps = React.ComponentProps<"div">;

function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        className,
      )}
      {...props}
    />
  );
}
AlertDescription.displayName = "AlertDescription";

export type AlertActionProps = React.ComponentProps<"div">;

function AlertAction({ className, ...props }: AlertActionProps) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-1 right-1 space-x-0.5", className)}
      {...props}
    />
  );
}
AlertAction.displayName = "AlertAction";

export { Alert, AlertTitle, AlertDescription, AlertAction, alertVariants };
