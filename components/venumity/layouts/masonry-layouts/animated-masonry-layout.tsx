"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Zap, Target, TrendingUp, Sparkles, Shield, Globe } from "lucide-react";

interface MasonryItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  height: string;
  delay: number;
}

export default function AnimatedMasonryLayout() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const items: MasonryItem[] = [
    {
      id: 1,
      title: "Performance Boost",
      description: "Advanced optimization techniques for maximum speed and efficiency",
      icon: <Zap className="w-6 h-6" />,
      color: "from-yellow-400 to-orange-500",
      height: "h-64",
      delay: 0.1,
    },
    {
      id: 2,
      title: "Precision Tools",
      description: "Exact measurements and detailed analytics for accurate results",
      icon: <Target className="w-6 h-6" />,
      color: "from-red-400 to-pink-500",
      height: "h-56",
      delay: 0.2,
    },
    {
      id: 3,
      title: "Growth Analytics",
      description: "Comprehensive metrics and insights for business expansion",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-green-400 to-emerald-500",
      height: "h-52",
      delay: 0.3,
    },
    {
      id: 4,
      title: "Innovation Hub",
      description: "Cutting-edge technology and experimental features",
      icon: <Sparkles className="w-6 h-6" />,
      color: "from-purple-400 to-indigo-500",
      height: "h-60",
      delay: 0.4,
    },
    {
      id: 5,
      title: "Security Suite",
      description: "Advanced protection systems and threat detection",
      icon: <Shield className="w-6 h-6" />,
      color: "from-blue-400 to-cyan-500",
      height: "h-48",
      delay: 0.5,
    },
    {
      id: 6,
      title: "Global Network",
      description: "Worldwide connectivity and distributed systems",
      icon: <Globe className="w-6 h-6" />,
      color: "from-teal-400 to-green-500",
      height: "h-68",
      delay: 0.6,
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
              Animated Masonry Layout
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Interactive masonry grid with smooth animations and hover effects
            </p>
          </motion.div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay }}
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setHoveredId(item.id)}
                onHoverEnd={() => setHoveredId(null)}
                className={`${item.height} mb-6 break-inside-avoid relative group`}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-linear-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl blur-xl"
                  style={(() => {
                    const parts = item.color?.split(" ") || [];
                    const from = parts[0]?.replace("from-", "") || "#000";
                    const to = parts[1]?.replace("to-", "") || "#000";
                    return { background: `linear-gradient(to right, ${from}, ${to})` };
                  })()}
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
                      className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    >
                      Featured
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

                  {/* Animated floating elements */}
                  <motion.div
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ 
                      y: hoveredId === item.id ? [0, -5, 0] : 0 
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-8 h-8 rounded-full bg-linear-to-r opacity-20"
                      style={(() => {
                        const parts = item.color?.split(" ") || [];
                        const from = parts[0]?.replace("from-", "") || "#000";
                        const to = parts[1]?.replace("to-", "") || "#000";
                        return { background: `linear-gradient(to right, ${from}, ${to})` };
                      })()}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.main>
  );
}