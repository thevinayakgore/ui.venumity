"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Zap, Target, TrendingUp, Sparkles, ChevronRight } from "lucide-react";

interface GridItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  cols: string;
}

export default function AnimatedResponsiveGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const items: GridItem[] = [
    {
      id: 1,
      title: "Performance Boost",
      description: "Advanced optimization for maximum speed",
      icon: <Zap className="w-8 h-8" />,
      color: "from-yellow-400 to-orange-500",
      cols: "md:col-span-2",
    },
    {
      id: 2,
      title: "Precision Tools",
      description: "Exact measurements and detailed analytics",
      icon: <Target className="w-8 h-8" />,
      color: "from-red-400 to-pink-500",
      cols: "md:col-span-1",
    },
    {
      id: 3,
      title: "Growth Analytics",
      description: "Comprehensive metrics for business expansion",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-green-400 to-emerald-500",
      cols: "md:col-span-1",
    },
    {
      id: 4,
      title: "Innovation Hub",
      description: "Cutting-edge technology and features",
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-purple-400 to-indigo-500",
      cols: "md:col-span-2",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Animated Responsive Grid
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Interactive responsive grid with smooth animations and adaptive layouts
            </p>
          </motion.div>

          {/* Animated Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: item.id * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setHoveredId(item.id)}
                onHoverEnd={() => setHoveredId(null)}
                className={`${item.cols} relative group`}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-linear-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl blur-xl"
                  style={{
                    background: (() => {
                      const parts = item.color?.split(' ') || [];
                      const start = parts[1]?.replace('from-', '');
                      const end = parts[3]?.replace('to-', '');
                      return start && end
                        ? `linear-gradient(to right, ${start}, ${end})`
                        : 'transparent';
                    })()
                  }}
                />
                
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 group-hover:border-transparent transition-all duration-300 h-full">
                  <div className="flex items-center justify-between mb-6">
                    <motion.div
                      animate={{ 
                        rotate: hoveredId === item.id ? [0, 10, -10, 0] : 0,
                        scale: hoveredId === item.id ? 1.1 : 1
                      }}
                      transition={{ duration: 0.5 }}
                      className={`p-3 rounded-xl bg-linear-to-br ${item.color}`}
                    >
                      {item.icon}
                    </motion.div>
                    <motion.div
                      animate={{ x: hoveredId === item.id ? 5 : 0 }}
                    >
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                    </motion.div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <motion.div
                    className={`h-1 w-0 group-hover:w-full bg-linear-to-r ${item.color} rounded-full transition-all duration-500`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Responsive Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {[
              { value: "99.9%", label: "Uptime", color: "bg-green-100 dark:bg-green-900/30" },
              { value: "<50ms", label: "Response", color: "bg-blue-100 dark:bg-blue-900/30" },
              { value: "24/7", label: "Support", color: "bg-purple-100 dark:bg-purple-900/30" },
              { value: "A+", label: "Security", color: "bg-orange-100 dark:bg-orange-900/30" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`${stat.color} rounded-xl p-4 text-center`}
              >
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Adaptive Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                Adaptive Features
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <motion.div
                    key={num}
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">{num}</span>
                    </div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200">
                      Feature {num}
                    </h4>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                Performance Metrics
              </h3>
              
              <div className="space-y-6">
                {[
                  { label: "Speed", value: 95, color: "from-green-500 to-emerald-500" },
                  { label: "Reliability", value: 99, color: "from-blue-500 to-cyan-500" },
                  { label: "Efficiency", value: 87, color: "from-purple-500 to-pink-500" },
                ].map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-200">{metric.label}</span>
                      <span className="text-gray-800 dark:text-gray-100 font-bold">{metric.value}%</span>
                    </div>
                    <div className="h-2 bg-white dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className={`h-full rounded-full bg-linear-to-r ${metric.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}