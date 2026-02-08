"use client";
import { useState } from "react";
import {
  Package,
  CreditCard,
  Truck,
  Shield,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutForm1_4() {
  const [selectedShipping, setSelectedShipping] = useState<
    "standard" | "express" | "overnight"
  >("standard");

  const shippingOptions = [
    {
      id: "standard",
      label: "Standard",
      price: 4.99,
      est: "5-7 business days",
    },
    { id: "express", label: "Express", price: 9.99, est: "2-3 business days" },
    { id: "overnight", label: "Overnight", price: 19.99, est: "Next day" },
  ] as const;

  const orderItems = [
    { name: "Wireless Earbuds", price: 89.99, quantity: 1 },
    { name: "Charging Case", price: 29.99, quantity: 1 },
  ];

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const shippingCost =
    shippingOptions.find((s) => s.id === selectedShipping)?.price || 0;
  const total = subtotal + tax + shippingCost;

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 min-h-[600px]">
          {/* Left Panel - Order Details */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-full"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>

              {/* Items List */}
              <div className="space-y-4 mb-8">
                {orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg"
                  >
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Options */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Shipping Method
                </h3>
                <div className="space-y-3">
                  {shippingOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedShipping(option.id)}
                      className={`w-full p-4 rounded-lg border-2 flex items-center justify-between transition ${
                        selectedShipping === option.id
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-300 dark:border-gray-700 hover:border-gray-400"
                      }`}
                    >
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {option.label}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {option.est}
                        </div>
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        ${option.price.toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subtotal
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Shipping
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    ${shippingCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="text-gray-900 dark:text-white">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-blue-600 dark:text-blue-400">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Panel - Checkout Form */}
          <div className="p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="h-full flex flex-col"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Complete Checkout
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Enter your payment details
              </p>

              <form className="space-y-6 flex-1">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="MM/YY"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Security Code
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="CVC"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Your payment is secure and encrypted
                  </p>
                </div>

                <div className="mt-auto">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gray-900 hover:bg-black dark:bg-gray-800 dark:hover:bg-gray-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition"
                  >
                    Pay ${total.toFixed(2)}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3">
                    By completing your purchase you agree to our Terms of
                    Service
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
