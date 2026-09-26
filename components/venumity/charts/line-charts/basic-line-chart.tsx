"use client";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
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
    color: "#3b82f6", // blue-500
  },
} satisfies ChartConfig;

export default function ChartLineDefault() {
  const total = chartData.reduce((acc, item) => acc + item.desktop, 0);
  const peak = Math.max(...chartData.map((d) => d.desktop));
  const average = (total / chartData.length).toFixed(0);

  return (
    <main className="p-4 sm:p-6 md:p-10 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Line Chart - Natural
          </h2>
          <p className="text-sm sm:text-base mt-1 text-foreground/70">
            Smooth curve interpolation · January - June
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="bg-blue-500/10 px-3 sm:px-4 py-2 rounded-lg border border-blue-500/20 w-full sm:w-30">
            <span className="text-[10px] sm:text-xs text-blue-600">Total</span>
            <p className="text-base sm:text-lg font-bold text-blue-600">
              {total}
            </p>
          </div>

          <div className="bg-emerald-500/10 px-3 sm:px-4 py-2 rounded-lg border border-emerald-500/20 w-full sm:w-30">
            <span className="text-[10px] sm:text-xs text-emerald-600">
              Peak
            </span>
            <p className="text-base sm:text-lg font-bold text-emerald-600">
              {peak}
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
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: "#3b82f6" }}
          />
        </LineChart>
      </ChartContainer>

      {/* Footer stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full mt-4">
        <div className="space-y-1">
          <div className="flex flex-col gap-1 text-sm font-medium leading-none">
            <span className="text-xs sm:text-sm">Average</span>
            <span className="text-xl sm:text-2xl font-bold">{average}</span>
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            Per month average
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="text-emerald-600 font-medium">+15.2%</span>
          <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600" />
          <span className="text-muted-foreground">growth</span>
        </div>
      </div>
    </main>
  );
}
