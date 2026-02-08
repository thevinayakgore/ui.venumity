"use client";
import { motion } from "framer-motion";
import {
  Crown,
  Gem,
  Sparkles,
  Target,
  Users,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  Globe,
  Shield,
  Award,
} from "lucide-react";

interface LuxuryNavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  badge?: string;
}

export default function LuxurySidebarLayout() {
  const navItems: LuxuryNavItem[] = [
    {
      id: "dashboard",
      icon: <Crown className="w-6 h-6" />,
      label: "Executive",
    },
    { id: "portfolio", icon: <Gem className="w-6 h-6" />, label: "Portfolio" },
    {
      id: "performance",
      icon: <Target className="w-6 h-6" />,
      label: "Performance",
      badge: "A+",
    },
    { id: "network", icon: <Users className="w-6 h-6" />, label: "Network" },
    {
      id: "analytics",
      icon: <BarChart3 className="w-6 h-6" />,
      label: "Analytics",
    },
    { id: "security", icon: <Shield className="w-6 h-6" />, label: "Security" },
    { id: "global", icon: <Globe className="w-6 h-6" />, label: "Global" },
    {
      id: "settings",
      icon: <Settings className="w-6 h-6" />,
      label: "Settings",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-8xl mx-auto">
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
          <div className="absolute inset-[2px] rounded-3xl bg-linear-to-br from-gray-900 via-black to-gray-900" />

          <div className="relative z-10 flex">
            {/* Luxury Sidebar */}
            <div className="w-1/5 bg-linear-to-b from-gray-900 to-black border-r border-gray-800">
              <div className="p-8">
                {/* User Profile */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-12 text-center"
                >
                  <div className="relative mx-auto w-28 h-28 mb-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 rounded-full bg-linear-to-r from-yellow-400 via-orange-400 to-yellow-600"
                    />
                    <div className="absolute inset-2 rounded-full bg-linear-to-br from-gray-900 to-black flex items-center justify-center">
                      <span className="text-yellow-300 text-3xl font-bold">
                        AJ
                      </span>
                    </div>
                    <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Alexander Johnson
                  </h3>
                  <p className="text-yellow-400 text-sm">VIP Executive</p>
                  <div className="mt-3 inline-flex items-center gap-2 px-4 py-1 bg-yellow-900/30 rounded-full">
                    <Award className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-300 text-sm">
                      Premium Member
                    </span>
                  </div>
                </motion.div>

                {/* Navigation */}
                <nav>
                  <ul className="space-y-3">
                    {navItems.map((item) => (
                      <motion.li
                        key={item.id}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-800/50 transition-all group">
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-linear-to-br from-gray-800 to-gray-900 group-hover:from-yellow-900/30 group-hover:to-orange-900/30">
                              {item.icon}
                            </div>
                            <span className="text-gray-300 group-hover:text-yellow-300 font-medium">
                              {item.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.badge && (
                              <span className="px-3 py-1 bg-linear-to-r from-yellow-500 to-orange-500 text-white text-xs rounded-full font-bold">
                                {item.badge}
                              </span>
                            )}
                            <div className="w-2 h-2 rounded-full bg-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Stats */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Status</span>
                      <span className="text-green-400 text-sm font-medium">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">
                        Access Level
                      </span>
                      <span className="text-yellow-300 text-sm font-bold">
                        VIP
                      </span>
                    </div>
                  </div>
                </div>

                {/* Logout */}
                <motion.button
                  whileHover={{ x: 5 }}
                  className="w-full flex items-center gap-3 p-4 text-gray-400 hover:text-yellow-300 hover:bg-gray-800/50 rounded-xl transition-colors mt-8"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </motion.button>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-4/5">
              <div className="p-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12">
                  <div className="flex items-center gap-4 mb-6 lg:mb-0">
                    <div
                      className={`p-4 rounded-xl bg-linear-to-r from-yellow-500 to-orange-500`}
                    >
                      <Crown className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold bg-linear-to-r from-yellow-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
                        Luxury Executive Suite
                      </h1>
                      <p className="text-gray-400">
                        Premium dashboard for elite decision makers
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Bell className="w-7 h-7 text-gray-400" />
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    </div>
                    <div className="px-6 py-3 bg-linear-to-r from-yellow-600 to-orange-600 rounded-xl">
                      <span className="text-white font-bold">VIP Access</span>
                    </div>
                  </div>
                </div>

                {/* Luxury Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {[
                    {
                      title: "Portfolio Value",
                      value: "$2.48M",
                      change: "+12.4%",
                      gradient: "from-yellow-400 via-orange-400 to-yellow-600",
                    },
                    {
                      title: "VIP Clients",
                      value: "248",
                      change: "+8.2%",
                      gradient: "from-blue-400 via-purple-400 to-blue-600",
                    },
                    {
                      title: "Success Rate",
                      value: "99.8%",
                      change: "+0.4%",
                      gradient: "from-green-400 via-emerald-400 to-green-600",
                    },
                    {
                      title: "Growth Index",
                      value: "156%",
                      change: "+18.7%",
                      gradient: "from-red-400 via-pink-400 to-red-600",
                    },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="relative group"
                    >
                      <div
                        className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl rounded-2xl"
                        style={{
                          background: (() => {
                            if (!stat.gradient) return undefined; // fallback if gradient is missing
                            const parts = stat.gradient.split(" ");
                            const fromColor = parts[1]?.startsWith("from-")
                              ? "#" + parts[1].slice(5)
                              : "#000000";
                            const toColor = parts[3]?.startsWith("to-")
                              ? "#" + parts[3].slice(3)
                              : "#000000";
                            return `linear-gradient(to bottom right, ${fromColor}, ${toColor})`;
                          })(),
                        }}
                      />

                      <div className="relative bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 group-hover:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-gray-300">{stat.title}</h3>
                          <span className="text-green-400 text-sm font-medium px-3 py-1 bg-green-900/30 rounded-full">
                            {stat.change}
                          </span>
                        </div>
                        <h4 className="text-3xl font-bold text-white mb-2">
                          {stat.value}
                        </h4>
                        <div
                          className="h-1 w-0 group-hover:w-full bg-linear-to-r opacity-50 rounded-full transition-all duration-500"
                          style={{
                            background: (() => {
                              if (!stat.gradient) return undefined; // fallback if gradient missing
                              const parts = stat.gradient.split(" ");
                              const fromColor = parts[1]?.startsWith("from-")
                                ? "#" + parts[1].slice(5)
                                : "#000000";
                              const toColor = parts[3]?.startsWith("to-")
                                ? "#" + parts[3].slice(3)
                                : "#000000";
                              return `linear-gradient(to right, ${fromColor}, ${toColor})`;
                            })(),
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Performance Analysis */}
                  <div className="bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-2xl font-bold bg-linear-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                          Performance Analysis
                        </h2>
                        <p className="text-gray-400">
                          Detailed metrics and growth indicators
                        </p>
                      </div>
                      <BarChart3 className="w-10 h-10 text-yellow-400" />
                    </div>

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
                          label: "Client Satisfaction",
                          value: 94,
                          color: "from-yellow-500 to-orange-500",
                        },
                        {
                          label: "Risk Management",
                          value: 96,
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
                  </div>

                  {/* VIP Activity */}
                  <div className="bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-2xl font-bold bg-linear-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                          VIP Activity
                        </h2>
                        <p className="text-gray-400">
                          Recent actions from executive team
                        </p>
                      </div>
                      <Users className="w-10 h-10 text-yellow-400" />
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
                          className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 hover:bg-gray-900/80 transition-colors group"
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
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
