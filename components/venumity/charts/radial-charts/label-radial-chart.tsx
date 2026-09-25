"use client";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadialBar, RadialBarChart } from "recharts";
import { BarChart3, ChartPie, RotateCcw, TrendingUp } from "lucide-react";
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
  { month: "Jan", name: "January", revenue: 186, fill: "var(--color-jan)" },
  { month: "Feb", name: "February", revenue: 305, fill: "var(--color-feb)" },
  { month: "Mar", name: "March", revenue: 237, fill: "var(--color-mar)" },
  { month: "Apr", name: "April", revenue: 273, fill: "var(--color-apr)" },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
  },
  jan: {
    label: "January",
    color: "hsl(24 100% 55%)",
  },
  feb: {
    label: "February",
    color: "hsl(220 90% 56%)",
  },
  mar: {
    label: "March",
    color: "hsl(142 76% 36%)",
  },
  apr: {
    label: "April",
    color: "hsl(45 93% 58%)",
  },
} satisfies ChartConfig;

type SortFilter = "default" | "highest" | "lowest";
type ViewFilter = "all" | "top-half" | "bottom-half";

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

function formatPercentage(value: number, total: number) {
  return total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";
}

function getMonthColor(monthKey: string) {
  const entry = chartConfig[monthKey as keyof typeof chartConfig];
  return "color" in entry ? entry.color : "hsl(var(--muted-foreground))";
}

export default function ChartRadialLabel() {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const [view, setView] = useState<ViewFilter>("all");
  const [sort, setSort] = useState<SortFilter>("default");

  const filteredData = useMemo(() => {
    let result = [...baseChartData];

    if (view === "top-half") {
      result = result.filter((_, index) => index < 2);
    }

    if (view === "bottom-half") {
      result = result.filter((_, index) => index >= 2);
    }

    if (sort === "highest") {
      result.sort((a, b) => b.revenue - a.revenue);
    }

    if (sort === "lowest") {
      result.sort((a, b) => a.revenue - b.revenue);
    }

    return result;
  }, [sort, view]);

  const totalRevenue = filteredData.reduce(
    (sum, item) => sum + item.revenue,
    0,
  );

  const bestMonth = filteredData.reduce(
    (max, item) => (item.revenue > max.revenue ? item : max),
    filteredData[0] ?? { month: "—", name: "—", revenue: 0, fill: "" },
  );

  const averageRevenue = filteredData.length
    ? totalRevenue / filteredData.length
    : 0;

  const hasActiveFilters = view !== "all" || sort !== "default";

  function resetFilters() {
    setView("all");
    setSort("default");
    setActiveIndex(undefined);
  }

  return (
    <div className="w-full p-5">
      <div className="flex w-full flex-col overflow-hidden rounded-2xl border">
        {/* Header */}
        <header className="flex flex-col gap-5 border-b bg-foreground/5 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="w-full">
              <h1 className="text-2xl font-semibold">Monthly Revenue</h1>
              <p className="mt-1 text-sm text-foreground/50 md:text-base">
                Radial chart with value labels and interactive bars
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
                    value="top-half"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Top half
                  </SelectItem>
                  <SelectItem
                    value="bottom-half"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Bottom half
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
                Showing {filteredData.length} of {baseChartData.length} months
              </span>

              {view !== "all" && (
                <Badge
                  variant="outline"
                  className="bg-foreground/5! px-3! py-3.5!"
                >
                  View: {view === "top-half" ? "Top half" : "Bottom half"}
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

        {/* Statistic Cards */}
        <div className="grid grid-cols-1 gap-3 p-5 md:grid-cols-4 md:p-8">
          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <TrendingUp
                className="size-4"
                style={{
                  color: getMonthColor(
                    bestMonth.month.toLowerCase().slice(0, 3),
                  ),
                }}
              />
              <span className="text-sm">Best Month</span>
            </div>
            <div className="text-xl font-medium">{bestMonth.name}</div>
            <div className="text-sm text-foreground/50">
              ${formatNumber(bestMonth.revenue)}k
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <ChartPie className="size-4 text-blue-500" />
              <span className="text-sm">Lowest Month</span>
            </div>
            <div className="text-xl font-medium">
              {filteredData.length
                ? filteredData.reduce(
                    (min, item) => (item.revenue < min.revenue ? item : min),
                    filteredData[0],
                  ).name
                : "—"}
            </div>
            <div className="text-sm text-foreground/50">
              $
              {formatNumber(
                filteredData.length
                  ? filteredData.reduce(
                      (min, item) => (item.revenue < min.revenue ? item : min),
                      filteredData[0],
                    ).revenue
                  : 0,
              )}
              k
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <BarChart3 className="size-4 text-green-500" />
              <span className="text-sm">Average Revenue</span>
            </div>
            <div className="text-xl font-medium">
              ${formatNumber(Math.round(averageRevenue))}k
            </div>
            <div className="text-sm text-foreground/50">Per selected month</div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <ChartPie className="size-4 text-orange-500" />
              <span className="text-sm">Months</span>
            </div>
            <div className="text-xl font-medium">
              {filteredData.length}/{baseChartData.length}
            </div>
            <div className="text-sm text-foreground/50">Selected months</div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="h-180 w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <RadialBarChart
              data={filteredData}
              startAngle={90}
              endAngle={-270}
              innerRadius={85}
              outerRadius={285}
            >
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    nameKey="name"
                    formatter={(value, name) => (
                      <div className="flex w-full items-center justify-between gap-4">
                        <span className="capitalize">{name}</span>
                        <span className="font-mono font-medium tabular-nums">
                          ${formatNumber(Number(value))}k
                        </span>
                      </div>
                    )}
                  />
                }
              />

              <RadialBar
                dataKey="revenue"
                background
                cornerRadius={10}
                animationDuration={1500}
                animationEasing="ease-out"
                label={{
                  position: "insideStart",
                  fill: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                }}
                // @ts-expect-error Recharts types may omit activeIndex.
                activeIndex={activeIndex}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(undefined)}
              />
            </RadialBarChart>
          </ChartContainer>
        </div>

        {/* Month Summary */}
        <div className="grid grid-cols-2 gap-3 border-t p-5 md:grid-cols-4 md:p-8">
          {filteredData.map((item, index) => {
            const isActive = activeIndex === index;
            const color = getMonthColor(item.month.toLowerCase().slice(0, 3));
            const percentage = formatPercentage(item.revenue, totalRevenue);

            return (
              <button
                key={item.month}
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(undefined)}
                onClick={() =>
                  setActiveIndex((current) =>
                    current === index ? undefined : index,
                  )
                }
                className={`rounded-xl border bg-foreground/5 p-4 text-left transition ${
                  isActive
                    ? "border-foreground/40 bg-foreground/10 shadow-sm"
                    : "hover:bg-foreground/10"
                }`}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className="size-3.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm font-semibold">{item.name}</span>
                </div>

                <p className="text-xl font-bold" style={{ color }}>
                  {percentage}%
                </p>

                <p className="mt-1 text-xs text-foreground/50">
                  ${formatNumber(item.revenue)}k revenue
                </p>

                <div className="mt-3 h-1.5 w-full rounded-full bg-foreground/10">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex flex-col items-start justify-between gap-5 border-t p-5 sm:flex-row sm:items-center md:p-8">
          <div className="text-sm">
            <span className="text-foreground/50">Filtered revenue: </span>
            <span className="font-bold">${formatNumber(totalRevenue)}k</span>
          </div>

          <div className="flex flex-wrap gap-4">
            {baseChartData.map((item) => (
              <div key={item.month} className="flex items-center gap-1.5">
                <span
                  className="size-2 rounded-full"
                  style={{
                    backgroundColor: getMonthColor(
                      item.month.toLowerCase().slice(0, 3),
                    ),
                  }}
                />
                <span className="text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
