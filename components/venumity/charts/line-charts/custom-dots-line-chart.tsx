"use client";
import { GitCommitVertical } from "lucide-react";
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
    color: "#a855f7", // purple-500
  },
  mobile: {
    label: "Mobile",
    color: "#ec4899", // pink-500
  },
} satisfies ChartConfig;

export default function ChartLineDotsCustom() {
  return (
    <main className="p-4 sm:p-6 md:p-10 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Custom Dot Icons</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Git commit style markers · January – June
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

          {/* Desktop line */}
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2.5}
            dot={({ cx, cy, payload }) => {
              if (cx == null || cy == null) return null;
              return (
                <GitCommitVertical
                  key={`desktop-${payload.month}`}
                  x={cx - 9}
                  y={cy - 9}
                  width={18}
                  height={18}
                  fill="white"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                />
              );
            }}
            activeDot={{ r: 6 }}
          />

          {/* Mobile line */}
          <Line
            dataKey="mobile"
            type="natural"
            stroke="var(--color-mobile)"
            strokeWidth={2.5}
            dot={({ cx, cy, payload }) => {
              if (cx == null || cy == null) return null;
              return (
                <GitCommitVertical
                  key={`mobile-${payload.month}`}
                  x={cx - 9}
                  y={cy - 9}
                  width={18}
                  height={18}
                  fill="white"
                  stroke="var(--color-mobile)"
                  strokeWidth={2}
                />
              );
            }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full mt-4">
        <div className="space-y-1">
          <p className="text-xs sm:text-sm font-medium">Custom SVG markers</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            Each point is a Git commit icon
          </p>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5">
            <GitCommitVertical
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              style={{ color: chartConfig.desktop.color }}
            />
            <span className="text-[10px] sm:text-xs">Desktop</span>
          </div>

          <div className="flex items-center gap-1.5">
            <GitCommitVertical
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              style={{ color: chartConfig.mobile.color }}
            />
            <span className="text-[10px] sm:text-xs">Mobile</span>
          </div>
        </div>
      </div>
    </main>
  );
}
