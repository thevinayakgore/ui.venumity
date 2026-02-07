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
  { name: "Jan", desktop: 4000, mobile: 2400, tablet: 1200 },
  { name: "Feb", desktop: 3000, mobile: 1398, tablet: 900 },
  { name: "Mar", desktop: 2000, mobile: 9800, tablet: 1500 },
  { name: "Apr", desktop: 2780, mobile: 3908, tablet: 2100 },
  { name: "May", desktop: 1890, mobile: 4800, tablet: 1800 },
  { name: "Jun", desktop: 2390, mobile: 3800, tablet: 2200 },
  { name: "Jul", desktop: 3490, mobile: 4300, tablet: 2500 },
];

export default function StackedAreaChart() {
  return (
    <main className="flex flex-col items-center justify-center m-auto pl-5 pb-5 border rounded-md overflow-hidden max-w-6xl w-full h-130">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(187 92% 55%)"
                stopOpacity={0.6}
              />
              <stop
                offset="95%"
                stopColor="hsl(187 92% 55%)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(270 70% 60%)"
                stopOpacity={0.6}
              />
              <stop
                offset="95%"
                stopColor="hsl(270 70% 60%)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="colorTablet" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(142 71% 45%)"
                stopOpacity={0.6}
              />
              <stop
                offset="95%"
                stopColor="hsl(142 71% 45%)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(217 33% 17%)"
            vertical={false}
          />
          <XAxis
            dataKey="name"
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
            tickFormatter={(value) => `${value / 1000}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(222 47% 8%)",
              border: "1px solid hsl(217 33% 17%)",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
            labelStyle={{ color: "hsl(210 40% 98%)" }}
          />
          <Legend
            wrapperStyle={{ paddingTop: "10px" }}
            iconType="circle"
            iconSize={8}
          />
          <Area
            type="monotone"
            dataKey="tablet"
            stackId="1"
            stroke="hsl(142 71% 45%)"
            strokeWidth={2}
            fill="url(#colorTablet)"
            animationDuration={1500}
          />
          <Area
            type="monotone"
            dataKey="mobile"
            stackId="1"
            stroke="hsl(270 70% 60%)"
            strokeWidth={2}
            fill="url(#colorMobile)"
            animationDuration={1500}
            animationBegin={200}
          />
          <Area
            type="monotone"
            dataKey="desktop"
            stackId="1"
            stroke="hsl(187 92% 55%)"
            strokeWidth={2}
            fill="url(#colorDesktop)"
            animationDuration={1500}
            animationBegin={400}
          />
        </AreaChart>
      </ResponsiveContainer>
    </main>
  );
}
