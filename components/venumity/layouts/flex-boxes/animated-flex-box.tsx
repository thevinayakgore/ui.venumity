"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight, Zap, Target, TrendingUp, Sparkles } from "lucide-react";

export default function AnimatedFlexBox() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  
  const features = [
    {
      title: "Lightning Fast",
      description: "Optimized performance with instant response",
      icon: <Zap className="w-6 h-6" />,
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "High Precision",
      description: "Accuracy focused with detailed analytics",
      icon: <Target className="w-6 h-6" />,
      color: "from-red-400 to-pink-500",
    },
    {
      title: "Growth Focused",
      description: "Designed for scalability and expansion",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-green-400 to-emerald-500",
    },
    {
      title: "Innovative",
      description: "Cutting-edge technology implementation",
      icon: <Sparkles className="w-6 h-6" />,
      color: "from-purple-400 to-indigo-500",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Animated Flex Box Layout
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Interactive flex layout with smooth animations and responsive behavior
            </p>
          </motion.div>

          {/* Animated Flex Row */}
          <div className="flex flex-col lg:flex-row gap-8 mb-10">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2"
            >
              <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 h-full">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                  Interactive Features
                </h3>
                
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                        activeIndex === index
                          ? "bg-white dark:bg-gray-800 shadow-lg"
                          : "hover:bg-white/50 dark:hover:bg-gray-800/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg bg-linear-to-br ${feature.color}`}>
                          {feature.icon}
                        </div>
                        <div className="text-left">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                            {feature.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 transition-transform ${
                        activeIndex === index ? "rotate-90" : ""
                      }`} />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2"
            >
              <div className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-8 h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="h-full flex flex-col"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-4 rounded-xl bg-linear-to-br ${features[activeIndex].color}`}>
                        {features[activeIndex].icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                          {features[activeIndex].title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {features[activeIndex].description}
                        </p>
                      </div>
                    </div>

                    <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">
                        Detailed Information
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        This content area updates with smooth animations when you select different features.
                        The flex layout ensures optimal space utilization on all screen sizes.
                      </p>
                      
                      <div className="flex flex-wrap gap-3">
                        {["Feature A", "Feature B", "Feature C"].map((item, idx) => (
                          <motion.span
                            key={idx}
                            whileHover={{ scale: 1.1 }}
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 text-sm"
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Animated Flex Grid */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: item * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, 2, -2, 0]
                }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 min-w-[200px] max-w-[300px]"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4"
                  >
                    <span className="text-white text-xl font-bold">{item}</span>
                  </motion.div>
                  <h4 className="text-center font-bold text-gray-800 dark:text-gray-100 mb-2">
                    Animated Item {item}
                  </h4>
                  <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
                    Interactive flex item with hover animations
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.main>
  );
}