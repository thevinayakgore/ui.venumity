import * as React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { motion, HTMLMotionProps } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "wensity-button relative inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-white",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-5",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonAnimation = "scale" | "bounce" | "ripple";

export type IconMotion =
  | "spin"
  | "pulse"
  | "bounce"
  | "wiggle"
  | "up"
  | "down"
  | "left"
  | "right"
  | "right-up"
  | "bottom-left"
  | "zoom";

export type ButtonProps = HTMLMotionProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    animation?: ButtonAnimation;
    children?: React.ReactNode;

    // Motion Props
    scale?: number;
    scaleTap?: number;
    bounceAmount?: number;

    // Icon Props
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    iconMotion?: IconMotion;
    leftIconClassName?: string;
    rightIconClassName?: string;

    // Shimmer Props
    shimmer?: boolean;
    shimmerColor?: string;
    shimmerDuration?: string;
    shimmerDelay?: string;

    // Ripple Props
    rippleColor?: string;
    rippleLayers?: number;
    rippleDuration?: number;
  };

const ICON_MOTION_SHELL =
  "btn-icon-motion inline-flex shrink-0 origin-center transform-gpu will-change-transform";

const iconMotionClass: Record<IconMotion, string> = {
  spin: "btn-icon-motion--spin",
  pulse: "btn-icon-motion--pulse",
  bounce: "btn-icon-motion--bounce",
  wiggle: "btn-icon-motion--wiggle",
  up: "btn-icon-motion--up",
  down: "btn-icon-motion--down",
  left: "btn-icon-motion--left",
  right: "btn-icon-motion--right",
  "right-up": "btn-icon-motion--right-up",
  "bottom-left": "btn-icon-motion--bottom-left",
  zoom: "btn-icon-motion--zoom",
};

const BUTTON_MOTION_KEYFRAMES_ID = "button-motion-keyframes";

function ensureButtonIconKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById(BUTTON_MOTION_KEYFRAMES_ID)) return;

  const style = document.createElement("style");
  style.id = BUTTON_MOTION_KEYFRAMES_ID;
  style.textContent = `
    @keyframes button-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes button-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.25); }
    }
    @keyframes button-bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
    @keyframes button-wiggle {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-10deg); }
      75% { transform: rotate(10deg); }
    }
    @keyframes button-zoom {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.15) rotate(5deg); }
    }

    .btn-icon-motion--up,
    .btn-icon-motion--down,
    .btn-icon-motion--left,
    .btn-icon-motion--right,
    .btn-icon-motion--right-up,
    .btn-icon-motion--bottom-left {
      transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    
    @media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
      .wensity-button:hover .btn-icon-motion--spin { animation: button-spin 1s linear infinite; }
      .wensity-button:hover .btn-icon-motion--pulse { animation: button-pulse 600ms ease-in-out infinite; }
      .wensity-button:hover .btn-icon-motion--bounce { animation: button-bounce 500ms ease-in-out infinite; }
      .wensity-button:hover .btn-icon-motion--wiggle { animation: button-wiggle 300ms ease-in-out infinite; }
      .wensity-button:hover .btn-icon-motion--zoom { animation: button-zoom 400ms ease-in-out infinite; }

      .wensity-button:hover .btn-icon-motion--up { transform: translateY(-5px); }
      .wensity-button:hover .btn-icon-motion--down { transform: translateY(5px); }
      .wensity-button:hover .btn-icon-motion--left { transform: translateX(-5px); }
      .wensity-button:hover .btn-icon-motion--right { transform: translateX(5px); }
      .wensity-button:hover .btn-icon-motion--right-up { transform: translate(5px, -5px); }
      .wensity-button:hover .btn-icon-motion--bottom-left { transform: translate(-5px, 5px); }
    }
    
    @media (prefers-reduced-motion: reduce) {
      .btn-icon-motion {
        animation: none !important;
        transition: none !important;
        transform: none !important;
      }
    }

    @keyframes btn-sweep {
      0% { transform: translateX(-150%) skewX(-20deg); }
      100% { transform: translateX(250%) skewX(-20deg); }
    }
  `;
  document.head.appendChild(style);
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      animation,
      children,
      scale = 1.02,
      scaleTap = 0.98,
      bounceAmount = 0.05,
      leftIcon,
      rightIcon,
      iconMotion,
      leftIconClassName,
      rightIconClassName,
      shimmer = false,
      shimmerDelay = "0s",
      shimmerDuration = "2.5s",
      shimmerColor = "color-mix(in oklab, var(--primary-foreground) 40%, transparent)",
      rippleColor = "var(--primary-foreground)",
      rippleLayers = 3,
      rippleDuration = 0.75,
      onClick,
      ...props
    },
    ref,
  ) => {
    const hasIconMotion = Boolean(iconMotion);
    const [ripples, setRipples] = React.useState<
      { id: number; x: number; y: number }[]
    >([]);

    React.useLayoutEffect(() => {
      if (hasIconMotion || shimmer) ensureButtonIconKeyframes();
    }, [hasIconMotion, shimmer]);

    const getPreset = (): HTMLMotionProps<"button"> => {
      if (animation === "scale") {
        return {
          whileHover: { scale },
          whileTap: { scale: scaleTap },
          transition: { type: "spring", stiffness: 400, damping: 25 },
        };
      }

      if (animation === "bounce") {
        return {
          whileHover: { y: -bounceAmount * 10, scale: scale },
          whileTap: { y: 0, scale: scaleTap },
          transition: { type: "spring", stiffness: 600, damping: 12 },
        };
      }

      return {};
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (animation === "ripple") {
        const rect = e.currentTarget.getBoundingClientRect();
        const id = Date.now();
        setRipples((prev) => [
          ...prev,
          {
            id,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          },
        ]);
        setTimeout(
          () => {
            setRipples((prev) => prev.filter((r) => r.id !== id));
          },
          (rippleDuration + 0.5) * 1000,
        );
      }
      onClick?.(e);
    };

    const composedClassName = cn(
      buttonVariants({ variant, size, className }),
      hasIconMotion && "group"
    );

    const content = (
      <>
        {shimmer && (
          <span
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-md"
            aria-hidden="true"
          >
            <span
              className="absolute top-0 bottom-0 left-0 w-1/2"
              style={{
                background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
                animation: `btn-sweep ${shimmerDuration} ${shimmerDelay} infinite`,
              }}
            />
          </span>
        )}

        {animation === "ripple" &&
          ripples.flatMap((ripple) =>
            Array.from({ length: rippleLayers }, (_, waveIndex) => (
              <motion.span
                key={`${ripple.id}-${waveIndex}`}
                aria-hidden="true"
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: [0, 2.5, 4], opacity: [0.6, 0.3, 0] }}
                transition={{
                  duration: rippleDuration,
                  delay: waveIndex * 0.14,
                  ease: "easeOut",
                }}
                style={{
                  left: ripple.x - 10,
                  top: ripple.y - 10,
                  width: 20,
                  height: 20,
                  backgroundColor: rippleColor,
                }}
                className="pointer-events-none absolute rounded-full z-0"
              />
            )),
          )}

        {leftIcon ? (
          <span
            className={cn(
              "relative z-10 inline-flex shrink-0",
              iconMotion && ICON_MOTION_SHELL,
              iconMotion && iconMotionClass[iconMotion],
              leftIconClassName,
            )}
          >
            {leftIcon}
          </span>
        ) : null}

        <span className="relative z-10 inline-flex items-center">
          {children}
        </span>

        {rightIcon ? (
          <span
            className={cn(
              "relative z-10 inline-flex shrink-0",
              iconMotion && ICON_MOTION_SHELL,
              iconMotion && iconMotionClass[iconMotion],
              rightIconClassName,
            )}
          >
            {rightIcon}
          </span>
        ) : null}
      </>
    );

    if (asChild) {
      return (
        <Slot
          className={composedClassName}
          ref={ref}
          {...(props as React.HTMLAttributes<HTMLElement>)}
        >
          {children}
        </Slot>
      );
    }

    const Comp = motion.button;
    const preset = getPreset();

    return (
      <Comp
        className={composedClassName}
        ref={ref}
        {...preset}
        {...props}
        onClick={handleClick}
      >
        {content}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
