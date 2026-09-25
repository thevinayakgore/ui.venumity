"use client";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Clock,
  RotateCcw,
  TrendingDown,
  TrendingUp,
  Users2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  users: {
    label: "Users",
    color: "#06b6d4",
  },
} satisfies ChartConfig;

const data = [
  { time: "00:00", users: 120 },
  { time: "04:00", users: 80 },
  { time: "08:00", users: 350 },
  { time: "12:00", users: 780 },
  { time: "16:00", users: 620 },
  { time: "20:00", users: 450 },
  { time: "24:00", users: 200 },
];

type RangeFilter = "all" | "night" | "day" | "evening";
type SortFilter = "default" | "highest" | "lowest";

interface TooltipPayloadItem {
  dataKey?: string;
  value?: number;
  payload?: {
    time: string;
    users: number;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const item = payload[0]?.payload;

  if (!item) return null;

  const peak = Math.max(...data.map((entry) => entry.users));
  const percentageOfPeak = Math.round((item.users / peak) * 100);

  return (
    <div className="min-w-48 rounded-lg border border-border/60 bg-background p-3 shadow-lg">
      <p className="mb-3 border-b border-dashed border-foreground/15 pb-2 text-sm font-semibold md:text-base">
        {item.time}
      </p>

      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <span className="inline-block size-3.5 rounded bg-cyan-500" />
          <span className="text-sm text-foreground/60">Active Users</span>
        </div>

        <span className="font-semibold bg-linear-to-r from-cyan-600 to-green-600 bg-clip-text text-transparent">
          {formatNumber(item.users)}
        </span>
      </div>

      <p className="mt-2 text-xs text-foreground/50">
        {percentageOfPeak}% of daily peak
      </p>
    </div>
  );
}

export default function SplineAreaChart() {
  const [range, setRange] = useState<RangeFilter>("all");
  const [sort, setSort] = useState<SortFilter>("default");

  const filteredData = useMemo(() => {
    let result = [...data];

    if (range === "night") {
      result = result.filter((_, index) => index <= 1 || index === 6);
    }

    if (range === "day") {
      result = result.filter((_, index) => index >= 2 && index <= 4);
    }

    if (range === "evening") {
      result = result.filter((_, index) => index === 5 || index === 6);
    }

    if (sort === "highest") {
      result.sort((a, b) => b.users - a.users);
    }

    if (sort === "lowest") {
      result.sort((a, b) => a.users - b.users);
    }

    return result;
  }, [range, sort]);

  const peak = filteredData.length
    ? Math.max(...filteredData.map((item) => item.users))
    : 0;

  const lowest = filteredData.length
    ? Math.min(...filteredData.map((item) => item.users))
    : 0;

  const total = filteredData.reduce((sum, item) => sum + item.users, 0);

  const peakTime =
    filteredData.find((item) => item.users === peak)?.time ?? "—";
  const lowestTime =
    filteredData.find((item) => item.users === lowest)?.time ?? "—";

  const morningPeak = filteredData.reduce(
    (best, item) => (item.time === "08:00" ? item : best),
    filteredData[0] ?? { time: "—", users: 0 },
  );

  const eveningPeak = filteredData.reduce(
    (best, item) => (item.time === "20:00" ? item : best),
    filteredData[0] ?? { time: "—", users: 0 },
  );

  const hasActiveFilters = range !== "all" || sort !== "default";

  function resetFilters() {
    setRange("all");
    setSort("default");
  }

  return (
    <div className="p-5 w-full">
      <div className="flex flex-col border rounded-2xl overflow-hidden w-full">
        {/* Header */}
        <header className="flex flex-col gap-5 border-b bg-foreground/5 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="w-full">
              <h1 className="text-2xl font-semibold">Daily Active Users</h1>
              <p className="mt-1 text-sm text-foreground/50 md:text-base">
                Smooth spline curve with natural interpolation across the day
              </p>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
              <Select
                value={range}
                onValueChange={(value) => setRange(value as RangeFilter)}
              >
                <SelectTrigger className="h-11! w-full rounded-lg border-foreground/10! bg-foreground/5! px-3 py-2">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent className="p-1">
                  <SelectItem
                    value="all"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Full day
                  </SelectItem>
                  <SelectItem
                    value="night"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Night hours
                  </SelectItem>
                  <SelectItem
                    value="day"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Day hours
                  </SelectItem>
                  <SelectItem
                    value="evening"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Evening hours
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={sort}
                onValueChange={(value) => setSort(value as SortFilter)}
              >
                <SelectTrigger className="h-11! w-full rounded-lg border-foreground/10! bg-foreground/5! px-3 py-2">
                  <SelectValue placeholder="Sort time points" />
                </SelectTrigger>
                <SelectContent className="p-1">
                  <SelectItem
                    value="default"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Default order
                  </SelectItem>
                  <SelectItem
                    value="highest"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Highest first
                  </SelectItem>
                  <SelectItem
                    value="lowest"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Lowest first
                  </SelectItem>
                </SelectContent>
              </Select>

              <Button
                type="button"
                variant="outline"
                onClick={resetFilters}
                disabled={!hasActiveFilters}
                className="h-11! rounded-lg"
              >
                <RotateCcw />
                Reset
              </Button>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-sm text-foreground/50">
              <span>
                Showing {filteredData.length} of {data.length} time points
              </span>
              {range !== "all" && (
                <Badge
                  variant="outline"
                  className="bg-foreground/5! px-3! py-3.5!"
                >
                  Range:{" "}
                  {range === "night"
                    ? "Night hours"
                    : range === "day"
                      ? "Day hours"
                      : "Evening hours"}
                </Badge>
              )}
              {sort !== "default" && (
                <Badge
                  variant="outline"
                  className="bg-foreground/5! px-3! py-3.5!"
                >
                  Sort: {sort === "highest" ? "Highest first" : "Lowest first"}
                </Badge>
              )}
            </div>
          )}
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-3 p-5 md:grid-cols-4 md:p-8">
          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <TrendingUp className="size-4 text-cyan-500" />
              <span className="text-sm">Peak Time</span>
            </div>
            <div className="text-xl font-medium">{peakTime}</div>
            <div className="text-sm text-foreground/50">
              {formatNumber(peak)} users
            </div>
          </div>
          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <TrendingDown className="size-4 text-red-500" />
              <span className="text-sm">Lowest Time</span>
            </div>
            <div className="text-xl font-medium">{lowestTime}</div>
            <div className="text-sm text-foreground/50">
              {formatNumber(lowest)} users
            </div>
          </div>
          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Clock className="size-4 text-green-500" />
              <span className="text-sm">Morning Peak</span>
            </div>
            <div className="text-xl font-medium">{morningPeak.time}</div>
            <div className="text-sm text-foreground/50">
              {formatNumber(morningPeak.users)} users
            </div>
          </div>
          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Users2 className="size-4 text-purple-500" />
              <span className="text-sm">Evening</span>
            </div>
            <div className="text-xl font-medium">{eveningPeak.time}</div>
            <div className="text-sm text-foreground/50">
              {formatNumber(eveningPeak.users)} users
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="h-100 w-full px-5 md:px-8">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart
              accessibilityLayer
              data={filteredData}
              margin={{ top: 10, right: 0, left: -10, bottom: 10 }}
            >
              <defs>
                <linearGradient
                  id="splineUsersFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.7} />
                  <stop offset="50%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient
                  id="splineUsersStroke"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="time" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ stroke: "currentColor", strokeOpacity: 0.15 }}
                content={<CustomTooltip />}
              />
              <Area
                type="natural"
                dataKey="users"
                name="Users"
                stroke="url(#splineUsersStroke)"
                strokeWidth={3}
                fill="url(#splineUsersFill)"
                animationDuration={1200}
                animationEasing="ease-out"
                dot={{ fill: "#06b6d4", strokeWidth: 0, r: 4 }}
                activeDot={{
                  fill: "#10b981",
                  stroke: "hsl(var(--background))",
                  strokeWidth: 2,
                  r: 6,
                }}
              />
            </AreaChart>
          </ChartContainer>
        </div>

        {/* Time Summary */}
        <div className="grid grid-cols-2 gap-3 border-t p-5 sm:grid-cols-3 md:grid-cols-7 md:p-8">
          {filteredData.map((item) => (
            <div
              key={item.time}
              className="rounded-xl border bg-foreground/5 p-3"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold">{item.time}</span>
                <span className="size-2 rounded-full bg-linear-to-r from-cyan-500 to-green-500" />
              </div>
              <p className="text-lg font-medium bg-linear-to-r from-cyan-600 to-green-600 bg-clip-text text-transparent">
                {formatNumber(item.users)}
              </p>
              <p className="mt-1 text-xs text-foreground/50">active users</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-col items-start justify-between gap-5 border-t p-5 sm:flex-row sm:items-center md:p-8">
          <div className="text-sm">
            <span className="text-foreground/50">Total activity: </span>
            <span className="font-bold">{formatNumber(total)} users</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-linear-to-r from-cyan-500 to-green-500" />
            <span className="text-sm">Daily active users</span>
          </div>
        </div>
      </div>
    </div>
  );
}
