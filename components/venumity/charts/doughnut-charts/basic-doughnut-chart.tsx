"use client";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const doughnutData = [
  { name: "Direct", value: 400, color: "hsl(24 100% 55%)" },
  { name: "Social", value: 300, color: "hsl(220 90% 56%)" },
  { name: "Email", value: 300, color: "hsl(142 76% 36%)" },
  { name: "Organic", value: 200, color: "hsl(45 93% 58%)" },
];

export default function DoughnutChart() {
  return (
    <main className="flex flex-col items-center justify-center m-auto p-5 border rounded-md overflow-hidden max-w-6xl w-full h-130">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={doughnutData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            strokeWidth={2}
            stroke="white"
          >
            {doughnutData.map((entry, index) => (
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
            formatter={(value) => [`${value} visits`, "Traffic"]}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </main>
  );
}
