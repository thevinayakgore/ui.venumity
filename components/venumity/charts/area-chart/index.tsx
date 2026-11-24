"use client";
import { cn } from "@/lib/utils";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import React, { createContext, useContext, useId, useMemo } from "react";
import {
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart as RechartsAreaChart,
} from "recharts";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type AreaChartVariant =
  | "line"
  | "monotone"
  | "gradient"
  | "overlap"
  | "stacked";

export type AreaChartDatum = Record<string, string | number>;

export interface AreaChartSeriesConfig {
  key: string;
  label: string;
  color: string;
  gradientTo?: string;
  stackId?: string;
}

export interface AreaChartTooltipEntry {
  dataKey?: string | number;
  name?: string;
  value?: number | string;
  color?: string;
  payload?: AreaChartDatum;
}

export interface AreaChartProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AreaChartVariant;
  data?: AreaChartDatum[];
  series?: AreaChartSeriesConfig[];
  xAxisKey?: string;
}

export interface AreaChartGridProps {
  className?: string;
  horizontal?: boolean;
  vertical?: boolean;
  strokeDasharray?: string;
}

export interface AreaChartXAxisProps {
  className?: string;
  dataKey?: string;
  tickLine?: boolean;
  axisLine?: boolean;
  tickMargin?: number;
}

export interface AreaChartYAxisProps {
  className?: string;
  tickLine?: boolean;
  axisLine?: boolean;
  tickMargin?: number;
  width?: number;
  tickFormatter?: (value: number) => string;
}

export interface AreaChartSeriesProps {
  className?: string;
  strokeWidth?: number;
}

export interface AreaChartTooltipProps {
  className?: string;
  active?: boolean;
  payload?: AreaChartTooltipEntry[];
  label?: string;
}

interface AreaChartContextValue {
  variant: AreaChartVariant;
  xAxisKey: string;
  series: AreaChartSeriesConfig[];
  data: AreaChartDatum[];
  gradientPrefix: string;
}

const AreaChartContext = createContext<AreaChartContextValue | null>(null);

export function useAreaChartContext() {
  const context = useContext(AreaChartContext);
  if (!context) {
    throw new Error(
      "AreaChart sub-components must be used within an AreaChart provider",
    );
  }
  return context;
}

// ============================================================================
// VARIANT PRESETS (line | monotone | gradient | overlap | stacked)
// ============================================================================

const VARIANT_CONFIGS: Record<
  AreaChartVariant,
  {
    xAxisKey: string;
    series: AreaChartSeriesConfig[];
    data: AreaChartDatum[];
  }
> = {
  line: {
    xAxisKey: "name",
    series: [{ key: "value", label: "Value", color: "#f97316" }],
    data: [
      { name: "Jan", value: 4000 },
      { name: "Feb", value: 3000 },
      { name: "Mar", value: 5000 },
      { name: "Apr", value: 4500 },
      { name: "May", value: 6000 },
      { name: "Jun", value: 5500 },
      { name: "Jul", value: 7000 },
    ],
  },
  monotone: {
    xAxisKey: "name",
    series: [{ key: "value", label: "Revenue", color: "#f97316" }],
    data: [
      { name: "Jan", value: 4000 },
      { name: "Feb", value: 3000 },
      { name: "Mar", value: 5000 },
      { name: "Apr", value: 4500 },
      { name: "May", value: 6000 },
      { name: "Jun", value: 5500 },
      { name: "Jul", value: 7000 },
      { name: "Aug", value: 6450 },
      { name: "Sep", value: 7000 },
      { name: "Oct", value: 4000 },
      { name: "Nov", value: 8000 },
      { name: "Dec", value: 6000 },
    ],
  },
  gradient: {
    xAxisKey: "name",
    series: [
      {
        key: "value",
        label: "Activity",
        color: "#a855f7",
        gradientTo: "#ec4899",
      },
    ],
    data: [
      { name: "Mon", value: 2400 },
      { name: "Tue", value: 1398 },
      { name: "Wed", value: 9800 },
      { name: "Thu", value: 3908 },
      { name: "Fri", value: 4800 },
      { name: "Sat", value: 3800 },
      { name: "Sun", value: 4300 },
    ],
  },
  overlap: {
    xAxisKey: "name",
    series: [
      { key: "revenue", label: "Revenue", color: "#f97316" },
      { key: "profit", label: "Profit", color: "#10b981" },
    ],
    data: [
      { name: "Week 1", revenue: 4000, profit: 2400 },
      { name: "Week 2", revenue: 3000, profit: 1398 },
      { name: "Week 3", revenue: 5000, profit: 3800 },
      { name: "Week 4", revenue: 2780, profit: 1908 },
      { name: "Week 5", revenue: 6890, profit: 4800 },
      { name: "Week 6", revenue: 5390, profit: 3800 },
      { name: "Week 7", revenue: 7490, profit: 5300 },
      { name: "Week 8", revenue: 6200, profit: 4100 },
    ],
  },
  stacked: {
    xAxisKey: "name",
    series: [
      {
        key: "tablet",
        label: "Tablet",
        color: "#10b981",
        stackId: "area-stack",
      },
      {
        key: "mobile",
        label: "Mobile",
        color: "#a855f7",
        stackId: "area-stack",
      },
      {
        key: "desktop",
        label: "Desktop",
        color: "#06b6d4",
        stackId: "area-stack",
      },
    ],
    data: [
      { name: "Jan", desktop: 4000, mobile: 2400, tablet: 1200 },
      { name: "Feb", desktop: 3000, mobile: 1398, tablet: 900 },
      { name: "Mar", desktop: 2000, mobile: 9800, tablet: 1500 },
      { name: "Apr", desktop: 2780, mobile: 3908, tablet: 2100 },
      { name: "May", desktop: 1890, mobile: 4800, tablet: 1800 },
      { name: "Jun", desktop: 2390, mobile: 3800, tablet: 2200 },
      { name: "Jul", desktop: 3490, mobile: 4300, tablet: 2500 },
    ],
  },
};

function toNumericValue(raw: string | number | undefined): number {
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : 0;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

// ============================================================================
// EXPORTED CUSTOMIZABLE SUB-PARTS
// ============================================================================

export function AreaChartGrid({
  className,
  horizontal = true,
  vertical = false,
  strokeDasharray,
}: AreaChartGridProps) {
  return (
    <CartesianGrid
      horizontal={horizontal}
      vertical={vertical}
      strokeDasharray={strokeDasharray}
      className={cn(
        "[&_.recharts-cartesian-grid-line_line]:stroke-foreground/10",
        className,
      )}
    />
  );
}

export function AreaChartXAxis({
  className,
  dataKey,
  tickLine = false,
  axisLine = false,
  tickMargin = 8,
}: AreaChartXAxisProps) {
  const { xAxisKey } = useAreaChartContext();

  return (
    <XAxis
      dataKey={dataKey ?? xAxisKey}
      tickLine={tickLine}
      axisLine={axisLine}
      tickMargin={tickMargin}
      className={cn(
        "[&_.recharts-cartesian-axis-tick-value]:fill-foreground/60 [&_.recharts-cartesian-axis-tick-value]:text-xs [&_.recharts-cartesian-axis-tick-value]:font-medium",
        className,
      )}
    />
  );
}

export function AreaChartYAxis({
  className,
  tickLine = false,
  axisLine = false,
  tickMargin = 8,
  width = 48,
  tickFormatter,
}: AreaChartYAxisProps) {
  const defaultFormatter = (value: number) =>
    Math.abs(value) >= 1000
      ? `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K`
      : `${value}`;

  return (
    <YAxis
      width={width}
      tickLine={tickLine}
      axisLine={axisLine}
      tickMargin={tickMargin}
      tickFormatter={tickFormatter ?? defaultFormatter}
      className={cn(
        "[&_.recharts-cartesian-axis-tick-value]:fill-foreground/60 [&_.recharts-cartesian-axis-tick-value]:text-xs [&_.recharts-cartesian-axis-tick-value]:font-mono [&_.recharts-cartesian-axis-tick-value]:tabular-nums",
        className,
      )}
    />
  );
}

export function AreaChartTooltip({
  className,
  active,
  payload,
  label,
}: AreaChartTooltipProps) {
  const { series } = useAreaChartContext();

  if (!active || !payload?.length) return null;

  return (
    <div
      className={cn(
        "min-w-44 rounded-xl border border-foreground/15 bg-background/95 p-3 text-xs shadow-xl backdrop-blur-md supports-backdrop-filter:bg-background/80",
        className,
      )}
    >
      {label !== undefined && (
        <p className="mb-2 border-b border-dashed border-foreground/15 pb-1.5 font-semibold tracking-tight text-foreground">
          {label}
        </p>
      )}
      <div className="space-y-1.5">
        {payload.map((entry, index) => {
          const key = String(entry.dataKey ?? "");
          const config = series.find((s) => s.key === key);
          const color = config?.color ?? entry.color ?? "#71717a";
          const displayLabel = config?.label ?? entry.name ?? key;
          const numericVal = toNumericValue(entry.value);

          return (
            <div
              key={`${key}-${index}`}
              className="flex items-center justify-between gap-4"
            >
              <span className="flex items-center gap-2 text-foreground/70">
                <span
                  className="size-2.5 shrink-0 rounded-full ring-1 ring-foreground/10"
                  style={{ backgroundColor: color }}
                />
                <span className="truncate">{displayLabel}</span>
              </span>
              <span className="font-mono font-semibold tabular-nums text-foreground">
                {numericVal.toLocaleString("en-US")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AreaChartSeries({
  className,
  strokeWidth,
}: AreaChartSeriesProps) {
  const { variant, series, gradientPrefix } = useAreaChartContext();

  const curveType = variant === "line" ? "linear" : "monotone";

  const defaultStrokeWidth =
    strokeWidth ?? (variant === "stacked" || variant === "overlap" ? 2 : 2.5);

  return (
    <>
      {series.map((item) => {
        const fillId = `${gradientPrefix}-fill-${item.key}`;
        const strokeId = `${gradientPrefix}-stroke-${item.key}`;
        const hasGradientStops = Boolean(item.gradientTo);

        const fillOpacityTop =
          variant === "line" ? 0.14 : variant === "overlap" ? 0.35 : 0.6;
        const fillOpacityBottom = variant === "line" ? 0.0 : 0.02;

        return (
          <React.Fragment key={item.key}>
            <defs>
              <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={item.color}
                  stopOpacity={fillOpacityTop}
                />
                {hasGradientStops && (
                  <stop
                    offset="50%"
                    stopColor={item.gradientTo}
                    stopOpacity={0.35}
                  />
                )}
                <stop
                  offset="100%"
                  stopColor={item.gradientTo ?? item.color}
                  stopOpacity={fillOpacityBottom}
                />
              </linearGradient>

              {hasGradientStops && (
                <linearGradient id={strokeId} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={item.color} />
                  <stop offset="100%" stopColor={item.gradientTo} />
                </linearGradient>
              )}
            </defs>

            <Area
              type={curveType}
              dataKey={item.key}
              name={item.label}
              stackId={
                variant === "stacked" ? (item.stackId ?? "stack") : undefined
              }
              stroke={hasGradientStops ? `url(#${strokeId})` : item.color}
              strokeWidth={defaultStrokeWidth}
              fill={`url(#${fillId})`}
              dot={
                variant === "line"
                  ? {
                      fill: item.color,
                      stroke: "hsl(var(--background))",
                      strokeWidth: 1.5,
                      r: 3,
                    }
                  : false
              }
              activeDot={{
                fill: item.gradientTo ?? item.color,
                stroke: "hsl(var(--background))",
                strokeWidth: 2,
                r: 5,
              }}
              className={cn("transition-opacity duration-200", className)}
            />
          </React.Fragment>
        );
      })}
    </>
  );
}

export interface AreaChartCanvasProps {
  className?: string;
  children?: React.ReactNode;
}

export function AreaChartCanvas({ className, children }: AreaChartCanvasProps) {
  const { data, series } = useAreaChartContext();

  const chartConfig = useMemo<ChartConfig>(() => {
    const config: ChartConfig = {};
    for (const item of series) {
      config[item.key] = {
        label: item.label,
        color: item.color,
      };
    }
    return config;
  }, [series]);

  return (
    <div
      className={cn(
        "h-60 w-full",
        className,
      )}
    >
      <ChartContainer config={chartConfig} className="h-full w-full">
        <RechartsAreaChart
          accessibilityLayer
          data={data}
          margin={{ top: 10, right: 12, left: 0, bottom: 0 }}
        >
          {children ?? (
            <>
              <AreaChartGrid />
              <AreaChartXAxis />
              <AreaChartYAxis />
              <Tooltip
                cursor={{
                  stroke: "currentColor",
                  strokeOpacity: 0.2,
                  strokeDasharray: "3 3",
                }}
                content={<AreaChartTooltip />}
              />
              <AreaChartSeries />
            </>
          )}
        </RechartsAreaChart>
      </ChartContainer>
    </div>
  );
}

// ============================================================================
// MAIN COMBINED COMPONENT
// ============================================================================

export function AreaChart({
  variant = "monotone",
  data,
  series,
  xAxisKey,
  className,
  children,
  ...props
}: AreaChartProps) {
  const rawId = useId();
  const gradientPrefix = useMemo(
    () => `ac-${rawId.replace(/:/g, "")}`,
    [rawId],
  );

  const preset = VARIANT_CONFIGS[variant];
  const resolvedData = data ?? preset.data;
  const resolvedSeries = series ?? preset.series;
  const resolvedXAxisKey = xAxisKey ?? preset.xAxisKey;

  return (
    <AreaChartContext.Provider
      value={{
        variant,
        xAxisKey: resolvedXAxisKey,
        series: resolvedSeries,
        data: resolvedData,
        gradientPrefix,
      }}
    >
      <div className={cn("w-full select-none", className)} {...props}>
        {children ?? <AreaChartCanvas />}
      </div>
    </AreaChartContext.Provider>
  );
}

export default AreaChart;
