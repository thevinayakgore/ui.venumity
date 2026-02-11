"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, X, ShoppingBag } from "lucide-react";

export default function WishlistButton10_2() {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(3);

  const handleWishlist = () => {
    const newState = !isWishlisted;
    setIsWishlisted(newState);

    if (newState) {
      setWishlistCount((prev) => prev + 1);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } else {
      setWishlistCount((prev) => Math.max(0, prev - 1));
    }
  };

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="relative min-h-[500px]">
        {/* Product Card */}
        <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
          {/* Product Image */}
          <div className="h-64 bg-linear-to-br from-blue-500 to-cyan-400 relative">
            {/* Wishlist Button */}
            <button
              onClick={handleWishlist}
              className="absolute top-4 right-4 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg"
            >
              <Heart
                className={`w-5 h-5 ${
                  isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </button>
          </div>

          {/* Product Info */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Premium Headphones
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Noise-cancelling wireless headphones
            </p>

            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                $199.99
              </div>

              <button className="px-6 py-2 bg-gray-900 dark:bg-gray-800 text-white font-medium rounded-lg hover:bg-black dark:hover:bg-gray-700 transition">
                <ShoppingBag className="w-4 h-4 inline mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Floating Wishlist Counter */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 p-4 bg-white dark:bg-gray-900 rounded-full shadow-xl flex items-center gap-2"
        >
          <Heart className="w-5 h-5 text-red-500" />
          <span className="font-semibold text-gray-900 dark:text-white">
            {wishlistCount}
          </span>
        </motion.button>

        {/* Notification */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{
            opacity: showNotification ? 1 : 0,
            x: showNotification ? 0 : 100,
          }}
          className="fixed bottom-6 left-6 bg-white dark:bg-gray-900 rounded-lg shadow-xl p-4 max-w-xs border-l-4 border-red-500"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  Added to Wishlist
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Item saved for later
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
