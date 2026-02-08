"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Check } from "lucide-react";

export default function ProductCard7_4() {
  const [selectedVariants, setSelectedVariants] = useState<
    Record<number, { color: string; size: string }>
  >({
    1: { color: "space-gray", size: "m" },
    2: { color: "black", size: "40mm" },
    3: { color: "green", size: "one-size" },
    4: { color: "white", size: "500ml" },
  });

  const products = [
    {
      id: 1,
      name: "Sweatshirt",
      category: "Apparel",
      price: 49.99,
      colors: [
        { id: "space-gray", name: "Space Gray", bg: "bg-gray-800" },
        { id: "navy", name: "Navy", bg: "bg-blue-900" },
        { id: "olive", name: "Olive", bg: "bg-green-800" },
      ],
      sizes: ["xs", "s", "m", "l", "xl"],
    },
    {
      id: 2,
      name: "Smart Watch",
      category: "Wearables",
      price: 299.99,
      colors: [
        { id: "black", name: "Black", bg: "bg-black" },
        { id: "silver", name: "Silver", bg: "bg-gray-300" },
        { id: "gold", name: "Gold", bg: "bg-amber-300" },
      ],
      sizes: ["40mm", "44mm"],
    },
    {
      id: 3,
      name: "Backpack",
      category: "Accessories",
      price: 89.99,
      colors: [
        { id: "green", name: "Forest Green", bg: "bg-green-700" },
        { id: "black", name: "Black", bg: "bg-black" },
        { id: "gray", name: "Gray", bg: "bg-gray-600" },
      ],
      sizes: ["one-size"],
    },
    {
      id: 4,
      name: "Water Bottle",
      category: "Fitness",
      price: 34.99,
      colors: [
        { id: "white", name: "White", bg: "bg-white border" },
        { id: "black", name: "Black", bg: "bg-black" },
        { id: "blue", name: "Blue", bg: "bg-blue-600" },
      ],
      sizes: ["500ml", "750ml", "1L"],
    },
  ];

  const updateVariant = (
    productId: number,
    type: "color" | "size",
    value: string
  ) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [type]: value,
      },
    }));
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
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
          >
            {/* Product Image */}
            <div className="h-48 bg-linear-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900" />

            {/* Product Info */}
            <div className="p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {product.category}
              </div>

              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h3>

              {/* Color Selection */}
              <div className="mb-4">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  Color:{" "}
                  {
                    product.colors.find(
                      (c) => c.id === selectedVariants[product.id].color
                    )?.name
                  }
                </div>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() =>
                        updateVariant(product.id, "color", color.id)
                      }
                      className="relative"
                    >
                      <div
                        className={`w-8 h-8 rounded-full ${color.bg} ${
                          color.id === "white" ? "border border-gray-300" : ""
                        }`}
                      />
                      {selectedVariants[product.id].color === color.id && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              {product.sizes.length > 1 && (
                <div className="mb-4">
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    Size: {selectedVariants[product.id].size}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => updateVariant(product.id, "size", size)}
                        className={`px-3 py-1.5 text-sm rounded-lg border transition ${
                          selectedVariants[product.id].size === size
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                            : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price & Add to Cart */}
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </span>

                <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-black dark:hover:bg-gray-700 transition">
                  <ShoppingCart className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
