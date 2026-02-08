"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, CreditCard, Lock } from "lucide-react";

export default function PaymentOptions5_4() {
  const [selectedMethod, setSelectedMethod] = useState<string>("visa");

  const methods = [
    { id: "visa", name: "Visa", icon: "💳" },
    { id: "mastercard", name: "Mastercard", icon: "💳" },
    { id: "amex", name: "Amex", icon: "💳" },
    { id: "paypal", name: "PayPal", icon: "💰" },
    { id: "applepay", name: "Apple Pay", icon: "📱" },
    { id: "googlepay", name: "Google Pay", icon: "📱" },
  ];

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Payment Method
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Select your preferred option
              </p>
            </div>
          </div>

          {/* Payment Methods Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {methods.map((method) => (
              <motion.button
                key={method.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMethod(method.id)}
                className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center transition ${
                  selectedMethod === method.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-800 hover:border-gray-300"
                }`}
              >
                <div className="text-2xl mb-2">{method.icon}</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {method.name}
                </div>
                {selectedMethod === method.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Card Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Card Number
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                  CVV
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="123"
                />
              </div>
            </div>
          </div>

          {/* Security & Submit */}
          <div className="mt-6">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <Lock className="w-4 h-4" />
              <span>Your payment is secure and encrypted</span>
            </div>

            <button className="w-full py-4 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 dark:text-black text-white font-semibold rounded-lg transition">
              Pay $149.99
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
