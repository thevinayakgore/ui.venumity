"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const semiDoughnutData = [
  { name: "Completed", value: 75, color: "hsl(142 76% 36%)" },
  { name: "Remaining", value: 25, color: "hsl(215 20% 65% / 0.1)" },
];

export default function SemiDoughnutChart() {
  return (
    <main className="flex flex-col items-center justify-center m-auto p-5 border rounded-md overflow-hidden max-w-6xl w-full h-130">
      <div className="relative w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={semiDoughnutData}
              cx="50%"
              cy="90%"
              startAngle={180}
              endAngle={0}
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={0}
              dataKey="value"
              strokeWidth={2}
              stroke="white"
            >
              {semiDoughnutData.map((entry, index) => (
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
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-3xl font-bold text-foreground">75%</div>
          <div className="text-sm text-muted-foreground">Task Completion</div>
        </div>
      </div>
    </main>
  );
}
