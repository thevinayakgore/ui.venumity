"use client";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { AlertCircle, Activity, Zap } from "lucide-react";

const dotData = [
  { time: "00:00", errors: 2, alerts: 1, latency: 120 },
  { time: "01:00", errors: 0, alerts: 0, latency: 95 },
  { time: "02:00", errors: 1, alerts: 0, latency: 110 },
  { time: "03:00", errors: 15, alerts: 3, latency: 450 }, // Spike
  { time: "04:00", errors: 3, alerts: 1, latency: 180 },
  { time: "05:00", errors: 0, alerts: 0, latency: 85 },
  { time: "06:00", errors: 2, alerts: 1, latency: 130 },
  { time: "07:00", errors: 8, alerts: 2, latency: 280 }, // High
  { time: "08:00", errors: 1, alerts: 0, latency: 105 },
  { time: "09:00", errors: 4, alerts: 1, latency: 160 },
  { time: "10:00", errors: 20, alerts: 4, latency: 520 }, // Critical spike
  { time: "11:00", errors: 2, alerts: 1, latency: 140 },
];

export default function DotSparkline() {
  const totalErrors = dotData.reduce((acc, item) => acc + item.errors, 0);
  const totalAlerts = dotData.reduce((acc, item) => acc + item.alerts, 0);
  const avgLatency = Math.round(
    dotData.reduce((acc, item) => acc + item.latency, 0) / dotData.length,
  );
  const maxErrors = Math.max(...dotData.map((d) => d.errors));
  const spikeHours = dotData.filter((d) => d.errors > 10).map((d) => d.time);

  return (
    <main className="my-10 p-4 md:p-6 border rounded-2xl max-w-3xl m-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold">Dot/Scatter Sparkline</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Anomaly detection and outlier visualization
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-yellow-400/10 px-4 py-2 rounded-lg border border-yellow-400/20">
            <span className="text-xs text-yellow-400">Alerts</span>
            <p className="text-lg font-bold text-yellow-400">{totalAlerts}</p>
          </div>
          <div className="bg-orange-500/10 px-4 py-2 rounded-lg border border-orange-500/20">
            <span className="text-xs text-orange-600">Errors</span>
            <p className="text-lg font-bold text-orange-600">{totalErrors}</p>
          </div>
          <div className="bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20">
            <span className="text-xs text-red-600">Spikes</span>
            <p className="text-lg font-bold text-red-600">
              {spikeHours.length}
            </p>
          </div>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="size-4 text-orange-600" />
            <span className="text-sm">Peak Errors</span>
          </div>
          <div className="text-2xl font-bold">{maxErrors}</div>
          <div className="text-xs text-muted-foreground">
            at {dotData.find((d) => d.errors === maxErrors)?.time}
          </div>
        </div>
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="size-4 text-blue-600" />
            <span className="text-sm">Avg Latency</span>
          </div>
          <div className="text-2xl font-bold">{avgLatency}ms</div>
          <div className="text-xs text-muted-foreground">
            Normal range: 80-200ms
          </div>
        </div>
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="size-4 text-yellow-600" />
            <span className="text-sm">Spike Hours</span>
          </div>
          <div className="text-2xl font-bold">{spikeHours.join(", ")}</div>
          <div className="text-xs text-muted-foreground">
            Critical threshold exceeded
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-50 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ left: -20, right: 20, top: 20, bottom: 20 }}>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215 20% 65%)", fontSize: 10 }}
              interval={1}
            />
            <YAxis
              dataKey="errors"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215 20% 65%)", fontSize: 10 }}
              domain={[0, "dataMax + 2"]}
            />
            <ZAxis dataKey="latency" range={[50, 500]} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-3">
                      <p className="text-sm font-medium mb-2">{data.time}</p>
                      <div className="space-y-1">
                        <p className="text-xs flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-orange-500" />
                          <span>Errors: {data.errors}</span>
                        </p>
                        <p className="text-xs flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-yellow-500" />
                          <span>Alerts: {data.alerts}</span>
                        </p>
                        <p className="text-xs flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                          <span>Latency: {data.latency}ms</span>
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter
              name="Errors"
              data={dotData}
              fill="#f97316"
              shape={(props: {
                cx?: number;
                cy?: number;
                payload?: { errors: number };
              }) => {
                const { cx = 0, cy = 0, payload } = props;
                const isSpike = (payload?.errors ?? 0) > 10;

                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSpike ? 8 : 6}
                    fill={isSpike ? "#ef4444" : "#f97316"}
                    stroke="white"
                    strokeWidth={isSpike ? 2 : 1}
                  />
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Threshold Indicators */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Anomaly Threshold</span>
          <span className="text-xs text-muted-foreground">
            Above 10 errors = critical
          </span>
        </div>
        <div className="relative h-2 bg-muted rounded-full">
          <div className="absolute inset-y-0 left-0 w-3/4 bg-green-500/50 rounded-l-full" />
          <div className="absolute inset-y-0 left-3/4 w-1/4 bg-red-500/50 rounded-r-full" />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-1.5 h-5 bg-red-500 rounded-full"
            style={{ left: "75%" }}
          />
        </div>
      </div>

      {/* Alert Summary */}
      <div className="flex flex-wrap gap-2 mt-4">
        {dotData.map((item, index) => (
          <div
            key={index}
            className={`px-2 py-1 rounded text-[10px] font-medium ${
              item.errors > 10
                ? "bg-red-500/20 text-red-600 border border-red-500/30"
                : item.errors > 5
                  ? "bg-orange-500/20 text-orange-600 border border-orange-500/30"
                  : "bg-green-500/20 text-green-600 border border-green-500/30"
            }`}
          >
            {item.time} {item.errors > 0 ? `(${item.errors})` : ""}
          </div>
        ))}
      </div>
    </main>
  );
}
