"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Search,
  Bell,
  User,
  Settings,
  Grid,
  BarChart3,
  Users,
  Package,
  Shield,
  Zap,
} from "lucide-react";

interface StatItem {
  id: number;
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

export default function PremiumCustomLayout() {
  const [activeNav, setActiveNav] = useState<string>("dashboard");

  const stats: StatItem[] = [
    {
      id: 1,
      title: "Revenue",
      value: "$48,560",
      change: "+12.5%",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 2,
      title: "Users",
      value: "8,426",
      change: "+24.3%",
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      title: "Orders",
      value: "1,248",
      change: "+8.7%",
      icon: <Package className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 4,
      title: "Growth",
      value: "94.2%",
      change: "+5.1%",
      icon: <Zap className="w-6 h-6" />,
      color: "from-orange-500 to-yellow-500",
    },
  ];

  const navItems: NavigationItem[] = [
    { id: "dashboard", label: "Dashboard", icon: <Grid className="w-5 h-5" /> },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      badge: 3,
    },
    { id: "users", label: "Users", icon: <Users className="w-5 h-5" /> },
    {
      id: "products",
      label: "Products",
      icon: <Package className="w-5 h-5" />,
    },
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
        <div className="bg-linear-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
          {/* Premium Header */}
          <div className="bg-linear-to-r from-gray-800 to-gray-900 border-b border-gray-700">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Premium Dashboard
                  </h1>
                  <p className="text-gray-400">
                    Advanced custom layout with comprehensive analytics and
                    premium features
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors">
                      <Bell className="w-6 h-6 text-gray-300" />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </button>

                    <button className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg transition-colors">
                      <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Premium Navigation */}
            <div className="lg:w-1/5 border-r border-gray-700 bg-gray-900/50">
              <nav className="p-4">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveNav(item.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all group ${
                          activeNav === item.id
                            ? "bg-linear-to-r from-blue-600/20 to-purple-600/20 text-white border-l-4 border-blue-500"
                            : "text-gray-400 hover:text-white hover:bg-gray-800"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              activeNav === item.id
                                ? "bg-linear-to-r from-blue-500 to-purple-500"
                                : "bg-gray-800 group-hover:bg-gray-700"
                            }`}
                          >
                            {item.icon}
                          </div>
                          <span className="font-medium">{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              activeNav === item.id
                                ? "bg-linear-to-r from-blue-500 to-purple-500"
                                : "bg-gray-800 text-gray-300"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Main Content Area */}
            <div className="lg:w-4/5">
              <div className="p-6">
                {/* Premium Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat) => (
                    <motion.div
                      key={stat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: stat.id * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-linear-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl rounded-xl" />
                      <div className="relative bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`p-3 rounded-xl bg-linear-to-br ${stat.color} bg-opacity-20`}
                          >
                            {stat.icon}
                          </div>
                          <span className="text-green-400 text-sm font-medium px-3 py-1 bg-green-900/30 rounded-full">
                            {stat.change}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {stat.value}
                        </h3>
                        <p className="text-gray-400">{stat.title}</p>

                        <motion.div
                          className="h-1 w-0 group-hover:w-full mt-4 bg-linear-to-r opacity-50 rounded-full transition-all duration-500"
                          style={{
                            background: (() => {
                              const parts = stat.color?.split(" ") || [];
                              const from =
                                parts[1]?.replace("from-", "") || "#000";
                              const to = parts[3]?.replace("to-", "") || "#fff";
                              return `linear-gradient(to right, ${from}, ${to})`;
                            })(),
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Premium Content Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                    >
                      <h2 className="text-xl font-bold text-white mb-6">
                        Performance Metrics
                      </h2>
                      <div className="space-y-4">
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
                          {
                            label: "Conversion Rate",
                            value: 78,
                            color: "from-orange-500 to-yellow-500",
                          },
                        ].map((metric, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-300">
                                {metric.label}
                              </span>
                              <span className="text-white font-medium">
                                {metric.value}%
                              </span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${metric.value}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                className={`h-full rounded-full bg-linear-to-r ${metric.color}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Column */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                  >
                    <h2 className="text-xl font-bold text-white mb-6">
                      Recent Activity
                    </h2>
                    <div className="space-y-4">
                      {[
                        {
                          user: "Alex Johnson",
                          action: "updated project settings",
                          time: "2 min ago",
                          color: "bg-blue-500",
                        },
                        {
                          user: "Sarah Miller",
                          action: "added new team member",
                          time: "15 min ago",
                          color: "bg-green-500",
                        },
                        {
                          user: "Mike Wilson",
                          action: "completed security audit",
                          time: "1 hour ago",
                          color: "bg-purple-500",
                        },
                        {
                          user: "Emma Davis",
                          action: "published new update",
                          time: "3 hours ago",
                          color: "bg-orange-500",
                        },
                        {
                          user: "David Brown",
                          action: "resolved critical issue",
                          time: "5 hours ago",
                          color: "bg-red-500",
                        },
                      ].map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 hover:bg-gray-800/30 rounded-lg transition-colors"
                        >
                          <div
                            className={`w-8 h-8 rounded-full ${activity.color} flex items-center justify-center`}
                          >
                            <span className="text-white text-xs font-bold">
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
                        </div>
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
