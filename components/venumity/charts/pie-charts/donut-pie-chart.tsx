"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const donutData = [
  { name: "Mobile", value: 44.7, color: "hsl(24 100% 55%)" },
  { name: "Desktop", value: 32.8, color: "hsl(220 90% 56%)" },
  { name: "Tablet", value: 15.8, color: "hsl(142 76% 36%)" },
  { name: "Other", value: 6.7, color: "hsl(45 93% 58%)" },
];

export default function DonutPieChart() {
  return (
    <main className="flex flex-col items-center justify-center m-auto p-5 border rounded-md overflow-hidden max-w-6xl w-full h-130">
      <div className="relative w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={donutData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              strokeWidth={2}
              stroke="white"
            >
              {donutData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                padding: "10px 15px",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                border: "1px solid white",
                borderRadius: "7px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                backdropFilter: "blur(3px)",
              }}
              formatter={(value) => [`${value}%`, "Market Share"]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-2xl font-bold text-foreground">Devices</div>
          <div className="text-sm text-muted-foreground">Usage Share</div>
        </div>
      </div>
    </main>
  );
}
