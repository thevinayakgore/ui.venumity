"use client";
import { motion } from "framer-motion";
import { Tag, ArrowRight } from "lucide-react";

export default function OfferBanner4_1() {
  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-r from-blue-600 to-blue-700 rounded-2xl p-6 md:p-8 text-white"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Tag className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Summer Sale: Up to 50% Off
              </h2>
              <p className="text-blue-100 mt-1">
                Limited time offer on all electronics. Shop now and save big!
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg flex items-center gap-2 hover:bg-gray-100 transition"
          >
            Shop Now
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}
