"use client";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { Activity, Calendar, RotateCcw, TrendingUp } from "lucide-react";
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
    color: "var(--color-rose-500)",
  },
} satisfies ChartConfig;

const data = [
  { month: "Jan", value: 4000, fullMonth: "January", quarter: "Q1" },
  { month: "Feb", value: 3000, fullMonth: "February", quarter: "Q1" },
  { month: "Mar", value: 5000, fullMonth: "March", quarter: "Q1" },
  { month: "Apr", value: 4500, fullMonth: "April", quarter: "Q2" },
  { month: "May", value: 6000, fullMonth: "May", quarter: "Q2" },
  { month: "Jun", value: 5500, fullMonth: "June", quarter: "Q2" },
  { month: "Jul", value: 7000, fullMonth: "July", quarter: "Q3" },
  { month: "Aug", value: 6450, fullMonth: "August", quarter: "Q3" },
  { month: "Sep", value: 7000, fullMonth: "September", quarter: "Q3" },
  { month: "Oct", value: 4000, fullMonth: "October", quarter: "Q4" },
  { month: "Nov", value: 8000, fullMonth: "November", quarter: "Q4" },
  { month: "Dec", value: 6000, fullMonth: "December", quarter: "Q4" },
];

type RangeFilter = "all" | "first-half" | "second-half";
type SortFilter = "default" | "highest" | "lowest";

interface TooltipPayloadItem {
  payload?: {
    month: string;
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

  const peak = Math.max(...data.map((entry) => entry.value));
  const percentageOfPeak = Math.round((item.value / peak) * 100);

  return (
    <div className="min-w-44 rounded-lg border border-border/60 bg-background p-3 shadow-lg">
      <p className="mb-1 text-sm font-medium">{item.fullMonth}</p>

      <p className="text-lg font-bold text-rose-500">
        {formatCurrency(item.value)}
      </p>

      <div className="mt-2 flex items-center justify-between gap-4 text-xs text-foreground/50">
        <span>{item.quarter}</span>
        <span>{percentageOfPeak}% of peak</span>
      </div>
    </div>
  );
}

export default function BasicBarChart() {
  const [quarter, setQuarter] = useState("all");
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

  const total = filteredData.reduce(
    (totalValue, item) => totalValue + item.value,
    0,
  );

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

  const bestQuarter = data.reduce(
    (best, _, index) => {
      if (index % 3 !== 0) return best;

      const quarterData = data.slice(index, index + 3);
      const value = quarterData.reduce((sum, item) => sum + item.value, 0);

      return value > best.value
        ? {
            name: `Q${index / 3 + 1}`,
            value,
          }
        : best;
    },
    {
      name: "—",
      value: 0,
    },
  );

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
        <header className="flex flex-col gap-5 border-b p-5 bg-foreground/5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold">
                Monthly Revenue Analysis
              </h1>

              <p className="mt-1 text-sm text-foreground/50 md:text-base">
                Track and compare revenue trends across 2026
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
            <Select value={quarter} onValueChange={setQuarter}>
              <SelectTrigger className="py-2 px-3 bg-foreground/5! border-foreground/10! rounded-lg h-11! w-full">
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
              <SelectTrigger className="py-2 px-3 bg-foreground/5! border-foreground/10! rounded-lg h-11! w-full">
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
              <SelectTrigger className="py-2 px-3 bg-foreground/5! border-foreground/10! rounded-lg h-11! w-full">
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
              className="rounded-lg h-11!"
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
                  Quarter : {quarter}
                </Badge>
              )}
              {range !== "all" && (
                <Badge
                  variant="outline"
                  className="bg-foreground/5! px-3! py-3.5!"
                >
                  Range :{" "}
                  {range === "first-half" ? "First half" : "Second half"}
                </Badge>
              )}
              {sort !== "default" && (
                <Badge
                  variant="outline"
                  className="bg-foreground/5! px-3! py-3.5!"
                >
                  Sort : {sort === "highest" ? "Highest first" : "Lowest first"}
                </Badge>
              )}
            </div>
          )}
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-3 p-5 md:grid-cols-4 md:p-8">
          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <TrendingUp className="size-4" />
              <span className="text-xs">Peak Month</span>
            </div>
            <div className="text-xl font-medium">{peakMonth}</div>
            <div className="text-xs text-foreground/50">
              {formatCurrency(peak)}
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Calendar className="size-4" />
              <span className="text-xs">Lowest Month</span>
            </div>
            <div className="text-xl font-medium">{lowestMonth}</div>
            <div className="text-xs text-foreground/50">
              {formatCurrency(lowest)}
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Activity className="size-4" />
              <span className="text-xs">Growth Rate</span>
            </div>
            <div
              className={`text-xl font-medium ${
                growth >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {growth >= 0 ? "+" : ""}
              {growth.toFixed(1)}%
            </div>
            <div className="text-xs text-foreground/50">
              First to last result
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <TrendingUp className="size-4" />
              <span className="text-xs">Best Quarter</span>
            </div>
            <div className="text-xl font-medium">{bestQuarter.name}</div>
            <div className="text-xs text-foreground/50">
              {formatCurrency(bestQuarter.value)}
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="h-100 w-full px-5 md:px-8">
          {filteredData.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart
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
                    id="revenueBarGradient"
                    x1="0"
                    y1="1"
                    x2="0"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="var(--color-rose-500)" />
                    <stop offset="100%" stopColor="var(--color-rose-400)" />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value: number) => `$${value / 1000}K`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="value"
                  fill="url(#revenueBarGradient)"
                  radius={[8, 8, 8, 8]}
                  animationDuration={1000}
                />
              </BarChart>
            </ChartContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-foreground/50">
              No revenue data found for the selected filters.
            </div>
          )}
        </div>

        {/* Filtered Month Summary */}
        <div className="grid grid-cols-4 gap-3 border-t p-5 sm:grid-cols-6 md:grid-cols-12 md:p-8">
          {filteredData.map((item) => (
            <div key={item.month} className="text-center">
              <div className="mb-1 text-xs font-medium">{item.month}</div>

              <div className="relative h-10 overflow-hidden rounded-sm bg-muted">
                <div
                  className="absolute bottom-0 w-full bg-linear-to-t from-rose-500 to-rose-400 transition-all duration-500"
                  style={{
                    height: `${peak ? (item.value / peak) * 100 : 0}%`,
                    opacity: 0.8,
                  }}
                />
              </div>

              <div className="mt-1 text-xs text-foreground/50">
                {formatCompactCurrency(item.value)}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Summary */}
        <div className="flex flex-col items-start justify-between gap-5 border-t p-5 sm:flex-row sm:items-center md:p-8">
          <div className="text-sm">
            <span className="text-foreground/50">Filtered total: </span>
            <span className="font-bold">{formatCompactCurrency(total)}</span>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-rose-500" />
              <span className="text-xs">Current year</span>
            </div>

            <div className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-muted-foreground/30" />
              <span className="text-xs">Previous year</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
