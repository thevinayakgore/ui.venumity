"use client";
import { PolarGrid, RadialBar, RadialBarChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { name: "Q1", value: 185, fill: "var(--color-q1)" },
  { name: "Q2", value: 100, fill: "var(--color-q2)" },
  { name: "Q3", value: 128, fill: "var(--color-q3)" },
  { name: "Q4", value: 135, fill: "var(--color-q4)" },
];

const chartConfig = {
  value: {
    label: "Value",
  },
  q1: {
    label: "Q1",
    color: "hsl(24 100% 55%)",
  },
  q2: {
    label: "Q2",
    color: "hsl(220 90% 56%)",
  },
  q3: {
    label: "Q3",
    color: "hsl(142 76% 36%)",
  },
  q4: {
    label: "Q4",
    color: "hsl(45 93% 58%)",
  },
} satisfies ChartConfig;

const getBrowserColor = (key: string) => {
  const entry = chartConfig[key as keyof typeof chartConfig];
  return "color" in entry ? entry.color : undefined;
};

export default function ChartRadialGrid() {
  const total = chartData.reduce((acc, item) => acc + item.value, 0);
  const bestQuarter = chartData.reduce((max, item) =>
    item.value > max.value ? item : max,
  );

  return (
    <main className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold">Radial Chart with Grid</h1>
        <p className="text-muted-foreground mt-2">
          Quarterly performance with grid lines
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 w-full">
        {chartData.map((item) => (
          <div
            key={item.name}
            className="bg-foreground/5 backdrop-blur-sm rounded-lg p-4 border shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="size-5 rounded-full"
                style={{
                  backgroundColor: getBrowserColor(item.name.toLowerCase()),
                }}
              />
              <span className="font-medium">{item.name}</span>
            </div>
            <p
              className="text-2xl font-bold"
              style={{ color: getBrowserColor(item.name.toLowerCase()) }}
            >
              {item.value}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {((item.value / total) * 100).toFixed(1)}% of total
            </p>
          </div>
        ))}
      </div>

      {/* Chart Container */}
      <ChartContainer
        config={chartConfig}
        className="bg-transparent! max-h-120 w-full"
      >
        <RadialBarChart data={chartData} innerRadius={50} outerRadius={200}>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel nameKey="name" />}
          />
          <PolarGrid
            gridType="polygon"
            polarRadius={[60, 100, 140, 180, 220]}
          />
          <RadialBar
            dataKey="value"
            background
            cornerRadius={8}
            animationDuration={1500}
          />
        </RadialBarChart>
      </ChartContainer>

      {/* Summary */}
      <div className="w-full mt-8 pt-6 border-t">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Annual Value</p>
            <p className="text-3xl font-bold">{total.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Best Quarter</p>
            <p
              className="text-xl font-bold"
              style={{
                color: getBrowserColor(bestQuarter.name.toLowerCase()),
              }}
            >
              {bestQuarter.name}: {bestQuarter.value}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
