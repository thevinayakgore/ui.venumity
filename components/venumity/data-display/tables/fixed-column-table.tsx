"use client";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  Download,
  Calendar,
  DollarSign,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";

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
  productA: { name: "Laptops", icon: "💻", color: "text-blue-600" },
  productB: { name: "Phones", icon: "📱", color: "text-emerald-600" },
  productC: { name: "Tablets", icon: "📟", color: "text-purple-600" },
  productD: { name: "Accessories", icon: "🎧", color: "text-amber-600" },
  productE: { name: "Monitors", icon: "🖥️", color: "text-rose-600" },
  productF: { name: "Servers", icon: "🖧", color: "text-indigo-600" },
};

const productColors = {
  productA: "blue",
  productB: "emerald",
  productC: "purple",
  productD: "amber",
  productE: "rose",
  productF: "indigo",
};

export default function FixedColumnTable() {
  const tableRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledRight, setIsScrolledRight] = useState(false);
  type ViewMode = "actual" | "percentage" | "comparison";

  const [viewMode, setViewMode] = useState<ViewMode>("actual");
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [showTargets, setShowTargets] = useState(true);
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  type SortBy = "month" | "total";
  type SortOrder = "asc" | "desc";

  const [sortBy, setSortBy] = useState<SortBy>("month");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        setIsScrolled(tableRef.current.scrollLeft > 0);
        setIsScrolledRight(
          tableRef.current.scrollLeft <
            tableRef.current.scrollWidth - tableRef.current.clientWidth - 10,
        );
      }
    };

    const table = tableRef.current;
    if (table) {
      table.addEventListener("scroll", handleScroll);
      return () => table.removeEventListener("scroll", handleScroll);
    }
  }, []);

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
    if (percentage >= 100) return "text-emerald-600";
    if (percentage >= 80) return "text-amber-600";
    return "text-rose-600";
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
    <main className="p-6 md:p-10">
      <Card className="w-full pt-0 shadow-none hover:shadow-xl/10 overflow-hidden transition-all duration-500">
        <CardHeader className="pt-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-4xl font-semibold">
                Sales Dashboard
              </CardTitle>
              <p className="text-sm md:text-base text-foreground/60 mt-1">
                Monthly sales performance by product • {selectedYear}
              </p>
            </div>
            <div className="flex gap-3">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-28 cursor-pointer">
                  <Calendar className="size-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => setShowTargets(!showTargets)}
                className="gap-2 cursor-pointer rounded-sm"
              >
                {showTargets ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeOff className="size-4" />
                )}
                {showTargets ? "Hide Targets" : "Show Targets"}
              </Button>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-500 cursor-pointer rounded-sm">
                <Download className="size-4" />
                Export
              </Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-linear-to-br from-blue-500/10 to-blue-600/5 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">
                    {formatCompactCurrency(totalYearSales)}
                  </p>
                </div>
                <DollarSign className="size-8 text-blue-500/30" />
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs">
                <Badge
                  variant="outline"
                  className="bg-blue-500/10 text-blue-600"
                >
                  +{(((totalYearSales - 2000000) / 2000000) * 100).toFixed(1)}%
                  vs LY
                </Badge>
                <span className="text-muted-foreground">Annual</span>
              </div>
            </div>

            <div className="bg-linear-to-br from-emerald-500/10 to-emerald-600/5 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Monthly Average
                  </p>
                  <p className="text-2xl font-bold">
                    {formatCompactCurrency(averageMonthlySales)}
                  </p>
                </div>
                <BarChart3 className="size-8 text-emerald-500/30" />
              </div>
              <Progress value={85} className="h-1 mt-2" />
            </div>

            <div className="bg-linear-to-br from-amber-500/10 to-amber-600/5 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Best Month</p>
                  <p className="text-xl font-bold">{bestMonth?.month}</p>
                </div>
                <TrendingUp className="size-8 text-amber-500/30" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {formatCurrency(bestMonth?.total || 0)}
              </p>
            </div>

            <div className="bg-linear-to-br from-purple-500/10 to-purple-600/5 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Growth Rate</p>
                  <p className="text-2xl font-bold text-emerald-600">+15.3%</p>
                </div>
                <Sparkles className="size-8 text-purple-500/30" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Year over Year
              </p>
            </div>
          </div>

          {/* View Controls */}
          <div className="flex items-center justify-between mt-4">
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
              <TabsList>
                <TabsTrigger value="actual" className="cursor-pointer">
                  Actual Values
                </TabsTrigger>
                <TabsTrigger value="percentage" className="cursor-pointer">
                  Market Share
                </TabsTrigger>
                <TabsTrigger value="comparison" className="cursor-pointer">
                  vs Target
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show/Hide:</span>
              {products.map((product) => (
                <Button
                  key={product}
                  variant="outline"
                  size="sm"
                  onClick={() => toggleColumn(product)}
                  className={cn(
                    "h-7 px-2 text-xs gap-1",
                    hiddenColumns.includes(product) && "opacity-50",
                  )}
                >
                  <span>{productNames[product].icon}</span>
                  <span>{productNames[product].name}</span>
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="relative overflow-hidden rounded-lg border">
            {/* Left Shadow */}
            {isScrolled && (
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
            )}

            {/* Right Shadow */}
            {isScrolledRight && (
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
            )}

            <div
              ref={tableRef}
              className="overflow-x-auto"
              style={{ maxHeight: "600px", overflowY: "auto" }}
            >
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    {/* Fixed first column */}
                    <TableHead className="sticky left-0 bg-muted min-w-37.5">
                      <div className="flex items-center gap-2">
                        <Calendar className="size-4" />
                        <span>Month</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 ml-auto"
                          onClick={() => {
                            setSortBy("month");
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                          }}
                        >
                          {sortBy === "month" && (
                            <span className="text-xs">
                              {sortOrder === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </Button>
                      </div>
                    </TableHead>

                    {/* Scrollable columns */}
                    {visibleProducts.map((product) => (
                      <TableHead
                        key={product}
                        className={cn(
                          "min-w-35",
                          `text-${productColors[product]}-600`,
                        )}
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-2">
                                <span>{productNames[product].icon}</span>
                                <span>{productNames[product].name}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Click to{" "}
                                {hiddenColumns.includes(product)
                                  ? "show"
                                  : "hide"}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableHead>
                    ))}

                    <TableHead className="min-w-35">
                      <div className="flex items-center gap-2">
                        <DollarSign className="size-4" />
                        <span>Total</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => {
                            setSortBy("total");
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                          }}
                        >
                          {sortBy === "total" && (
                            <span className="text-xs">
                              {sortOrder === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </Button>
                      </div>
                    </TableHead>

                    <TableHead className="min-w-30">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="size-4" />
                        <span>Growth</span>
                      </div>
                    </TableHead>

                    {showTargets && (
                      <TableHead className="min-w-35">
                        <div className="flex items-center gap-2">
                          <Target className="size-4" />
                          <span>Target</span>
                        </div>
                      </TableHead>
                    )}

                    <TableHead className="min-w-25">
                      <div className="flex items-center gap-2">
                        <PieChart className="size-4" />
                        <span>Share</span>
                      </div>
                    </TableHead>
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
                          className="group hover:bg-muted/50 transition-colors border-b last:border-0"
                        >
                          {/* Fixed first column */}
                          <TableCell className="sticky left-0 bg-background z-10 font-medium">
                            {data.month}
                          </TableCell>

                          {/* Scrollable columns */}
                          {visibleProducts.map((product) => {
                            const value = data[product];
                            const marketShare = getMarketShare(
                              value,
                              data.total,
                            );
                            const target = data.target
                              ? data.target * (value / data.total)
                              : value;
                            const isAboveTarget = value >= target;

                            return (
                              <TableCell key={product}>
                                {viewMode === "actual" && (
                                  <div>
                                    <div className="font-semibold">
                                      {formatCurrency(value)}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
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
                                {viewMode === "comparison" && showTargets && (
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
                                    <div className="text-xs text-muted-foreground">
                                      vs target
                                    </div>
                                  </div>
                                )}
                              </TableCell>
                            );
                          })}

                          <TableCell>
                            <div className="font-bold text-lg">
                              {formatCompactCurrency(data.total)}
                            </div>
                            {showTargets && data.target && (
                              <div className="text-xs text-muted-foreground">
                                vs {formatCompactCurrency(data.target)}
                              </div>
                            )}
                          </TableCell>

                          <TableCell>
                            <div
                              className={cn(
                                "flex items-center gap-1 font-semibold",
                                isPositive
                                  ? "text-emerald-600"
                                  : "text-rose-600",
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

                          {showTargets && (
                            <TableCell>
                              {data.target && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="space-y-1">
                                        <div className="font-medium">
                                          {formatCompactCurrency(data.target)}
                                        </div>
                                        <Progress
                                          value={
                                            (data.total / data.target) * 100
                                          }
                                          className={cn(
                                            "h-1 w-16",
                                            data.total / data.target >= 1
                                              ? "bg-emerald-500"
                                              : "bg-amber-500",
                                          )}
                                        />
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>
                                        Target: {formatCurrency(data.target)}
                                      </p>
                                      <p>
                                        Achieved:{" "}
                                        {(
                                          (data.total / data.target) *
                                          100
                                        ).toFixed(1)}
                                        %
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </TableCell>
                          )}

                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm font-medium">
                                {((data.total / totalYearSales) * 100).toFixed(
                                  1,
                                )}
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
                  <TableRow className="bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 font-semibold">
                    <TableCell className="sticky left-0 bg-background z-10">
                      Year Total
                    </TableCell>

                    {visibleProducts.map((product) => {
                      const total = salesData.reduce(
                        (sum, data) => sum + data[product],
                        0,
                      );
                      return (
                        <TableCell key={product} className="font-bold">
                          {formatCompactCurrency(total)}
                        </TableCell>
                      );
                    })}

                    <TableCell className="text-lg font-bold">
                      {formatCompactCurrency(totalYearSales)}
                    </TableCell>

                    <TableCell>
                      <div className="text-emerald-600">
                        +
                        {getGrowth(
                          salesData[salesData.length - 1].total,
                          salesData[0].total,
                        ).toFixed(1)}
                        %
                      </div>
                    </TableCell>

                    {showTargets && (
                      <TableCell>
                        {formatCompactCurrency(
                          salesData.reduce(
                            (sum, data) => sum + (data.target || 0),
                            0,
                          ),
                        )}
                      </TableCell>
                    )}

                    <TableCell>
                      <div className="text-sm font-medium">100%</div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-6 text-sm">
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>Above Target</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span>Near Target</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <span>Below Target</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronLeft className="size-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronRight className="size-4" />
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="size-4" />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

function Target(props: LucideProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
