"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react";

interface SortIconProps {
  column: "name" | "price" | "stock";
  sortBy: "name" | "price" | "stock" | null;
  sortDirection: "asc" | "desc";
}

const SortIcon = ({ column, sortBy, sortDirection }: SortIconProps) => {
  if (sortBy !== column) return <ChevronDown className="w-4 h-4 opacity-0" />;
  return sortDirection === "asc" ? (
    <ChevronUp className="w-4 h-4" />
  ) : (
    <ChevronDown className="w-4 h-4" />
  );
};

export default function DataGrid2_2() {
  const [sortBy, setSortBy] = useState<"name" | "price" | "stock" | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const products = [
    {
      id: 1,
      name: "iPhone 14 Pro",
      category: "Electronics",
      price: 999,
      stock: 45,
      sales: 120,
    },
    {
      id: 2,
      name: "MacBook Air",
      category: "Computers",
      price: 1199,
      stock: 23,
      sales: 89,
    },
    {
      id: 3,
      name: "AirPods Pro",
      category: "Audio",
      price: 249,
      stock: 156,
      sales: 234,
    },
    {
      id: 4,
      name: "iPad Air",
      category: "Tablets",
      price: 599,
      stock: 34,
      sales: 67,
    },
    {
      id: 5,
      name: "Apple Watch",
      category: "Wearables",
      price: 399,
      stock: 89,
      sales: 145,
    },
    {
      id: 6,
      name: "Magic Keyboard",
      category: "Accessories",
      price: 299,
      stock: 56,
      sales: 78,
    },
  ];

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortBy) return 0;

    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (column: "name" | "price" | "stock") => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Products Inventory
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your product catalog
          </p>
        </div>

        {/* Compact Data Grid */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Product
                </th>
                <th
                  className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => handleSort("price")}
                >
                  <div className="flex items-center gap-1">
                    Price
                    <SortIcon
                      column="price"
                      sortBy={sortBy}
                      sortDirection={sortDirection}
                    />
                  </div>
                </th>
                <th
                  className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => handleSort("stock")}
                >
                  <div className="flex items-center gap-1">
                    Stock
                    <SortIcon
                      column="stock"
                      sortBy={sortBy}
                      sortDirection={sortDirection}
                    />
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sales
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300"></th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                >
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {product.category}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-gray-900 dark:text-white">
                      ${product.price}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {product.stock}
                      </div>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          product.stock > 50
                            ? "bg-green-500"
                            : product.stock > 20
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-gray-900 dark:text-white">
                      {product.sales}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div
                      className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${
                        product.stock > 50
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : product.stock > 20
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {product.stock > 50
                        ? "In Stock"
                        : product.stock > 20
                        ? "Low Stock"
                        : "Restock"}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                      <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                6
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Products
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                $3,744
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Value
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                403
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                In Stock
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                733
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Sales
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
