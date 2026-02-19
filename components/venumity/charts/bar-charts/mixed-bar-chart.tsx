// app/charts/mixed/page.tsx
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
  const avgMargin =
    mixedData.reduce((acc, item) => acc + item.margin, 0) / mixedData.length;

  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-3xl font-semibold">Revenue & Profit Analysis</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Combined view with profit margin trend
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-blue-500/10 px-4 py-2 rounded-lg">
            <span className="text-xs text-blue-600">Avg Margin</span>
            <p className="text-lg font-bold text-blue-600">
              {avgMargin.toFixed(1)}%
            </p>
          </div>
          <div className="bg-green-500/10 px-4 py-2 rounded-lg">
            <span className="text-xs text-green-600">Peak Revenue</span>
            <p className="text-lg font-bold text-green-600">$6,000</p>
          </div>
        </div>
      </div>
      <div className="h-100 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={mixedData}
            margin={{ left: -25, right: 20, top: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1"/>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1"/>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-foreground/20"
            />
            <XAxis
              dataKey="name"
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(215 20% 65%)" }}
            />
            <YAxis
              yAxisId="left"
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}K`}
              tick={{ fill: "hsl(215 20% 65%)" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
              tick={{ fill: "hsl(215 20% 65%)" }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-3">
                      <p className="text-sm font-medium mb-2">{label}</p>
                      {payload.map((entry) => (
                        <div
                          key={entry.name}
                          className="flex items-center justify-between gap-4 text-sm"
                        >
                          <span style={{ color: entry.color }}>
                            {entry.name}:
                          </span>
                          <span className="font-bold">
                            {entry.name === "margin"
                              ? `${entry.value}%`
                              : `$${entry.value}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => (
                <span className="text-sm font-medium capitalize px-2">
                  {value}
                </span>
              )}
            />
            <Bar
              yAxisId="left"
              dataKey="revenue"
              radius={[10, 10, 0, 0]}
              animationDuration={1500}
              barSize={40}
              className="fill-blue-500"
            />
            <Bar
              yAxisId="left"
              dataKey="profit"
              radius={[10, 10, 0, 0]}
              animationDuration={1500}
              barSize={40}
              className="fill-green-500"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="margin"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ strokeWidth: 2, r: 4, fill: "#8b5cf6" }}
              animationDuration={1500}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {mixedData.map((month) => (
          <div key={month.name} className="bg-foreground/5 backdrop-blur-sm border-2 rounded-lg p-3">
            <div className="text-sm font-semibold mb-2">{month.name}</div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Revenue :</span>
                <span className="font-medium text-blue-600">
                  ${month.revenue}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Profit :</span>
                <span className="font-medium text-green-600">
                  ${month.profit}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Margin :</span>
                <span className="font-medium text-purple-600">
                  {month.margin}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
