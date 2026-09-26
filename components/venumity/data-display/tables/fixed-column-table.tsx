"use client";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  Calendar,
  DollarSign,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
} from "lucide-react";

interface SalesData {
  month: string;
  productA: number;
  productB: number;
  productC: number;
  productD: number;
  productE: number;
  productF: number;
  total: number;
  target?: number;
  forecast?: number;
}

const salesData: SalesData[] = [
  {
    month: "January",
    productA: 45000,
    productB: 32000,
    productC: 28000,
    productD: 19000,
    productE: 15000,
    productF: 12000,
    total: 151000,
    target: 145000,
    forecast: 153000,
  },
  {
    month: "February",
    productA: 48000,
    productB: 35000,
    productC: 30000,
    productD: 21000,
    productE: 17000,
    productF: 14000,
    total: 165000,
    target: 155000,
    forecast: 168000,
  },
  {
    month: "March",
    productA: 52000,
    productB: 38000,
    productC: 32000,
    productD: 23000,
    productE: 19000,
    productF: 16000,
    total: 180000,
    target: 170000,
    forecast: 182000,
  },
  {
    month: "April",
    productA: 49000,
    productB: 36000,
    productC: 31000,
    productD: 22000,
    productE: 18000,
    productF: 15000,
    total: 171000,
    target: 175000,
    forecast: 173000,
  },
  {
    month: "May",
    productA: 55000,
    productB: 41000,
    productC: 35000,
    productD: 25000,
    productE: 21000,
    productF: 18000,
    total: 195000,
    target: 185000,
    forecast: 198000,
  },
  {
    month: "June",
    productA: 58000,
    productB: 43000,
    productC: 37000,
    productD: 27000,
    productE: 23000,
    productF: 20000,
    total: 208000,
    target: 200000,
    forecast: 210000,
  },
  {
    month: "July",
    productA: 51000,
    productB: 39000,
    productC: 34000,
    productD: 24000,
    productE: 20000,
    productF: 17000,
    total: 185000,
    target: 190000,
    forecast: 187000,
  },
  {
    month: "August",
    productA: 54000,
    productB: 40000,
    productC: 36000,
    productD: 26000,
    productE: 22000,
    productF: 19000,
    total: 197000,
    target: 195000,
    forecast: 200000,
  },
  {
    month: "September",
    productA: 60000,
    productB: 45000,
    productC: 40000,
    productD: 29000,
    productE: 25000,
    productF: 22000,
    total: 221000,
    target: 210000,
    forecast: 225000,
  },
  {
    month: "October",
    productA: 57000,
    productB: 42000,
    productC: 38000,
    productD: 28000,
    productE: 24000,
    productF: 21000,
    total: 210000,
    target: 215000,
    forecast: 213000,
  },
  {
    month: "November",
    productA: 63000,
    productB: 47000,
    productC: 42000,
    productD: 31000,
    productE: 27000,
    productF: 24000,
    total: 234000,
    target: 225000,
    forecast: 238000,
  },
  {
    month: "December",
    productA: 65000,
    productB: 49000,
    productC: 44000,
    productD: 33000,
    productE: 29000,
    productF: 26000,
    total: 246000,
    target: 240000,
    forecast: 250000,
  },
];

const products = [
  "productA",
  "productB",
  "productC",
  "productD",
  "productE",
  "productF",
] as const;

const productNames = {
  productA: "Laptops",
  productB: "Phones",
  productC: "Tablets",
  productD: "Accessories",
  productE: "Monitors",
  productF: "Servers",
};

const productColors = {
  productA: "blue",
  productB: "green",
  productC: "purple",
  productD: "amber",
  productE: "rose",
  productF: "indigo",
};

export default function FixedColumnTable() {
  const tableRef = useRef<HTMLDivElement>(null);
  type ViewMode = "actual" | "percentage" | "comparison";
  const [viewMode, setViewMode] = useState<ViewMode>("actual");
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  type SortBy = "month" | "total";
  type SortOrder = "asc" | "desc";

  const [sortBy, setSortBy] = useState<SortBy>("month");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCompactCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}K`;
    return `$${amount}`;
  };

  const getGrowth = (current: number, previous: number) => {
    return ((current - previous) / previous) * 100;
  };

  const getMarketShare = (productValue: number, total: number) => {
    return (productValue / total) * 100;
  };

  const getPerformanceColor = (value: number, target?: number) => {
    if (!target) return "";
    const percentage = (value / target) * 100;
    if (percentage >= 100) return "text-green-500";
    if (percentage >= 80) return "text-yellow-500";
    return "text-red-500";
  };

  const toggleColumn = (product: string) => {
    setHiddenColumns((prev) =>
      prev.includes(product)
        ? prev.filter((p) => p !== product)
        : [...prev, product],
    );
  };

  const sortedData = [...salesData].sort((a, b) => {
    if (sortBy === "month") {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const order = sortOrder === "asc" ? 1 : -1;
      return (months.indexOf(a.month) - months.indexOf(b.month)) * order;
    } else {
      return sortOrder === "asc" ? a.total - b.total : b.total - a.total;
    }
  });

  const visibleProducts = products.filter((p) => !hiddenColumns.includes(p));

  const totalYearSales = salesData.reduce((sum, data) => sum + data.total, 0);
  const averageMonthlySales = totalYearSales / salesData.length;
  const bestMonth = [...salesData].sort((a, b) => b.total - a.total)[0];

  return (
    <div className="p-5 w-full h-full">
      <Card className="p-0! gap-0! bg-foreground/5! shadow-none hover:shadow-xl/10 overflow-hidden transition-all duration-500 w-full">
        <CardHeader className="p-3! md:p-5! border-b">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-3 w-full">
            <div>
              <CardTitle className="text-2xl font-semibold">
                Sales Dashboard
              </CardTitle>
              <p className="text-sm md:text-base text-foreground/50">
                Monthly sales performance by product
              </p>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <div className="size-4 bg-green-500 rounded" />
                <span>Above Target</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-yellow-400 rounded" />
                <span>Near Target</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-red-500 rounded" />
                <span>Below Target</span>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mt-5 text-white w-full">
            <div className="relative p-5 bg-linear-to-br from-sky-400 to-blue-600 rounded-xl overflow-hidden w-full">
              <div className="flex flex-col items-start gap-2 text-xs">
                <p className="text-sm md:text-base">Total Revenue</p>
                <p className="text-4xl font-bold leading-none">
                  {formatCompactCurrency(totalYearSales)}
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Badge className="p-3! font-bold bg-white! text-blue-500">
                    +{(((totalYearSales - 2000000) / 2000000) * 100).toFixed(1)}
                    % vs LY
                  </Badge>
                  <span className="opacity-70">Annual</span>
                </div>
              </div>
              <DollarSign className="absolute -bottom-5 -right-5 -rotate-10 size-30 opacity-50 stroke-1" />
            </div>

            <div className="relative p-5 bg-linear-to-br from-green-400 to-green-600 rounded-xl overflow-hidden w-full">
              <div className="relative z-10 flex flex-col items-start gap-2 text-xs">
                <p className="text-sm md:text-base">Monthly Average</p>
                <p className="text-3xl font-bold leading-none">
                  {formatCompactCurrency(averageMonthlySales)}
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Badge className="bg-white! p-3! font-bold text-green-600!">
                    Stable
                  </Badge>
                  <span className="opacity-75">Monthly</span>
                </div>
              </div>
              <BarChart3 className="absolute -bottom-5 -right-5 size-30 -rotate-10 stroke-1 opacity-30" />
            </div>

            <div className="relative p-5 bg-linear-to-br from-amber-400 to-orange-600 rounded-xl overflow-hidden w-full">
              <div className="relative z-10 flex flex-col items-start gap-2 text-xs">
                <p className="text-sm md:text-base">Best Month</p>

                <p className="max-w-full truncate text-3xl font-bold leading-none">
                  {bestMonth?.month || "—"}
                </p>

                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Badge className="bg-white! p-3! font-bold text-orange-600!">
                    Peak
                  </Badge>

                  <span className="opacity-75">
                    {formatCurrency(bestMonth?.total || 0)}
                  </span>
                </div>
              </div>

              <TrendingUp className="absolute -bottom-5 -right-5 size-30 -rotate-10 stroke-1 opacity-30" />
            </div>

            <div className="relative p-5 bg-linear-to-br from-purple-400 to-indigo-600 rounded-xl overflow-hidden w-full">
              <div className="relative z-10 flex flex-col items-start gap-2 text-xs">
                <p className="text-sm md:text-base">Growth Rate</p>

                <p className="text-3xl font-bold leading-none">+15.3%</p>

                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Badge className="bg-white! p-3! font-bold text-purple-600!">
                    Positive
                  </Badge>

                  <span className="opacity-75">Year over Year</span>
                </div>
              </div>

              <Sparkles className="absolute -bottom-5 -right-5 size-30 -rotate-10 stroke-1 opacity-30" />
            </div>
          </div>

          {/* View Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 overflow-hidden mt-4 w-full">
            <Tabs
              value={viewMode}
              onValueChange={(v: string) => {
                if (
                  v === "actual" ||
                  v === "percentage" ||
                  v === "comparison"
                ) {
                  setViewMode(v);
                }
              }}
            >
              <TabsList className="p-1! h-11!">
                <TabsTrigger
                  value="actual"
                  className="py-2! px-3! border-0! data-active:bg-foreground! data-active:text-secondary! font-semibold h-9"
                >
                  Actual Values
                </TabsTrigger>
                <TabsTrigger
                  value="percentage"
                  className="py-2! px-3! border-0! data-active:bg-foreground! data-active:text-secondary! font-semibold h-9"
                >
                  Market Share
                </TabsTrigger>
                <TabsTrigger
                  value="comparison"
                  className="py-2! px-3! border-0! data-active:bg-foreground! data-active:text-secondary! font-semibold h-9"
                >
                  Achievement
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-wrap items-center gap-2 w-full">
              <span className="text-sm md:text-base mr-3">Filters</span>
              {products.map((product) => (
                <Button
                  key={product}
                  onClick={() => toggleColumn(product)}
                  className={cn(
                    "px-4! bg-foreground/10! text-foreground! font-semibold border border-foreground/15",
                    hiddenColumns.includes(product) && "opacity-50",
                  )}
                >
                  {productNames[product]}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative p-0! overflow-hidden">
          <div ref={tableRef} className="overflow-auto w-full">
            <Table>
              <TableHeader>
                <TableRow className="bg-foreground/10! border-b">
                  {/* Fixed first column */}
                  <TableHead className="sticky left-0 p-0! z-50 transform-gpu w-full">
                    <button
                      onClick={() => {
                        setSortBy("month");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                      className="flex items-center justify-between px-3 py-2 bg-primary! text-white text-base md:text-lg font-semibold rounded-none w-40"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Calendar className="size-5" />
                        <span>Month</span>
                      </div>

                      {sortBy === "month" && sortOrder === "asc" ? (
                        <ArrowUp className="size-5" />
                      ) : (
                        <ArrowDown className="size-5" />
                      )}
                    </button>
                  </TableHead>

                  {/* Scrollable columns */}
                  {visibleProducts.map((product) => (
                    <TableHead key={product} className="px-5 min-w-40">
                      {productNames[product]}
                    </TableHead>
                  ))}

                  <TableHead className="text-base px-5 uppercase min-w-40">Total</TableHead>
                  <TableHead className="text-base px-5 uppercase min-w-40">Growth</TableHead>
                  <TableHead className="text-base px-5 uppercase min-w-40">Target</TableHead>
                  <TableHead className="text-base px-5 uppercase min-w-40">Share</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {sortedData.map((data, index) => {
                    const previousMonth =
                      index > 0 ? sortedData[index - 1].total : data.total;
                    const growth = getGrowth(data.total, previousMonth);
                    const isPositive = growth >= 0;

                    return (
                      <motion.tr
                        key={data.month}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.02 }}
                        className="group border-b last:border-0"
                      >
                        {/* Fixed first column */}
                        <TableCell className="sticky left-0 px-5 py-2 bg-background z-10 text-base font-semibold">
                          {data.month}
                        </TableCell>

                        {/* Scrollable columns */}
                        {visibleProducts.map((product) => {
                          const value = data[product];
                          const marketShare = getMarketShare(value, data.total);
                          const target = data.target
                            ? data.target * (value / data.total)
                            : value;
                          const isAboveTarget = value >= target;

                          return (
                            <TableCell key={product} className="px-5">
                              {viewMode === "actual" && (
                                <div>
                                  <div className="font-semibold">
                                    {formatCurrency(value)}
                                  </div>
                                  <div className="text-xs text-foreground/60">
                                    {marketShare.toFixed(1)}% share
                                  </div>
                                </div>
                              )}
                              {viewMode === "percentage" && (
                                <div>
                                  <div className="font-semibold">
                                    {marketShare.toFixed(1)}%
                                  </div>
                                  <Progress
                                    value={marketShare}
                                    className={cn(
                                      "h-1 w-16",
                                      `bg-${productColors[product]}-500`,
                                    )}
                                  />
                                </div>
                              )}
                              {viewMode === "comparison" && (
                                <div>
                                  <div
                                    className={cn(
                                      "font-semibold",
                                      getPerformanceColor(value, target),
                                    )}
                                  >
                                    {isAboveTarget ? "+" : "-"}
                                    {Math.abs(
                                      ((value - target) / target) * 100,
                                    ).toFixed(1)}
                                    %
                                  </div>
                                  <div className="text-xs text-foreground/60">
                                    vs target
                                  </div>
                                </div>
                              )}
                            </TableCell>
                          );
                        })}

                        <TableCell className="px-5">
                          <div className="font-bold text-lg">
                            {formatCompactCurrency(data.total)}
                          </div>
                          {data.target && (
                            <div className="text-xs text-foreground/60">
                              vs {formatCompactCurrency(data.target)}
                            </div>
                          )}
                        </TableCell>

                        <TableCell className="px-5">
                          <div
                            className={cn(
                              "flex items-center gap-1 font-semibold",
                              isPositive ? "text-green-500" : "text-red-500",
                            )}
                          >
                            {isPositive ? (
                              <ArrowUpRight className="size-4" />
                            ) : (
                              <ArrowDownRight className="size-4" />
                            )}
                            {isPositive ? "+" : ""}
                            {growth.toFixed(1)}%
                          </div>
                        </TableCell>

                        <TableCell className="px-5">
                          {data.target && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="space-y-1">
                                    <div className="font-medium">
                                      {formatCompactCurrency(data.target)}
                                    </div>
                                    <Progress
                                      value={(data.total / data.target) * 100}
                                      className={cn(
                                        "h-1 w-16",
                                        data.total / data.target >= 1
                                          ? "bg-green-500"
                                          : "bg-yellow-500",
                                      )}
                                    />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Target: {formatCurrency(data.target)}</p>
                                  <p>
                                    Achieved:{" "}
                                    {((data.total / data.target) * 100).toFixed(
                                      1,
                                    )}
                                    %
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </TableCell>

                        <TableCell className="px-5">
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              {((data.total / totalYearSales) * 100).toFixed(1)}
                              %
                            </div>
                            <Progress
                              value={(data.total / totalYearSales) * 100}
                              className="h-1 w-16 bg-blue-500"
                            />
                          </div>
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>

                {/* Totals row */}
                <TableRow className="bg-foreground/10 border-t font-semibold">
                  <TableCell className="sticky left-0 px-5 py-2 bg-blue-600 text-white z-10 text-base md:text-lg font-bold tracking-wide">
                    Year Total
                  </TableCell>

                  {visibleProducts.map((product) => {
                    const total = salesData.reduce(
                      (sum, data) => sum + data[product],
                      0,
                    );
                    return (
                      <TableCell key={product} className="font-bold px-5">
                        {formatCompactCurrency(total)}
                      </TableCell>
                    );
                  })}

                  <TableCell className="text-lg font-bold px-5">
                    {formatCompactCurrency(totalYearSales)}
                  </TableCell>

                  <TableCell className="px-5">
                    <div className="text-green-500">
                      +
                      {getGrowth(
                        salesData[salesData.length - 1].total,
                        salesData[0].total,
                      ).toFixed(1)}
                      %
                    </div>
                  </TableCell>

                  <TableCell className="px-5">
                    {formatCompactCurrency(
                      salesData.reduce(
                        (sum, data) => sum + (data.target || 0),
                        0,
                      ),
                    )}
                  </TableCell>

                  <TableCell className="px-5">
                    <div className="text-sm font-medium">100%</div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
