"use client";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  BarChart3,
  Calendar,
  RotateCcw,
  TrendingUp,
} from "lucide-react";
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
    color: "#f97316",
  },
  profit: {
    label: "Profit",
    color: "#10b981",
  },
} satisfies ChartConfig;

const data = [
  { name: "Week 1", revenue: 4000, profit: 2400 },
  { name: "Week 2", revenue: 3000, profit: 1398 },
  { name: "Week 3", revenue: 5000, profit: 3800 },
  { name: "Week 4", revenue: 2780, profit: 1908 },
  { name: "Week 5", revenue: 6890, profit: 4800 },
  { name: "Week 6", revenue: 5390, profit: 3800 },
  { name: "Week 7", revenue: 7490, profit: 5300 },
  { name: "Week 8", revenue: 6200, profit: 4100 },
];

type MetricFilter = "all" | "revenue" | "profit";
type SortFilter = "default" | "highest" | "lowest";
type MetricKey = "revenue" | "profit";

type WeeklyDataItem = (typeof data)[number];

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
  revenue: "#f97316",
  profit: "#10b981",
};

const metricLabels: Record<MetricKey, string> = {
  revenue: "Revenue",
  profit: "Profit",
};

function formatCurrency(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

function formatCompactCurrency(value: number) {
  return `$${(value / 1000).toFixed(1)}K`;
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
                {formatCurrency(entry.value ?? 0)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getMetricValue(item: WeeklyDataItem, metric: MetricFilter) {
  if (metric === "all") return item.revenue + item.profit;
  return item[metric];
}

export default function MultiLayerAreaChart() {
  const [metric, setMetric] = useState<MetricFilter>("all");
  const [sort, setSort] = useState<SortFilter>("default");

  const visibleMetrics = useMemo<MetricKey[]>(
    () => (metric === "all" ? ["revenue", "profit"] : [metric]),
    [metric],
  );

  const filteredData = useMemo(() => {
    const result = [...data];

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

  const totalProfit = filteredData.reduce((sum, item) => sum + item.profit, 0);

  const avgMargin = totalRevenue ? (totalProfit / totalRevenue) * 100 : 0;

  const peakRevenue = filteredData.reduce(
    (best, item) =>
      item.revenue > best.value
        ? { name: item.name, value: item.revenue }
        : best,
    { name: "—", value: 0 },
  );

  const peakProfit = filteredData.reduce(
    (best, item) =>
      item.profit > best.value ? { name: item.name, value: item.profit } : best,
    { name: "—", value: 0 },
  );

  const averageWeeklyProfit = filteredData.length
    ? totalProfit / filteredData.length
    : 0;

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
              <h1 className="text-2xl font-semibold">Revenue vs Profit</h1>
              <p className="mt-1 text-sm text-foreground/50 md:text-base">
                Multi-series area chart with overlapping fills across 8 weeks
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
                </SelectContent>
              </Select>

              <Select
                value={sort}
                onValueChange={(value) => setSort(value as SortFilter)}
              >
                <SelectTrigger className="h-11! w-full rounded-lg border-foreground/10! bg-foreground/5! px-3 py-2">
                  <SelectValue placeholder="Sort weeks" />
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
                Showing {filteredData.length} of {data.length} weeks
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
              <TrendingUp className="size-4 text-orange-500" />
              <span className="text-sm">Peak Revenue</span>
            </div>
            <div className="text-xl font-medium">{peakRevenue.name}</div>
            <div className="text-sm text-foreground/50">
              {formatCurrency(peakRevenue.value)}
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <TrendingUp className="size-4 text-green-500" />
              <span className="text-sm">Peak Profit</span>
            </div>
            <div className="text-xl font-medium">{peakProfit.name}</div>
            <div className="text-sm text-foreground/50">
              {formatCurrency(peakProfit.value)}
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Activity className="size-4 text-blue-500" />
              <span className="text-sm">Average Profit</span>
            </div>
            <div className="text-xl font-medium text-green-500">
              {formatCompactCurrency(averageWeeklyProfit)}
            </div>
            <div className="text-sm text-foreground/50">Per selected week</div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Calendar className="size-4 text-purple-500" />
              <span className="text-sm">Average Margin</span>
            </div>
            <div className="text-xl font-medium text-purple-500">
              {avgMargin.toFixed(1)}%
            </div>
            <div className="text-sm text-foreground/50">
              Profit versus revenue
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="h-100 w-full px-5 md:px-8">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart
              accessibilityLayer
              data={filteredData}
              margin={{ left: -10, right: 0, top: 10, bottom: 10 }}
            >
              <defs>
                <linearGradient
                  id="multiRevenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.55} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.03} />
                </linearGradient>
                <linearGradient
                  id="multiProfitGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.55} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.03} />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: number) => `$${value / 1000}K`}
              />
              <Tooltip
                cursor={{ stroke: "currentColor", strokeOpacity: 0.15 }}
                content={<CustomTooltip />}
              />

              {visibleMetrics.includes("revenue") && (
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#f97316"
                  strokeWidth={3}
                  fill="url(#multiRevenueGradient)"
                  animationDuration={1000}
                  dot={{ fill: "#f97316", strokeWidth: 0, r: 3.5 }}
                  activeDot={{
                    fill: "#f97316",
                    stroke: "hsl(var(--background))",
                    strokeWidth: 2,
                    r: 6,
                  }}
                />
              )}
              {visibleMetrics.includes("profit") && (
                <Area
                  type="monotone"
                  dataKey="profit"
                  name="Profit"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#multiProfitGradient)"
                  animationDuration={1000}
                  animationBegin={200}
                  dot={{ fill: "#10b981", strokeWidth: 0, r: 3.5 }}
                  activeDot={{
                    fill: "#10b981",
                    stroke: "hsl(var(--background))",
                    strokeWidth: 2,
                    r: 6,
                  }}
                />
              )}
            </AreaChart>
          </ChartContainer>
        </div>

        {/* Weekly Summary */}
        <div className="grid grid-cols-1 gap-3 border-t p-5 sm:grid-cols-2 md:grid-cols-4 md:p-8">
          {filteredData.map((week) => (
            <div
              key={week.name}
              className="rounded-xl border bg-foreground/5 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold">{week.name}</span>
                <BarChart3 className="size-4 text-foreground/40" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/50">Revenue</span>
                  <span className="font-medium text-orange-600">
                    {formatCurrency(week.revenue)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/50">Profit</span>
                  <span className="font-medium text-green-600">
                    {formatCurrency(week.profit)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/50">Margin</span>
                  <span className="font-medium text-blue-600">
                    {((week.profit / week.revenue) * 100).toFixed(1)}%
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
            {(["revenue", "profit"] as MetricKey[]).map((key) => (
              <div key={key} className="flex items-center gap-1.5">
                <div
                  className="size-2 rounded-full"
                  style={{ backgroundColor: metricColors[key] }}
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
