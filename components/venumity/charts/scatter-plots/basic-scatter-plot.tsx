// app/charts/scatter/basic/page.tsx
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
import { Package, BarChart3 } from "lucide-react";

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
  // Calculate averages
  const avgPriceA = Math.round(
    scatterData01.reduce((acc, item) => acc + item.x, 0) / scatterData01.length,
  );
  const avgSalesA = Math.round(
    scatterData01.reduce((acc, item) => acc + item.y, 0) / scatterData01.length,
  );
  const avgPriceB = Math.round(
    scatterData02.reduce((acc, item) => acc + item.x, 0) / scatterData02.length,
  );
  const avgSalesB = Math.round(
    scatterData02.reduce((acc, item) => acc + item.y, 0) / scatterData02.length,
  );

  return (
    <main className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold">Product Performance Scatter</h1>
        <p className="text-foreground/80 mt-2">
          Bubble size represents revenue - Compare price vs sales relationship
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Package className="size-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-500">
              Product A
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/80">Avg Price :</span>
              <span className="font-bold text-orange-500">${avgPriceA}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/80">Avg Sales :</span>
              <span className="font-bold text-orange-500">
                {avgSalesA} units
              </span>
            </div>
          </div>
        </div>
        <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Package className="size-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-500">Product B</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/80">Avg Price :</span>
              <span className="font-bold text-blue-500">${avgPriceB}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/80">Avg Sales :</span>
              <span className="font-bold text-blue-500">{avgSalesB} units</span>
            </div>
          </div>
        </div>
        <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="size-4 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-500">
              Key Insight
            </span>
          </div>
          <p className="text-sm">
            Product A performs better at lower price points, while Product B
            maintains steady sales at higher prices
          </p>
        </div>
      </div>

      {/* Chart Container */}
      <div className="rounded-xl border shadow-lg p-6">
        <div className="h-120 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ left: -25, right: 20, top: 20, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-foreground/15"
              />
              <XAxis
                type="number"
                dataKey="x"
                name="Price"
                unit="$"
                stroke="hsl(215 20% 65%)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "hsl(215 20% 65%)" }}
                domain={[80, 260]}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Sales"
                unit=" units"
                stroke="hsl(215 20% 65%)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "hsl(215 20% 65%)" }}
                domain={[80, 420]}
              />
              <ZAxis
                type="number"
                dataKey="z"
                range={[80, 500]}
                name="Revenue"
                unit="$"
              />
              <Tooltip
                cursor={{
                  strokeDasharray: "3 3",
                  stroke: "hsl(215 20% 65%)",
                }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background/80 backdrop-blur-sm border rounded-lg shadow-xl p-4 min-w-50">
                        <p className="text-sm font-medium mb-2">
                          {payload[0].name}
                        </p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-foreground/80">Price:</span>
                            <span className="font-bold text-orange-500">
                              ${data.x}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-foreground/80">Sales:</span>
                            <span className="font-bold text-blue-500">
                              {data.y} units
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-foreground/80">Revenue:</span>
                            <span className="font-bold text-emerald-500">
                              ${data.z}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) => (
                  <span className="text-sm font-medium px-2">{value}</span>
                )}
              />
              <Scatter
                name="Product A"
                data={scatterData01}
                fill="#f97316"
                fillOpacity={0.6}
                stroke="#f97316"
                strokeWidth={1}
                shape="circle"
              />
              <Scatter
                name="Product B"
                data={scatterData02}
                fill="#3b82f6"
                fillOpacity={0.6}
                stroke="#3b82f6"
                strokeWidth={1}
                shape="circle"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Data Points Summary */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <div className="size-5 rounded-full bg-orange-500/50 border-2 border-orange-500/60" />
              Product A Data Points
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {scatterData01.map((point, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 bg-foreground/5 backdrop-blur-sm border rounded-md p-3 text-xs w-full"
                >
                  <span>${point.x}</span>
                  <span>{point.y} units</span>
                  <span className="text-orange-500 font-bold">${point.z}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <div className="size-5 rounded-full bg-blue-500/50 border-2 border-blue-500/60" />
              Product B Data Points
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {scatterData02.map((point, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 bg-foreground/5 backdrop-blur-sm border rounded-md p-3 text-xs w-full"
                >
                  <span>${point.x}</span>
                  <span>{point.y} units</span>
                  <span className="text-blue-500 font-bold">${point.z}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
