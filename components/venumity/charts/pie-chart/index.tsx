"use client";
import { cn } from "@/lib/utils";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import React, { createContext, useContext, useId, useMemo } from "react";
import {
  Cell,
  Pie,
  Sector,
  Tooltip,
  PieChart as RechartsPieChart,
} from "recharts";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type PieChartVariant = "pie" | "donut";

export type PieChartDatum = Record<string, string | number>;

export interface PieChartSliceConfig {
  nameKey?: string;
  valueKey?: string;
  colorKey?: string;
  defaultColor?: string;
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
  cornerRadius?: number;
  stroke?: string;
  strokeWidth?: number;
  cx?: number | string;
  cy?: number | string;
  showLabel?: boolean;
  showLabelLine?: boolean;
  labelFormatter?: (entry: {
    value: number;
    percent: number;
    name: string;
  }) => string;
  activeExpandOffset?: number;
  renderActiveShape?: (props: PieSectorDataItem) => React.ReactNode;
}

export interface PieChartTooltipEntry {
  name?: string;
  value?: number | string;
  color?: string;
  payload?: PieChartDatum;
}

export interface PieChartProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: PieChartVariant;
  data: PieChartDatum[];
  nameKey?: string;
  valueKey?: string;
  colorKey?: string;
  sliceConfig?: PieChartSliceConfig;
  activeIndex?: number;
  onSliceHover?: (index: number | undefined) => void;
  onSliceClick?: (datum: PieChartDatum, index: number) => void;
}

export interface PieChartSlicesProps {
  className?: string;
  nameKey?: string;
  valueKey?: string;
  colorKey?: string;
  defaultColor?: string;
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
  cornerRadius?: number;
  stroke?: string;
  strokeWidth?: number;
  cx?: number | string;
  cy?: number | string;
  showLabel?: boolean;
  showLabelLine?: boolean;
  labelFormatter?: (entry: {
    value: number;
    percent: number;
    name: string;
  }) => string;
  activeIndex?: number;
  activeExpandOffset?: number;
  renderActiveShape?: (props: PieSectorDataItem) => React.ReactNode;
  onSliceHover?: (index: number | undefined) => void;
  onSliceClick?: (datum: PieChartDatum, index: number) => void;
}

export interface PieChartTooltipProps {
  className?: string;
  active?: boolean;
  payload?: PieChartTooltipEntry[];
  unitLabel?: string;
  valueFormatter?: (value: number) => string;
  percentageFormatter?: (value: number, total: number) => string;
}

export interface PieChartCanvasProps {
  className?: string;
  children?: React.ReactNode;
}

interface PieChartContextValue {
  variant: PieChartVariant;
  data: PieChartDatum[];
  nameKey: string;
  valueKey: string;
  colorKey: string;
  sliceConfig?: PieChartSliceConfig;
  activeIndex?: number;
  onSliceHover?: (index: number | undefined) => void;
  onSliceClick?: (datum: PieChartDatum, index: number) => void;
  uniquePrefix: string;
}

const PieChartContext = createContext<PieChartContextValue | null>(null);

export function usePieChartContext() {
  const context = useContext(PieChartContext);
  if (!context) {
    throw new Error(
      "PieChart sub-components must be used within a PieChart provider",
    );
  }
  return context;
}

function toNumericValue(raw: string | number | undefined): number {
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : 0;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

function defaultFormatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

function defaultFormatPercentage(value: number, total: number): string {
  return total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";
}

function defaultActiveSector(
  props: PieSectorDataItem,
  expandOffset: number,
): React.ReactNode {
  const baseOuter = props.outerRadius ?? 120;
  const baseInner = props.innerRadius ?? 0;

  return (
    <g>
      <Sector {...props} outerRadius={baseOuter + expandOffset} />
      {baseInner > 0 && (
        <Sector
          {...props}
          innerRadius={baseInner + expandOffset}
          outerRadius={baseOuter + expandOffset}
        />
      )}
    </g>
  );
}

// ============================================================================
// EXPORTED CUSTOMIZABLE SUB-PARTS
// ============================================================================

export function PieChartTooltip({
  className,
  active,
  payload,
  unitLabel = "units",
  valueFormatter = defaultFormatNumber,
  percentageFormatter = defaultFormatPercentage,
}: PieChartTooltipProps) {
  const { data, nameKey, valueKey, colorKey } = usePieChartContext();

  if (!active || !payload?.length) return null;

  const rawDatum = payload[0]?.payload;
  if (!rawDatum) return null;

  const sliceName = String(rawDatum[nameKey] ?? payload[0]?.name ?? "");
  const sliceValue = toNumericValue(rawDatum[valueKey] ?? payload[0]?.value);
  const sliceColor =
    String(rawDatum[colorKey] ?? "") || payload[0]?.color || "#3b82f6";

  const total = data.reduce(
    (sum, item) => sum + toNumericValue(item[valueKey]),
    0,
  );

  return (
    <div
      className={cn(
        "min-w-44 rounded-xl border border-foreground/15 bg-background/95 p-3 text-xs shadow-xl backdrop-blur-md supports-backdrop-filter:bg-background/80",
        className,
      )}
    >
      <div className="mb-2 flex items-center gap-2 border-b border-dashed border-foreground/15 pb-1.5">
        <span
          className="size-3 shrink-0 rounded-xs ring-1 ring-foreground/10"
          style={{ backgroundColor: sliceColor }}
        />
        <p className="truncate font-semibold tracking-tight text-foreground">
          {sliceName}
        </p>
      </div>

      <p
        className="font-mono text-base font-bold tabular-nums"
        style={{ color: sliceColor }}
      >
        {valueFormatter(sliceValue)} {unitLabel}
      </p>

      <p className="mt-1 text-[11px] text-foreground/60">
        {percentageFormatter(sliceValue, total)}% of total
      </p>
    </div>
  );
}

export function PieChartSlices({
  className,
  nameKey: propNameKey,
  valueKey: propValueKey,
  colorKey: propColorKey,
  defaultColor = "#3b82f6",
  innerRadius: propInnerRadius,
  outerRadius: propOuterRadius,
  paddingAngle: propPaddingAngle,
  cornerRadius: propCornerRadius,
  stroke = "hsl(var(--background))",
  strokeWidth = 3,
  cx = "50%",
  cy = "50%",
  showLabel,
  showLabelLine = false,
  labelFormatter,
  activeIndex: propActiveIndex,
  activeExpandOffset: propExpandOffset,
  renderActiveShape: propRenderActiveShape,
  onSliceHover: propOnSliceHover,
  onSliceClick: propOnSliceClick,
}: PieChartSlicesProps) {
  const {
    variant,
    data,
    nameKey: ctxNameKey,
    valueKey: ctxValueKey,
    colorKey: ctxColorKey,
    sliceConfig,
    activeIndex: ctxActiveIndex,
    onSliceHover: ctxOnSliceHover,
    onSliceClick: ctxOnSliceClick,
    uniquePrefix,
  } = usePieChartContext();

  const resolvedNameKey = propNameKey ?? sliceConfig?.nameKey ?? ctxNameKey;
  const resolvedValueKey = propValueKey ?? sliceConfig?.valueKey ?? ctxValueKey;
  const resolvedColorKey = propColorKey ?? sliceConfig?.colorKey ?? ctxColorKey;

  const isDonut = variant === "donut";
  const expandOffset =
    propExpandOffset ?? sliceConfig?.activeExpandOffset ?? 12;

  const resolvedInnerRadius =
    propInnerRadius ?? sliceConfig?.innerRadius ?? (isDonut ? 64 : 0);
  const resolvedOuterRadius =
    propOuterRadius ?? sliceConfig?.outerRadius ?? 124;
  const resolvedPaddingAngle =
    propPaddingAngle ?? sliceConfig?.paddingAngle ?? (isDonut ? 3 : 0);
  const resolvedCornerRadius =
    propCornerRadius ?? sliceConfig?.cornerRadius ?? (isDonut ? 6 : 0);
  const resolvedShowLabel = showLabel ?? sliceConfig?.showLabel ?? true;
  const resolvedLabelLine =
    showLabelLine ?? sliceConfig?.showLabelLine ?? false;
  const resolvedLabelFormatter = labelFormatter ?? sliceConfig?.labelFormatter;
  const resolvedActiveIndex = propActiveIndex ?? ctxActiveIndex;
  const handleHover = propOnSliceHover ?? ctxOnSliceHover;
  const handleClick = propOnSliceClick ?? ctxOnSliceClick;

  const activeShapeFn =
    propRenderActiveShape ??
    sliceConfig?.renderActiveShape ??
    ((sectorProps: PieSectorDataItem) =>
      defaultActiveSector(sectorProps, expandOffset));

  return (
    <Pie
      data={data}
      dataKey={resolvedValueKey}
      nameKey={resolvedNameKey}
      cx={cx}
      cy={cy}
      innerRadius={resolvedInnerRadius}
      outerRadius={resolvedOuterRadius}
      paddingAngle={resolvedPaddingAngle}
      cornerRadius={resolvedCornerRadius}
      stroke={sliceConfig?.stroke ?? stroke}
      strokeWidth={sliceConfig?.strokeWidth ?? strokeWidth}
      label={
        resolvedShowLabel
          ? (entry) => {
              const numericVal = toNumericValue(entry.value);
              const pct = (entry.percent ?? 0) * 100;
              const sliceTitle = String(entry.name ?? "");
              if (resolvedLabelFormatter) {
                return resolvedLabelFormatter({
                  value: numericVal,
                  percent: pct,
                  name: sliceTitle,
                });
              }
              return `${pct.toFixed(0)}%`;
            }
          : false
      }
      labelLine={resolvedLabelLine}
      onMouseEnter={(_, index) => handleHover?.(index)}
      onMouseLeave={() => handleHover?.(undefined)}
      onClick={(entry, index) =>
        handleClick?.((entry?.payload ?? entry) as PieChartDatum, index)
      }
      className={cn("outline-none", className)}
      {...(resolvedActiveIndex !== undefined
        ? ({
            activeIndex: resolvedActiveIndex,
            activeShape: activeShapeFn,
          } as Record<string, unknown>)
        : {})}
    >
      {data.map((entry, idx) => {
        const sliceName = String(entry[resolvedNameKey] ?? idx);
        const sliceColor =
          String(entry[resolvedColorKey] ?? "") ||
          sliceConfig?.defaultColor ||
          defaultColor;

        return (
          <Cell key={`${uniquePrefix}-${sliceName}-${idx}`} fill={sliceColor} />
        );
      })}
    </Pie>
  );
}

export function PieChartCanvas({ className, children }: PieChartCanvasProps) {
  const { data, nameKey, valueKey, colorKey } = usePieChartContext();

  const chartConfig = useMemo<ChartConfig>(() => {
    const config: ChartConfig = {
      [valueKey]: { label: "Value" },
    };
    for (const item of data) {
      const k = String(item[nameKey] ?? "");
      if (k) {
        config[k] = {
          label: k,
          color: String(item[colorKey] ?? "") || "#3b82f6",
        };
      }
    }
    return config;
  }, [data, nameKey, valueKey, colorKey]);

  return (
    <div className={cn("h-64 sm:h-72 md:h-80 w-full", className)}>
      <ChartContainer config={chartConfig} className="h-full w-full">
        <RechartsPieChart accessibilityLayer>
          {children ?? (
            <>
              <PieChartSlices />
              <Tooltip content={<PieChartTooltip />} />
            </>
          )}
        </RechartsPieChart>
      </ChartContainer>
    </div>
  );
}

// ============================================================================
// MAIN COMBINED COMPONENT
// ============================================================================

export function PieChart({
  variant = "pie",
  data,
  nameKey = "name",
  valueKey = "value",
  colorKey = "color",
  sliceConfig,
  activeIndex,
  onSliceHover,
  onSliceClick,
  className,
  children,
  ...props
}: PieChartProps) {
  const rawId = useId();
  const uniquePrefix = useMemo(() => `pc-${rawId.replace(/:/g, "")}`, [rawId]);

  return (
    <PieChartContext.Provider
      value={{
        variant,
        data,
        nameKey,
        valueKey,
        colorKey,
        sliceConfig,
        activeIndex,
        onSliceHover,
        onSliceClick,
        uniquePrefix,
      }}
    >
      <div className={cn("w-full select-none", className)} {...props}>
        {children ?? <PieChartCanvas />}
      </div>
    </PieChartContext.Provider>
  );
}

export default PieChart;
