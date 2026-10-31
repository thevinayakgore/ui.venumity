"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

const rootVariants = cva("flex w-full flex-col", {
  variants: {
    variant: {
      default: "gap-3",
      separated: "gap-3",
      minimal: "",
    },
  },
  defaultVariants: { variant: "minimal" },
});

const itemVariants = cva("", {
  variants: {
    variant: {
      default: "border border-border rounded-xl overflow-hidden",
      separated: "bg-card border rounded-xl overflow-hidden",
      minimal: "not-last:border-b border-border",
    },
  },
  defaultVariants: { variant: "minimal" },
});

const contentVariants = cva("", {
  variants: {
    variant: {
      default: "p-4",
      minimal: "py-4",
      separated: "p-4",
    },
  },
  defaultVariants: { variant: "minimal" },
});

type AccordionBehavior = "default" | "multiple";
type AccordionVariant = "minimal" | "separated" | "default";

interface AccordionContextValue {
  variant: AccordionVariant;
  behavior: AccordionBehavior;
  openValues: string[];
  registerDefaultOpen: (value: string) => () => void;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(
  null,
);

const useAccordionContext = () => {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) {
    throw new Error("Accordion subcomponents must be used within <Accordion>");
  }
  return ctx;
};

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}

const AccordionItemContext =
  React.createContext<AccordionItemContextValue | null>(null);

const useAccordionItemContext = () => {
  const ctx = React.useContext(AccordionItemContext);
  if (!ctx) {
    throw new Error(
      "AccordionTrigger and AccordionContent must be used within <AccordionItem>",
    );
  }
  return ctx;
};

export interface AccordionProps
  extends
    Omit<
      AccordionPrimitive.Root.Props,
      "defaultValue" | "value" | "onValueChange" | "multiple"
    >,
    Omit<VariantProps<typeof rootVariants>, "variant"> {
  behavior?: AccordionBehavior;
  variant?: AccordionVariant;
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}

function toArr(v: string | string[] | undefined): string[] {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}

function Accordion({
  className,
  behavior = "default",
  variant = "minimal",
  value: controlledValue,
  onValueChange,
  children,
  ...props
}: AccordionProps) {
  const isControlled = controlledValue !== undefined;

  const [internal, setInternal] = React.useState<string[]>([]);

  const openValues = isControlled ? toArr(controlledValue) : internal;

  const isControlledRef = React.useRef(isControlled);
  const behaviorRef = React.useRef(behavior);
  const onValueChangeRef = React.useRef(onValueChange);

  React.useEffect(() => {
    isControlledRef.current = isControlled;
  }, [isControlled]);

  React.useEffect(() => {
    behaviorRef.current = behavior;
  }, [behavior]);

  React.useEffect(() => {
    onValueChangeRef.current = onValueChange;
  }, [onValueChange]);

  const registerDefaultOpen = React.useCallback((value: string) => {
    if (isControlledRef.current) return () => {};

    setInternal((prev) => {
      if (behaviorRef.current !== "multiple") {
        if (prev.length > 0) return prev;
        return [value];
      }
      if (prev.includes(value)) return prev;
      return [...prev, value];
    });

    return () => {
      setInternal((prev) => {
        if (!prev.includes(value)) return prev;
        return prev.filter((v) => v !== value);
      });
    };
  }, []);

  const handleValueChange = React.useCallback(
    (value: string | string[] | null | undefined) => {
      const arr = toArr(value ?? undefined);
      if (!isControlledRef.current) setInternal(arr);
      if (behaviorRef.current === "multiple") {
        onValueChangeRef.current?.(arr);
      } else {
        onValueChangeRef.current?.(arr[0] ?? "");
      }
    },
    [],
  );

  const context: AccordionContextValue = React.useMemo(
    () => ({ variant, behavior, openValues, registerDefaultOpen }),
    [variant, behavior, openValues, registerDefaultOpen],
  );

  return (
    <AccordionContext.Provider value={context}>
      <AccordionPrimitive.Root
        data-slot="accordion"
        data-variant={variant}
        className={cn(rootVariants({ variant }), className)}
        multiple={behavior === "multiple"}
        value={openValues}
        onValueChange={handleValueChange}
        {...props}
      >
        {children}
      </AccordionPrimitive.Root>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps extends AccordionPrimitive.Item.Props {
  value: string;
  defaultOpen?: boolean;
}

function AccordionItem({
  value,
  defaultOpen = false,
  className,
  ...props
}: AccordionItemProps) {
  const { variant, openValues, registerDefaultOpen } = useAccordionContext();
  const isOpen = openValues.includes(value);

  React.useEffect(() => {
    if (!defaultOpen) return;
    return registerDefaultOpen(value);
  }, [defaultOpen, value, registerDefaultOpen]);

  const itemCtx = React.useMemo<AccordionItemContextValue>(
    () => ({ value, isOpen }),
    [value, isOpen],
  );

  return (
    <AccordionItemContext.Provider value={itemCtx}>
      <AccordionPrimitive.Item
        value={value}
        data-slot="accordion-item"
        data-open={isOpen ? "" : undefined}
        data-closed={!isOpen ? "" : undefined}
        className={cn(itemVariants({ variant }), className)}
        {...props}
      />
    </AccordionItemContext.Provider>
  );
}

export interface AccordionTriggerProps extends Omit<
  AccordionPrimitive.Trigger.Props,
  "children"
> {
  children?: React.ReactNode;
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  const { variant } = useAccordionContext();
  const { isOpen } = useAccordionItemContext();

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        data-open={isOpen ? "" : undefined}
        data-closed={!isOpen ? "" : undefined}
        className={cn(
          contentVariants({ variant }),
          "group/accordion-trigger relative flex flex-1 items-start justify-between border border-transparent text-left text-sm md:text-base font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          className,
        )}
        {...props}
      >
        {children}

        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none shrink-0 group-data-open/accordion-trigger:hidden"
        />
        <ChevronUpIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none hidden shrink-0 group-data-open/accordion-trigger:inline"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export interface AccordionContentProps extends AccordionPrimitive.Panel.Props {
  bare?: boolean;
  children?: React.ReactNode;
}

function AccordionContent({
  className,
  children,
  bare,
  ...props
}: AccordionContentProps) {
  const { variant } = useAccordionContext();

  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-sm text-muted-foreground data-open:border-t data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          !bare && contentVariants({ variant }),
          "bg-background h-(--accordion-panel-height) data-ending-style:h-0 data-starting-style:h-0 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  itemVariants as accordionItemVariants,
  rootVariants as accordionRootVariants,
};
