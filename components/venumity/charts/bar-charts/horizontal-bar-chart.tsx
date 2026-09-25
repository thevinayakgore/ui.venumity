"use client";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { Briefcase, Building2, RotateCcw, TrendingUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  value: {
    label: "Budget",
    color: "var(--color-blue-500)",
  },
} satisfies ChartConfig;

const horizontalData = [
  { name: "Marketing", value: 8500 },
  { name: "Sales", value: 7200 },
  { name: "Development", value: 9300 },
  { name: "Support", value: 4300 },
  { name: "HR", value: 2900 },
  { name: "Finance", value: 5100 },
  { name: "Operations", value: 6200 },
];

type SortFilter = "default" | "highest" | "lowest";
type ViewFilter = "all" | "above-average" | "below-average";

interface TooltipPayloadItem {
  dataKey?: string;
  name?: string;
  value?: number;
  color?: string;
  payload?: {
    name: string;
    value: number;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

function formatCurrency(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

function formatCompactCurrency(value: number) {
  return `$${(value / 1000).toFixed(1)}K`;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const item = payload[0]?.payload;

  if (!item) return null;

  return (
    <div className="min-w-44 rounded-lg border border-border/60 bg-background p-3 shadow-lg">
      <div className="mb-1 flex items-center gap-2">
        <span className="inline-block size-2 shrink-0 rounded-full bg-blue-500" />
        <p className="text-sm font-medium">{item.name}</p>
      </div>

      <p className="text-lg font-bold text-blue-600">
        {formatCurrency(item.value)}
      </p>
    </div>
  );
}

export default function HorizontalBarChart() {
  const [sort, setSort] = useState<SortFilter>("default");
  const [view, setView] = useState<ViewFilter>("all");

  const total = horizontalData.reduce((sum, item) => sum + item.value, 0);

  const average = total / horizontalData.length;

  const filteredData = useMemo(() => {
    let result = [...horizontalData];

    if (view === "above-average") {
      result = result.filter((item) => item.value >= average);
    }

    if (view === "below-average") {
      result = result.filter((item) => item.value < average);
    }

    if (sort === "highest") {
      result.sort((a, b) => b.value - a.value);
    }

    if (sort === "lowest") {
      result.sort((a, b) => a.value - b.value);
    }

    return result;
  }, [average, sort, view]);

  const filteredTotal = filteredData.reduce((sum, item) => sum + item.value, 0);

  const filteredAverage = filteredData.length
    ? filteredTotal / filteredData.length
    : 0;

  const topDept = filteredData.reduce(
    (max, item) => (item.value > max.value ? item : max),
    filteredData[0] ?? { name: "—", value: 0 },
  );

  const lowestDept = filteredData.reduce(
    (min, item) => (item.value < min.value ? item : min),
    filteredData[0] ?? { name: "—", value: 0 },
  );

  const hasActiveFilters = sort !== "default" || view !== "all";

  function resetFilters() {
    setSort("default");
    setView("all");
  }

  return (
    <div className="w-full p-5">
      <div className="flex w-full flex-col overflow-hidden rounded-2xl border">
        {/* Header */}
        <header className="flex flex-col gap-5 border-b p-5 bg-foreground/5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold">
                Department Budget Allocation
              </h1>

              <p className="mt-1 text-sm text-foreground/50 md:text-base">
                Budget distribution across departments
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border bg-foreground/5 px-3 py-2.5">
                <p className="text-xl font-bold">
                  {formatCompactCurrency(filteredTotal)}
                </p>

                <p className="mt-0.5 text-sm text-foreground/50">
                  Filtered Budget
                </p>
              </div>

              <div className="rounded-lg border bg-foreground/5 px-3 py-2.5">
                <p className="text-xl font-bold">{topDept.name}</p>

                <p className="mt-0.5 text-sm text-foreground/50">
                  Top Department
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3">
            <Select
              value={view}
              onValueChange={(value) => setView(value as ViewFilter)}
            >
              <SelectTrigger className="py-2 px-3 bg-foreground/5! border-foreground/10! rounded-lg h-11! w-full">
                <SelectValue placeholder="Filter departments" />
              </SelectTrigger>

              <SelectContent className="p-1">
                <SelectItem
                  value="all"
                  className="cursor-pointer hover:bg-foreground/10!"
                >
                  All departments
                </SelectItem>

                <SelectItem
                  value="above-average"
                  className="cursor-pointer hover:bg-foreground/10!"
                >
                  Above average
                </SelectItem>

                <SelectItem
                  value="below-average"
                  className="cursor-pointer hover:bg-foreground/10!"
                >
                  Below average
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={sort}
              onValueChange={(value) => setSort(value as SortFilter)}
            >
              <SelectTrigger className="py-2 px-3 bg-foreground/5! border-foreground/10! rounded-lg h-11! w-full">
                <SelectValue placeholder="Sort departments" />
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
                  Highest budget first
                </SelectItem>

                <SelectItem
                  value="lowest"
                  className="cursor-pointer hover:bg-foreground/10!"
                >
                  Lowest budget first
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

          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-sm text-foreground/50">
              <span>
                Showing {filteredData.length} of {horizontalData.length}{" "}
                departments
              </span>

              {view !== "all" && (
                <Badge variant="outline" className="bg-foreground/5! p-3!">
                  View:{" "}
                  {view === "above-average" ? "Above average" : "Below average"}
                </Badge>
              )}

              {sort !== "default" && (
                <Badge variant="outline" className="bg-foreground/5! p-3!">
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
              <Building2 className="size-4 text-blue-500" />
              <span className="text-sm">Highest Budget</span>
            </div>

            <div className="text-xl font-medium">{topDept.name}</div>

            <div className="text-sm text-foreground/50">
              {formatCurrency(topDept.value)}
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Briefcase className="size-4 text-purple-500" />
              <span className="text-sm">Lowest Budget</span>
            </div>

            <div className="text-xl font-medium">{lowestDept.name}</div>

            <div className="text-sm text-foreground/50">
              {formatCurrency(lowestDept.value)}
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <TrendingUp className="size-4 text-green-500" />
              <span className="text-sm">Average Budget</span>
            </div>

            <div className="text-xl font-medium">
              {formatCurrency(filteredAverage)}
            </div>

            <div className="text-sm text-foreground/50">Per department</div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Briefcase className="size-4" />
              <span className="text-sm">Departments</span>
            </div>

            <div className="text-xl font-medium">{filteredData.length}</div>

            <div className="text-sm text-foreground/50">
              Selected departments
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="h-120 w-full px-5 md:px-8">
          {filteredData.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart
                accessibilityLayer
                data={filteredData}
                layout="vertical"
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 10,
                }}
              >
                <defs>
                  <linearGradient
                    id="horizontalBudgetGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="var(--color-blue-500)" />
                    <stop offset="100%" stopColor="var(--color-blue-400)" />
                  </linearGradient>
                </defs>

                <CartesianGrid horizontal={false} />

                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value: number) => `$${value / 1000}K`}
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  width={100}
                />

                <Tooltip content={<CustomTooltip />} />

                <Bar
                  dataKey="value"
                  name="Budget"
                  fill="url(#horizontalBudgetGradient)"
                  radius={[0, 10, 10, 0]}
                  animationDuration={1000}
                  barSize={40}
                  label={{
                    position: "right",
                    formatter: (value) => {
                      if (typeof value !== "number") {
                        return String(value ?? "");
                      }

                      return formatCompactCurrency(value);
                    },
                    fontSize: 13,
                  }}
                />
              </BarChart>
            </ChartContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-foreground/50">
              No departments found for the selected filters.
            </div>
          )}
        </div>

        {/* Department Summary */}
        <div className="grid grid-cols-1 gap-3 border-t p-5 sm:grid-cols-2 md:grid-cols-4 md:p-8">
          {filteredData.map((department) => (
            <div
              key={department.name}
              className="rounded-xl border bg-foreground/5 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold">{department.name}</span>

                <Building2 className="size-4 text-foreground/40" />
              </div>

              <p className="text-xl font-medium text-blue-600">
                {formatCurrency(department.value)}
              </p>

              <p className="mt-1 text-sm text-foreground/50">
                {filteredTotal > 0
                  ? `${((department.value / filteredTotal) * 100).toFixed(
                      1,
                    )}% of filtered budget`
                  : "0.0% of filtered budget"}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Summary */}
        <div className="flex flex-col items-start justify-between gap-5 border-t p-5 sm:flex-row sm:items-center md:p-8">
          <div className="text-sm">
            <span className="text-foreground/50">Filtered budget: </span>

            <span className="font-bold">
              {formatCompactCurrency(filteredTotal)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-blue-500" />
            <span className="text-sm">Department budget</span>
          </div>
        </div>
      </div>
    </div>
  );
}
