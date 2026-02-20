"use client";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

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

export default function RangeSparkline() {
  const maxRange = Math.max(...rangeData.map((d) => d.max - d.min));
  const avgVolatility = Math.round(
    rangeData.reduce((acc, d) => acc + d.volatility, 0) / rangeData.length,
  );
  const peakHour = rangeData.reduce((max, d) => (d.avg > max.avg ? d : max));

  return (
    <main className="my-10 p-4 md:p-6 border rounded-2xl max-w-3xl m-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold">Range/Band Sparkline</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Min-max range with confidence bands
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20">
            <span className="text-xs text-blue-600">Max Range</span>
            <p className="text-lg font-bold text-blue-600">{maxRange}</p>
          </div>
          <div className="bg-cyan-500/10 px-4 py-2 rounded-lg border border-cyan-500/20">
            <span className="text-xs text-cyan-600">Volatility</span>
            <p className="text-lg font-bold text-cyan-600">{avgVolatility}%</p>
          </div>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="size-4 text-blue-600" />
            <span className="text-sm">Peak Average</span>
          </div>
          <div className="text-lg font-medium">{peakHour.avg}</div>
          <div className="text-xs text-muted-foreground">
            at {peakHour.hour}
          </div>
        </div>
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="size-4 text-green-600" />
            <span className="text-sm">Global Max</span>
          </div>
          <div className="text-lg font-medium">
            {Math.max(...rangeData.map((d) => d.max))}
          </div>
          <div className="text-xs text-muted-foreground">Peak value</div>
        </div>
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="size-4 text-red-600" />
            <span className="text-sm">Global Min</span>
          </div>
          <div className="text-lg font-medium">
            {Math.min(...rangeData.map((d) => d.min))}
          </div>
          <div className="text-xs text-muted-foreground">Lowest value</div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-50 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={rangeData}
            margin={{ left: -20, right: 20, top: 20, bottom: 20 }}
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
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215 20% 65%)", fontSize: 10 }}
              interval={1}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215 20% 65%)", fontSize: 10 }}
              domain={[0, "dataMax + 20"]}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-3">
                      <p className="text-sm font-medium mb-2">{data.hour}</p>
                      <div className="space-y-1">
                        <p className="text-xs">Min: {data.min}</p>
                        <p className="text-xs font-bold text-blue-600">
                          Avg: {data.avg}
                        </p>
                        <p className="text-xs">Max: {data.max}</p>
                        <p className="text-xs text-muted-foreground">
                          Range: {data.max - data.min}
                        </p>
                        <p className="text-xs text-cyan-600">
                          Volatility: {data.volatility}%
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            {/* Range band */}
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
            {/* Average line */}
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
        </ResponsiveContainer>
      </div>

      {/* Volatility Indicators */}
      <div className="mt-6">
        <div className="text-sm font-medium mb-3">Volatility by Hour</div>
        <div className="grid grid-cols-12 gap-1">
          {rangeData.map((item, index) => (
            <div key={index} className="text-center">
              <div
                className="h-10 bg-linear-to-t from-sky-500 to-cyan-500 rounded-sm"
                style={{
                  opacity: 0.3 + (item.volatility / 100) * 0.7,
                  height: `${(item.volatility / 65) * 60}px`,
                }}
              />
              <div className="text-[8px] mt-1 text-muted-foreground">
                {item.hour}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confidence Band Legend */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500/30 rounded" />
            <span className="text-xs">Min-Max Range</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-cyan-500 rounded" />
            <span className="text-xs">Average</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          Confidence : 95% within range
        </div>
      </div>
    </main>
  );
}
