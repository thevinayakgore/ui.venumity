"use client";
import { motion } from "framer-motion";

export default function DiscountBadge3_1() {
  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {[
          { discount: "20%", label: "OFF", color: "bg-red-500 text-white" },
          { discount: "50%", label: "SALE", color: "bg-blue-600 text-white" },
          { discount: "30%", label: "OFF", color: "bg-green-600 text-white" },
          { discount: "15%", label: "OFF", color: "bg-purple-600 text-white" },
        ].map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`${badge.color} rounded-xl p-6 text-center shadow-lg`}
          >
            <div className="text-4xl font-bold">{badge.discount}</div>
            <div className="text-lg font-medium mt-1">{badge.label}</div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
