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
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
  { name: "Jul", value: 7000 },
  { name: "Aug", value: 6450 },
  { name: "Sep", value: 7000 },
  { name: "Oct", value: 4000 },
  { name: "Nov", value: 8000 },
  { name: "Dec", value: 6000 },
];

export default function BasicAreaChart() {
  return (
    <main className="flex flex-col items-center justify-center m-auto pl-5 pb-5 border rounded-md overflow-hidden max-w-6xl w-full h-130">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: -25 }}>
          <defs>
            <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(24 100% 55%)"
                stopOpacity={0.4}
              />
              <stop
                offset="95%"
                stopColor="hsl(24 100% 55%)"
                stopOpacity={0.05}
              />
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
            tick={{ fill: "hsl(215 0% 50%)" }}
          />
          <YAxis
            stroke="hsl(215 20% 65%)"
            fontSize={14}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value / 1000}K`}
            padding={{ top: 45, bottom: 20 }}
            tick={{ fill: "hsl(215 0% 50%)" }}
          />
          <Tooltip
            contentStyle={{
              padding: "10px 15px",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              border: "1px solid white",
              borderRadius: "7px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              backdropFilter: "blur(3px)",
            }}
            labelStyle={{ color: "black" }}
            itemStyle={{ color: "rgba(255, 84, 0,1)" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(24 100% 55%)"
            strokeWidth={2}
            fill="url(#colorOrange)"
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </main>
  );
}
