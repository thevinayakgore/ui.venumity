"use client";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const lineSparklineData = [
  { day: "Mon", visitors: 1200, sales: 4500 },
  { day: "Tue", visitors: 1350, sales: 5200 },
  { day: "Wed", visitors: 1100, sales: 4800 },
  { day: "Thu", visitors: 1400, sales: 6100 },
  { day: "Fri", visitors: 1550, sales: 7200 },
  { day: "Sat", visitors: 1700, sales: 8900 },
  { day: "Sun", visitors: 1600, sales: 8100 },
];

export default function LineSparkline() {
  const totalVisitors = lineSparklineData.reduce(
    (acc, item) => acc + item.visitors,
    0,
  );
  const totalSales = lineSparklineData.reduce(
    (acc, item) => acc + item.sales,
    0,
  );
  const trend =
    lineSparklineData[lineSparklineData.length - 1].visitors >
    lineSparklineData[0].visitors
      ? "up"
      : "down";

  return (
    <main className="my-10 p-4 md:p-6 border rounded-2xl max-w-3xl m-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold">Line Sparkline</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Trend visualization for visitors and sales
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-purple-500/10 px-4 py-2 rounded-lg border border-purple-500/20">
            <span className="text-xs text-purple-600">Visitors</span>
            <p className="text-lg font-medium text-purple-600">{totalVisitors}</p>
          </div>
          <div className="bg-pink-500/10 px-4 py-2 rounded-lg border border-pink-500/20">
            <span className="text-xs text-pink-600">Sales</span>
            <p className="text-lg font-medium text-pink-600">
              ${(totalSales / 1000).toFixed(1)}K
            </p>
          </div>
        </div>
      </div>
      {/* Trend Indicators */}
      <div className="grid grid-cols-2 gap-4 my-6">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Visitor Trend</span>
            {trend === "up" ? (
              <TrendingUp className="size-4 text-green-600" />
            ) : trend === "down" ? (
              <TrendingDown className="size-4 text-red-600" />
            ) : (
              <Minus className="size-4 text-yellow-600" />
            )}
          </div>
          <div className="text-2xl font-medium mt-2">
            {(
              ((lineSparklineData[lineSparklineData.length - 1].visitors -
                lineSparklineData[0].visitors) /
                lineSparklineData[0].visitors) *
              100
            ).toFixed(1)}
            %
          </div>
          <div className="text-xs text-muted-foreground">Week over week</div>
        </div>
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Sales Trend</span>
            {lineSparklineData[lineSparklineData.length - 1].sales >
            lineSparklineData[0].sales ? (
              <TrendingUp className="size-4 text-green-600" />
            ) : (
              <TrendingDown className="size-4 text-red-600" />
            )}
          </div>
          <div className="text-2xl font-medium mt-2">
            {(
              ((lineSparklineData[lineSparklineData.length - 1].sales -
                lineSparklineData[0].sales) /
                lineSparklineData[0].sales) *
              100
            ).toFixed(1)}
            %
          </div>
          <div className="text-xs text-muted-foreground">Week over week</div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={lineSparklineData}
            margin={{ left: -20, right: 20, top: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215 20% 65%)", fontSize: 11 }}
            />
            <YAxis yAxisId="left" hide />
            <YAxis yAxisId="right" orientation="right" hide />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-3">
                      <p className="text-sm font-medium mb-2">
                        {payload[0].payload.day}
                      </p>
                      <div className="space-y-1">
                        <p className="text-xs flex items-center gap-2">
                          <span className="size-2 rounded-full bg-purple-500" />
                          <span>Visitors: {payload[0].value}</span>
                        </p>
                        <p className="text-xs flex items-center gap-2">
                          <span className="size-2 rounded-full bg-pink-500" />
                          <span>Sales: ${payload[1].value}</span>
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="visitors"
              stroke="#a855f7"
              strokeWidth={3}
              dot={{ fill: "#a855f7", r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={2000}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="sales"
              stroke="#ec4899"
              strokeWidth={3}
              dot={{ fill: "#ec4899", r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={2000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Mini Trend Preview */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <div className="size-2 rounded-full bg-purple-500" />
            <span className="text-xs">Visitors</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="size-2 rounded-full bg-pink-500" />
            <span className="text-xs">Sales</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          Peak: {Math.max(...lineSparklineData.map((d) => d.visitors))} visitors
        </div>
      </div>
    </main>
  );
}
