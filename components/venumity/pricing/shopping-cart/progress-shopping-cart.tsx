"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Gift, Truck, Shield, ChevronRight } from "lucide-react";

export default function ShoppingCart9_5() {
  const [items] = useState([
    {
      id: 1,
      name: "Premium Laptop",
      price: 1299.99,
      quantity: 1,
      category: "Electronics",
    },
    {
      id: 2,
      name: "Wireless Mouse",
      price: 49.99,
      quantity: 1,
      category: "Accessories",
    },
    {
      id: 3,
      name: "Laptop Bag",
      price: 89.99,
      quantity: 1,
      category: "Bags",
    },
  ]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const freeShippingThreshold = 100;
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const amountNeeded = Math.max(freeShippingThreshold - subtotal, 0);

  const tax = subtotal * 0.08;
  const shipping = subtotal >= freeShippingThreshold ? 0 : 9.99;
  const total = subtotal + shipping + tax;

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
          {/* Progress Bar */}
          <div className="p-6 bg-linear-to-r from-blue-500 to-purple-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6" />
                <div>
                  <h3 className="font-bold text-lg">Free Shipping</h3>
                  <p className="text-blue-100 text-sm">
                    {subtotal >= freeShippingThreshold
                      ? "You've unlocked free shipping!"
                      : `Add $${amountNeeded.toFixed(
                          2
                        )} more for free shipping`}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold">${subtotal.toFixed(2)}</div>
                <div className="text-blue-100 text-sm">
                  of ${freeShippingThreshold}
                </div>
              </div>
            </div>

            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-linear-to-r from-yellow-400 to-yellow-300"
              />
            </div>
          </div>

          {/* Cart Content */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <ShoppingCart className="w-6 h-6 text-gray-900 dark:text-white" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Your Cart ({items.length})
              </h2>
            </div>

            {/* Cart Items */}
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.category}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-4 mb-8">
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
                <span
                  className={
                    shipping === 0
                      ? "text-green-600 dark:text-green-400 font-semibold"
                      : "text-gray-900 dark:text-white"
                  }
                >
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tax</span>
                <span className="text-gray-900 dark:text-white">
                  ${tax.toFixed(2)}
                </span>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-2xl font-bold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Gift className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Free Gift
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Free accessory on orders over $500
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Fast Shipping
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  2-3 business day delivery
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Warranty
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  1-year warranty included
                </p>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-3 transition">
              Proceed to Secure Checkout
              <ChevronRight className="w-5 h-5" />
            </button>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              Price includes all applicable taxes. Shipping calculated at
              checkout.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
