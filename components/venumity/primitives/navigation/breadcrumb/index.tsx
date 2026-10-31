"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ChevronRight, MoreHorizontal, Slash } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Transition,
} from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                              Animation axis                                */
/* -------------------------------------------------------------------------- */

export type BreadcrumbUnderline =
  | "none" // no hover underline (used with `with-icons` style navs)
  | "slide" // classic left-to-right wipe
  | "center" // grows outward from center
  | "dot" // small dot at the base that travels with the text
  | "dashed" // dashed line wipes in from left
  | "double" // double underline reveal
  | "pulse" // short pulse of the underline (on hover)
  | "grow-up" // line grows upward from baseline (still linear)
  | "ink-fill"; // background ink fills from left, text color swaps

/* -------------------------------------------------------------------------- */
/*                              Layout axes                                   */
/* -------------------------------------------------------------------------- */

export type BreadcrumbVariant =
  | "default"
  | "with-icons"
  | "expandable"
  | "dropdown"
  | "custom-separator";

/* -------------------------------------------------------------------------- */
/*                              Easing                                        */
/* -------------------------------------------------------------------------- */

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
const EASE_LINEAR: [number, number, number, number] = [0.32, 0.72, 0, 1];

/* -------------------------------------------------------------------------- */
/*                              Underline registry                            */
/* -------------------------------------------------------------------------- */

interface UnderlineConfig {
  /** The rendered underline element(s). Positioned absolute inside the text span. */
  render: (reduceMotion: boolean) => React.ReactNode;
}

const underlines: Record<BreadcrumbUnderline, UnderlineConfig> = {
  none: {
    render: () => null,
  },

  /* Wipe from left edge to right edge. */
  slide: {
    render: () => (
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0",
          "bg-current opacity-60",
          "transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "group-hover/crumb:scale-x-100",
          "motion-reduce:transition-none motion-reduce:group-hover/crumb:scale-x-100",
        )}
      />
    ),
  },

  /* Grow outward from the center. */
  center: {
    render: () => (
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-center scale-x-0",
          "bg-current opacity-60",
          "transition-transform duration-220 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "group-hover/crumb:scale-x-100",
          "motion-reduce:transition-none motion-reduce:group-hover/crumb:scale-x-100",
        )}
      />
    ),
  },

  /* A small dot that sits under the text and grows in width. */
  dot: {
    render: () => (
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-1.5 left-1/2 h-0.75 w-0.75 -translate-x-1/2 rounded-full",
          "bg-current",
          "transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "group-hover/crumb:w-full group-hover/crumb:rounded-sm",
          "motion-reduce:transition-none motion-reduce:group-hover/crumb:w-full",
        )}
      />
    ),
  },

  /* Dashed line wipes in using background-size. */
  dashed: {
    render: () => (
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-0.5 left-0 h-px w-full",
          "bg-[repeating-linear-gradient(to_right,currentColor_0,currentColor_3px,transparent_3px,transparent_6px)]",
          "bg-size-[0%_1px] bg-no-repeat bg-left",
          "transition-[background-size] duration-260 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "group-hover/crumb:bg-size-[100%_1px]",
          "motion-reduce:transition-none motion-reduce:group-hover/crumb:bg-size-[100%_1px]",
        )}
      />
    ),
  },

  /* Two parallel lines wipe in slightly offset. */
  double: {
    render: () => (
      <>
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0",
            "bg-current opacity-60",
            "transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
            "group-hover/crumb:scale-x-100",
            "motion-reduce:transition-none motion-reduce:group-hover/crumb:scale-x-100",
          )}
        />
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0",
            "bg-current opacity-35",
            "transition-transform duration-260 delay-[40ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
            "group-hover/crumb:scale-x-100",
            "motion-reduce:transition-none motion-reduce:group-hover/crumb:scale-x-100",
          )}
        />
      </>
    ),
  },

  /* Underline pulses — opacity keyframe on hover. No transform. */
  pulse: {
    render: (reduceMotion) => (
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-0.5 left-0 h-px w-full",
          "bg-current opacity-0",
          "group-hover/crumb:opacity-70",
          "transition-opacity duration-150",
          "motion-reduce:transition-none motion-reduce:group-hover/crumb:opacity-70",
          !reduceMotion &&
            "group-hover/crumb:animate-[bc-pulse_1.1s_ease-in-out_infinite]",
        )}
      />
    ),
  },

  /* Line grows upward from the baseline (single axis, linear). */
  "grow-up": {
    render: () => (
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute bottom-0 left-0 h-px w-full origin-bottom",
          "bg-current opacity-60",
          "scale-y-0",
          "transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "group-hover/crumb:scale-y-100",
          "motion-reduce:transition-none motion-reduce:group-hover/crumb:scale-y-100",
        )}
      />
    ),
  },

  /* Ink fill — background wipes left-to-right, text color inverts. */
  "ink-fill": {
    render: () => (
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-x-1 -inset-y-0.5 -z-10 rounded-sm",
          "bg-current opacity-10",
          "origin-left scale-x-0",
          "transition-transform duration-220 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "group-hover/crumb:scale-x-100",
          "motion-reduce:transition-none motion-reduce:group-hover/crumb:scale-x-100",
        )}
      />
    ),
  },
};

export const BREADCRUMB_UNDERLINES = Object.keys(
  underlines,
) as BreadcrumbUnderline[];

/* -------------------------------------------------------------------------- */
/*                              Extended cva                                  */
/* -------------------------------------------------------------------------- */

const breadcrumbLinkVariants = cva(
  cn(
    "group/crumb relative inline-flex items-center gap-1.5 rounded-sm text-sm font-medium leading-none tracking-[-0.01em]",
    "outline-none select-none",
    "transition-colors duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
    "motion-reduce:transition-none",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-3.5",
  ),
  {
    variants: {
      tone: {
        current: "text-foreground cursor-default",
        link: "text-muted-foreground hover:text-foreground",
      },
    },
    defaultVariants: { tone: "link" },
  },
);

/* -------------------------------------------------------------------------- */
/*                              Context                                       */
/* -------------------------------------------------------------------------- */

interface BreadcrumbContextValue {
  variant: BreadcrumbVariant;
  separator: React.ReactNode;
  underline: BreadcrumbUnderline;
}

const BreadcrumbContext = React.createContext<BreadcrumbContextValue>({
  variant: "default",
  separator: null,
  underline: "slide",
});

const useBreadcrumbContext = () => React.useContext(BreadcrumbContext);

/* -------------------------------------------------------------------------- */
/*                              Separators                                    */
/* -------------------------------------------------------------------------- */

function getDefaultSeparator(variant: BreadcrumbVariant): React.ReactNode {
  switch (variant) {
    case "with-icons":
      return (
        <ChevronRight className="size-3.5 text-muted-foreground opacity-50" />
      );
    case "custom-separator":
      return (
        <span className="text-muted-foreground/40 select-none text-xs">→</span>
      );
    default:
      return (
        <Slash className="size-3 rotate-[-20deg] text-muted-foreground opacity-40" />
      );
  }
}

/* -------------------------------------------------------------------------- */
/*                              Root                                          */
/* -------------------------------------------------------------------------- */

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  variant?: BreadcrumbVariant;
  /** Separator node. Falls back to the variant's default. */
  separator?: React.ReactNode;
  /** For collapsed/dropdown: max visible items before collapsing (min 3). */
  maxItems?: number;
  /** Which underline animation applies to link items. */
  underline?: BreadcrumbUnderline;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      variant = "default",
      separator: customSeparator,
      maxItems = 3,
      underline = "slide",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const safeVariant: BreadcrumbVariant = variant ?? "default";
    const safeUnderline: BreadcrumbUnderline = underline ?? "slide";
    const separator = customSeparator ?? getDefaultSeparator(safeVariant);

    const ctx = React.useMemo<BreadcrumbContextValue>(
      () => ({
        variant: safeVariant,
        separator,
        underline: safeUnderline,
      }),
      [safeVariant, separator, safeUnderline],
    );

    const items = React.Children.toArray(children);
    const maxVisibleItems = Number.isFinite(maxItems)
      ? Math.max(3, Math.floor(maxItems))
      : 3;

    if (
      (safeVariant === "expandable" || safeVariant === "dropdown") &&
      items.length > maxVisibleItems
    ) {
      const visibleMiddleCount = maxVisibleItems - 3;
      const leadingMiddleCount = Math.floor(visibleMiddleCount / 2);
      const trailingMiddleCount = visibleMiddleCount - leadingMiddleCount;
      const hiddenStartIndex = 1 + leadingMiddleCount;
      const hiddenEndIndex = items.length - 1 - trailingMiddleCount;
      const leadingItems = items.slice(0, hiddenStartIndex);
      const hiddenItems = items.slice(hiddenStartIndex, hiddenEndIndex);
      const trailingItems = items.slice(hiddenEndIndex);

      return (
        <BreadcrumbContext.Provider value={ctx}>
          <nav
            ref={ref}
            aria-label="breadcrumb"
            className={className}
            {...props}
          >
            <ol className="flex items-center gap-1.5">
              {leadingItems.map((child, i) => (
                <React.Fragment key={`leading-${i}`}>
                  {i > 0 && <SeparatorItem separator={separator} />}
                  {child}
                </React.Fragment>
              ))}
              <SeparatorItem separator={separator} />
              <CollapsedMiddle
                variant={safeVariant}
                items={hiddenItems}
                separator={separator}
              />
              <SeparatorItem separator={separator} />
              {trailingItems.map((child, i) => (
                <React.Fragment key={`trailing-${i}`}>
                  {i > 0 && <SeparatorItem separator={separator} />}
                  {child}
                </React.Fragment>
              ))}
            </ol>
          </nav>
        </BreadcrumbContext.Provider>
      );
    }

    return (
      <BreadcrumbContext.Provider value={ctx}>
        <nav ref={ref} aria-label="breadcrumb" className={className} {...props}>
          <ol className="flex flex-wrap items-center gap-1.5">
            {items.map((child, i) => (
              <React.Fragment key={i}>
                {i > 0 && <SeparatorItem separator={separator} />}
                {child}
              </React.Fragment>
            ))}
          </ol>
        </nav>
      </BreadcrumbContext.Provider>
    );
  },
);
Breadcrumb.displayName = "Breadcrumb";

/* -------------------------------------------------------------------------- */
/*                              Separator                                     */
/* -------------------------------------------------------------------------- */

function SeparatorItem({ separator }: { separator: React.ReactNode }) {
  return (
    <li
      role="presentation"
      aria-hidden
      className="flex items-center select-none [&_svg]:size-4"
    >
      {separator}
    </li>
  );
}

export interface BreadcrumbSeparatorProps extends React.HTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
}

export const BreadcrumbSeparator = React.forwardRef<
  HTMLLIElement,
  BreadcrumbSeparatorProps
>(({ className, children, ...props }, ref) => {
  const { separator } = useBreadcrumbContext();
  return (
    <li
      ref={ref}
      role="presentation"
      aria-hidden
      className={cn("flex items-center select-none [&_svg]:size-3", className)}
      {...props}
    >
      {children ?? separator}
    </li>
  );
});
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

/* -------------------------------------------------------------------------- */
/*                              Item                                          */
/* -------------------------------------------------------------------------- */

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {
  href?: string;
  icon?: React.ReactNode;
  isCurrentPage?: boolean;
}

export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  BreadcrumbItemProps
>(({ href, icon, isCurrentPage, className, children, ...props }, ref) => {
  const { variant, underline } = useBreadcrumbContext();
  const showIcon = variant === "with-icons" && icon;
  const underlineNode = underlines[underline]?.render(false);

  return (
    <li ref={ref} className="flex items-center" {...props}>
      {isCurrentPage || !href ? (
        <span
          aria-current={isCurrentPage ? "page" : undefined}
          className={cn(breadcrumbLinkVariants({ tone: "current" }), className)}
        >
          {showIcon && icon}
          {children}
        </span>
      ) : (
        <a
          href={href}
          onClick={(e) => {
            if (href === "#") e.preventDefault();
          }}
          className={cn(breadcrumbLinkVariants({ tone: "link" }), className)}
        >
          {showIcon && icon}
          <span className="relative inline-flex items-center">
            {children}
            {underlineNode}
          </span>
        </a>
      )}
    </li>
  );
});
BreadcrumbItem.displayName = "BreadcrumbItem";

/* -------------------------------------------------------------------------- */
/*                              Collapsed / Dropdown middle                   */
/* -------------------------------------------------------------------------- */

function CollapsedMiddle({
  variant,
  items,
  separator,
}: {
  variant: BreadcrumbVariant;
  items: React.ReactNode[];
  separator: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const [expanded, setExpanded] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLLIElement>(null);

  React.useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  /* Expandable: expand inline with underline-wipe of each row. */
  if (variant === "expandable") {
    if (expanded) {
      return (
        <>
          {items.map((child, i) => (
            <React.Fragment key={i}>
              <ExpandedItem child={child} index={i} />
              {i < items.length - 1 && (
                <motion.li
                  role="presentation"
                  aria-hidden
                  initial={reduceMotion ? false : { scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.18,
                          delay: i * 0.035,
                          ease: EASE_LINEAR,
                        }
                  }
                  className="flex origin-left items-center select-none [&_svg]:size-3"
                >
                  {separator}
                </motion.li>
              )}
            </React.Fragment>
          ))}
        </>
      );
    }
    return (
      <li className="flex items-center">
        <button
          type="button"
          aria-label={`Show ${items.length} more items`}
          onClick={() => setExpanded(true)}
          className={ghostIconButtonClass}
        >
          <MoreHorizontal className="size-3.5" />
        </button>
      </li>
    );
  }

  /* Dropdown: menu unrolls with a linear clip-path wipe. */
  return (
    <li className="relative flex items-center" ref={dropdownRef}>
      <button
        type="button"
        aria-label={`Show ${items.length} more items`}
        aria-expanded={dropdownOpen}
        onClick={() => setDropdownOpen((v) => !v)}
        className={cn(
          ghostIconButtonClass,
          dropdownOpen && "bg-accent text-foreground",
        )}
      >
        <MoreHorizontal className="size-3.5" />
      </button>

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={
              reduceMotion
                ? false
                : { clipPath: "inset(100% 0 0 0 round 10px)", opacity: 0 }
            }
            animate={{
              clipPath: "inset(0% 0 0 0 round 10px)",
              opacity: 1,
            }}
            exit={
              reduceMotion
                ? undefined
                : {
                    clipPath: "inset(100% 0 0 0 round 10px)",
                    opacity: 0,
                    transition: { duration: 0.14, ease: EASE_LINEAR },
                  }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.22, ease: EASE_LINEAR }
            }
            className={cn(
              "absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2",
              "min-w-40 rounded-lg border border-border bg-popover p-1 shadow-md",
            )}
            style={{ transformOrigin: "bottom center" }}
          >
            {items.map((child, i) => {
              const childEl = child as React.ReactElement<BreadcrumbItemProps>;
              const href = childEl?.props?.href;
              const label = childEl?.props?.children;
              const icon = childEl?.props?.icon;

              return (
                <a
                  key={i}
                  href={href ?? "#"}
                  onClick={(e) => {
                    setDropdownOpen(false);
                    if (!href || href === "#") e.preventDefault();
                  }}
                  className={cn(
                    "group/drop relative flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium",
                    "text-muted-foreground",
                    "transition-colors duration-150",
                    "hover:text-foreground",
                    "outline-none",
                    "[&_svg]:size-3.5 [&_svg]:shrink-0",
                  )}
                >
                  {/* Underline wipe across the row on hover. */}
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-y-1 left-1 right-1 -z-10 origin-left scale-x-0 rounded-sm",
                      "bg-accent",
                      "transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                      "group-hover/drop:scale-x-100",
                    )}
                  />
                  {icon}
                  {label}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Expanded item (collapsed variant)             */
/* -------------------------------------------------------------------------- */

function ExpandedItem({
  child,
  index,
}: {
  child: React.ReactNode;
  index: number;
}) {
  const { variant, underline } = useBreadcrumbContext();
  const reduceMotion = useReducedMotion() ?? false;
  const transition: Transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.22, ease: EASE_OUT, delay: index * 0.04 };

  if (!React.isValidElement<BreadcrumbItemProps>(child)) {
    return <li className="flex items-center">{child}</li>;
  }

  const { href, icon, isCurrentPage, className, children, ...props } =
    child.props;
  const showIcon = variant === "with-icons" && icon;
  const underlineNode = underlines[underline]?.render(reduceMotion);

  /* Each revealed item wipes its underline in with a linear scaleX —
     the same vocabulary as the hover animation, just on mount. */
  return (
    <li {...props} className="flex items-center">
      <motion.div
        initial={reduceMotion ? false : { scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={transition}
        style={{ transformOrigin: "left center" }}
        className="flex origin-left items-center"
      >
        {isCurrentPage || !href ? (
          <span
            aria-current={isCurrentPage ? "page" : undefined}
            className={cn(
              breadcrumbLinkVariants({ tone: "current" }),
              className,
            )}
          >
            {showIcon && icon}
            {children}
          </span>
        ) : (
          <a
            href={href}
            onClick={(e) => {
              if (href === "#") e.preventDefault();
            }}
            className={cn(breadcrumbLinkVariants({ tone: "link" }), className)}
          >
            {showIcon && icon}
            <span className="relative inline-flex items-center">
              {children}
              {underlineNode}
            </span>
          </a>
        )}
      </motion.div>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Ghost icon button                             */
/* -------------------------------------------------------------------------- */

const ghostIconButtonClass = cn(
  "inline-flex size-7 items-center justify-center rounded-md",
  "text-muted-foreground",
  "transition-colors duration-150",
  "hover:bg-accent hover:text-foreground",
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "outline-none",
);

/* -------------------------------------------------------------------------- */
/*                              Pulse keyframes                               */
/* -------------------------------------------------------------------------- */

const BC_STYLE_ID = "venumity-breadcrumb-styles-v1";

function ensureBreadcrumbStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(BC_STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = BC_STYLE_ID;
  style.textContent = `
    @keyframes bc-pulse {
      0%, 100% { opacity: 0.55; }
      50%      { opacity: 0.95; }
    }
    @media (prefers-reduced-motion: reduce) {
      [data-slot="breadcrumb"] * { animation: none !important; }
    }
  `;
  document.head.appendChild(style);
}

if (typeof document !== "undefined") {
  ensureBreadcrumbStyles();
}

/* -------------------------------------------------------------------------- */
/*                                  Exports                                   */
/* -------------------------------------------------------------------------- */

export { breadcrumbLinkVariants, underlines as breadcrumbUnderlines };
