// app/charts/horizontal/page.tsx
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
import { Building2, Briefcase } from "lucide-react";

const horizontalData = [
  { name: "Marketing", value: 8500 },
  { name: "Sales", value: 7200 },
  { name: "Development", value: 9300 },
  { name: "Support", value: 4300 },
  { name: "HR", value: 2900 },
  { name: "Finance", value: 5100 },
  { name: "Operations", value: 6200 },
];

export default function HorizontalBarChart() {
  const total = horizontalData.reduce((acc, item) => acc + item.value, 0);
  const topDept = horizontalData.reduce((max, item) =>
    item.value > max.value ? item : max,
  );

  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 mb-5">
        <div>
          <h3 className="text-3xl font-semibold">
            Department Budget Allocation
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Budget distribution across departments
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-muted border px-4 py-2 rounded-lg">
            <span className="text-xs text-muted-foreground">Total Budget</span>
            <p className="text-lg font-bold">${(total / 1000).toFixed(1)}K</p>
          </div>
          <div className="bg-muted border px-4 py-2 rounded-lg">
            <span className="text-xs text-muted-foreground">Top Dept</span>
            <p className="text-lg font-bold">{topDept.name}</p>
          </div>
        </div>
      </div>
      <div className="h-120 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={horizontalData}
            layout="vertical"
            margin={{ left: 20, right: 20, top: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorHorizontal" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-foreground/20"
            />
            <XAxis
              type="number"
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}K`}
              tick={{ fill: "hsl(215 20% 65%)" }}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(215 20% 65%)" }}
              width={100}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background border rounded-lg shadow-lg p-3">
                      <p className="text-sm font-medium mb-1">
                        {payload[0].payload.name}
                      </p>
                      <p className="text-lg font-bold text-blue-600">
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
              radius={[0, 10, 10, 0]}
              animationDuration={1500}
              barSize={40}
              label={{
                position: "right",
                formatter: (value: number) => `$${value / 1000}K`,
                fontSize: 13,
              }}
              className="fill-blue-500"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Department Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-muted border rounded-lg p-3">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Building2 className="size-4" />
            <span className="text-xs">Highest Budget</span>
          </div>
          <div className="text-lg font-semibold">Development</div>
          <div className="text-sm text-muted-foreground">$9,300</div>
        </div>
        <div className="bg-muted border rounded-lg p-3">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Briefcase className="size-4" />
            <span className="text-xs">Lowest Budget</span>
          </div>
          <div className="text-lg font-semibold">HR</div>
          <div className="text-sm text-muted-foreground">$2,900</div>
        </div>
        <div className="bg-muted border rounded-lg p-3">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Building2 className="size-4" />
            <span className="text-xs">Average Budget</span>
          </div>
          <div className="text-lg font-semibold">
            ${Math.round(total / horizontalData.length).toLocaleString()}
          </div>
        </div>
        <div className="bg-muted border rounded-lg p-3">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Briefcase className="size-4" />
            <span className="text-xs">Departments</span>
          </div>
          <div className="text-lg font-semibold">{horizontalData.length}</div>
        </div>
      </div>
    </main>
  );
}
