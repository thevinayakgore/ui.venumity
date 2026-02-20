// app/charts/pie/donut/page.tsx
"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Smartphone, Monitor, Tablet, Laptop } from "lucide-react";

const donutData = [
  { name: "Mobile", value: 44.7, color: "#f97316", icon: Smartphone },
  { name: "Desktop", value: 32.8, color: "#3b82f6", icon: Monitor },
  { name: "Tablet", value: 15.8, color: "#10b981", icon: Tablet },
  { name: "Other", value: 6.7, color: "#eab308", icon: Laptop },
];

export default function DonutPieChart() {
  const total = donutData.reduce((acc, item) => acc + item.value, 0);

  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-5">
        <div>
          <h2 className="text-3xl font-semibold">Device Market Share</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Donut chart with center label
          </p>
        </div>
      </div>
      <div className="h-100 w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={donutData}
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={140}
              paddingAngle={4}
              dataKey="value"
              strokeWidth={3}
              stroke="hsl(var(--background))"
            >
              {donutData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background/80 backdrop-blur-sm border rounded-lg shadow-lg p-3">
                      <p className="text-sm font-medium mb-1">
                        {payload[0].name}
                      </p>
                      <p
                        className="text-lg font-bold"
                        style={{ color: payload[0].payload.color }}
                      >
                        {payload[0].value}% share
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label */}
        <div className="absolute top-1/2 left-1/2 -z-10 transform -translate-x-1/2 -translate-y-1/2 text-center bg-foreground/5 backdrop-blur-sm py-12 px-5 rounded-full border shadow-lg">
          <div className="text-3xl font-semibold">
            {total.toFixed(1)}%
          </div>
          <div className="text-xs text-muted-foreground">Total Share</div>
        </div>
      </div>
      {/* Device Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {donutData.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.name} className="bg-foreground/5 backdrop-blur-sm border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <Icon className="size-5" style={{ color: item.color }} />
                </div>
                <span className="font-medium">{item.name}</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: item.color }}>
                {item.value}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {((item.value / total) * 100).toFixed(1)}% of total
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
