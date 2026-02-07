"use client";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Cell,
} from "recharts";

const scatter3DData = [
  { x: 10, y: 30, z: 200, category: "A" },
  { x: 30, y: 40, z: 300, category: "A" },
  { x: 45, y: 50, z: 250, category: "A" },
  { x: 50, y: 60, z: 400, category: "B" },
  { x: 70, y: 70, z: 350, category: "B" },
  { x: 80, y: 80, z: 450, category: "B" },
  { x: 90, y: 90, z: 500, category: "C" },
  { x: 100, y: 100, z: 550, category: "C" },
];

const COLORS = [
  "hsl(24 100% 55%)",
  "hsl(220 90% 56%)",
  "hsl(142 76% 36%)",
  "hsl(45 93% 58%)",
];

export default function Scatter3DPlot() {
  return (
    <main className="flex flex-col items-center justify-center m-auto pl-5 pb-5 border rounded-md overflow-hidden max-w-6xl w-full h-130">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ left: -25 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-foreground/10!"
          />
          <XAxis
            type="number"
            dataKey="x"
            name="Feature 1"
            stroke="hsl(215 20% 65%)"
            fontSize={14}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "hsl(215 0% 50%)" }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Feature 2"
            stroke="hsl(215 20% 65%)"
            fontSize={14}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "hsl(215 0% 50%)" }}
          />
          <ZAxis type="number" dataKey="z" range={[60, 400]} name="Value" />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{
              padding: "10px 15px",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              border: "1px solid white",
              borderRadius: "7px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              backdropFilter: "blur(3px)",
            }}
          />
          <Scatter
            name="Clusters"
            data={scatter3DData}
            strokeWidth={1}
            stroke="white"
          >
            {scatter3DData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.category.charCodeAt(0) - 65]}
                opacity={0.7}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </main>
  );
}
