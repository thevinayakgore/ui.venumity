// components/venumity/primitives/display/blockquote/index.tsx
"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Quote, Star } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

/* -------------------------------------------------------------------------- */
/*                                  Types                                      */
/* -------------------------------------------------------------------------- */

export type BlockquoteVariant =
  | "default"
  | "bordered"
  | "card"
  | "pull"
  | "testimonial"
  | "verse";

export type BlockquoteSize = "sm" | "default" | "lg" | "xl";
export type BlockquoteTone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger";

export type BlockquoteAnimation = "none" | "shiny";

/* -------------------------------------------------------------------------- */
/*                              Extended cva                                   */
/* -------------------------------------------------------------------------- */

const rootVariants = cva("relative h-fit", {
  variants: {
    variant: {
      default: "border-l-4 pl-4 sm:pl-5 overflow-hidden",
      bordered: "rounded-xl border border-border p-5",
      card: "rounded-xl border border-border bg-card overflow-hidden",
      pull: "border-l-4 pl-5 sm:pl-7",
      testimonial: "bg-card border border-border rounded-2xl overflow-hidden",
      verse: "text-center w-lg",
    },
    size: {
      sm: "text-xs",
      default: "text-sm",
      lg: "text-[15px]",
      xl: "text-base",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});

const quoteVariants = cva("", {
  variants: {
    variant: {
      default: "text-[15px] leading-relaxed text-foreground",
      bordered: "text-[15px] leading-relaxed text-foreground",
      card: "text-[15px] leading-relaxed text-foreground",
      pull: "text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl",
      testimonial: "text-[15px] leading-relaxed text-foreground",
      verse: "text-lg italic leading-loose text-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});

const citationVariants = cva("text-muted-foreground", {
  variants: {
    variant: {
      default: "text-xs mt-2",
      bordered: "text-xs mt-3",
      card: "text-xs pl-3 pb-3",
      pull: "pl-3 text-sm",
      testimonial: "text-xs",
      verse: "text-xs p-5 tracking-wider uppercase",
    },
  },
  defaultVariants: { variant: "default" },
});

const accentToneClass: Record<BlockquoteTone, string> = {
  neutral: "p-3 bg-foreground/10 border-foreground/40",
  info: "p-3 bg-blue-500/10 border-blue-500",
  success: "p-3 bg-green-500/10 border-green-500",
  warning: "p-3 bg-amber-500/10 border-amber-500",
  danger: "p-3 bg-red-500/10 border-red-500",
};

/* -------------------------------------------------------------------------- */
/*                              Styles                                         */
/* -------------------------------------------------------------------------- */

const BLOCKQUOTE_STYLE_ID = "venumity-blockquote-shiny-styles-v1";

function useBlockquoteStyles(enabled: boolean) {
  React.useEffect(() => {
    if (!enabled) return;
    if (typeof document === "undefined") return;
    if (document.getElementById(BLOCKQUOTE_STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = BLOCKQUOTE_STYLE_ID;
    style.textContent = `
/* Shiny quote text — background-position sweep across a gradient
   clipped to the text glyphs. Structural, single-axis, no blur. */
.bq-shiny .bq-shiny-text {
  color: transparent;
  background-image: linear-gradient(
    110deg,
    var(--foreground) 0%,
    var(--foreground) 35%,
    color-mix(in srgb, var(--foreground) 40%, transparent) 50%,
    var(--foreground) 65%,
    var(--foreground) 100%
  );
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: bq-shiny-sweep 2.4s linear infinite;
  will-change: background-position;
}

@keyframes bq-shiny-sweep {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .bq-shiny .bq-shiny-text {
    animation: none !important;
    background: none !important;
    color: var(--foreground) !important;
    -webkit-text-fill-color: var(--foreground) !important;
  }
}
`;
    document.head.appendChild(style);
  }, [enabled]);
}

/* -------------------------------------------------------------------------- */
/*                              Root                                           */
/* -------------------------------------------------------------------------- */

export interface BlockquoteProps
  extends
    React.HTMLAttributes<HTMLQuoteElement>,
    Omit<VariantProps<typeof rootVariants>, "variant" | "size"> {
  variant?: BlockquoteVariant;
  size?: BlockquoteSize;
  tone?: BlockquoteTone;
  animation?: BlockquoteAnimation;
  quote: React.ReactNode;
  cite?: React.ReactNode;
  role?: string;
  avatar?: string;
  href?: string;
  rating?: number;
  children?: React.ReactNode;
}

export const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  (
    {
      variant = "default",
      size = "default",
      tone = "neutral",
      animation = "none",
      quote,
      cite,
      role,
      avatar,
      href,
      rating,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const safeVariant: BlockquoteVariant = variant ?? "default";
    const safeTone: BlockquoteTone = tone ?? "neutral";
    const safeAnimation: BlockquoteAnimation = animation ?? "none";
    const isShiny = safeAnimation === "shiny";
    const isPull = safeVariant === "pull";
    const isVerse = safeVariant === "verse";
    const isTestimonial = safeVariant === "testimonial";

    useBlockquoteStyles(isShiny);

    const accentClass =
      safeVariant === "default" ||
      safeVariant === "pull"
        ? accentToneClass[safeTone]
        : "";

    return (
      <blockquote
        ref={ref}
        data-slot="blockquote"
        data-variant={safeVariant}
        data-tone={safeTone}
        data-animation={safeAnimation}
        className={cn(
          rootVariants({ variant: safeVariant, size }),
          accentClass,
          isShiny && "bq-shiny",
          className,
        )}
        {...props}
      >
        <div
          className={cn("relative w-full", safeVariant !== "default" && "p-4")}
        >
          {isPull ? (
            <Quote className="absolute top-0 -left-4 opacity-50" />
          ) : null}

          {isVerse ? (
            <Quote className="absolute -top-15 left-1/2 size-15 -translate-x-1/2 stroke-1 opacity-50" />
          ) : null}

          {safeVariant === "card" || safeVariant === "bordered" ? (
            <Quote className="mb-2 size-5 text-muted-foreground" />
          ) : null}

          <p
            className={cn(
              quoteVariants({ variant: safeVariant }),
              isShiny && "bq-shiny-text",
            )}
          >
            {quote}
          </p>
        </div>

        {isTestimonial ? (
          <footer className="flex items-center gap-3 border-t bg-muted p-2">
            {avatar ? (
              <span
                aria-hidden
                className="size-10 shrink-0 overflow-hidden rounded-lg border bg-muted"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={avatar} alt="" className="size-full object-cover" />
              </span>
            ) : cite ? (
              <span
                aria-hidden
                className="grid size-10 shrink-0 place-items-center rounded-full bg-muted text-xs font-semibold text-muted-foreground"
              >
                {typeof cite === "string"
                  ? cite
                      .split(" ")
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")
                      .toUpperCase()
                  : "?"}
              </span>
            ) : null}

            <div className="flex min-w-0 flex-col">
              {cite ? (
                <footer className="block truncate text-sm font-medium text-foreground">
                  {href ? (
                    <a
                      href={href}
                      className="transition-colors hover:text-foreground/80"
                    >
                      {cite}
                    </a>
                  ) : (
                    <span>{cite}</span>
                  )}
                </footer>
              ) : null}

              {role ? (
                <p className="truncate text-xs text-muted-foreground">{role}</p>
              ) : null}
            </div>

            {rating != null ? (
              <div className="ml-auto flex items-center gap-0.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    className={cn(
                      "size-3.5",
                      i < rating
                        ? "fill-amber-500 text-amber-500"
                        : "text-muted-foreground/40",
                    )}
                  />
                ))}
              </div>
            ) : null}
          </footer>
        ) : cite || role ? (
          <footer className={cn(citationVariants({ variant: safeVariant }))}>
            {cite ? (
              href ? (
                <a
                  href={href}
                  className="font-medium text-foreground transition-colors hover:text-foreground/80"
                >
                  {cite}
                </a>
              ) : (
                <span className="font-medium text-foreground">{cite}</span>
              )
            ) : null}
            {cite && role ? <span aria-hidden> · </span> : null}
            {role ? <span>{role}</span> : null}
          </footer>
        ) : null}

        {children}
      </blockquote>
    );
  },
);
Blockquote.displayName = "Blockquote";

/* -------------------------------------------------------------------------- */
/*                              Data-driven variant                            */
/* -------------------------------------------------------------------------- */

export interface QuoteData {
  id: string;
  quote: React.ReactNode;
  cite?: React.ReactNode;
  role?: React.ReactNode;
  avatar?: string;
  href?: string;
  rating?: number;
}

export interface BlockquoteListProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  items: QuoteData[];
  variant?: BlockquoteVariant;
  tone?: BlockquoteTone;
  animation?: BlockquoteAnimation;
  columns?: 1 | 2 | 3;
}

export function BlockquoteList({
  items,
  variant = "card",
  tone = "neutral",
  animation = "none",
  columns = 2,
  className,
  ...props
}: BlockquoteListProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <Blockquote
          key={item.id}
          variant={variant}
          tone={tone}
          animation={animation}
          quote={item.quote}
          cite={item.cite}
          role={item.role as string | undefined}
          avatar={item.avatar}
          href={item.href}
          rating={item.rating}
        />
      ))}
    </div>
  );
}
BlockquoteList.displayName = "BlockquoteList";

/* -------------------------------------------------------------------------- */
/*                                  Exports                                    */
/* -------------------------------------------------------------------------- */

export {
  rootVariants as blockquoteRootVariants,
  quoteVariants as blockquoteQuoteVariants,
  citationVariants as blockquoteCitationVariants,
};
