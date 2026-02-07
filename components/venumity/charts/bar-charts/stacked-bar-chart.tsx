"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const stackedData = [
  { name: "Jan", productA: 4000, productB: 2400, productC: 3200 },
  { name: "Feb", productA: 3000, productB: 1398, productC: 2800 },
  { name: "Mar", productA: 5000, productB: 9800, productC: 2000 },
  { name: "Apr", productA: 4500, productB: 3908, productC: 2500 },
  { name: "May", productA: 6000, productB: 4800, productC: 3500 },
  { name: "Jun", productA: 5500, productB: 3800, productC: 3000 },
];

export default function StackedBarChart() {
  return (
    <main className="flex flex-col items-center justify-center m-auto pl-5 pb-5 border rounded-md overflow-hidden max-w-6xl w-full h-130">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={stackedData} margin={{ left: -25 }}>
          <defs>
            <linearGradient id="colorProductA" x1="0" y1="0" x2="0" y2="1">
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
            <linearGradient id="colorProductB" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(220 90% 56%)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="hsl(220 90% 56%)"
                stopOpacity={0.2}
              />
            </linearGradient>
            <linearGradient id="colorProductC" x1="0" y1="0" x2="0" y2="1">
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
            stroke="hsl(215 20% 65%)"
            fontSize={14}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value / 1000}K`}
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
          />
          <Legend />
          <Bar
            dataKey="productA"
            stackId="a"
            fill="url(#colorProductA)"
            stroke="hsl(24 100% 55%)"
            strokeWidth={1}
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
          <Bar
            dataKey="productB"
            stackId="a"
            fill="url(#colorProductB)"
            stroke="hsl(220 90% 56%)"
            strokeWidth={1}
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
          <Bar
            dataKey="productC"
            stackId="a"
            fill="url(#colorProductC)"
            stroke="hsl(142 76% 36%)"
            strokeWidth={1}
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </main>
  );
}
