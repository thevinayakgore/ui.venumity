"use client";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const bulletData = [
  {
    name: "Revenue",
    value: 75,
    target: 90,
    ranges: [0, 50, 90, 100],
  },
];

export default function BulletChart() {
  return (
    <main className="flex flex-col items-center justify-center m-auto p-5 border rounded-md overflow-hidden max-w-6xl w-full h-130">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={bulletData}>
          {/* Background ranges */}
          <Bar
            dataKey="ranges.2"
            fill="hsl(142 76% 36% / 0.2)"
            stackId="a"
            barSize={30}
            radius={[4, 4, 4, 4]}
          />
          <Bar
            dataKey="ranges.1"
            fill="hsl(45 93% 58% / 0.3)"
            stackId="a"
            barSize={30}
            radius={[4, 4, 4, 4]}
          />
          <Bar
            dataKey="ranges.0"
            fill="hsl(24 100% 55% / 0.3)"
            stackId="a"
            barSize={30}
            radius={[4, 4, 4, 4]}
          />

          {/* Actual value */}
          <Bar
            dataKey="value"
            fill="hsl(24 100% 55%)"
            barSize={15}
            radius={[2, 2, 2, 2]}
          />

          {/* Target line */}
          <Bar
            dataKey="target"
            fill="hsl(0 0% 0%)"
            barSize={2}
            radius={[1, 1, 1, 1]}
          />

          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis dataKey="name" type="category" hide />
        </BarChart>
      </ResponsiveContainer>
    </main>
  );
}
