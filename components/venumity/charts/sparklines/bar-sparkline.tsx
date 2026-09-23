"use client";
import { TrendingUp, Calendar, Activity } from "lucide-react";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  value: {
    label: "Visitors",
    color: "var(--color-green-500)",
  },
} satisfies ChartConfig;

const barSparklineData = [
  { day: "Mon", value: 4000, fullDay: "Monday" },
  { day: "Tue", value: 3000, fullDay: "Tuesday" },
  { day: "Wed", value: 5000, fullDay: "Wednesday" },
  { day: "Thu", value: 4500, fullDay: "Thursday" },
  { day: "Fri", value: 6000, fullDay: "Friday" },
  { day: "Sat", value: 5500, fullDay: "Saturday" },
  { day: "Sun", value: 7000, fullDay: "Sunday" },
];

interface TooltipPayloadItem {
  value?: number;
  payload?: {
    day: string;
    value: number;
    fullDay: string;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

function formatCompactNumber(value: number) {
  return `${(value / 1000).toFixed(1)}K`;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0]?.payload;

  if (!item) {
    return null;
  }

  const peak = Math.max(...barSparklineData.map((data) => data.value));
  const percentageOfPeak = Math.round((item.value / peak) * 100);

  return (
    <div className="min-w-40 rounded-lg border border-border/60 bg-background p-3 shadow-lg">
      <p className="mb-1 text-sm font-medium">{item.fullDay}</p>
      <p className="text-lg font-bold text-green-500">
        {formatNumber(item.value)} visitors
      </p>
      <p className="mt-1 text-xs text-foreground/50">
        {percentageOfPeak}% of peak
      </p>
    </div>
  );
}

export default function BarSparklines() {
  const total = barSparklineData.reduce(
    (totalValue, item) => totalValue + item.value,
    0,
  );
  const peak = Math.max(...barSparklineData.map((item) => item.value));
  const lowest = Math.min(...barSparklineData.map((item) => item.value));
  const peakDay =
    barSparklineData.find((item) => item.value === peak)?.fullDay ?? "—";
  const bestDay = barSparklineData.reduce((best, item) =>
    item.value > best.value ? item : best,
  );
  const previousWeekTotal = total * 0.92;
  const growth =
    previousWeekTotal > 0
      ? ((total - previousWeekTotal) / previousWeekTotal) * 100
      : 0;

  return (
    <div className="p-5 md:p-10 w-full">
      <div className="flex flex-col border rounded-2xl overflow-hidden m-auto max-w-lg w-full">
        <div className="p-5">
          <h2 className="text-3xl font-semibold">Bar Sparkline</h2>
          <p className="mt-1 text-sm text-foreground/50">
            Daily activity with individual bar values
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-5">
          <div className="p-4 bg-foreground/5 border rounded-xl">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Activity className="size-4" />
              <span className="text-xs">Peak Day</span>
            </div>
            <div className="text-xl font-medium">{peakDay}</div>
            <div className="text-xs text-foreground/50">
              {formatNumber(peak)} visitors
            </div>
          </div>
          <div className="p-4 bg-foreground/5 border rounded-xl">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <TrendingUp className="size-4" />
              <span className="text-xs">Growth</span>
            </div>
            <div className="text-xl font-medium text-green-500">
              {growth >= 0 ? "+" : ""}
              {growth.toFixed(1)}%
            </div>
            <div className="text-xs text-foreground/50">vs last week</div>
          </div>
          <div className="p-4 bg-foreground/5 border rounded-xl">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Calendar className="size-4" />
              <span className="text-xs">Best Day</span>
            </div>
            <div className="text-xl font-medium">{bestDay.fullDay}</div>
            <div className="text-xs text-foreground/50">
              {formatNumber(bestDay.value)} visitors
            </div>
          </div>
        </div>
        <div className="h-40 w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart
              data={barSparklineData}
              margin={{
                top: 20,
                right: 0,
                left: -60,
                bottom: -30,
              }}
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="var(--color-green-500)" />
                  <stop offset="100%" stopColor="var(--color-green-400)" />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={false}
              />
              <YAxis tickLine={false} axisLine={false} tick={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                barSize={40}
              />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="grid grid-cols-7 gap-2 p-5 border-t">
          {barSparklineData.map((item) => (
            <div key={item.day} className="text-center">
              <div className="mb-1 text-xs font-medium">{item.day}</div>
              <div className="relative h-10 overflow-hidden rounded-sm bg-muted">
                <div
                  className="absolute bottom-0 w-full bg-linear-to-t from-green-500 to-green-400 transition-all duration-500"
                  style={{
                    height: `${(item.value / peak) * 100}%`,
                    opacity: 0.8,
                  }}
                />
              </div>
              <div className="mt-1 text-xs text-foreground/50">
                {formatCompactNumber(item.value)}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center items-start justify-between gap-5 p-5 border-y">
          <div className="text-sm">
            <span className="text-foreground/50">Week total: </span>
            <span className="font-bold">{formatCompactNumber(total)}</span>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-green-500" />
              <span className="text-xs">Current week</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-muted-foreground/30" />
              <span className="text-xs">Last week</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-5 bg-foreground/5 text-xs text-foreground/50">
          <span>{formatNumber(lowest)} lowest visitors</span>
          <span>{formatNumber(peak)} highest visitors</span>
        </div>
      </div>
    </div>
  );
}
