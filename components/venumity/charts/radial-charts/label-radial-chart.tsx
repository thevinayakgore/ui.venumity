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
  { month: "Jan", revenue: 186, fill: "var(--color-jan)" },
  { month: "Feb", revenue: 305, fill: "var(--color-feb)" },
  { month: "Mar", revenue: 237, fill: "var(--color-mar)" },
  { month: "Apr", revenue: 273, fill: "var(--color-apr)" },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
  },
  jan: {
    label: "January",
    color: "hsl(24 100% 55%)",
  },
  feb: {
    label: "February",
    color: "hsl(220 90% 56%)",
  },
  mar: {
    label: "March",
    color: "hsl(142 76% 36%)",
  },
  apr: {
    label: "April",
    color: "hsl(45 93% 58%)",
  },
} satisfies ChartConfig;

const getBrowserColor = (key: string) => {
  const entry = chartConfig[key as keyof typeof chartConfig];
  return "color" in entry ? entry.color : undefined;
};

export default function ChartRadialLabel() {
  const totalRevenue = chartData.reduce((acc, item) => acc + item.revenue, 0);
  const bestMonth = chartData.reduce((max, item) =>
    item.revenue > max.revenue ? item : max,
  );

  return (
    <main className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold">Radial Chart with Labels</h1>
        <p className="text-muted-foreground mt-2">
          Monthly revenue with value labels
        </p>
      </div>

      <section className="flex items-center justify-center m-auto gap-10 w-full h-full">
        {/* Chart Container */}
          <ChartContainer config={chartConfig} className="h-100 w-1/2">
            <RadialBarChart
              data={chartData}
              startAngle={90}
              endAngle={-270}
              innerRadius={50}
              outerRadius={200}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel nameKey="month" />}
              />
              <RadialBar
                dataKey="revenue"
                background
                cornerRadius={8}
                label={{
                  position: "insideStart",
                  fill: "#fff",
                  fontSize: 14,
                  fontWeight: 500,
                }}
                animationDuration={1500}
              />
            </RadialBarChart>
          </ChartContainer>

        {/* Summary Cards */}
        <div className="flex flex-col gap-3 w-1/2 h-full">
          <div className="bg-linear-to-tl from-purple-500 to-pink-500 rounded-lg p-5 text-white">
            <p className="text-sm">Total Revenue</p>
            <p className="text-2xl font-bold">${totalRevenue}k</p>
          </div>
          <div className="bg-card rounded-lg p-5 border">
            <p className="text-xs text-muted-foreground mb-1">Best Month</p>
            <p
              className="text-lg font-bold"
              style={{
                color: getBrowserColor(
                  bestMonth.month.toLowerCase().slice(0, 3),
                ),
              }}
            >
              {bestMonth.month}
            </p>
            <p className="text-sm">${bestMonth.revenue}k</p>
          </div>
          <div className="bg-card rounded-lg p-5 border">
            <p className="text-xs text-muted-foreground mb-1">Average</p>
            <p className="text-lg font-bold">
              ${Math.round(totalRevenue / chartData.length)}k
            </p>
          </div>
          <div className="bg-card rounded-lg p-5 border">
            <p className="text-xs text-muted-foreground mb-1">Growth</p>
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold text-emerald-600">+8.2%</span>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Month Legends */}
      <div className="flex flex-wrap gap-2 mt-10 w-full">
        {chartData.map((item) => (
          <div
            key={item.month}
            className="flex items-center gap-2 pr-4 p-2 leading-none border rounded-full w-fit"
          >
            <div
              className="size-3 rounded-full"
              style={{
                backgroundColor: getBrowserColor(
                  item.month.toLowerCase().slice(0, 3),
                ),
              }}
            />
            <span className="text-xs">{item.month}</span>
            <span className="text-xs font-bold">${item.revenue}k</span>
          </div>
        ))}
      </div>
    </main>
  );
}
