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

const data = [
  { name: "Week 1", revenue: 4000, profit: 2400 },
  { name: "Week 2", revenue: 3000, profit: 1398 },
  { name: "Week 3", revenue: 5000, profit: 3800 },
  { name: "Week 4", revenue: 2780, profit: 1908 },
  { name: "Week 5", revenue: 6890, profit: 4800 },
  { name: "Week 6", revenue: 5390, profit: 3800 },
  { name: "Week 7", revenue: 7490, profit: 5300 },
  { name: "Week 8", revenue: 6200, profit: 4100 },
];

export default function MultiAreaChart() {
  return (
    <main className="flex flex-col items-center justify-center m-auto pl-10 pb-6 border rounded-md overflow-hidden max-w-6xl w-full h-130">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: -25 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(25 95% 60%)" stopOpacity={0.4} />
              <stop
                offset="95%"
                stopColor="hsl(25 95% 60%)"
                stopOpacity={0.05}
              />
            </linearGradient>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(142 71% 45%)"
                stopOpacity={0.4}
              />
              <stop
                offset="95%"
                stopColor="hsl(142 71% 45%)"
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
          />
          <YAxis
            stroke="hsl(215 20% 65%)"
            fontSize={14}
            tickLine={false}
            axisLine={false}
            padding={{ top: 45, bottom: 20 }}
            tickFormatter={(value) => `$${value / 1000}K`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(222 47% 8%)",
              border: "1px solid hsl(217 33% 17%)",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
            labelStyle={{ color: "hsl(210 40% 98%)" }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
          />
          <Legend
            wrapperStyle={{ paddingTop: "10px" }}
            iconType="circle"
            iconSize={8}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="hsl(25 95% 60%)"
            strokeWidth={2}
            fill="url(#colorRevenue)"
            animationDuration={1500}
          />
          <Area
            type="monotone"
            dataKey="profit"
            stroke="hsl(142 71% 45%)"
            strokeWidth={2}
            fill="url(#colorProfit)"
            animationDuration={1500}
            animationBegin={300}
          />
        </AreaChart>
      </ResponsiveContainer>
    </main>
  );
}
