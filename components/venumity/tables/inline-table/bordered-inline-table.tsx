"use client";
import { motion } from "framer-motion";
import { Check, X, Clock } from "lucide-react";

const orders = [
  {
    id: 1,
    product: "Laptop Pro",
    customer: "John Smith",
    amount: "$1299",
    status: "Delivered",
    date: "2024-01-15",
  },
  {
    id: 2,
    product: "Wireless Mouse",
    customer: "Alice Brown",
    amount: "$49",
    status: "Processing",
    date: "2024-01-16",
  },
  {
    id: 3,
    product: "Mechanical Keyboard",
    customer: "Bob Johnson",
    amount: "$89",
    status: "Cancelled",
    date: "2024-01-14",
  },
  {
    id: 4,
    product: "Monitor 4K",
    customer: "Charlie Wilson",
    amount: "$499",
    status: "Delivered",
    date: "2024-01-13",
  },
  {
    id: 5,
    product: "Webcam HD",
    customer: "Diana Evans",
    amount: "$79",
    status: "Pending",
    date: "2024-01-17",
  },
];

export default function BorderedInlineTable() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-10 p-6 sm:p-10 md:py-14 max-w-7xl w-full h-full"
    >
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Bordered Inline Table
        </h2>
        <div className="overflow-x-auto rounded-lg border-2 border-gray-300 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 border-r border-gray-300 dark:border-gray-700">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 border-r border-gray-300 dark:border-gray-700">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 border-r border-gray-300 dark:border-gray-700">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 border-r border-gray-300 dark:border-gray-700">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-black divide-y divide-gray-300 dark:divide-gray-700">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 border-r border-gray-300 dark:border-gray-700">
                    {order.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 border-r border-gray-300 dark:border-gray-700">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100 border-r border-gray-300 dark:border-gray-700">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300 dark:border-gray-700">
                    <div className="flex items-center">
                      {order.status === "Delivered" && (
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                      )}
                      {order.status === "Processing" && (
                        <Clock className="w-4 h-4 text-blue-500 mr-2" />
                      )}
                      {order.status === "Cancelled" && (
                        <X className="w-4 h-4 text-red-500 mr-2" />
                      )}
                      {order.status === "Pending" && (
                        <Clock className="w-4 h-4 text-yellow-500 mr-2" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          order.status === "Delivered"
                            ? "text-green-700 dark:text-green-400"
                            : order.status === "Processing"
                            ? "text-blue-700 dark:text-blue-400"
                            : order.status === "Cancelled"
                            ? "text-red-700 dark:text-red-400"
                            : "text-yellow-700 dark:text-yellow-400"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {order.date}
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
