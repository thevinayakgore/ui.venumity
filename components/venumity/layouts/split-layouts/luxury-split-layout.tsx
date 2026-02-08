"use client";
import { motion } from "framer-motion";
import { Crown, Gem, Sparkles, Target, Zap, Users, BarChart3, Award, Globe, Shield } from "lucide-react";

interface LuxuryMetric {
  id: number;
  title: string;
  subtitle: string;
  value: string;
  icon: React.ReactNode;
  gradient: string;
  accentColor: string;
}

export default function LuxurySplitLayout() {
  const luxuryMetrics: LuxuryMetric[] = [
    {
      id: 1,
      title: "Executive Performance",
      subtitle: "Premium Grade",
      value: "A+",
      icon: <Crown className="w-10 h-10" />,
      gradient: "from-yellow-400 via-orange-400 to-yellow-600",
      accentColor: "text-yellow-300",
    },
    {
      id: 2,
      title: "Portfolio Value",
      subtitle: "Total Assets",
      value: "$2.48M",
      icon: <Gem className="w-10 h-10" />,
      gradient: "from-blue-400 via-purple-400 to-blue-600",
      accentColor: "text-blue-300",
    },
    {
      id: 3,
      title: "Success Rate",
      subtitle: "Mission Critical",
      value: "99.8%",
      icon: <Target className="w-10 h-10" />,
      gradient: "from-green-400 via-emerald-400 to-green-600",
      accentColor: "text-green-300",
    },
    {
      id: 4,
      title: "VIP Network",
      subtitle: "Exclusive Members",
      value: "248",
      icon: <Users className="w-10 h-10" />,
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
      <div className="w-full max-w-8xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border-2 border-transparent">
          {/* Luxury animated border */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'conic-gradient(from 0deg, transparent, #FFD700, #FFA500, #FFD700, transparent)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-[2px] rounded-3xl bg-linear-to-br from-gray-900 via-black to-gray-900" />

          <div className="relative z-10 flex flex-col lg:flex-row">
            {/* Left Panel - Executive Dashboard */}
            <div className="lg:w-2/5 bg-linear-to-br from-gray-900/90 to-black/90 p-12">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-20 h-20 rounded-full bg-linear-to-r from-yellow-400 via-orange-400 to-yellow-600 flex items-center justify-center"
                    >
                      <Crown className="w-10 h-10 text-white" />
                    </motion.div>
                    <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-300" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold bg-linear-to-r from-yellow-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
                      Executive Suite
                    </h2>
                    <p className="text-gray-400">Premium dashboard for elite users</p>
                  </div>
                </div>

                {/* Luxury Metrics */}
                <div className="space-y-6 mb-12">
                  {luxuryMetrics.map((metric) => (
                    <motion.div
                      key={metric.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: metric.id * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl rounded-2xl"
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
                      
                      <div className="relative bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 group-hover:border-gray-700">
                        <div className="flex items-center justify-between mb-6">
                          <div className={`p-4 rounded-xl bg-linear-to-br ${metric.gradient} shadow-2xl`}>
                            {metric.icon}
                          </div>
                          <span className="text-green-400 text-sm font-medium px-3 py-1 bg-green-900/30 rounded-full">
                            ↑
                          </span>
                        </div>
                        
                        <h3 className="text-3xl font-bold text-white mb-2">{metric.value}</h3>
                        <p className={`text-lg font-semibold ${metric.accentColor}`}>{metric.title}</p>
                        <p className="text-gray-400 text-sm mt-1">{metric.subtitle}</p>
                        
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

                {/* VIP Status */}
                <div className="bg-linear-to-br from-yellow-900/20 to-orange-900/20 backdrop-blur-sm rounded-2xl p-8 border border-yellow-800/30">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-8 h-8 text-yellow-400" />
                    <h3 className="text-xl font-bold text-white">VIP Executive Status</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Access Level</span>
                      <span className="text-yellow-300 font-bold">Executive</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Support Priority</span>
                      <span className="text-blue-300 font-bold">Highest</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Security Level</span>
                      <span className="text-green-300 font-bold">Maximum</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Analytics & Control */}
            <div className="lg:w-3/5 bg-linear-to-br from-gray-900/80 to-black/80 p-12">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <h2 className="text-4xl font-bold bg-linear-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                      Analytics & Control
                    </h2>
                    <p className="text-gray-400">Advanced insights and management tools</p>
                  </div>
                  <Globe className="w-12 h-12 text-yellow-400" />
                </div>

                {/* Performance Analysis */}
                <div className="bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 mb-10">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-white">Performance Analysis</h3>
                      <p className="text-gray-400">Detailed metrics and growth indicators</p>
                    </div>
                    <BarChart3 className="w-10 h-10 text-yellow-400" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {[
                        { label: "Revenue Growth", value: 85, color: "from-green-500 to-emerald-500" },
                        { label: "Market Share", value: 42, color: "from-blue-500 to-cyan-500" },
                        { label: "Innovation Score", value: 78, color: "from-purple-500 to-pink-500" },
                      ].map((metric, index) => (
                        <div key={index} className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-300">{metric.label}</span>
                            <span className="text-white font-bold">{metric.value}%</span>
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
                        { label: "Client Satisfaction", value: 94, color: "from-yellow-500 to-orange-500" },
                        { label: "Team Performance", value: 88, color: "from-red-500 to-pink-500" },
                        { label: "Risk Management", value: 96, color: "from-green-500 to-teal-500" },
                      ].map((metric, index) => (
                        <div key={index} className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-300">{metric.label}</span>
                            <span className="text-white font-bold">{metric.value}%</span>
                          </div>
                          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${metric.value}%` }}
                              transition={{ duration: 1, delay: (index + 3) * 0.2 }}
                              className={`h-full rounded-full bg-linear-to-r ${metric.color}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* System Status & Security */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* System Status */}
                  <div className="bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
                    <div className="flex items-center gap-3 mb-6">
                      <Zap className="w-8 h-8 text-yellow-400" />
                      <h3 className="text-2xl font-bold text-white">System Status</h3>
                    </div>

                    <div className="space-y-4">
                      {[
                        { status: "All Systems", value: "Operational", color: "bg-green-900/30 text-green-400" },
                        { status: "Performance", value: "Optimal", color: "bg-blue-900/30 text-blue-400" },
                        { status: "Updates", value: "Current", color: "bg-purple-900/30 text-purple-400" },
                        { status: "Backup", value: "Complete", color: "bg-yellow-900/30 text-yellow-400" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-900/50">
                          <div>
                            <p className="text-gray-400 text-sm">{item.status}</p>
                            <p className="text-white font-bold">{item.value}</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${item.color}`}>
                            Active
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Security Overview */}
                  <div className="bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
                    <div className="flex items-center gap-3 mb-6">
                      <Shield className="w-8 h-8 text-blue-400" />
                      <h3 className="text-2xl font-bold text-white">Security Overview</h3>
                    </div>

                    <div className="space-y-4">
                      {[
                        { status: "Encryption", value: "AES-256", level: "Maximum" },
                        { status: "Firewall", value: "Active", level: "Enterprise" },
                        { status: "Monitoring", value: "24/7", level: "Real-time" },
                        { status: "Compliance", value: "100%", level: "Certified" },
                      ].map((item, index) => (
                        <div key={index} className="p-4 rounded-xl bg-gray-900/50">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-gray-400 text-sm">{item.status}</span>
                            <span className="text-green-400 text-xs font-medium px-2 py-1 bg-green-900/30 rounded">
                              {item.level}
                            </span>
                          </div>
                          <div className="text-white font-bold">{item.value}</div>
                        </div>
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