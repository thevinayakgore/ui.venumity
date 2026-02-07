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
  Legend,
} from "recharts";

const scatterData01 = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];

const scatterData02 = [
  { x: 200, y: 260, z: 240 },
  { x: 240, y: 290, z: 220 },
  { x: 190, y: 290, z: 250 },
  { x: 198, y: 250, z: 210 },
  { x: 180, y: 280, z: 260 },
  { x: 210, y: 220, z: 230 },
];

export default function BasicScatterPlot() {
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
            name="Price"
            unit="$"
            stroke="hsl(215 20% 65%)"
            fontSize={14}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "hsl(215 0% 50%)" }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Sales"
            unit=" units"
            stroke="hsl(215 20% 65%)"
            fontSize={14}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "hsl(215 0% 50%)" }}
          />
          <ZAxis type="number" dataKey="z" range={[60, 400]} name="Revenue" />
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
            formatter={(value, name) => {
              if (name === "x") return [`$${value}`, "Price"];
              if (name === "y") return [`${value}`, "Sales"];
              return [`$${value}`, "Revenue"];
            }}
          />
          <Legend />
          <Scatter
            name="Product A"
            data={scatterData01}
            fill="hsl(24 100% 55% / 0.7)"
            stroke="hsl(24 100% 55%)"
            strokeWidth={1}
          />
          <Scatter
            name="Product B"
            data={scatterData02}
            fill="hsl(220 90% 56% / 0.7)"
            stroke="hsl(220 90% 56%)"
            strokeWidth={1}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </main>
  );
}
