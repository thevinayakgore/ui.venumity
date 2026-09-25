"use client";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadialBar, RadialBarChart } from "recharts";
import {
  BarChart3,
  ChartPie,
  Monitor,
  RotateCcw,
  TrendingUp,
} from "lucide-react";
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

const chartData = [
  {
    browser: "chrome",
    name: "Chrome",
    visitors: 275,
    fill: "var(--color-chrome)",
  },
  {
    browser: "safari",
    name: "Safari",
    visitors: 200,
    fill: "var(--color-safari)",
  },
  {
    browser: "firefox",
    name: "Firefox",
    visitors: 187,
    fill: "var(--color-firefox)",
  },
  {
    browser: "edge",
    name: "Edge",
    visitors: 173,
    fill: "var(--color-edge)",
  },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(24 100% 55%)",
  },
  safari: {
    label: "Safari",
    color: "hsl(220 90% 56%)",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(142 76% 36%)",
  },
  edge: {
    label: "Edge",
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

function getBrowserColor(browser: string) {
  const entry = chartConfig[browser as keyof typeof chartConfig];

  return "color" in entry ? entry.color : "hsl(var(--muted-foreground))";
}

function getBrowserLabel(browser: string) {
  const entry = chartConfig[browser as keyof typeof chartConfig];

  return "label" in entry ? entry.label : browser;
}

export default function BasicRadialChart() {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const [view, setView] = useState<ViewFilter>("all");
  const [sort, setSort] = useState<SortFilter>("default");

  const filteredData = useMemo(() => {
    let result = [...chartData];

    if (view === "top-half") {
      result = result.filter((_, index) => index < 2);
    }

    if (view === "bottom-half") {
      result = result.filter((_, index) => index >= 2);
    }

    if (sort === "highest") {
      result.sort((a, b) => b.visitors - a.visitors);
    }

    if (sort === "lowest") {
      result.sort((a, b) => a.visitors - b.visitors);
    }

    return result;
  }, [sort, view]);

  const totalVisitors = filteredData.reduce(
    (sum, item) => sum + item.visitors,
    0,
  );

  const largestBrowser = filteredData.reduce(
    (largest, item) => (item.visitors > largest.visitors ? item : largest),
    filteredData[0] ?? {
      browser: "—",
      visitors: 0,
      fill: "hsl(var(--muted))",
    },
  );

  const smallestBrowser = filteredData.reduce(
    (smallest, item) => (item.visitors < smallest.visitors ? item : smallest),
    filteredData[0] ?? {
      browser: "—",
      visitors: 0,
      fill: "hsl(var(--muted))",
    },
  );

  const averageVisitors = filteredData.length
    ? totalVisitors / filteredData.length
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
              <h1 className="text-2xl font-semibold">Browser Distribution</h1>
              <p className="mt-1 text-sm text-foreground/50 md:text-base">
                Visitor distribution with interactive radial bars
              </p>
            </div>

            {/* Filters */}
            <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3">
              <Select
                value={view}
                onValueChange={(value) => setView(value as ViewFilter)}
              >
                <SelectTrigger className="h-11! w-full rounded-lg border-foreground/10! bg-foreground/5! px-3 py-2">
                  <SelectValue placeholder="Filter browsers" />
                </SelectTrigger>

                <SelectContent className="p-1">
                  <SelectItem
                    value="all"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    All browsers
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
                  <SelectValue placeholder="Sort browsers" />
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
                Showing {filteredData.length} of {chartData.length} browsers
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
                style={{ color: getBrowserColor(largestBrowser.browser) }}
              />
              <span className="text-sm">Top Browser</span>
            </div>
            <div className="text-xl font-medium">
              {getBrowserLabel(largestBrowser.browser)}
            </div>
            <div className="text-sm text-foreground/50">
              {formatNumber(largestBrowser.visitors)} visitors
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <ChartPie className="size-4 text-blue-500" />
              <span className="text-sm">Lowest Browser</span>
            </div>
            <div className="text-xl font-medium">
              {getBrowserLabel(smallestBrowser.browser)}
            </div>
            <div className="text-sm text-foreground/50">
              {formatNumber(smallestBrowser.visitors)} visitors
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <BarChart3 className="size-4 text-green-500" />
              <span className="text-sm">Average Visitors</span>
            </div>
            <div className="text-xl font-medium">
              {formatNumber(Math.round(averageVisitors))}
            </div>
            <div className="text-sm text-foreground/50">
              Per selected browser
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Monitor className="size-4 text-orange-500" />
              <span className="text-sm">Browsers</span>
            </div>
            <div className="text-xl font-medium">
              {filteredData.length}/{chartData.length}
            </div>
            <div className="text-sm text-foreground/50">Selected browsers</div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="h-180 w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <RadialBarChart
              data={filteredData}
              innerRadius={85}
              outerRadius={285}
              startAngle={90}
              endAngle={-270}
            >
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={(value, name, item) => {
                      const browserKey =
                        (item.payload?.browser as string) ?? name;
                      const label = getBrowserLabel(browserKey);

                      return (
                        <div className="flex items-center justify-between gap-4 p-1 text-sm w-full">
                          <span className="capitalize">{label} :</span>
                          <span className="font-mono font-medium tabular-nums">
                            {formatNumber(Number(value))} visitors
                          </span>
                        </div>
                      );
                    }}
                  />
                }
              />

              <RadialBar
                dataKey="visitors"
                background
                cornerRadius={10}
                animationDuration={1500}
                animationEasing="ease-out"
                // @ts-expect-error Recharts types may omit activeIndex.
                activeIndex={activeIndex}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(undefined)}
              />
            </RadialBarChart>
          </ChartContainer>
        </div>

        {/* Browser Summary */}
        <div className="grid grid-cols-2 gap-3 border-t p-5 md:grid-cols-4 md:p-8">
          {filteredData.map((item, index) => {
            const isActive = activeIndex === index;
            const color = getBrowserColor(item.browser);
            const percentage = formatPercentage(item.visitors, totalVisitors);

            return (
              <button
                key={item.browser}
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
                  <span className="text-sm font-semibold">
                    {getBrowserLabel(item.browser)}
                  </span>
                </div>

                <p className="text-xl font-bold" style={{ color }}>
                  {percentage}%
                </p>

                <p className="mt-1 text-xs text-foreground/50">
                  {formatNumber(item.visitors)} visitors
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
            <span className="text-foreground/50">Filtered visitors: </span>
            <span className="font-bold">{formatNumber(totalVisitors)}</span>
          </div>

          <div className="flex flex-wrap gap-4">
            {chartData.map((item) => (
              <div key={item.browser} className="flex items-center gap-1.5">
                <span
                  className="size-2 rounded-full"
                  style={{
                    backgroundColor: getBrowserColor(item.browser),
                  }}
                />
                <span className="text-sm">{getBrowserLabel(item.browser)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
