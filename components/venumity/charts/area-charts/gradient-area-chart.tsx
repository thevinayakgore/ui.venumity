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
  { name: "Mon", value: 2400 },
  { name: "Tue", value: 1398 },
  { name: "Wed", value: 9800 },
  { name: "Thu", value: 3908 },
  { name: "Fri", value: 4800 },
  { name: "Sat", value: 3800 },
  { name: "Sun", value: 4300 },
];

export default function GradientAreaChart() {
  return (
    <main className="flex flex-col items-center justify-center m-auto pl-5 pb-5 border rounded-md overflow-hidden max-w-6xl w-full h-130">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: -25 }}>
          <defs>
            <linearGradient
              id="colorPurpleGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="hsl(270 70% 60%)"
                stopOpacity={0.5}
              />
              <stop
                offset="50%"
                stopColor="hsl(330 80% 60%)"
                stopOpacity={0.3}
              />
              <stop
                offset="100%"
                stopColor="hsl(330 80% 60%)"
                stopOpacity={0.05}
              />
            </linearGradient>
            <linearGradient
              id="strokePurpleGradient"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="hsl(270 70% 60%)" />
              <stop offset="100%" stopColor="hsl(330 80% 60%)" />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-foreground/10!"
          />
          <XAxis
            dataKey="name"
            stroke="hsl(215 20% 65%)"
            fontSize={14}
            tickLine={false}
            axisLine={false}
            padding={{ left: 20, right: 45 }}
          />
          <YAxis
            stroke="hsl(215 20% 65%)"
            fontSize={14}
            tickLine={false}
            axisLine={false}
            padding={{ top: 45, bottom: 20 }}
            tickFormatter={(value) => `${value / 1000}K`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(222 47% 8%)",
              border: "1px solid hsl(217 33% 17%)",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
            labelStyle={{ color: "hsl(210 40% 98%)" }}
            itemStyle={{ color: "hsl(270 70% 60%)" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="url(#strokePurpleGradient)"
            strokeWidth={2}
            fill="url(#colorPurpleGradient)"
            animationDuration={2000}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </main>
  );
}
