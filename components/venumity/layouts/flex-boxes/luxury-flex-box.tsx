"use client";
import { motion } from "framer-motion";
import {
  Crown,
  Gem,
  Sparkles,
  Award,
  Target,
  Zap,
  Users,
  BarChart3,
  ChevronRight,
} from "lucide-react";

interface LuxuryItem {
  id: number;
  title: string;
  subtitle: string;
  value: string;
  icon: React.ReactNode;
  gradient: string;
  accentColor: string;
}

export default function LuxuryFlexBox() {
  const luxuryItems: LuxuryItem[] = [
    {
      id: 1,
      title: "Executive Performance",
      subtitle: "Premium Metrics",
      value: "A+",
      icon: <Crown className="w-8 h-8" />,
      gradient: "from-yellow-400 via-orange-400 to-yellow-600",
      accentColor: "text-yellow-300",
    },
    {
      id: 2,
      title: "Portfolio Value",
      subtitle: "Total Assets",
      value: "$2.48M",
      icon: <Gem className="w-8 h-8" />,
      gradient: "from-blue-400 via-purple-400 to-blue-600",
      accentColor: "text-blue-300",
    },
    {
      id: 3,
      title: "Success Rate",
      subtitle: "Mission Critical",
      value: "99.8%",
      icon: <Target className="w-8 h-8" />,
      gradient: "from-green-400 via-emerald-400 to-green-600",
      accentColor: "text-green-300",
    },
    {
      id: 4,
      title: "VIP Clients",
      subtitle: "Exclusive Network",
      value: "248",
      icon: <Users className="w-8 h-8" />,
      gradient: "from-red-400 via-pink-400 to-red-600",
      accentColor: "text-pink-300",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border-2 border-transparent">
          {/* Luxury border animation */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent, #FFD700, #FFA500, #FFD700, transparent)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-[2px] rounded-3xl bg-linear-to-br from-gray-900 via-black to-gray-900" />
          </div>

          <div className="relative z-10 p-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12">
              <div className="flex items-center gap-4 mb-6 lg:mb-0">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-20 h-20 rounded-full bg-linear-to-r from-yellow-400 via-orange-400 to-yellow-600 flex items-center justify-center shadow-2xl shadow-yellow-500/30"
                  >
                    <Crown className="w-10 h-10 text-white" />
                  </motion.div>
                  <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-300" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold bg-linear-to-r from-yellow-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
                    Luxury Executive Dashboard
                  </h2>
                  <p className="text-gray-400 mt-2">
                    Exclusive access to premium metrics and insights
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Award className="w-8 h-8 text-yellow-400" />
                <span className="text-yellow-300 font-semibold">
                  VIP Access
                </span>
              </div>
            </div>

            {/* Luxury Metrics Flex Grid */}
            <div className="flex flex-col lg:flex-row flex-wrap gap-6 mb-12">
              {luxuryItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: item.id * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="lg:w-[calc(25%-18px)] flex-1 min-w-[250px]"
                >
                  <div className="relative group h-full">
                    {/* Glow effect */}
                    <div
                      className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl rounded-2xl"
                      style={{
                        background: `linear-gradient(to bottom right, ${
                          item.gradient?.split(" ")[1]?.replace("from-", "#") ??
                          "#ffaa00"
                        }, ${
                          item.gradient?.split(" ")[3]?.replace("to-", "#") ??
                          "#ff5500"
                        })`,
                      }}
                    />

                    <div className="relative bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 group-hover:border-gray-700 transition-all h-full">
                      <div className="flex items-start justify-between mb-6">
                        <div
                          className={`p-4 rounded-xl bg-linear-to-br ${item.gradient} shadow-lg`}
                        >
                          {item.icon}
                        </div>
                        <ChevronRight className="w-6 h-6 text-gray-500 group-hover:text-yellow-400 transition-colors" />
                      </div>

                      <div className="mb-4">
                        <h3 className="text-3xl font-bold text-white mb-2">
                          {item.value}
                        </h3>
                        <p
                          className={`text-lg font-semibold ${item.accentColor}`}
                        >
                          {item.title}
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          {item.subtitle}
                        </p>
                      </div>

                      <div
                        className="h-1 w-0 group-hover:w-full bg-linear-to-r opacity-50 rounded-full transition-all duration-500 mt-4"
                        style={{
                          background: `linear-gradient(to bottom right, ${
                            item.gradient
                              ?.split(" ")[1]
                              ?.replace("from-", "#") ?? "#ffaa00"
                          }, ${
                            item.gradient?.split(" ")[3]?.replace("to-", "#") ??
                            "#ff5500"
                          })`,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Luxury Content Flex Area */}
            <div className="flex flex-col xl:flex-row gap-8">
              {/* Left Panel - Performance */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="xl:w-2/3"
              >
                <div className="bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 h-full">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-bold bg-linear-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                        Performance Analysis
                      </h3>
                      <p className="text-gray-400">
                        Detailed metrics and growth indicators
                      </p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-yellow-400" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {[
                        {
                          label: "Revenue Growth",
                          value: 85,
                          color: "from-green-500 to-emerald-500",
                        },
                        {
                          label: "Market Share",
                          value: 42,
                          color: "from-blue-500 to-cyan-500",
                        },
                        {
                          label: "Innovation Score",
                          value: 78,
                          color: "from-purple-500 to-pink-500",
                        },
                      ].map((metric, index) => (
                        <div key={index} className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-300">
                              {metric.label}
                            </span>
                            <span className="text-white font-bold">
                              {metric.value}%
                            </span>
                          </div>
                          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
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

                    <div className="space-y-6">
                      {[
                        {
                          label: "Client Satisfaction",
                          value: 94,
                          color: "from-yellow-500 to-orange-500",
                        },
                        {
                          label: "Team Performance",
                          value: 88,
                          color: "from-red-500 to-pink-500",
                        },
                        {
                          label: "Risk Management",
                          value: 96,
                          color: "from-green-500 to-teal-500",
                        },
                      ].map((metric, index) => (
                        <div key={index} className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-300">
                              {metric.label}
                            </span>
                            <span className="text-white font-bold">
                              {metric.value}%
                            </span>
                          </div>
                          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${metric.value}%` }}
                              transition={{
                                duration: 1,
                                delay: (index + 3) * 0.2,
                              }}
                              className={`h-full rounded-full bg-linear-to-r ${metric.color}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Panel - Status */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="xl:w-1/3"
              >
                <div className="bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 h-full">
                  <div className="flex items-center gap-3 mb-8">
                    <Zap className="w-8 h-8 text-yellow-400" />
                    <h3 className="text-2xl font-bold bg-linear-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                      System Status
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        status: "All Systems",
                        value: "Operational",
                        color: "text-green-400",
                        bg: "bg-green-900/30",
                      },
                      {
                        status: "Security Level",
                        value: "Maximum",
                        color: "text-blue-400",
                        bg: "bg-blue-900/30",
                      },
                      {
                        status: "Performance",
                        value: "Optimal",
                        color: "text-yellow-400",
                        bg: "bg-yellow-900/30",
                      },
                      {
                        status: "Updates",
                        value: "Current",
                        color: "text-purple-400",
                        bg: "bg-purple-900/30",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-gray-900/50 hover:bg-gray-900/80 transition-colors"
                      >
                        <div>
                          <p className="text-gray-400 text-sm">{item.status}</p>
                          <p className={`text-lg font-bold ${item.color}`}>
                            {item.value}
                          </p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full ${item.bg} ${item.color} text-sm font-medium`}
                        >
                          Active
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* VIP Badge */}
                  <div className="mt-8 p-6 rounded-xl bg-linear-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-800/30">
                    <div className="flex items-center gap-3 mb-3">
                      <Crown className="w-6 h-6 text-yellow-400" />
                      <span className="text-white font-bold">
                        VIP Executive Access
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      You have premium access to all exclusive features,
                      priority support, and advanced analytics.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
