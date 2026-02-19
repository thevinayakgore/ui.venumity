// app/charts/area/spline/page.tsx
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
import { Clock, Users2, TrendingUp } from "lucide-react";

const data = [
  { time: "00:00", users: 120 },
  { time: "04:00", users: 80 },
  { time: "08:00", users: 350 },
  { time: "12:00", users: 780 },
  { time: "16:00", users: 620 },
  { time: "20:00", users: 450 },
  { time: "24:00", users: 200 },
];

export default function SplineAreaChart() {
  const peak = Math.max(...data.map((d) => d.users));
  const avg = Math.round(
    data.reduce((acc, item) => acc + item.users, 0) / data.length,
  );

  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-5">
        <div>
          <h2 className="text-3xl font-semibold">Daily Active Users</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Smooth spline curve with natural interpolation
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-cyan-500/10 px-4 py-2 rounded-lg">
            <span className="text-xs text-cyan-600">Peak Users</span>
            <p className="text-lg font-bold text-cyan-600">{peak}</p>
          </div>
          <div className="bg-green-500/10 px-4 py-2 rounded-lg">
            <span className="text-xs text-green-600">Average</span>
            <p className="text-lg font-bold text-green-600">{avg}</p>
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
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.7} />
                <stop offset="50%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="strokeUsers" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-foreground/10"
            />
            <XAxis
              dataKey="time"
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
              tick={{ fill: "hsl(215 20% 65%)" }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-3">
                      <p className="text-sm font-medium mb-1">{label}</p>
                      <p className="text-lg font-bold bg-linear-to-r from-cyan-600 to-green-600 bg-clip-text text-transparent">
                        {payload[0].value} users
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="natural"
              dataKey="users"
              stroke="url(#strokeUsers)"
              strokeWidth={3}
              fill="url(#colorUsers)"
              animationDuration={2000}
              animationEasing="ease-out"
              dot={{ fill: "#06b6d4", strokeWidth: 0, r: 4 }}
              activeDot={{
                fill: "#10b981",
                stroke: "white",
                strokeWidth: 2,
                r: 6,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Time Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-muted border rounded-lg p-3">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Clock className="size-4" />
            <span className="text-xs">Morning Peak</span>
          </div>
          <div className="text-lg font-semibold">08:00</div>
          <div className="text-sm text-muted-foreground">350 users</div>
        </div>
        <div className="bg-muted border rounded-lg p-3">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <TrendingUp className="size-4" />
            <span className="text-xs">Peak Hour</span>
          </div>
          <div className="text-lg font-semibold">12:00</div>
          <div className="text-sm text-muted-foreground">780 users</div>
        </div>
        <div className="bg-muted border rounded-lg p-3">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Users2 className="size-4" />
            <span className="text-xs">Evening</span>
          </div>
          <div className="text-lg font-semibold">20:00</div>
          <div className="text-sm text-muted-foreground">450 users</div>
        </div>
        <div className="bg-muted border rounded-lg p-3">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Clock className="size-4" />
            <span className="text-xs">Night Low</span>
          </div>
          <div className="text-lg font-semibold">04:00</div>
          <div className="text-sm text-muted-foreground">80 users</div>
        </div>
      </div>
    </main>
  );
}
