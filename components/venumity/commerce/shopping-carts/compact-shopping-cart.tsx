"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, ChevronRight } from "lucide-react";

export default function ShoppingCart9_2() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Wireless Earbuds",
      price: 89.99,
      quantity: 1,
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Phone Charger",
      price: 19.99,
      quantity: 2,
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "Screen Protector",
      price: 12.99,
      quantity: 1,
      color: "bg-purple-500",
    },
  ]);

  const updateQuantity = (id: number, change: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal * 1.08; // Includes tax

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 text-gray-900 dark:text-white" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Your Cart ({items.length})
                </h2>
              </div>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="p-6 space-y-4 max-h-100 overflow-y-auto">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                {/* Product Image */}
                <div className={`w-16 h-16 rounded-lg ${item.color}`} />

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {item.name}
                  </h3>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 py-1 text-gray-900 dark:text-white font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-800">
            <div className="space-y-3 mb-6">
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
                <span className="text-green-600 dark:text-green-400">FREE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tax</span>
                <span className="text-gray-900 dark:text-white">
                  ${(subtotal * 0.08).toFixed(2)}
                </span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="w-full py-4 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 dark:text-black text-white font-semibold rounded-lg flex items-center justify-center gap-3 transition">
              Checkout
              <ChevronRight className="w-5 h-5" />
            </button>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              Free shipping & 30-day returns
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
