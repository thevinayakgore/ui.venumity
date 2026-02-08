"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Plus, Trash2, Lock, Check, Edit } from "lucide-react";

export default function PaymentOptions5_5() {
  const [selectedCard, setSelectedCard] = useState<string>("card-1");
  const [showAddCard, setShowAddCard] = useState(false);

  const savedCards = [
    {
      id: "card-1",
      type: "Visa",
      lastFour: "4231",
      expiry: "08/25",
      name: "John Doe",
      isDefault: true,
    },
    {
      id: "card-2",
      type: "Mastercard",
      lastFour: "5578",
      expiry: "12/24",
      name: "John Doe",
      isDefault: false,
    },
    {
      id: "card-3",
      type: "American Express",
      lastFour: "9012",
      expiry: "05/26",
      name: "John Doe",
      isDefault: false,
    },
  ];

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Payment Methods
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your saved payment methods
              </p>
            </div>

            <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
              <Lock className="w-4 h-4" />
              <span>Secure</span>
            </button>
          </div>

          {/* Saved Cards */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Saved Cards
            </h3>

            <div className="space-y-3">
              {savedCards.map((card) => (
                <motion.div
                  key={card.id}
                  whileHover={{ scale: 1.01 }}
                  className={`p-4 rounded-xl border-2 flex items-center justify-between transition cursor-pointer ${
                    selectedCard === card.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-800 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedCard(card.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <CreditCard className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {card.type} **** {card.lastFour}
                        </span>
                        {card.isDefault && (
                          <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Expires {card.expiry} • {card.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {selectedCard === card.id && (
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}

                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                      <Edit className="w-4 h-4 text-gray-500" />
                    </button>

                    <button className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Add New Card */}
          <div className="mb-8">
            <button
              onClick={() => setShowAddCard(!showAddCard)}
              className="w-full p-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 transition flex items-center justify-center gap-3"
            >
              <Plus className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Add New Payment Method
              </span>
            </button>

            <AnimatePresence>
              {showAddCard && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Enter Card Details
                  </h4>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />

                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Expiry Date (MM/YY)"
                        className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      />

                      <input
                        type="text"
                        placeholder="CVV"
                        className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="default-card"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="default-card"
                        className="text-sm text-gray-700 dark:text-gray-300"
                      >
                        Set as default payment method
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 py-3 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              Cancel
            </button>

            <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
