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
  Activity,
  Calendar,
  Percent,
  RotateCcw,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  organic: { label: "Organic", color: "#06b6d4" },
  paid: { label: "Paid", color: "#a855f7" },
  referral: { label: "Referral", color: "#f97316" },
} satisfies ChartConfig;

const data = [
  { month: "Jan", organic: 40, paid: 35, referral: 25 },
  { month: "Feb", organic: 45, paid: 30, referral: 25 },
  { month: "Mar", organic: 35, paid: 40, referral: 25 },
  { month: "Apr", organic: 50, paid: 30, referral: 20 },
  { month: "May", organic: 55, paid: 25, referral: 20 },
  { month: "Jun", organic: 45, paid: 35, referral: 20 },
];

type SourceFilter = "all" | "organic" | "paid" | "referral";
type SortFilter = "default" | "highest" | "lowest";
type SourceKey = "organic" | "paid" | "referral";

type SourceDataItem = (typeof data)[number];

interface TooltipPayloadItem {
  dataKey?: string;
  name?: string;
  value?: number;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

const sourceColors: Record<SourceKey, string> = {
  organic: "#06b6d4",
  paid: "#a855f7",
  referral: "#f97316",
};

const sourceLabels: Record<SourceKey, string> = {
  organic: "Organic Search",
  paid: "Paid Search",
  referral: "Referral",
};

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="min-w-52 rounded-lg border border-border/60 bg-background p-3 shadow-lg">
      <p className="mb-3 border-b border-dashed border-foreground/15 pb-2 text-sm font-semibold md:text-base">
        {label}
      </p>

      <div className="space-y-1.5">
        {payload.map((entry, index) => {
          const key = (entry.dataKey ?? entry.name ?? "") as SourceKey;
          const color = sourceColors[key] ?? entry.color ?? "#94a3b8";
          const name = sourceLabels[key] ?? entry.name ?? "Source";

          return (
            <div
              key={`${key}-${index}`}
              className="flex items-center justify-between gap-5 text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block size-3.5 shrink-0 rounded"
                  style={{ backgroundColor: color }}
                />
                <span className="text-foreground/60">{name}</span>
              </div>
              <span className="font-semibold">{entry.value ?? 0}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getSourceValue(item: SourceDataItem, source: SourceFilter) {
  if (source === "all") return item.organic + item.paid + item.referral;
  return item[source];
}

export default function PercentAreaChart() {
  const [source, setSource] = useState<SourceFilter>("all");
  const [sort, setSort] = useState<SortFilter>("default");

  const visibleSources = useMemo<SourceKey[]>(
    () => (source === "all" ? ["referral", "paid", "organic"] : [source]),
    [source],
  );

  const filteredData = useMemo(() => {
    const result = [...data];

    if (sort === "highest") {
      result.sort(
        (a, b) => getSourceValue(b, source) - getSourceValue(a, source),
      );
    }

    if (sort === "lowest") {
      result.sort(
        (a, b) => getSourceValue(a, source) - getSourceValue(b, source),
      );
    }

    return result;
  }, [sort, source]);

  const averages = useMemo(
    () => ({
      organic: filteredData.length
        ? filteredData.reduce((sum, item) => sum + item.organic, 0) /
          filteredData.length
        : 0,
      paid: filteredData.length
        ? filteredData.reduce((sum, item) => sum + item.paid, 0) /
          filteredData.length
        : 0,
      referral: filteredData.length
        ? filteredData.reduce((sum, item) => sum + item.referral, 0) /
          filteredData.length
        : 0,
    }),
    [filteredData],
  );

  const bestMonth = filteredData.reduce(
    (best, item) => {
      const value = visibleSources.reduce((sum, key) => sum + item[key], 0);
      return value > best.value ? { name: item.month, value } : best;
    },
    { name: "—", value: 0 },
  );

  const dominantSource = (
    Object.entries(averages) as [SourceKey, number][]
  ).reduce(
    (best, [key, value]) => (value > best.value ? { key, value } : best),
    { key: "organic" as SourceKey, value: 0 },
  );

  const hasActiveFilters = source !== "all" || sort !== "default";

  function resetFilters() {
    setSource("all");
    setSort("default");
  }

  return (
    <div className="p-5 w-full">
      <div className="flex flex-col border rounded-2xl overflow-hidden w-full">
        {/* Header */}
        <header className="flex flex-col gap-5 border-b bg-foreground/5 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="w-full">
              <h1 className="text-2xl font-semibold">
                Traffic Source Distribution
              </h1>
              <p className="mt-1 text-sm text-foreground/50 md:text-base">
                100% stacked area chart showing source percentages
              </p>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
              <Select
                value={source}
                onValueChange={(value) => setSource(value as SourceFilter)}
              >
                <SelectTrigger className="h-11! w-full rounded-lg border-foreground/10! bg-foreground/5! px-3 py-2">
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent className="p-1">
                  <SelectItem
                    value="all"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    All sources
                  </SelectItem>
                  <SelectItem
                    value="organic"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Organic focus
                  </SelectItem>
                  <SelectItem
                    value="paid"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Paid focus
                  </SelectItem>
                  <SelectItem
                    value="referral"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Referral focus
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={sort}
                onValueChange={(value) => setSort(value as SortFilter)}
              >
                <SelectTrigger className="h-11! w-full rounded-lg border-foreground/10! bg-foreground/5! px-3 py-2">
                  <SelectValue placeholder="Sort months" />
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
                Showing {filteredData.length} of {data.length} months
              </span>
              {source !== "all" && (
                <Badge
                  variant="outline"
                  className="bg-foreground/5! px-3! py-3.5!"
                >
                  Source: {sourceLabels[source]}
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
              <span className="text-sm">Dominant Source</span>
            </div>
            <div className="text-xl font-medium">
              {sourceLabels[dominantSource.key]}
            </div>
            <div className="text-sm text-foreground/50">
              {dominantSource.value.toFixed(1)}% average share
            </div>
          </div>
          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Calendar className="size-4 text-purple-500" />
              <span className="text-sm">Best Month</span>
            </div>
            <div className="text-xl font-medium">{bestMonth.name}</div>
            <div className="text-sm text-foreground/50">
              {bestMonth.value}% selected share
            </div>
          </div>
          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Activity className="size-4 text-green-500" />
              <span className="text-sm">Average Coverage</span>
            </div>
            <div className="text-xl font-medium">{visibleSources.length}/3</div>
            <div className="text-sm text-foreground/50">Sources selected</div>
          </div>
          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Percent className="size-4 text-orange-500" />
              <span className="text-sm">Months Tracked</span>
            </div>
            <div className="text-xl font-medium">{filteredData.length}</div>
            <div className="text-sm text-foreground/50">Selected months</div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="h-100 w-full px-5 md:px-8">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart
              accessibilityLayer
              data={filteredData}
              stackOffset="expand"
              margin={{ top: 10, right: 0, left: -10, bottom: 10 }}
            >
              <defs>
                <linearGradient
                  id="organicGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.25} />
                </linearGradient>
                <linearGradient id="paidGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity={0.25} />
                </linearGradient>
                <linearGradient
                  id="referralGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0.25} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: number) => `${Math.round(value * 100)}%`}
              />
              <Tooltip
                cursor={{ stroke: "currentColor", strokeOpacity: 0.15 }}
                content={<CustomTooltip />}
              />
              {visibleSources.includes("referral") && (
                <Area
                  type="monotone"
                  dataKey="referral"
                  name="Referral"
                  stackId="1"
                  stroke="#f97316"
                  strokeWidth={2}
                  fill="url(#referralGradient)"
                  animationDuration={1000}
                />
              )}
              {visibleSources.includes("paid") && (
                <Area
                  type="monotone"
                  dataKey="paid"
                  name="Paid"
                  stackId="1"
                  stroke="#a855f7"
                  strokeWidth={2}
                  fill="url(#paidGradient)"
                  animationDuration={1000}
                  animationBegin={150}
                />
              )}
              {visibleSources.includes("organic") && (
                <Area
                  type="monotone"
                  dataKey="organic"
                  name="Organic"
                  stackId="1"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fill="url(#organicGradient)"
                  animationDuration={1000}
                  animationBegin={300}
                />
              )}
            </AreaChart>
          </ChartContainer>
        </div>

        {/* Distribution Summary */}
        <div className="grid grid-cols-1 gap-3 border-t p-5 md:grid-cols-3 md:p-8">
          {(["organic", "paid", "referral"] as SourceKey[])
            .filter((key) => visibleSources.includes(key))
            .map((key) => {
              const average = averages[key];
              return (
                <div
                  key={key}
                  className="rounded-xl border bg-foreground/5 p-4"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <Users
                      className="size-5"
                      style={{ color: sourceColors[key] }}
                    />
                    <h3
                      className="font-semibold"
                      style={{ color: sourceColors[key] }}
                    >
                      {sourceLabels[key]}
                    </h3>
                  </div>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: sourceColors[key] }}
                  >
                    {Math.round(average)}%
                  </p>
                  <p className="mt-1 text-xs text-foreground/50">
                    Average share
                  </p>
                  <div className="mt-3 h-1.5 w-full rounded-full bg-foreground/10">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${average}%`,
                        backgroundColor: sourceColors[key],
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>

        {/* Footer */}
        <div className="flex flex-col items-start justify-between gap-5 border-t p-5 sm:flex-row sm:items-center md:p-8">
          <div className="text-sm">
            <span className="text-foreground/50">Distribution coverage: </span>
            <span className="font-bold">100%</span>
          </div>
          <div className="flex flex-wrap gap-4">
            {(["organic", "paid", "referral"] as SourceKey[]).map((key) => (
              <div key={key} className="flex items-center gap-1.5">
                <div
                  className="size-2 rounded-full"
                  style={{ backgroundColor: sourceColors[key] }}
                />
                <span className="text-sm">{sourceLabels[key]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
