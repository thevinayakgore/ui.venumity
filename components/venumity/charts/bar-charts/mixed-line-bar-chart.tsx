"use client";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Activity,
  BarChart3,
  Calendar,
  RotateCcw,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#3b82f6",
  },
  profit: {
    label: "Profit",
    color: "#22c55e",
  },
  margin: {
    label: "Margin",
    color: "#a855f7",
  },
} satisfies ChartConfig;

const mixedData = [
  { name: "Jan", revenue: 4000, profit: 2400, margin: 60 },
  { name: "Feb", revenue: 3000, profit: 1398, margin: 46.6 },
  { name: "Mar", revenue: 5000, profit: 9800, margin: 196 },
  { name: "Apr", revenue: 4500, profit: 3908, margin: 86.8 },
  { name: "May", revenue: 6000, profit: 4800, margin: 80 },
  { name: "Jun", revenue: 5500, profit: 3800, margin: 69.1 },
];

type MetricFilter = "all" | "revenue" | "profit" | "margin";
type SortFilter = "default" | "highest" | "lowest";
type MetricKey = "revenue" | "profit" | "margin";

type MixedDataItem = (typeof mixedData)[number];

interface TooltipPayloadItem {
  dataKey?: string;
  name?: string;
  value?: number;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

const metricColors: Record<MetricKey, string> = {
  revenue: "#3b82f6",
  profit: "#22c55e",
  margin: "#a855f7",
};

const metricLabels: Record<MetricKey, string> = {
  revenue: "Revenue",
  profit: "Profit",
  margin: "Margin",
};

function formatCurrency(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

function formatCompactCurrency(value: number) {
  return `$${(value / 1000).toFixed(1)}K`;
}

function formatMetricValue(key: string, value: number) {
  if (key === "margin") {
    return `${value.toFixed(1)}%`;
  }

  return formatCurrency(value);
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="min-w-52 rounded-lg border border-border/60 bg-background p-3 shadow-lg">
      <p className="mb-3 border-b border-dashed border-foreground/15 pb-2 text-sm font-semibold md:text-base">
        {label}
      </p>

      <div className="space-y-1.5">
        {payload.map((entry, index) => {
          const metricKey = (entry.dataKey ?? entry.name ?? "") as MetricKey;

          const color = metricColors[metricKey] ?? entry.color ?? "#94a3b8";

          const name = metricLabels[metricKey] ?? entry.name ?? "Metric";

          return (
            <div
              key={`${metricKey}-${index}`}
              className="flex items-center justify-between gap-5 text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="inline-block size-3.5 shrink-0 rounded"
                  style={{ backgroundColor: color }}
                />

                <span className="text-foreground/60">{name}</span>
              </div>

              <span className="font-semibold">
                {formatMetricValue(metricKey, entry.value ?? 0)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getMetricValue(item: MixedDataItem, metric: MetricFilter) {
  if (metric === "all") {
    return item.revenue + item.profit + item.margin;
  }

  return item[metric];
}

export default function MixedLineBarChart() {
  const [metric, setMetric] = useState<MetricFilter>("all");

  const [sort, setSort] = useState<SortFilter>("default");

  const visibleMetrics = useMemo<MetricKey[]>(
    () => (metric === "all" ? ["revenue", "profit", "margin"] : [metric]),
    [metric],
  );

  const filteredData = useMemo(() => {
    const result = [...mixedData];

    if (sort === "highest") {
      result.sort(
        (a, b) => getMetricValue(b, metric) - getMetricValue(a, metric),
      );
    }

    if (sort === "lowest") {
      result.sort(
        (a, b) => getMetricValue(a, metric) - getMetricValue(b, metric),
      );
    }

    return result;
  }, [metric, sort]);

  const totalRevenue = filteredData.reduce(
    (sum, item) => sum + item.revenue,
    0,
  );

  const averageMargin = filteredData.length
    ? filteredData.reduce((sum, item) => sum + item.margin, 0) /
      filteredData.length
    : 0;

  const peakRevenue = filteredData.reduce(
    (best, item) =>
      item.revenue > best.value
        ? {
            name: item.name,
            value: item.revenue,
          }
        : best,
    {
      name: "—",
      value: 0,
    },
  );

  const lowestRevenue = filteredData.reduce(
    (lowest, item) =>
      item.revenue < lowest.value
        ? {
            name: item.name,
            value: item.revenue,
          }
        : lowest,
    filteredData[0]
      ? {
          name: filteredData[0].name,
          value: filteredData[0].revenue,
        }
      : {
          name: "—",
          value: 0,
        },
  );

  const firstRevenue = filteredData[0]?.revenue ?? 0;
  const lastRevenue = filteredData[filteredData.length - 1]?.revenue ?? 0;

  const revenueGrowth =
    firstRevenue > 0 ? ((lastRevenue - firstRevenue) / firstRevenue) * 100 : 0;

  const hasActiveFilters = metric !== "all" || sort !== "default";

  function resetFilters() {
    setMetric("all");
    setSort("default");
  }

  return (
    <div className="p-5 w-full">
      <div className="flex flex-col border rounded-2xl overflow-hidden w-full">
        {/* Header */}
        <header className="flex flex-col gap-5 border-b bg-foreground/5 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="w-full">
              <h1 className="text-2xl font-semibold">
                Revenue &amp; Profit Analysis
              </h1>
              <p className="mt-1 text-sm text-foreground/50 md:text-base">
                Combined view with profit margin trend across 2026
              </p>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
              <Select
                value={metric}
                onValueChange={(value) => setMetric(value as MetricFilter)}
              >
                <SelectTrigger className="h-11! w-full rounded-lg border-foreground/10! bg-foreground/5! px-3 py-2">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>

                <SelectContent className="p-1">
                  <SelectItem
                    value="all"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    All metrics
                  </SelectItem>

                  <SelectItem
                    value="revenue"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Revenue focus
                  </SelectItem>

                  <SelectItem
                    value="profit"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Profit focus
                  </SelectItem>

                  <SelectItem
                    value="margin"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Margin focus
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={sort}
                onValueChange={(value) => setSort(value as SortFilter)}
              >
                <SelectTrigger className="h-11! w-full rounded-lg border-foreground/10! bg-foreground/5! px-3 py-2">
                  <SelectValue placeholder="Sort months" />
                </SelectTrigger>

                <SelectContent className="p-1">
                  <SelectItem
                    value="default"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Default order
                  </SelectItem>

                  <SelectItem
                    value="highest"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Highest first
                  </SelectItem>

                  <SelectItem
                    value="lowest"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Lowest first
                  </SelectItem>
                </SelectContent>
              </Select>

              <Button
                type="button"
                variant="outline"
                onClick={resetFilters}
                disabled={!hasActiveFilters}
                className="h-11! rounded-lg"
              >
                <RotateCcw />
                Reset
              </Button>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-sm text-foreground/50">
              <span>
                Showing {filteredData.length} of {mixedData.length} months
              </span>

              {metric !== "all" && (
                <Badge
                  variant="outline"
                  className="bg-foreground/5! px-3! py-3.5!"
                >
                  Metric: {metricLabels[metric]}
                </Badge>
              )}

              {sort !== "default" && (
                <Badge
                  variant="outline"
                  className="bg-foreground/5! px-3! py-3.5!"
                >
                  Sort: {sort === "highest" ? "Highest first" : "Lowest first"}
                </Badge>
              )}
            </div>
          )}
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-3 p-5 md:grid-cols-4 md:p-8">
          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <TrendingUp className="size-4 text-blue-500" />
              <span className="text-sm">Peak Revenue</span>
            </div>

            <div className="text-xl font-medium">{peakRevenue.name}</div>

            <div className="text-sm text-foreground/50">
              {formatCurrency(peakRevenue.value)}
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Calendar className="size-4 text-red-500" />
              <span className="text-sm">Lowest Revenue</span>
            </div>

            <div className="text-xl font-medium">{lowestRevenue.name}</div>

            <div className="text-sm text-foreground/50">
              {formatCurrency(lowestRevenue.value)}
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Activity className="size-4 text-purple-500" />
              <span className="text-sm">Average Margin</span>
            </div>

            <div className="text-xl font-medium text-purple-500">
              {averageMargin.toFixed(1)}%
            </div>

            <div className="text-sm text-foreground/50">
              Across selected months
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              {revenueGrowth >= 0 ? (
                <TrendingUp className="size-4 text-green-500" />
              ) : (
                <TrendingDown className="size-4 text-red-500" />
              )}

              <span className="text-sm">Revenue Growth</span>
            </div>

            <div
              className={`text-xl font-medium ${
                revenueGrowth >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {revenueGrowth >= 0 ? "+" : ""}
              {revenueGrowth.toFixed(1)}%
            </div>

            <div className="text-sm text-foreground/50">
              First to last result
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="h-100 w-full px-5 md:px-8">
          {filteredData.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ComposedChart
                accessibilityLayer
                data={filteredData}
                margin={{
                  left: -10,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="mixedRevenueGradient"
                    x1="0"
                    y1="1"
                    x2="0"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#60a5fa" />
                  </linearGradient>

                  <linearGradient
                    id="mixedProfitGradient"
                    x1="0"
                    y1="1"
                    x2="0"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#4ade80" />
                  </linearGradient>
                </defs>

                <CartesianGrid vertical={false} />

                <XAxis dataKey="name" tickLine={false} axisLine={false} />

                <YAxis
                  yAxisId="left"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value: number) => `$${value / 1000}K`}
                />

                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value: number) => `${value}%`}
                />

                <Tooltip
                  cursor={{
                    stroke: "currentColor",
                    strokeOpacity: 0.15,
                  }}
                  content={<CustomTooltip />}
                />

                {visibleMetrics.includes("revenue") && (
                  <Bar
                    yAxisId="left"
                    dataKey="revenue"
                    name="Revenue"
                    fill="url(#mixedRevenueGradient)"
                    radius={[8, 8, 8, 8]}
                    animationDuration={1000}
                  />
                )}

                {visibleMetrics.includes("profit") && (
                  <Bar
                    yAxisId="left"
                    dataKey="profit"
                    name="Profit"
                    fill="url(#mixedProfitGradient)"
                    radius={[8, 8, 8, 8]}
                    animationDuration={1000}
                  />
                )}

                {visibleMetrics.includes("margin") && (
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="margin"
                    name="Margin"
                    stroke="#a855f7"
                    strokeWidth={3}
                    dot={{
                      r: 3.5,
                      fill: "#a855f7",
                      stroke: "hsl(var(--background))",
                      strokeWidth: 2,
                    }}
                    activeDot={{
                      r: 6,
                      fill: "#a855f7",
                      stroke: "hsl(var(--background))",
                      strokeWidth: 2,
                    }}
                    animationDuration={1000}
                  />
                )}
              </ComposedChart>
            </ChartContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-foreground/50">
              No data found for the selected filters.
            </div>
          )}
        </div>

        {/* Monthly Summary */}
        <div className="grid grid-cols-1 gap-3 border-t p-5 sm:grid-cols-2 md:grid-cols-3 md:p-8">
          {filteredData.map((month) => (
            <div
              key={month.name}
              className="rounded-xl border bg-foreground/5 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold">{month.name}</span>

                <BarChart3 className="size-4 text-foreground/40" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/50">Revenue</span>

                  <span className="font-medium text-blue-600">
                    {formatCurrency(month.revenue)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-foreground/50">Profit</span>

                  <span className="font-medium text-green-600">
                    {formatCurrency(month.profit)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-foreground/50">Margin</span>

                  <span className="font-medium text-purple-600">
                    {month.margin.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-col items-start justify-between gap-5 border-t p-5 sm:flex-row sm:items-center md:p-8">
          <div className="text-sm">
            <span className="text-foreground/50">Filtered revenue: </span>

            <span className="font-bold">
              {formatCompactCurrency(totalRevenue)}
            </span>
          </div>

          <div className="flex flex-wrap gap-4">
            {(["revenue", "profit", "margin"] as MetricKey[]).map((key) => (
              <div key={key} className="flex items-center gap-1.5">
                <div
                  className="size-2 rounded-full"
                  style={{
                    backgroundColor: metricColors[key],
                  }}
                />

                <span className="text-sm">{metricLabels[key]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
