"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, ChevronRight, Sparkles } from "lucide-react";

export default function OfferBanner4_3() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <motion.div
        layout
        className="bg-linear-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                className="p-3 bg-white/20 rounded-xl"
              >
                <Gift className="w-6 h-6 text-white" />
              </motion.div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">
                  Special Holiday Offer 🎁
                </h3>
                <p className="text-emerald-100">
                  Get free shipping + 25% off on orders over $100
                </p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-white/20"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Sparkles className="w-4 h-4 text-white/80" />
                          <span className="text-emerald-100 text-sm">
                            Use code: HOLIDAY25
                          </span>
                        </div>
                        <div className="text-emerald-100 text-sm">
                          • Free worldwide shipping
                          <br />
                          • 30-day return policy
                          <br />• Gift wrapping available
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center gap-3 ml-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                <ChevronRight
                  className={`w-5 h-5 text-white transition-transform ${
                    isExpanded ? "rotate-90" : ""
                  }`}
                />
              </button>

              <button
                onClick={() => setIsVisible(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <motion.div
            layout
            className={`flex gap-3 mt-4 ${
              isExpanded ? "pt-4 border-t border-white/20" : ""
            }`}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Shop Collection
            </motion.button>

            <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition">
              Learn More
            </button>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
