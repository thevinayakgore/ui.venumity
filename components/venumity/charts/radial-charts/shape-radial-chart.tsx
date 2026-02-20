"use client";
import { useState } from "react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { TrendingUp, Users, ArrowUpRight, ArrowDownRight } from "lucide-react";

export const description = "A radial chart with a custom shape";

const chartData = [
  { browser: "safari", visitors: 1260, fill: "var(--color-safari)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const timeRangeData = {
  daily: { visitors: 1260, change: 12.5, previous: 1120 },
  weekly: { visitors: 8450, change: 8.3, previous: 7800 },
  monthly: { visitors: 32450, change: 15.2, previous: 28150 },
  yearly: { visitors: 389400, change: 23.7, previous: 314800 },
};

export default function ShapeRadialChart() {
  const [timeRange, setTimeRange] =
    useState<keyof typeof timeRangeData>("daily");
  const [chartType, setChartType] = useState<"visitors" | "percentage">(
    "visitors",
  );

  const currentData = timeRangeData[timeRange];
  const percentage = (currentData.visitors / 50000) * 100; // Assuming max 50k for scaling
  const endAngle =
    chartType === "visitors"
      ? (currentData.visitors / 50000) * 360
      : percentage * 3.6;

  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-green-600" : "text-rose-600";
  };

  return (
    <main className="p-6 md:p-10">
      <div>
        <h2 className="text-4xl font-semibold">Traffic Overview</h2>
        <p className="text-sm text-foreground /70mt-1">
          Real-time visitor analytics with radial visualization
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6">
        <Tabs
          value={timeRange}
          onValueChange={(v) => {
            if (v in timeRangeData) {
              setTimeRange(v as keyof typeof timeRangeData);
            }
          }}
        >
          <TabsList>
            <TabsTrigger value="daily" className="cursor-pointer">
              Daily
            </TabsTrigger>
            <TabsTrigger value="weekly" className="cursor-pointer">
              Weekly
            </TabsTrigger>
            <TabsTrigger value="monthly" className="cursor-pointer">
              Monthly
            </TabsTrigger>
            <TabsTrigger value="yearly" className="cursor-pointer">
              Yearly
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Tabs
          value={chartType}
          onValueChange={(v) => {
            if (v === "visitors" || v === "percentage") {
              setChartType(v);
            }
          }}
        >
          <TabsList>
            <TabsTrigger value="visitors" className="cursor-pointer">
              Visitors
            </TabsTrigger>
            <TabsTrigger value="percentage" className="cursor-pointer">
              Percentage
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative w-full">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-100"
          >
            <RadialBarChart
              data={[{ ...chartData[0], visitors: currentData.visitors }]}
              endAngle={endAngle}
              innerRadius={130}
              outerRadius={300}
              startAngle={90}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-primary/30 last:fill-background"
                polarRadius={[150, 120]}
              />
              <RadialBar
                dataKey="visitors"
                cornerRadius={6}
                className="fill-primary"
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {chartType === "visitors"
                              ? currentData.visitors.toLocaleString()
                              : `${Math.round(percentage)}%`}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground text-sm"
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

        {/* Stats */}
        <div className="space-y-4 w-full">
          <div className="bg-foreground/5 backdrop-blur-sm border rounded-lg p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg text-foreground/70">Total Visitors</span>
              <span className="text-2xl font-bold">
                {currentData.visitors.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm flex items-center gap-1 ${getChangeColor(currentData.change)}`}
              >
                {currentData.change >= 0 ? (
                  <ArrowUpRight className="size-4" />
                ) : (
                  <ArrowDownRight className="size-4" />
                )}
                {Math.abs(currentData.change)}%
              </span>
              <span className="text-sm text-foreground/70">
                vs previous {timeRange}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="bg-foreground/5 backdrop-blur-sm border rounded-lg p-5">
              <div className="flex items-center gap-2 text-foreground /70mb-1">
                <Users className="size-4" />
                <span className="text-lg">Previous</span>
              </div>
              <div className="text-lg font-semibold">
                {currentData.previous.toLocaleString()}
              </div>
            </div>
            <div className="bg-foreground/5 backdrop-blur-sm border rounded-lg p-5">
              <div className="flex items-center gap-2 text-foreground /70mb-1">
                <TrendingUp className="size-4" />
                <span className="text-lg">Goal</span>
              </div>
              <div className="text-lg font-semibold">50,000</div>
            </div>
          </div>

          {/* Progress Details */}
          <div className="bg-foreground/5 backdrop-blur-sm border rounded-lg p-5">
            <h4 className="text-xl font-semibold mb-3">Progress Details</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-5">
                  <span>Completion</span>
                  <span className="font-medium">{Math.round(percentage)}%</span>
                </div>
                <div className="w-full h-3 bg-green-500/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-green-500 to-emerald-300 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span>Remaining</span>
                <span className="font-medium">
                  {(50000 - currentData.visitors).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
        <div>
          <div className="text-xs text-foreground /70mb-1">Peak Time</div>
          <div className="font-semibold">2:00 PM - 4:00 PM</div>
          <div className="text-xs text-green-600">+23% avg</div>
        </div>
        <div>
          <div className="text-xs text-foreground /70mb-1">Avg. Session</div>
          <div className="font-semibold">4m 32s</div>
          <div className="text-xs text-green-600">+8%</div>
        </div>
        <div>
          <div className="text-xs text-foreground /70mb-1">Bounce Rate</div>
          <div className="font-semibold">32.4%</div>
          <div className="text-xs text-rose-600">-2%</div>
        </div>
      </div>
    </main>
  );
}
