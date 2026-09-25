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
import { Activity, Calendar, RotateCcw, TrendingUp } from "lucide-react";
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
    label: "Revenue",
    color: "#f97316",
  },
} satisfies ChartConfig;

const data = [
  { name: "Jan", value: 4000, fullMonth: "January", quarter: "Q1" },
  { name: "Feb", value: 3000, fullMonth: "February", quarter: "Q1" },
  { name: "Mar", value: 5000, fullMonth: "March", quarter: "Q1" },
  { name: "Apr", value: 4500, fullMonth: "April", quarter: "Q2" },
  { name: "May", value: 6000, fullMonth: "May", quarter: "Q2" },
  { name: "Jun", value: 5500, fullMonth: "June", quarter: "Q2" },
  { name: "Jul", value: 7000, fullMonth: "July", quarter: "Q3" },
  { name: "Aug", value: 6450, fullMonth: "August", quarter: "Q3" },
  { name: "Sep", value: 7000, fullMonth: "September", quarter: "Q3" },
  { name: "Oct", value: 4000, fullMonth: "October", quarter: "Q4" },
  { name: "Nov", value: 8000, fullMonth: "November", quarter: "Q4" },
  { name: "Dec", value: 6000, fullMonth: "December", quarter: "Q4" },
];

type QuarterFilter = "all" | "Q1" | "Q2" | "Q3" | "Q4";
type RangeFilter = "all" | "first-half" | "second-half";
type SortFilter = "default" | "highest" | "lowest";

interface TooltipPayloadItem {
  dataKey?: string;
  value?: number;
  payload?: {
    name: string;
    value: number;
    fullMonth: string;
    quarter: string;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

function formatCurrency(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

function formatCompactCurrency(value: number) {
  return `$${(value / 1000).toFixed(1)}K`;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const item = payload[0]?.payload;

  if (!item) return null;

  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  const percentageOfTotal = ((item.value / total) * 100).toFixed(1);

  return (
    <div className="min-w-48 rounded-lg border border-border/60 bg-background p-3 shadow-lg">
      <p className="mb-3 border-b border-dashed border-foreground/15 pb-2 text-sm font-semibold md:text-base">
        {item.fullMonth}
      </p>

      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <span className="inline-block size-3.5 rounded bg-orange-500" />
          <span className="text-sm text-foreground/60">Revenue</span>
        </div>

        <span className="font-semibold text-orange-600">
          {formatCurrency(item.value)}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-foreground/50">
        <span>{item.quarter}</span>
        <span>{percentageOfTotal}% of total</span>
      </div>
    </div>
  );
}

export default function BasicAreaChart() {
  const [quarter, setQuarter] = useState<QuarterFilter>("all");
  const [range, setRange] = useState<RangeFilter>("all");
  const [sort, setSort] = useState<SortFilter>("default");

  const filteredData = useMemo(() => {
    let result = [...data];

    if (quarter !== "all") {
      result = result.filter((item) => item.quarter === quarter);
    }

    if (range === "first-half") {
      result = result.filter((_, index) => index < 6);
    }

    if (range === "second-half") {
      result = result.filter((_, index) => index >= 6);
    }

    if (sort === "highest") {
      result.sort((a, b) => b.value - a.value);
    }

    if (sort === "lowest") {
      result.sort((a, b) => a.value - b.value);
    }

    return result;
  }, [quarter, range, sort]);

  const total = filteredData.reduce((sum, item) => sum + item.value, 0);
  const average = filteredData.length ? total / filteredData.length : 0;

  const peak = filteredData.length
    ? Math.max(...filteredData.map((item) => item.value))
    : 0;

  const lowest = filteredData.length
    ? Math.min(...filteredData.map((item) => item.value))
    : 0;

  const peakMonth =
    filteredData.find((item) => item.value === peak)?.fullMonth ?? "—";

  const lowestMonth =
    filteredData.find((item) => item.value === lowest)?.fullMonth ?? "—";

  const firstValue = filteredData[0]?.value ?? 0;
  const lastValue = filteredData[filteredData.length - 1]?.value ?? 0;

  const growth =
    firstValue > 0 ? ((lastValue - firstValue) / firstValue) * 100 : 0;

  const q4Data = data.filter((item) => item.quarter === "Q4");
  const q4Average = q4Data.length
    ? q4Data.reduce((sum, item) => sum + item.value, 0) / q4Data.length
    : 0;

  const hasActiveFilters =
    quarter !== "all" || range !== "all" || sort !== "default";

  function resetFilters() {
    setQuarter("all");
    setRange("all");
    setSort("default");
  }

  return (
    <div className="p-5 w-full">
      <div className="flex flex-col border rounded-2xl overflow-hidden w-full">
        {/* Header */}
        <header className="flex flex-col gap-5 border-b bg-foreground/5 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Revenue Trend Analysis</h1>

              <p className="mt-1 text-sm text-foreground/50 md:text-base">
                Monthly revenue with area fill visualization across 2026
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border bg-foreground/5 px-3 py-2.5">
                <p className="text-xl font-bold">
                  {formatCompactCurrency(total)}
                </p>
                <p className="mt-0.5 text-xs text-foreground/50">
                  Filtered Revenue
                </p>
              </div>

              <div className="rounded-lg border bg-foreground/5 px-3 py-2.5">
                <p className="text-xl font-bold">
                  {formatCompactCurrency(average)}
                </p>
                <p className="mt-0.5 text-xs text-foreground/50">Average</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
            <Select
              value={quarter}
              onValueChange={(value) => setQuarter(value as QuarterFilter)}
            >
              <SelectTrigger className="h-11! w-full rounded-lg border-foreground/10! bg-foreground/5! px-3 py-2">
                <SelectValue placeholder="Select quarter" />
              </SelectTrigger>

              <SelectContent className="p-1">
                <SelectItem
                  value="all"
                  className="cursor-pointer hover:bg-foreground/10!"
                >
                  All quarters
                </SelectItem>
                <SelectItem
                  value="Q1"
                  className="cursor-pointer hover:bg-foreground/10!"
                >
                  Q1
                </SelectItem>
                <SelectItem
                  value="Q2"
                  className="cursor-pointer hover:bg-foreground/10!"
                >
                  Q2
                </SelectItem>
                <SelectItem
                  value="Q3"
                  className="cursor-pointer hover:bg-foreground/10!"
                >
                  Q3
                </SelectItem>
                <SelectItem
                  value="Q4"
                  className="cursor-pointer hover:bg-foreground/10!"
                >
                  Q4
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={range}
              onValueChange={(value) => setRange(value as RangeFilter)}
            >
              <SelectTrigger className="h-11! w-full rounded-lg border-foreground/10! bg-foreground/5! px-3 py-2">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>

              <SelectContent className="p-1">
                <SelectItem
                  value="all"
                  className="cursor-pointer hover:bg-foreground/10!"
                >
                  Full year
                </SelectItem>
                <SelectItem
                  value="first-half"
                  className="cursor-pointer hover:bg-foreground/10!"
                >
                  First half
                </SelectItem>
                <SelectItem
                  value="second-half"
                  className="cursor-pointer hover:bg-foreground/10!"
                >
                  Second half
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={sort}
              onValueChange={(value) => setSort(value as SortFilter)}
            >
              <SelectTrigger className="h-11! w-full rounded-lg border-foreground/10! bg-foreground/5! px-3 py-2">
                <SelectValue placeholder="Sort revenue" />
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

          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-xs text-foreground/50">
              <span>
                Showing {filteredData.length} of {data.length} months
              </span>

              {quarter !== "all" && (
                <Badge
                  variant="outline"
                  className="bg-foreground/5! px-3! py-3.5!"
                >
                  Quarter: {quarter}
                </Badge>
              )}

              {range !== "all" && (
                <Badge
                  variant="outline"
                  className="bg-foreground/5! px-3! py-3.5!"
                >
                  Range: {range === "first-half" ? "First half" : "Second half"}
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
              <span className="text-sm">Peak Month</span>
            </div>
            <div className="text-xl font-medium">{peakMonth}</div>
            <div className="text-sm text-foreground/50">
              {formatCurrency(peak)}
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Calendar className="size-4 text-red-500" />
              <span className="text-sm">Lowest Month</span>
            </div>
            <div className="text-xl font-medium">{lowestMonth}</div>
            <div className="text-sm text-foreground/50">
              {formatCurrency(lowest)}
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Activity className="size-4 text-green-500" />
              <span className="text-sm">Growth Rate</span>
            </div>
            <div
              className={`text-xl font-medium ${growth >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              {growth >= 0 ? "+" : ""}
              {growth.toFixed(1)}%
            </div>
            <div className="text-sm text-foreground/50">
              First to last result
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <TrendingUp className="size-4 text-orange-500" />
              <span className="text-sm">Q4 Average</span>
            </div>
            <div className="text-xl font-medium">
              {formatCompactCurrency(q4Average)}
            </div>
            <div className="text-sm text-foreground/50">
              October to December
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
                margin={{ left: -10, right: 0, top: 10, bottom: 10 }}
              >
                <defs>
                  <linearGradient
                    id="revenueAreaGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.55} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.03} />
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

                <Area
                  type="monotone"
                  dataKey="value"
                  name="Revenue"
                  stroke="#f97316"
                  strokeWidth={3}
                  fill="url(#revenueAreaGradient)"
                  animationDuration={1000}
                  animationEasing="ease-out"
                  dot={{ fill: "#f97316", strokeWidth: 0, r: 4 }}
                  activeDot={{
                    fill: "#f97316",
                    stroke: "hsl(var(--background))",
                    strokeWidth: 2,
                    r: 6,
                  }}
                />
              </AreaChart>
            </ChartContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-foreground/50">
              No revenue data found for the selected filters.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col items-start justify-between gap-5 border-t p-5 sm:flex-row sm:items-center md:p-8">
          <div className="text-sm">
            <span className="text-foreground/50">Filtered revenue: </span>
            <span className="font-bold">{formatCompactCurrency(total)}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-orange-500" />
            <span className="text-sm">Revenue trend</span>
          </div>
        </div>
      </div>
    </div>
  );
}
