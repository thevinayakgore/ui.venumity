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
    <main className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-5">
        <div>
          <h1 className="text-3xl font-bold">Colored Dots by Browser</h1>
          <p className="text-base text-muted-foreground mt-1">
            Each point colored by browser type
          </p>
        </div>
      </div>
      <ChartContainer config={chartConfig} className="h-100 w-full">
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
            strokeWidth={3}
            dot={{ r: 8, strokeWidth: 2 }}
            activeDot={{ r: 12, stroke: "white", strokeWidth: 3 }}
          />
        </LineChart>
      </ChartContainer>
      <div className="grid grid-cols-5 gap-2 w-full">
        {chartData.map((item) => (
          <div key={item.browser} className="text-center">
            <div
              className="w-3 h-3 rounded-full mx-auto mb-1"
              style={{ backgroundColor: item.fill }}
            />
            <span className="text-xs font-medium capitalize">
              {item.browser}
            </span>
            <p className="text-sm font-bold">{item.visitors}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
