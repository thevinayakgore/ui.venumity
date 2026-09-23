"use client";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { TrendingUp, Users, Clock, ArrowUpRight } from "lucide-react";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";

const chartConfig = {
  value: {
    label: "Visitors",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

const areaSparklineData = [
  { hour: "9AM", value: 4000, label: "9:00 AM" },
  { hour: "10AM", value: 3000, label: "10:00 AM" },
  { hour: "11AM", value: 5000, label: "11:00 AM" },
  { hour: "12PM", value: 4500, label: "12:00 PM" },
  { hour: "1PM", value: 6000, label: "1:00 PM" },
  { hour: "2PM", value: 5500, label: "2:00 PM" },
  { hour: "3PM", value: 7000, label: "3:00 PM" },
  { hour: "4PM", value: 6500, label: "4:00 PM" },
  { hour: "5PM", value: 8000, label: "5:00 PM" },
];

type TooltipPayloadItem = {
  name?: string;
  value?: number;
  color?: string;
  payload?: {
    hour: string;
    value: number;
    label: string;
  };
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayloadItem[];
};

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

  return (
    <div className="min-w-36 rounded-xl border border-border/60 bg-background/95 p-3 shadow-xl backdrop-blur-sm">
      <div className="mb-2 flex items-center gap-2">
        <span className="size-2 rounded-full bg-blue-500" />

        <p className="text-xs font-medium text-foreground/50">{item.label}</p>
      </div>

      <p className="text-base font-semibold text-blue-600">
        {formatNumber(item.value)}
      </p>

      <p className="mt-0.5 text-xs text-foreground/50">visitors</p>
    </div>
  );
}

export default function AreaSparkline() {
  const total = areaSparklineData.reduce(
    (totalValue, item) => totalValue + item.value,
    0,
  );

  const average = Math.round(total / areaSparklineData.length);
  const peak = Math.max(...areaSparklineData.map((item) => item.value));
  const lowest = Math.min(...areaSparklineData.map((item) => item.value));

  const peakHour =
    areaSparklineData.find((item) => item.value === peak)?.hour ?? "—";

  const firstValue = areaSparklineData[0]?.value ?? 0;
  const lastValue = areaSparklineData[areaSparklineData.length - 1]?.value ?? 0;

  const growth =
    firstValue > 0 ? ((lastValue - firstValue) / firstValue) * 100 : 0;

  return (
    <div className="p-5 md:p-10 w-full">
      <div className="flex flex-col border rounded-2xl overflow-hidden m-auto max-w-xl w-full">
        {/* Header */}
        <div className="p-5">
          <h2 className="text-3xl font-semibold tracking-tight">
            Area Sparkline
          </h2>
          <p className="mt-1 text-sm text-foreground/50">
            Hourly traffic pattern with a smooth area fill.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-3 px-5 sm:grid-cols-3">
          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-foreground/50">
              <Users className="size-4" />
              <span className="text-xs font-medium">Average</span>
            </div>

            <p className="text-2xl font-semibold tracking-tight">
              {formatNumber(average)}
            </p>

            <p className="mt-1 text-xs text-foreground/50">visitors per hour</p>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-foreground/50">
              <TrendingUp className="size-4" />
              <span className="text-xs font-medium">Growth</span>
            </div>

            <p
              className={`flex items-center gap-1 text-2xl font-semibold tracking-tight ${
                growth >= 0 ? "text-emerald-600" : "text-red-600"
              }`}
            >
              <ArrowUpRight className="size-5" />
              {growth >= 0 ? "+" : ""}
              {growth.toFixed(1)}%
            </p>

            <p className="mt-1 text-xs text-foreground/50">9AM → 5PM</p>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-foreground/50">
              <Clock className="size-4" />
              <span className="text-xs font-medium">Peak hour</span>
            </div>

            <p className="text-2xl font-semibold tracking-tight">{peakHour}</p>

            <p className="mt-1 text-xs text-foreground/50">
              {formatNumber(peak)} visitors
            </p>
          </div>
        </div>

        {/* Chart */}
        <ChartContainer config={chartConfig} className="h-50 w-full border-0!">
          <AreaChart
            data={areaSparklineData}
            margin={{ top: 20, right: 0, left: -60, bottom: -30 }}
          >
            <defs>
              <linearGradient
                id="areaSparkGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="var(--color-value)"
                  stopOpacity={0.35}
                />

                <stop
                  offset="55%"
                  stopColor="var(--color-value)"
                  stopOpacity={0.12}
                />

                <stop
                  offset="100%"
                  stopColor="var(--color-value)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="hour"
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

            <Area
              type="monotone"
              dataKey="value"
              name="Visitors"
              stroke="var(--color-value)"
              strokeWidth={3}
              fill="url(#areaSparkGradient)"
              fillOpacity={1}
              activeDot={{
                r: 5,
                fill: "var(--color-value)",
                stroke: "hsl(var(--background))",
                strokeWidth: 3,
              }}
              animationDuration={1600}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ChartContainer>

        {/* Hourly breakdown */}
        <div className="grid grid-cols-9 gap-1 border-y p-5">
          {areaSparklineData.map((item) => (
            <div key={item.hour} className="text-center">
              <div className="mb-2 flex h-1.5 items-center rounded-full bg-foreground/10">
                <div
                  className="h-full rounded-full bg-linear-to-r from-blue-500 to-cyan-500"
                  style={{
                    width: `${(item.value / peak) * 100}%`,
                  }}
                />
              </div>
              <p className="text-[10px] text-foreground/50">{item.hour}</p>
              <p className="mt-0.5 text-xs font-semibold">
                {formatCompactNumber(item.value)}
              </p>
            </div>
          ))}
        </div>

        {/* Footer summary */}
        <div className="flex items-center justify-between bg-foreground/5 p-5 text-xs w-full">
          <span>{formatNumber(lowest)} lowest visitors</span>
          <span>{formatNumber(peak)} highest visitors</span>
        </div>
      </div>
    </div>
  );
}
