"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { PieSectorShapeProps } from "recharts/types/polar/Pie";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ReactElement, useCallback, useMemo, useState } from "react";
import {
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  AreaChart,
  Area,
  Label,
  Sector,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  PieChart as PieChartIcon,
  Activity,
  DollarSign,
  Users,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react";

// Sample data
const monthlyData = [
  { name: "Jan", revenue: 4000, orders: 240, customers: 120 },
  { name: "Feb", revenue: 3000, orders: 198, customers: 98 },
  { name: "Mar", revenue: 5000, orders: 320, customers: 160 },
  { name: "Apr", revenue: 4500, orders: 280, customers: 140 },
  { name: "May", revenue: 6000, orders: 380, customers: 190 },
  { name: "Jun", revenue: 5500, orders: 340, customers: 170 },
  { name: "Jul", revenue: 7000, orders: 440, customers: 220 },
  { name: "Aug", revenue: 6450, orders: 400, customers: 200 },
  { name: "Sep", revenue: 7000, orders: 450, customers: 225 },
  { name: "Oct", revenue: 4000, orders: 260, customers: 130 },
  { name: "Nov", revenue: 8000, orders: 520, customers: 260 },
  { name: "Dec", revenue: 6000, orders: 390, customers: 195 },
];

const weeklyData = [
  { name: "Mon", revenue: 1200, orders: 78, customers: 39 },
  { name: "Tue", revenue: 1800, orders: 112, customers: 56 },
  { name: "Wed", revenue: 2200, orders: 145, customers: 72 },
  { name: "Thu", revenue: 1900, orders: 124, customers: 62 },
  { name: "Fri", revenue: 2600, orders: 168, customers: 84 },
  { name: "Sat", revenue: 2100, orders: 135, customers: 67 },
  { name: "Sun", revenue: 1400, orders: 89, customers: 44 },
];

const quarterlyData = [
  { name: "Q1", revenue: 12000, orders: 758, customers: 378 },
  { name: "Q2", revenue: 16000, orders: 1000, customers: 500 },
  { name: "Q3", revenue: 20450, orders: 1290, customers: 645 },
  { name: "Q4", revenue: 18000, orders: 1170, customers: 585 },
];

const categoryData = [
  { name: "Electronics", value: 24500, fill: "hsl(216, 100%, 60%)" },
  { name: "Clothing", value: 18200, fill: "hsl(276, 100%, 65%)" },
  { name: "Home & Garden", value: 12800, fill: "hsl(156, 100%, 55%)" },
  { name: "Sports", value: 9500, fill: "hsl(36, 100%, 60%)" },
  { name: "Books", value: 6200, fill: "hsl(336, 100%, 65%)" },
];

const productPerformanceData = [
  { name: "Product A", sales: 540, revenue: 16200, growth: 12 },
  { name: "Product B", sales: 420, revenue: 12600, growth: -5 },
  { name: "Product C", sales: 380, revenue: 11400, growth: 8 },
  { name: "Product D", sales: 290, revenue: 8700, growth: 15 },
  { name: "Product E", sales: 210, revenue: 6300, growth: -2 },
  { name: "Product F", sales: 180, revenue: 5400, growth: 20 },
];

type TimeRange = "weekly" | "monthly" | "quarterly";
type ChartType = "area" | "pie";

const timeRangeData = {
  weekly: weeklyData,
  monthly: monthlyData,
  quarterly: quarterlyData,
};

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

function formatCompactNumber(value: number) {
  return `${(value / 1000).toFixed(1)}K`;
}

// Chart config per metric
const getChartConfig = (
  selectedMetric: "revenue" | "orders" | "customers",
): ChartConfig => {
  switch (selectedMetric) {
    case "revenue":
      return {
        value: {
          label: "Revenue",
          color: "hsl(156, 100%, 55%)",
        },
      };
    case "orders":
      return {
        value: {
          label: "Orders",
          color: "hsl(216, 100%, 60%)",
        },
      };
    case "customers":
      return {
        value: {
          label: "Customers",
          color: "hsl(276, 100%, 65%)",
        },
      };
  }
};

// Custom tooltip for area chart
function MetricTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
    value?: number | string;
    name?: string;
    color?: string;
  }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  const item = payload[0];
  const rawValue = item.value ?? 0;
  const value = typeof rawValue === "number" ? rawValue : 0;

  return (
    <div className="min-w-40 rounded-lg border border-border/60 bg-background p-3 shadow-lg">
      <p className="mb-1 text-sm font-medium">{label}</p>
      <div className="flex items-center gap-2 text-sm">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        <span className="text-foreground/50">{item.name}:</span>
        <span className="font-semibold">
          {item.name === "revenue"
            ? `$${formatNumber(value)}`
            : formatNumber(value)}
        </span>
      </div>
    </div>
  );
}

export default function AnalyticsDashboard() {
  const [activeCategory, setActiveCategory] = useState(categoryData[0].name);
  const [timeRange, setTimeRange] = useState<TimeRange>("monthly");
  const [chartType, setChartType] = useState<ChartType>("area");
  const [selectedMetric, setSelectedMetric] = useState<
    "revenue" | "orders" | "customers"
  >("revenue");

  const currentData = timeRangeData[timeRange];

  // Totals based on current time range
  const totalRevenue = currentData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = currentData.reduce((sum, item) => sum + item.orders, 0);
  const totalCustomers = currentData.reduce(
    (sum, item) => sum + item.customers,
    0,
  );

  const previousPeriodRevenue = totalRevenue * 0.92;
  const revenueGrowth =
    ((totalRevenue - previousPeriodRevenue) / previousPeriodRevenue) * 100;

  // Stats now correctly depend on selectedMetric AND timeRange
  const metricValues = currentData.map((d) => d[selectedMetric]);
  const peak = Math.max(...metricValues);
  const lowest = Math.min(...metricValues);
  const avg = Math.round(
    metricValues.reduce((sum, v) => sum + v, 0) / metricValues.length,
  );

  const chartConfig = getChartConfig(selectedMetric);

  const activeCategoryIndex = useMemo(
    () => categoryData.findIndex((item) => item.name === activeCategory),
    [activeCategory],
  );

  const categoryNames = useMemo(
    () => categoryData.map((item) => item.name),
    [],
  );

  const renderPieShape = useCallback(
    ({ index, outerRadius = 0, ...props }: PieSectorShapeProps) => {
      if (index === activeCategoryIndex) {
        return (
          <g>
            <Sector {...props} outerRadius={outerRadius + 10} />
            <Sector
              {...props}
              outerRadius={outerRadius + 25}
              innerRadius={outerRadius + 12}
            />
          </g>
        );
      }
      return <Sector {...props} outerRadius={outerRadius} />;
    },
    [activeCategoryIndex],
  );

  // Chart config for pie (categories only)
  const pieChartConfig = {
    value: {
      label: "Value",
    },
    Electronics: {
      label: "Electronics",
      color: "hsl(216, 100%, 60%)",
    },
    Clothing: {
      label: "Clothing",
      color: "hsl(276, 100%, 65%)",
    },
    "Home & Garden": {
      label: "Home & Garden",
      color: "hsl(156, 100%, 55%)",
    },
    Sports: {
      label: "Sports",
      color: "hsl(36, 100%, 60%)",
    },
    Books: {
      label: "Books",
      color: "hsl(336, 100%, 65%)",
    },
  } satisfies ChartConfig;

  const renderChart = (): ReactElement => {
    const dataKey = selectedMetric;

    switch (chartType) {
      case "area":
        return (
          <ChartContainer config={chartConfig} className="w-full h-120">
            <AreaChart
              data={currentData}
              margin={{ top: 20, right: 0, left: -60, bottom: -30 }}
            >
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--color-value)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="80%"
                    stopColor="var(--color-value)"
                    stopOpacity={0.12}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-value)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={false}
              />
              <YAxis tickLine={false} axisLine={false} tick={false} width={0} />
              <Tooltip
                content={<MetricTooltip />}
                cursor={{ stroke: "currentColor", strokeOpacity: 0.15 }}
              />
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke="var(--color-value)"
                strokeWidth={2}
                fill="url(#areaGradient)"
                fillOpacity={1}
                activeDot={{
                  r: 5,
                  fill: "var(--color-value)",
                  stroke: "hsl(var(--background))",
                  strokeWidth: 2,
                }}
                animationDuration={1600}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ChartContainer>
        );
      case "pie": {
        const id = "pie-interactive";

        return (
          <div className="w-full">
            <ChartStyle id={id} config={pieChartConfig} />

            <div className="flex flex-col">
              {/* Header with title + select */}
              <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-5 p-4 sm:p-5">
                <div className="grid">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    Category Distribution
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-foreground/50">
                    Revenue by product category
                  </p>
                </div>

                <Select
                  value={activeCategory}
                  onValueChange={setActiveCategory}
                >
                  <SelectTrigger
                    aria-label="Select a category"
                    className="p-4! bg-background! border-foreground/15! cursor-pointer rounded-md w-full sm:w-50 h-11!"
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent align="end" className="p-2! w-full sm:w-50!">
                    {categoryNames.map((key) => {
                      const config =
                        pieChartConfig[key as keyof typeof pieChartConfig];

                      if (
                        !config ||
                        !("color" in config) ||
                        typeof config.color !== "string"
                      ) {
                        return null;
                      }

                      return (
                        <SelectItem
                          key={key}
                          value={key}
                          className="[&_span]:flex cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className="flex size-4 shrink-0 rounded-xs"
                              style={{
                                backgroundColor: config.color,
                              }}
                            />
                            {config.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </header>

              {/* Chart */}
              <div className="flex flex-1 justify-center">
                <ChartContainer
                  id={id}
                  config={pieChartConfig}
                  className="aspect-video w-full h-60 sm:h-72 md:h-96 lg:h-100"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={90}
                      strokeWidth={10}
                      shape={renderPieShape}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            const activeItem =
                              categoryData[activeCategoryIndex];
                            const rawValue = activeItem?.value ?? 0;
                            const value =
                              typeof rawValue === "number" ? rawValue : 0;

                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-foreground text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight"
                                >
                                  ${value.toLocaleString()}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 28}
                                  className="fill-foreground text-sm tracking-widest uppercase"
                                >
                                  {activeItem?.name ?? "Category"}
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </div>
            </div>
          </div>
        );
      }

      default:
        return <></>;
    }
  };

  return (
    <div className="p-5 w-full">
      <div className="flex flex-col border rounded-2xl overflow-hidden w-full">
        {/* Header */}
        <header className="p-5 border-b">
          <div>
            <h2 className="flex items-center gap-3 text-3xl md:text-4xl font-semibold tracking-tight">
              <Activity className="size-10 stroke-1 text-green-500" />
              Analytics Dashboard
            </h2>
            <p className="mt-1 ml-6 md:ml-12 text-sm md:text-base tracking-wide text-foreground/50">
              Track your business metrics and performance
            </p>
          </div>

          {/* KPI Cards (based on timeRange) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="rounded-xl border bg-foreground/5 p-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-foreground/50">
                  <DollarSign className="size-6 stroke-1" />
                  <span className="text-sm md:text-base font-medium">
                    Total Revenue
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    revenueGrowth >= 0
                      ? "bg-green-500/15 border-green-500/40 text-green-500"
                      : "bg-red-500/15 border-red-500/40 text-red-500",
                    "p-3!",
                  )}
                >
                  {revenueGrowth >= 0 ? (
                    <ArrowUpRight className="size-3" />
                  ) : (
                    <ArrowDownRight className="size-3" />
                  )}
                  {Math.abs(revenueGrowth).toFixed(1)}%
                </Badge>
              </div>
              <div className="my-3 text-2xl md:text-4xl font-semibold tracking-tight">
                ${formatCompactNumber(totalRevenue)}
              </div>
              <div className="text-sm md:text-base text-foreground/50">
                vs ${formatCompactNumber(previousPeriodRevenue)} last period
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border bg-foreground/5 p-4"
            >
              <div className="mb-2 flex items-center gap-2 text-foreground/50">
                <ShoppingCart className="size-6 stroke-1" />
                <span className="text-sm md:text-base font-medium">
                  Total Orders
                </span>
              </div>
              <div className="my-3 text-2xl md:text-4xl font-semibold tracking-tight">
                {formatNumber(totalOrders)}
              </div>
              <div className="text-sm md:text-base text-foreground/50">
                Avg {formatNumber(Math.round(totalOrders / currentData.length))}{" "}
                per period
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-xl border bg-foreground/5 p-4"
            >
              <div className="mb-2 flex items-center gap-2 text-foreground/50">
                <Users className="size-6 stroke-1" />
                <span className="text-sm md:text-base font-medium">
                  New Customers
                </span>
              </div>
              <div className="my-3 text-2xl md:text-4xl font-semibold tracking-tight">
                {formatNumber(totalCustomers)}
              </div>
              <div className="text-sm md:text-base text-foreground/50">
                +{formatNumber(Math.round(totalCustomers * 0.15))} from last
                period
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border bg-foreground/5 p-4"
            >
              <div className="mb-2 flex items-center gap-2 text-foreground/50">
                <TrendingUp className="size-6 stroke-1" />
                <span className="text-sm md:text-base font-medium">
                  Conversion Rate
                </span>
              </div>
              <div className="my-3 text-2xl md:text-4xl font-semibold tracking-tight">
                3.2%
              </div>
              <div className="text-sm md:text-base text-foreground/50">
                +0.4% vs last period
              </div>
            </motion.div>
          </div>
        </header>

        {/* Controls */}
        <div className="p-5 flex flex-col md:flex-row justify-between gap-4 border-b">
          <Tabs
            value={timeRange}
            onValueChange={(v) => setTimeRange(v as TimeRange)}
          >
            <TabsList className="p-1! h-11!">
              <TabsTrigger
                value="weekly"
                className="py-2! px-3! border-0! data-active:bg-foreground! data-active:text-secondary! font-semibold h-9"
              >
                Weekly
              </TabsTrigger>
              <TabsTrigger
                value="monthly"
                className="py-2! px-3! border-0! data-active:bg-foreground! data-active:text-secondary! font-semibold h-9"
              >
                Monthly
              </TabsTrigger>
              <TabsTrigger
                value="quarterly"
                className="py-2! px-3! border-0! data-active:bg-foreground! data-active:text-secondary! font-semibold h-9"
              >
                Quarterly
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2">
            <Select
              value={selectedMetric}
              onValueChange={(v: "revenue" | "orders" | "customers") =>
                setSelectedMetric(v)
              }
            >
              <SelectTrigger className="p-4! text-sm md:text-base cursor-pointer rounded-md w-45 h-11!">
                <SelectValue placeholder="Metric" />
              </SelectTrigger>
              <SelectContent className="p-2! w-45!">
                <SelectItem value="revenue" className="cursor-pointer">
                  Revenue
                </SelectItem>
                <SelectItem value="orders" className="cursor-pointer">
                  Orders
                </SelectItem>
                <SelectItem value="customers" className="cursor-pointer">
                  Customers
                </SelectItem>
              </SelectContent>
            </Select>

            <Tabs
              value={chartType}
              onValueChange={(v) => setChartType(v as ChartType)}
            >
              <TabsList className="p-1! h-11!">
                <TabsTrigger
                  value="area"
                  className="p-2! border-0! data-active:bg-foreground! data-active:text-secondary! font-semibold h-9"
                >
                  <Activity className="size-5" />
                </TabsTrigger>
                <TabsTrigger
                  value="pie"
                  className="p-2! border-0! data-active:bg-foreground! data-active:text-secondary! font-semibold h-9"
                >
                  <PieChartIcon className="size-5" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Chart + summary */}
        <div className="p-5 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {selectedMetric === "revenue" && (
                <DollarSign className="size-6" />
              )}
              {selectedMetric === "orders" && (
                <ShoppingCart className="size-6" />
              )}
              {selectedMetric === "customers" && <Users className="size-6" />}
              <h3 className="text-sm md:text-base font-semibold capitalize">
                {selectedMetric} Overview
              </h3>
            </div>
            <Badge
              className={`capitalize p-4! text-sm tracking-wide font-bold text-white! ${
                selectedMetric === "revenue"
                  ? "bg-green-600"
                  : selectedMetric === "orders"
                    ? "bg-blue-600"
                    : "bg-purple-600"
              }`}
            >
              {timeRange} data
            </Badge>
          </div>

          <div className="bg-foreground/5 border rounded-xl overflow-hidden w-full h-full">
            {renderChart()}
          </div>

          {/* Mini stats row (different for each metric & timeline) */}
          {chartType === "area" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div className="p-5 bg-foreground/5 border rounded-xl">
                <div className="flex items-center gap-2 text-foreground/50">
                  <TrendingUp className="size-6 stroke-1" />
                  <span className="text-sm md:text-base font-medium">Peak</span>
                </div>
                <div className="my-2 text-2xl md:text-3xl font-semibold tracking-tight">
                  {selectedMetric === "revenue"
                    ? `$${formatCompactNumber(peak)}`
                    : formatNumber(peak)}
                </div>
                <div className="text-sm md:text-base text-foreground/50">
                  highest {selectedMetric} in period
                </div>
              </div>

              <div className="p-5 bg-foreground/5 border rounded-xl">
                <div className="flex items-center gap-2 text-foreground/50">
                  <Activity className="size-6 stroke-1" />
                  <span className="text-sm md:text-base font-medium">
                    Average
                  </span>
                </div>
                <div className="my-2 text-2xl md:text-3xl font-semibold tracking-tight">
                  {selectedMetric === "revenue"
                    ? `$${formatCompactNumber(avg)}`
                    : formatNumber(avg)}
                </div>
                <div className="text-sm md:text-base text-foreground/50">
                  per{" "}
                  {timeRange === "weekly"
                    ? "day"
                    : timeRange === "monthly"
                      ? "month"
                      : "quarter"}
                </div>
              </div>

              <div className="p-5 bg-foreground/5 border rounded-xl">
                <div className="flex items-center gap-2 text-foreground/50">
                  <Clock className="size-6 stroke-1" />
                  <span className="text-sm md:text-base font-medium">
                    Lowest
                  </span>
                </div>
                <div className="my-2 text-2xl md:text-3xl font-semibold tracking-tight">
                  {selectedMetric === "revenue"
                    ? `$${formatCompactNumber(lowest)}`
                    : formatNumber(lowest)}
                </div>
                <div className="text-sm md:text-base text-foreground/50">
                  lowest {selectedMetric} in period
                </div>
              </div>
            </div>
          )}

          {/* Product Performance (only for pie) */}
          {chartType === "pie" && (
            <div className="border rounded-xl overflow-hidden">
              <h3 className="font-semibold py-4 px-5 bg-foreground/5 border-b">
                Product Performance
              </h3>
              <div className="p-5 space-y-3">
                {productPerformanceData.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm md:text-base text-foreground/50">
                        {product.sales} units • ${formatNumber(product.revenue)}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        product.growth >= 0
                          ? "bg-green-500/15 border-green-500/50 text-green-500"
                          : "bg-red-500/15 border-red-500/50 text-red-500",
                        "p-3!",
                      )}
                    >
                      {product.growth >= 0 ? "+" : ""}
                      {product.growth}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer summary (only for area chart metrics) */}
        {chartType === "area" && (
          <div className="flex items-center justify-between bg-foreground/5 border-t p-5 text-sm md:text-base text-foreground/60">
            <span>
              {formatNumber(lowest)} lowest {selectedMetric}
            </span>
            <span>
              {selectedMetric === "revenue"
                ? `$${formatCompactNumber(peak)}`
                : formatNumber(peak)}{" "}
              highest {selectedMetric}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
