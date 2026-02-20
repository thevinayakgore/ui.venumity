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

export default function ChartLineLabelCustom() {
  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-5">
        <div>
          <h1 className="text-3xl font-bold">Custom Browser Labels</h1>
          <p className="text-base text-muted-foreground mt-1">
            Browser names as data labels
          </p>
        </div>
      </div>
      <ChartContainer config={chartConfig} className="h-100 w-full">
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
            strokeWidth={3}
            dot={({ payload, ...props }) => (
              <circle
                key={payload.browser}
                r={6}
                cx={props.cx}
                cy={props.cy}
                fill={payload.fill}
                stroke="white"
                strokeWidth={2}
              />
            )}
            activeDot={{ r: 8 }}
          >
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground font-medium"
              fontSize={12}
              dataKey="browser"
              formatter={(value: keyof typeof chartConfig) =>
                chartConfig[value]?.label
              }
            />
          </Line>
        </LineChart>
      </ChartContainer>
      <div className="flex items-center justify-between w-full">
        <div className="space-y-1">
          <p className="text-sm font-medium">Browser names as labels</p>
          <p className="text-xs text-muted-foreground">
            Custom formatting applied
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-emerald-600 font-medium">Chrome leads</span>
          <TrendingUp className="h-4 w-4 text-emerald-600" />
        </div>
      </div>
    </main>
  );
}
