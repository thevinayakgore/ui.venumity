"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Crown,
  Gem,
  Sparkles,
  Target,
  Zap,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  ChevronRight,
  Award,
  Shield,
} from "lucide-react";

interface LuxuryMetric {
  id: number;
  label: string;
  value: string;
  trend: "up" | "down";
  change: string;
  icon: React.ReactNode;
  gradient: string;
}

export default function LuxuryCustomLayout() {
  const [activeView, setActiveView] = useState<string>("executive");

  const metrics: LuxuryMetric[] = [
    {
      id: 1,
      label: "Portfolio Value",
      value: "$2.48M",
      trend: "up",
      change: "+12.4%",
      icon: <Gem className="w-6 h-6" />,
      gradient: "from-yellow-400 via-orange-400 to-yellow-600",
    },
    {
      id: 2,
      label: "VIP Clients",
      value: "248",
      trend: "up",
      change: "+8.2%",
      icon: <Crown className="w-6 h-6" />,
      gradient: "from-blue-400 via-purple-400 to-blue-600",
    },
    {
      id: 3,
      label: "Success Rate",
      value: "99.8%",
      trend: "up",
      change: "+0.4%",
      icon: <Target className="w-6 h-6" />,
      gradient: "from-green-400 via-emerald-400 to-green-600",
    },
    {
      id: 4,
      label: "Performance",
      value: "A+",
      trend: "up",
      change: "Perfect",
      icon: <Zap className="w-6 h-6" />,
      gradient: "from-red-400 via-pink-400 to-red-600",
    },
  ];

  const views = [
    {
      id: "executive",
      label: "Executive",
      icon: <Crown className="w-5 h-5" />,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    { id: "clients", label: "Clients", icon: <Users className="w-5 h-5" /> },
    { id: "security", label: "Security", icon: <Shield className="w-5 h-5" /> },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
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
          {/* Luxury gradient border */}
          <div className="absolute inset-0 rounded-3xl">
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

          <div className="relative z-10">
            {/* Luxury Header */}
            <div className="p-8 border-b border-gray-800">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-16 h-16 rounded-full bg-linear-to-r from-yellow-400 via-orange-400 to-yellow-600 flex items-center justify-center shadow-2xl shadow-yellow-500/30"
                    >
                      <Crown className="w-8 h-8 text-white" />
                    </motion.div>
                    <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-linear-to-r from-yellow-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
                      Luxury Executive Suite
                    </h1>
                    <p className="text-gray-400">
                      Premium dashboard for elite users
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent text-white placeholder-gray-600 backdrop-blur-sm"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="relative p-2 hover:bg-gray-800/50 rounded-xl transition-colors">
                      <Bell className="w-6 h-6 text-gray-300" />
                      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    </button>

                    <div className="w-10 h-10 rounded-full bg-linear-to-r from-yellow-500 to-orange-500 flex items-center justify-center cursor-pointer">
                      <span className="text-white font-bold">AJ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Luxury Navigation */}
              <div className="lg:w-1/5 p-6 border-r border-gray-800">
                <div className="space-y-1">
                  {views.map((view) => (
                    <motion.button
                      key={view.id}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveView(view.id)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                        activeView === view.id
                          ? "bg-linear-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20 text-yellow-300 border-l-4 border-yellow-500"
                          : "text-gray-400 hover:text-gray-300 hover:bg-gray-800/50"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          activeView === view.id
                            ? "bg-linear-to-r from-yellow-500 to-orange-500"
                            : "bg-gray-800"
                        }`}
                      >
                        {view.icon}
                      </div>
                      <span className="font-medium">{view.label}</span>
                      {activeView === view.id && (
                        <ChevronRight className="ml-auto w-4 h-4" />
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Luxury Badge */}
                <div className="mt-8 p-4 rounded-xl bg-linear-to-br from-gray-800/50 to-gray-900/50 border border-gray-800">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="w-6 h-6 text-yellow-400" />
                    <span className="text-white font-medium">VIP Status</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    You have access to all premium features and priority
                    support.
                  </p>
                </div>
              </div>

              {/* Main Luxury Content */}
              <div className="lg:w-4/5 p-6">
                {/* Luxury Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {metrics.map((metric) => (
                    <motion.div
                      key={metric.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: metric.id * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="relative group"
                    >
                      {/* Glow effect */}
                      <div
                        className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl rounded-2xl"
                        style={{
                          background: (() => {
                            const gradient = metric.gradient ?? "";
                            const parts = gradient.split(" ");

                            // Extract utilities if present
                            const from =
                              parts
                                .find((p) => p.startsWith("from-"))
                                ?.replace("from-", "") ?? "#000";
                            const to =
                              parts
                                .find((p) => p.startsWith("to-"))
                                ?.replace("to-", "") ?? "#fff";

                            return `linear-gradient(to bottom right, ${from}, ${to})`;
                          })(),
                        }}
                      />

                      <div className="relative bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 group-hover:border-gray-700 transition-all">
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className="p-3 rounded-xl bg-linear-to-br bg-opacity-20"
                            style={{
                              background: (() => {
                                const gradient = metric.gradient ?? "";
                                const parts = gradient.split(" ");

                                const from =
                                  parts
                                    .find((p) => p.startsWith("from-"))
                                    ?.replace("from-", "") ?? "#000";
                                const to =
                                  parts
                                    .find((p) => p.startsWith("to-"))
                                    ?.replace("to-", "") ?? "#fff";

                                return `linear-gradient(to bottom right, ${from}, ${to})`;
                              })(),
                            }}
                          >
                            {metric.icon}
                          </div>
                          <span
                            className={`text-sm font-medium px-3 py-1 rounded-full ${
                              metric.trend === "up"
                                ? "text-green-400 bg-green-900/30"
                                : "text-red-400 bg-red-900/30"
                            }`}
                          >
                            {metric.change}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {metric.value}
                        </h3>
                        <p className="text-gray-400">{metric.label}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Luxury Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Performance */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold bg-linear-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                        Performance Insights
                      </h2>
                      <Sparkles className="w-6 h-6 text-yellow-400" />
                    </div>

                    <div className="space-y-6">
                      {[
                        {
                          label: "Market Growth",
                          value: 85,
                          color: "from-green-500 to-emerald-500",
                        },
                        {
                          label: "Client Satisfaction",
                          value: 94,
                          color: "from-blue-500 to-cyan-500",
                        },
                        {
                          label: "Risk Assessment",
                          value: 22,
                          color: "from-yellow-500 to-orange-500",
                        },
                        {
                          label: "Innovation Index",
                          value: 78,
                          color: "from-purple-500 to-pink-500",
                        },
                      ].map((item, index) => (
                        <div key={index} className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-300">{item.label}</span>
                            <span className="text-white font-bold">
                              {item.value}%
                            </span>
                          </div>
                          <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.value}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                              className={`h-full rounded-full bg-linear-to-r ${item.color}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Right Column - Recent Activity */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold bg-linear-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                        VIP Activity
                      </h2>
                      <Crown className="w-6 h-6 text-yellow-400" />
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          user: "Alexander Johnson",
                          role: "CEO",
                          action: "approved $2M investment",
                          time: "10:30 AM",
                          verified: true,
                        },
                        {
                          user: "Sophia Williams",
                          role: "CFO",
                          action: "reviewed quarterly reports",
                          time: "9:15 AM",
                          verified: true,
                        },
                        {
                          user: "Michael Chen",
                          role: "CTO",
                          action: "deployed security update",
                          time: "Yesterday",
                          verified: true,
                        },
                        {
                          user: "Emma Rodriguez",
                          role: "COO",
                          action: "optimized operations",
                          time: "2 days ago",
                          verified: true,
                        },
                      ].map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-800/50 transition-colors group"
                        >
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-linear-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                              <span className="text-white font-bold">
                                {activity.user
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            {activity.verified && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-white font-medium">
                                {activity.user}
                              </h4>
                              <span className="text-xs px-2 py-1 bg-yellow-900/30 text-yellow-300 rounded-full">
                                {activity.role}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm">
                              {activity.action}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                              {activity.time}
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-yellow-400 transition-colors" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
