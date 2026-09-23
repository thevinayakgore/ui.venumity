"use client";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  value: {
    label: "Result",
    color: "var(--color-green-500)",
  },
} satisfies ChartConfig;

const winLossData = [
  { day: "Mon", result: 1, value: 120 },
  { day: "Tue", result: -1, value: -80 },
  { day: "Wed", result: 1, value: 90 },
  { day: "Thu", result: 1, value: 150 },
  { day: "Fri", result: -1, value: -60 },
  { day: "Sat", result: 1, value: 200 },
  { day: "Sun", result: -1, value: -45 },
  { day: "Mon", result: 1, value: 110 },
  { day: "Tue", result: -1, value: -95 },
  { day: "Wed", result: 1, value: 130 },
];

interface TooltipPayloadItem {
  value?: number;
  payload?: {
    day: string;
    result: number;
    value: number;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

function formatValue(value: number) {
  return `${value > 0 ? "+" : ""}${value}`;
}

function getResultLabel(result: number) {
  return result > 0 ? "Win" : "Loss";
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0]?.payload;

  if (!item) {
    return null;
  }

  const isWin = item.result > 0;

  return (
    <div className="min-w-36 rounded-lg border border-border/60 bg-background p-3 shadow-lg">
      <p className="mb-1 text-sm font-medium">{item.day}</p>
      <p
        className={`text-lg font-bold ${
          isWin ? "text-green-500" : "text-red-500"
        }`}
      >
        {getResultLabel(item.result)} ({formatValue(item.value)})
      </p>
      <p className="mt-1 text-xs text-foreground/50">
        {isWin ? "Positive result" : "Negative result"}
      </p>
    </div>
  );
}

export default function WinLossSparkline() {
  const wins = winLossData.filter((item) => item.result > 0).length;
  const losses = winLossData.filter((item) => item.result < 0).length;
  const winRate = ((wins / winLossData.length) * 100).toFixed(1);
  const totalReturn = winLossData.reduce(
    (totalValue, item) => totalValue + item.value,
    0,
  );
  const longestStreak = Math.max(
    ...winLossData.reduce((streaks, item, index, data) => {
      if (index === 0 || item.result !== data[index - 1].result) {
        streaks.push(1);
      } else {
        streaks[streaks.length - 1]++;
      }
      return streaks;
    }, [] as number[]),
  );
  const winLossRatio = losses > 0 ? wins / losses : wins;
  const largestWin = Math.max(
    ...winLossData.filter((item) => item.result > 0).map((item) => item.value),
  );
  const largestLoss = Math.min(
    ...winLossData.filter((item) => item.result < 0).map((item) => item.value),
  );

  return (
    <div className="p-5 md:p-10 w-full">
      <div className="flex flex-col border rounded-2xl overflow-hidden m-auto max-w-lg w-full">
        <div className="p-5">
          <h2 className="text-3xl font-semibold tracking-tight">
            Win/Loss Sparkline
          </h2>
          <p className="mt-1 text-sm text-foreground/50">
            Positive and negative outcome visualization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-5">
          <div className="p-3 bg-foreground/5 border rounded-xl">
            <p className="text-xs text-foreground/50">Win rate</p>
            <div className="mt-1 text-2xl font-semibold">{winRate}%</div>
            <p className="text-[0.7rem] text-foreground/50">
              Successful outcomes
            </p>
          </div>
          <div className="p-3 bg-foreground/5 border rounded-xl">
            <p className="text-xs text-foreground/50">Total return</p>
            <div
              className={`mt-1 text-2xl font-semibold ${
                totalReturn >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {totalReturn >= 0 ? "+" : ""}
              {totalReturn}
            </div>
            <p className="mt-1 text-xs text-foreground/50">Points</p>
          </div>
          <div className="p-3 bg-foreground/5 border rounded-xl">
            <p className="text-xs text-foreground/50">Longest streak</p>
            <div className="mt-1 text-2xl font-semibold">{longestStreak}</div>
            <p className="mt-1 text-xs text-foreground/50">
              Consecutive results
            </p>
          </div>
        </div>

        <div className="h-52 w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart
              data={winLossData}
              margin={{
                top: 20,
                right: 0,
                left: -60,
                bottom: -30,
              }}
            >
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={false}
              />
              <YAxis tickLine={false} axisLine={false} tick={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                barSize={32}
                shape={(props: {
                  x?: number;
                  y?: number;
                  width?: number;
                  height?: number;
                  payload?: {
                    result: number;
                  };
                }) => {
                  const {
                    x = 0,
                    y = 0,
                    width = 0,
                    height = 0,
                    payload,
                  } = props;
                  const isWin = (payload?.result ?? -1) > 0;
                  const barColor = isWin
                    ? "var(--color-green-500)"
                    : "var(--color-red-500)";
                  return (
                    <rect
                      x={x}
                      y={isWin ? y : y + height}
                      width={Math.max(width - 4, 0)}
                      height={Math.abs(height)}
                      rx={4}
                      fill={barColor}
                    />
                  );
                }}
              />
            </BarChart>
          </ChartContainer>
        </div>

        <div className="border-y p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium">Pattern view</span>
            <span className="text-xs text-foreground/50">
              {winLossData.length} total outcomes
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {winLossData.map((item, index) => (
              <div
                key={`${item.day}-${index}`}
                className={`flex size-8 items-center justify-center rounded-md border text-xs font-bold ${
                  item.result > 0
                    ? "border-green-500/30 bg-green-500/15 text-green-500"
                    : "border-red-500/30 bg-red-500/15 text-red-500"
                }`}
              >
                {item.result > 0 ? "W" : "L"}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 bg-foreground/5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm">
            <span className="text-foreground/50">Win/Loss ratio: </span>
            <span className="font-bold">{winLossRatio.toFixed(2)}</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="size-3 text-green-500" />
              <span className="text-xs">Wins: {wins}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingDown className="size-3 text-red-500" />
              <span className="text-xs">Losses: {losses}</span>
            </div>
            <div className="text-xs text-foreground/50">
              Best: +{largestWin} · Worst: {largestLoss}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
