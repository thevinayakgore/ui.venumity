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

const groupedData = [
  { name: "Q1", sales: 4000, expenses: 2400, profit: 1600 },
  { name: "Q2", sales: 3000, expenses: 1398, profit: 1602 },
  { name: "Q3", sales: 5000, expenses: 9800, profit: -4800 },
  { name: "Q4", sales: 4500, expenses: 3908, profit: 592 },
];

export default function GroupedBarChart() {
  return (
    <main className="flex flex-col items-center justify-center m-auto pl-5 pb-5 border rounded-md overflow-hidden max-w-6xl w-full h-130">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={groupedData} margin={{ left: -25, right: 20 }}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
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
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
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
            dataKey="sales"
            fill="url(#colorSales)"
            stroke="hsl(24 100% 55%)"
            strokeWidth={1}
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            barSize={30}
          />
          <Bar
            dataKey="expenses"
            fill="url(#colorExpenses)"
            stroke="hsl(220 90% 56%)"
            strokeWidth={1}
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            barSize={30}
          />
          <Bar
            dataKey="profit"
            fill="url(#colorProfit)"
            stroke="hsl(142 76% 36%)"
            strokeWidth={1}
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </main>
  );
}
