// app/charts/stacked/page.tsx
"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { BarChart3, Package, RotateCcw, TrendingUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  productA: {
    label: "Product A",
    color: "var(--color-orange-500)",
  },
  productB: {
    label: "Product B",
    color: "var(--color-blue-500)",
  },
  productC: {
    label: "Product C",
    color: "var(--color-green-500)",
  },
} satisfies ChartConfig;

const stackedData = [
  { name: "Jan", productA: 4000, productB: 2400, productC: 3200 },
  { name: "Feb", productA: 3000, productB: 1398, productC: 2800 },
  { name: "Mar", productA: 5000, productB: 9800, productC: 2000 },
  { name: "Apr", productA: 4500, productB: 3908, productC: 2500 },
  { name: "May", productA: 6000, productB: 4800, productC: 3500 },
  { name: "Jun", productA: 5500, productB: 3800, productC: 3000 },
];

type ProductFilter = "all" | "productA" | "productB" | "productC";
type SortFilter = "default" | "highest" | "lowest";
type ProductKey = "productA" | "productB" | "productC";

type StackedDataItem = (typeof stackedData)[number];

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

const tooltipColors: Record<ProductKey, string> = {
  productA: "#f97316",
  productB: "#3b82f6",
  productC: "#22c55e",
};

const productLabels: Record<ProductKey, string> = {
  productA: "Product A",
  productB: "Product B",
  productC: "Product C",
};

function formatCurrency(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

function formatCompactCurrency(value: number) {
  return `$${(value / 1000).toFixed(1)}K`;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const total = payload.reduce(
    (sum, entry) => sum + (typeof entry.value === "number" ? entry.value : 0),
    0,
  );

  return (
    <div className="min-w-52 rounded-lg border border-border/60 bg-background p-3 shadow-lg">
      <p className="mb-3 border-b border-dashed border-foreground/15 pb-2 text-sm font-semibold md:text-base">
        {label}
      </p>

      <div className="space-y-1.5">
        {payload.map((entry, index) => {
          const productKey = (entry.dataKey ?? entry.name ?? "") as ProductKey;

          const color = tooltipColors[productKey] ?? entry.color ?? "#94a3b8";

          const name = productLabels[productKey] ?? entry.name ?? "Product";

          return (
            <div
              key={`${productKey}-${index}`}
              className="flex items-center justify-between gap-5 text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="inline-block size-3.5 shrink-0 rounded"
                  style={{ backgroundColor: color }}
                />

                <span className="text-foreground/60">{name}</span>
              </div>

              <span className="font-semibold">
                {formatCurrency(entry.value ?? 0)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex justify-between border-t pt-2 text-sm font-bold">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );
}

function getProductTotal(data: StackedDataItem[], product: ProductKey) {
  return data.reduce((sum, item) => sum + item[product], 0);
}

function getProductBestMonth(data: StackedDataItem[], product: ProductKey) {
  return data.reduce(
    (best, item) =>
      item[product] > best.value
        ? {
            name: item.name,
            value: item[product],
          }
        : best,
    {
      name: "—",
      value: 0,
    },
  );
}

export default function StackedBarChart() {
  const [product, setProduct] = useState<ProductFilter>("all");

  const [sort, setSort] = useState<SortFilter>("default");

  const visibleProducts = useMemo<ProductKey[]>(
    () =>
      product === "all" ? ["productA", "productB", "productC"] : [product],
    [product],
  );

  const filteredData = useMemo(() => {
    const result = [...stackedData];

    if (sort !== "default") {
      result.sort((a, b) => {
        const aValue = visibleProducts.reduce((sum, key) => sum + a[key], 0);

        const bValue = visibleProducts.reduce((sum, key) => sum + b[key], 0);

        return sort === "highest" ? bValue - aValue : aValue - bValue;
      });
    }

    return result;
  }, [sort, visibleProducts]);

  const totals = useMemo(
    () => ({
      productA: getProductTotal(filteredData, "productA"),
      productB: getProductTotal(filteredData, "productB"),
      productC: getProductTotal(filteredData, "productC"),
    }),
    [filteredData],
  );

  const overallTotal = totals.productA + totals.productB + totals.productC;

  const selectedTotal = visibleProducts.reduce(
    (sum, key) => sum + totals[key],
    0,
  );

  const averageMonthly = filteredData.length
    ? selectedTotal / filteredData.length
    : 0;

  const bestMonth = filteredData.reduce(
    (best, item) => {
      const value = visibleProducts.reduce((sum, key) => sum + item[key], 0);

      return value > best.value
        ? {
            name: item.name,
            value,
          }
        : best;
    },
    {
      name: "—",
      value: 0,
    },
  );

  const hasActiveFilters = product !== "all" || sort !== "default";

  function resetFilters() {
    setProduct("all");
    setSort("default");
  }

  return (
    <div className="w-full p-5">
      <div className="flex w-full flex-col overflow-hidden rounded-2xl border">
        {/* Header */}
        <header className="flex flex-col gap-5 border-b bg-foreground/5 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="w-full">
              <h1 className="text-2xl font-semibold">
                Product Performance Stack
              </h1>

              <p className="mt-1 text-sm text-foreground/50 md:text-base">
                Stacked view of product contributions across 2026
              </p>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 w-full">
              <Select
                value={product}
                onValueChange={(value) => setProduct(value as ProductFilter)}
              >
                <SelectTrigger className="h-11! w-full rounded-lg border-foreground/10! bg-foreground/5! px-3 py-2">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>

                <SelectContent className="p-1">
                  <SelectItem
                    value="all"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    All products
                  </SelectItem>

                  <SelectItem
                    value="productA"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Product A
                  </SelectItem>

                  <SelectItem
                    value="productB"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Product B
                  </SelectItem>

                  <SelectItem
                    value="productC"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Product C
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
                    Highest total first
                  </SelectItem>

                  <SelectItem
                    value="lowest"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Lowest total first
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
                Showing {filteredData.length} of {stackedData.length} months
              </span>

              {product !== "all" && (
                <Badge
                  variant="outline"
                  className="bg-foreground/5! px-3! py-3.5!"
                >
                  Product: {productLabels[product]}
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
              <span className="text-sm">Best Month</span>
            </div>

            <div className="text-xl font-medium">{bestMonth.name}</div>

            <div className="text-sm text-foreground/50">
              {formatCurrency(bestMonth.value)}
            </div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Package className="size-4 text-orange-500" />
              <span className="text-sm">Selected Total</span>
            </div>

            <div className="text-xl font-medium">
              {formatCompactCurrency(selectedTotal)}
            </div>

            <div className="text-sm text-foreground/50">Selected products</div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <BarChart3 className="size-4 text-green-500" />
              <span className="text-sm">Monthly Average</span>
            </div>

            <div className="text-xl font-medium">
              {formatCompactCurrency(averageMonthly)}
            </div>

            <div className="text-sm text-foreground/50">Per month</div>
          </div>

          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Package className="size-4" />
              <span className="text-sm">Products</span>
            </div>

            <div className="text-xl font-medium">
              {visibleProducts.length}/3
            </div>

            <div className="text-sm text-foreground/50">Selected products</div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="h-100 w-full px-5 md:px-8">
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
                  id="productAGradient"
                  x1="0"
                  y1="1"
                  x2="0"
                  y2="0"
                >
                  <stop offset="0%" stopColor="var(--color-orange-500)" />
                  <stop offset="100%" stopColor="var(--color-orange-400)" />
                </linearGradient>

                <linearGradient
                  id="productBGradient"
                  x1="0"
                  y1="1"
                  x2="0"
                  y2="0"
                >
                  <stop offset="0%" stopColor="var(--color-blue-500)" />
                  <stop offset="100%" stopColor="var(--color-blue-400)" />
                </linearGradient>

                <linearGradient
                  id="productCGradient"
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

              {visibleProducts.includes("productA") && (
                <Bar
                  dataKey="productA"
                  name="Product A"
                  stackId="products"
                  fill="url(#productAGradient)"
                  radius={
                    visibleProducts.length === 1
                      ? [15, 15, 15, 15]
                      : [0, 0, 15, 15]
                  }
                  animationDuration={1000}
                />
              )}

              {visibleProducts.includes("productB") && (
                <Bar
                  dataKey="productB"
                  name="Product B"
                  stackId="products"
                  fill="url(#productBGradient)"
                  radius={
                    visibleProducts.length === 1 ? [15, 15, 15, 15] : undefined
                  }
                  animationDuration={1000}
                />
              )}

              {visibleProducts.includes("productC") && (
                <Bar
                  dataKey="productC"
                  name="Product C"
                  stackId="products"
                  fill="url(#productCGradient)"
                  radius={
                    visibleProducts.length === 1
                      ? [15, 15, 15, 15]
                      : [15, 15, 0, 0]
                  }
                  animationDuration={1000}
                />
              )}
            </BarChart>
          </ChartContainer>
        </div>

        {/* Product Summary */}
        <div className="grid grid-cols-1 gap-3 border-t p-5 md:grid-cols-3 md:p-8">
          {visibleProducts.map((productKey) => {
            const productTotal = totals[productKey];
            const best = getProductBestMonth(filteredData, productKey);

            const percentage = overallTotal
              ? (productTotal / overallTotal) * 100
              : 0;

            return (
              <div
                key={productKey}
                className="rounded-xl border bg-foreground/5 p-4"
              >
                <div className="mb-3 flex items-center gap-2">
                  <Package
                    className="size-5"
                    style={{
                      color: tooltipColors[productKey],
                    }}
                  />

                  <h3
                    className="font-semibold"
                    style={{
                      color: tooltipColors[productKey],
                    }}
                  >
                    {productLabels[productKey]}
                  </h3>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/50">Total Revenue</span>

                    <span className="font-bold">
                      {formatCurrency(productTotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/50">Best Month</span>

                    <span className="font-bold">
                      {best.name} ({formatCurrency(best.value)})
                    </span>
                  </div>

                  <div className="mt-3 h-1.5 w-full rounded-full bg-foreground/10">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: tooltipColors[productKey],
                      }}
                    />
                  </div>

                  <p className="text-xs text-foreground/50">
                    {percentage.toFixed(1)}% of total revenue
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Summary */}
        <div className="flex flex-col items-start justify-between gap-5 border-t p-5 sm:flex-row sm:items-center md:p-8">
          <div className="text-sm">
            <span className="text-foreground/50">Filtered revenue: </span>

            <span className="font-bold">
              {formatCompactCurrency(selectedTotal)}
            </span>
          </div>

          <div className="flex flex-wrap gap-4">
            {(["productA", "productB", "productC"] as ProductKey[]).map(
              (key) => (
                <div key={key} className="flex items-center gap-1">
                  <div
                    className="size-2 rounded-full"
                    style={{
                      backgroundColor: tooltipColors[key],
                    }}
                  />

                  <span className="text-sm">{productLabels[key]}</span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
