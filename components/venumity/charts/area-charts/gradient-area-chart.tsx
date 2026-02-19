// app/charts/area/gradient/page.tsx
"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Palette, Sparkles, Activity } from "lucide-react";

const data = [
  { name: "Mon", value: 2400 },
  { name: "Tue", value: 1398 },
  { name: "Wed", value: 9800 },
  { name: "Thu", value: 3908 },
  { name: "Fri", value: 4800 },
  { name: "Sat", value: 3800 },
  { name: "Sun", value: 4300 },
];

export default function GradientAreaChart() {
  const peak = Math.max(...data.map((d) => d.value));
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-3xl font-semibold">Gradient Area Chart</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Multi-color gradient fill with smooth transitions
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-purple-500/10 px-4 py-2 rounded-lg">
            <span className="text-xs text-purple-600">Peak Value</span>
            <p className="text-lg font-bold text-purple-600">
              {peak.toLocaleString()}
            </p>
          </div>
          <div className="bg-pink-500/10 px-4 py-2 rounded-lg">
            <span className="text-xs text-pink-600">Total</span>
            <p className="text-lg font-bold text-pink-600">
              {(total / 1000).toFixed(1)}K
            </p>
          </div>
        </div>
      </div>
      <div className="h-100 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ left: -25, right: 20, top: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient
                id="colorPurpleGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.7} />
                <stop offset="50%" stopColor="#ec4899" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#ec4899" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient
                id="strokePurpleGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-foreground/10"
            />
            <XAxis
              dataKey="name"
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              padding={{ left: 20, right: 45 }}
              tick={{ fill: "hsl(215 20% 65%)" }}
            />
            <YAxis
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              padding={{ top: 45, bottom: 20 }}
              tickFormatter={(value) => `${value / 1000}K`}
              tick={{ fill: "hsl(215 20% 65%)" }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-3">
                      <p className="text-sm font-medium mb-1">{label}</p>
                      <p className="text-lg font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ${payload[0].value?.toLocaleString()}
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
              stroke="url(#strokePurpleGradient)"
              strokeWidth={3}
              fill="url(#colorPurpleGradient)"
              animationDuration={2000}
              animationEasing="ease-out"
              dot={{ fill: "#a855f7", strokeWidth: 0, r: 4 }}
              activeDot={{
                fill: "#ec4899",
                stroke: "white",
                strokeWidth: 2,
                r: 6,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Gradient Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-linear-to-r from-purple-500/15 to-purple-500/10 border border-purple-500/70 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Palette className="size-5 text-purple-600" />
            <h3 className="font-semibold text-purple-600">Purple Zone</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Peak hours with high activity (40% opacity)
          </p>
        </div>
        <div className="bg-linear-to-r from-pink-500/15 to-pink-500/10 border border-pink-500/70 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="size-5 text-pink-600" />
            <h3 className="font-semibold text-pink-600">Pink Zone</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Mid-range values with smooth transition
          </p>
        </div>
        <div className="bg-linear-to-r from-blue-500/15 to-blue-500/10 border border-blue-500/70 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="size-5 text-blue-600" />
            <h3 className="font-semibold text-blue-600">Baseline</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Fade to 2% opacity at the bottom
          </p>
        </div>
      </div>
    </main>
  );
}
