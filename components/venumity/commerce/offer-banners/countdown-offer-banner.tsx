"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Zap, ArrowRight } from "lucide-react";

export default function OfferBanner4_2() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-4">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">FLASH SALE</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Biggest Sale of the Year
              </h2>
              <p className="text-purple-100 text-lg mb-6">
                Save up to 70% on all premium products. Do not miss out!
              </p>

              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-white/20 rounded-lg">
                  <div className="text-2xl font-bold text-white">70%</div>
                  <div className="text-purple-100 text-sm">
                    Maximum Discount
                  </div>
                </div>
                <div className="px-4 py-2 bg-white/20 rounded-lg">
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-purple-100 text-sm">Products</div>
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 min-w-[280px]">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-white/80" />
                <span className="text-white font-medium">Offer ends in:</span>
              </div>

              <div className="flex justify-center gap-3">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {value.toString().padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-sm text-white/80 mt-2 capitalize">
                      {unit}
                    </span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-6 py-3 bg-white text-purple-600 font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
              >
                Shop Now & Save
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
