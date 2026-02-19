// app/charts/grouped/page.tsx
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
  Cell,
} from "recharts";

const groupedData = [
  { name: "Q1", sales: 40006, expenses: 20800, profit: 12600 },
  { name: "Q2", sales: 30004, expenses: 13498, profit: 16802 },
  { name: "Q3", sales: 50040, expenses: 98030, profit: -48900 },
  { name: "Q4", sales: 45300, expenses: 39028, profit: 59962 },
];

const summary = {
  totalSales: groupedData.reduce((a, b) => a + b.sales, 0),
  totalExpenses: groupedData.reduce((a, b) => a + b.expenses, 0),
  totalProfit: groupedData.reduce((a, b) => a + b.profit, 0),
};

export default function GroupedBarChart() {
  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-3xl font-semibold">Quarterly Performance</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Sales vs Expenses vs Profit Analysis
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20">
            <span className="text-xs text-blue-600">Sales</span>
            <p className="text-lg font-bold text-blue-600">
              ${(summary.totalSales / 1000).toFixed(1)}K
            </p>
          </div>
          <div className="bg-purple-500/10 px-4 py-2 rounded-lg border border-purple-500/20">
            <span className="text-xs text-purple-600">Expenses</span>
            <p className="text-lg font-bold text-purple-600">
              ${(summary.totalExpenses / 1000).toFixed(1)}K
            </p>
          </div>
          <div
            className={`${summary.totalProfit >= 0 ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"} px-4 py-2 rounded-lg border`}
          >
            <span
              className={`text-xs ${summary.totalProfit >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              Profit
            </span>
            <p
              className={`text-lg font-bold ${summary.totalProfit >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              ${(summary.totalProfit / 1000).toFixed(1)}K
            </p>
          </div>
        </div>
      </div>

      <div className="h-100 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={groupedData}
            margin={{ left: -25, right: 20, top: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient x1="0" y1="0" x2="0" y2="1" />
              <linearGradient x1="0" y1="0" x2="0" y2="1" />
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#10b981" />
              </linearGradient>
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
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}K`}
              tick={{ fill: "hsl(215 20% 65%)" }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background border rounded-lg shadow-lg p-3">
                      <p className="text-sm font-medium mb-2">{label}</p>
                      {payload.map((entry, index) => (
                        <div
                          key={index}
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
              verticalAlign="top"
              height={36}
              formatter={(value) => (
                <span className="text-sm font-medium capitalize px-2">
                  {value}
                </span>
              )}
            />
            <Bar
              dataKey="sales"
              radius={[6, 6, 0, 0]}
              animationDuration={1500}
              barSize={40}
              className="fill-blue-500"
            />
            <Bar
              dataKey="expenses"
              radius={[6, 6, 0, 0]}
              animationDuration={1500}
              barSize={40}
              className="fill-purple-500"
            />
            <Bar
              dataKey="profit"
              radius={[6, 6, 0, 0]}
              animationDuration={1500}
              barSize={40}
            >
              {groupedData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.profit >= 0 ? "url(#colorProfit)" : "#ef4444"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {groupedData.map((quarter) => (
          <div
            key={quarter.name}
            className="bg-foreground/5 backdrop-blur-lg border-2 rounded-lg p-5"
          >
            <div className="text-sm font-semibold mb-2">{quarter.name}</div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Sales :</span>
                <span className="font-medium text-blue-600">
                  ${quarter.sales}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Expenses :</span>
                <span className="font-medium text-purple-600">
                  ${quarter.expenses}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Profit :</span>
                <span
                  className={`font-medium ${quarter.profit >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  ${quarter.profit}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
