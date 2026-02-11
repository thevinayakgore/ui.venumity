"use client";
import { motion } from "framer-motion";
import { Percent, Truck, Shield, Award } from "lucide-react";

export default function OfferBanner4_4() {
  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Left Banner */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-linear-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full mb-3">
                <Percent className="w-4 h-4" />
                <span className="text-sm font-medium">SAVE UP TO</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">50% OFF</h2>
              <p className="text-blue-100">
                On all electronics and home appliances
              </p>
            </div>

            <div className="text-right">
              <div className="text-5xl font-bold">🎯</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-sm text-blue-100">Ends in</div>
              <div className="text-xl font-bold">2 days</div>
            </div>

            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
              Shop Now
            </button>
          </div>
        </motion.div>

        {/* Right Banner */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-linear-to-r from-purple-600 to-pink-500 rounded-2xl p-8 text-white"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full mb-3">
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">PREMIUM</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">Free Shipping</h2>
              <p className="text-purple-100">On all orders over $49.99</p>
            </div>

            <div className="text-right">
              <div className="text-5xl font-bold">🚚</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white/10 rounded-lg">
              <Truck className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm font-medium">Fast Delivery</div>
            </div>

            <div className="text-center p-3 bg-white/10 rounded-lg">
              <Shield className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm font-medium">Secure Checkout</div>
            </div>

            <div className="text-center p-3 bg-white/10 rounded-lg">
              <Award className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm font-medium">Best Price</div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
