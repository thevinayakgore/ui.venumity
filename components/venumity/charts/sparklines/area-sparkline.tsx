"use client";
import { AreaChart, Area, ResponsiveContainer, XAxis } from "recharts";

const areaSparklineData = [
  { hour: "9", value: 4000 },
  { hour: "10", value: 3000 },
  { hour: "11", value: 5000 },
  { hour: "12", value: 4500 },
  { hour: "13", value: 6000 },
  { hour: "14", value: 5500 },
  { hour: "15", value: 7000 },
  { hour: "16", value: 6500 },
  { hour: "17", value: 8000 },
];

export default function AreaSparkline() {
  return (
    <main className="flex flex-col items-center justify-center m-auto p-5 border rounded-md overflow-hidden max-w-6xl w-full h-130">
      <div className="w-full h-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Hourly Traffic</h3>
            <p className="text-sm text-muted-foreground">Today</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">49,500</div>
            <div className="text-sm text-green-600">Peak: 8,000 at 5 PM</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="80%">
          <AreaChart data={areaSparklineData}>
            <defs>
              <linearGradient
                id="areaSparkGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="hsl(220 90% 56%)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(220 90% 56%)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="hour"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215 0% 50%)", fontSize: 12 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(220 90% 56%)"
              strokeWidth={2}
              fill="url(#areaSparkGradient)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}
