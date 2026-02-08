"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Globe,
  ChevronRight,
} from "lucide-react";

export default function DataGrid2_5() {
  const [selectedMetric, setSelectedMetric] = useState<string>("revenue");

  const metrics = [
    {
      id: "revenue",
      name: "Revenue",
      value: "$24,580",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      id: "orders",
      name: "Orders",
      value: "1,248",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      id: "customers",
      name: "Customers",
      value: "5,642",
      change: "+15.3%",
      trend: "up",
      icon: Users,
    },
    {
      id: "conversion",
      name: "Conversion",
      value: "3.2%",
      change: "+1.8%",
      trend: "up",
      icon: TrendingUp,
    },
  ];

  const countries = [
    {
      country: "United States",
      visitors: 12458,
      sales: 24580,
      growth: 12.5,
      flag: "🇺🇸",
    },
    {
      country: "Germany",
      visitors: 8567,
      sales: 18900,
      growth: 8.2,
      flag: "🇩🇪",
    },
    {
      country: "United Kingdom",
      visitors: 7321,
      sales: 15670,
      growth: -3.1,
      flag: "🇬🇧",
    },
    {
      country: "France",
      visitors: 6543,
      sales: 14320,
      growth: 5.7,
      flag: "🇫🇷",
    },
    {
      country: "Canada",
      visitors: 5432,
      sales: 12890,
      growth: 9.4,
      flag: "🇨🇦",
    },
    {
      country: "Australia",
      visitors: 4321,
      sales: 9870,
      growth: 7.8,
      flag: "🇦🇺",
    },
    { country: "Japan", visitors: 3987, sales: 8765, growth: 11.2, flag: "🇯🇵" },
    {
      country: "Brazil",
      visitors: 3210,
      sales: 7654,
      growth: -2.3,
      flag: "🇧🇷",
    },
  ];

  const devices = [
    {
      device: "Desktop",
      visitors: 12458,
      percentage: 65,
      color: "bg-blue-500",
    },
    { device: "Mobile", visitors: 8567, percentage: 25, color: "bg-green-500" },
    {
      device: "Tablet",
      visitors: 7321,
      percentage: 10,
      color: "bg-purple-500",
    },
  ];

  const getMetricData = () => {
    switch (selectedMetric) {
      case "revenue":
        return countries.map((c) => ({ label: c.country, value: c.sales }));
      case "orders":
        return countries.map((c) => ({
          label: c.country,
          value: c.visitors * 0.1,
        }));
      case "customers":
        return countries.map((c) => ({ label: c.country, value: c.visitors }));
      default:
        return countries.map((c) => ({ label: c.country, value: c.sales }));
    }
  };

  const metricData = getMetricData();

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Performance metrics across regions
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => (
            <motion.button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              whileHover={{ y: -4 }}
              className={`bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-left transition ${
                selectedMetric === metric.id ? "ring-2 ring-blue-500" : ""
              }`}
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
                <div
                  className={`p-3 rounded-lg ${
                    metric.trend === "up"
                      ? "bg-green-100 dark:bg-green-900/30"
                      : "bg-red-100 dark:bg-red-900/30"
                  }`}
                >
                  <metric.icon
                    className={`w-6 h-6 ${
                      metric.trend === "up"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
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
                  from last month
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Countries Table */}
          <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-gray-900 dark:text-white" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Top Countries
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    By revenue and traffic
                  </p>
                </div>
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
                      Country
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Visitors
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Sales
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Growth
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300"></th>
                  </tr>
                </thead>
                <tbody>
                  {countries.map((item, index) => (
                    <motion.tr
                      key={item.country}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-white dark:hover:bg-gray-900/50 transition"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.flag}</span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {item.country}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-gray-900 dark:text-white">
                          {item.visitors.toLocaleString()}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-gray-900 dark:text-white">
                          ${item.sales.toLocaleString()}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div
                          className={`flex items-center gap-2 ${
                            item.growth >= 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {item.growth >= 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span className="font-medium">
                            {Math.abs(item.growth)}%
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

          {/* Devices Breakdown */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Devices
            </h3>

            <div className="space-y-6">
              {devices.map((device, index) => (
                <motion.div
                  key={device.device}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${device.color}`} />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {device.device}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900 dark:text-white">
                        {device.percentage}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {device.visitors.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${device.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className={`h-full rounded-full ${device.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mini Chart */}
            <div className="mt-8">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                Metric Trend
              </h4>
              <div className="h-32 flex items-end gap-1">
                {metricData.map((item, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{
                        height: `${
                          (item.value /
                            Math.max(...metricData.map((d) => d.value))) *
                          100
                        }%`,
                      }}
                      transition={{ duration: 1, delay: index * 0.05 }}
                      className="w-full bg-linear-to-t from-blue-500 to-cyan-400 rounded-t-lg"
                    />
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                      {item.label.slice(0, 3)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 p-4 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              8
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Top Countries
            </div>
          </div>
          <div className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 p-4 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              28,319
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Visitors
            </div>
          </div>
          <div className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-4 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              $113,359
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Revenue
            </div>
          </div>
          <div className="bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 p-4 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              +8.5%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Avg Growth
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
