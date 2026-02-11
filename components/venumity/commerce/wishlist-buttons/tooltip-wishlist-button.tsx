"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Eye, ShoppingCart } from "lucide-react";

export default function WishlistButton10_3() {
  const [wishlistStatus, setWishlistStatus] = useState<Record<number, boolean>>(
    {
      1: false,
      2: true,
      3: false,
      4: true,
    }
  );

  const products = [
    { id: 1, name: "Wireless Earbuds", price: 89.99 },
    { id: 2, name: "Smart Watch", price: 249.99 },
    { id: 3, name: "Phone Case", price: 29.99 },
    { id: 4, name: "Tablet Stand", price: 39.99 },
  ];

  const toggleWishlist = (id: number) => {
    setWishlistStatus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getTooltipText = (isWishlisted: boolean) => {
    return isWishlisted ? "Remove from wishlist" : "Add to wishlist";
  };

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden group relative"
          >
            {/* Product Image */}
            <div className="h-48 bg-linear-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900" />

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h3>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                ${product.price.toFixed(2)}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Wishlist Button with Tooltip */}
              <div className="relative">
                <motion.button
                  onClick={() => toggleWishlist(product.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      wishlistStatus[product.id]
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }`}
                  />
                </motion.button>

                {/* Tooltip */}
                <div className="absolute top-full right-0 mt-2 hidden group-hover:block">
                  <div className="relative">
                    <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {getTooltipText(wishlistStatus[product.id])}
                    </div>
                    <div className="absolute -top-1 right-2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                  </div>
                </div>
              </div>

              {/* Quick View Button */}
              <div className="relative">
                <button className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg">
                  <Eye className="w-4 h-4 text-gray-600" />
                </button>

                <div className="absolute top-full right-0 mt-2 hidden group-hover:block">
                  <div className="relative">
                    <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      Quick view
                    </div>
                    <div className="absolute -top-1 right-2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="relative">
                <button className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg">
                  <ShoppingCart className="w-4 h-4 text-gray-600" />
                </button>

                <div className="absolute top-full right-0 mt-2 hidden group-hover:block">
                  <div className="relative">
                    <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      Add to cart
                    </div>
                    <div className="absolute -top-1 right-2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Wishlist Status Badge */}
            {wishlistStatus[product.id] && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 left-3"
              >
                <div className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded">
                  WISHLISTED
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </main>
  );
}
