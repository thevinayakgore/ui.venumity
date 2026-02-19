// app/charts/area/stacked/page.tsx
"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Monitor, Smartphone, Tablet } from "lucide-react";

const data = [
  { name: "Jan", desktop: 4000, mobile: 2400, tablet: 1200 },
  { name: "Feb", desktop: 3000, mobile: 1398, tablet: 900 },
  { name: "Mar", desktop: 2000, mobile: 9800, tablet: 1500 },
  { name: "Apr", desktop: 2780, mobile: 3908, tablet: 2100 },
  { name: "May", desktop: 1890, mobile: 4800, tablet: 1800 },
  { name: "Jun", desktop: 2390, mobile: 3800, tablet: 2200 },
  { name: "Jul", desktop: 3490, mobile: 4300, tablet: 2500 },
];

export default function StackedAreaChart() {
  const totals = data.reduce(
    (acc, month) => ({
      desktop: acc.desktop + month.desktop,
      mobile: acc.mobile + month.mobile,
      tablet: acc.tablet + month.tablet,
    }),
    { desktop: 0, mobile: 0, tablet: 0 },
  );

  const grandTotal = totals.desktop + totals.mobile + totals.tablet;

  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold">Device Traffic Stack</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Stacked area chart showing device distribution
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-cyan-500/10 px-4 py-2 rounded-lg">
            <span className="text-xs text-cyan-600">Desktop</span>
            <p className="text-lg font-bold text-cyan-600">
              {(totals.desktop / 1000).toFixed(1)}K
            </p>
          </div>
          <div className="bg-purple-500/10 px-4 py-2 rounded-lg">
            <span className="text-xs text-purple-600">Mobile</span>
            <p className="text-lg font-bold text-purple-600">
              {(totals.mobile / 1000).toFixed(1)}K
            </p>
          </div>
          <div className="bg-green-500/10 px-4 py-2 rounded-lg">
            <span className="text-xs text-green-600">Tablet</span>
            <p className="text-lg font-bold text-green-600">
              {(totals.tablet / 1000).toFixed(1)}K
            </p>
          </div>
        </div>
      </div>
      <div className="h-100 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorTablet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
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
              tick={{ fill: "hsl(215 20% 65%)" }}
            />
            <YAxis
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
              tick={{ fill: "hsl(215 20% 65%)" }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const total = payload.reduce(
                    (sum, entry) => sum + (entry.value as number),
                    0,
                  );
                  return (
                    <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-3">
                      <p className="text-sm font-medium mb-2">{label}</p>
                      {payload.map((entry) => (
                        <div
                          key={entry.name}
                          className="flex items-center justify-between gap-4 text-sm"
                        >
                          <span style={{ color: entry.color }}>
                            {entry.name}:
                          </span>
                          <span className="font-bold">
                            {entry.value?.toLocaleString()}
                          </span>
                        </div>
                      ))}
                      <div className="border-t mt-2 pt-2 flex justify-between text-sm font-bold">
                        <span>Total:</span>
                        <span>{total.toLocaleString()}</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: "10px" }}
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-sm font-medium capitalize px-2">
                  {value}
                </span>
              )}
            />
            <Area
              type="monotone"
              dataKey="tablet"
              stackId="1"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#colorTablet)"
              animationDuration={1500}
            />
            <Area
              type="monotone"
              dataKey="mobile"
              stackId="1"
              stroke="#a855f7"
              strokeWidth={2}
              fill="url(#colorMobile)"
              animationDuration={1500}
              animationBegin={200}
            />
            <Area
              type="monotone"
              dataKey="desktop"
              stackId="1"
              stroke="#06b6d4"
              strokeWidth={2}
              fill="url(#colorDesktop)"
              animationDuration={1500}
              animationBegin={400}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Device Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-cyan-500/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Monitor className="size-5 text-cyan-600" />
            <h3 className="font-semibold text-cyan-600">Desktop</h3>
          </div>
          <p className="text-2xl font-bold text-cyan-600">
            {((totals.desktop / grandTotal) * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-muted-foreground">
            {totals.desktop.toLocaleString()} sessions
          </p>
        </div>
        <div className="bg-purple-500/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Smartphone className="size-5 text-purple-600" />
            <h3 className="font-semibold text-purple-600">Mobile</h3>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            {((totals.mobile / grandTotal) * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-muted-foreground">
            {totals.mobile.toLocaleString()} sessions
          </p>
        </div>
        <div className="bg-green-500/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Tablet className="size-5 text-green-600" />
            <h3 className="font-semibold text-green-600">Tablet</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {((totals.tablet / grandTotal) * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-muted-foreground">
            {totals.tablet.toLocaleString()} sessions
          </p>
        </div>
      </div>
    </main>
  );
}
