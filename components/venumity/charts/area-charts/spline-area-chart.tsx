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
  return (
    <main className="flex flex-col items-center justify-center m-auto pl-5 pb-5 border rounded-md overflow-hidden max-w-6xl w-full h-130">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(187 92% 55%)"
                stopOpacity={0.3}
              />
              <stop
                offset="50%"
                stopColor="hsl(142 71% 45%)"
                stopOpacity={0.2}
              />
              <stop
                offset="95%"
                stopColor="hsl(142 71% 45%)"
                stopOpacity={0.02}
              />
            </linearGradient>
            <linearGradient id="strokeUsers" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(187 92% 55%)" />
              <stop offset="100%" stopColor="hsl(142 71% 45%)" />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(217 33% 17%)"
            vertical={false}
          />
          <XAxis
            dataKey="time"
            stroke="hsl(215 20% 65%)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(215 20% 65%)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(222 47% 8%)",
              border: "1px solid hsl(217 33% 17%)",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
            labelStyle={{ color: "hsl(210 40% 98%)" }}
            itemStyle={{ color: "hsl(187 92% 55%)" }}
            formatter={(value: number) => [`${value} active`, "Users"]}
          />
          <Area
            type="natural"
            dataKey="users"
            stroke="url(#strokeUsers)"
            strokeWidth={3}
            fill="url(#colorUsers)"
            animationDuration={2000}
            animationEasing="ease-out"
            dot={{ fill: "hsl(187 92% 55%)", strokeWidth: 0, r: 3 }}
            activeDot={{
              fill: "hsl(187 92% 55%)",
              stroke: "hsl(222 47% 8%)",
              strokeWidth: 2,
              r: 6,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </main>
  );
}
