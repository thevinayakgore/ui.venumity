"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";

export default function ProductCard7_1() {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      category: "Electronics",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.5,
      reviews: 128,
      imageColor: "from-blue-500 to-cyan-400",
    },
    {
      id: 2,
      name: "Minimalist Smart Watch",
      category: "Wearables",
      price: 249.99,
      originalPrice: 299.99,
      rating: 4.8,
      reviews: 256,
      imageColor: "from-gray-800 to-gray-600",
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      category: "Fashion",
      price: 34.99,
      originalPrice: 49.99,
      rating: 4.3,
      reviews: 89,
      imageColor: "from-green-500 to-emerald-400",
    },
    {
      id: 4,
      name: "Ceramic Coffee Mug",
      category: "Home",
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.7,
      reviews: 203,
      imageColor: "from-amber-600 to-orange-400",
    },
  ];

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => {
          const discount = Math.round(
            ((product.originalPrice - product.price) / product.originalPrice) *
              100
          );

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden bg-linear-to-br">
                <div
                  className={`absolute inset-0 bg-linear-to-br ${product.imageColor}`}
                >
                  {/* Product-like shape */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {product.category === "Electronics" && (
                      <div className="w-32 h-32 bg-black/20 rounded-full flex items-center justify-center">
                        <div className="w-24 h-24 bg-white/20 rounded-full"></div>
                      </div>
                    )}
                    {product.category === "Wearables" && (
                      <div className="w-32 h-40 bg-black/20 rounded-3xl"></div>
                    )}
                    {product.category === "Fashion" && (
                      <div className="w-32 h-40 bg-white/20"></div>
                    )}
                    {product.category === "Home" && (
                      <div className="w-32 h-32 bg-white/20 rounded-full"></div>
                    )}
                  </div>
                </div>

                {/* Discount Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
                  -{discount}%
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 space-y-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                      }`}
                    />
                  </button>

                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 20,
                  }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gray-900 text-white font-semibold rounded-lg shadow-lg whitespace-nowrap"
                >
                  <ShoppingCart className="w-4 h-4 inline mr-2" />
                  Add to Cart
                </motion.button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Category */}
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {product.category}
                </div>

                {/* Name */}
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 dark:text-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="ml-2 text-gray-500 dark:text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </div>

                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <ShoppingCart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
