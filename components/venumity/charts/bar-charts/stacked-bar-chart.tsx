// app/charts/stacked/page.tsx
"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Package } from "lucide-react";

const stackedData = [
  { name: "Jan", productA: 4000, productB: 2400, productC: 3200 },
  { name: "Feb", productA: 3000, productB: 1398, productC: 2800 },
  { name: "Mar", productA: 5000, productB: 9800, productC: 2000 },
  { name: "Apr", productA: 4500, productB: 3908, productC: 2500 },
  { name: "May", productA: 6000, productB: 4800, productC: 3500 },
  { name: "Jun", productA: 5500, productB: 3800, productC: 3000 },
];

export default function StackedBarChart() {
  const totals = stackedData.reduce(
    (acc, month) => ({
      productA: acc.productA + month.productA,
      productB: acc.productB + month.productB,
      productC: acc.productC + month.productC,
    }),
    { productA: 0, productB: 0, productC: 0 },
  );

  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-5">
        <div>
          <h3 className="text-3xl font-semibold">Product Performance Stack</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Stacked view of product contributions
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-orange-500/10 px-4 py-2 rounded-lg">
            <span className="text-xs text-orange-600">Product A</span>
            <p className="text-lg font-bold text-orange-600">
              ${(totals.productA / 1000).toFixed(1)}K
            </p>
          </div>
          <div className="bg-blue-500/10 px-4 py-2 rounded-lg">
            <span className="text-xs text-blue-600">Product B</span>
            <p className="text-lg font-bold text-blue-600">
              ${(totals.productB / 1000).toFixed(1)}K
            </p>
          </div>
          <div className="bg-green-500/10 px-4 py-2 rounded-lg">
            <span className="text-xs text-green-600">Product C</span>
            <p className="text-lg font-bold text-green-600">
              ${(totals.productC / 1000).toFixed(1)}K
            </p>
          </div>
        </div>
      </div>

      <div className="h-100 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={stackedData}
            margin={{ left: -25, right: 20, top: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorProductA" x1="0" y1="0" x2="0" y2="1" />
              <linearGradient id="colorProductB" x1="0" y1="0" x2="0" y2="1" />
              <linearGradient id="colorProductC" x1="0" y1="0" x2="0" y2="1" />
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-foreground/20"
            />
            <XAxis
              dataKey="name"
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(215 20% 65%)" }}
            />
            <YAxis
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}K`}
              tick={{ fill: "hsl(215 20% 65%)" }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const total = payload.reduce(
                    (sum, entry) => sum + (entry.value as number),
                    0,
                  );
                  return (
                    <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-3">
                      <p className="text-sm font-medium mb-2">{label}</p>
                      {payload.map((entry) => (
                        <div
                          key={entry.name}
                          className="flex items-center justify-between gap-4 text-sm"
                        >
                          <span style={{ color: entry.color }}>
                            {entry.name}:
                          </span>
                          <span className="font-bold">
                            ${entry.value?.toLocaleString()}
                          </span>
                        </div>
                      ))}
                      <div className="border-t mt-2 pt-2 flex justify-between text-sm font-bold">
                        <span>Total:</span>
                        <span>${total.toLocaleString()}</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => {
                const colors = {
                  productA: "text-orange-600",
                  productB: "text-blue-600",
                  productC: "text-green-600",
                };
                return (
                  <span
                    className={`text-sm font-medium capitalize px-2 ${colors[value as keyof typeof colors]}`}
                  >
                    {value.replace("product", "Product ")}
                  </span>
                );
              }}
            />
            <Bar
              dataKey="productA"
              stackId="a"
              fill="url(#colorProductA)"
              animationDuration={1500}
              className="fill-orange-500"
            />
            <Bar
              dataKey="productB"
              stackId="a"
              fill="url(#colorProductB)"
              animationDuration={1500}
              className="fill-blue-500"
            />
            <Bar
              dataKey="productC"
              stackId="a"
              fill="url(#colorProductC)"
              radius={[10, 10, 0, 0]}
              animationDuration={1500}
              className="fill-green-500"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Product Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Package className="size-5 text-orange-600" />
            <h3 className="font-semibold text-orange-600">Product A</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Revenue:</span>
              <span className="font-bold">
                ${totals.productA.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Best Month:</span>
              <span className="font-bold">May ($6,000)</span>
            </div>
            <div className="w-full bg-orange-500/30 rounded-full h-1.5 mt-2">
              <div
                className="bg-orange-600 h-1.5 rounded-full"
                style={{
                  width: `${(totals.productA / (totals.productA + totals.productB + totals.productC)) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Package className="size-5 text-blue-600" />
            <h3 className="font-semibold text-blue-600">Product B</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Revenue:</span>
              <span className="font-bold">
                ${totals.productB.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Best Month:</span>
              <span className="font-bold">Mar ($9,800)</span>
            </div>
            <div className="w-full bg-blue-500/30 rounded-full h-1.5 mt-2">
              <div
                className="bg-blue-600 h-1.5 rounded-full"
                style={{
                  width: `${(totals.productB / (totals.productA + totals.productB + totals.productC)) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Package className="size-5 text-green-600" />
            <h3 className="font-semibold text-green-600">Product C</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Revenue:</span>
              <span className="font-bold">
                ${totals.productC.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Best Month:</span>
              <span className="font-bold">May ($3,500)</span>
            </div>
            <div className="w-full bg-green-500/30 rounded-full h-1.5 mt-2">
              <div
                className="bg-green-600 h-1.5 rounded-full"
                style={{
                  width: `${(totals.productC / (totals.productA + totals.productB + totals.productC)) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
