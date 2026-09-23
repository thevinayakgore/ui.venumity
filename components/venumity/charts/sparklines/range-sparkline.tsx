"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  min: {
    label: "Minimum",
    color: "#3b82f6",
  },
  max: {
    label: "Maximum",
    color: "#3b82f6",
  },
  avg: {
    label: "Average",
    color: "#06b6d4",
  },
} satisfies ChartConfig;

const rangeData = [
  { hour: "00:00", min: 45, max: 78, avg: 62, volatility: 33 },
  { hour: "01:00", min: 42, max: 75, avg: 59, volatility: 33 },
  { hour: "02:00", min: 40, max: 82, avg: 61, volatility: 42 },
  { hour: "03:00", min: 55, max: 95, avg: 75, volatility: 40 },
  { hour: "04:00", min: 60, max: 105, avg: 83, volatility: 45 },
  { hour: "05:00", min: 58, max: 98, avg: 78, volatility: 40 },
  { hour: "06:00", min: 62, max: 112, avg: 87, volatility: 50 },
  { hour: "07:00", min: 70, max: 125, avg: 98, volatility: 55 },
  { hour: "08:00", min: 75, max: 135, avg: 105, volatility: 60 },
  { hour: "09:00", min: 80, max: 145, avg: 113, volatility: 65 },
  { hour: "10:00", min: 78, max: 142, avg: 110, volatility: 64 },
  { hour: "11:00", min: 72, max: 130, avg: 101, volatility: 58 },
];

type TooltipPayloadItem = {
  payload?: {
    hour: string;
    min: number;
    max: number;
    avg: number;
    volatility: number;
  };
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayloadItem[];
};

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const data = payload[0]?.payload;

  if (!data) {
    return null;
  }

  return (
    <div className="rounded-lg border border-border/60 bg-background/95 p-3 shadow-lg backdrop-blur-sm">
      <p className="mb-2 text-sm font-medium">{data.hour}</p>
      <div className="space-y-1">
        <p className="text-xs">Min: {data.min}</p>
        <p className="text-xs font-bold text-blue-600">Avg: {data.avg}</p>
        <p className="text-xs">Max: {data.max}</p>
        <p className="text-xs text-foreground/50">
          Range: {data.max - data.min}
        </p>
        <p className="text-xs text-cyan-600">Volatility: {data.volatility}%</p>
      </div>
    </div>
  );
}

export default function RangeSparkline() {
  const peakHour = rangeData.reduce((max, item) =>
    item.avg > max.avg ? item : max,
  );

  const globalMax = Math.max(...rangeData.map((item) => item.max));
  const globalMin = Math.min(...rangeData.map((item) => item.min));

  return (
    <div className="p-5 md:p-10 w-full">
      <div className="flex flex-col border rounded-2xl overflow-hidden m-auto max-w-lg w-full">
        <div className="p-5">
          <h2 className="text-3xl font-semibold">Range/Band Sparkline</h2>
          <p className="mt-1 text-sm text-foreground/50">
            Min-max range with confidence bands
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-5">
          <div className="p-4 bg-foreground/5 border rounded-xl">
            <div className="mb-1 flex items-center gap-2">
              <Activity className="size-4 text-blue-600" />
              <span className="text-sm">Peak Average</span>
            </div>
            <div className="text-lg font-medium">{peakHour.avg}</div>
            <div className="text-xs text-foreground/50">at {peakHour.hour}</div>
          </div>
          <div className="p-4 bg-foreground/5 border rounded-xl">
            <div className="mb-1 flex items-center gap-2">
              <TrendingUp className="size-4 text-green-600" />
              <span className="text-sm">Global Max</span>
            </div>
            <div className="text-lg font-medium">{globalMax}</div>
            <div className="text-xs text-foreground/50">Peak value</div>
          </div>
          <div className="p-4 bg-foreground/5 border rounded-xl">
            <div className="mb-1 flex items-center gap-2">
              <TrendingDown className="size-4 text-red-600" />
              <span className="text-sm">Global Min</span>
            </div>
            <div className="text-lg font-medium">{globalMin}</div>
            <div className="text-xs text-foreground/50">Lowest value</div>
          </div>
        </div>

        <ChartContainer config={chartConfig} className="h-50 w-full">
          <AreaChart
            data={rangeData}
            margin={{
              top: 20,
              right: 0,
              left: -60,
              bottom: -30,
            }}
          >
            <defs>
              <linearGradient id="rangeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="avgGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tick={false}
            />
            <YAxis tickLine={false} axisLine={false} tick={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="max"
              stroke="none"
              fill="url(#rangeGradient)"
              animationDuration={2000}
            />
            <Area
              type="monotone"
              dataKey="min"
              stroke="none"
              fill="url(#rangeGradient)"
              animationDuration={2000}
            />
            <Area
              type="monotone"
              dataKey="avg"
              stroke="#06b6d4"
              strokeWidth={3}
              fill="none"
              dot={false}
              activeDot={{ r: 6 }}
              animationDuration={2000}
            />
          </AreaChart>
        </ChartContainer>

        <div className="p-3 border-y">
          <div className="mb-3 text-sm font-medium">Volatility by Hour</div>
          <div className="grid grid-cols-12 gap-1.5">
            {rangeData.map((item) => (
              <div key={item.hour} className="text-center">
                <div
                  className="h-10 rounded-sm bg-linear-to-tl from-sky-500 to-cyan-500"
                  style={{
                    height: `${(item.volatility / 65) * 60}px`,
                  }}
                />
                <div className="mt-1 text-[0.7rem] text-foreground/40">
                  {item.hour}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between p-5 bg-foreground/5">
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <div className="size-3 rounded-[3px] bg-blue-600" />
              <span className="text-xs">Min-Max Range</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-0.5 w-3 rounded bg-cyan-500" />
              <span className="text-xs">Average</span>
            </div>
          </div>
          <div className="text-xs text-foreground/50">
            Confidence : 95% within range
          </div>
        </div>
      </div>
    </div>
  );
}
