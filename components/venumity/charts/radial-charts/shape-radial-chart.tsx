"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { TrendingUp, Users, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

export const description = "A radial chart with a custom shape";

const baseChartData = [
  { browser: "safari", visitors: 1260, fill: "var(--color-safari)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(220 90% 56%)",
  },
} satisfies ChartConfig;

const timeRangeData = {
  daily: { visitors: 1260, change: 12.5, previous: 1120 },
  weekly: { visitors: 8450, change: 8.3, previous: 7800 },
  monthly: { visitors: 32450, change: 15.2, previous: 28150 },
  yearly: { visitors: 389400, change: 23.7, previous: 314800 },
};

type TimeRange = keyof typeof timeRangeData;
type ChartType = "visitors" | "percentage";

const GOAL = 50000;

export default function ShapeRadialChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("daily");
  const [chartType, setChartType] = useState<ChartType>("visitors");

  const currentData = timeRangeData[timeRange];
  const percentage = Math.min((currentData.visitors / GOAL) * 100, 100);

  const endAngle =
    chartType === "visitors"
      ? Math.min((currentData.visitors / GOAL) * 360, 360)
      : percentage * 3.6;

  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-emerald-600" : "text-rose-600";
  };

  return (
    <div className="p-4 sm:p-5 lg:p-5 w-full">
      <div className="flex flex-col border rounded-2xl overflow-hidden w-full">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:gap-5 border-b bg-foreground/5 p-4 sm:p-5 lg:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-2xl font-semibold">
                Traffic Overview
              </h1>
              <p className="mt-1 text-xs sm:text-sm lg:text-base text-foreground/50">
                Real-time visitor analytics with radial visualization
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Tabs
                value={timeRange}
                onValueChange={(v) => {
                  if (v in timeRangeData) {
                    setTimeRange(v as TimeRange);
                  }
                }}
              >
                <TabsList className="p-1 h-10!">
                  <TabsTrigger
                    value="daily"
                    className="py-2! px-2.5! border-0! data-active:bg-foreground! data-active:text-secondary! font-semibold h-9 text-xs sm:text-sm"
                  >
                    Daily
                  </TabsTrigger>
                  <TabsTrigger
                    value="weekly"
                    className="py-2! px-2.5! border-0! data-active:bg-foreground! data-active:text-secondary! font-semibold h-9 text-xs sm:text-sm"
                  >
                    Weekly
                  </TabsTrigger>
                  <TabsTrigger
                    value="monthly"
                    className="py-2! px-2.5! border-0! data-active:bg-foreground! data-active:text-secondary! font-semibold h-9 text-xs sm:text-sm"
                  >
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger
                    value="yearly"
                    className="py-2! px-2.5! border-0! data-active:bg-foreground! data-active:text-secondary! font-semibold h-9 text-xs sm:text-sm"
                  >
                    Yearly
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Tabs
                value={chartType}
                onValueChange={(v) => {
                  if (v === "visitors" || v === "percentage") {
                    setChartType(v as ChartType);
                  }
                }}
              >
                <TabsList className="p-1 h-10!">
                  <TabsTrigger
                    value="visitors"
                    className="py-2! px-2.5! border-0! data-active:bg-foreground! data-active:text-secondary! font-semibold h-9 text-xs sm:text-sm"
                  >
                    Visitors
                  </TabsTrigger>
                  <TabsTrigger
                    value="percentage"
                    className="py-2! px-2.5! border-0! data-active:bg-foreground! data-active:text-secondary! font-semibold h-9 text-xs sm:text-sm"
                  >
                    Percentage
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </header>

        {/* Chart + Stats */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 p-4 sm:p-5 lg:p-8 md:grid-cols-2">
          {/* Gauge Chart */}
          <div className="flex items-center justify-center">
            <ChartContainer
              config={chartConfig}
              className="w-full h-90 lg:max-h-none"
            >
              <RadialBarChart
                data={[{ ...baseChartData[0], visitors: currentData.visitors }]}
                endAngle={endAngle}
                innerRadius={80}
                outerRadius={160}
                startAngle={90}
              >
                <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  className="first:fill-blue-500/30 last:fill-background"
                  polarRadius={[130, 70]}
                />

                <RadialBar
                  dataKey="visitors"
                  cornerRadius={8}
                  fill="hsl(var(--primary))"
                  background={{ fill: "hsl(var(--muted) / 0.25)" }}
                />

                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        const cx = viewBox.cx as number;
                        const cy = viewBox.cy as number;

                        return (
                          <text
                            x={cx}
                            y={cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={cx}
                              y={cy}
                              className="fill-foreground text-2xl sm:text-3xl lg:text-3xl font-bold"
                            >
                              {chartType === "visitors"
                                ? currentData.visitors.toLocaleString()
                                : `${Math.round(percentage)}%`}
                            </tspan>
                            <tspan
                              x={cx}
                              y={cy + 20}
                              className="fill-muted-foreground text-xs sm:text-sm lg:text-sm"
                            >
                              {chartType === "visitors"
                                ? "Visitors"
                                : "of Capacity"}
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </PolarRadiusAxis>
              </RadialBarChart>
            </ChartContainer>
          </div>

          {/* Stats Panel */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="rounded-xl border bg-foreground/5 p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-foreground/70">
                  Total Visitors
                </span>
                <span className="text-xl sm:text-2xl lg:text-2xl font-bold">
                  {currentData.visitors.toLocaleString()}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`text-xs sm:text-sm flex items-center gap-1 ${getChangeColor(currentData.change)}`}
                >
                  {currentData.change >= 0 ? (
                    <ArrowUpRight className="size-3.5 sm:size-4" />
                  ) : (
                    <ArrowDownRight className="size-3.5 sm:size-4" />
                  )}
                  {Math.abs(currentData.change)}%
                </span>
                <span className="text-xs sm:text-sm text-foreground/70">
                  vs previous {timeRange}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border bg-foreground/5 p-4 sm:p-5">
                <div className="flex items-center gap-2 text-foreground/70 mb-2">
                  <Users className="size-4" />
                  <span className="text-xs sm:text-sm">Previous</span>
                </div>
                <div className="text-base sm:text-lg font-semibold">
                  {currentData.previous.toLocaleString()}
                </div>
              </div>

              <div className="rounded-xl border bg-foreground/5 p-4 sm:p-5">
                <div className="flex items-center gap-2 text-foreground/70 mb-2">
                  <TrendingUp className="size-4" />
                  <span className="text-xs sm:text-sm">Goal</span>
                </div>
                <div className="text-base sm:text-lg font-semibold">
                  {GOAL.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Progress Details */}
            <div className="rounded-xl border bg-foreground/5 p-4 sm:p-5">
              <h4 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
                Progress Details
              </h4>

              <div className="space-y-2 sm:space-y-3">
                <div>
                  <div className="flex justify-between text-xs sm:text-sm mb-1 sm:mb-2">
                    <span>Completion</span>
                    <span className="font-medium">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                  <div className="w-full h-2 sm:h-2.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-green-500 to-emerald-300 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between text-xs sm:text-sm">
                  <span>Remaining</span>
                  <span className="font-medium">
                    {Math.max(GOAL - currentData.visitors, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 border-t p-4 sm:p-5 lg:p-8">
          <div>
            <div className="text-[10px] sm:text-xs text-foreground/70 mb-1">
              Peak Time
            </div>
            <div className="font-semibold text-xs sm:text-sm">
              2:00 PM - 4:00 PM
            </div>
            <div className="text-[10px] sm:text-xs text-emerald-600">
              +23% avg
            </div>
          </div>

          <div>
            <div className="text-[10px] sm:text-xs text-foreground/70 mb-1">
              Avg. Session
            </div>
            <div className="font-semibold text-xs sm:text-sm">4m 32s</div>
            <div className="text-[10px] sm:text-xs text-emerald-600">+8%</div>
          </div>

          <div>
            <div className="text-[10px] sm:text-xs text-foreground/70 mb-1">
              Bounce Rate
            </div>
            <div className="font-semibold text-xs sm:text-sm">32.4%</div>
            <div className="text-[10px] sm:text-xs text-rose-600">-2%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
