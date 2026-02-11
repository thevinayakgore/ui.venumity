"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function WishlistButton10_5() {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="flex flex-col items-center justify-center min-h-125">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Animated Wishlist Button
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Click the heart to see the animation
          </p>
        </div>

        <div className="relative">
          {/* Product Card */}
          <div className="w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
            {/* Product Image */}
            <div className="h-64 bg-linear-to-br from-purple-500 to-pink-500 relative">
              {/* Animated Wishlist Button */}
              <motion.button
                onClick={() => setIsWishlisted(!isWishlisted)}
                animate={{
                  scale: isWishlisted ? [1, 1.3, 1] : 1,
                }}
                transition={{ duration: 0.5 }}
                className="absolute top-6 right-6"
              >
                <motion.div
                  animate={{
                    scale: isWishlisted ? [1, 1.5, 1] : 1,
                    rotate: isWishlisted ? [0, -15, 15, 0] : 0,
                  }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  {/* Outer Ring */}
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isWishlisted ? [0, 1.2, 0] : 0,
                      opacity: isWishlisted ? [0, 0.8, 0] : 0,
                    }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 rounded-full bg-pink-300"
                  />

                  {/* Middle Ring */}
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isWishlisted ? [0, 1.4, 0] : 0,
                      opacity: isWishlisted ? [0, 0.6, 0] : 0,
                    }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="absolute inset-0 rounded-full bg-pink-200"
                  />

                  {/* Inner Heart */}
                  <div className="relative z-10">
                    <motion.svg
                      animate={{
                        fill: isWishlisted ? "#ec4899" : "transparent",
                        stroke: isWishlisted ? "#ec4899" : "#ffffff",
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-12 h-12"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </motion.svg>
                  </div>
                </motion.div>
              </motion.button>

              {/* Floating Particles */}
              {isWishlisted && (
                <>
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        y: [-20, -80],
                        x: Math.sin(i * 30) * 40,
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.05,
                        repeat: 0,
                      }}
                      className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-pink-300"
                    />
                  ))}
                </>
              )}
            </div>

            {/* Product Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Premium Product
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Experience luxury and quality
              </p>

              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  $299.99
                </div>

                <motion.div
                  animate={{
                    scale: isWishlisted ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <button className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg">
                    {isWishlisted ? "Buy Now" : "Add to Cart"}
                  </button>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Status Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isWishlisted ? 1 : 0,
              y: isWishlisted ? 0 : 10,
            }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
          >
            <div className="px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-semibold">
              Added to wishlist! 💖
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
