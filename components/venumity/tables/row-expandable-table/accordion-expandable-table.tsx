"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ChevronDown,
  Package,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const orderData = [
  {
    id: "ORD-001",
    customer: "John Smith",
    date: "2024-01-15",
    amount: "$1,299.99",
    status: "Delivered",
    items: [
      { name: 'MacBook Pro 16"', quantity: 1, price: "$1,199.99" },
      { name: "USB-C Hub", quantity: 1, price: "$99.99" },
    ],
    shipping: {
      method: "Express",
      tracking: "1Z999AA1234567890",
      address: "123 Main St, New York, NY 10001",
    },
  },
  {
    id: "ORD-002",
    customer: "Emma Wilson",
    date: "2024-01-16",
    amount: "$467.50",
    status: "Processing",
    items: [
      { name: "Wireless Headphones", quantity: 2, price: "$199.99" },
      { name: "Phone Case", quantity: 1, price: "$29.99" },
      { name: "Screen Protector", quantity: 1, price: "$17.99" },
    ],
    shipping: {
      method: "Standard",
      tracking: "UPS-789012345678",
      address: "456 Oak Ave, Chicago, IL 60601",
    },
  },
  {
    id: "ORD-003",
    customer: "Michael Chen",
    date: "2024-01-14",
    amount: "$89.99",
    status: "Cancelled",
    items: [
      { name: "USB Cable Pack", quantity: 1, price: "$29.99" },
      { name: "Wireless Mouse", quantity: 1, price: "$59.99" },
    ],
    shipping: {
      method: "N/A",
      tracking: "N/A",
      address: "789 Pine St, Austin, TX 73301",
    },
  },
  {
    id: "ORD-004",
    customer: "Sarah Johnson",
    date: "2024-01-17",
    amount: "$2,345.67",
    status: "Shipped",
    items: [
      { name: "Gaming Monitor", quantity: 1, price: "$899.99" },
      { name: "Gaming Keyboard", quantity: 1, price: "$129.99" },
      { name: "Gaming Mouse", quantity: 1, price: "$79.99" },
      { name: "Mouse Pad", quantity: 1, price: "$24.99" },
    ],
    shipping: {
      method: "Express",
      tracking: "FEDEX-123456789012",
      address: "321 Elm St, San Francisco, CA 94102",
    },
  },
  {
    id: "ORD-005",
    customer: "David Brown",
    date: "2024-01-13",
    amount: "$567.89",
    status: "Pending",
    items: [
      { name: "Smart Watch", quantity: 1, price: "$299.99" },
      { name: "Charging Dock", quantity: 1, price: "$49.99" },
      { name: "Protective Case", quantity: 1, price: "$29.99" },
    ],
    shipping: {
      method: "Standard",
      tracking: "USPS-987654321098",
      address: "654 Maple Dr, Miami, FL 33101",
    },
  },
];

export default function AccordionExpandableTable() {
  const [expandedRows, setExpandedRows] = useState<string[]>(["ORD-001"]);

  const toggleRow = (id: string) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "Shipped":
        return <Package className="w-4 h-4 text-blue-500" />;
      case "Processing":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "Pending":
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case "Cancelled":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Order Management
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Expand orders to view items and shipping details
          </p>
        </div>

        <div className="space-y-3">
          {orderData.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <button
                onClick={() => toggleRow(order.id)}
                className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300"
              >
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Order ID
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {order.id}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Customer
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {order.customer}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Date & Amount
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 mr-4">
                        {order.date}
                      </span>
                      <DollarSign className="w-3 h-3 text-gray-400 mr-2" />
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {order.amount}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Status
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                      <span
                        className={`ml-2 text-sm font-medium ${
                          order.status === "Delivered"
                            ? "text-green-600 dark:text-green-400"
                            : order.status === "Shipped"
                            ? "text-blue-600 dark:text-blue-400"
                            : order.status === "Processing"
                            ? "text-yellow-600 dark:text-yellow-400"
                            : order.status === "Pending"
                            ? "text-orange-600 dark:text-orange-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{
                    rotate: expandedRows.includes(order.id) ? 180 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="ml-4 shrink-0 text-gray-400"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedRows.includes(order.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200 dark:border-gray-800"
                  >
                    <div className="p-4 sm:p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Order Items */}
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                          <div className="flex items-center mb-4">
                            <Package className="w-5 h-5 text-gray-400 mr-2" />
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                              Order Items
                            </h3>
                          </div>
                          <div className="space-y-3">
                            {order.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg"
                              >
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {item.name}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Quantity: {item.quantity}
                                  </div>
                                </div>
                                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                  {item.price}
                                </div>
                              </div>
                            ))}
                            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
                              <div className="text-sm font-bold text-gray-900 dark:text-white">
                                Total
                              </div>
                              <div className="text-lg font-bold text-gray-900 dark:text-white">
                                {order.amount}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Shipping Information */}
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                          <div className="flex items-center mb-4">
                            <TrendingUp className="w-5 h-5 text-gray-400 mr-2" />
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                              Shipping Details
                            </h3>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Shipping Method
                              </div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {order.shipping.method}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Tracking Number
                              </div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {order.shipping.tracking}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Shipping Address
                              </div>
                              <div className="text-sm text-gray-700 dark:text-gray-300">
                                {order.shipping.address}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {expandedRows.length} of {orderData.length} orders expanded
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <button
              onClick={() => setExpandedRows(orderData.map((o) => o.id))}
              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Expand All Orders
            </button>
            <button
              onClick={() => setExpandedRows([])}
              className="px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
