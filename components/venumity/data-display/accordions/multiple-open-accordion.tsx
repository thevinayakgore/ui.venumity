"use client";
import Image from "next/image";
import { useState, createContext, useContext, type ReactNode } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LearningItem {
  id: string;
  title: string;
  content: string;
  bg: string;
  border: string;
  level: string;
}

const defaultItems: LearningItem[] = [
  {
    id: "item1",
    title: "Getting started",
    content: "Learn the basics and set up your development environment.",
    bg: "bg-blue-500",
    border: "border-blue-500/50",
    level: "Beginner",
  },
  {
    id: "item2",
    title: "Components",
    content: "Understand how to create, reuse, and compose React components.",
    bg: "bg-emerald-500",
    border: "border-emerald-500/50",
    level: "Beginner",
  },
  {
    id: "item3",
    title: "State & props",
    content:
      "Master component state and props to drive truly dynamic interfaces.",
    bg: "bg-purple-500",
    border: "border-purple-500/50",
    level: "Intermediate",
  },
  {
    id: "item4",
    title: "Hooks",
    content: "Use React Hooks to manage state, side effects, and context.",
    bg: "bg-amber-500",
    border: "border-amber-500/50",
    level: "Intermediate",
  },
  {
    id: "item5",
    title: "Advanced topics",
    content:
      "Explore patterns, performance, and architecture for production apps.",
    bg: "bg-rose-500",
    border: "border-rose-500/50",
    level: "Advanced",
  },
];

const defaultTips: string[] = [
  "Recommended pace: 20–40 minutes.",
  "Add notes as you go to track what clicked.",
  "Revisit this section when you feel stuck later.",
];

interface LearningRootContextValue {
  openItems: Set<string>;
  toggleItem: (id: string) => void;
}

const LearningRootContext = createContext<LearningRootContextValue | null>(
  null,
);

interface LearningItemContextValue {
  item: LearningItem;
  index: number;
  isOpen: boolean;
}

const LearningItemContext = createContext<LearningItemContextValue | null>(
  null,
);

function useLearningRoot() {
  const ctx = useContext(LearningRootContext);
  if (!ctx)
    throw new Error("Learning components must be used within <LearningRoot />");
  return ctx;
}

function useLearningItem() {
  const ctx = useContext(LearningItemContext);
  if (!ctx)
    throw new Error(
      "LearningItem components must be used within <LearningItem />",
    );
  return ctx;
}

interface LearningRootProps {
  children: ReactNode;
  defaultOpenId?: string;
  className?: string;
}

export function LearningRoot({
  children,
  defaultOpenId = "item1",
  className,
}: LearningRootProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set([defaultOpenId]),
  );

  const toggleItem = (id: string) => {
    const next = new Set(openItems);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setOpenItems(next);
  };

  return (
    <LearningRootContext.Provider value={{ openItems, toggleItem }}>
      <div
        className={cn(
          "flex w-full max-w-3xl m-auto flex-col gap-4 p-6 md:p-10",
          className,
        )}
      >
        {children}
      </div>
    </LearningRootContext.Provider>
  );
}

interface LearningHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function LearningHeader({
  title = "React learning path",
  subtitle = "Work through each module at your own pace. Open multiple sections to keep quick reference notes side-by-side.",
  className,
  titleClassName,
  subtitleClassName,
}: LearningHeaderProps) {
  return (
    <header className={cn("space-y-2", className)}>
      <h2
        className={cn(
          "text-xl md:text-3xl font-semibold tracking-tight",
          titleClassName,
        )}
      >
        {title}
      </h2>
      <p className={cn("text-sm text-muted-foreground", subtitleClassName)}>
        {subtitle}
      </p>
    </header>
  );
}

interface LearningListProps {
  children: ReactNode;
  className?: string;
}

export function LearningList({ children, className }: LearningListProps) {
  return <div className={cn("space-y-3 mt-4", className)}>{children}</div>;
}

interface LearningItemRootProps {
  item: LearningItem;
  index: number;
  children: ReactNode;
  className?: string;
}

export function LearningItemRoot({
  item,
  index,
  children,
  className,
}: LearningItemRootProps) {
  const { openItems } = useLearningRoot();
  const isOpen = openItems.has(item.id);

  return (
    <LearningItemContext.Provider value={{ item, index, isOpen }}>
      <div
        className={cn(
          "group overflow-hidden rounded-lg border shadow-xs transition-all duration-300 hover:shadow-md",
          item.border,
          `${item.bg}/10`,
          className,
        )}
        data-state={isOpen ? "open" : "closed"}
      >
        {children}
      </div>
    </LearningItemContext.Provider>
  );
}

interface LearningTriggerProps {
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  iconClassName?: string;
}

export function LearningTrigger({
  className,
  contentClassName,
  titleClassName,
  descriptionClassName,
  iconClassName,
}: LearningTriggerProps) {
  const { item, index, isOpen } = useLearningItem();
  const { toggleItem } = useLearningRoot();

  return (
    <button
      onClick={() => toggleItem(item.id)}
      className={cn(
        "flex w-full items-start justify-between cursor-pointer p-3 text-left",
        className,
      )}
      data-state={isOpen ? "open" : "closed"}
    >
      <div className={cn("flex items-center gap-3", contentClassName)}>
        <div
          className={cn(
            "relative size-12 p-3 bg-background border overflow-hidden rounded-md",
            item.border,
            iconClassName,
          )}
        >
          <Image
            src="/icons/react.png"
            alt={item.title}
            width={1000}
            height={1000}
            priority
            className="w-full h-full"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <span
            className={cn(
              "text-sm font-semibold text-foreground",
              titleClassName,
            )}
          >
            {index + 1}. {item.title}
          </span>
          <span
            className={cn("text-xs text-foreground/80", descriptionClassName)}
          >
            {isOpen
              ? "Collapse to keep the list compact"
              : "Click to see what you'll cover in this module"}
          </span>
        </div>
      </div>
      <span className="opacity-50">
        {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
      </span>
    </button>
  );
}

interface LearningContentProps {
  children: ReactNode;
  className?: string;
}

export function LearningContent({ children, className }: LearningContentProps) {
  const { item, isOpen } = useLearningItem();

  if (!isOpen) return null;

  return (
    <div
      className={cn("border-t px-4 pb-4 pt-3 text-sm", item.border, className)}
      data-state="open"
    >
      {children}
    </div>
  );
}

interface LearningDescriptionProps {
  className?: string;
}

export function LearningDescription({ className }: LearningDescriptionProps) {
  const { item } = useLearningItem();
  return (
    <p className={cn("text-sm md:text-base", className)}>{item.content}</p>
  );
}

interface LearningGridProps {
  children: ReactNode;
  className?: string;
}

export function LearningGrid({ children, className }: LearningGridProps) {
  return (
    <div
      className={cn(
        "mt-3 grid grid-cols-1 gap-3 text-xs text-muted-foreground md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface LearningTipsProps {
  tips?: string[];
  className?: string;
  itemClassName?: string;
}

export function LearningTips({
  tips = defaultTips,
  className,
  itemClassName,
}: LearningTipsProps) {
  return (
    <ul className={cn("space-y-1", className)}>
      {tips.map((tip, i) => (
        <li key={i} className={itemClassName}>
          • {tip}
        </li>
      ))}
    </ul>
  );
}

interface LearningActionsProps {
  title?: string;
  tip?: string;
  className?: string;
  titleClassName?: string;
  tipClassName?: string;
  buttonClassName?: string;
  outlineButtonClassName?: string;
}

export function LearningActions({
  title = "Quick actions",
  tip = "Tip: Mark this as done in your tracker when you can explain the topic without notes.",
  className,
  titleClassName,
  tipClassName,
  buttonClassName,
  outlineButtonClassName,
}: LearningActionsProps) {
  return (
    <div
      className={cn(
        "space-y-2 rounded-lg bg-background/80 p-3 shadow-[0_0_0_1px_rgba(0,0,0,0.03)]",
        className,
      )}
    >
      <p
        className={cn(
          "text-[11px] font-medium text-foreground",
          titleClassName,
        )}
      >
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          className={cn("h-7 px-3 text-[11px] font-medium", buttonClassName)}
        >
          Go to module
          <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className={cn("h-7 px-3 text-[11px]", outlineButtonClassName)}
        >
          Add to today&apos;s plan
        </Button>
      </div>
      <p className={cn("mt-1 text-[11px] text-muted-foreground", tipClassName)}>
        {tip}
      </p>
    </div>
  );
}

interface LearningAccordionProps {
  items?: LearningItem[];
  defaultOpenId?: string;
  className?: string;
  headerClassName?: string;
  listClassName?: string;
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  descriptionClassName?: string;
  gridClassName?: string;
  tipsClassName?: string;
  actionsClassName?: string;
}

export default function LearningAccordion({
  items = defaultItems,
  defaultOpenId = "item1",
  className,
  headerClassName,
  listClassName,
  itemClassName,
  triggerClassName,
  contentClassName,
  descriptionClassName,
  gridClassName,
  tipsClassName,
  actionsClassName,
}: LearningAccordionProps) {
  return (
    <LearningRoot defaultOpenId={defaultOpenId} className={className}>
      <LearningHeader className={headerClassName} />
      <LearningList className={listClassName}>
        {items.map((item, index) => (
          <LearningItemRoot
            key={item.id}
            item={item}
            index={index}
            className={itemClassName}
          >
            <LearningTrigger className={triggerClassName} />
            <LearningContent className={contentClassName}>
              <LearningDescription className={descriptionClassName} />
              <LearningGrid className={gridClassName}>
                <LearningTips className={tipsClassName} />
                <LearningActions className={actionsClassName} />
              </LearningGrid>
            </LearningContent>
          </LearningItemRoot>
        ))}
      </LearningList>
    </LearningRoot>
  );
}
