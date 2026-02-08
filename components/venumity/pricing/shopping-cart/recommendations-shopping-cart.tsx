"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ThumbsUp,
} from "lucide-react";

export default function ShoppingCart9_4() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Mouse",
      description: "Ergonomic wireless mouse",
      price: 49.99,
      quantity: 1,
      imageColor: "from-blue-500 to-cyan-400",
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      description: "RGB mechanical keyboard",
      price: 89.99,
      quantity: 1,
      imageColor: "from-purple-500 to-pink-400",
    },
  ]);

  const recommendations = [
    {
      id: 3,
      name: "Mouse Pad",
      description: "Large gaming mouse pad",
      price: 24.99,
      imageColor: "from-gray-800 to-gray-600",
    },
    {
      id: 4,
      name: "Headset Stand",
      description: "RGB headset stand",
      price: 34.99,
      imageColor: "from-green-500 to-emerald-400",
    },
    {
      id: 5,
      name: "Webcam",
      description: "1080p HD webcam",
      price: 59.99,
      imageColor: "from-amber-500 to-orange-400",
    },
  ];

  const updateQuantity = (id: number, change: number) => {
    setCartItems((prev) =>
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
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addRecommendation = (product: (typeof recommendations)[0]) => {
    setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 4.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <ShoppingCart className="w-6 h-6 text-gray-900 dark:text-white" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Your Cart ({cartItems.length})
                </h2>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Add items to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-6 p-4 border border-gray-200 dark:border-gray-800 rounded-lg"
                    >
                      {/* Product Image */}
                      <div
                        className={`w-20 h-20 rounded-lg bg-linear-to-br ${item.imageColor}`}
                      />

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {item.description}
                            </p>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                          >
                            <Trash2 className="w-5 h-5 text-red-500" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-6 py-2 text-gray-900 dark:text-white font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recommendations */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <ThumbsUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Frequently bought together
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {recommendations.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ y: -5 }}
                    className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg"
                  >
                    <div
                      className={`h-32 rounded-lg mb-4 bg-linear-to-br ${product.imageColor}`}
                    />

                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        ${product.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => addRecommendation(product)}
                        className="px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-black dark:hover:bg-gray-700 transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sticky top-6"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h3>

              <div className="space-y-4 mb-6">
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
                        ? "text-green-600 dark:text-green-400"
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
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-blue-600 dark:text-blue-400">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-3 transition">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Secure checkout</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
