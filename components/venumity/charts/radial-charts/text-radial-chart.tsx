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
  { goal: "completed", value: 85, fill: "var(--color-completed)" },
  { goal: "remaining", value: 15, fill: "var(--color-remaining)" },
];

const chartConfig = {
  value: {
    label: "Progress",
  },
  completed: {
    label: "Completed",
    color: "hsl(142 76% 36%)",
  },
  remaining: {
    label: "Remaining",
    color: "hsl(215 20% 65%)",
  },
} satisfies ChartConfig;

export default function ChartRadialText() {
  return (
    <main className="p-6 md:p-10">
      <section className="flex item-center justify-between w-full">
        {/* Header */}
        <div className="w-full">
          <h1 className="text-4xl font-semibold">Radial Chart with Text</h1>
          <p className="text-muted-foreground mt-2">
            Progress tracking with center label
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-emerald-600" />
              <span className="font-medium">Completed</span>
            </div>
            <p className="text-2xl font-bold text-emerald-600">85%</p>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-gray-400" />
              <span className="font-medium">Remaining</span>
            </div>
            <p className="text-2xl font-bold text-gray-400">15%</p>
          </div>
        </div>
      </section>

      {/* Chart Container */}
      <ChartContainer config={chartConfig} className="max-h-120 w-full">
        <RadialBarChart
          data={chartData}
          innerRadius={100}
          outerRadius={200}
          startAngle={90}
          endAngle={-270}
        >
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel nameKey="goal" />}
          />
          <RadialBar
            dataKey="value"
            background
            cornerRadius={8}
            animationDuration={1500}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-4xl font-bold"
          >
            85%
          </text>
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-muted-foreground text-sm"
          >
            Complete
          </text>
        </RadialBarChart>
      </ChartContainer>

      {/* Footer */}
      <div className="w-full mt-8 pt-6 border-t text-center">
        <div className="flex items-center justify-center gap-2">
          <TrendingUp className="size-5 text-emerald-600" />
          <span className="text-sm font-medium">
            Project progress is on track
          </span>
        </div>
        <p className="text-xs opacity-80 mt-1">Target completion : Q3 2024</p>
      </div>
    </main>
  );
}
