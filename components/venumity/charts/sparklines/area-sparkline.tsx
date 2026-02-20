// app/charts/sparklines/area/page.tsx
"use client";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { TrendingUp, Users, Clock } from "lucide-react";

const areaSparklineData = [
  { hour: "9AM", value: 4000, label: "9:00" },
  { hour: "10AM", value: 3000, label: "10:00" },
  { hour: "11AM", value: 5000, label: "11:00" },
  { hour: "12PM", value: 4500, label: "12:00" },
  { hour: "1PM", value: 6000, label: "13:00" },
  { hour: "2PM", value: 5500, label: "14:00" },
  { hour: "3PM", value: 7000, label: "15:00" },
  { hour: "4PM", value: 6500, label: "16:00" },
  { hour: "5PM", value: 8000, label: "17:00" },
];

export default function AreaSparkline() {
  const total = areaSparklineData.reduce((acc, item) => acc + item.value, 0);
  const peak = Math.max(...areaSparklineData.map((d) => d.value));
  const peakHour = areaSparklineData.find((d) => d.value === peak)?.hour;

  return (
    <main className="my-10 p-4 md:p-6 border rounded-2xl max-w-3xl m-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold">Area Sparkline</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Hourly traffic pattern with smooth area fill
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20">
            <span className="text-xs text-blue-600">Total</span>
            <p className="text-g font-medium text-blue-600">
              {(total / 1000).toFixed(1)}K
            </p>
          </div>
          <div className="bg-cyan-500/10 px-4 py-2 rounded-lg border border-cyan-500/20">
            <span className="text-xs text-cyan-600">Peak</span>
            <p className="text-g font-medium text-cyan-600">{peakHour}</p>
          </div>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Users className="size-4" />
            <span className="text-xs">Average</span>
          </div>
          <div className="text-xl font-medium">
            {(total / areaSparklineData.length).toFixed(0)}
          </div>
          <div className="text-xs text-muted-foreground">per hour</div>
        </div>
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <TrendingUp className="size-4" />
            <span className="text-xs">Growth</span>
          </div>
          <div className="text-xl font-medium text-green-600">+100%</div>
          <div className="text-xs text-muted-foreground">9AM → 5PM</div>
        </div>
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Clock className="size-4" />
            <span className="text-xs">Peak Hour</span>
          </div>
          <div className="text-xl font-medium">{peakHour}</div>
          <div className="text-xs text-muted-foreground">
            {peak.toLocaleString()} visitors
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-50 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={areaSparklineData}
            margin={{ left: -20, right: 20, top: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient
                id="areaSparkGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="hour"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215 20% 65%)", fontSize: 11 }}
            />
            <YAxis hide domain={[0, "dataMax + 1000"]} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-3">
                      <p className="text-sm font-medium mb-1">
                        {payload[0].payload.label}
                      </p>
                      <p className="text-g font-medium text-blue-600">
                        {payload[0].value?.toLocaleString()} visitors
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#areaSparkGradient)"
              animationDuration={2000}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Hourly Breakdown */}
      <div className="grid grid-cols-9 gap-1 mt-4">
        {areaSparklineData.map((item) => (
          <div key={item.hour} className="text-center">
            <div
              className="h-1 bg-blue-500 rounded-full mb-1"
              style={{ opacity: item.value / peak }}
            />
            <div className="text-[10px] text-muted-foreground">{item.hour}</div>
            <div className="text-xs font-medium">
              {(item.value / 1000).toFixed(1)}K
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
