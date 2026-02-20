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
    color: "#ef4444", // red-500
  },
} satisfies ChartConfig;

export default function ChartLineLinear() {
  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Line Chart – Linear</h1>
          <p className="text-base text-muted-foreground mt-1">
            Straight line segments · January – June 
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20 w-30">
            <span className="text-xs text-red-500">Min</span>
            <p className="text-lg font-bold text-red-500">
              {Math.min(...chartData.map((d) => d.desktop))}
            </p>
          </div>
          <div className="bg-green-500/10 px-4 py-2 rounded-lg border border-green-500/20 w-30">
            <span className="text-xs text-green-500">Max</span>
            <p className="text-lg font-bold text-green-500">
              {Math.max(...chartData.map((d) => d.desktop))}
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
            type="linear"
            strokeWidth={3}
            dot={false}
            stroke="#3b82f6"
            activeDot={{ r: 6, fill: "#3b82f6" }}
          />
        </LineChart>
      </ChartContainer>
      <div className="flex items-center justify-between w-full">
        <div className="space-y-1">
          <div className="flex flex-col gap-1 text-sm font-medium leading-none">
            <span>Range</span>
            <span className="text-2xl font-bold">
              {Math.max(...chartData.map((d) => d.desktop)) -
                Math.min(...chartData.map((d) => d.desktop))}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Peak to trough</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-emerald-500 font-medium">+8.7%</span>
          <TrendingUp className="h-4 w-4 text-emerald-500" />
          <span className="text-muted-foreground">trend</span>
        </div>
      </div>
    </main>
  );
}
