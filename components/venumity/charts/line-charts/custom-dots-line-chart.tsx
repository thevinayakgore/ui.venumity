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
    <main className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-5">
        <div>
          <h1 className="text-3xl font-bold">Custom Dot Icons</h1>
          <p className="text-base text-muted-foreground mt-1">
            Git commit style markers · January – June
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
            dot={({ cx, cy, payload }) => (
              <GitCommitVertical
                key={payload.month}
                x={cx - 12}
                y={cy - 12}
                width={24}
                height={24}
                fill="white"
                stroke="var(--color-desktop)"
                strokeWidth={2}
              />
            )}
          />
          <Line
            dataKey="mobile"
            type="natural"
            stroke="var(--color-mobile)"
            strokeWidth={3}
            dot={({ cx, cy, payload }) => (
              <GitCommitVertical
                key={payload.month}
                x={cx - 12}
                y={cy - 12}
                width={24}
                height={24}
                fill="white"
                stroke="var(--color-mobile)"
                strokeWidth={2}
              />
            )}
          />
        </LineChart>
      </ChartContainer>
      <div className="flex items-center justify-between w-full">
        <div className="space-y-1">
          <p className="text-sm font-medium">Custom SVG markers</p>
          <p className="text-xs text-muted-foreground">
            Each point is a Git commit icon
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <GitCommitVertical
              className="w-4 h-4"
              style={{ color: chartConfig.desktop.color }}
            />
            <span className="text-xs">Desktop</span>
          </div>
          <div className="flex items-center gap-1">
            <GitCommitVertical
              className="w-4 h-4"
              style={{ color: chartConfig.mobile.color }}
            />
            <span className="text-xs">Mobile</span>
          </div>
        </div>
      </div>
    </main>
  );
}
