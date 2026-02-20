"use client";
import { TrendingUp } from "lucide-react";
import { RadialBar, RadialBarChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(24 100% 55%)",
  },
  safari: {
    label: "Safari",
    color: "hsl(220 90% 56%)",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(142 76% 36%)",
  },
  edge: {
    label: "Edge",
    color: "hsl(45 93% 58%)",
  },
} satisfies ChartConfig;

const getBrowserColor = (key: string) => {
  const entry = chartConfig[key as keyof typeof chartConfig];
  return "color" in entry ? entry.color : undefined;
};

export default function BasicRadialChart() {
  const totalVisitors = chartData.reduce((acc, item) => acc + item.visitors, 0);

  return (
    <main className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold">Simple Radial Chart</h1>
        <p className="text-muted-foreground mt-2">
          Browser distribution with radial bars
        </p>
      </div>

      <section className="flex items-start gap-10 w-full h-full">
        {/* Chart Container */}
        <ChartContainer config={chartConfig} className="w-1/2 h-100">
          <RadialBarChart data={chartData} innerRadius={50} outerRadius={200}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="browser" />}
            />
            <RadialBar
              dataKey="visitors"
              background
              cornerRadius={8}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </RadialBarChart>
        </ChartContainer>

        {/* Stats */}
        <div className="flex flex-wrap items-start gap-3 w-1/2">
          {chartData.map((item) => (
            <div
              key={item.browser}
              className="bg-background/80 backdrop-blur-sm border rounded-lg p-4 w-40"
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="size-5 rounded-full"
                  style={{
                    backgroundColor: getBrowserColor(item.browser),
                  }}
                />
                <span className="text-xs font-medium capitalize">
                  {item.browser}
                </span>
              </div>
              <p
                className="text-lg font-bold"
                style={{
                  color: getBrowserColor(item.browser),
                }}
              >
                {item.visitors}
              </p>
              <p className="text-xs text-muted-foreground">
                {((item.visitors / totalVisitors) * 100).toFixed(1)}%
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Stats */}
      <div className="w-full mt-8 pt-6 border-t">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">
              {totalVisitors.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Visitors</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-emerald-600 font-medium">+5.2%</span>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            <span className="text-muted-foreground ml-2">vs last month</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          January - June 2024 · Showing total visitors for the last 6 months
        </p>
      </div>
    </main>
  );
}
