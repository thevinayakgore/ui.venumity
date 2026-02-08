"use client";
import { motion } from "framer-motion";
import { Star, TrendingUp, TrendingDown, Minus } from "lucide-react";

const stocks = [
  {
    id: 1,
    symbol: "AAPL",
    name: "Apple Inc.",
    price: "$185.64",
    change: "+2.5%",
    volume: "45.2M",
    rating: 5,
  },
  {
    id: 2,
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: "$142.38",
    change: "-1.2%",
    volume: "28.7M",
    rating: 4,
  },
  {
    id: 3,
    symbol: "MSFT",
    name: "Microsoft",
    price: "$389.47",
    change: "+3.8%",
    volume: "32.1M",
    rating: 5,
  },
  {
    id: 4,
    symbol: "AMZN",
    name: "Amazon",
    price: "$155.20",
    change: "+0.8%",
    volume: "52.3M",
    rating: 3,
  },
  {
    id: 5,
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: "$218.89",
    change: "-4.2%",
    volume: "112.5M",
    rating: 2,
  },
];

export default function StripedInlineTable() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-10 p-6 sm:p-10 md:py-14 max-w-7xl w-full h-full"
    >
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Striped Inline Table
        </h2>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-800 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Symbol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Volume
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-black divide-y divide-gray-200 dark:divide-gray-800">
              {stocks.map((stock, index) => (
                <tr
                  key={stock.id}
                  className={
                    index % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-900/50"
                      : "bg-white dark:bg-black"
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-gray-900 dark:text-gray-100">
                      {stock.symbol}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {stock.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {stock.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {stock.change.startsWith("+") ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : stock.change.startsWith("-") ? (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      ) : (
                        <Minus className="w-4 h-4 text-gray-500 mr-1" />
                      )}
                      <span
                        className={`font-medium ${
                          stock.change.startsWith("+")
                            ? "text-green-700 dark:text-green-400"
                            : stock.change.startsWith("-")
                            ? "text-red-700 dark:text-red-400"
                            : "text-gray-700 dark:text-gray-400"
                        }`}
                      >
                        {stock.change}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {stock.volume}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < stock.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.main>
  );
}
