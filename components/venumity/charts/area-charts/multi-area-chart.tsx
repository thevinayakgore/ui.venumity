// app/charts/area/multi/page.tsx
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
  const totalRevenue = data.reduce((acc, item) => acc + item.revenue, 0);
  const totalProfit = data.reduce((acc, item) => acc + item.profit, 0);
  const avgMargin = (totalProfit / totalRevenue) * 100;

  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-3xl font-semibold">Revenue vs Profit</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Multi-series area chart with overlapping fills
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-orange-500/10 px-4 py-2 rounded-lg">
            <span className="text-xs text-orange-600">Total Revenue</span>
            <p className="text-lg font-bold text-orange-600">
              ${(totalRevenue / 1000).toFixed(1)}K
            </p>
          </div>
          <div className="bg-green-500/10 px-4 py-2 rounded-lg">
            <span className="text-xs text-green-600">Total Profit</span>
            <p className="text-lg font-bold text-green-600">
              ${(totalProfit / 1000).toFixed(1)}K
            </p>
          </div>
          <div className="bg-blue-500/10 px-4 py-2 rounded-lg">
            <span className="text-xs text-blue-600">Avg Margin</span>
            <p className="text-lg font-bold text-blue-600">
              {avgMargin.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <div className="h-100 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ left: -25, right: 20, top: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-foreground/10"
            />
            <XAxis
              dataKey="name"
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              padding={{ left: 20, right: 45 }}
              tick={{ fill: "hsl(215 20% 65%)" }}
            />
            <YAxis
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              padding={{ top: 45, bottom: 20 }}
              tickFormatter={(value) => `$${value / 1000}K`}
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
                            ${entry.value?.toLocaleString()}
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
              wrapperStyle={{ paddingTop: "10px" }}
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-sm font-medium capitalize px-2">
                  {value === "revenue" ? "Revenue" : "Profit"}
                </span>
              )}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#f97316"
              strokeWidth={2}
              fill="url(#colorRevenue)"
              animationDuration={1500}
              dot={{ fill: "#f97316", strokeWidth: 0, r: 3 }}
            />
            <Area
              type="monotone"
              dataKey="profit"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#colorProfit)"
              animationDuration={1500}
              animationBegin={300}
              dot={{ fill: "#10b981", strokeWidth: 0, r: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Weekly Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {data.slice(0, 4).map((week) => (
          <div key={week.name} className="bg-muted border rounded-lg p-3">
            <div className="text-sm font-semibold mb-2">{week.name}</div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Revenue:</span>
                <span className="font-medium text-orange-600">
                  ${week.revenue}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Profit:</span>
                <span className="font-medium text-green-600">
                  ${week.profit}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Margin:</span>
                <span className="font-medium text-blue-600">
                  {((week.profit / week.revenue) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
