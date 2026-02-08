"use client";
import { motion } from "framer-motion";
import { Shield, Zap, Globe, Users, BarChart3, TrendingUp, Award } from "lucide-react";

interface MetricItem {
  id: number;
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  gradient: string;
}

export default function PremiumGrid() {
  const metrics: MetricItem[] = [
    {
      id: 1,
      title: "Security Score",
      value: "98.7%",
      change: "+2.3%",
      icon: <Shield className="w-8 h-8" />,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Performance",
      value: "99.9%",
      change: "+0.5%",
      icon: <Zap className="w-8 h-8" />,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: 3,
      title: "Global Reach",
      value: "186",
      change: "+24",
      icon: <Globe className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 4,
      title: "User Growth",
      value: "42.5K",
      change: "+18.2%",
      icon: <Users className="w-8 h-8" />,
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      title: "Revenue",
      value: "$1.2M",
      change: "+24.7%",
      icon: <BarChart3 className="w-8 h-8" />,
      gradient: "from-teal-500 to-green-500",
    },
    {
      id: 6,
      title: "Satisfaction",
      value: "96.4%",
      change: "+3.8%",
      icon: <TrendingUp className="w-8 h-8" />,
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-linear-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 border border-gray-700">
          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Premium Grid Dashboard
              </h2>
              <p className="text-gray-400 max-w-2xl">
                Advanced grid system with premium metrics, detailed analytics, and professional layout
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex items-center gap-4">
              <Award className="w-8 h-8 text-yellow-400" />
              <div className="px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl">
                <span className="text-white font-semibold">Premium Plan</span>
              </div>
            </div>
          </div>

          {/* Premium Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {metrics.map((metric) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: metric.id * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl rounded-2xl"
                  style={{ background: (() => {
                    const g = metric.gradient ?? "";
                    const parts = g.split(" ");
                    const from = parts[1]?.replace("from-", "") ?? "#ffaa00";
                    const to = parts[3]?.replace("to-", "") ?? "#ff5500";
                    return `linear-gradient(to bottom right, ${from}, ${to})`;
                  })(), }}
                />
                
                <div className="relative bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 group-hover:border-gray-600 transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-xl bg-linear-to-br ${metric.gradient}`}>
                      {metric.icon}
                    </div>
                    <span className="text-green-400 text-sm font-medium px-3 py-1 bg-green-900/30 rounded-full">
                      {metric.change}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{metric.value}</h3>
                  <p className="text-gray-400">{metric.title}</p>
                  
                  <motion.div
                    className="h-1 w-0 group-hover:w-full mt-4 bg-linear-to-r opacity-50 rounded-full transition-all duration-500"
                    style={{ background: (() => {
                        const g = metric.gradient ?? "";
                        const parts = g.split(" ");
                        const from = parts[1]?.replace("from-", "") ?? "#ffaa00";
                        const to = parts[3]?.replace("to-", "") ?? "#ff5500";
                        return `linear-gradient(to bottom right, ${from}, ${to})`;
                      })(), }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Premium Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Analytics Panel */}
            <div className="lg:col-span-2">
              <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 h-full">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Advanced Analytics</h3>
                    <p className="text-gray-400">Real-time performance metrics and insights</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-400" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {[
                      { label: "Server Uptime", value: 99.9, color: "from-green-500 to-emerald-500" },
                      { label: "Response Time", value: 45, color: "from-blue-500 to-cyan-500" },
                      { label: "Cache Hit Ratio", value: 92, color: "from-purple-500 to-pink-500" },
                    ].map((metric, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300">{metric.label}</span>
                          <span className="text-white font-bold">{metric.value}%</span>
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

                  <div className="space-y-6">
                    {[
                      { label: "User Satisfaction", value: 94, color: "from-yellow-500 to-orange-500" },
                      { label: "Feature Adoption", value: 78, color: "from-red-500 to-pink-500" },
                      { label: "Growth Rate", value: 156, color: "from-teal-500 to-green-500" },
                    ].map((metric, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300">{metric.label}</span>
                          <span className="text-white font-bold">{metric.value}%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.value > 100 ? 100 : metric.value}%` }}
                            transition={{ duration: 1, delay: (index + 3) * 0.2 }}
                            className={`h-full rounded-full bg-linear-to-r ${metric.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Status Panel */}
            <div>
              <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <Zap className="w-8 h-8 text-yellow-400" />
                  <h3 className="text-2xl font-bold text-white">System Status</h3>
                </div>

                <div className="space-y-6">
                  {[
                    { status: "All Systems", value: "Operational", color: "bg-green-900/30 text-green-400" },
                    { status: "Security", value: "Active", color: "bg-blue-900/30 text-blue-400" },
                    { status: "Performance", value: "Optimal", color: "bg-yellow-900/30 text-yellow-400" },
                    { status: "Updates", value: "Current", color: "bg-purple-900/30 text-purple-400" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
                    >
                      <div>
                        <p className="text-gray-400 text-sm">{item.status}</p>
                        <p className="text-lg font-bold">{item.value}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${item.color}`}>
                        Active
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Premium Badge */}
                <div className="mt-8 p-6 rounded-xl bg-linear-to-br from-blue-900/20 to-purple-900/20 border border-blue-800/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="w-6 h-6 text-blue-400" />
                    <span className="text-white font-bold">Premium Features</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Access to advanced analytics, priority support, and exclusive tools
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}