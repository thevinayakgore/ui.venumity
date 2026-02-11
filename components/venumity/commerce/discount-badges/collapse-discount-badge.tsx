"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Percent, Clock, Zap, TrendingDown } from "lucide-react";

export default function CollapseDiscountBadge() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          layout
          className="bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl overflow-hidden"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <motion.div
            layout
            className="p-6 cursor-pointer"
            animate={{ padding: isExpanded ? "1.5rem" : "1.5rem" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  layout
                  className={`p-3 rounded-xl bg-white/20 backdrop-blur-sm ${
                    isExpanded ? "rotate-12" : ""
                  }`}
                >
                  <Percent className="w-6 h-6 text-white" />
                </motion.div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    Special Discount Offer
                  </h3>
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: isExpanded ? 1 : 0,
                      height: isExpanded ? "auto" : 0,
                    }}
                    className="text-white/80 text-sm mt-1"
                  >
                    Limited time offer for first-time buyers
                  </motion.p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-3xl font-bold text-white">70%</div>
                <div className="text-white/80 text-sm">OFF</div>
              </div>
            </div>

            {/* Expanded Content */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isExpanded ? 1 : 0,
                height: isExpanded ? "auto" : 0,
              }}
              className="mt-4 pt-4 border-t border-white/20"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-white/80" />
                  <div>
                    <div className="text-sm text-white/60">Time Left</div>
                    <div className="font-medium text-white">24:59:30</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-white/80" />
                  <div>
                    <div className="text-sm text-white/60">Usage</div>
                    <div className="font-medium text-white">234 used today</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-white/80" />
                  <span className="text-sm text-white/80">Original: $199</span>
                </div>
                <span className="text-2xl font-bold text-white">
                  Now: $59.70
                </span>
              </div>

              <button className="w-full mt-4 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition">
                Apply Discount Code: SAVE70
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
