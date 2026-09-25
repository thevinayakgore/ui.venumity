"use client";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import {
  Activity,
  BarChart3,
  Calendar,
  RotateCcw,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  sales: {
    label: "Sales",
    color: "var(--color-blue-500)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--color-purple-500)",
  },
  profit: {
    label: "Profit",
    color: "var(--color-green-500)",
  },
} satisfies ChartConfig;

const groupedData = [
  { name: "Q1", sales: 40006, expenses: 20800, profit: 12600 },
  { name: "Q2", sales: 30004, expenses: 13498, profit: 16802 },
  { name: "Q3", sales: 50040, expenses: 98030, profit: -48900 },
  { name: "Q4", sales: 45300, expenses: 39028, profit: 59962 },
];

type MetricFilter = "all" | "sales" | "expenses" | "profit";
type SortFilter = "default" | "highest" | "lowest";

type GroupedDataItem = (typeof groupedData)[number];

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

const tooltipColors: Record<string, string> = {
  sales: "#3b82f6",
  expenses: "#a855f7",
  profit: "#22c55e",
};

function formatCurrency(value: number) {
  return `${value < 0 ? "-" : ""}$${Math.abs(value).toLocaleString("en-US")}`;
}

function formatCompactCurrency(value: number) {
  return `${value < 0 ? "-" : ""}$${(Math.abs(value) / 1000).toFixed(1)}K`;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="min-w-48 rounded-lg border border-border/60 bg-background p-3 shadow-lg">
      <p className="pb-2 mb-3 border-b border-dashed border-foreground/15 text-sm md:text-base font-semibold">{label}</p>

      <div className="space-y-1.5">
        {payload.map((entry, index) => {
          const metricKey = entry.dataKey ?? entry.name ?? "";
          const dotColor = tooltipColors[metricKey] ?? entry.color ?? "#94a3b8";

          const metricName =
            entry.name ??
            metricKey.charAt(0).toUpperCase() + metricKey.slice(1);

          const isProfit = metricKey === "profit";
          const isNegativeProfit = isProfit && (entry.value ?? 0) < 0;

          return (
            <div
              key={`${metricKey}-${index}`}
              className="flex items-center justify-between gap-5 text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="inline-block size-3.5 shrink-0 rounded"
                  style={{
                    backgroundColor: dotColor,
                  }}
                />

                <span className="text-foreground/60">{metricName}</span>
              </div>

              <span
                className={`font-semibold ${
                  isProfit
                    ? isNegativeProfit
                      ? "text-red-500"
                      : "text-green-500"
                    : ""
                }`}
              >
                {formatCurrency(entry.value ?? 0)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getBestQuarter(data: GroupedDataItem[], metric: MetricFilter) {
  if (!data.length) {
    return {
      name: "—",
      value: 0,
    };
  }

  if (metric === "all") {
    return data.reduce(
      (best, item) => {
        const value = item.sales + item.expenses + item.profit;

        return value > best.value ? { name: item.name, value } : best;
      },
      {
        name: "—",
        value: Number.NEGATIVE_INFINITY,
      },
    );
  }

  return data.reduce(
    (best, item) =>
      item[metric] > best.value
        ? {
            name: item.name,
            value: item[metric],
          }
        : best,
    {
      name: "—",
      value: Number.NEGATIVE_INFINITY,
    },
  );
}

export default function GroupedBarChart() {
  const [metric, setMetric] = useState<MetricFilter>("all");
  const [sort, setSort] = useState<SortFilter>("default");

  const filteredData = useMemo(() => {
    const result = [...groupedData];

    if (sort === "highest") {
      result.sort((a, b) => {
        const aValue =
          metric === "all" ? a.sales + a.expenses + a.profit : a[metric];

        const bValue =
          metric === "all" ? b.sales + b.expenses + b.profit : b[metric];

        return bValue - aValue;
      });
    }

    if (sort === "lowest") {
      result.sort((a, b) => {
        const aValue =
          metric === "all" ? a.sales + a.expenses + a.profit : a[metric];

        const bValue =
          metric === "all" ? b.sales + b.expenses + b.profit : b[metric];

        return aValue - bValue;
      });
    }

    return result;
  }, [metric, sort]);

  const summary = useMemo(
    () => ({
      totalSales: filteredData.reduce((sum, item) => sum + item.sales, 0),
      totalExpenses: filteredData.reduce((sum, item) => sum + item.expenses, 0),
      totalProfit: filteredData.reduce((sum, item) => sum + item.profit, 0),
    }),
    [filteredData],
  );

  const bestQuarter = getBestQuarter(filteredData, metric);

  const profitableQuarters = filteredData.filter(
    (item) => item.profit >= 0,
  ).length;

  const averageProfit = filteredData.length
    ? summary.totalProfit / filteredData.length
    : 0;

  const hasActiveFilters = metric !== "all" || sort !== "default";

  function resetFilters() {
    setMetric("all");
    setSort("default");
  }

  return (
    <div className="w-full p-5">
      <div className="flex w-full flex-col overflow-hidden rounded-2xl border">
        {/* Header */}
        <header className="flex flex-col gap-5 border-b p-5 bg-foreground/5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="w-full">
              <h1 className="text-2xl font-semibold">Quarterly Performance</h1>

              <p className="mt-1 text-sm text-foreground/50 md:text-base">
                Compare sales, expenses, and profit across 2026
              </p>
            </div>

            {/* Filters */}
            <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3">
              <Select
                value={metric}
                onValueChange={(value) => setMetric(value as MetricFilter)}
              >
                <SelectTrigger className="py-2 px-3 bg-foreground/5! border-foreground/10! rounded-lg h-11! w-full">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>

                <SelectContent className="p-1">
                  <SelectItem
                    value="all"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    All metrics
                  </SelectItem>

                  <SelectItem
                    value="sales"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Sales focus
                  </SelectItem>

                  <SelectItem
                    value="expenses"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Expenses focus
                  </SelectItem>

                  <SelectItem
                    value="profit"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Profit focus
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={sort}
                onValueChange={(value) => setSort(value as SortFilter)}
              >
                <SelectTrigger className="py-2 px-3 bg-foreground/5! border-foreground/10! rounded-lg h-11! w-full">
                  <SelectValue placeholder="Sort quarters" />
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
                Showing {filteredData.length} of {groupedData.length} quarters
              </span>

              {metric !== "all" && (
                <Badge
                  variant="outline"
                  className="bg-foreground/5! px-3! py-3.5!"
                >
                  Metric: {metric}
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
              <TrendingUp className="size-4 text-blue-500" />
              <span className="text-sm">Best Quarter</span>
            </div>
            <div className="text-xl font-medium">{bestQuarter.name}</div>
            <div className="text-sm text-foreground/50">
              {formatCurrency(bestQuarter.value)}
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <TrendingDown className="size-4 text-purple-500" />
              <span className="text-sm">Total Expenses</span>
            </div>

            <div className="text-xl font-medium">
              {formatCompactCurrency(summary.totalExpenses)}
            </div>

            <div className="text-sm text-foreground/50">
              Across selected quarters
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Activity className="size-4 text-green-500" />
              <span className="text-sm">Average Profit</span>
            </div>
            <div
              className={`text-xl font-medium ${
                averageProfit >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {formatCompactCurrency(averageProfit)}
            </div>
            <div className="text-sm text-foreground/50">Per quarter</div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Calendar className="size-4" />
              <span className="text-sm">Profitable Quarters</span>
            </div>

            <div className="text-xl font-medium">
              {profitableQuarters}/{filteredData.length}
            </div>

            <div className="text-sm text-foreground/50">
              Positive profit results
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="h-100 w-full px-5 md:px-8">
          {filteredData.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart
                accessibilityLayer
                data={filteredData}
                margin={{
                  left: -10,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="salesGradient"
                    x1="0"
                    y1="1"
                    x2="0"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="var(--color-blue-500)" />
                    <stop offset="100%" stopColor="var(--color-blue-400)" />
                  </linearGradient>

                  <linearGradient
                    id="expensesGradient"
                    x1="0"
                    y1="1"
                    x2="0"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="var(--color-purple-500)" />
                    <stop offset="100%" stopColor="var(--color-purple-400)" />
                  </linearGradient>

                  <linearGradient
                    id="profitGradient"
                    x1="0"
                    y1="1"
                    x2="0"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="var(--color-green-500)" />
                    <stop offset="100%" stopColor="var(--color-green-400)" />
                  </linearGradient>
                </defs>

                <CartesianGrid vertical={false} />

                <XAxis dataKey="name" tickLine={false} axisLine={false} />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value: number) => `$${value / 1000}K`}
                />

                <Tooltip content={<CustomTooltip />} />

                <Bar
                  dataKey="sales"
                  name="Sales"
                  fill="url(#salesGradient)"
                  radius={[6, 6, 6, 6]}
                  animationDuration={1000}
                />

                <Bar
                  dataKey="expenses"
                  name="Expenses"
                  fill="url(#expensesGradient)"
                  radius={[6, 6, 6, 6]}
                  animationDuration={1000}
                />

                <Bar
                  dataKey="profit"
                  name="Profit"
                  fill="url(#profitGradient)"
                  radius={[6, 6, 6, 6]}
                  animationDuration={1000}
                />
              </BarChart>
            </ChartContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-foreground/50">
              No performance data found for the selected filters.
            </div>
          )}
        </div>

        {/* Quarter Summary */}
        <div className="grid grid-cols-1 gap-3 border-t p-5 sm:grid-cols-2 md:grid-cols-4 md:p-8">
          {filteredData.map((quarter) => (
            <div
              key={quarter.name}
              className="rounded-xl border bg-foreground/5 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold">{quarter.name}</span>

                <BarChart3 className="size-4 text-foreground/40" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/50">Sales</span>
                  <span className="font-medium text-blue-600">
                    {formatCurrency(quarter.sales)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-foreground/50">Expenses</span>
                  <span className="font-medium text-purple-600">
                    {formatCurrency(quarter.expenses)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-foreground/50">Profit</span>
                  <span
                    className={`font-medium ${
                      quarter.profit >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {formatCurrency(quarter.profit)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Summary */}
        <div className="flex flex-col items-start justify-between gap-5 border-t p-5 sm:flex-row sm:items-center md:p-8">
          <div className="text-sm">
            <span className="text-foreground/50">Filtered profit: </span>

            <span
              className={`font-bold ${
                summary.totalProfit >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatCompactCurrency(summary.totalProfit)}
            </span>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-blue-500" />
              <span className="text-sm">Sales</span>
            </div>

            <div className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-purple-500" />
              <span className="text-sm">Expenses</span>
            </div>

            <div className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-green-500" />
              <span className="text-sm">Profit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
