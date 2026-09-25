"use client";

import { useMemo, useState } from "react";
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
  Calendar,
  Palette,
  RotateCcw,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  value: {
    label: "Activity",
    color: "#a855f7",
  },
} satisfies ChartConfig;

const data = [
  { name: "Mon", value: 2400, fullDay: "Monday" },
  { name: "Tue", value: 1398, fullDay: "Tuesday" },
  { name: "Wed", value: 9800, fullDay: "Wednesday" },
  { name: "Thu", value: 3908, fullDay: "Thursday" },
  { name: "Fri", value: 4800, fullDay: "Friday" },
  { name: "Sat", value: 3800, fullDay: "Saturday" },
  { name: "Sun", value: 4300, fullDay: "Sunday" },
];

type RangeFilter = "all" | "weekdays" | "weekend";
type SortFilter = "default" | "highest" | "lowest";

interface TooltipPayloadItem {
  value?: number;
  payload?: {
    name: string;
    value: number;
    fullDay: string;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

function formatCompactNumber(value: number) {
  return `${(value / 1000).toFixed(1)}K`;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const item = payload[0]?.payload;

  if (!item) return null;

  const peak = Math.max(...data.map((entry) => entry.value));
  const percentageOfPeak = Math.round((item.value / peak) * 100);

  return (
    <div className="min-w-48 rounded-lg border border-border/60 bg-background p-3 shadow-lg">
      <p className="mb-3 border-b border-dashed border-foreground/15 pb-2 text-sm font-semibold md:text-base">
        {item.fullDay}
      </p>

      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <span className="inline-block size-3.5 rounded bg-purple-500" />
          <span className="text-sm text-foreground/60">Activity</span>
        </div>

        <span className="font-semibold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {formatNumber(item.value)}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-foreground/50">
        <span>{item.name}</span>
        <span>{percentageOfPeak}% of peak</span>
      </div>
    </div>
  );
}

export default function GradientAreaChart() {
  const [range, setRange] = useState<RangeFilter>("all");
  const [sort, setSort] = useState<SortFilter>("default");

  const filteredData = useMemo(() => {
    let result = [...data];

    if (range === "weekdays") {
      result = result.filter((_, index) => index < 5);
    }

    if (range === "weekend") {
      result = result.filter((_, index) => index >= 5);
    }

    if (sort === "highest") {
      result.sort((a, b) => b.value - a.value);
    }

    if (sort === "lowest") {
      result.sort((a, b) => a.value - b.value);
    }

    return result;
  }, [range, sort]);

  const total = filteredData.reduce((sum, item) => sum + item.value, 0);
  const average = filteredData.length ? total / filteredData.length : 0;

  const peak = filteredData.length
    ? Math.max(...filteredData.map((item) => item.value))
    : 0;

  const lowest = filteredData.length
    ? Math.min(...filteredData.map((item) => item.value))
    : 0;

  const peakDay =
    filteredData.find((item) => item.value === peak)?.fullDay ?? "—";

  const lowestDay =
    filteredData.find((item) => item.value === lowest)?.fullDay ?? "—";

  const firstValue = filteredData[0]?.value ?? 0;
  const lastValue = filteredData[filteredData.length - 1]?.value ?? 0;

  const change =
    firstValue > 0 ? ((lastValue - firstValue) / firstValue) * 100 : 0;

  const hasActiveFilters = range !== "all" || sort !== "default";

  function resetFilters() {
    setRange("all");
    setSort("default");
  }

  return (
    <div className="p-5 w-full">
      <div className="flex flex-col border rounded-2xl overflow-hidden w-full">
        {/* Header */}
        <header className="flex flex-col gap-5 border-b bg-foreground/5 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="w-full">
              <h1 className="text-2xl font-semibold">Gradient Area Chart</h1>
              <p className="mt-1 text-sm text-foreground/50 md:text-base">
                Multi-color gradient fill with smooth transitions
              </p>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
              <Select
                value={range}
                onValueChange={(value) => setRange(value as RangeFilter)}
              >
                <SelectTrigger className="h-11! w-full rounded-lg border-foreground/10! bg-foreground/5! px-3 py-2">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent className="p-1">
                  <SelectItem
                    value="all"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Full week
                  </SelectItem>
                  <SelectItem
                    value="weekdays"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Weekdays
                  </SelectItem>
                  <SelectItem
                    value="weekend"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Weekend
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={sort}
                onValueChange={(value) => setSort(value as SortFilter)}
              >
                <SelectTrigger className="h-11! w-full rounded-lg border-foreground/10! bg-foreground/5! px-3 py-2">
                  <SelectValue placeholder="Sort activity" />
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
                Showing {filteredData.length} of {data.length} days
              </span>
              {range !== "all" && (
                <Badge
                  variant="outline"
                  className="bg-foreground/5! px-3! py-3.5!"
                >
                  Range: {range === "weekdays" ? "Weekdays" : "Weekend"}
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
              <TrendingUp className="size-4 text-purple-500" />
              <span className="text-sm">Peak Day</span>
            </div>
            <div className="text-xl font-medium">{peakDay}</div>
            <div className="text-sm text-foreground/50">
              {formatNumber(peak)}
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Calendar className="size-4 text-pink-500" />
              <span className="text-sm">Lowest Day</span>
            </div>
            <div className="text-xl font-medium">{lowestDay}</div>
            <div className="text-sm text-foreground/50">
              {formatNumber(lowest)}
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Activity className="size-4 text-green-500" />
              <span className="text-sm">Average Activity</span>
            </div>
            <div className="text-xl font-medium">
              {formatNumber(Math.round(average))}
            </div>
            <div className="text-sm text-foreground/50">Per selected day</div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              {change >= 0 ? (
                <TrendingUp className="size-4 text-green-500" />
              ) : (
                <TrendingUp className="size-4 rotate-180 text-red-500" />
              )}
              <span className="text-sm">Trend Change</span>
            </div>
            <div
              className={`text-xl font-medium ${change >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              {change >= 0 ? "+" : ""}
              {change.toFixed(1)}%
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
              <AreaChart
                accessibilityLayer
                data={filteredData}
                margin={{ left: -10, right: 0, top: 0, bottom: 10 }}
              >
                <defs>
                  <linearGradient
                    id="gradientAreaFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#a855f7" stopOpacity={0.7} />
                    <stop offset="50%" stopColor="#ec4899" stopOpacity={0.4} />
                    <stop
                      offset="100%"
                      stopColor="#ec4899"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                  <linearGradient
                    id="gradientAreaStroke"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>

                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value: number) => `${value / 1000}K`}
                />
                <Tooltip
                  cursor={{ stroke: "currentColor", strokeOpacity: 0.15 }}
                  content={<CustomTooltip />}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  name="Activity"
                  stroke="url(#gradientAreaStroke)"
                  strokeWidth={3}
                  fill="url(#gradientAreaFill)"
                  animationDuration={1200}
                  animationEasing="ease-out"
                  dot={{ fill: "#a855f7", strokeWidth: 0, r: 4 }}
                  activeDot={{
                    fill: "#ec4899",
                    stroke: "hsl(var(--background))",
                    strokeWidth: 2,
                    r: 6,
                  }}
                />
              </AreaChart>
            </ChartContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-foreground/50">
              No activity data found for the selected filters.
            </div>
          )}
        </div>

        {/* Daily Summary */}
        <div className="grid grid-cols-2 gap-3 border-t p-5 sm:grid-cols-3 md:grid-cols-7 md:p-8">
          {filteredData.map((item) => (
            <div
              key={item.name}
              className="rounded-xl border bg-foreground/5 p-3"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold">{item.name}</span>
                <span className="size-2 rounded-full bg-linear-to-r from-purple-500 to-pink-500" />
              </div>
              <p className="text-lg font-medium bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {formatCompactNumber(item.value)}
              </p>
              <p className="mt-1 text-xs text-foreground/50">{item.fullDay}</p>
            </div>
          ))}
        </div>

        {/* Gradient Info */}
        <div className="grid grid-cols-1 gap-3 border-t p-5 md:grid-cols-3 md:p-8">
          <div className="rounded-xl border border-purple-500/40 bg-linear-to-r from-purple-500/15 to-purple-500/10 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Palette className="size-5 text-purple-600" />
              <h3 className="font-semibold text-purple-600">Purple Zone</h3>
            </div>
            <p className="text-sm text-foreground/50">
              Peak values with high activity and strong intensity.
            </p>
          </div>

          <div className="rounded-xl border border-pink-500/40 bg-linear-to-r from-pink-500/15 to-pink-500/10 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="size-5 text-pink-600" />
              <h3 className="font-semibold text-pink-600">Pink Zone</h3>
            </div>
            <p className="text-sm text-foreground/50">
              Mid-range values with a smooth color transition.
            </p>
          </div>

          <div className="rounded-xl border border-blue-500/40 bg-linear-to-r from-blue-500/15 to-blue-500/10 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Activity className="size-5 text-blue-600" />
              <h3 className="font-semibold text-blue-600">Baseline</h3>
            </div>
            <p className="text-sm text-foreground/50">
              The area fades toward the baseline for visual depth.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-start justify-between gap-5 border-t p-5 sm:flex-row sm:items-center md:p-8">
          <div className="text-sm">
            <span className="text-foreground/50">Filtered activity: </span>
            <span className="font-bold">{formatCompactNumber(total)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-linear-to-r from-purple-500 to-pink-500" />
            <span className="text-sm">Gradient activity trend</span>
          </div>
        </div>
      </div>
    </div>
  );
}
