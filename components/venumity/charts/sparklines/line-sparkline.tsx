"use client";
import { useMemo, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, Tooltip } from "recharts";

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "#8b5cf6",
  },
  sales: {
    label: "Sales",
    color: "#ec4899",
  },
} satisfies ChartConfig;

const lineSparklineData = [
  { day: "Mon", visitors: 1200, sales: 4500 },
  { day: "Tue", visitors: 1350, sales: 5200 },
  { day: "Wed", visitors: 1100, sales: 4800 },
  { day: "Thu", visitors: 1400, sales: 6100 },
  { day: "Fri", visitors: 1550, sales: 7200 },
  { day: "Sat", visitors: 1700, sales: 8900 },
  { day: "Sun", visitors: 1600, sales: 8100 },
];

interface TooltipPayloadItem {
  name: "visitors" | "sales";
  value: number;
  color: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function formatValue(name: TooltipPayloadItem["name"], value: number) {
  if (name === "sales") {
    return `$${value.toLocaleString()}`;
  }

  return value.toLocaleString();
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border/60 bg-background p-3 shadow-lg">
      <p className="mb-2 text-sm font-semibold text-foreground">{label}</p>

      <div className="space-y-1.5">
        {payload.map((entry) => (
          <div
            key={entry.name}
            className="flex items-center justify-between gap-5 text-xs"
          >
            <div className="flex items-center gap-2">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />

              <span className="font-semibold capitalize text-foreground/50">
                {entry.name}
              </span>
            </div>

            <span className="font-mono text-sm tracking-tight">
              {formatValue(entry.name, entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LineSparkline() {
  const [activeTab, setActiveTab] = useState<"visitors" | "sales">("visitors");

  const firstDay = lineSparklineData[0];
  const lastDay = lineSparklineData[lineSparklineData.length - 1];

  const totalVisitors = useMemo(
    () => lineSparklineData.reduce((total, item) => total + item.visitors, 0),
    [],
  );

  const totalSales = useMemo(
    () => lineSparklineData.reduce((total, item) => total + item.sales, 0),
    [],
  );

  const visitorChange = useMemo(
    () => ((lastDay.visitors - firstDay.visitors) / firstDay.visitors) * 100,
    [firstDay.visitors, lastDay.visitors],
  );

  const salesChange = useMemo(
    () => ((lastDay.sales - firstDay.sales) / firstDay.sales) * 100,
    [firstDay.sales, lastDay.sales],
  );

  const activeValue = activeTab === "visitors" ? visitorChange : salesChange;

  const TrendIcon =
    activeValue > 0 ? TrendingUp : activeValue < 0 ? TrendingDown : Minus;

  const trendColor =
    activeValue > 0
      ? "text-green-600"
      : activeValue < 0
        ? "text-red-600"
        : "text-yellow-600";

  return (
    <div className="p-5 md:p-10 w-full">
      <div className="flex flex-col border rounded-2xl overflow-hidden m-auto max-w-lg w-full">
        {/* Header */}
        <div className="p-5">
          <h2 className="text-3xl font-semibold">Line Sparkline</h2>

          <p className="mt-1 text-sm text-foreground/50">
            Daily trend visualization for visitors and sales
          </p>
        </div>

        {/* Metric tabs */}
        <div className="grid grid-cols-2 gap-2 px-5">
          <button
            type="button"
            onClick={() => setActiveTab("visitors")}
            className={`rounded-xl border p-4 text-left transition-colors ${
              activeTab === "visitors"
                ? "border-purple-500/40 bg-purple-500/10"
                : "bg-foreground/5 hover:bg-foreground/10"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Visitors</span>
              <TrendIcon className={`size-4 ${trendColor}`} />
            </div>

            <div className="mt-2 text-2xl font-medium">
              {totalVisitors.toLocaleString()}
            </div>

            <div className="mt-1 flex items-center gap-2 text-xs text-foreground/50 md:text-sm">
              <span className="flex items-center text-green-500">
                {visitorChange >= 0 ? "+" : ""}
                {visitorChange.toFixed(1)}%
              </span>
              week over week
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("sales")}
            className={`rounded-xl border p-4 text-left transition-colors ${
              activeTab === "sales"
                ? "border-pink-500/40 bg-pink-500/10"
                : "bg-foreground/5 hover:bg-foreground/10"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Sales</span>
              <TrendIcon className={`size-4 ${trendColor}`} />
            </div>

            <div className="mt-2 text-2xl font-medium">
              ${(totalSales / 1000).toFixed(1)}K
            </div>

            <div className="mt-1 flex items-center gap-2 text-xs text-foreground/50 md:text-sm">
              <span className="flex items-center text-green-500">
                {salesChange >= 0 ? "+" : ""}
                {salesChange.toFixed(1)}%
              </span>
              week over week
            </div>
          </button>
        </div>

        {/* Simple line chart with point dots */}
        <ChartContainer config={chartConfig} className="h-40 w-full border-0!">
          <LineChart
            data={lineSparklineData}
            margin={{ top: 20, right: 0, left: -60, bottom: -30 }}
          >
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={false}
            />

            <YAxis tickLine={false} axisLine={false} tick={false} width={0} />

            <Tooltip
              cursor={{
                stroke: "currentColor",
                strokeOpacity: 0.15,
              }}
              content={<CustomTooltip />}
            />

            <Line
              type="monotone"
              dataKey="visitors"
              name="visitors"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{
                r: 3.5,
                fill: "#8b5cf6",
                stroke: "hsl(var(--background))",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: "#8b5cf6",
                stroke: "hsl(var(--background))",
                strokeWidth: 2,
              }}
              hide={activeTab !== "visitors"}
              animationDuration={700}
            />

            <Line
              type="monotone"
              dataKey="sales"
              name="sales"
              stroke="#ec4899"
              strokeWidth={2}
              dot={{
                r: 3.5,
                fill: "#ec4899",
                stroke: "hsl(var(--background))",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: "#ec4899",
                stroke: "hsl(var(--background))",
                strokeWidth: 2,
              }}
              hide={activeTab !== "sales"}
              animationDuration={700}
            />
          </LineChart>
        </ChartContainer>

        {/* Footer legend */}
        <div className="flex w-full items-center justify-between overflow-hidden border-t bg-foreground/5 p-5">
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5 text-xs">
              <span className="size-2 rounded-full bg-purple-500" />
              <span>Visitors</span>
            </span>

            <span className="flex items-center gap-1.5 text-xs">
              <span className="size-2 rounded-full bg-pink-500" />
              <span>Sales</span>
            </span>
          </div>

          <div className="text-xs">
            {Math.max(
              ...lineSparklineData.map((item) => item.visitors),
            ).toLocaleString()}{" "}
            peak visitors
          </div>
        </div>
      </div>
    </div>
  );
}
