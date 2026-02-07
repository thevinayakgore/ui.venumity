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
  { month: "Jan", organic: 40, paid: 35, referral: 25 },
  { month: "Feb", organic: 45, paid: 30, referral: 25 },
  { month: "Mar", organic: 35, paid: 40, referral: 25 },
  { month: "Apr", organic: 50, paid: 30, referral: 20 },
  { month: "May", organic: 55, paid: 25, referral: 20 },
  { month: "Jun", organic: 45, paid: 35, referral: 20 },
];

const toPercent = (decimal: number) => `${decimal}%`;

export default function PercentAreaChart() {
  return (
    <main className="flex flex-col items-center justify-center m-auto pl-5 pb-5 border rounded-md overflow-hidden max-w-6xl w-full h-130">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          stackOffset="expand"
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(187 92% 55%)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="hsl(187 92% 55%)"
                stopOpacity={0.4}
              />
            </linearGradient>
            <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(270 70% 60%)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="hsl(270 70% 60%)"
                stopOpacity={0.4}
              />
            </linearGradient>
            <linearGradient id="colorReferral" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(25 95% 60%)" stopOpacity={0.8} />
              <stop
                offset="95%"
                stopColor="hsl(25 95% 60%)"
                stopOpacity={0.4}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(217 33% 17%)"
            vertical={false}
          />
          <XAxis
            dataKey="month"
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
            tickFormatter={toPercent}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(222 47% 8%)",
              border: "1px solid hsl(217 33% 17%)",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
            labelStyle={{ color: "hsl(210 40% 98%)" }}
            formatter={(value: number) => [`${value}%`, ""]}
          />
          <Legend
            wrapperStyle={{ paddingTop: "10px" }}
            iconType="circle"
            iconSize={8}
          />
          <Area
            type="monotone"
            dataKey="referral"
            stackId="1"
            stroke="hsl(25 95% 60%)"
            strokeWidth={0}
            fill="url(#colorReferral)"
            animationDuration={1500}
          />
          <Area
            type="monotone"
            dataKey="paid"
            stackId="1"
            stroke="hsl(270 70% 60%)"
            strokeWidth={0}
            fill="url(#colorPaid)"
            animationDuration={1500}
            animationBegin={200}
          />
          <Area
            type="monotone"
            dataKey="organic"
            stackId="1"
            stroke="hsl(187 92% 55%)"
            strokeWidth={0}
            fill="url(#colorOrganic)"
            animationDuration={1500}
            animationBegin={400}
          />
        </AreaChart>
      </ResponsiveContainer>
    </main>
  );
}
