"use client";
import { useState } from "react";
import { X, ShoppingBag, CreditCard, Lock, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutForm1_5() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quick checkout:", { email, cardNumber });
    setIsOpen(false);
  };

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6 flex items-center justify-center">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-3 transition transform hover:scale-105"
      >
        <ShoppingBag className="w-5 h-5" />
        Quick Checkout - $49.99
      </button>

      {/* Overlay & Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-x-4 top-20 md:top-1/4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-50 max-w-md w-full"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Express Checkout
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Complete in under 60 seconds
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Product Preview */}
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Premium Subscription
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        1 year access
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        $49.99
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400">
                        Save 20%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Card Details
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          const formatted = value
                            .replace(/(\d{4})/g, "$1 ")
                            .trim();
                          setCardNumber(formatted.slice(0, 19));
                        }}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
                        256-bit SSL secured
                      </p>
                      <p className="text-xs text-blue-600/70 dark:text-blue-400/70">
                        Your payment information is encrypted
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition transform hover:scale-[1.02]"
                  >
                    Complete Purchase
                  </button>
                </form>

                <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
                  By proceeding, you agree to our Terms and Privacy Policy
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
