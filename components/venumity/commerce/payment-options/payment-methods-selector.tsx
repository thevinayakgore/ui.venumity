"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  DollarSign,
  Smartphone,
  Wallet,
  Check,
} from "lucide-react";

export default function PaymentOptions5_1() {
  const [selectedMethod, setSelectedMethod] = useState<string>("credit-card");

  const paymentMethods = [
    {
      id: "credit-card",
      name: "Credit Card",
      icon: CreditCard,
      description: "Pay with Visa, Mastercard, or Amex",
      popular: true,
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: DollarSign,
      description: "Secure payment with PayPal",
      popular: true,
    },
    {
      id: "apple-pay",
      name: "Apple Pay",
      icon: Smartphone,
      description: "Pay with your Apple device",
      popular: false,
    },
    {
      id: "google-pay",
      name: "Google Pay",
      icon: Wallet,
      description: "Quick checkout with Google",
      popular: false,
    },
  ];

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Select Payment Method
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Choose how you want to pay for your order
          </p>

          <div className="space-y-4">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full p-4 rounded-xl border-2 flex items-center justify-between transition ${
                    selectedMethod === method.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-lg ${
                        selectedMethod === method.id
                          ? "bg-blue-100 dark:bg-blue-800"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      <method.icon
                        className={`w-6 h-6 ${
                          selectedMethod === method.id
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      />
                    </div>

                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {method.name}
                        </span>
                        {method.popular && (
                          <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {method.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedMethod === method.id
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                  >
                    {selectedMethod === method.id && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Selected Method Details */}
          {selectedMethod === "credit-card" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Enter Card Details
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Continue Button */}
          <div className="mt-8">
            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
              Continue to Review
            </button>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
              Your payment is secured with SSL encryption
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
