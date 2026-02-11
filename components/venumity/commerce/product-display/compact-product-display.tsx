"use client";
import { useState } from "react";
import { Star, ShoppingCart, Eye, Package } from "lucide-react";
import { motion } from "framer-motion";

export default function CustomProductDisplay2_5() {
  const [selectedOption, setSelectedOption] = useState("128gb");
  const [isHovered, setIsHovered] = useState(false);

  const product = {
    name: "Smartphone Pro",
    description:
      "Latest generation smartphone with advanced camera system and all-day battery life.",
    price: 899.99,
    rating: 4.7,
    options: [
      { id: "128gb", label: "128GB", price: 899.99 },
      { id: "256gb", label: "256GB", price: 999.99 },
      { id: "512gb", label: "512GB", price: 1199.99 },
    ],
    highlights: [
      '6.7" Super Retina XDR display',
      "Triple camera system with LiDAR",
      "A16 Bionic chip",
      "All-day battery life",
      "5G capable",
    ],
  };

  const selectedPrice =
    product.options.find((opt) => opt.id === selectedOption)?.price ||
    product.price;

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-3">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="md:col-span-2 relative bg-linear-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Phone visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                    rotateY: isHovered ? 5 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative w-48 h-96"
                >
                  {/* Phone body */}
                  <div className="absolute inset-0 bg-linear-to-b from-gray-900 to-black rounded-[40px] border-10 border-gray-800 shadow-2xl">
                    {/* Screen */}
                    <div className="absolute inset-[10px] bg-linear-to-br from-blue-900 to-purple-900 rounded-[30px] overflow-hidden">
                      {/* Screen content */}
                      <div className="absolute inset-0 p-4">
                        <div className="grid grid-cols-4 gap-2">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div
                              key={i}
                              className="aspect-square bg-white/10 rounded-lg"
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Notch */}
                    <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl"></div>

                    {/* Camera bump */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-12 bg-black rounded-full flex items-center justify-center gap-4">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gray-700"
                        ></div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Quick view button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 10,
                }}
                className="absolute bottom-6 right-6 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg"
              >
                <Eye className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </motion.button>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6"
            >
              <div className="space-y-6">
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < 4
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 dark:text-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {product.rating} (2.4k)
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {product.name}
                </h2>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {product.description}
                </p>

                {/* Storage Options */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    STORAGE
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSelectedOption(option.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                          selectedOption === option.id
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-2">
                  {product.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="space-y-4">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${selectedPrice.toFixed(2)}
                  </div>

                  <div className="space-y-2">
                    <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition">
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>

                    <button className="w-full py-3 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      Buy Now
                    </button>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Package className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      Free Shipping
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Delivery in 2-3 business days
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
