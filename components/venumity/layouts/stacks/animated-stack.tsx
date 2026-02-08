"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Zap, Target, TrendingUp, Sparkles, ChevronRight } from "lucide-react";

interface StackItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  delay: number;
}

export default function AnimatedStack() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const items: StackItem[] = [
    {
      id: 1,
      title: "Performance Boost",
      description:
        "Advanced optimization techniques for maximum speed and efficiency",
      icon: <Zap className="w-6 h-6" />,
      color: "from-yellow-400 to-orange-500",
      delay: 0.1,
    },
    {
      id: 2,
      title: "Precision Analytics",
      description:
        "Detailed insights and metrics for data-driven decision making",
      icon: <Target className="w-6 h-6" />,
      color: "from-red-400 to-pink-500",
      delay: 0.2,
    },
    {
      id: 3,
      title: "Growth Tracking",
      description:
        "Monitor progress and growth with comprehensive tracking tools",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-green-400 to-emerald-500",
      delay: 0.3,
    },
    {
      id: 4,
      title: "Innovation Engine",
      description: "Cutting-edge features and experimental capabilities",
      icon: <Sparkles className="w-6 h-6" />,
      color: "from-purple-400 to-indigo-500",
      delay: 0.4,
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Animated Stack Layout
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Interactive stack layout with smooth animations and hover effects
            </p>
          </motion.div>

          <div className="space-y-6">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay }}
                whileHover={{ scale: 1.02, x: 5 }}
                onHoverStart={() => setHoveredId(item.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="relative group"
              >
                {/* Glow effect */}
                <div
                  className="absolute inset-0 bg-linear-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl blur-xl"
                  style={{
                    background: (() => {
                      const parts = item.color?.split(' ') || [];
                      const fromColor = parts[0]?.replace?.('from-', '#') || '#ffffff';
                      const toColor = parts[1]?.replace?.('to-', '#') || '#000000';
                      return `linear-gradient(to right, ${fromColor}, ${toColor})`;
                    })(),
                  }}
                />

                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 group-hover:border-transparent transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div
                        animate={{
                          rotate: hoveredId === item.id ? [0, 10, -10, 0] : 0,
                          scale: hoveredId === item.id ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.5 }}
                        className={`p-3 rounded-xl bg-linear-to-br ${item.color}`}
                      >
                        {item.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <motion.div
                      animate={{ x: hoveredId === item.id ? 5 : 0 }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {item.id}/4
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                    </motion.div>
                  </div>

                  <motion.div
                    className={`h-1 w-0 group-hover:w-full mt-4 bg-linear-to-r ${item.color} rounded-full transition-all duration-500`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.main>
  );
}
