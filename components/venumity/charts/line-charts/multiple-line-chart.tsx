"use client";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80, tablet: 45 },
  { month: "February", desktop: 305, mobile: 200, tablet: 78 },
  { month: "March", desktop: 237, mobile: 120, tablet: 92 },
  { month: "April", desktop: 73, mobile: 190, tablet: 64 },
  { month: "May", desktop: 209, mobile: 130, tablet: 88 },
  { month: "June", desktop: 214, mobile: 140, tablet: 71 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#8b5cf6", // violet-500
  },
  mobile: {
    label: "Mobile",
    color: "#f97316", // orange-500
  },
  tablet: {
    label: "Tablet",
    color: "#06b6d4", // cyan-500
  },
} satisfies ChartConfig;

export default function ChartLineMultiple() {
  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-5 w-full">
        <div>
          <h1 className="text-3xl font-bold">Multiple Line Chart</h1>
          <p className="text-base text-muted-foreground mt-1">
            Device comparison · January – June 
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-violet-500/10 px-3 py-2 rounded-md w-30">
            <span className="text-xs text-violet-600">Desktop</span>
            <p className="text-sm font-bold text-violet-600">1,224</p>
          </div>
          <div className="bg-orange-500/10 px-3 py-2 rounded-md w-30">
            <span className="text-xs text-orange-600">Mobile</span>
            <p className="text-sm font-bold text-orange-600">860</p>
          </div>
          <div className="bg-cyan-500/10 px-3 py-2 rounded-md w-30">
            <span className="text-xs text-cyan-600">Tablet</span>
            <p className="text-sm font-bold text-cyan-600">438</p>
          </div>
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
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey="desktop"
            type="monotone"
            stroke="var(--color-desktop)"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            dataKey="mobile"
            type="monotone"
            stroke="var(--color-mobile)"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            dataKey="tablet"
            type="monotone"
            stroke="var(--color-tablet)"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
      <div className="flex items-center justify-between w-full">
        <div className="space-y-1">
          <div className="flex flex-col gap-1 text-sm font-medium leading-none">
            <span>Total</span>
            <span className="text-2xl font-bold">2,522</span>
          </div>
          <p className="text-xs text-muted-foreground">Across all devices</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-emerald-600 font-medium">+18.5%</span>
          <TrendingUp className="h-4 w-4 text-emerald-600" />
          <span className="text-muted-foreground">YoY growth</span>
        </div>
      </div>
    </main>
  );
}
