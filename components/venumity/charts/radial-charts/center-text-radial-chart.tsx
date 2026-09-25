"use client";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadialBar, RadialBarChart } from "recharts";
import { TrendingUp, RotateCcw, Target } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
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
  {
    goal: "completed",
    label: "Completed",
    value: 85,
    fill: "var(--color-completed)",
  },
  {
    goal: "remaining",
    label: "Remaining",
    value: 15,
    fill: "var(--color-remaining)",
  },
];

const chartConfig = {
  value: {
    label: "Progress",
  },
  completed: {
    label: "Completed",
    color: "hsl(142 76% 36%)",
  },
  remaining: {
    label: "Remaining",
    color: "hsl(215 20% 65%)",
  },
} satisfies ChartConfig;

type ViewFilter = "all" | "completed" | "remaining";
type SortFilter = "default" | "highest" | "lowest";

function formatPercentage(value: number) {
  return `${value}%`;
}

function getGoalColor(key: string) {
  const entry = chartConfig[key as keyof typeof chartConfig];
  return "color" in entry ? entry.color : "hsl(var(--muted-foreground))";
}

export default function CenterTextChartRadial() {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const [view, setView] = useState<ViewFilter>("all");
  const [sort, setSort] = useState<SortFilter>("default");

  const filteredData = useMemo(() => {
    let result = [...baseChartData];

    if (view === "completed") {
      result = result.filter((item) => item.goal === "completed");
    }

    if (view === "remaining") {
      result = result.filter((item) => item.goal === "remaining");
    }

    if (sort === "highest") {
      result.sort((a, b) => b.value - a.value);
    }

    if (sort === "lowest") {
      result.sort((a, b) => a.value - b.value);
    }

    return result;
  }, [view, sort]);

  const completedValue =
    baseChartData.find((d) => d.goal === "completed")?.value ?? 0;

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
              <h1 className="text-2xl font-semibold">Project Progress</h1>
              <p className="mt-1 text-sm text-foreground/50 md:text-base">
                Radial chart with center label
              </p>
            </div>

            {/* Filters */}
            <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3">
              <Select
                value={view}
                onValueChange={(value) => setView(value as ViewFilter)}
              >
                <SelectTrigger className="h-11! w-full rounded-lg border-foreground/10! bg-foreground/5! px-3 py-2">
                  <SelectValue placeholder="Filter goals" />
                </SelectTrigger>

                <SelectContent className="p-1">
                  <SelectItem
                    value="all"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    All
                  </SelectItem>
                  <SelectItem
                    value="completed"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Completed
                  </SelectItem>
                  <SelectItem
                    value="remaining"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Remaining
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={sort}
                onValueChange={(value) => setSort(value as SortFilter)}
              >
                <SelectTrigger className="h-11! w-full rounded-lg border-foreground/10! bg-foreground/5! px-3 py-2">
                  <SelectValue placeholder="Sort goals" />
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
                Showing {filteredData.length} of {baseChartData.length} segments
              </span>

              {view !== "all" && (
                <Badge
                  variant="outline"
                  className="bg-foreground/5! px-3! py-3.5!"
                >
                  View: {view === "completed" ? "Completed" : "Remaining"}
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
        <div className="flex flex-col items-center justify-center m-auto gap-5 p-5 w-full">
          <ChartContainer config={chartConfig} className="w-full h-160">
            <RadialBarChart
              data={filteredData}
              innerRadius={100}
              outerRadius={300}
              startAngle={90}
              endAngle={-270}
            >
              <ChartTooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;

                  const item = payload[0];
                  const label = (item.payload?.label as string) ?? "Progress";
                  const value = Number(item.value ?? 0);

                  return (
                    <div className="min-w-40 rounded-lg border border-border/60 bg-background p-3 shadow-lg">
                      <div className="mb-1 text-xs text-muted-foreground">
                        Progress
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-medium">{label}</span>
                        <span className="text-sm font-bold tabular-nums">
                          {formatPercentage(value)}
                        </span>
                      </div>
                    </div>
                  );
                }}
              />

              <RadialBar
                dataKey="value"
                background
                cornerRadius={10}
                animationDuration={1400}
                animationEasing="ease-out"
                // @ts-expect-error Recharts types may omit activeIndex.
                activeIndex={activeIndex}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(undefined)}
              />

              {/* Center text */}
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-foreground text-3xl md:text-5xl font-bold"
              >
                {formatPercentage(completedValue)}
              </text>
              <text
                x="50%"
                y="55%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-foreground text-sm uppercase tracking-widest"
              >
                Complete
              </text>
            </RadialBarChart>
          </ChartContainer>

          {/* Stats Panel */}
          <div className="flex flex-col gap-4 w-full">
            {/* Summary cards */}
            <div className="grid grid-cols-2 gap-3">
              {baseChartData.map((item) => {
                const color = getGoalColor(item.goal);
                const isActive =
                  activeIndex !== undefined &&
                  filteredData[activeIndex]?.goal === item.goal;

                return (
                  <button
                    key={item.goal}
                    type="button"
                    onMouseEnter={() =>
                      setActiveIndex(
                        filteredData.findIndex((d) => d.goal === item.goal),
                      )
                    }
                    onMouseLeave={() => setActiveIndex(undefined)}
                    onClick={() =>
                      setActiveIndex((current) => {
                        const idx = filteredData.findIndex(
                          (d) => d.goal === item.goal,
                        );
                        return current === idx ? undefined : idx;
                      })
                    }
                    className={`rounded-xl border bg-foreground/5 p-4 text-left transition ${
                      isActive
                        ? "border-foreground/40 bg-foreground/10 shadow-sm"
                        : "hover:bg-foreground/10"
                    }`}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className="size-3.5 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm font-semibold">
                        {item.label}
                      </span>
                    </div>

                    <p className="text-2xl font-bold" style={{ color }}>
                      {formatPercentage(item.value)}
                    </p>

                    <p className="mt-1 text-xs text-foreground/50">
                      {item.goal === "completed"
                        ? "Of total target"
                        : "Still to complete"}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Progress details */}
            <div className="rounded-xl border bg-foreground/5 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Target className="size-4 text-emerald-600" />
                <h4 className="text-sm font-semibold">Progress Details</h4>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Completion</span>
                    <span className="font-medium">{completedValue}%</span>
                  </div>
                  <div className="mt-2 h-2.5 w-full rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${completedValue}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Remaining</span>
                  <span className="font-medium">{100 - completedValue}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-start justify-between gap-5 border-t p-5 sm:flex-row sm:items-center md:p-8">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-5 text-emerald-600" />
            <span className="text-sm font-medium">
              Project progress is on track
            </span>
          </div>
          <p className="text-xs text-foreground/50">
            Target completion: Q3 2024
          </p>
        </div>
      </div>
    </div>
  );
}
