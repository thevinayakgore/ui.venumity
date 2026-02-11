"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, X } from "lucide-react";

export default function WishlistButton10_4() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: "Designer Watch", price: 349.99, rating: 4.8 },
    { id: 2, name: "Leather Jacket", price: 199.99, rating: 4.6 },
    { id: 3, name: "Smart Speaker", price: 129.99, rating: 4.4 },
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="flex justify-center">
        {/* Main Wishlist Button */}
        <div className="relative">
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold rounded-lg flex items-center gap-3"
          >
            <Heart className="w-5 h-5" />
            <span>Wishlist ({wishlistItems.length})</span>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className="w-4 h-4"
            >
              ▼
            </motion.span>
          </motion.button>

          {/* Wishlist Value */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
            ${totalValue.toFixed(2)} value
          </div>
        </div>
      </div>

      {/* Expanded Wishlist Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-12 bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden max-w-2xl mx-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Heart className="w-6 h-6 text-red-500" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Your Wishlist
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {wishlistItems.length} items saved
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Wishlist Items */}
              <div className="space-y-4">
                {wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(item.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300 dark:text-gray-700"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item.rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-black dark:hover:bg-gray-700 transition">
                          Buy Now
                        </button>

                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        >
                          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {wishlistItems.length === 0 && (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Your wishlist is empty
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Start adding items you love!
                  </p>
                </div>
              )}

              {/* Actions */}
              {wishlistItems.length > 0 && (
                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <button className="flex-1 py-3 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    Clear All
                  </button>
                  <button className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition">
                    Add All to Cart
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
