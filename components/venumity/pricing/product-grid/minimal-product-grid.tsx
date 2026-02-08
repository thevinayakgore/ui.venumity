"use client";
import { motion } from "framer-motion";

export default function ProductGrid8_2() {
  const products = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    name: `Minimal Product ${i + 1}`,
    category: ["Design", "Tech", "Home", "Style"][i % 4],
    price: 99 + i * 20,
    color: ["bg-gray-800", "bg-gray-600", "bg-gray-400", "bg-gray-200"][i % 4],
  }));

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            {/* Product Image */}
            <div className="aspect-square mb-4 overflow-hidden rounded-lg">
              <div
                className={`w-full h-full ${product.color} transition-transform duration-300 group-hover:scale-105`}
              />
            </div>

            {/* Product Info */}
            <div className="text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {product.category}
              </div>

              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                {product.name}
              </h3>

              <div className="text-gray-900 dark:text-white font-medium">
                ${product.price}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
