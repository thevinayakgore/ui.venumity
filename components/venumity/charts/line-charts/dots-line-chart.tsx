"use client";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#d946ef", // fuchsia-500
  },
  mobile: {
    label: "Mobile",
    color: "#14b8a6", // teal-500
  },
} satisfies ChartConfig;

export default function ChartLineDots() {
  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-5">
        <div>
          <h1 className="text-3xl font-bold">Line Chart with Dots</h1>
          <p className="text-base text-muted-foreground mt-1">
            Highlighted data points · January – June
          </p>
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
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={3}
            dot={{ fill: "var(--color-desktop)", r: 4 }}
            activeDot={{ r: 8, fill: "var(--color-desktop)" }}
          />
          <Line
            dataKey="mobile"
            type="natural"
            stroke="var(--color-mobile)"
            strokeWidth={3}
            dot={{ fill: "var(--color-mobile)", r: 4 }}
            activeDot={{ r: 8, fill: "var(--color-mobile)" }}
          />
        </LineChart>
      </ChartContainer>
      <div className="flex items-center justify-between w-full">
        <div className="space-y-1">
          <p className="text-sm font-medium">Desktop peaks in February</p>
          <p className="text-xs text-muted-foreground">Mobile peaks in April</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-fuchsia-500" />
            <span className="text-xs">Desktop</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            <span className="text-xs">Mobile</span>
          </div>
        </div>
      </div>
    </main>
  );
}
