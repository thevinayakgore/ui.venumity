"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Eye, X, Check } from "lucide-react";

export default function ProductCard7_3() {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);

  const products = [
    {
      id: 1,
      name: "Premium Headphones",
      description:
        "Noise-cancelling wireless headphones with premium sound quality.",
      price: 199.99,
      colors: ["bg-gray-800", "bg-white border", "bg-blue-600"],
      features: ["Wireless", "30h battery", "Noise-cancelling"],
    },
    {
      id: 2,
      name: "Smartphone Pro",
      description: "Latest flagship smartphone with advanced camera system.",
      price: 899.99,
      colors: ["bg-black", "bg-gray-300", "bg-blue-900"],
      features: ["5G", "256GB", "Triple camera"],
    },
    {
      id: 3,
      name: "Fitness Tracker",
      description: "Advanced fitness tracker with heart rate monitoring.",
      price: 149.99,
      colors: ["bg-green-600", "bg-black", "bg-purple-600"],
      features: ["Heart rate", "Sleep tracking", "Waterproof"],
    },
    {
      id: 4,
      name: "Laptop Stand",
      description: "Ergonomic laptop stand for better posture.",
      price: 49.99,
      colors: ["bg-gray-700", "bg-gray-300", "bg-amber-800"],
      features: ["Adjustable", "Aluminum", "Portable"],
    },
  ];

  const handleAddToCart = (productId: number) => {
    setAddedToCart(productId);
    setTimeout(() => setAddedToCart(null), 2000);
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
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
          >
            {/* Product Image */}
            <div
              className="relative h-48 bg-linear-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 cursor-pointer"
              onClick={() => setSelectedProduct(product.id)}
            >
              {/* Quick Actions */}
              <div className="absolute top-3 right-3 space-y-2">
                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                  <Eye className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Color Options */}
              <div className="absolute bottom-3 left-3 flex gap-2">
                {product.colors.map((color, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-full ${color} border border-gray-300`}
                  />
                ))}
              </div>

              {/* Added to Cart Notification */}
              <AnimatePresence>
                {addedToCart === product.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-3 left-3 px-3 py-1 bg-green-500 text-white text-sm rounded-full flex items-center gap-2"
                  >
                    <Check className="w-3 h-3" />
                    Added!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {product.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.features.map((feature, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Price & Actions */}
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-black dark:hover:bg-gray-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-20 md:top-1/4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-50 max-w-md w-full p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Quick View
                </h3>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Product details would appear here...
              </p>

              <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg">
                View Full Details
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
