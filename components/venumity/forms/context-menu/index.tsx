"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronRight } from "lucide-react";
import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

function adaptOpenChange(
  onOpenChange?: (open: boolean) => void,
): ((open: boolean, details: unknown) => void) | undefined {
  if (!onOpenChange) return undefined;
  return (open) => onOpenChange(open);
}

const menuSurfaceClass = cn(
  "border border-border bg-popover text-popover-foreground",
  "shadow-lg",
);

/** Menu family: 180ms open / 120ms close. */
const popupMotionClass = cn(
  "origin-[var(--transform-origin)] transform-gpu outline-none",
  "transition-[opacity,scale] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
  "data-[ending-style]:duration-[120ms]",
  "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
  "data-[starting-style]:scale-[0.96] data-[ending-style]:scale-[0.96]",
  "motion-reduce:transition-none motion-reduce:data-[starting-style]:scale-100 motion-reduce:data-[ending-style]:scale-100",
);

/** Canonical menu-item metrics. */
const itemBaseClass = cn(
  "group/menu-item relative flex min-h-9 w-full cursor-default select-none items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm outline-none",
  "transition-colors duration-100 ease-out",
  "data-disabled:pointer-events-none data-disabled:opacity-45",
  "data-highlighted:bg-accent data-highlighted:text-foreground",
);

const itemDestructiveClass = cn(
  "text-destructive",
  "data-highlighted:bg-destructive/15 data-highlighted:text-destructive",
);

/* -------------------------------------------------------------------------- */
/*                              Root                                          */
/* -------------------------------------------------------------------------- */

export interface ContextMenuProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.Root>,
  "onOpenChange"
> {
  onOpenChange?: (open: boolean) => void;
}

export function ContextMenu({ onOpenChange, ...props }: ContextMenuProps) {
  return (
    <BaseContextMenu.Root
      onOpenChange={adaptOpenChange(onOpenChange)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                              Trigger                                       */
/* -------------------------------------------------------------------------- */

export interface ContextMenuTriggerProps extends React.ComponentPropsWithoutRef<
  typeof BaseContextMenu.Trigger
> {
  asChild?: boolean;
}

export function ContextMenuTrigger({
  asChild = false,
  children,
  className,
  ...props
}: ContextMenuTriggerProps) {
  if (asChild && React.isValidElement(children)) {
    return (
      <BaseContextMenu.Trigger
        render={children as React.ReactElement}
        className={className}
        {...props}
      />
    );
  }

  return (
    <BaseContextMenu.Trigger className={className} {...props}>
      {children}
    </BaseContextMenu.Trigger>
  );
}

export const ContextMenuGroup = BaseContextMenu.Group;
export const ContextMenuRadioGroup = BaseContextMenu.RadioGroup;
export const ContextMenuSub = BaseContextMenu.SubmenuRoot;

/* -------------------------------------------------------------------------- */
/*                              Content                                       */
/* -------------------------------------------------------------------------- */

export interface ContextMenuContentProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.Popup>,
  "align" | "sideOffset" | "side"
> {
  align?: "start" | "center" | "end";
  sideOffset?: number;
  side?: "top" | "right" | "bottom" | "left";
  collisionPadding?: number;
  container?: React.ComponentProps<typeof BaseContextMenu.Portal>["container"];
}

export function ContextMenuContent({
  className,
  align,
  sideOffset = 4,
  side,
  collisionPadding = 12,
  container,
  ...props
}: ContextMenuContentProps) {
  return (
    <BaseContextMenu.Portal container={container}>
      <BaseContextMenu.Positioner
        align={align}
        side={side}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className="z-50 outline-none"
      >
        <BaseContextMenu.Popup
          data-slot="context-menu-content"
          className={cn(
            popupMotionClass,
            menuSurfaceClass,
            "min-w-50 rounded-lg p-1",
            className,
          )}
          {...props}
        />
      </BaseContextMenu.Positioner>
    </BaseContextMenu.Portal>
  );
}

export interface ContextMenuSubContentProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.Popup>,
  "align" | "sideOffset" | "side"
> {
  align?: "start" | "center" | "end";
  sideOffset?: number;
  side?: "top" | "right" | "bottom" | "left";
  collisionPadding?: number;
  container?: React.ComponentProps<typeof BaseContextMenu.Portal>["container"];
}

export function ContextMenuSubContent({
  className,
  align = "start",
  sideOffset = 2,
  side = "right",
  collisionPadding = 12,
  container,
  ...props
}: ContextMenuSubContentProps) {
  return (
    <BaseContextMenu.Portal container={container}>
      <BaseContextMenu.Positioner
        align={align}
        side={side}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className="z-50 outline-none"
      >
        <BaseContextMenu.Popup
          data-slot="context-menu-sub-content"
          className={cn(
            popupMotionClass,
            menuSurfaceClass,
            "min-w-40 rounded-lg p-1",
            className,
          )}
          {...props}
        />
      </BaseContextMenu.Positioner>
    </BaseContextMenu.Portal>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Items                                         */
/* -------------------------------------------------------------------------- */

export interface ContextMenuItemProps extends React.ComponentPropsWithoutRef<
  typeof BaseContextMenu.Item
> {
  inset?: boolean;
  destructive?: boolean;
}

export const ContextMenuItem = React.forwardRef<
  HTMLDivElement,
  ContextMenuItemProps
>(({ className, inset, destructive, ...props }, ref) => {
  return (
    <BaseContextMenu.Item
      ref={ref}
      className={cn(
        itemBaseClass,
        destructive ? itemDestructiveClass : "text-foreground",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  );
});
ContextMenuItem.displayName = "ContextMenuItem";

export type ContextMenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof BaseContextMenu.CheckboxItem
>;

export function ContextMenuCheckboxItem({
  className,
  children,
  ...props
}: ContextMenuCheckboxItemProps) {
  return (
    <BaseContextMenu.CheckboxItem
      className={cn(itemBaseClass, "pr-8 text-foreground", className)}
      {...props}
    >
      {children}
      <BaseContextMenu.CheckboxItemIndicator className="absolute right-2.5 inline-flex size-4 items-center justify-center text-foreground">
        <Check className="size-3.5" strokeWidth={2.25} />
      </BaseContextMenu.CheckboxItemIndicator>
    </BaseContextMenu.CheckboxItem>
  );
}
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

export type ContextMenuRadioItemProps = React.ComponentPropsWithoutRef<
  typeof BaseContextMenu.RadioItem
>;

export function ContextMenuRadioItem({
  className,
  children,
  ...props
}: ContextMenuRadioItemProps) {
  return (
    <BaseContextMenu.RadioItem
      className={cn(itemBaseClass, "pr-8 text-foreground", className)}
      {...props}
    >
      {children}
      <BaseContextMenu.RadioItemIndicator className="absolute right-2.5 inline-flex size-4 items-center justify-center text-foreground">
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-2.5"
        >
          <circle cx="8" cy="8" r="4.5" />
        </svg>
      </BaseContextMenu.RadioItemIndicator>
    </BaseContextMenu.RadioItem>
  );
}
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

export interface ContextMenuSubTriggerProps extends React.ComponentPropsWithoutRef<
  typeof BaseContextMenu.SubmenuTrigger
> {
  inset?: boolean;
}

export function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: ContextMenuSubTriggerProps) {
  return (
    <BaseContextMenu.SubmenuTrigger
      className={cn(
        itemBaseClass,
        "text-foreground data-popup-open:bg-accent",
        inset && "pl-8",
        className,
      )}
      {...props}
    >
      <span className="flex min-w-0 flex-1 items-center gap-2.5">
        {children}
      </span>
      <ChevronRight
        strokeWidth={1.75}
        className="size-3.5 shrink-0 text-muted-foreground"
      />
    </BaseContextMenu.SubmenuTrigger>
  );
}

export function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }) {
  return (
    <div
      className={cn(
        "px-2.5 py-1.5 text-[11px] font-medium tracking-[0.02em] text-muted-foreground",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  );
}

export function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseContextMenu.Separator>) {
  return (
    <BaseContextMenu.Separator
      className={cn("my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

export function ContextMenuShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "ml-auto pl-4 text-[11px] tracking-[0.02em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
