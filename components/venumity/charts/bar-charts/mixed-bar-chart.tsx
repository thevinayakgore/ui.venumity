"use client";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
  ComposedChart,
} from "recharts";

const mixedData = [
  { name: "Jan", revenue: 4000, profit: 2400, margin: 60 },
  { name: "Feb", revenue: 3000, profit: 1398, margin: 46.6 },
  { name: "Mar", revenue: 5000, profit: 9800, margin: 196 },
  { name: "Apr", revenue: 4500, profit: 3908, margin: 86.8 },
  { name: "May", revenue: 6000, profit: 4800, margin: 80 },
  { name: "Jun", revenue: 5500, profit: 3800, margin: 69.1 },
];

export default function MixedBarChart() {
  return (
    <main className="flex flex-col items-center justify-center m-auto pl-5 pb-5 border rounded-md overflow-hidden max-w-6xl w-full h-130">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={mixedData} margin={{ left: -25 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
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
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(142 76% 36%)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="hsl(142 76% 36%)"
                stopOpacity={0.2}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-foreground/10!"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            stroke="hsl(215 20% 65%)"
            fontSize={14}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "hsl(215 0% 50%)" }}
          />
          <YAxis
            yAxisId="left"
            stroke="hsl(215 20% 65%)"
            fontSize={14}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value / 1000}K`}
            tick={{ fill: "hsl(215 0% 50%)" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="hsl(215 20% 65%)"
            fontSize={14}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
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
            formatter={(value, name) => {
              if (name === "margin") return [`${value}%`, "Margin"];
              if (name === "revenue") return [`$${value}`, "Revenue"];
              return [`$${value}`, "Profit"];
            }}
          />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="revenue"
            fill="url(#colorRevenue)"
            stroke="hsl(24 100% 55%)"
            strokeWidth={1}
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            barSize={30}
          />
          <Bar
            yAxisId="left"
            dataKey="profit"
            fill="url(#colorProfit)"
            stroke="hsl(142 76% 36%)"
            strokeWidth={1}
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            barSize={30}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="margin"
            stroke="hsl(220 90% 56%)"
            strokeWidth={3}
            dot={{ strokeWidth: 2, r: 4 }}
            animationDuration={1500}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </main>
  );
}
