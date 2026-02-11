"use client";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";

export default function DiscountBadge3_2() {
  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {/* Badge 1 - Flash Sale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          className="relative"
        >
          <div className="bg-linear-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-lg font-bold text-lg flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Tag className="w-5 h-5" />
            </motion.div>
            FLASH SALE
            <span className="ml-2 bg-white text-red-600 px-2 py-0.5 rounded text-sm">
              60% OFF
            </span>
          </div>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute inset-0 bg-linear-to-r from-red-500 to-orange-500 blur-lg -z-10"
          />
        </motion.div>

        {/* Badge 2 - Limited Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="relative overflow-hidden"
        >
          <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-bold text-lg">
            <div className="flex items-center gap-2">
              <span>LIMITED TIME</span>
              <motion.span
                animate={{
                  backgroundColor: ["#22c55e", "#3b82f6", "#22c55e"],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="px-3 py-1 bg-green-500 rounded-full text-sm"
              >
                40% OFF
              </motion.span>
            </div>
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-white/30"
            />
          </div>
        </motion.div>

        {/* Badge 3 - Seasonal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          className="relative"
        >
          <div className="bg-linear-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-bold text-lg">
            SEASONAL DEAL
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
            >
              <span className="text-xs font-bold text-green-700">!</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
