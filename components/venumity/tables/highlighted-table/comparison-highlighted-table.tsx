"use client";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Star } from "lucide-react";

export default function HighlightedTable5_2() {
  const companies = [
    {
      id: 1,
      name: "TechCorp Inc.",
      symbol: "TECH",
      price: 245.67,
      change: 12.45,
      changePercent: 5.3,
      volume: "2.4M",
      marketCap: "48.2B",
      rating: 4.5,
    },
    {
      id: 2,
      name: "CloudSystems",
      symbol: "CLD",
      price: 189.32,
      change: -8.21,
      changePercent: -4.2,
      volume: "1.8M",
      marketCap: "32.7B",
      rating: 4.2,
    },
    {
      id: 3,
      name: "DataFlow",
      symbol: "DATA",
      price: 312.45,
      change: 24.89,
      changePercent: 8.7,
      volume: "3.2M",
      marketCap: "67.5B",
      rating: 4.8,
    },
    {
      id: 4,
      name: "NetSecure",
      symbol: "NETS",
      price: 156.78,
      change: 3.45,
      changePercent: 2.2,
      volume: "1.2M",
      marketCap: "25.3B",
      rating: 3.9,
    },
    {
      id: 5,
      name: "AI Ventures",
      symbol: "AIV",
      price: 421.99,
      change: -15.67,
      changePercent: -3.6,
      volume: "2.1M",
      marketCap: "89.4B",
      rating: 4.7,
    },
  ];

  const getChangeColor = (change: number) => {
    return change >= 0
      ? "text-green-600 dark:text-green-400"
      : "text-red-600 dark:text-red-400";
  };

  const getChangeBg = (change: number) => {
    return change >= 0
      ? "bg-green-100 dark:bg-green-900/30"
      : "bg-red-100 dark:bg-red-900/30";
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />;
    if (change < 0) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Market Watch
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Real-time stock performance
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                NASDAQ
              </div>
              <div className="text-green-600 dark:text-green-400 font-medium">
                +2.4% Today
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Company
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Price
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Change
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Volume
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Market Cap
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <motion.tr
                  key={company.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition ${
                    company.change > 10
                      ? "bg-linear-to-r from-green-50 to-transparent dark:from-green-900/10"
                      : company.change < -10
                      ? "bg-linear-to-r from-red-50 to-transparent dark:from-red-900/10"
                      : ""
                  }`}
                >
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        {company.symbol}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {company.name}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${company.price.toFixed(2)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg ${getChangeBg(
                        company.change
                      )}`}
                    >
                      {getTrendIcon(company.change)}
                      <div>
                        <div
                          className={`font-bold ${getChangeColor(
                            company.change
                          )}`}
                        >
                          ${Math.abs(company.change).toFixed(2)}
                        </div>
                        <div
                          className={`text-sm ${getChangeColor(
                            company.change
                          )}`}
                        >
                          {company.change >= 0 ? "+" : ""}
                          {company.changePercent.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900 dark:text-white font-medium">
                      {company.volume}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900 dark:text-white">
                      {company.marketCap}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(company.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300 dark:text-gray-700"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {company.rating}
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 p-4 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  3
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Gaining Stocks
              </div>
            </div>
            <div className="bg-linear-to-r from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10 p-4 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  2
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Declining Stocks
              </div>
            </div>
            <div className="bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 p-4 rounded-xl">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                $1.33B
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Volume
              </div>
            </div>
            <div className="bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-4 rounded-xl">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                $263.2B
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Market Cap
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
