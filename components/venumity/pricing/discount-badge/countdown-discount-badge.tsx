"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, AlertCircle } from "lucide-react";

export default function DiscountBadge3_5() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 30,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          return { ...prev, seconds: seconds - 1 };
        } else if (minutes > 0) {
          return { hours, minutes: minutes - 1, seconds: 59 };
        } else if (hours > 0) {
          return { hours: hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-linear-to-r from-red-500 to-orange-500 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="p-2 bg-white/20 rounded-lg"
                >
                  <AlertCircle className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Flash Sale Ending Soon!
                  </h2>
                  <p className="text-white/80 text-sm">
                    Limited time discount offer
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-4xl font-bold text-white">60%</div>
                <div className="text-white/80">OFF</div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Clock className="w-4 h-4 text-white/80" />
                <span className="text-white/80 text-sm">Offer ends in:</span>
              </div>

              <div className="flex justify-center gap-3">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {value.toString().padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-xs text-white/80 mt-1 capitalize">
                      {unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Comparison */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-white/80 text-sm">Original Price</div>
                <div className="text-xl text-white line-through">$299.99</div>
              </div>

              <div className="text-center">
                <div className="text-white/80 text-sm">You Save</div>
                <div className="text-2xl font-bold text-white">$180.00</div>
              </div>

              <div className="text-right">
                <div className="text-white/80 text-sm">Discounted Price</div>
                <div className="text-3xl font-bold text-white">$119.99</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-white/80 text-sm mb-2">
                <span>Sold: 84%</span>
                <span>Only 23 left</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "84%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-linear-to-r from-yellow-400 to-yellow-300"
                />
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-white text-red-600 font-bold text-lg rounded-lg hover:bg-gray-100 transition"
            >
              Shop Now with 60% Off
            </motion.button>

            {/* Terms */}
            <p className="text-center text-white/60 text-xs mt-4">
              Use code: FLASH60 at checkout. Limited quantities available.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
