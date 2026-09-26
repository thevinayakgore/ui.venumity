"use client";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartTooltip,
  ChartContainer,
  type ChartConfig,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#ef4444", // red-500
  },
} satisfies ChartConfig;

export default function ChartLineLinear() {
  const min = Math.min(...chartData.map((d) => d.desktop));
  const max = Math.max(...chartData.map((d) => d.desktop));
  const range = max - min;

  return (
    <main className="p-4 sm:p-6 md:p-10 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Line Chart – Linear
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Straight line segments · January – June
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="bg-red-500/10 px-3 sm:px-4 py-2 rounded-lg border border-red-500/20 w-full sm:w-30">
            <span className="text-[10px] sm:text-xs text-red-500">Min</span>
            <p className="text-base sm:text-lg font-bold text-red-500">{min}</p>
          </div>

          <div className="bg-green-500/10 px-3 sm:px-4 py-2 rounded-lg border border-green-500/20 w-full sm:w-30">
            <span className="text-[10px] sm:text-xs text-green-500">Max</span>
            <p className="text-base sm:text-lg font-bold text-green-500">
              {max}
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <ChartContainer
        config={chartConfig}
        className="h-56 sm:h-64 md:h-72 lg:h-80 w-full"
      >
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{ left: 12, right: 12, top: 20, bottom: 20 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-foreground/15!"
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
            className="text-[10px] sm:text-xs"
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="desktop"
            type="linear"
            strokeWidth={2.5}
            dot={false}
            stroke="#3b82f6"
            activeDot={{ r: 5, fill: "#3b82f6" }}
          />
        </LineChart>
      </ChartContainer>

      {/* Footer stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full mt-4">
        <div className="space-y-1">
          <div className="flex flex-col gap-1 text-sm font-medium leading-none">
            <span className="text-xs sm:text-sm">Range</span>
            <span className="text-xl sm:text-2xl font-bold">{range}</span>
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            Peak to trough
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="text-emerald-500 font-medium">+8.7%</span>
          <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-500" />
          <span className="text-muted-foreground">trend</span>
        </div>
      </div>
    </main>
  );
}
