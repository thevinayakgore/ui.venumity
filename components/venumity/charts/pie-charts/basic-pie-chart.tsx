// app/charts/pie/basic/page.tsx
"use client";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const pieData = [
  { name: "Group A", value: 400, color: "#f97316" },
  { name: "Group B", value: 300, color: "#3b82f6" },
  { name: "Group C", value: 300, color: "#10b981" },
  { name: "Group D", value: 200, color: "#eab308" },
];

export default function BasicPieChart() {
  const total = pieData.reduce((acc, item) => acc + item.value, 0);

  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-5">
        <div>
          <h2 className="text-3xl font-semibold">Basic Pie Chart</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Distribution with percentage labels and legend
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-muted/50 px-4 py-2 rounded-lg">
            <span className="text-xs text-muted-foreground">Total</span>
            <p className="text-lg font-bold">{total}</p>
          </div>
        </div>
      </div>
      <div className="h-100 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, percent }) =>
                `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
              }
              outerRadius={140}
              fill="#8884d8"
              dataKey="value"
              strokeWidth={2}
              stroke="hsl(var(--background))"
            >
              {pieData.map((entry, index) => (
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
                        {payload[0].value} (
                        {(((payload[0].value as number) / total) * 100).toFixed(
                          1,
                        )}
                        %)
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value, entry) => (
                <span
                  className="text-sm font-medium"
                  style={{ color: entry.color }}
                >
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {pieData.map((item) => (
          <div
            key={item.name}
            className="bg-foreground/5 backdrop-blur-sm border rounded-lg py-3 px-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            <p className="text-lg font-bold" style={{ color: item.color }}>
              {((item.value / total) * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">{item.value} units</p>
          </div>
        ))}
      </div>
    </main>
  );
}
