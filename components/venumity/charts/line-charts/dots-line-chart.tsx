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
    <main className="p-4 sm:p-6 md:p-10 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Line Chart with Dots
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Highlighted data points · January – June
          </p>
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
            dot={{ fill: "var(--color-desktop)", r: 3.5 }}
            activeDot={{ r: 6, fill: "var(--color-desktop)" }}
          />
          <Line
            dataKey="mobile"
            type="natural"
            stroke="var(--color-mobile)"
            strokeWidth={2.5}
            dot={{ fill: "var(--color-mobile)", r: 3.5 }}
            activeDot={{ r: 6, fill: "var(--color-mobile)" }}
          />
        </LineChart>
      </ChartContainer>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full mt-4">
        <div className="space-y-1">
          <p className="text-xs sm:text-sm font-medium">
            Desktop peaks in February
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            Mobile peaks in April
          </p>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-fuchsia-500" />
            <span className="text-[10px] sm:text-xs">Desktop</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            <span className="text-[10px] sm:text-xs">Mobile</span>
          </div>
        </div>
      </div>
    </main>
  );
}
