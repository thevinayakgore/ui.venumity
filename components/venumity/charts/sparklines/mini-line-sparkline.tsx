"use client";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

const sparklineData = [
  { value: 4000 },
  { value: 3000 },
  { value: 5000 },
  { value: 4500 },
  { value: 6000 },
  { value: 5500 },
  { value: 7000 },
];

export default function MiniLineSparkline() {
  return (
    <main className="flex flex-col items-center justify-center m-auto p-5 border rounded-md overflow-hidden max-w-6xl w-full h-130">
      <div className="w-full h-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Revenue Trend</h3>
            <p className="text-sm text-muted-foreground">Last 7 days</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">$7,000</div>
            <div className="text-sm text-green-600">+12.5%</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="80%">
          <LineChart data={sparklineData}>
            <defs>
              <linearGradient
                id="sparklineGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop
                  offset="0%"
                  stopColor="hsl(24 100% 55%)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="100%"
                  stopColor="hsl(45 93% 58%)"
                  stopOpacity={0.8}
                />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#sparklineGradient)"
              strokeWidth={3}
              dot={false}
              animationDuration={1500}
            />
            <Tooltip
              contentStyle={{
                padding: "8px 12px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                border: "1px solid white",
                borderRadius: "6px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              formatter={(value) => [`$${value}`, "Revenue"]}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}
