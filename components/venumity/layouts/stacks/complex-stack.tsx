"use client";
import { motion } from "framer-motion";
import {
  Crown,
  Gem,
  Sparkles,
  Target,
  Zap,
  Users,
  BarChart3,
  Award,
  ChevronRight,
} from "lucide-react";

interface ComplexLayoutItem {
  id: number;
  title: string;
  subtitle: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  accentColor: string;
  stats: { label: string; value: string }[];
}

const items: ComplexLayoutItem[] = [
  {
    id: 1,
    title: "Executive Portfolio",
    subtitle: "Wealth Management",
    value: "$2.48M",
    description: "Premium investment portfolio with real-time market analysis",
    icon: <Crown className="w-10 h-10" />,
    gradient: "from-yellow-400 via-orange-400 to-yellow-600",
    accentColor: "text-yellow-300",
    stats: [
      { label: "Monthly Growth", value: "8.7%" },
      { label: "Risk Level", value: "Low" },
    ],
  },
  {
    id: 2,
    title: "Diamond Security",
    subtitle: "Maximum Protection",
    value: "A+",
    description: "Military-grade security suite with quantum encryption",
    icon: <Gem className="w-10 h-10" />,
    gradient: "from-blue-400 via-purple-400 to-blue-600",
    accentColor: "text-blue-300",
    stats: [
      { label: "Threats Blocked", value: "48.7K" },
      { label: "Response Time", value: "<10ms" },
    ],
  },
  {
    id: 3,
    title: "Performance Suite",
    subtitle: "Elite Optimization",
    value: "99.8%",
    description: "Advanced performance monitoring and optimization tools",
    icon: <Target className="w-10 h-10" />,
    gradient: "from-green-400 via-emerald-400 to-green-600",
    accentColor: "text-green-300",
    stats: [
      { label: "Uptime", value: "99.99%" },
      { label: "Speed Index", value: "0.8s" },
    ],
  },
  {
    id: 4,
    title: "VIP Network",
    subtitle: "Exclusive Community",
    value: "248",
    description: "Premium network of elite professionals and executives",
    icon: <Users className="w-10 h-10" />,
    gradient: "from-red-400 via-pink-400 to-red-600",
    accentColor: "text-pink-300",
    stats: [
      { label: "Countries", value: "89" },
      { label: "Growth Rate", value: "24%" },
    ],
  },
];

export default function ComplexStack() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border-2 border-transparent">
          {/* Luxury animated border */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, #FFD700, #FFA500, #FFD700, transparent)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0.5 rounded-3xl bg-linear-to-br from-gray-900 via-black to-gray-900" />

          <div className="relative z-10 p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-16 h-16 rounded-full bg-linear-to-r from-yellow-400 via-orange-400 to-yellow-600 flex items-center justify-center"
                  >
                    <Crown className="w-8 h-8 text-white" />
                  </motion.div>
                  <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold bg-linear-to-r from-yellow-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
                    Luxury Stack Suite
                  </h2>
                  <p className="text-gray-400">
                    Exclusive premium features for elite users
                  </p>
                </div>
              </div>
              <Award className="w-10 h-10 text-yellow-400" />
            </div>

            {/* Luxury Stack Items */}
            <div className="space-y-6">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: item.id * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl rounded-2xl"
                    style={{
                      background: `linear-gradient(to bottom right, ${
                        item.gradient?.split(" ")[1]?.replace("from-", "#") ||
                        "#ffffff"
                      }, ${
                        item.gradient?.split(" ")[3]?.replace("to-", "#") ||
                        "#000000"
                      })`,
                    }}
                  />

                  <div className="relative bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 group-hover:border-gray-700 transition-all">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-4 rounded-xl bg-linear-to-br ${item.gradient} shadow-2xl`}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-white">
                              {item.title}
                            </h3>
                            <span
                              className={`text-sm font-medium px-3 py-1 rounded-full ${item.accentColor} bg-opacity-20`}
                            >
                              {item.subtitle}
                            </span>
                          </div>
                          <p className="text-gray-400">{item.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-3xl font-bold text-white mb-1">
                            {item.value}
                          </div>
                          <BarChart3 className="w-5 h-5 text-green-400 ml-auto" />
                        </div>
                        <ChevronRight className="w-6 h-6 text-gray-500 group-hover:text-yellow-400 transition-colors" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {item.stats.map((stat, index) => (
                        <div
                          key={index}
                          className="bg-gray-900/50 rounded-xl p-4"
                        >
                          <p className="text-gray-400 text-sm mb-1">
                            {stat.label}
                          </p>
                          <p className="text-white font-bold text-lg">
                            {stat.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-800">
                      <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <span className="text-gray-300 text-sm">
                          VIP Feature
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-full bg-linear-to-r from-blue-500 to-purple-500 border-2 border-gray-900"
                            />
                          ))}
                        </div>
                        <span className="text-gray-400 text-sm">
                          +{item.id * 12} users
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Luxury Footer */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-12 h-12 rounded-full bg-linear-to-r from-yellow-400 to-orange-400 flex items-center justify-center"
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-gray-300 font-medium">
                      Premium Luxury Suite
                    </p>
                    <p className="text-gray-500 text-sm">
                      Exclusive access to all premium features
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {[
                    { value: "4", label: "Premium Items" },
                    { value: "99.9%", label: "Uptime" },
                    { value: "VIP", label: "Access" },
                    { value: "A+", label: "Rating" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <p className="text-2xl font-bold text-white">
                        {stat.value}
                      </p>
                      <p className="text-gray-500 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
