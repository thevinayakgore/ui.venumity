"use client";
import { TrendingUp } from "lucide-react";
import { PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 1260, mobile: 570, tablet: 340 },
  { month: "February", desktop: 1150, mobile: 620, tablet: 380 },
  { month: "March", desktop: 1380, mobile: 590, tablet: 420 },
  { month: "April", desktop: 1420, mobile: 650, tablet: 390 },
  { month: "May", desktop: 1550, mobile: 710, tablet: 450 },
  { month: "June", desktop: 1680, mobile: 730, tablet: 480 },
];

// Using the same color palette from the radial bar chart
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(24 100% 55%)", // Orange from Electronics
  },
  mobile: {
    label: "Mobile",
    color: "hsl(220 90% 56%)", // Blue from Clothing
  },
  tablet: {
    label: "Tablet",
    color: "hsl(142 76% 36%)", // Green from Food
  },
} satisfies ChartConfig;

type DeviceKey = "desktop" | "mobile" | "tablet";

export default function ChartRadialStacked() {
  // Calculate totals for each month
  const monthlyTotals = chartData.map((month) => ({
    ...month,
    total: month.desktop + month.mobile + month.tablet,
  }));

  const totalVisitors = monthlyTotals.reduce(
    (acc, month) => acc + month.total,
    0,
  );
  const averagePerMonth = Math.round(totalVisitors / chartData.length);

  // Current month data (June)
  const currentMonth = monthlyTotals[monthlyTotals.length - 1];
  const previousMonth = monthlyTotals[monthlyTotals.length - 2];
  const growthRate = (
    ((currentMonth.total - previousMonth.total) / previousMonth.total) *
    100
  ).toFixed(1);

  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-5">
        <div>
          <h2 className="text-3xl font-semibold">Stacked Radial Chart</h2>
          <p className="text-base mt-1">
            Traffic sources breakdown · January - June 2024
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-orange-500/10 px-4 py-2 rounded-lg border border-orange-500/20">
            <span className="text-xs text-orange-600">Desktop</span>
            <p className="text-lg font-bold text-orange-600">
              {monthlyTotals
                .reduce((acc, m) => acc + m.desktop, 0)
                .toLocaleString()}
            </p>
          </div>
          <div className="bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20">
            <span className="text-xs text-blue-600">Mobile</span>
            <p className="text-lg font-bold text-blue-600">
              {monthlyTotals
                .reduce((acc, m) => acc + m.mobile, 0)
                .toLocaleString()}
            </p>
          </div>
          <div className="bg-green-500/10 px-4 py-2 rounded-lg border border-green-500/20">
            <span className="text-xs text-green-600">Tablet</span>
            <p className="text-lg font-bold text-green-600">
              {monthlyTotals
                .reduce((acc, m) => acc + m.tablet, 0)
                .toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <section className="flex item-start gap-10 p-10 border rounded-2xl w-full">
        {/* Chart */}
        <div className="flex justify-center w-full">
          <ChartContainer config={chartConfig} className="w-full">
            <RadialBarChart
              data={monthlyTotals}
              startAngle={90}
              endAngle={-270}
              innerRadius={80}
              outerRadius={160}
              barSize={24}
            >
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={(value, name) => (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{name}:</span>
                        <span className="font-bold">{value} visitors</span>
                      </div>
                    )}
                  />
                }
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  <tspan
                    x="50%"
                    dy="-20"
                    className="fill-foreground text-4xl font-bold"
                  >
                    {averagePerMonth.toLocaleString()}
                  </tspan>
                  <tspan
                    x="50%"
                    dy="30"
                    className="fill-muted-foreground text-sm"
                  >
                    Avg Monthly
                  </tspan>
                </text>
              </PolarRadiusAxis>

              <RadialBar
                dataKey="desktop"
                stackId="a"
                cornerRadius={5}
                fill="var(--color-desktop)"
                animationDuration={1500}
                animationEasing="ease-out"
              />
              <RadialBar
                dataKey="mobile"
                stackId="a"
                cornerRadius={5}
                fill="var(--color-mobile)"
                animationDuration={1500}
                animationEasing="ease-out"
              />
              <RadialBar
                dataKey="tablet"
                stackId="a"
                cornerRadius={5}
                fill="var(--color-tablet)"
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </RadialBarChart>
          </ChartContainer>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
          {monthlyTotals.map((month) => (
            <div key={month.month} className="bg-card rounded-lg p-4 border">
              <p className="text-sm font-medium mb-2">{month.month}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    Desktop
                  </span>
                  <span className="font-medium">{month.desktop}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Mobile
                  </span>
                  <span className="font-medium">{month.mobile}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Tablet
                  </span>
                  <span className="font-medium">{month.tablet}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between text-xs font-bold">
                  <span>Total</span>
                  <span>{month.total}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Device Distribution */}
      <div className="flex justify-center gap-8 my-6">
        {(Object.keys(chartConfig) as DeviceKey[]).map((key) => {
          const config = chartConfig[key];

          const percentage = Math.round(
            (monthlyTotals.reduce((acc, m) => acc + m[key], 0) /
              totalVisitors) *
              100,
          );

          return (
            <div key={key} className="flex items-center gap-2">
              <div
                className="size-4 rounded-full"
                style={{ backgroundColor: config.color }}
              />
              <span className="text-sm font-medium">{config.label}</span>
              <span className="text-sm text-muted-foreground">
                {percentage}%
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between mb-5 w-full">
        <div className="space-y-1">
          <div className="flex flex-col items-start gap-2 text-sm font-medium leading-none">
            <span>Total Visitors</span>
            <span className="text-2xl font-bold">
              {totalVisitors.toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Across all devices · Last 6 months
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-emerald-600 font-medium">+{growthRate}%</span>
          <TrendingUp className="h-4 w-4 text-emerald-600" />
          <span className="text-muted-foreground">vs last month</span>
        </div>
      </div>

      {/* Additional Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <Card className="bg-foreground/5 backdrop-blur-sm shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-600">
              Desktop
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {monthlyTotals
                .reduce((acc, m) => acc + m.desktop, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {(
                (monthlyTotals.reduce((acc, m) => acc + m.desktop, 0) /
                  totalVisitors) *
                100
              ).toFixed(1)}
              % of total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-foreground/5 backdrop-blur-sm shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">
              Mobile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {monthlyTotals
                .reduce((acc, m) => acc + m.mobile, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {(
                (monthlyTotals.reduce((acc, m) => acc + m.mobile, 0) /
                  totalVisitors) *
                100
              ).toFixed(1)}
              % of total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-foreground/5 backdrop-blur-sm shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">
              Tablet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {monthlyTotals
                .reduce((acc, m) => acc + m.tablet, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {(
                (monthlyTotals.reduce((acc, m) => acc + m.tablet, 0) /
                  totalVisitors) *
                100
              ).toFixed(1)}
              % of total
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
