"use client";
import { CartesianGrid, Line, LineChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "#3b82f6" },
  { browser: "safari", visitors: 200, fill: "#10b981" },
  { browser: "firefox", visitors: 187, fill: "#f97316" },
  { browser: "edge", visitors: 173, fill: "#8b5cf6" },
  { browser: "other", visitors: 90, fill: "#ef4444" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "#64748b",
  },
  chrome: { label: "Chrome", color: "#3b82f6" },
  safari: { label: "Safari", color: "#10b981" },
  firefox: { label: "Firefox", color: "#f97316" },
  edge: { label: "Edge", color: "#8b5cf6" },
  other: { label: "Other", color: "#ef4444" },
} satisfies ChartConfig;

export default function ChartLineDotsColors() {
  return (
    <main className="p-4 sm:p-6 md:p-10 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Colored Dots by Browser
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Each point colored by browser type
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
          margin={{ top: 24, left: 24, right: 24, bottom: 24 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-foreground/15!"
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                indicator="line"
                nameKey="visitors"
                hideLabel
              />
            }
          />
          <Line
            dataKey="visitors"
            type="natural"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={({ cx, cy, payload }) => {
              if (cx == null || cy == null) return null;
              return (
                <circle
                  key={payload.browser}
                  cx={cx}
                  cy={cy}
                  r={6}
                  fill={payload.fill}
                  stroke="white"
                  strokeWidth={2}
                />
              );
            }}
            activeDot={{ r: 8, stroke: "white", strokeWidth: 2 }}
          />
        </LineChart>
      </ChartContainer>

      {/* Legend */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-2 w-full mt-4">
        {chartData.map((item) => (
          <div key={item.browser} className="text-center">
            <div
              className="w-3 h-3 rounded-full mx-auto mb-1"
              style={{ backgroundColor: item.fill }}
            />
            <span className="text-[10px] sm:text-xs font-medium capitalize">
              {item.browser}
            </span>
            <p className="text-xs sm:text-sm font-bold">{item.visitors}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
