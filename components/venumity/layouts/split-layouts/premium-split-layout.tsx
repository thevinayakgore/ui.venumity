"use client";
import { motion } from "framer-motion";
import { Shield, Zap, Globe, Users, BarChart3, TrendingUp, Award, Settings } from "lucide-react";

interface MetricItem {
  id: number;
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  gradient: string;
}

export default function PremiumSplitLayout() {
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
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-8xl mx-auto">
        <div className="bg-linear-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Panel - Analytics */}
            <div className="lg:w-1/2 bg-linear-to-br from-gray-800 to-gray-900 p-12">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-4 rounded-xl bg-linear-to-r from-blue-500 to-cyan-500">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">Advanced Analytics</h2>
                    <p className="text-gray-400">Real-time metrics and insights</p>
                  </div>
                </div>

                {/* Premium Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  {metrics.map((metric) => (
                    <motion.div
                      key={metric.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: metric.id * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="relative group"
                    >
                     <div
  className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl rounded-2xl"
  style={{
    background: (() => {
      if (!metric.gradient) return "linear-gradient(to bottom right, #000, #111)";
      const parts = metric.gradient.split(" ");
      const fromColor = parts[1]?.replace("from-", "#") || "#000";
      const toColor = parts[3]?.replace("to-", "#") || "#111";
      return `linear-gradient(to bottom right, ${fromColor}, ${toColor})`;
    })(),
  }}
/>
                      
                      <div className="relative bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-xl bg-linear-to-br ${metric.gradient}`}>
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
                          style={{
                            background: (() => {
                              if (!metric.gradient) return "linear-gradient(to bottom right, #000, #111)";
                              const parts = metric.gradient.split(" ");
                              const fromColor = parts[1]?.replace("from-", "#") || "#000";
                              const toColor = parts[3]?.replace("to-", "#") || "#111";
                              return `linear-gradient(to bottom right, ${fromColor}, ${toColor})`;
                            })(),
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Performance Charts */}
                <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                  <h3 className="text-2xl font-bold text-white mb-6">Performance Trends</h3>
                  <div className="space-y-6">
                    {[
                      { label: "Revenue Growth", value: 85, color: "from-green-500 to-emerald-500" },
                      { label: "User Engagement", value: 92, color: "from-blue-500 to-cyan-500" },
                      { label: "System Uptime", value: 99.9, color: "from-purple-500 to-pink-500" },
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
                </div>
              </div>
            </div>

            {/* Right Panel - Management */}
            <div className="lg:w-1/2 bg-linear-to-br from-gray-900 to-black p-12">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-4 rounded-xl bg-linear-to-r from-purple-500 to-pink-500">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">Management Suite</h2>
                    <p className="text-gray-400">Control panel and configurations</p>
                  </div>
                </div>

                {/* System Status */}
                <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 mb-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">System Status</h3>
                    <TrendingUp className="w-6 h-6 text-green-400" />
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
                          <p className="text-lg font-bold text-white">{item.value}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${item.color}`}>
                          Active
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">Recent Activity</h3>
                    <Award className="w-6 h-6 text-yellow-400" />
                  </div>

                  <div className="space-y-4">
                    {[
                      { user: "Alex Johnson", action: "updated security settings", time: "10:30 AM" },
                      { user: "Sarah Miller", action: "added new team member", time: "9:15 AM" },
                      { user: "Mike Wilson", action: "deployed update", time: "Yesterday" },
                      { user: "Emma Davis", action: "optimized performance", time: "2 days ago" },
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
                            {activity.user.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-200">
                            <span className="font-medium">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-gray-500 text-sm">{activity.time}</p>
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
    </motion.main>
  );
}