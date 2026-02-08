"use client";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Package,
  Truck,
} from "lucide-react";

export default function CustomTable1_3() {
  const orders = [
    {
      id: 1,
      orderId: "ORD-001",
      customer: "John Smith",
      status: "Delivered",
      date: "2024-01-15",
      amount: 249.99,
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      id: 2,
      orderId: "ORD-002",
      customer: "Emma Wilson",
      status: "Shipped",
      date: "2024-01-16",
      amount: 149.99,
      icon: Truck,
      color: "text-blue-500",
    },
    {
      id: 3,
      orderId: "ORD-003",
      customer: "Robert Brown",
      status: "Processing",
      date: "2024-01-16",
      amount: 89.99,
      icon: Package,
      color: "text-yellow-500",
    },
    {
      id: 4,
      orderId: "ORD-004",
      customer: "Sarah Johnson",
      status: "Pending",
      date: "2024-01-17",
      amount: 199.99,
      icon: Clock,
      color: "text-gray-500",
    },
    {
      id: 5,
      orderId: "ORD-005",
      customer: "Michael Lee",
      status: "Cancelled",
      date: "2024-01-17",
      amount: 79.99,
      icon: AlertCircle,
      color: "text-red-500",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Pending":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
      case "Cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Order Timeline
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Recent orders and their status
          </p>
        </div>

        {/* Timeline Table */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800"></div>

          {/* Orders */}
          <div className="space-y-8">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-start gap-6"
              >
                {/* Timeline Dot */}
                <div className="relative z-10 shrink-0">
                  <div
                    className={`w-12 h-12 rounded-full ${order.color.replace(
                      "text",
                      "bg"
                    )} bg-opacity-20 flex items-center justify-center`}
                  >
                    <order.icon className={`w-6 h-6 ${order.color}`} />
                  </div>
                </div>

                {/* Order Card */}
                <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {order.orderId}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        Customer: {order.customer}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Date: {order.date}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${order.amount.toFixed(2)}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Amount
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>Order Progress</span>
                      <span>
                        {[
                          "Pending",
                          "Processing",
                          "Shipped",
                          "Delivered",
                        ].indexOf(order.status) + 1}
                        /4
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          order.status === "Delivered"
                            ? "bg-green-500"
                            : order.status === "Shipped"
                            ? "bg-blue-500"
                            : order.status === "Processing"
                            ? "bg-yellow-500"
                            : "bg-gray-400"
                        }`}
                        style={{
                          width: `${
                            ([
                              "Pending",
                              "Processing",
                              "Shipped",
                              "Delivered",
                            ].indexOf(order.status) +
                              1) *
                            25
                          }%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                      <span>Ordered</span>
                      <span>Processing</span>
                      <span>Shipped</span>
                      <span>Delivered</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 p-4 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              2
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Completed
            </div>
          </div>
          <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 p-4 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              1
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Shipped
            </div>
          </div>
          <div className="bg-linear-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/10 p-4 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              1
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Processing
            </div>
          </div>
          <div className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 p-4 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              1
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Pending
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
