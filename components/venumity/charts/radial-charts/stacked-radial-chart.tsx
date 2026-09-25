"use client";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, RotateCcw } from "lucide-react";
import { PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const baseChartData = [
  { month: "January", desktop: 1260, mobile: 570, tablet: 340 },
  { month: "February", desktop: 1150, mobile: 620, tablet: 380 },
  { month: "March", desktop: 1380, mobile: 590, tablet: 420 },
  { month: "April", desktop: 1420, mobile: 650, tablet: 390 },
  { month: "May", desktop: 1550, mobile: 710, tablet: 450 },
  { month: "June", desktop: 1680, mobile: 730, tablet: 480 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(24 100% 55%)",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(220 90% 56%)",
  },
  tablet: {
    label: "Tablet",
    color: "hsl(142 76% 36%)",
  },
} satisfies ChartConfig;

type DeviceKey = "desktop" | "mobile" | "tablet";
type SortFilter = "default" | "highest" | "lowest";
type ViewFilter = "all" | "first-half" | "second-half";

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

function formatPercentage(value: number, total: number) {
  return total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";
}

export default function ChartRadialStacked() {
  const [view, setView] = useState<ViewFilter>("all");
  const [sort, setSort] = useState<SortFilter>("default");

  const monthlyTotals = baseChartData.map((row) => ({
    ...row,
    total: row.desktop + row.mobile + row.tablet,
  }));

  const filteredData = useMemo(() => {
    let result = [...monthlyTotals];

    if (view === "first-half") {
      result = result.filter((_, index) => index < 3);
    }

    if (view === "second-half") {
      result = result.filter((_, index) => index >= 3);
    }

    if (sort === "highest") {
      result.sort((a, b) => b.total - a.total);
    }

    if (sort === "lowest") {
      result.sort((a, b) => a.total - b.total);
    }

    return result;
  }, [view, sort, monthlyTotals]);

  const totalVisitors = filteredData.reduce((acc, m) => acc + m.total, 0);
  const averagePerMonth = filteredData.length
    ? Math.round(totalVisitors / filteredData.length)
    : 0;

  const currentMonth = filteredData[filteredData.length - 1];
  const previousMonth = filteredData[filteredData.length - 2];

  const growthRate =
    previousMonth && previousMonth.total > 0
      ? (
          ((currentMonth.total - previousMonth.total) / previousMonth.total) *
          100
        ).toFixed(1)
      : "0.0";

  const hasActiveFilters = view !== "all" || sort !== "default";

  function resetFilters() {
    setView("all");
    setSort("default");
  }

  const deviceTotals: Record<DeviceKey, number> = {
    desktop: filteredData.reduce((acc, m) => acc + m.desktop, 0),
    mobile: filteredData.reduce((acc, m) => acc + m.mobile, 0),
    tablet: filteredData.reduce((acc, m) => acc + m.tablet, 0),
  };

  return (
    <div className="w-full p-5">
      <div className="flex w-full flex-col overflow-hidden rounded-2xl border">
        {/* Header */}
        <header className="flex flex-col gap-5 border-b bg-foreground/5 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="w-full">
              <h1 className="text-2xl font-semibold">
                Device Traffic (Stacked)
              </h1>
              <p className="mt-1 text-sm text-foreground/50 md:text-base">
                Stacked radial chart · January - June 2024
              </p>
            </div>

            {/* Filters */}
            <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3">
              <Select
                value={view}
                onValueChange={(value) => setView(value as ViewFilter)}
              >
                <SelectTrigger className="h-11! w-full rounded-lg border-foreground/10! bg-foreground/5! px-3 py-2">
                  <SelectValue placeholder="Filter months" />
                </SelectTrigger>

                <SelectContent className="p-1">
                  <SelectItem
                    value="all"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    All months
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
                Showing {filteredData.length} of {monthlyTotals.length} months
              </span>

              {view !== "all" && (
                <Badge
                  variant="outline"
                  className="bg-foreground/5! px-3! py-3.5!"
                >
                  View: {view === "first-half" ? "First half" : "Second half"}
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

        {/* Chart + Stats */}
        <div className="flex flex-col gap-5 p-5 w-full">
          {/* Chart */}
            <ChartContainer config={chartConfig} className="w-full h-full">
              <RadialBarChart
                data={filteredData}
                startAngle={90}
                endAngle={-270}
                innerRadius={100}
                outerRadius={300}
                barSize={80}
              >
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      hideLabel
                      formatter={(value, name, item) => {
                        const payload = item?.payload as
                          | {
                              month: string;
                              desktop: number;
                              mobile: number;
                              tablet: number;
                              total: number;
                            }
                          | undefined;

                        const month = payload?.month ?? "";
                        const device = name as DeviceKey;
                        const deviceValue = payload?.[device] ?? 0;

                        return (
                          <div className="min-w-40">
                            <div className="mb-1 text-xs text-muted-foreground">
                              {month}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">
                                {chartConfig[device].label}
                              </span>
                              <span className="text-sm font-bold">
                                {formatNumber(deviceValue)}
                              </span>
                            </div>
                          </div>
                        );
                      }}
                    />
                  }
                />

                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x="50%"
                      className="fill-foreground text-3xl md:text-5xl font-bold"
                    >
                      {formatNumber(averagePerMonth)}
                    </tspan>
                    <tspan
                      x="50%"
                      dy="40"
                      className="fill-muted-foreground text-sm md:text-base"
                    >
                      Avg Monthly
                    </tspan>
                  </text>
                </PolarRadiusAxis>

                <RadialBar
                  dataKey="desktop"
                  stackId="a"
                  cornerRadius={6}
                  fill="var(--color-desktop)"
                  animationDuration={1400}
                  animationEasing="ease-out"
                />
                <RadialBar
                  dataKey="mobile"
                  stackId="a"
                  cornerRadius={6}
                  fill="var(--color-mobile)"
                  animationDuration={1400}
                  animationEasing="ease-out"
                />
                <RadialBar
                  dataKey="tablet"
                  stackId="a"
                  cornerRadius={6}
                  fill="var(--color-tablet)"
                  animationDuration={1400}
                  animationEasing="ease-out"
                />
              </RadialBarChart>
            </ChartContainer>

          {/* Stats Panel */}
          <div className="flex flex-col gap-4">
            {/* Device totals */}
            <div className="grid grid-cols-3 gap-3">
              {(Object.keys(chartConfig) as DeviceKey[]).map((key) => {
                const config = chartConfig[key];
                const value = deviceTotals[key];
                const percentage = formatPercentage(value, totalVisitors);

                return (
                  <div
                    key={key}
                    className="rounded-xl border bg-foreground/5 p-4"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className="size-3 rounded-full"
                        style={{ backgroundColor: config.color }}
                      />
                      <span className="text-xs font-medium">
                        {config.label}
                      </span>
                    </div>
                    <div
                      className="text-lg font-bold"
                      style={{ color: config.color }}
                    >
                      {formatNumber(value)}
                    </div>
                    <div className="text-xs text-foreground/50">
                      {percentage}% of total
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Monthly breakdown */}
            <div className="flex-1 overflow-auto rounded-xl border bg-foreground/5 p-4">
              <h4 className="mb-3 text-sm font-semibold">Monthly Breakdown</h4>

              <div className="grid grid-cols-1 gap-3">
                {filteredData.map((month) => (
                  <div
                    key={month.month}
                    className="rounded-lg border bg-card p-3"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">{month.month}</span>
                      <span className="text-xs font-bold">
                        Total: {formatNumber(month.total)}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1">
                          <span
                            className="size-1.5 rounded-full"
                            style={{
                              backgroundColor: chartConfig.desktop.color,
                            }}
                          />
                          Desktop
                        </span>
                        <span className="font-medium">
                          {formatNumber(month.desktop)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1">
                          <span
                            className="size-1.5 rounded-full"
                            style={{
                              backgroundColor: chartConfig.mobile.color,
                            }}
                          />
                          Mobile
                        </span>
                        <span className="font-medium">
                          {formatNumber(month.mobile)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1">
                          <span
                            className="size-1.5 rounded-full"
                            style={{
                              backgroundColor: chartConfig.tablet.color,
                            }}
                          />
                          Tablet
                        </span>
                        <span className="font-medium">
                          {formatNumber(month.tablet)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-start justify-between gap-5 border-t p-5 sm:flex-row sm:items-center md:p-8">
          <div className="space-y-1">
            <div className="text-sm">
              <span className="text-foreground/50">Total visitors: </span>
              <span className="font-bold">{formatNumber(totalVisitors)}</span>
            </div>
            <p className="text-xs text-foreground/50">
              Across all devices · Last {filteredData.length} months
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-emerald-600 font-medium">+{growthRate}%</span>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            <span className="text-foreground/50">vs previous month</span>
          </div>
        </div>
      </div>
    </div>
  );
}
