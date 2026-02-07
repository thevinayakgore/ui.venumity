"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const gaugeData = [
  { name: "Used", value: 65, color: "hsl(24 100% 55%)" },
  { name: "Remaining", value: 35, color: "hsl(215 20% 65% / 0.1)" },
];

export default function GaugeChart() {
  return (
    <main className="flex flex-col items-center justify-center m-auto p-5 border rounded-md overflow-hidden max-w-6xl w-full h-130">
      <div className="relative w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={gaugeData}
              cx="50%"
              cy="80%"
              startAngle={180}
              endAngle={0}
              innerRadius="70%"
              outerRadius="100%"
              paddingAngle={0}
              dataKey="value"
              strokeWidth={0}
            >
              {gaugeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-4xl font-bold text-foreground">65%</div>
          <div className="text-sm text-muted-foreground">Storage Used</div>
        </div>
      </div>
    </main>
  );
}
