"use client";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cell, Pie, PieChart, Sector, Tooltip } from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { BarChart3, ChartPie, RotateCcw, TrendingUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  value: {
    label: "Units",
  },
} satisfies ChartConfig;

const pieData = [
  { name: "Group A", value: 400, color: "#f97316" },
  { name: "Group B", value: 300, color: "#3b82f6" },
  { name: "Group C", value: 300, color: "#10b981" },
  { name: "Group D", value: 200, color: "#eab308" },
];

type SortFilter = "default" | "highest" | "lowest";
type ViewFilter = "all" | "top-half" | "bottom-half";

interface TooltipPayloadItem {
  name?: string;
  value?: number;
  payload?: {
    name: string;
    value: number;
    color: string;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

function formatPercentage(value: number, total: number) {
  return total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const item = payload[0]?.payload;

  if (!item) return null;

  const total = pieData.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="min-w-40 sm:min-w-48 rounded-lg border border-border/60 bg-background p-3 shadow-lg">
      <div className="mb-3 flex items-center gap-2 border-b border-dashed border-foreground/15 pb-2">
        <span
          className="size-3.5 rounded"
          style={{ backgroundColor: item.color }}
        />
        <p className="text-sm font-semibold">{item.name}</p>
      </div>

      <p
        className="text-base sm:text-lg font-bold"
        style={{ color: item.color }}
      >
        {formatNumber(item.value)} units
      </p>

      <p className="mt-1 text-[10px] sm:text-xs text-foreground/50">
        {formatPercentage(item.value, total)}% of total
      </p>
    </div>
  );
}

function ActiveShape(props: PieSectorDataItem) {
  return (
    <g>
      <Sector {...props} outerRadius={(props.outerRadius ?? 150) + 15} />
      <Sector
        {...props}
        innerRadius={(props.innerRadius ?? 0) + 15}
        outerRadius={(props.outerRadius ?? 150) + 15}
      />
    </g>
  );
}

export default function BasicPieChart() {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const [view, setView] = useState<ViewFilter>("all");
  const [sort, setSort] = useState<SortFilter>("default");

  const filteredData = useMemo(() => {
    let result = [...pieData];

    if (view === "top-half") {
      result = result.filter((_, index) => index < 2);
    }

    if (view === "bottom-half") {
      result = result.filter((_, index) => index >= 2);
    }

    if (sort === "highest") {
      result.sort((a, b) => b.value - a.value);
    }

    if (sort === "lowest") {
      result.sort((a, b) => a.value - b.value);
    }

    return result;
  }, [sort, view]);

  const filteredTotal = filteredData.reduce((sum, item) => sum + item.value, 0);

  const largestGroup = filteredData.reduce(
    (largest, item) => (item.value > largest.value ? item : largest),
    filteredData[0] ?? { name: "—", value: 0, color: "#94a3b8" },
  );

  const smallestGroup = filteredData.reduce(
    (smallest, item) => (item.value < smallest.value ? item : smallest),
    filteredData[0] ?? { name: "—", value: 0, color: "#94a3b8" },
  );

  const average = filteredData.length ? filteredTotal / filteredData.length : 0;

  const hasActiveFilters = view !== "all" || sort !== "default";

  function resetFilters() {
    setView("all");
    setSort("default");
    setActiveIndex(undefined);
  }

  return (
    <div className="p-4 sm:p-5 w-full">
      <div className="flex flex-col border rounded-2xl overflow-hidden w-full">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:gap-5 border-b p-4 sm:p-5 bg-foreground/5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="w-full">
              <h1 className="text-xl sm:text-2xl font-semibold">
                Basic Pie Chart
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-foreground/50 md:text-base">
                Distribution with percentage labels and interactive segments
              </p>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
              <Select
                value={view}
                onValueChange={(value) => setView(value as ViewFilter)}
              >
                <SelectTrigger className="h-11! w-full rounded-lg border-foreground/10! bg-foreground/5! px-3 py-2">
                  <SelectValue placeholder="Filter groups" />
                </SelectTrigger>
                <SelectContent className="p-1">
                  <SelectItem
                    value="all"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    All groups
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
                  <SelectValue placeholder="Sort groups" />
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
                <RotateCcw className="size-4" />
                <span className="hidden sm:inline">Reset</span>
              </Button>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-foreground/50">
              <span>
                Showing {filteredData.length} of {pieData.length} groups
              </span>
              {view !== "all" && (
                <Badge
                  variant="outline"
                  className="bg-foreground/5! px-2.5! py-1! text-[10px] sm:text-xs"
                >
                  View: {view === "top-half" ? "Top half" : "Bottom half"}
                </Badge>
              )}
              {sort !== "default" && (
                <Badge
                  variant="outline"
                  className="bg-foreground/5! px-2.5! py-1! text-[10px] sm:text-xs"
                >
                  Sort: {sort === "highest" ? "Highest first" : "Lowest first"}
                </Badge>
              )}
            </div>
          )}
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 sm:p-5 md:p-8">
          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <TrendingUp
                className="size-4"
                style={{ color: largestGroup.color }}
              />
              <span className="text-xs sm:text-sm">Largest Group</span>
            </div>
            <div className="text-base sm:text-xl font-medium">
              {largestGroup.name}
            </div>
            <div className="text-xs sm:text-sm text-foreground/50">
              {formatNumber(largestGroup.value)} units
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <ChartPie className="size-4 text-blue-500" />
              <span className="text-xs sm:text-sm">Smallest Group</span>
            </div>
            <div className="text-base sm:text-xl font-medium">
              {smallestGroup.name}
            </div>
            <div className="text-xs sm:text-sm text-foreground/50">
              {formatNumber(smallestGroup.value)} units
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <BarChart3 className="size-4 text-green-500" />
              <span className="text-xs sm:text-sm">Average Group</span>
            </div>
            <div className="text-base sm:text-xl font-medium">
              {formatNumber(Math.round(average))}
            </div>
            <div className="text-xs sm:text-sm text-foreground/50">
              Per selected group
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <ChartPie className="size-4 text-orange-500" />
              <span className="text-xs sm:text-sm">Groups</span>
            </div>
            <div className="text-base sm:text-xl font-medium">
              {filteredData.length}/{pieData.length}
            </div>
            <div className="text-xs sm:text-sm text-foreground/50">
              Selected groups
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <PieChart accessibilityLayer>
              <Pie
                data={filteredData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={140}
                paddingAngle={3}
                stroke="hsl(var(--background))"
                strokeWidth={4}
                // @ts-expect-error Recharts types don't include activeIndex here
                activeIndex={activeIndex}
                activeShape={ActiveShape}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(undefined)}
                label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {filteredData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ChartContainer>
        </div>

        {/* Group Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4 sm:p-5 md:p-8 border-t">
          {filteredData.map((item) => (
            <div
              key={item.name}
              className="rounded-xl border bg-foreground/5 p-4"
            >
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="size-3.5 rounded"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs sm:text-sm font-semibold">
                  {item.name}
                </span>
              </div>
              <p
                className="text-base sm:text-xl font-bold"
                style={{ color: item.color }}
              >
                {formatPercentage(item.value, filteredTotal)}%
              </p>
              <p className="mt-1 text-[10px] sm:text-xs text-foreground/50">
                {formatNumber(item.value)} units
              </p>
              <div className="mt-3 h-1.5 w-full rounded-full bg-foreground/10">
                <div
                  className="h-1.5 rounded-full"
                  style={{
                    width: `${formatPercentage(item.value, filteredTotal)}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-col items-start justify-between gap-4 sm:gap-5 border-t p-4 sm:p-5 md:p-8 sm:flex-row sm:items-center">
          <div className="text-xs sm:text-sm">
            <span className="text-foreground/50">Filtered units: </span>
            <span className="font-bold">{formatNumber(filteredTotal)}</span>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <div
                  className="size-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[10px] sm:text-xs">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
