"use client";

import React, { createContext, useContext, useId, useMemo } from "react";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart as RechartsLineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type LineChartVariant =
  | "natural"
  | "linear"
  | "step"
  | "multiple"
  | "dots"
  | "label";

export type LineCurveType = "natural" | "linear" | "monotone" | "step";

export type LineChartDatum = Record<string, string | number>;

export interface LineChartDotRenderProps {
  cx?: number;
  cy?: number;
  payload?: LineChartDatum;
  index?: number;
}

export interface LineChartSeriesConfig {
  key: string;
  label: string;
  color?: string;
  gradientTo?: string;
  curveType?: LineCurveType;
  strokeWidth?: number;
  strokeDasharray?: string;
  className?: string;
  showDots?: boolean;
  dotRadius?: number;
  dotStroke?: string;
  dotStrokeWidth?: number;
  activeDotRadius?: number;
  activeDotStroke?: string;
  activeDotStrokeWidth?: number;
  colorByDataKey?: string;
  renderDot?: (props: LineChartDotRenderProps) => React.ReactNode;
  showLabels?: boolean;
  labelDataKey?: string;
  labelPosition?: "top" | "bottom" | "left" | "right";
  labelOffset?: number;
  labelClassName?: string;
  labelFontSize?: number;
  labelFormatter?: (value: unknown) => string;
}

export interface LineChartTooltipEntry {
  dataKey?: string | number;
  name?: string;
  value?: number | string;
  color?: string;
  payload?: LineChartDatum;
}

export interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: LineChartVariant;
  data: LineChartDatum[];
  series: LineChartSeriesConfig[];
  xAxisKey?: string;
}

export interface LineChartGridProps {
  className?: string;
  horizontal?: boolean;
  vertical?: boolean;
  strokeDasharray?: string;
}

export interface LineChartXAxisProps {
  className?: string;
  dataKey?: string;
  hide?: boolean;
  tickLine?: boolean;
  axisLine?: boolean;
  tickMargin?: number;
  tickFormatter?: (value: string) => string;
}

export interface LineChartYAxisProps {
  className?: string;
  hide?: boolean;
  tickLine?: boolean;
  axisLine?: boolean;
  tickMargin?: number;
  width?: number;
  tickFormatter?: (value: number) => string;
}

export interface LineChartSeriesProps {
  className?: string;
  curveType?: LineCurveType;
  strokeWidth?: number;
  showDots?: boolean;
  dotRadius?: number;
  showLabels?: boolean;
  labelPosition?: "top" | "bottom" | "left" | "right";
  labelOffset?: number;
  labelClassName?: string;
}

export interface LineChartTooltipProps {
  className?: string;
  active?: boolean;
  payload?: LineChartTooltipEntry[];
  label?: string;
  hideLabel?: boolean;
  labelFormatter?: (label: string) => string;
}

export interface LineChartCanvasProps {
  className?: string;
  children?: React.ReactNode;
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}

interface LineChartContextValue {
  variant: LineChartVariant;
  xAxisKey: string;
  series: LineChartSeriesConfig[];
  data: LineChartDatum[];
  uniquePrefix: string;
}

const LineChartContext = createContext<LineChartContextValue | null>(null);

export function useLineChartContext() {
  const context = useContext(LineChartContext);
  if (!context) {
    throw new Error(
      "LineChart sub-components must be used within a LineChart provider",
    );
  }
  return context;
}

function toNumericValue(raw: string | number | undefined): number {
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : 0;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

function resolveDefaultCurveType(variant: LineChartVariant): LineCurveType {
  switch (variant) {
    case "linear":
      return "linear";
    case "step":
      return "step";
    case "multiple":
      return "monotone";
    default:
      return "natural";
  }
}

// ============================================================================
// EXPORTED CUSTOMIZABLE SUB-PARTS
// ============================================================================

export function LineChartGrid({
  className,
  horizontal = true,
  vertical = true,
  strokeDasharray = "3 3",
}: LineChartGridProps) {
  return (
    <CartesianGrid
      horizontal={horizontal}
      vertical={vertical}
      strokeDasharray={strokeDasharray}
      className={cn("stroke-foreground/15!", className)}
    />
  );
}

export function LineChartXAxis({
  className,
  dataKey,
  hide = false,
  tickLine = false,
  axisLine = false,
  tickMargin = 8,
  tickFormatter,
}: LineChartXAxisProps) {
  const { xAxisKey } = useLineChartContext();

  if (hide) return null;

  return (
    <XAxis
      dataKey={dataKey ?? xAxisKey}
      tickLine={tickLine}
      axisLine={axisLine}
      tickMargin={tickMargin}
      tickFormatter={tickFormatter ?? ((value: string) => value.slice(0, 3))}
      className={cn(
        "text-[10px] sm:text-xs [&_.recharts-cartesian-axis-tick-value]:fill-foreground/60 [&_.recharts-cartesian-axis-tick-value]:font-medium",
        className,
      )}
    />
  );
}

export function LineChartYAxis({
  className,
  hide = true,
  tickLine = false,
  axisLine = false,
  tickMargin = 8,
  width = 48,
  tickFormatter,
}: LineChartYAxisProps) {
  if (hide) return null;

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
        "text-[10px] sm:text-xs [&_.recharts-cartesian-axis-tick-value]:fill-foreground/60 [&_.recharts-cartesian-axis-tick-value]:font-mono [&_.recharts-cartesian-axis-tick-value]:tabular-nums",
        className,
      )}
    />
  );
}

export function LineChartTooltip({
  className,
  active,
  payload,
  label,
  hideLabel = false,
  labelFormatter,
}: LineChartTooltipProps) {
  const { series, xAxisKey } = useLineChartContext();

  if (!active || !payload?.length) return null;

  const firstPayload = payload[0]?.payload;
  const rawLabel =
    label !== undefined
      ? String(label)
      : firstPayload?.[xAxisKey] !== undefined
        ? String(firstPayload[xAxisKey])
        : undefined;

  const formattedLabel =
    rawLabel !== undefined && labelFormatter
      ? labelFormatter(rawLabel)
      : rawLabel;

  return (
    <div
      className={cn(
        "min-w-44 p-3 bg-background/70 backdrop-blur-xs text-xs border border-foreground/15 shadow-xl rounded-xl",
        className,
      )}
    >
      {!hideLabel && formattedLabel !== undefined && (
        <p className="mb-2 border-b border-dashed border-foreground/15 pb-1.5 font-semibold tracking-tight text-foreground">
          {formattedLabel}
        </p>
      )}
      <div className="space-y-1.5">
        {payload.map((entry, index) => {
          const key = String(entry.dataKey ?? "");
          const config = series.find((s) => s.key === key);
          const colorKey = config?.colorByDataKey;
          const datumColor =
            colorKey && typeof firstPayload?.[colorKey] === "string"
              ? String(firstPayload[colorKey])
              : undefined;
          const color =
            datumColor ??
            config?.gradientTo ??
            config?.color ??
            entry.color ??
            "#3b82f6";
          const displayLabel = config?.label ?? entry.name ?? key;
          const numericValue = toNumericValue(entry.value);

          return (
            <div
              key={`${key}-${index}`}
              className="flex items-center justify-between gap-4"
            >
              <span className="flex items-center gap-2 text-foreground/75">
                <span
                  className="size-2.5 shrink-0 rounded-full ring-1 ring-foreground/10"
                  style={{ backgroundColor: color }}
                />
                <span className="truncate">{displayLabel}</span>
              </span>
              <span className="font-mono font-semibold tabular-nums text-foreground">
                {numericValue.toLocaleString("en-US")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function LineChartSeries({
  className,
  curveType,
  strokeWidth,
  showDots,
  dotRadius,
  showLabels,
  labelPosition,
  labelOffset,
  labelClassName,
}: LineChartSeriesProps) {
  const { variant, series, uniquePrefix } = useLineChartContext();

  const resolvedDefaultCurve = curveType ?? resolveDefaultCurveType(variant);
  const resolvedDefaultStrokeWidth = strokeWidth ?? 2.5;
  const resolvedDefaultShowDots = showDots ?? variant === "dots";
  const resolvedShowLabels = showLabels ?? variant === "label";

  const hasAnyGradient = series.some((s) => Boolean(s.gradientTo));

  return (
    <>
      {hasAnyGradient && (
        <defs>
          {series.map((item) => {
            if (!item.gradientTo) return null;
            const strokeGradId = `${uniquePrefix}-stroke-${item.key}`;
            return (
              <linearGradient
                key={strokeGradId}
                id={strokeGradId}
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor={item.color} />
                <stop offset="100%" stopColor={item.gradientTo} />
              </linearGradient>
            );
          })}
        </defs>
      )}

      {series.map((item) => {
        const type = item.curveType ?? resolvedDefaultCurve;
        const width = item.strokeWidth ?? resolvedDefaultStrokeWidth;
        const hasDots = item.showDots ?? resolvedDefaultShowDots;
        const r = item.dotRadius ?? dotRadius ?? 3.5;
        const activeR = item.activeDotRadius ?? 6;
        const strokeGradId = `${uniquePrefix}-stroke-${item.key}`;
        const resolvedStroke = item.gradientTo
          ? `url(#${strokeGradId})`
          : item.color;

        const hasCustomDot = Boolean(item.renderDot || item.colorByDataKey);

        const renderCustomDot = (dotProps: unknown) => {
          const p = (dotProps ?? {}) as LineChartDotRenderProps;
          if (p.cx == null || p.cy == null) return null;

          const reactKey = `${uniquePrefix}-${item.key}-${String(p.payload?.[item.labelDataKey ?? ""] ?? p.index ?? "")}`;

          if (item.renderDot) {
            return (
              <React.Fragment key={reactKey}>
                {item.renderDot({ ...p, payload: p.payload })}
              </React.Fragment>
            );
          }

          if (item.colorByDataKey && p.payload) {
            const pointColor =
              String(p.payload[item.colorByDataKey] ?? "") || item.color;
            return (
              <circle
                key={reactKey}
                cx={p.cx}
                cy={p.cy}
                r={item.dotRadius ?? dotRadius ?? 6}
                fill={pointColor}
                stroke={item.dotStroke ?? "#ffffff"}
                strokeWidth={item.dotStrokeWidth ?? 2}
              />
            );
          }

          return (
            <circle
              key={reactKey}
              cx={p.cx}
              cy={p.cy}
              r={r}
              fill={item.color}
              stroke={item.dotStroke}
              strokeWidth={item.dotStrokeWidth}
            />
          );
        };

        const shouldRenderLabel = item.showLabels ?? resolvedShowLabels;
        const resolvedLabelPosition =
          item.labelPosition ?? labelPosition ?? "top";
        const resolvedLabelOffset = item.labelOffset ?? labelOffset ?? 12;

        return (
          <Line
            key={item.key}
            dataKey={item.key}
            name={item.label}
            type={type}
            stroke={resolvedStroke}
            strokeWidth={width}
            strokeDasharray={item.strokeDasharray}
            dot={
              hasCustomDot
                ? renderCustomDot
                : hasDots
                  ? {
                      fill: item.color,
                      r,
                      stroke: item.dotStroke,
                      strokeWidth: item.dotStrokeWidth,
                    }
                  : false
            }
            activeDot={
              hasCustomDot
                ? renderCustomDot
                : {
                    r: activeR,
                    fill: item.gradientTo ?? item.color,
                    stroke: item.activeDotStroke ?? "hsl(var(--background))",
                    strokeWidth: item.activeDotStrokeWidth ?? 2,
                  }
            }
            className={cn(
              "transition-opacity duration-200",
              item.className,
              className,
            )}
          >
            {shouldRenderLabel && (
              <LabelList
                dataKey={item.labelDataKey ?? item.key}
                position={resolvedLabelPosition}
                offset={resolvedLabelOffset}
                fontSize={item.labelFontSize ?? 11}
                formatter={
                  item.labelFormatter
                    ? (val: unknown) => item.labelFormatter!(val)
                    : (val: unknown) => String(val ?? "")
                }
                className={cn(
                  "fill-foreground font-semibold",
                  item.labelClassName,
                  labelClassName,
                )}
              />
            )}
          </Line>
        );
      })}
    </>
  );
}

export function LineChartCanvas({
  className,
  children,
  margin,
}: LineChartCanvasProps) {
  const { data, series, variant } = useLineChartContext();

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

  const resolvedMargin =
    margin ??
    (variant === "label"
      ? { top: 40, left: 20, right: 20, bottom: 20 }
      : { top: 20, right: 12, left: 12, bottom: 20 });

  return (
    <div className={cn("h-56 sm:h-64 md:h-72 lg:h-80 w-full", className)}>
      <ChartContainer config={chartConfig} className="h-full w-full">
        <RechartsLineChart
          accessibilityLayer
          data={data}
          margin={resolvedMargin}
        >
          {children ?? (
            <>
              <LineChartGrid />
              <LineChartXAxis />
              <LineChartYAxis />
              <Tooltip
                cursor={false}
                content={<LineChartTooltip hideLabel />}
              />
              <LineChartSeries />
            </>
          )}
        </RechartsLineChart>
      </ChartContainer>
    </div>
  );
}

// ============================================================================
// MAIN COMBINED COMPONENT
// ============================================================================

export function LineChart({
  variant = "natural",
  data,
  series,
  xAxisKey = "month",
  className,
  children,
  ...props
}: LineChartProps) {
  const rawId = useId();
  const uniquePrefix = useMemo(() => `lc-${rawId.replace(/:/g, "")}`, [rawId]);

  return (
    <LineChartContext.Provider
      value={{
        variant,
        xAxisKey,
        series,
        data,
        uniquePrefix,
      }}
    >
      <div className={cn("w-full select-none", className)} {...props}>
        {children ?? <LineChartCanvas />}
      </div>
    </LineChartContext.Provider>
  );
}

export default LineChart;
