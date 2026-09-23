"use client";
import { AlertCircle, Activity, Zap } from "lucide-react";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";

const chartConfig = {
  errors: {
    label: "Errors",
    color: "var(--color-orange-500)",
  },
  alerts: {
    label: "Alerts",
    color: "var(--color-yellow-500)",
  },
  latency: {
    label: "Latency",
    color: "var(--color-blue-500)",
  },
} satisfies ChartConfig;

const dotData = [
  { time: "00:00", errors: 2, alerts: 1, latency: 120 },
  { time: "01:00", errors: 0, alerts: 0, latency: 95 },
  { time: "02:00", errors: 1, alerts: 0, latency: 110 },
  { time: "03:00", errors: 15, alerts: 3, latency: 450 },
  { time: "04:00", errors: 3, alerts: 1, latency: 180 },
  { time: "05:00", errors: 0, alerts: 0, latency: 85 },
  { time: "06:00", errors: 2, alerts: 1, latency: 130 },
  { time: "07:00", errors: 8, alerts: 2, latency: 280 },
  { time: "08:00", errors: 1, alerts: 0, latency: 105 },
  { time: "09:00", errors: 4, alerts: 1, latency: 160 },
  { time: "10:00", errors: 20, alerts: 4, latency: 520 },
  { time: "11:00", errors: 2, alerts: 1, latency: 140 },
];

type TooltipPayloadItem = {
  value?: number;
  payload?: {
    time: string;
    errors: number;
    alerts: number;
    latency: number;
  };
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayloadItem[];
};

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0]?.payload;

  if (!item) {
    return null;
  }

  const isCritical = item.errors > 10;

  return (
    <div className="min-w-44 rounded-xl border border-border/60 bg-background/95 p-3 shadow-xl backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="text-sm font-semibold">{item.time}</p>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
            isCritical
              ? "bg-red-500/15 text-red-500"
              : "bg-green-500/15 text-green-500"
          }`}
        >
          {isCritical ? "Critical" : "Normal"}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-5 text-xs">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-orange-500" />
            <span className="text-foreground/50">Errors</span>
          </div>
          <span className="font-medium">{formatNumber(item.errors)}</span>
        </div>
        <div className="flex items-center justify-between gap-5 text-xs">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-yellow-500" />
            <span className="text-foreground/50">Alerts</span>
          </div>
          <span className="font-medium">{formatNumber(item.alerts)}</span>
        </div>
        <div className="flex items-center justify-between gap-5 text-xs">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-blue-500" />
            <span className="text-foreground/50">Latency</span>
          </div>
          <span className="font-medium">{item.latency}ms</span>
        </div>
      </div>
    </div>
  );
}

export default function DotSparkline() {
  const avgLatency = Math.round(
    dotData.reduce((totalValue, item) => totalValue + item.latency, 0) /
      dotData.length,
  );

  const maxErrors = Math.max(...dotData.map((item) => item.errors));
  const peakErrorItem = dotData.find((item) => item.errors === maxErrors);

  const spikeHours = dotData
    .filter((item) => item.errors > 10)
    .map((item) => item.time);

  return (
    <div className="p-5 md:p-10 w-full">
      <div className="flex flex-col border rounded-2xl overflow-hidden m-auto max-w-2xl w-full">
        <div className="p-5">
          <h2 className="text-3xl font-semibold tracking-tight">
            Dot/Scatter Sparkline
          </h2>
          <p className="mt-1 text-sm text-foreground/50">
            Anomaly detection and outlier visualization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-5">
          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-foreground/50">
              <AlertCircle className="size-4 text-orange-500" />
              <span className="text-xs font-medium">Peak errors</span>
            </div>
            <p className="text-2xl font-semibold">{maxErrors}</p>
            <p className="mt-1 text-xs text-foreground/50">
              at {peakErrorItem?.time ?? "—"}
            </p>
          </div>
          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-foreground/50">
              <Activity className="size-4 text-blue-500" />
              <span className="text-xs font-medium">Avg latency</span>
            </div>
            <p className="text-2xl font-semibold">{avgLatency}ms</p>
            <p className="mt-1 text-xs text-foreground/50">
              Normal range: 80–200ms
            </p>
          </div>
          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-foreground/50">
              <Zap className="size-4 text-yellow-500" />
              <span className="text-xs font-medium">Spike hours</span>
            </div>
            <p className="truncate text-2xl font-semibold">
              {spikeHours.join(", ") || "None"}
            </p>
            <p className="mt-1 text-xs text-foreground/50">
              Critical threshold exceeded
            </p>
          </div>
        </div>
        <div className="h-64 w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ScatterChart
              margin={{
                top: 20,
                right: 0,
                left: -45,
                bottom: -20,
              }}
            >
              <XAxis
                dataKey="time"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              <YAxis
                dataKey="errors"
                type="number"
                axisLine={false}
                tickLine={false}
                tick={false}
                domain={[0, "dataMax + 2"]}
              />
              <ZAxis dataKey="latency" type="number" range={[50, 500]} />
              <Tooltip content={<CustomTooltip />} />
              <Scatter
                name="Errors"
                data={dotData}
                fill="var(--color-orange-500)"
                shape={(props: {
                  cx?: number;
                  cy?: number;
                  payload?: {
                    errors: number;
                  };
                }) => {
                  const cx = props.cx ?? 0;
                  const cy = props.cy ?? 0;
                  const errors = props.payload?.errors ?? 0;
                  const isCritical = errors > 10;
                  const radius = isCritical ? 8 : errors > 5 ? 7 : 5;
                  const color = isCritical
                    ? "var(--color-red-500)"
                    : errors > 5
                      ? "var(--color-orange-500)"
                      : "var(--color-green-500)";
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={radius}
                      fill={color}
                      fillOpacity={0.9}
                      stroke="hsl(var(--background))"
                      strokeWidth={2}
                    />
                  );
                }}
              />
            </ScatterChart>
          </ChartContainer>
        </div>
        <div className="border-y p-5">
          <div className="flex items-center justify-between text-sm font-medium mb-5">
            <span>Anomaly threshold</span>
            <span className="text-red-500">Above 10 errors = critical</span>
          </div>
          <div className="relative h-2 overflow-visible rounded-full bg-muted">
            <div className="absolute inset-y-0 left-0 w-3/4 rounded-l-full bg-green-500" />
            <div className="absolute inset-y-0 left-3/4 w-1/4 rounded-r-full bg-red-500" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 p-5">
          {dotData.map((item, index) => (
            <div
              key={`${item.time}-${index}`}
              className={`rounded border px-2 py-1 text-[10px] font-medium ${
                item.errors > 10
                  ? "border-red-500/30 bg-red-500/20 text-red-500"
                  : item.errors > 5
                    ? "border-orange-500/30 bg-orange-500/20 text-orange-500"
                    : "border-green-500/30 bg-green-500/20 text-green-500"
              }`}
            >
              {item.time} {item.errors > 0 ? `(${item.errors})` : ""}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
