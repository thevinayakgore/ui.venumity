"use client";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
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
    color: "#f59e0b", // amber-500
  },
  mobile: {
    label: "Mobile",
    color: "#6366f1", // indigo-500
  },
} satisfies ChartConfig;

export default function ChartLineLabel() {
  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-5">
        <div>
          <h1 className="text-3xl font-bold">Line Chart with Labels</h1>
          <p className="text-base text-muted-foreground mt-1">
            Value labels on data points · January – June
          </p>
        </div>
      </div>
      <ChartContainer config={chartConfig} className="h-100 w-full">
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{ top: 40, left: 12, right: 12, bottom: 20 }}
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
            content={<ChartTooltipContent indicator="line" />}
          />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={3}
            dot={{ fill: "var(--color-desktop)", r: 6 }}
            activeDot={{ r: 8 }}
          >
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground font-bold"
              fontSize={12}
            />
          </Line>
          <Line
            dataKey="mobile"
            type="natural"
            stroke="var(--color-mobile)"
            strokeWidth={3}
            dot={{ fill: "var(--color-mobile)", r: 6 }}
            activeDot={{ r: 8 }}
          >
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground font-bold"
              fontSize={12}
            />
          </Line>
        </LineChart>
      </ChartContainer>
      <div className="flex items-center justify-between w-full">
        <div className="space-y-1">
          <p className="text-sm font-medium">Values displayed above points</p>
          <p className="text-xs text-muted-foreground">
            Labels show exact numbers
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-emerald-600 font-medium">+22.4%</span>
          <TrendingUp className="h-4 w-4 text-emerald-600" />
        </div>
      </div>
    </main>
  );
}
