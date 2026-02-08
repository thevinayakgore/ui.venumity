"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Grid,
  List,
  Filter,
  Download,
  RefreshCw,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react";

const productData = [
  {
    id: 1,
    name: "Premium Laptop",
    category: "Electronics",
    price: "$1,299.99",
    stock: 45,
    sales: 128,
    revenue: "$166,399",
    rating: 4.8,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    category: "Audio",
    price: "$249.99",
    stock: 156,
    sales: 425,
    revenue: "$106,246",
    rating: 4.5,
    status: "In Stock",
  },
  {
    id: 3,
    name: "Smart Watch Pro",
    category: "Wearables",
    price: "$399.99",
    stock: 89,
    sales: 210,
    revenue: "$83,998",
    rating: 4.7,
    status: "Low Stock",
  },
  {
    id: 4,
    name: "4K Monitor",
    category: "Electronics",
    price: "$599.99",
    stock: 23,
    sales: 78,
    revenue: "$46,799",
    rating: 4.6,
    status: "Low Stock",
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    category: "Accessories",
    price: "$129.99",
    stock: 210,
    sales: 342,
    revenue: "$44,456",
    rating: 4.4,
    status: "In Stock",
  },
  {
    id: 6,
    name: "Gaming Mouse",
    category: "Gaming",
    price: "$89.99",
    stock: 187,
    sales: 512,
    revenue: "$46,075",
    rating: 4.3,
    status: "In Stock",
  },
  {
    id: 7,
    name: "USB-C Hub",
    category: "Accessories",
    price: "$49.99",
    stock: 0,
    sales: 289,
    revenue: "$14,447",
    rating: 4.2,
    status: "Out of Stock",
  },
  {
    id: 8,
    name: "Portable Speaker",
    category: "Audio",
    price: "$179.99",
    stock: 67,
    sales: 156,
    revenue: "$28,078",
    rating: 4.6,
    status: "In Stock",
  },
];

export default function DataGridTable() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    "all",
    ...Array.from(new Set(productData.map((p) => p.category))),
  ];

  const filteredData =
    selectedCategory === "all"
      ? productData
      : productData.filter((p) => p.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Out of Stock":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStockColor = (stock: number) => {
    if (stock === 0) return "bg-red-500";
    if (stock < 50) return "bg-yellow-500";
    return "bg-green-500";
  };

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
                Product Inventory
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
                Manage your product catalog with multiple view options
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>

              <button className="flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:opacity-90 transition-opacity">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  Total Products
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {filteredData.length}
                </div>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  Total Revenue
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  $
                  {filteredData
                    .reduce(
                      (acc, p) =>
                        acc +
                        parseFloat(p.revenue.replace("$", "").replace(",", "")),
                      0
                    )
                    .toLocaleString()}
                </div>
              </div>
              <LineChart className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  Avg. Rating
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {(
                    filteredData.reduce((acc, p) => acc + p.rating, 0) /
                    filteredData.length
                  ).toFixed(1)}
                </div>
              </div>
              <PieChart className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>

          <div className="bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  In Stock
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {filteredData.filter((p) => p.status === "In Stock").length}
                </div>
              </div>
              <RefreshCw className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center`}
                    >
                      <span className="text-white font-bold text-lg">
                        {product.name.charAt(0)}
                      </span>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        product.status
                      )}`}
                    >
                      {product.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {product.name}
                  </h3>

                  <div className="mb-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {product.price}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Price
                      </div>
                    </div>

                    <div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {product.sales}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Sales
                      </div>
                    </div>
                  </div>

                  {/* Stock Indicator */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">
                        Stock Level
                      </span>
                      <span className="font-medium">{product.stock} units</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getStockColor(
                          product.stock
                        )}`}
                        style={{
                          width: `${Math.min(
                            (product.stock / 200) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-500"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                        {product.rating}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {product.revenue}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-linear-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Sales
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {filteredData.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                            <span className="text-white font-bold text-sm">
                              {product.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                              {product.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Rating: {product.rating}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          {product.price}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 dark:bg-gray-800 rounded-full h-2 mr-3">
                            <div
                              className={`h-2 rounded-full ${getStockColor(
                                product.stock
                              )}`}
                              style={{
                                width: `${Math.min(
                                  (product.stock / 200) * 100,
                                  100
                                )}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {product.stock}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          {product.sales}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          {product.revenue}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            product.status
                          )}`}
                        >
                          {product.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div>
            Showing {filteredData.length} of {productData.length} products
            {selectedCategory !== "all" &&
              ` • Filtered by: ${selectedCategory}`}
          </div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span>In Stock</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
              <span>Low Stock</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
              <span>Out of Stock</span>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
