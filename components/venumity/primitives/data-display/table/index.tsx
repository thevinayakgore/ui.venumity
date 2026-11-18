"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  LayoutGroup,
  useReducedMotion,
  AnimatePresence,
} from "motion/react";
import {
  X,
  Check,
  Minus,
  Filter,
  Search,
  ArrowUp,
  ArrowDown,
  ChevronUp,
  ArrowUpDown,
  ChevronDown,
  MousePointer2,
  ChevronsUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Public types ─────────────────────────────────────────── */

export type TableDensity = "compact" | "comfortable" | "spacious";
export type SortDirection = "asc" | "desc" | null;
export type TableView = "table" | "grid" | "compact";

export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  stickyHeader?: boolean;
  density?: TableDensity;
  /** Show the gliding hover highlight behind body rows. */
  glide?: boolean;
}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  animatedSort?: boolean;
}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
  expanded?: boolean;
  selectable?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  expandable?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

export interface TableHeadProps extends Omit<
  React.ThHTMLAttributes<HTMLTableCellElement>,
  "align"
> {
  sortable?: boolean;
  onSort?: () => void;
  sortDirection?: SortDirection;
  align?: "start" | "center" | "end";
}

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;

export interface TableExpandableContentProps extends React.HTMLAttributes<HTMLTableRowElement> {
  open?: boolean;
  colSpan: number;
}

/* ─── Constants ────────────────────────────────────────────── */

const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
const EASE_MORPH = [0.32, 0.72, 0, 1] as const;
const SORT_LAYOUT_MS = 0.36;

const densityClasses: Record<TableDensity, { head: string; cell: string }> = {
  compact: { head: "h-10 px-4 text-sm", cell: "h-10 px-4 text-xs" },
  comfortable: { head: "h-12 px-5 text-base", cell: "h-12 px-5 text-sm" },
  spacious: { head: "h-14 px-7 text-lg", cell: "h-14 px-7 text-base" },
};

/* ─── Context ──────────────────────────────────────────────── */

type TableContextValue = {
  density: TableDensity;
  stickyHeader: boolean;
  animatedSort: boolean;
  layoutGroupId: string;
};

const TableContext = React.createContext<TableContextValue>({
  density: "comfortable",
  stickyHeader: false,
  animatedSort: false,
  layoutGroupId: "venumity-table",
});

function useTableContext() {
  return React.useContext(TableContext);
}

function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(
    target.closest(
      'button, a, input, label, textarea, select, [role="checkbox"], [data-slot="table-select-cell"], [data-prevent-row-action="true"]',
    ),
  );
}

/* ─── Sort indicator (animated) ────────────────────────────── */

function SortIndicator({ direction }: { direction: SortDirection }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <span className="relative inline-flex size-4 shrink-0 items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        {direction === "asc" ? (
          <motion.span
            key="asc"
            initial={
              shouldReduceMotion ? false : { opacity: 0, scale: 0.92, y: 3 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? undefined
                : { opacity: 0, scale: 0.92, y: -3 }
            }
            transition={{ duration: SORT_LAYOUT_MS, ease: EASE_MORPH }}
            className="absolute inset-0 inline-flex items-center justify-center text-foreground"
          >
            <MousePointer2 />
          </motion.span>
        ) : direction === "desc" ? (
          <motion.span
            key="desc"
            initial={
              shouldReduceMotion ? false : { opacity: 0, scale: 0.92, y: -3 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              shouldReduceMotion ? undefined : { opacity: 0, scale: 0.92, y: 3 }
            }
            transition={{ duration: SORT_LAYOUT_MS, ease: EASE_MORPH }}
            className="absolute inset-0 inline-flex items-center justify-center text-foreground"
          >
            <ChevronsUpDown />
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 0.55, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.94 }}
            transition={{ duration: SORT_LAYOUT_MS * 0.85, ease: EASE_MORPH }}
            className="absolute inset-0 inline-flex items-center justify-center text-muted-foreground"
          >
            <ChevronsUpDown />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

/* ─── Glide hover ──────────────────────────────────────────── */

type GlideRect = {
  x: number;
  y: number;
  w: number;
  h: number;
  session: number;
  visible: boolean;
};

const GLIDE_SPRING = { type: "spring", duration: 0.08, bounce: 0 } as const;

function useGlideHover<T extends HTMLElement = HTMLElement>(
  axis: "x" | "y" | "xy",
  {
    gapClick = true,
    itemSelector = "[data-glide-item]",
  }: { gapClick?: boolean; itemSelector?: string } = {},
) {
  const containerRef = React.useRef<T | null>(null);
  const activeRef = React.useRef<HTMLElement | null>(null);
  const sessionRef = React.useRef(0);
  const [glide, setGlide] = React.useState<GlideRect | null>(null);

  const pick = React.useCallback(
    (clientX: number, clientY: number) => {
      const root = containerRef.current;
      if (!root) return;
      let best: HTMLElement | null = null;
      let bestDistance = Infinity;
      for (const item of root.querySelectorAll<HTMLElement>(itemSelector)) {
        if (item.matches(':disabled, [data-disabled], [aria-disabled="true"]'))
          continue;
        const r = item.getBoundingClientRect();
        if (
          clientX >= r.left &&
          clientX <= r.right &&
          clientY >= r.top &&
          clientY <= r.bottom
        ) {
          best = item;
          break;
        }
        const dx = axis === "y" ? 0 : clientX - (r.left + r.width / 2);
        const dy = axis === "x" ? 0 : clientY - (r.top + r.height / 2);
        const distance = dx * dx + dy * dy;
        if (distance < bestDistance) {
          bestDistance = distance;
          best = item;
        }
      }
      activeRef.current = best;
      if (!best) return;
      const rootRect = root.getBoundingClientRect();
      const r = best.getBoundingClientRect();
      const x = r.left - rootRect.left - root.clientLeft + root.scrollLeft;
      const y = r.top - rootRect.top - root.clientTop + root.scrollTop;
      const session = sessionRef.current;
      setGlide((prev) =>
        prev &&
        prev.visible &&
        prev.session === session &&
        prev.x === x &&
        prev.y === y &&
        prev.w === r.width &&
        prev.h === r.height
          ? prev
          : { x, y, w: r.width, h: r.height, session, visible: true },
      );
    },
    [axis, itemSelector],
  );

  const handlers = {
    onPointerEnter(event: React.PointerEvent) {
      if (event.pointerType !== "mouse") return;
      sessionRef.current += 1;
      pick(event.clientX, event.clientY);
    },
    onPointerMove(event: React.PointerEvent) {
      if (event.pointerType === "mouse") pick(event.clientX, event.clientY);
    },
    onPointerLeave() {
      activeRef.current = null;
      setGlide((prev) => (prev ? { ...prev, visible: false } : prev));
    },
    onClick(event: React.MouseEvent) {
      if (!gapClick) return;
      const root = containerRef.current;
      const target = event.target as Node;
      if (
        root &&
        Array.from(root.querySelectorAll(itemSelector)).some((item) =>
          item.contains(target),
        )
      )
        return;
      activeRef.current?.click();
    },
  };

  return { containerRef, glide, handlers };
}

function GlideHighlight({
  glide,
  className,
}: {
  glide: GlideRect | null;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  if (!glide) return null;
  const box = { x: glide.x, y: glide.y, width: glide.w, height: glide.h };
  return (
    <motion.span
      key={glide.session}
      aria-hidden="true"
      data-slot="glide-highlight"
      className={cn(
        "pointer-events-none absolute left-0 top-0 z-0 bg-foreground/5",
        className,
      )}
      initial={{ ...box, opacity: 0 }}
      animate={{ ...box, opacity: glide.visible ? 1 : 0 }}
      transition={
        reduceMotion
          ? { duration: 0, opacity: { duration: 0.08 } }
          : {
              ...GLIDE_SPRING,
              opacity: { duration: glide.visible ? 0.08 : 0.06 },
            }
      }
    />
  );
}

function assignGlideRef<T>(ref: React.Ref<T> | undefined, node: T | null) {
  if (typeof ref === "function") ref(node);
  else if (ref) (ref as React.RefObject<T | null>).current = node;
}

function useGlideRef<T extends HTMLElement>(
  forwarded: React.ForwardedRef<T>,
  containerRef: React.RefObject<T | null>,
) {
  return React.useCallback(
    (node: T | null) => {
      assignGlideRef(containerRef, node);
      assignGlideRef(forwarded, node);
    },
    [forwarded, containerRef],
  );
}

/* ─── Root Table ───────────────────────────────────────────── */

export const Table = React.forwardRef<HTMLDivElement, TableProps>(
  (
    {
      className,
      stickyHeader = false,
      density = "comfortable",
      glide = true,
      children,
      ...props
    },
    ref,
  ) => {
    const layoutGroupId = React.useId();
    const glideHook = useGlideHover<HTMLDivElement>("y", {
      gapClick: false,
      itemSelector: 'tbody > tr[data-slot="table-row"]',
    });
    const tableRef = useGlideRef(ref, glideHook.containerRef);

    return (
      <TableContext.Provider
        value={{ density, stickyHeader, animatedSort: false, layoutGroupId }}
      >
        <div
          ref={glide ? tableRef : ref}
          data-slot="table"
          data-sticky-header={stickyHeader ? "true" : undefined}
          className={cn("relative overflow-auto w-full h-full", className)}
          {...props}
          onPointerEnter={(event) => {
            props.onPointerEnter?.(event);
            if (glide) glideHook.handlers.onPointerEnter(event);
          }}
          onPointerMove={(event) => {
            props.onPointerMove?.(event);
            if (glide) glideHook.handlers.onPointerMove(event);
          }}
          onPointerLeave={(event) => {
            props.onPointerLeave?.(event);
            if (glide) glideHook.handlers.onPointerLeave();
          }}
        >
          {glide && <GlideHighlight glide={glideHook.glide} />}
          <table className="relative caption-bottom border-collapse text-left w-full">
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  },
);
Table.displayName = "Table";

/* ─── Sections ─────────────────────────────────────────────── */

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      "p-4 bg-sidebar border-t text-xs text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  const { stickyHeader } = useTableContext();
  return (
    <thead
      ref={ref}
      className={cn(
        "bg-sidebar border-b",
        stickyHeader && "sticky top-0 z-10",
        className,
      )}
      {...props}
    />
  );
});
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(({ className, animatedSort = false, children, ...props }, ref) => {
  const parentContext = useTableContext();
  const sortEnabled = animatedSort || parentContext.animatedSort;

  return (
    <TableContext.Provider
      value={{ ...parentContext, animatedSort: sortEnabled }}
    >
      <tbody
        ref={ref}
        className={cn("[&_tr:last-child]:border-0", className)}
        {...props}
      >
        {sortEnabled ? (
          <LayoutGroup id={parentContext.layoutGroupId}>{children}</LayoutGroup>
        ) : (
          children
        )}
      </tbody>
    </TableContext.Provider>
  );
});
TableBody.displayName = "TableBody";

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-sidebar font-medium",
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

/* ─── Row ──────────────────────────────────────────────────── */

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  (
    {
      className,
      selected = false,
      expanded = false,
      selectable = false,
      onSelectedChange,
      expandable = false,
      onExpandedChange,
      onClick,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    const { animatedSort } = useTableContext();
    const shouldReduceMotion = useReducedMotion();
    const isInteractive = selectable || expandable;

    const handleClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
      onClick?.(event);
      if (event.defaultPrevented || isInteractiveTarget(event.target)) return;
      if (selectable) onSelectedChange?.(!selected);
      else if (expandable) onExpandedChange?.(!expanded);
    };

    const sharedClass = cn(
      "border-b border-border transition-colors duration-200",
      isInteractive && "cursor-pointer",
      selected && "bg-foreground/5",
      expanded && !selected && "hover:bg-foreground/5",
      className,
    );

    const sharedProps = {
      "data-slot": "table-row",
      "data-selected": selected ? "true" : undefined,
      "data-expanded": expanded ? "true" : undefined,
      "data-selectable": selectable ? "true" : undefined,
      "data-expandable": expandable ? "true" : undefined,
      onClick: isInteractive ? handleClick : onClick,
      className: sharedClass,
      style: { ["--table-ease-out" as string]: EASE_OUT, ...style },
      ...props,
    };

    if (animatedSort && !shouldReduceMotion) {
      const motionRowProps = sharedProps as React.ComponentPropsWithoutRef<
        typeof motion.tr
      >;
      return (
        <motion.tr
          ref={ref}
          {...motionRowProps}
          layout="position"
          transition={{
            layout: { duration: SORT_LAYOUT_MS, ease: EASE_MORPH },
          }}
        >
          {children}
        </motion.tr>
      );
    }
    return (
      <tr ref={ref} {...sharedProps}>
        {children}
      </tr>
    );
  },
);
TableRow.displayName = "TableRow";

/* ─── Head cell ────────────────────────────────────────────── */

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    {
      className,
      sortable = false,
      sortDirection = null,
      onSort,
      align = "start",
      children,
      "aria-sort": ariaSort,
      ...props
    },
    ref,
  ) => {
    const { density } = useTableContext();
    const isActive = Boolean(sortDirection);

    const resolvedAriaSort =
      sortDirection === "asc"
        ? "ascending"
        : sortDirection === "desc"
          ? "descending"
          : ariaSort;

    const content = (
      <>
        <span className="truncate">{children}</span>

        {sortable ? <SortIndicator direction={sortDirection} /> : null}
      </>
    );

    const sharedClass = cn(
      "relative whitespace-nowrap font-medium tracking-[-0.01em]",
      densityClasses[density].head,
      sortable &&
        "cursor-pointer select-none transition-colors duration-150 hover:text-foreground",
      isActive && "bg-foreground/10",
      className,
    );

    const justifyClass =
      align === "start"
        ? "justify-start"
        : align === "end"
          ? "justify-end"
          : "justify-center";

    if (sortable) {
      return (
        <th
          ref={ref}
          {...props}
          scope="col"
          className={sharedClass}
          aria-sort={resolvedAriaSort}
          data-sort-active={isActive ? "true" : undefined}
        >
          <button
            type="button"
            onClick={onSort}
            className={cn(
              "flex w-full items-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              justifyClass,
            )}
          >
            {content}
          </button>
        </th>
      );
    }

    return (
      <th
        ref={ref}
        {...props}
        scope="col"
        aria-sort={ariaSort}
        className={cn(sharedClass, "align-middle")}
      >
        <span className={cn("flex w-full items-center gap-1.5", justifyClass)}>
          {content}
        </span>
      </th>
    );
  },
);
TableHead.displayName = "TableHead";

/* ─── Cell ─────────────────────────────────────────────────── */

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => {
    const { density } = useTableContext();
    return (
      <td
        ref={ref}
        className={cn(
          "align-middle text-foreground",
          densityClasses[density].cell,
          className,
        )}
        {...props}
      />
    );
  },
);
TableCell.displayName = "TableCell";

/* ─── Checkbox cell ────────────────────────────────────────── */

export interface TableSelectCellProps extends Omit<TableCellProps, "children"> {
  checked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  ariaLabel?: string;
}

function TableCheckbox({
  checked,
  indeterminate,
  onCheckedChange,
  ariaLabel,
}: {
  checked: boolean;
  indeterminate: boolean;
  onCheckedChange?: (checked: boolean) => void;
  ariaLabel: string;
}) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  React.useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label
      data-slot="table-checkbox"
      className={cn(
        "relative inline-grid size-5 cursor-pointer place-items-center border border-border rounded",
        "bg-background text-background",
        "transition-colors duration-150",
        "has-focus-visible:ring-2 has-focus-visible:ring-ring has-focus-visible:ring-offset-2",
        (checked || indeterminate) &&
          "border-primary bg-primary text-primary-foreground",
      )}
    >
      <input
        ref={inputRef}
        type="checkbox"
        checked={checked}
        aria-label={ariaLabel}
        onChange={(e) => onCheckedChange?.(e.currentTarget.checked)}
        className="sr-only"
      />
      <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5">
        {indeterminate ? (
          <path
            d="M4 8h8"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
        ) : (
          <path
            d="m3.6 8.2 2.8 2.8 6-6"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        )}
      </svg>
    </label>
  );
}

export const TableSelectCell = React.forwardRef<
  HTMLTableCellElement,
  TableSelectCellProps
>(
  (
    {
      checked = false,
      indeterminate = false,
      onCheckedChange,
      ariaLabel = "Select row",
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    const { density } = useTableContext();
    return (
      <td
        ref={ref}
        data-slot="table-select-cell"
        className={cn(
          "w-10 px-3 text-center",
          densityClasses[density].cell,
          className,
        )}
        onClick={(event) => {
          event.stopPropagation();
          onClick?.(event);
        }}
        {...props}
      >
        <TableCheckbox
          checked={checked}
          indeterminate={indeterminate}
          onCheckedChange={(v) => onCheckedChange?.(v === true)}
          ariaLabel={ariaLabel}
        />
      </td>
    );
  },
);
TableSelectCell.displayName = "TableSelectCell";

/* ─── Expand trigger ───────────────────────────────────────── */

export interface TableExpandTriggerCellProps extends TableCellProps {
  expanded?: boolean;
  onToggle?: () => void;
  label?: string;
}

export const TableExpandTriggerCell = React.forwardRef<
  HTMLTableCellElement,
  TableExpandTriggerCellProps
>(
  (
    {
      expanded = false,
      onToggle,
      label = "Toggle row details",
      className,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const { density } = useTableContext();
    return (
      <td
        ref={ref}
        data-prevent-row-action="true"
        className={cn(
          "text-center w-5",
          densityClasses[density].cell,
          className,
        )}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e);
        }}
        {...props}
      >
        <button
          type="button"
          aria-expanded={expanded}
          aria-label={label}
          data-prevent-row-action="true"
          onClick={(e) => {
            e.stopPropagation();
            onToggle?.();
          }}
          className={cn(
            "inline-flex size-7 items-center justify-center rounded-md",
            "text-muted-foreground transition-colors duration-150 hover:bg-foreground/5 hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <ChevronDown
            size={16}
            className={cn(
              "transition-transform duration-200",
              expanded && "rotate-180",
            )}
          />
        </button>
        {children}
      </td>
    );
  },
);
TableExpandTriggerCell.displayName = "TableExpandTriggerCell";

/* ─── Expandable content row ───────────────────────────────── */

export const TableExpandableContent = React.forwardRef<
  HTMLTableRowElement,
  TableExpandableContentProps
>(({ className, open = false, colSpan, children, ...props }, ref) => (
  <tr
    ref={ref}
    {...props}
    aria-hidden={!open}
    data-slot="table-expandable-content"
    className={cn(open && "border-b", className)}
  >
    <td colSpan={colSpan} className="p-0">
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
        inert={open ? undefined : true}
      >
        <div className="overflow-hidden">
          <div className="px-4 py-3 text-sm text-muted-foreground">
            {children}
          </div>
        </div>
      </div>
    </td>
  </tr>
));
TableExpandableContent.displayName = "TableExpandableContent";

/* ─── Toolbar (search / filter / view / actions) ──────────── */

export interface TableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  search?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export const TableToolbar = React.forwardRef<HTMLDivElement, TableToolbarProps>(
  (
    {
      className,
      search,
      onSearchChange,
      searchPlaceholder = "Search…",
      actions,
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-wrap items-center justify-between gap-3",
        className,
      )}
      {...props}
    >
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {onSearchChange !== undefined && (
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search ?? ""}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-10 w-full rounded-md border border-border bg-background pl-9 pr-8 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            {search && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-foreground/5"
              >
                <X className="size-3" />
              </button>
            )}
          </div>
        )}
        {children}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  ),
);
TableToolbar.displayName = "TableToolbar";

/* ─── Pagination ───────────────────────────────────────────── */

export interface TablePaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  page: number;
  totalPages: number;
  pageSize: number;
  total: number;
  selectedCount?: number;
  onPageChange: (page: number) => void;
}

export const TablePagination = React.forwardRef<
  HTMLDivElement,
  TablePaginationProps
>(
  (
    {
      className,
      page,
      totalPages,
      pageSize,
      total,
      selectedCount = 0,
      onPageChange,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-wrap items-center justify-between gap-2 mt-3 text-xs font-medium text-muted-foreground",
        className,
      )}
      {...props}
    >
      <div>
        Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)}{" "}
        of {total}
        {selectedCount > 0 && ` · ${selectedCount} selected`}
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="text-xs disabled:opacity-40"
        >
          Previous
        </Button>
        <span className="px-1.5">
          Page {page} of {totalPages}
        </span>
        <Button
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="text-xs disabled:opacity-40"
        >
          Next
        </Button>
      </div>
    </div>
  ),
);
TablePagination.displayName = "TablePagination";

/* ─── Sort helper for head cells ───────────────────────────── */

export function nextSortDirection(current: SortDirection): SortDirection {
  if (current === null) return "asc";
  if (current === "asc") return "desc";
  return null;
}

/* ─── Re-exports for composition ──────────────────────────── */

export { motion, AnimatePresence, useReducedMotion };

export const TableIcons = {
  Search: Search,
  Filter: Filter,
  X: X,
  ArrowUp: ArrowUp,
  ArrowDown: ArrowDown,
  Sort: ArrowUpDown,
  Check: Check,
  Minus: Minus,
  ChevronDown: ChevronDown,
  ChevronUp: ChevronUp,
};
