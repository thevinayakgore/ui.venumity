"use client";
import { BarChart, Bar, ResponsiveContainer, XAxis } from "recharts";

const barSparklineData = [
  { day: "M", value: 4000 },
  { day: "T", value: 3000 },
  { day: "W", value: 5000 },
  { day: "T", value: 4500 },
  { day: "F", value: 6000 },
  { day: "S", value: 5500 },
  { day: "S", value: 7000 },
];

export default function BarSparklines() {
  return (
    <main className="flex flex-col items-center justify-center m-auto p-5 border rounded-md overflow-hidden max-w-6xl w-full h-130">
      <div className="w-full h-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Daily Activity</h3>
            <p className="text-sm text-muted-foreground">This week</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">35,500</div>
            <div className="text-sm text-green-600">+8.2% from last week</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={barSparklineData}>
            <defs>
              <linearGradient id="barSparkGradient" x1="0" y1="0" x2="0" y2="1">
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
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215 0% 50%)", fontSize: 12 }}
            />
            <Bar
              dataKey="value"
              fill="url(#barSparkGradient)"
              radius={[2, 2, 0, 0]}
              animationDuration={1500}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}
