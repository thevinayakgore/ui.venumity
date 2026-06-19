"use client";
import { ReactElement, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Calendar,
  Download,
  RefreshCw,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Activity,
  DollarSign,
  Users,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
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
  { name: "Electronics", value: 24500, color: "hsl(216, 100%, 60%)" },
  { name: "Clothing", value: 18200, color: "hsl(276, 100%, 65%)" },
  { name: "Home & Garden", value: 12800, color: "hsl(156, 100%, 55%)" },
  { name: "Sports", value: 9500, color: "hsl(36, 100%, 60%)" },
  { name: "Books", value: 6200, color: "hsl(336, 100%, 65%)" },
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
type ChartType = "bar" | "line" | "area" | "pie" | "composed";

const timeRangeData = {
  weekly: weeklyData,
  monthly: monthlyData,
  quarterly: quarterlyData,
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
    value?: number;
    name?: string;
    color?: string;
  }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-3">
        <p className="font-semibold mb-2">{label}</p>
        {payload.map(
          (
            entry: {
              value?: number;
              name?: string;
              color?: string;
            },
            index: number,
          ) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="font-medium">
                {entry.name === "revenue"
                  ? `$${entry.value?.toLocaleString?.()}`
                  : entry.value}
              </span>
            </div>
          ),
        )}
      </div>
    );
  }
  return null;
};

export default function ChartsDashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>("monthly");
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [selectedMetric, setSelectedMetric] = useState<
    "revenue" | "orders" | "customers"
  >("revenue");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const currentData = timeRangeData[timeRange];

  const totalRevenue = currentData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = currentData.reduce((sum, item) => sum + item.orders, 0);
  const totalCustomers = currentData.reduce(
    (sum, item) => sum + item.customers,
    0,
  );

  const previousPeriodRevenue = totalRevenue * 0.92; // Mock previous period
  const revenueGrowth =
    ((totalRevenue - previousPeriodRevenue) / previousPeriodRevenue) * 100;

  const getMetricIcon = () => {
    switch (selectedMetric) {
      case "revenue":
        return <DollarSign className="size-4" />;
      case "orders":
        return <ShoppingCart className="size-4" />;
      case "customers":
        return <Users className="size-4" />;
    }
  };

  const getMetricColor = () => {
    switch (selectedMetric) {
      case "revenue":
        return "hsl(216, 100%, 60%)";
      case "orders":
        return "hsl(276, 100%, 65%)";
      case "customers":
        return "hsl(156, 100%, 55%)";
    }
  };

  const renderChart = (): ReactElement => {
    const commonProps = {
      data: currentData,
      margin: { left: 0, right: 0, top: 20, bottom: 20 },
    };

    switch (chartType) {
      case "bar":
        return (
          <BarChart {...commonProps}>
            <defs>
              <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={getMetricColor()}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={getMetricColor()}
                  stopOpacity={0.2}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-foreground/10"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(215 0% 50%)" }}
            />
            <YAxis
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                selectedMetric === "revenue"
                  ? `$${value / 1000}K`
                  : value.toString()
              }
              tick={{ fill: "hsl(215 0% 50%)" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey={selectedMetric}
              fill="url(#colorMetric)"
              stroke={getMetricColor()}
              strokeWidth={1}
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </BarChart>
        );

      case "line":
        return (
          <LineChart {...commonProps}>
            <defs>
              <linearGradient id="colorMetricLine" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={getMetricColor()}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={getMetricColor()}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-foreground/10"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(215 0% 50%)" }}
            />
            <YAxis
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                selectedMetric === "revenue"
                  ? `$${value / 1000}K`
                  : value.toString()
              }
              tick={{ fill: "hsl(215 0% 50%)" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey={selectedMetric}
              stroke={getMetricColor()}
              strokeWidth={3}
              dot={{ fill: getMetricColor(), strokeWidth: 2 }}
              activeDot={{ r: 6, stroke: "white", strokeWidth: 2 }}
              animationDuration={1500}
            />
          </LineChart>
        );

      case "area":
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorMetricArea" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={getMetricColor()}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={getMetricColor()}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-foreground/10"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(215 0% 50%)" }}
            />
            <YAxis
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                selectedMetric === "revenue"
                  ? `$${value / 1000}K`
                  : value.toString()
              }
              tick={{ fill: "hsl(215 0% 50%)" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={selectedMetric}
              stroke={getMetricColor()}
              strokeWidth={2}
              fill="url(#colorMetricArea)"
              animationDuration={1500}
            />
          </AreaChart>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                animationDuration={1500}
                label={({ name, percent }) =>
                  `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-3">
                        <p className="font-semibold">{payload[0].name}</p>
                        <p className="text-sm">
                          <span className="text-muted-foreground">Value: </span>
                          <span className="font-medium">
                            ${payload[0].value?.toLocaleString()}
                          </span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return <></>;
    }
  };

  return (
    <main className="p-6 md:p-10">
      <Card className="w-full pt-0 shadow-none hover:shadow-xl/10 overflow-hidden transition-all duration-500">
        <CardHeader className="pt-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-4xl font-semibold flex items-center gap-3">
                <Activity className="size-8 text-primary" />
                Analytics Dashboard
              </CardTitle>
              <p className="text-sm md:text-base text-foreground/60 mt-1">
                Track your business metrics and performance
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="gap-2 cursor-pointer rounded-sm"
                disabled={isRefreshing}
              >
                <RefreshCw
                  className={`size-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 cursor-pointer rounded-sm"
              >
                <Download className="size-4" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 cursor-pointer rounded-sm"
              >
                <Calendar className="size-4" />
                {timeRange === "weekly" && "This Week"}
                {timeRange === "monthly" && "This Month"}
                {timeRange === "quarterly" && "This Quarter"}
              </Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-muted/30 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="size-4" />
                  <span className="text-xs">Total Revenue</span>
                </div>
                <Badge
                  variant="outline"
                  className={
                    revenueGrowth >= 0
                      ? "bg-green-500/10 text-green-600"
                      : "bg-red-500/10 text-red-600"
                  }
                >
                  {revenueGrowth >= 0 ? (
                    <ArrowUpRight className="size-3" />
                  ) : (
                    <ArrowDownRight className="size-3" />
                  )}
                  {Math.abs(revenueGrowth).toFixed(1)}%
                </Badge>
              </div>
              <div className="text-2xl font-bold">
                ${totalRevenue.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                vs ${previousPeriodRevenue.toLocaleString()} last period
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-muted/30 rounded-lg p-4"
            >
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <ShoppingCart className="size-4" />
                <span className="text-xs">Total Orders</span>
              </div>
              <div className="text-2xl font-bold">
                {totalOrders.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Avg {(totalOrders / currentData.length).toFixed(0)} per period
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-muted/30 rounded-lg p-4"
            >
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Users className="size-4" />
                <span className="text-xs">New Customers</span>
              </div>
              <div className="text-2xl font-bold">
                {totalCustomers.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                +{(totalCustomers * 0.15).toFixed(0)} from last period
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-muted/30 rounded-lg p-4"
            >
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <TrendingUp className="size-4" />
                <span className="text-xs">Conversion Rate</span>
              </div>
              <div className="text-2xl font-bold">3.2%</div>
              <div className="text-xs text-muted-foreground mt-1">
                +0.4% vs last period
              </div>
            </motion.div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <Tabs
              value={timeRange}
              onValueChange={(v) => setTimeRange(v as TimeRange)}
              className="w-full md:w-auto"
            >
              <TabsList>
                <TabsTrigger value="weekly" className="cursor-pointer">
                  Weekly
                </TabsTrigger>
                <TabsTrigger value="monthly" className="cursor-pointer">
                  Monthly
                </TabsTrigger>
                <TabsTrigger value="quarterly" className="cursor-pointer">
                  Quarterly
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex gap-3">
              <Select
                value={selectedMetric}
                onValueChange={(v: "revenue" | "orders" | "customers") =>
                  setSelectedMetric(v)
                }
              >
                <SelectTrigger className="w-35 cursor-pointer">
                  <SelectValue placeholder="Metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="orders">Orders</SelectItem>
                  <SelectItem value="customers">Customers</SelectItem>
                </SelectContent>
              </Select>

              <Tabs
                value={chartType}
                onValueChange={(v) => setChartType(v as ChartType)}
                className="w-full md:w-auto"
              >
                <TabsList>
                  <TabsTrigger value="bar" className="cursor-pointer px-3">
                    <BarChart3 className="size-4" />
                  </TabsTrigger>
                  <TabsTrigger value="line" className="cursor-pointer px-3">
                    <LineChartIcon className="size-4" />
                  </TabsTrigger>
                  <TabsTrigger value="area" className="cursor-pointer px-3">
                    <Activity className="size-4" />
                  </TabsTrigger>
                  <TabsTrigger value="pie" className="cursor-pointer px-3">
                    <PieChartIcon className="size-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Chart */}
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {getMetricIcon()}
                <h3 className="font-semibold capitalize">
                  {selectedMetric} Overview
                </h3>
              </div>
              <Badge variant="outline" className="capitalize">
                {timeRange} data
              </Badge>
            </div>
            <div className="h-100 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${timeRange}-${chartType}-${selectedMetric}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="h-full w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    {renderChart()}
                  </ResponsiveContainer>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Product Performance */}
          {chartType === "pie" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Product Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {productPerformanceData.map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {product.sales} units • $
                            {product.revenue.toLocaleString()}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            product.growth >= 0
                              ? "bg-green-500/10 text-green-600"
                              : "bg-red-500/10 text-red-600"
                          }
                        >
                          {product.growth >= 0 ? "+" : ""}
                          {product.growth}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
