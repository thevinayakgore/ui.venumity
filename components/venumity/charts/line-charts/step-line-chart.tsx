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

export default function ChartLineStep() {
  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold">Line Chart - Step</h2>
          <p className="text-base mt-1">
            Step interpolation · January - June 
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20 w-30">
            <span className="text-xs text-blue-600">Total</span>
            <p className="text-lg font-bold text-blue-600">
              {chartData.reduce((acc, item) => acc + item.desktop, 0)}
            </p>
          </div>
        </div>
      </div>
      <ChartContainer config={chartConfig} className="h-100 w-full">
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
            className="text-xs"
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="desktop"
            type="step"
            stroke="var(--color-desktop)"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: "#3b82f6" }}
          />
        </LineChart>
      </ChartContainer>
      <div className="flex items-center justify-between w-full">
        <div className="space-y-1">
          <div className="flex flex-col items-start gap-1 text-sm font-medium leading-none">
            <span>Volatility</span>
            <span className="text-2xl font-bold">Medium</span>
          </div>
          <p className="text-xs text-muted-foreground">Step pattern analysis</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-blue-600 font-medium">+12.3%</span>
          <TrendingUp className="h-4 w-4 text-blue-600" />
          <span className="text-muted-foreground">since Jan</span>
        </div>
      </div>
    </main>
  );
}
