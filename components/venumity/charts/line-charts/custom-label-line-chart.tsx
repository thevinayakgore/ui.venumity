"use client";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart } from "recharts";
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

// Simple icon map (you can replace emojis with SVGs or Lucide icons)
const browserIcons: Record<string, string> = {
  chrome: "🌐",
  safari: "🧭",
  firefox: "🦊",
  edge: "🌊",
  other: "⋯",
};

export default function ChartLineLabelCustom() {
  return (
    <main className="p-4 sm:p-6 md:p-10 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Custom Browser Labels
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Browser names as data labels
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
          margin={{ top: 40, left: 24, right: 24, bottom: 24 }}
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
            dot={({ payload, cx, cy }) => {
              const icon = browserIcons[payload.browser] ?? "•";
              return (
                <g key={payload.browser}>
                  <circle
                    r={5}
                    cx={cx}
                    cy={cy}
                    fill={payload.fill}
                    stroke="white"
                    strokeWidth={2}
                  />
                  <text
                    x={cx}
                    y={cy}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={10}
                    fill="white"
                    style={{ pointerEvents: "none" }}
                  >
                    {icon}
                  </text>
                </g>
              );
            }}
            activeDot={{ r: 6 }}
          >
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground font-medium"
              fontSize={12}
              dataKey="browser"
              formatter={(value) => {
                const key = String(value) as keyof typeof chartConfig;
                return chartConfig[key]?.label ?? String(value ?? "");
              }}
            />
          </Line>
        </LineChart>
      </ChartContainer>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full mt-4">
        <div className="space-y-1">
          <p className="text-xs sm:text-sm font-medium">
            Browser names as labels
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            Custom formatting applied
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="text-emerald-600 font-medium">Chrome leads</span>
          <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600" />
        </div>
      </div>
    </main>
  );
}
