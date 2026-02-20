// app/charts/scatter/3d/page.tsx
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
import { Layers, CircleDot, Sparkles } from "lucide-react";

const scatter3DData = [
  { x: 10, y: 30, z: 200, category: "A", volume: 200 },
  { x: 30, y: 40, z: 300, category: "A", volume: 300 },
  { x: 45, y: 50, z: 250, category: "A", volume: 250 },
  { x: 50, y: 60, z: 400, category: "B", volume: 400 },
  { x: 70, y: 70, z: 350, category: "B", volume: 350 },
  { x: 80, y: 80, z: 450, category: "B", volume: 450 },
  { x: 90, y: 90, z: 500, category: "C", volume: 500 },
  { x: 100, y: 100, z: 550, category: "C", volume: 550 },
];

const CATEGORY_COLORS = {
  A: "#f97316",
  B: "#3b82f6",
  C: "#10b981",
};

export default function Scatter3DPlot() {
  // Group data by category
  const categories = Object.keys(CATEGORY_COLORS);
  const categoryStats = categories.map((cat) => {
    const items = scatter3DData.filter((d) => d.category === cat);
    const avgX = Math.round(
      items.reduce((acc, item) => acc + item.x, 0) / items.length,
    );
    const avgY = Math.round(
      items.reduce((acc, item) => acc + item.y, 0) / items.length,
    );
    return { category: cat, count: items.length, avgX, avgY };
  });

  return (
    <main className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold">3D Cluster Analysis</h1>
        <p className="text-muted-foreground mt-2">
          Multi-dimensional clustering with bubble size representing volume
        </p>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {categoryStats.map((stat) => (
          <div
            key={stat.category}
            className="rounded-lg p-4 border"
            style={{
              backgroundColor: `${CATEGORY_COLORS[stat.category as keyof typeof CATEGORY_COLORS]}10`,
              borderColor: `${CATEGORY_COLORS[stat.category as keyof typeof CATEGORY_COLORS]}30`,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="p-1.5 rounded-lg"
                style={{
                  backgroundColor: `${CATEGORY_COLORS[stat.category as keyof typeof CATEGORY_COLORS]}20`,
                }}
              >
                <Layers
                  className="size-4"
                  style={{
                    color:
                      CATEGORY_COLORS[
                        stat.category as keyof typeof CATEGORY_COLORS
                      ],
                  }}
                />
              </div>
              <span className="font-medium">Cluster {stat.category}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Points</p>
                <p
                  className="font-bold text-lg"
                  style={{
                    color:
                      CATEGORY_COLORS[
                        stat.category as keyof typeof CATEGORY_COLORS
                      ],
                  }}
                >
                  {stat.count}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Avg X</p>
                <p className="font-bold">{stat.avgX}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Avg Y</p>
                <p className="font-bold">{stat.avgY}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Container */}
      <div className="h-120 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ left: -25, right: 20, top: 20, bottom: 20 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-foreground/15"
            />
            <XAxis
              type="number"
              dataKey="x"
              name="Feature X"
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(215 20% 65%)" }}
              domain={[0, 110]}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Feature Y"
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(215 20% 65%)" }}
              domain={[20, 110]}
            />
            <ZAxis type="number" dataKey="z" range={[80, 600]} name="Volume" />
            <Tooltip
              cursor={{ strokeDasharray: "3 3", stroke: "hsl(215 20% 65%)" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-background/80 backdrop-blur-sm border rounded-lg shadow-xl p-4 min-w-55">
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="size-3 rounded-full"
                          style={{
                            backgroundColor:
                              CATEGORY_COLORS[
                                data.category as keyof typeof CATEGORY_COLORS
                              ],
                          }}
                        />
                        <p className="text-sm font-medium">
                          Cluster {data.category}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Feature X:
                          </span>
                          <span className="font-bold">{data.x}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Feature Y:
                          </span>
                          <span className="font-bold">{data.y}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Volume:</span>
                          <span className="font-bold text-emerald-600">
                            {data.z}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter
              name="Clusters"
              data={scatter3DData}
              strokeWidth={1}
              stroke="white"
              shape="circle"
            >
              {scatter3DData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    CATEGORY_COLORS[
                      entry.category as keyof typeof CATEGORY_COLORS
                    ]
                  }
                  fillOpacity={0.7}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Data Points Table */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-5 flex items-center gap-2">
          <CircleDot className="size-5" />
          All Data Points by Cluster
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-fit">
          {categories.map((cat) => (
            <div key={cat} className="space-y-3 w-full">
              <h4 className="text-xs font-medium flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      CATEGORY_COLORS[cat as keyof typeof CATEGORY_COLORS],
                  }}
                />
                Cluster {cat}
              </h4>
              {scatter3DData
                .filter((d) => d.category === cat)
                .map((point, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-5 bg-foreground/5 backdrop-blur-sm border rounded-md px-4 py-3 text-xs w-fit"
                  >
                    <span>X:{point.x}</span>
                    <span>Y:{point.y}</span>
                    <span
                      style={{
                        color:
                          CATEGORY_COLORS[cat as keyof typeof CATEGORY_COLORS],
                      }}
                      className="font-bold"
                    >
                      V:{point.z}
                    </span>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex justify-center">
        <div className="inline-flex items-center gap-4 bg-card border px-4 py-3 rounded-full">
          <Sparkles className="size-4 text-muted-foreground" />
          <span className="text-sm">
            Bubble size represents volume - Larger bubbles = higher volume
          </span>
        </div>
      </div>
    </main>
  );
}
