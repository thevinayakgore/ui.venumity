"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const horizontalData = [
  { name: "Marketing", value: 8500 },
  { name: "Sales", value: 7200 },
  { name: "Development", value: 9300 },
  { name: "Support", value: 4300 },
  { name: "HR", value: 2900 },
  { name: "Finance", value: 5100 },
  { name: "Operations", value: 6200 },
];

export default function HorizontalBarChart() {
  return (
    <main className="flex flex-col items-center justify-center m-auto pl-5 pb-5 border rounded-md overflow-hidden max-w-6xl w-full h-130">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={horizontalData}
          layout="vertical"
          margin={{ left: -10, right: 20 }}
        >
          <defs>
            <linearGradient id="colorHorizontal" x1="0" y1="0" x2="1" y2="0">
              <stop
                offset="5%"
                stopColor="hsl(24 100% 55%)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="hsl(24 100% 55%)"
                stopOpacity={0.2}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-foreground/10!"
            horizontal={false}
          />
          <XAxis
            type="number"
            stroke="hsl(215 20% 65%)"
            fontSize={14}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value / 1000}K`}
            tick={{ fill: "hsl(215 0% 50%)" }}
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke="hsl(215 20% 65%)"
            fontSize={14}
            tickLine={false}
            axisLine={false}
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
          <Bar
            dataKey="value"
            fill="url(#colorHorizontal)"
            stroke="hsl(24 100% 55%)"
            strokeWidth={1}
            radius={[0, 4, 4, 0]}
            animationDuration={1500}
            barSize={24}
          />
        </BarChart>
      </ResponsiveContainer>
    </main>
  );
}
