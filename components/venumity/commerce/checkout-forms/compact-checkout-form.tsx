"use client";
import { useState } from "react";
import { CreditCard, Shield, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutForm1_3() {
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "paypal" | "applepay"
  >("card");
  const [saveCard, setSaveCard] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payment processed");
  };

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Subtotal
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  $149.99
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Shipping
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  $9.99
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tax</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  $12.00
                </span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    $171.98
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Payment Method
            </h3>
            <div className="space-y-3">
              {(
                [
                  { id: "card", label: "Credit Card", icon: CreditCard },
                  { id: "paypal", label: "PayPal", icon: Shield },
                  { id: "applepay", label: "Apple Pay", icon: Check },
                ] as const
              ).map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full p-4 rounded-lg border-2 flex items-center justify-between transition ${
                    paymentMethod === method.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-300 dark:border-gray-700 hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <method.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {method.label}
                    </span>
                  </div>
                  {paymentMethod === method.id && (
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Card Form (shown only when card is selected) */}
          {paymentMethod === "card" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Card Number"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={saveCard}
                  onChange={(e) => setSaveCard(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Save card for future purchases
                </span>
              </label>
            </motion.div>
          )}

          {/* Checkout Button */}
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="w-full py-4 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 dark:text-black text-white font-semibold rounded-lg transition duration-300"
            >
              Pay $171.98
            </button>
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3 flex items-center justify-center gap-1">
              <Shield className="w-4 h-4" />
              Secured by 256-bit SSL encryption
            </p>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
