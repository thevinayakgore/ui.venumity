// app/charts/basic/page.tsx
"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Calendar } from "lucide-react";

const data = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
  { name: "Jul", value: 7000 },
  { name: "Aug", value: 6450 },
  { name: "Sep", value: 7000 },
  { name: "Oct", value: 4000 },
  { name: "Nov", value: 8000 },
  { name: "Dec", value: 6000 },
];

export default function BasicBarChart() {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const average = total / data.length;

  return (
    <main className="p-6 md:p-10">
      <section className="border-b pb-5 mb-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Monthly Revenue Analysis</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Track revenue trends across 2024
            </p>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="bg-muted border px-4 py-2 rounded-lg">
              <span className="text-muted-foreground">Total Revenue</span>
              <p className="text-xl font-bold">${(total / 1000).toFixed(1)}K</p>
            </div>
            <div className="bg-muted border px-4 py-2 rounded-lg">
              <span className="text-muted-foreground">Monthly Avg</span>
              <p className="text-xl font-bold">
                ${(average / 1000).toFixed(1)}K
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="p-6">
        <div className="h-100 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ left: -25, right: 20, top: 20, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2} />
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
                padding={{ left: 10, right: 10 }}
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
                        <p className="text-sm font-medium mb-1">{label}</p>
                        <p className="text-lg font-bold text-blue-500">
                          ${payload[0].value?.toLocaleString()}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="value"
                radius={[10, 10, 0, 0]}
                animationDuration={1500}
                animationEasing="ease-out"
                className="fill-teal-500"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-muted border rounded-lg p-3">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <TrendingUp className="size-4" />
              <span className="text-xs">Peak Month</span>
            </div>
            <div className="text-lg font-semibold">November</div>
            <div className="text-sm text-muted-foreground">$8,000</div>
          </div>
          <div className="bg-muted border rounded-lg p-3">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Calendar className="size-4" />
              <span className="text-xs">Lowest Month</span>
            </div>
            <div className="text-lg font-semibold">February</div>
            <div className="text-sm text-muted-foreground">$3,000</div>
          </div>
          <div className="bg-muted border rounded-lg p-3">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <TrendingUp className="size-4" />
              <span className="text-xs">Growth Rate</span>
            </div>
            <div className="text-lg font-semibold text-green-600">+50%</div>
            <div className="text-sm text-muted-foreground">vs previous</div>
          </div>
          <div className="bg-muted border rounded-lg p-3">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Calendar className="size-4" />
              <span className="text-xs">Best Quarter</span>
            </div>
            <div className="text-lg font-semibold">Q4</div>
            <div className="text-sm text-muted-foreground">$18,000</div>
          </div>
        </div>
      </section>
    </main>
  );
}
