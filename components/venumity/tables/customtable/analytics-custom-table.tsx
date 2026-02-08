"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Eye,
  ChevronRight,
} from "lucide-react";

export default function CustomTable1_5() {
  const [timeRange, setTimeRange] = useState("weekly");

  const metrics = [
    {
      id: 1,
      name: "Total Revenue",
      value: "$24,580",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      id: 2,
      name: "Total Orders",
      value: "1,248",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "bg-blue-500",
    },
    {
      id: 3,
      name: "Visitors",
      value: "12,458",
      change: "-3.1%",
      trend: "down",
      icon: Eye,
      color: "bg-purple-500",
    },
    {
      id: 4,
      name: "Conversion Rate",
      value: "3.2%",
      change: "+1.8%",
      trend: "up",
      icon: Users,
      color: "bg-amber-500",
    },
  ];

  const topProducts = [
    {
      id: 1,
      name: "Premium Headphones",
      category: "Electronics",
      sales: 245,
      revenue: 48990,
      growth: 25,
    },
    {
      id: 2,
      name: "Wireless Mouse",
      category: "Accessories",
      sales: 189,
      revenue: 9450,
      growth: 18,
    },
    {
      id: 3,
      name: "Smart Watch",
      category: "Wearables",
      sales: 156,
      revenue: 93600,
      growth: 32,
    },
    {
      id: 4,
      name: "Laptop Stand",
      category: "Office",
      sales: 132,
      revenue: 10560,
      growth: 12,
    },
    {
      id: 5,
      name: "Phone Case",
      category: "Accessories",
      sales: 98,
      revenue: 2940,
      growth: -5,
    },
  ];

  const timeRanges = [
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
    { id: "yearly", label: "Yearly" },
  ];

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Analytics Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Overview of your business performance
            </p>
          </div>

          <div className="flex items-center gap-2">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  timeRange === range.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {metric.name}
                  </p>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    {metric.value}
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${metric.color} bg-opacity-10`}>
                  <metric.icon
                    className={`w-6 h-6 ${metric.color.replace(
                      "bg-",
                      "text-"
                    )}`}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                {metric.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span
                  className={`text-sm font-medium ${
                    metric.trend === "up"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {metric.change}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  from last period
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Top Products Table */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Top Products
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Best performing products this month
              </p>
            </div>
            <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Product
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Sales
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Revenue
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Growth
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300"></th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-white dark:hover:bg-gray-900/50 transition"
                  >
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-600 dark:text-gray-400">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {product.sales}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-gray-900 dark:text-white">
                        ${product.revenue.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div
                        className={`flex items-center gap-2 ${
                          product.growth >= 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {product.growth >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span className="font-medium">
                          {Math.abs(product.growth)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="mt-8 bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Revenue Trend
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Monthly revenue performance
              </p>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              $24,580
            </div>
          </div>

          <div className="h-48 flex items-end gap-2">
            {[40, 60, 80, 65, 75, 90, 85, 95].map((height, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="flex-1 bg-linear-to-t from-blue-500 to-cyan-400 rounded-t-lg"
              />
            ))}
          </div>

          <div className="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map(
              (month) => (
                <span key={month}>{month}</span>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
