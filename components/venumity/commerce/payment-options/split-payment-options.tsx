"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Smartphone,
  Wallet,
  Building,
  Lock,
  ChevronRight,
} from "lucide-react";

export default function PaymentOptions5_3() {
  const [selectedTab, setSelectedTab] = useState<"card" | "digital" | "bank">(
    "card"
  );

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-3">
            {/* Left Panel - Method Selection */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                How would you like to pay?
              </h2>

              <div className="space-y-4">
                {/* Card Payment */}
                <button
                  onClick={() => setSelectedTab("card")}
                  className={`w-full p-4 rounded-xl flex items-center gap-4 transition ${
                    selectedTab === "card"
                      ? "bg-white dark:bg-gray-900 shadow-lg"
                      : "hover:bg-white/50 dark:hover:bg-gray-900/50"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg ${
                      selectedTab === "card"
                        ? "bg-blue-100 dark:bg-blue-900/30"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    <CreditCard
                      className={`w-6 h-6 ${
                        selectedTab === "card"
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      Credit/Debit Card
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Visa, Mastercard, Amex
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                {/* Digital Wallets */}
                <button
                  onClick={() => setSelectedTab("digital")}
                  className={`w-full p-4 rounded-xl flex items-center gap-4 transition ${
                    selectedTab === "digital"
                      ? "bg-white dark:bg-gray-900 shadow-lg"
                      : "hover:bg-white/50 dark:hover:bg-gray-900/50"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg ${
                      selectedTab === "digital"
                        ? "bg-purple-100 dark:bg-purple-900/30"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    <Smartphone
                      className={`w-6 h-6 ${
                        selectedTab === "digital"
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      Digital Wallets
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Apple Pay, Google Pay, PayPal
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                {/* Bank Transfer */}
                <button
                  onClick={() => setSelectedTab("bank")}
                  className={`w-full p-4 rounded-xl flex items-center gap-4 transition ${
                    selectedTab === "bank"
                      ? "bg-white dark:bg-gray-900 shadow-lg"
                      : "hover:bg-white/50 dark:hover:bg-gray-900/50"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg ${
                      selectedTab === "bank"
                        ? "bg-green-100 dark:bg-green-900/30"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    <Building
                      className={`w-6 h-6 ${
                        selectedTab === "bank"
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      Bank Transfer
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Direct bank payment
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Security Info */}
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div className="text-sm">
                    <div className="font-medium text-blue-700 dark:text-blue-400">
                      256-bit SSL Encryption
                    </div>
                    <div className="text-blue-600/70 dark:text-blue-400/70">
                      Your payment information is secure
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Payment Details */}
            <div className="lg:col-span-2 p-6 md:p-8">
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="h-full"
              >
                {selectedTab === "card" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Enter Card Details
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === "digital" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Digital Wallets
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      {["Apple Pay", "Google Pay", "PayPal", "Amazon Pay"].map(
                        (wallet) => (
                          <button
                            key={wallet}
                            className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-800 hover:border-blue-500 transition flex flex-col items-center justify-center gap-3"
                          >
                            <Wallet className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {wallet}
                            </span>
                          </button>
                        )
                      )}
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      You will be redirected to your preferred wallet service to
                      complete the payment.
                    </p>
                  </div>
                )}

                {selectedTab === "bank" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Bank Transfer Details
                    </h3>

                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Account Name
                        </div>
                        <div className="font-mono text-gray-900 dark:text-white">
                          TechStore Inc.
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Account Number
                        </div>
                        <div className="font-mono text-gray-900 dark:text-white">
                          1234 5678 9012 3456
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Routing Number
                        </div>
                        <div className="font-mono text-gray-900 dark:text-white">
                          021000021
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Please include your order number as the payment reference.
                    </p>
                  </div>
                )}

                {/* Continue Button */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
                    Continue to Review Order
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
