"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  type Variants,
  type Transition,
  type MotionProps,
  type MotionStyle,
} from "framer-motion";
import {
  Command as ShadcnCommand,
  CommandEmpty as ShadcnCommandEmpty,
  CommandGroup as ShadcnCommandGroup,
  CommandInput as ShadcnCommandInput,
  CommandItem as ShadcnCommandItem,
  CommandList as ShadcnCommandList,
  CommandSeparator as ShadcnCommandSeparator,
  CommandShortcut as ShadcnCommandShortcut,
  CommandDialog as ShadcnCommandDialog,
} from "@/components/ui/command";

/* -------------------------------------------------------------------------- */
/*                              Animation axis                                */
/* -------------------------------------------------------------------------- */

export type CommandAnimation = "none" | "scale" | "slide" | "elastic";

interface Preset {
  initial: MotionProps["initial"];
  animate: MotionProps["animate"];
  exit: MotionProps["exit"];
  transition: Transition;
  motionProps?: Partial<MotionProps>;
  style?: MotionStyle;
}

const presets: Record<CommandAnimation, Preset> = {
  none: {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: { opacity: 1 },
    transition: { duration: 0 },
  },

  /** Zoom in from the top-left corner like macOS Spotlight. */
  scale: {
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.96 },
    transition: {
      type: "spring" as const,
      stiffness: 500,
      damping: 28,
      mass: 0.7,
    },
    style: { transformOrigin: "top center" },
  },

  /** Direction-aware slide. */
  slide: {
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    transition: {
      type: "spring" as const,
      stiffness: 420,
      damping: 30,
    },
    style: { transformOrigin: "top center" },
  },

  /** Under-damped spring — overshoots then settles. */
  elastic: {
    initial: { opacity: 0, scale: 0.82, y: -14, rotate: -1.2 },
    animate: { opacity: 1, scale: 1, y: 0, rotate: 0 },
    exit: { opacity: 0, scale: 0.9, y: -8, rotate: 1 },
    transition: {
      type: "spring" as const,
      stiffness: 380,
      damping: 10,
      mass: 0.6,
    },
    style: { transformOrigin: "top center" },
  },
};

/** Direction-aware slide variants. */
const slideVariants: Variants = {
  hidden: (side: string) => {
    switch (side) {
      case "top":
        return { opacity: 0, y: 16 };
      case "bottom":
        return { opacity: 0, y: -16 };
      case "left":
        return { opacity: 0, x: 20 };
      case "right":
        return { opacity: 0, x: -20 };
      default:
        return { opacity: 0, y: -16 };
    }
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 420,
      damping: 30,
    },
  },
  exit: (side: string) => {
    switch (side) {
      case "top":
        return { opacity: 0, y: 12, transition: { duration: 0.14 } };
      case "bottom":
        return { opacity: 0, y: -12, transition: { duration: 0.14 } };
      case "left":
        return { opacity: 0, x: 16, transition: { duration: 0.14 } };
      case "right":
        return { opacity: 0, x: -16, transition: { duration: 0.14 } };
      default:
        return { opacity: 0, y: -12, transition: { duration: 0.14 } };
    }
  },
};

/* -------------------------------------------------------------------------- */
/*                     Per-item motion (list rows)                            */
/* -------------------------------------------------------------------------- */

const itemParentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.018,
      delayChildren: 0.02,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.008,
      staggerDirection: -1,
    },
  },
};

const itemChildVariants: Variants = {
  hidden: { opacity: 0, y: 4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.16, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -2,
    transition: { duration: 0.1 },
  },
};

/* -------------------------------------------------------------------------- */
/*                             Extended cva                                   */
/* -------------------------------------------------------------------------- */

const commandVariants = cva(
  "flex h-full w-full flex-col overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-2xl ring-1 ring-foreground/5",
  {
    variants: {
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-[15px]",
      },
      variant: {
        default: "border-border",
        ghost: "border-transparent bg-background/80 backdrop-blur-md shadow-xl",
      },
    },
    defaultVariants: { size: "default", variant: "default" },
  },
);

/* -------------------------------------------------------------------------- */
/*                              Context                                       */
/* -------------------------------------------------------------------------- */

interface CommandContextValue {
  size: "sm" | "default" | "lg";
  animateItems: boolean;
}

const CommandContext = React.createContext<CommandContextValue>({
  size: "default",
  animateItems: true,
});

const useCommand = () => React.useContext(CommandContext);

/* -------------------------------------------------------------------------- */
/*                                  Root                                      */
/* -------------------------------------------------------------------------- */

export interface CommandProps
  extends
    Omit<React.ComponentProps<typeof ShadcnCommand>, "className">,
    Omit<VariantProps<typeof commandVariants>, "size" | "variant"> {
  className?: string;
  size?: VariantProps<typeof commandVariants>["size"];
  variant?: VariantProps<typeof commandVariants>["variant"];
  animation?: CommandAnimation;
  side?: "top" | "bottom" | "left" | "right";
  animateItems?: boolean;
  motionOverrides?: {
    initial?: MotionProps["initial"];
    animate?: MotionProps["animate"];
    exit?: MotionProps["exit"];
    transition?: Transition;
    motionProps?: Partial<MotionProps>;
    style?: MotionStyle;
    variants?: Variants;
  };
}

export function Command({
  className,
  size = "default",
  variant = "default",
  animation = "scale",
  side = "top",
  animateItems = true,
  motionOverrides,
  children,
  ...props
}: CommandProps) {
  const safeAnimation: CommandAnimation = animation ?? "scale";
  const safeSize: "sm" | "default" | "lg" = size ?? "default";
  const safeVariant: "default" | "ghost" = variant ?? "default";
  const safeSide: "top" | "bottom" | "left" | "right" = side ?? "top";

  const base = presets[safeAnimation];

  const preset: Preset = {
    initial: motionOverrides?.initial ?? base.initial,
    animate: motionOverrides?.animate ?? base.animate,
    exit: motionOverrides?.exit ?? base.exit,
    transition: motionOverrides?.transition ?? base.transition,
    motionProps: motionOverrides?.motionProps ?? base.motionProps,
    style: { ...base.style, ...(motionOverrides?.style ?? {}) },
  };

  return (
    <CommandContext.Provider value={{ size: safeSize, animateItems }}>
      <motion.div
        {...preset.motionProps}
        initial={preset.initial}
        animate={preset.animate}
        exit={preset.exit}
        transition={preset.transition}
        variants={
          motionOverrides?.variants ??
          (safeAnimation === "slide" ? slideVariants : undefined)
        }
        custom={safeSide}
        style={preset.style}
        data-slot="command"
        className={cn(
          commandVariants({ size: safeSize, variant: safeVariant }),
          className,
        )}
      >
        <ShadcnCommand className="bg-transparent" {...props}>
          {children}
        </ShadcnCommand>
      </motion.div>
    </CommandContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Input                                      */
/* -------------------------------------------------------------------------- */

export type CommandInputProps = React.ComponentProps<typeof ShadcnCommandInput>;

export function CommandInput({ className, ...props }: CommandInputProps) {
  const { size } = useCommand();
  const sizeCls =
    size === "sm" ? "h-9 text-xs" : size === "lg" ? "h-12 text-[15px]" : "h-11";

  return (
    <ShadcnCommandInput
      data-slot="command-input"
      className={cn(
        "bg-transparent",
        sizeCls,
        "**:[[cmdk-input-wrapper]]:border-0",
        className,
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                 List                                       */
/* -------------------------------------------------------------------------- */

export type CommandListProps = React.ComponentProps<typeof ShadcnCommandList>;

export function CommandList({
  className,
  children,
  ...props
}: CommandListProps) {
  const { animateItems, size } = useCommand();
  const maxH =
    size === "sm" ? "max-h-64" : size === "lg" ? "max-h-96" : "max-h-80";

  return (
    <ShadcnCommandList
      data-slot="command-list"
      className={cn(maxH, "overflow-y-auto p-1", className)}
      {...props}
    >
      {animateItems ? (
        <motion.div
          variants={itemParentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </ShadcnCommandList>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Item                                       */
/* -------------------------------------------------------------------------- */

export interface CommandItemProps extends React.ComponentProps<
  typeof ShadcnCommandItem
> {
  animate?: boolean;
}

export function CommandItem({
  className,
  animate = true,
  children,
  ...props
}: CommandItemProps) {
  const { animateItems } = useCommand();
  const shouldAnimate = animate && animateItems;

  const item = (
    <ShadcnCommandItem
      data-slot="command-item"
      className={cn(
        "group/cmd-item flex items-center gap-2 rounded-md px-2 py-2 text-sm outline-none",
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </ShadcnCommandItem>
  );

  if (!shouldAnimate) return item;

  return <motion.div variants={itemChildVariants}>{item}</motion.div>;
}

/* -------------------------------------------------------------------------- */
/*                                 Group                                      */
/* -------------------------------------------------------------------------- */

export type CommandGroupProps = React.ComponentProps<typeof ShadcnCommandGroup>;

export function CommandGroup({ className, ...props }: CommandGroupProps) {
  return (
    <ShadcnCommandGroup
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-1 text-foreground",
        "**:[cmdk-group-heading]:px-2 **:[cmdk-group-heading]:py-1.5",
        "**:[cmdk-group-heading]:text-[11px] **:[cmdk-group-heading]:font-semibold",
        "**:[cmdk-group-heading]:tracking-wider **:[cmdk-group-heading]:uppercase",
        "**:[cmdk-group-heading]:text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                              Empty + Separator                             */
/* -------------------------------------------------------------------------- */

export type CommandEmptyProps = React.ComponentProps<typeof ShadcnCommandEmpty>;

export function CommandEmpty({ className, ...props }: CommandEmptyProps) {
  return (
    <ShadcnCommandEmpty
      data-slot="command-empty"
      className={cn(
        "py-6 text-center text-sm text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export type CommandSeparatorProps = React.ComponentProps<
  typeof ShadcnCommandSeparator
>;

export function CommandSeparator({
  className,
  ...props
}: CommandSeparatorProps) {
  return (
    <ShadcnCommandSeparator
      data-slot="command-separator"
      className={cn("-mx-1 my-1 h-px bg-border/60", className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                Shortcut                                    */
/* -------------------------------------------------------------------------- */

export type CommandShortcutProps = React.ComponentProps<
  typeof ShadcnCommandShortcut
>;

export function CommandShortcut({ className, ...props }: CommandShortcutProps) {
  return (
    <ShadcnCommandShortcut
      data-slot="command-shortcut"
      className={cn(
        "ml-auto text-[10px] tracking-widest text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                Dialog                                      */
/* -------------------------------------------------------------------------- */

export interface CommandDialogProps extends Omit<
  React.ComponentProps<typeof ShadcnCommandDialog>,
  "children"
> {
  className?: string;
  size?: VariantProps<typeof commandVariants>["size"];
  variant?: VariantProps<typeof commandVariants>["variant"];
  animation?: CommandAnimation;
  side?: "top" | "bottom" | "left" | "right";
  animateItems?: boolean;
  children: React.ReactNode;
}

export function CommandDialog({
  className,
  size = "default",
  variant = "default",
  animation = "scale",
  side = "top",
  animateItems = true,
  children,
  ...props
}: CommandDialogProps) {
  const safeAnimation: CommandAnimation = animation ?? "scale";

  return (
    <ShadcnCommandDialog {...props}>
      <Command
        className={cn("max-w-2xl", className)}
        size={size}
        variant={variant}
        animation={safeAnimation}
        side={side}
        animateItems={animateItems}
      >
        {children}
      </Command>
    </ShadcnCommandDialog>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Search icon helper                            */
/* -------------------------------------------------------------------------- */

export function CommandSearchIcon({ className }: { className?: string }) {
  return (
    <SearchIcon
      aria-hidden
      className={cn("size-4 shrink-0 text-muted-foreground", className)}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Exports                                   */
/* -------------------------------------------------------------------------- */

export {
  commandVariants,
  presets as commandPresets,
  slideVariants as commandSlideVariants,
  itemChildVariants as commandItemVariants,
  itemParentVariants as commandItemParentVariants,
};
