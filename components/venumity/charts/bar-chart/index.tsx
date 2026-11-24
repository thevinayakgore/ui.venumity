"use client";
import { cn } from "@/lib/utils";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import React, { createContext, useContext, useId, useMemo } from "react";
import {
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ComposedChart,
  CartesianGrid,
  BarChart as RechartsBarChart,
} from "recharts";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type BarChartVariant =
  | "single"
  | "grouped"
  | "horizontal"
  | "mixed"
  | "stacked";

export type BarChartDatum = Record<string, string | number>;

export interface BarChartSeriesConfig {
  key: string;
  label: string;
  color?: string;
  className?: string;
  gradientTo?: string;
  stackId?: string;
  type?: "bar" | "line";
  yAxisId?: "left" | "right";
  radius?: number | [number, number, number, number];
}

export interface BarChartTooltipEntry {
  dataKey?: string | number;
  name?: string;
  value?: number | string;
  color?: string;
  payload?: BarChartDatum;
}

export interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BarChartVariant;
  data?: BarChartDatum[];
  series?: BarChartSeriesConfig[];
  xAxisKey?: string;
}

export interface BarChartGridProps {
  className?: string;
  horizontal?: boolean;
  vertical?: boolean;
  strokeDasharray?: string;
}

export interface BarChartXAxisProps {
  className?: string;
  dataKey?: string;
  type?: "number" | "category";
  tickLine?: boolean;
  axisLine?: boolean;
  tickMargin?: number;
  tickFormatter?: (value: number | string) => string;
}

export interface BarChartYAxisProps {
  className?: string;
  dataKey?: string;
  type?: "number" | "category";
  yAxisId?: string | number;
  orientation?: "left" | "right";
  tickLine?: boolean;
  axisLine?: boolean;
  tickMargin?: number;
  width?: number;
  tickFormatter?: (value: number | string) => string;
}

export interface BarChartSeriesProps {
  className?: string;
  radius?: number | [number, number, number, number];
  barSize?: number;
  showValueLabel?: boolean;
}

export interface BarChartTooltipProps {
  className?: string;
  active?: boolean;
  payload?: BarChartTooltipEntry[];
  label?: string;
}

export interface BarChartCanvasProps {
  className?: string;
  children?: React.ReactNode;
}

interface BarChartContextValue {
  variant: BarChartVariant;
  xAxisKey: string;
  series: BarChartSeriesConfig[];
  data: BarChartDatum[];
  gradientPrefix: string;
}

const BarChartContext = createContext<BarChartContextValue | null>(null);

export function useBarChartContext() {
  const context = useContext(BarChartContext);
  if (!context) {
    throw new Error(
      "BarChart sub-components must be used within a BarChart provider",
    );
  }
  return context;
}

// ============================================================================
// VARIANT PRESETS (single | grouped | horizontal | mixed | stacked)
// ============================================================================

const VARIANT_CONFIGS: Record<
  BarChartVariant,
  {
    xAxisKey: string;
    series: BarChartSeriesConfig[];
    data: BarChartDatum[];
  }
> = {
  single: {
    xAxisKey: "month",
    series: [
      {
        key: "value",
        label: "Revenue",
        color: "#f43f5e",
        gradientTo: "#fb7185",
        type: "bar",
      },
    ],
    data: [
      { month: "Jan", value: 4000 },
      { month: "Feb", value: 3000 },
      { month: "Mar", value: 5000 },
      { month: "Apr", value: 4500 },
      { month: "May", value: 6000 },
      { month: "Jun", value: 5500 },
      { month: "Jul", value: 7000 },
      { month: "Aug", value: 6450 },
      { month: "Sep", value: 7000 },
      { month: "Oct", value: 4000 },
      { month: "Nov", value: 8000 },
      { month: "Dec", value: 6000 },
    ],
  },
  grouped: {
    xAxisKey: "name",
    series: [
      {
        key: "sales",
        label: "Sales",
        color: "#3b82f6",
        gradientTo: "#60a5fa",
        type: "bar",
      },
      {
        key: "expenses",
        label: "Expenses",
        color: "#a855f7",
        gradientTo: "#c084fc",
        type: "bar",
      },
      {
        key: "profit",
        label: "Profit",
        color: "#22c55e",
        gradientTo: "#4ade80",
        type: "bar",
      },
    ],
    data: [
      { name: "Q1", sales: 40006, expenses: 20800, profit: 12600 },
      { name: "Q2", sales: 30004, expenses: 13498, profit: 16802 },
      { name: "Q3", sales: 50040, expenses: 98030, profit: -48900 },
      { name: "Q4", sales: 45300, expenses: 39028, profit: 59962 },
    ],
  },
  horizontal: {
    xAxisKey: "name",
    series: [
      {
        key: "value",
        label: "Budget",
        color: "#3b82f6",
        gradientTo: "#60a5fa",
        type: "bar",
      },
    ],
    data: [
      { name: "Marketing", value: 8500 },
      { name: "Sales", value: 7200 },
      { name: "Development", value: 9300 },
      { name: "Support", value: 4300 },
      { name: "HR", value: 2900 },
      { name: "Finance", value: 5100 },
      { name: "Operations", value: 6200 },
    ],
  },
  mixed: {
    xAxisKey: "name",
    series: [
      {
        key: "revenue",
        label: "Revenue",
        color: "#3b82f6",
        gradientTo: "#60a5fa",
        type: "bar",
        yAxisId: "left",
      },
      {
        key: "profit",
        label: "Profit",
        color: "#22c55e",
        gradientTo: "#4ade80",
        type: "bar",
        yAxisId: "left",
      },
      {
        key: "margin",
        label: "Margin",
        color: "#a855f7",
        type: "line",
        yAxisId: "right",
      },
    ],
    data: [
      { name: "Jan", revenue: 4000, profit: 2400, margin: 60 },
      { name: "Feb", revenue: 3000, profit: 1398, margin: 46.6 },
      { name: "Mar", revenue: 5000, profit: 9800, margin: 196 },
      { name: "Apr", revenue: 4500, profit: 3908, margin: 86.8 },
      { name: "May", revenue: 6000, profit: 4800, margin: 80 },
      { name: "Jun", revenue: 5500, profit: 3800, margin: 69.1 },
    ],
  },
  stacked: {
    xAxisKey: "name",
    series: [
      {
        key: "productA",
        label: "Product A",
        color: "#f97316",
        gradientTo: "#fb923c",
        stackId: "products",
        type: "bar",
      },
      {
        key: "productB",
        label: "Product B",
        color: "#3b82f6",
        gradientTo: "#60a5fa",
        stackId: "products",
        type: "bar",
      },
      {
        key: "productC",
        label: "Product C",
        color: "#22c55e",
        gradientTo: "#4ade80",
        stackId: "products",
        type: "bar",
      },
    ],
    data: [
      { name: "Jan", productA: 4000, productB: 2400, productC: 3200 },
      { name: "Feb", productA: 3000, productB: 1398, productC: 2800 },
      { name: "Mar", productA: 5000, productB: 9800, productC: 2000 },
      { name: "Apr", productA: 4500, productB: 3908, productC: 2500 },
      { name: "May", productA: 6000, productB: 4800, productC: 3500 },
      { name: "Jun", productA: 5500, productB: 3800, productC: 3000 },
    ],
  },
};

function toNumericValue(raw: string | number | undefined): number {
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : 0;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCompactAxisValue(value: number | string): string {
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num)) return String(value);
  if (Math.abs(num) >= 1000) {
    return `${num < 0 ? "-" : ""}${(Math.abs(num) / 1000).toFixed(
      Math.abs(num) % 1000 === 0 ? 0 : 1,
    )}K`;
  }
  return `${num}`;
}

// ============================================================================
// EXPORTED CUSTOMIZABLE SUB-PARTS
// ============================================================================

export function BarChartGrid({
  className,
  horizontal = true,
  vertical = false,
  strokeDasharray,
}: BarChartGridProps) {
  const { variant } = useBarChartContext();
  const isHorizontalBar = variant === "horizontal";

  return (
    <CartesianGrid
      horizontal={isHorizontalBar ? false : horizontal}
      vertical={isHorizontalBar ? true : vertical}
      strokeDasharray={strokeDasharray}
      className={cn(
        "[&_.recharts-cartesian-grid-line_line]:stroke-foreground/10",
        className,
      )}
    />
  );
}

export function BarChartXAxis({
  className,
  dataKey,
  type,
  tickLine = false,
  axisLine = false,
  tickMargin = 8,
  tickFormatter,
}: BarChartXAxisProps) {
  const { variant, xAxisKey } = useBarChartContext();
  const isHorizontalBar = variant === "horizontal";

  return (
    <XAxis
      type={type ?? (isHorizontalBar ? "number" : "category")}
      dataKey={dataKey ?? (isHorizontalBar ? undefined : xAxisKey)}
      tickLine={tickLine}
      axisLine={axisLine}
      tickMargin={tickMargin}
      tickFormatter={
        tickFormatter ?? (isHorizontalBar ? formatCompactAxisValue : undefined)
      }
      className={cn(
        "[&_.recharts-cartesian-axis-tick-value]:fill-foreground/60 [&_.recharts-cartesian-axis-tick-value]:text-xs [&_.recharts-cartesian-axis-tick-value]:font-medium [&_.recharts-cartesian-axis-tick-value]:tabular-nums",
        className,
      )}
    />
  );
}

export function BarChartYAxis({
  className,
  dataKey,
  type,
  yAxisId,
  orientation,
  tickLine = false,
  axisLine = false,
  tickMargin = 8,
  width,
  tickFormatter,
}: BarChartYAxisProps) {
  const { variant, xAxisKey } = useBarChartContext();
  const isHorizontalBar = variant === "horizontal";
  const resolvedOrientation = orientation ?? "left";
  const isRightAxis = resolvedOrientation === "right";

  const defaultFormatter = (value: number | string) => {
    if (isRightAxis) return `${value}%`;
    return formatCompactAxisValue(value);
  };

  return (
    <YAxis
      yAxisId={yAxisId}
      orientation={resolvedOrientation}
      type={type ?? (isHorizontalBar ? "category" : "number")}
      dataKey={dataKey ?? (isHorizontalBar ? xAxisKey : undefined)}
      width={width ?? (isHorizontalBar ? 96 : 48)}
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

export function BarChartTooltip({
  className,
  active,
  payload,
  label,
}: BarChartTooltipProps) {
  const { series, data, xAxisKey } = useBarChartContext();

  if (!active || !payload?.length) return null;

  const firstPayloadItem = payload[0]?.payload;
  const resolvedLabel =
    label !== undefined
      ? label
      : firstPayloadItem?.[xAxisKey] !== undefined
        ? String(firstPayloadItem[xAxisKey])
        : undefined;

  const total = payload.reduce(
    (sum, entry) => sum + toNumericValue(entry.value),
    0,
  );

  return (
    <div
      className={cn(
        "min-w-48 rounded-xl border border-foreground/15 bg-background/95 p-3 text-xs shadow-xl backdrop-blur-md supports-backdrop-filter:bg-background/80",
        className,
      )}
    >
      {resolvedLabel !== undefined && (
        <p className="mb-2 border-b border-dashed border-foreground/15 pb-1.5 font-semibold tracking-tight text-foreground">
          {resolvedLabel}
        </p>
      )}
      <div className="space-y-1.5">
        {payload.map((entry, index) => {
          const key = String(entry.dataKey ?? "");
          const config = series.find((s) => s.key === key);
          const color = config?.color ?? entry.color ?? "#71717a";
          const displayLabel = config?.label ?? entry.name ?? key;
          const numericVal = toNumericValue(entry.value);
          const isPercentMetric = key === "margin";
          const isNegative = numericVal < 0;

          return (
            <div
              key={`${key}-${index}`}
              className="flex items-center justify-between gap-4"
            >
              <span className="flex items-center gap-2 text-foreground/70">
                <span
                  className="size-2.5 shrink-0 rounded-xs ring-1 ring-foreground/10"
                  style={{ backgroundColor: color }}
                />
                <span className="truncate">{displayLabel}</span>
              </span>
              <span
                className={cn(
                  "font-mono font-semibold tabular-nums",
                  isNegative ? "text-red-500" : "text-foreground",
                )}
              >
                {isPercentMetric
                  ? `${numericVal.toFixed(1)}%`
                  : `${isNegative ? "-" : ""}${Math.abs(numericVal).toLocaleString("en-US")}`}
              </span>
            </div>
          );
        })}
      </div>
      {payload.length > 1 && data.length > 0 && (
        <div className="mt-2.5 flex items-center justify-between border-t border-foreground/10 pt-2 font-mono font-bold tabular-nums text-foreground">
          <span>Total</span>
          <span>{total.toLocaleString("en-US")}</span>
        </div>
      )}
    </div>
  );
}

export function BarChartSeries({
  className,
  radius,
  barSize,
  showValueLabel,
}: BarChartSeriesProps) {
  const { variant, series, gradientPrefix } = useBarChartContext();
  const isHorizontalBar = variant === "horizontal";
  const isStacked = variant === "stacked";
  const isMixed = variant === "mixed";

  const barItems = series.filter((s) => (s.type ?? "bar") === "bar");
  const lineItems = series.filter((s) => s.type === "line");

  const resolvedBarSize = barSize ?? (isHorizontalBar ? 32 : undefined);
  const resolvedShowLabel = showValueLabel ?? isHorizontalBar;

  const resolveRadius = (
    index: number,
    totalBars: number,
  ): number | [number, number, number, number] => {
    if (radius !== undefined) return radius;
    if (isHorizontalBar) return [0, 8, 8, 0];
    if (!isStacked) return [6, 6, 0, 0];
    if (totalBars === 1) return [8, 8, 8, 8];
    if (index === totalBars - 1) return [8, 8, 0, 0];
    return 0;
  };

  return (
    <>
      <defs>
        {series.map((item) => {
          const fillId = `${gradientPrefix}-bar-fill-${item.key}`;
          const hasGradient = Boolean(item.gradientTo);

          return (
            <linearGradient
              key={fillId}
              id={fillId}
              x1={isHorizontalBar ? "0" : "0"}
              y1={isHorizontalBar ? "0" : "1"}
              x2={isHorizontalBar ? "1" : "0"}
              y2={isHorizontalBar ? "0" : "0"}
            >
              <stop offset="0%" stopColor={item.color} />
              <stop
                offset="100%"
                stopColor={hasGradient ? item.gradientTo : item.color}
              />
            </linearGradient>
          );
        })}
      </defs>

      {barItems.map((item, idx) => {
        const fillId = `${gradientPrefix}-bar-fill-${item.key}`;
        const yAxisIdProp = isMixed ? (item.yAxisId ?? "left") : undefined;

        return (
          <Bar
            key={item.key}
            yAxisId={yAxisIdProp}
            dataKey={item.key}
            name={item.label}
            stackId={
              isStacked || isMixed ? (item.stackId ?? "stack") : undefined
            }
            fill={`url(#${fillId})`}
            radius={item.radius ?? resolveRadius(idx, barItems.length)}
            barSize={resolvedBarSize}
            label={
              resolvedShowLabel
                ? {
                    position: isHorizontalBar ? "right" : "top",
                    formatter: (val: unknown) =>
                      formatCompactAxisValue(String(val ?? "")),
                    fontSize: 12,
                  }
                : undefined
            }
            className={cn(
              "transition-opacity duration-200",
              item.className,
              className,
            )}
          />
        );
      })}

      {lineItems.map((item) => (
        <Line
          key={item.key}
          yAxisId={isMixed ? (item.yAxisId ?? "right") : undefined}
          type="monotone"
          dataKey={item.key}
          name={item.label}
          stroke={item.color}
          strokeWidth={2.5}
          dot={{
            r: 3.5,
            fill: item.color,
            stroke: "hsl(var(--background))",
            strokeWidth: 2,
          }}
          activeDot={{
            r: 5.5,
            fill: item.color,
            stroke: "hsl(var(--background))",
            strokeWidth: 2,
          }}
          className={cn("transition-opacity duration-200", className)}
        />
      ))}
    </>
  );
}

export function BarChartCanvas({ className, children }: BarChartCanvasProps) {
  const { variant, data, series } = useBarChartContext();
  const isHorizontalBar = variant === "horizontal";
  const isMixed = variant === "mixed";

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

  const defaultContent = (
    <>
      <BarChartGrid />
      <BarChartXAxis />
      {isMixed ? (
        <>
          <BarChartYAxis yAxisId="left" orientation="left" />
          <BarChartYAxis yAxisId="right" orientation="right" />
        </>
      ) : (
        <BarChartYAxis />
      )}
      <Tooltip
        cursor={{
          fill: "currentColor",
          opacity: 0.06,
        }}
        content={<BarChartTooltip />}
      />
      <BarChartSeries />
    </>
  );

  return (
    <div className={cn("h-60 w-full", className)}>
      <ChartContainer config={chartConfig} className="h-full w-full">
        {isMixed ? (
          <ComposedChart
            accessibilityLayer
            data={data}
            margin={{ top: 10, right: 12, left: 0, bottom: 0 }}
          >
            {children ?? defaultContent}
          </ComposedChart>
        ) : (
          <RechartsBarChart
            accessibilityLayer
            data={data}
            layout={isHorizontalBar ? "vertical" : "horizontal"}
            margin={{
              top: 10,
              right: isHorizontalBar ? 36 : 12,
              left: 0,
              bottom: 0,
            }}
          >
            {children ?? defaultContent}
          </RechartsBarChart>
        )}
      </ChartContainer>
    </div>
  );
}

// ============================================================================
// MAIN COMBINED COMPONENT
// ============================================================================

export function BarChart({
  variant = "single",
  data,
  series,
  xAxisKey,
  className,
  children,
  ...props
}: BarChartProps) {
  const rawId = useId();
  const gradientPrefix = useMemo(
    () => `bc-${rawId.replace(/:/g, "")}`,
    [rawId],
  );

  const preset = VARIANT_CONFIGS[variant];
  const resolvedData = data ?? preset.data;
  const resolvedSeries = series ?? preset.series;
  const resolvedXAxisKey = xAxisKey ?? preset.xAxisKey;

  return (
    <BarChartContext.Provider
      value={{
        variant,
        xAxisKey: resolvedXAxisKey,
        series: resolvedSeries,
        data: resolvedData,
        gradientPrefix,
      }}
    >
      <div className={cn("w-full select-none", className)} {...props}>
        {children ?? <BarChartCanvas />}
      </div>
    </BarChartContext.Provider>
  );
}

export default BarChart;
