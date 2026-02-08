"use client";
import { motion } from "framer-motion";
import {
  Shield,
  Zap,
  Globe,
  Users,
  BarChart3,
  Settings,
  Bell,
  Home,
  LogOut,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}

export default function PremiumSidebarLayout() {
  const navItems: NavItem[] = [
    { id: "dashboard", icon: <Home className="w-6 h-6" />, label: "Dashboard" },
    {
      id: "analytics",
      icon: <BarChart3 className="w-6 h-6" />,
      label: "Analytics",
    },
    {
      id: "users",
      icon: <Users className="w-6 h-6" />,
      label: "Users",
      badge: 24,
    },
    {
      id: "performance",
      icon: <Zap className="w-6 h-6" />,
      label: "Performance",
    },
    { id: "security", icon: <Shield className="w-6 h-6" />, label: "Security" },
    { id: "global", icon: <Globe className="w-6 h-6" />, label: "Global" },
    {
      id: "notifications",
      icon: <Bell className="w-6 h-6" />,
      label: "Notifications",
      badge: 3,
    },
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
        <div className="bg-linear-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          <div className="flex">
            {/* Premium Sidebar */}
            <div className="w-1/5 bg-linear-to-b from-gray-800 to-gray-900 border-r border-gray-700">
              <div className="p-8">
                {/* User Profile */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-10"
                >
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-linear-to-r from-blue-500 to-purple-500 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">AJ</span>
                    </div>
                    <div className="absolute bottom-4 right-1/4 w-6 h-6 rounded-full bg-green-500 border-2 border-gray-900" />
                  </div>
                  <h3 className="text-xl font-bold text-white text-center">
                    Alex Johnson
                  </h3>
                  <p className="text-gray-400 text-center text-sm">
                    Executive Admin
                  </p>
                </motion.div>

                {/* Navigation */}
                <nav>
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <motion.li
                        key={item.id}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-800/50 transition-all group">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-gray-700">
                              {item.icon}
                            </div>
                            <span className="text-gray-300 group-hover:text-white font-medium">
                              {item.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.badge && (
                              <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                                {item.badge}
                              </span>
                            )}
                            <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
                          </div>
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Logout Button */}
                <motion.button
                  whileHover={{ x: 5 }}
                  className="w-full flex items-center gap-3 p-4 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-colors mt-10"
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
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-10">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-3">
                      Premium Dashboard
                    </h1>
                    <p className="text-gray-400">
                      Advanced analytics and management tools with premium
                      features
                    </p>
                  </div>
                  <div className="mt-4 lg:mt-0">
                    <div className="flex items-center gap-4">
                      <div className="px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl">
                        <span className="text-white font-semibold">
                          Premium Plan
                        </span>
                      </div>
                      <Bell className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Premium Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                  {[
                    {
                      title: "Revenue",
                      value: "$48,560",
                      change: "+12.5%",
                      gradient: "from-blue-500 to-cyan-500",
                    },
                    {
                      title: "Users",
                      value: "8,426",
                      change: "+24.3%",
                      gradient: "from-green-500 to-emerald-500",
                    },
                    {
                      title: "Performance",
                      value: "99.9%",
                      change: "+0.5%",
                      gradient: "from-purple-500 to-pink-500",
                    },
                    {
                      title: "Growth",
                      value: "156%",
                      change: "+18.2%",
                      gradient: "from-orange-500 to-red-500",
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
                            if (!stat.gradient) return undefined;
                            const parts = stat.gradient.split(" ");
                            const fromPart = parts[1]?.startsWith("from-")
                              ? "#" + parts[1].slice(5)
                              : "#000000";
                            const toPart = parts[3]?.startsWith("to-")
                              ? "#" + parts[3].slice(3)
                              : "#000000";
                            return `linear-gradient(to bottom right, ${fromPart}, ${toPart})`;
                          })(),
                        }}
                      />

                      <div className="relative bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-gray-300">{stat.title}</h3>
                          <span className="text-green-400 text-sm font-medium px-3 py-1 bg-green-900/30 rounded-full">
                            {stat.change}
                          </span>
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-2">
                          {stat.value}
                        </h4>
                        <div
                          className="h-1 w-0 group-hover:w-full bg-linear-to-r opacity-50 rounded-full transition-all duration-500"
                          style={{
                            background: (() => {
                              if (!stat.gradient) return undefined; // fallback if gradient is missing
                              const parts = stat.gradient.split(" ");
                              const fromPart = parts[1]?.startsWith("from-")
                                ? "#" + parts[1].slice(5)
                                : "#000000";
                              const toPart = parts[3]?.startsWith("to-")
                                ? "#" + parts[3].slice(3)
                                : "#000000";
                              return `linear-gradient(to right, ${fromPart}, ${toPart})`;
                            })(),
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Analytics Panel */}
                  <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold text-white">
                        Performance Analytics
                      </h2>
                      <BarChart3 className="w-8 h-8 text-blue-400" />
                    </div>

                    <div className="space-y-6">
                      {[
                        {
                          label: "Server Uptime",
                          value: 99.9,
                          color: "from-green-500 to-emerald-500",
                        },
                        {
                          label: "Response Time",
                          value: 45,
                          color: "from-blue-500 to-cyan-500",
                        },
                        {
                          label: "User Satisfaction",
                          value: 94,
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
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
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

                  {/* Recent Activity */}
                  <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold text-white">
                        Recent Activity
                      </h2>
                      <Bell className="w-8 h-8 text-yellow-400" />
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          user: "Alex Johnson",
                          action: "updated security settings",
                          time: "10:30 AM",
                        },
                        {
                          user: "Sarah Miller",
                          action: "added new team member",
                          time: "9:15 AM",
                        },
                        {
                          user: "Mike Wilson",
                          action: "completed performance review",
                          time: "Yesterday",
                        },
                        {
                          user: "Emma Davis",
                          action: "published new update",
                          time: "2 days ago",
                        },
                      ].map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 p-4 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white font-bold">
                              {activity.user
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-200">
                              <span className="font-medium">
                                {activity.user}
                              </span>{" "}
                              {activity.action}
                            </p>
                            <p className="text-gray-500 text-sm">
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
