"use client";
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

const winLossData = [
  { day: "Mon", result: 1, value: 120 }, // Win
  { day: "Tue", result: -1, value: -80 }, // Loss
  { day: "Wed", result: 1, value: 90 }, // Win
  { day: "Thu", result: 1, value: 150 }, // Win
  { day: "Fri", result: -1, value: -60 }, // Loss
  { day: "Sat", result: 1, value: 200 }, // Win
  { day: "Sun", result: -1, value: -45 }, // Loss
  { day: "Mon", result: 1, value: 110 }, // Win
  { day: "Tue", result: -1, value: -95 }, // Loss
  { day: "Wed", result: 1, value: 130 }, // Win
];

export default function WinLossSparkline() {
  const wins = winLossData.filter((d) => d.result > 0).length;
  const losses = winLossData.filter((d) => d.result < 0).length;
  const winRate = ((wins / winLossData.length) * 100).toFixed(1);
  const totalReturn = winLossData.reduce((acc, item) => acc + item.value, 0);

  return (
    <main className="my-10 p-4 md:p-6 border rounded-2xl max-w-3xl m-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold">Win/Loss Sparkline</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Binary outcomes visualization
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-green-500/10 px-4 py-2 rounded-lg border border-green-500/20">
            <span className="text-xs text-green-500">Wins</span>
            <p className="text-lg font-bold text-green-500">{wins}</p>
          </div>
          <div className="bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20">
            <span className="text-xs text-red-600">Losses</span>
            <p className="text-lg font-bold text-red-600">{losses}</p>
          </div>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="bg-muted/30 rounded-lg p-4">
          <span className="text-sm text-muted-foreground">Win Rate</span>
          <div className="text-lg font-medium mt-1">{winRate}%</div>
          <div className="w-full bg-muted rounded-full h-1.5 mt-2">
            <div
              className="bg-green-500 h-1.5 rounded-full"
              style={{ width: winRate }}
            />
          </div>
        </div>
        <div className="bg-muted/30 rounded-lg p-4">
          <span className="text-sm text-muted-foreground">Total Return</span>
          <div
            className={`text-lg font-medium mt-1 ${totalReturn >= 0 ? "text-green-500" : "text-red-600"}`}
          >
            {totalReturn >= 0 ? "+" : ""}
            {totalReturn}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Points</div>
        </div>
        <div className="bg-muted/30 rounded-lg p-4">
          <span className="text-sm text-muted-foreground">Longest Streak</span>
          <div className="text-lg font-medium mt-1">
            {Math.max(
              ...winLossData.reduce((streaks, item, i, arr) => {
                if (i === 0 || item.result !== arr[i - 1].result)
                  streaks.push(1);
                else streaks[streaks.length - 1]++;
                return streaks;
              }, [] as number[]),
            )}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Consecutive</div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-50 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={winLossData}
            margin={{ left: -20, right: 20, top: 20, bottom: 20 }}
          >
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215 20% 65%)", fontSize: 10 }}
              interval={0}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-3">
                      <p className="text-sm font-medium">{data.day}</p>
                      <p
                        className={`text-lg font-bold ${data.result > 0 ? "text-green-500" : "text-red-600"}`}
                      >
                        {data.result > 0 ? "Win" : "Loss"} (
                        {data.value > 0 ? "+" : ""}
                        {data.value})
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="value"
              animationDuration={1500}
              shape={(props: {
                x?: number;
                y?: number;
                width?: number;
                height?: number;
                payload?: { result: number };
              }) => {
                const { x = 0, y = 0, width = 0, height = 0, payload } = props;
                const color =
                  payload?.result && payload.result > 0 ? "#10b981" : "#ef4444";

                return (
                  <rect
                    x={x}
                    y={payload?.result && payload.result > 0 ? y : y + height}
                    width={width - 4}
                    height={Math.abs(height)}
                    fill={color}
                    rx={2}
                  />
                );
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Win/Loss Grid */}
      <div className="mt-6">
        <div className="text-sm font-medium mb-2">Pattern View</div>
        <div className="flex flex-wrap gap-1">
          {winLossData.map((item, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-sm flex items-center justify-center text-xs font-bold ${
                item.result > 0
                  ? "bg-green-500/20 text-green-500 border border-green-500/30"
                  : "bg-red-500/20 text-red-600 border border-red-500/30"
              }`}
            >
              {item.result > 0 ? "W" : "L"}
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <div className="text-sm">
          <span className="text-muted-foreground">Win/Loss Ratio: </span>
          <span className="font-bold">{(wins / losses).toFixed(2)}</span>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <TrendingUp className="size-3 text-green-500" />
            <span className="text-xs">Wins: {wins}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingDown className="size-3 text-red-600" />
            <span className="text-xs">Losses: {losses}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
