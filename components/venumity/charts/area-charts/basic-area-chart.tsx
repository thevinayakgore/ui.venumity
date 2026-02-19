// app/charts/area/basic/page.tsx
"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Calendar, Activity } from "lucide-react";

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

export default function BasicAreaChart() {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const average = total / data.length;

  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-3xl font-semibold">Revenue Trend Analysis</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Monthly revenue with area fill visualization
          </p>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="bg-orange-500/10 px-4 py-2 rounded-lg">
            <span className="text-xs text-orange-600">Total Revenue</span>
            <p className="text-xl font-bold text-orange-600">
              ${(total / 1000).toFixed(1)}K
            </p>
          </div>
          <div className="bg-red-500/10 px-4 py-2 rounded-lg">
            <span className="text-xs text-red-600">Monthly Avg</span>
            <p className="text-xl font-bold text-red-600">
              ${(average / 1000).toFixed(1)}K
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
              <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.02} />
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
              tickFormatter={(value) => `$${value / 1000}K`}
              padding={{ top: 45, bottom: 20 }}
              tick={{ fill: "hsl(215 20% 65%)" }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-3">
                      <p className="text-sm font-medium mb-1">{label}</p>
                      <p className="text-lg font-bold text-orange-600">
                        ${payload[0].value?.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {(((payload[0].value as number) / total) * 100).toFixed(
                          1,
                        )}
                        % of total
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#f97316"
              strokeWidth={3}
              fill="url(#colorOrange)"
              animationDuration={1500}
              animationEasing="ease-out"
              dot={{ fill: "#f97316", strokeWidth: 0, r: 4 }}
              activeDot={{
                fill: "#f97316",
                stroke: "white",
                strokeWidth: 2,
                r: 6,
              }}
            />
          </AreaChart>
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
            <Activity className="size-4" />
            <span className="text-xs">Growth Rate</span>
          </div>
          <div className="text-lg font-semibold text-green-600">+100%</div>
          <div className="text-sm text-muted-foreground">Feb to Nov</div>
        </div>
        <div className="bg-muted border rounded-lg p-3">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <TrendingUp className="size-4" />
            <span className="text-xs">Q4 Average</span>
          </div>
          <div className="text-lg font-semibold">$6,500</div>
          <div className="text-sm text-muted-foreground">Oct-Dec</div>
        </div>
      </div>
    </main>
  );
}
