"use client";
import { useState } from "react";
import { Star, Heart, ShoppingCart, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CustomProductDisplay2_2() {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const product = {
    name: "Organic Cotton T-Shirt",
    description:
      "Soft, breathable organic cotton t-shirt. Made with sustainable materials and ethical production.",
    price: 34.99,
    rating: 4.5,
    variants: [
      { id: 0, color: "bg-gray-900", name: "Black" },
      { id: 1, color: "bg-white border", name: "White" },
      { id: 2, color: "bg-blue-600", name: "Navy" },
      { id: 3, color: "bg-green-700", name: "Forest" },
    ],
    details: [
      "100% Organic Cotton",
      "Machine wash cold",
      "Made in USA",
      "Sustainable packaging",
    ],
  };

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-square bg-linear-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden">
              {/* Product-like visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform rotate-6">
                  <div className="absolute top-4 left-4 right-4 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="absolute bottom-4 left-4 right-4 h-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
            </div>

            {/* Like button */}
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full"
            >
              <Heart
                className={`w-6 h-6 ${
                  isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </button>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 dark:text-gray-700"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                4.5 (328 reviews)
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              {product.name}
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              ${product.price.toFixed(2)}
            </div>

            {/* Color Variants */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                COLOR
              </h3>
              <div className="flex gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant.id)}
                    className={`relative p-0.5 rounded-full ${
                      selectedVariant === variant.id
                        ? "ring-2 ring-gray-900 dark:ring-white"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full ${variant.color} ${
                        variant.name === "White" ? "border-gray-300" : ""
                      }`}
                    />
                    <span className="sr-only">{variant.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-2">
              {product.details.map((detail, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                  <span className="text-gray-600 dark:text-gray-400">
                    {detail}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full py-4 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 dark:text-black text-white font-medium rounded-lg flex items-center justify-center gap-3 transition">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>

              <button className="w-full py-4 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center justify-center gap-2">
                View Details
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Additional Info */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-3 text-center divide-x divide-gray-200 dark:divide-gray-800">
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Free
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Shipping
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    30-Day
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Returns
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    1-Year
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Warranty
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
