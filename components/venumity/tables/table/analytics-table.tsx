"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointer,
  Clock,
  Download,
  Calendar,
  BarChart3,
} from "lucide-react";

const analyticsData = [
  {
    id: 1,
    source: "Organic Search",
    visits: 12450,
    change: "+12.5%",
    trend: "up",
    bounceRate: "32.4%",
    avgDuration: "3m 45s",
    conversion: "2.8%",
    revenue: "$12,450",
  },
  {
    id: 2,
    source: "Direct Traffic",
    visits: 8560,
    change: "+8.2%",
    trend: "up",
    bounceRate: "28.7%",
    avgDuration: "4m 12s",
    conversion: "3.2%",
    revenue: "$9,850",
  },
  {
    id: 3,
    source: "Social Media",
    visits: 6720,
    change: "+15.3%",
    trend: "up",
    bounceRate: "45.2%",
    avgDuration: "2m 56s",
    conversion: "1.8%",
    revenue: "$6,240",
  },
  {
    id: 4,
    source: "Email Campaign",
    visits: 4230,
    change: "-3.4%",
    trend: "down",
    bounceRate: "22.8%",
    avgDuration: "5m 34s",
    conversion: "4.5%",
    revenue: "$8,960",
  },
  {
    id: 5,
    source: "Referral",
    visits: 3120,
    change: "+5.7%",
    trend: "up",
    bounceRate: "38.9%",
    avgDuration: "3m 18s",
    conversion: "2.3%",
    revenue: "$4,280",
  },
  {
    id: 6,
    source: "Paid Ads",
    visits: 5890,
    change: "-2.1%",
    trend: "down",
    bounceRate: "41.5%",
    avgDuration: "2m 45s",
    conversion: "1.5%",
    revenue: "$5,670",
  },
  {
    id: 7,
    source: "Affiliate",
    visits: 2340,
    change: "+18.4%",
    trend: "up",
    bounceRate: "29.3%",
    avgDuration: "4m 56s",
    conversion: "3.8%",
    revenue: "$7,120",
  },
  {
    id: 8,
    source: "Other",
    visits: 1560,
    change: "+1.2%",
    trend: "up",
    bounceRate: "51.8%",
    avgDuration: "2m 12s",
    conversion: "0.8%",
    revenue: "$1,240",
  },
];

export default function AnalyticsTable() {
  const [timeRange, setTimeRange] = useState("30d");
  const [sortBy, setSortBy] = useState("visits");

  const sortedData = [...analyticsData].sort((a, b) => {
    if (sortBy === "visits") return b.visits - a.visits;
    if (sortBy === "revenue") {
      const aRev = parseFloat(a.revenue.replace("$", "").replace(",", ""));
      const bRev = parseFloat(b.revenue.replace("$", "").replace(",", ""));
      return bRev - aRev;
    }
    if (sortBy === "conversion") {
      const aConv = parseFloat(a.conversion.replace("%", ""));
      const bConv = parseFloat(b.conversion.replace("%", ""));
      return bConv - aConv;
    }
    return 0;
  });

  const totalVisits = sortedData.reduce((acc, item) => acc + item.visits, 0);
  const totalRevenue = sortedData.reduce(
    (acc, item) =>
      acc + parseFloat(item.revenue.replace("$", "").replace(",", "")),
    0
  );

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Traffic Analytics
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
                Detailed breakdown of traffic sources and performance metrics
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                {["7d", "30d", "90d", "1y"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      timeRange === range
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>

              <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:opacity-90 transition-opacity">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Total Visits
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalVisits.toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-linear-to-br from-blue-500 to-cyan-600">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center text-sm text-green-600 dark:text-green-400">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span>+12.4% from last {timeRange}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Total Revenue
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${totalRevenue.toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-linear-to-br from-green-500 to-emerald-600">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center text-sm text-green-600 dark:text-green-400">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span>+8.7% from last {timeRange}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Avg. Conversion
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  2.7%
                </div>
              </div>
              <div className="p-3 rounded-xl bg-linear-to-br from-purple-500 to-pink-600">
                <MousePointer className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center text-sm text-green-600 dark:text-green-400">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span>+0.3% from last {timeRange}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Avg. Duration
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  3m 42s
                </div>
              </div>
              <div className="p-3 rounded-xl bg-linear-to-br from-orange-500 to-yellow-600">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center text-sm text-red-600 dark:text-red-400">
              <TrendingDown className="w-4 h-4 mr-2" />
              <span>-0.2% from last {timeRange}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Traffic Sources
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Performance metrics by source
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Sort by:
                </div>
                <div className="flex border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setSortBy("visits")}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      sortBy === "visits"
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    Visits
                  </button>
                  <button
                    onClick={() => setSortBy("revenue")}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      sortBy === "revenue"
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    Revenue
                  </button>
                  <button
                    onClick={() => setSortBy("conversion")}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      sortBy === "conversion"
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    Conversion
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-linear-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Traffic Source
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Visits
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Change
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Bounce Rate
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Avg. Duration
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Conversion
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {sortedData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                          <span className="text-white font-bold text-sm">
                            {item.source.charAt(0)}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {item.source}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {item.visits.toLocaleString()}
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 mt-2">
                        <div
                          className="h-2 rounded-full bg-linear-to-r from-blue-500 to-cyan-600"
                          style={{
                            width: `${(item.visits / totalVisits) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`flex items-center text-sm font-semibold ${
                          item.trend === "up"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {item.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 mr-2" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-2" />
                        )}
                        {item.change}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.bounceRate}
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 mt-2">
                        <div
                          className={`h-2 rounded-full ${
                            parseFloat(item.bounceRate) < 30
                              ? "bg-green-500"
                              : parseFloat(item.bounceRate) < 40
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: item.bounceRate }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4 mr-2" />
                        {item.avgDuration}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {item.conversion}
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 mt-2">
                        <div
                          className="h-2 rounded-full bg-linear-to-r from-purple-500 to-pink-600"
                          style={{ width: item.conversion }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {item.revenue}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Data for the last {timeRange} • Updated in real-time</span>
          </div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span>Positive trend</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
              <span>Negative trend</span>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
