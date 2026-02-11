"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Zap, Target, TrendingUp, Sparkles, ChevronRight } from "lucide-react";

interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const features: FeatureItem[] = [
  {
    id: 0,
    title: "Lightning Performance",
    description: "Optimized for maximum speed and efficiency with advanced caching",
    icon: <Zap className="w-8 h-8" />,
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: 1,
    title: "Precision Analytics",
    description: "Detailed insights and metrics for data-driven decision making",
    icon: <Target className="w-8 h-8" />,
    color: "from-red-400 to-pink-500",
  },
  {
    id: 2,
    title: "Growth Tracking",
    description: "Monitor progress and growth with comprehensive tracking tools",
    icon: <TrendingUp className="w-8 h-8" />,
    color: "from-green-400 to-emerald-500",
  },
  {
    id: 3,
    title: "Innovation Engine",
    description: "Cutting-edge features and experimental capabilities",
    icon: <Sparkles className="w-8 h-8" />,
    color: "from-purple-400 to-indigo-500",
  },
];

export default function AnimatedSplitLayout() {
  const [activeFeature, setActiveFeature] = useState<number>(0);


  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-8xl mx-auto">
        <div className="bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Panel - Features List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-2/5 bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-12"
            >
              <div className="max-w-lg mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
                  Interactive Features
                </h2>
                
                <div className="space-y-4">
                  {features.map((feature) => (
                    <motion.button
                      key={feature.id}
                      onClick={() => setActiveFeature(feature.id)}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center justify-between p-6 rounded-2xl transition-all ${
                        activeFeature === feature.id
                          ? "bg-white dark:bg-gray-800 shadow-xl"
                          : "hover:bg-white/50 dark:hover:bg-gray-800/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-linear-to-br ${feature.color}`}>
                          {feature.icon}
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {feature.description.substring(0, 50)}...
                          </p>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 transition-transform ${
                        activeFeature === feature.id ? "rotate-90" : ""
                      }`} />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Panel - Feature Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-3/5 bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-12"
            >
              <div className="max-w-2xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="h-full"
                  >
                    <div className="flex items-center gap-6 mb-10">
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`p-5 rounded-2xl bg-linear-to-br ${features[activeFeature].color}`}
                      >
                        {features[activeFeature].icon}
                      </motion.div>
                      <div>
                        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
                          {features[activeFeature].title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                          Advanced feature with detailed capabilities
                        </p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                        Detailed Overview
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        {features[activeFeature].description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {["Advanced Configuration", "Real-time Updates", "Performance Metrics", "Custom Integration"].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-linear-to-r from-blue-500 to-purple-500" />
                              <h4 className="font-semibold text-gray-700 dark:text-gray-200">{item}</h4>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                              Feature capability and benefits
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Performance Metrics
                      </h3>
                      {[
                        { label: "Speed Improvement", value: 85, color: "from-green-500 to-emerald-500" },
                        { label: "Accuracy Rate", value: 94, color: "from-blue-500 to-cyan-500" },
                        { label: "User Adoption", value: 78, color: "from-purple-500 to-pink-500" },
                      ].map((metric, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-700 dark:text-gray-200">{metric.label}</span>
                            <span className="text-gray-800 dark:text-gray-100 font-bold">{metric.value}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${metric.value}%` }}
                              transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                              className={`h-full rounded-full bg-linear-to-r ${metric.color}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}