"use client";
import { motion } from "framer-motion";
import { Crown, Gem, Sparkles, Target, Zap, Users, BarChart3, Award, Shield, Globe } from "lucide-react";

interface LuxuryMetric {
  id: number;
  title: string;
  subtitle: string;
  value: string;
  icon: React.ReactNode;
  gradient: string;
  accentColor: string;
  cols: string;
}

export default function LuxuryResponsiveGrid() {
  const luxuryMetrics: LuxuryMetric[] = [
    {
      id: 1,
      title: "Executive Performance",
      subtitle: "Premium Grade",
      value: "A+",
      icon: <Crown className="w-10 h-10" />,
      gradient: "from-yellow-400 via-orange-400 to-yellow-600",
      accentColor: "text-yellow-300",
      cols: "md:col-span-2 lg:col-span-3",
    },
    {
      id: 2,
      title: "Portfolio Value",
      subtitle: "Total Assets",
      value: "$2.48M",
      icon: <Gem className="w-10 h-10" />,
      gradient: "from-blue-400 via-purple-400 to-blue-600",
      accentColor: "text-blue-300",
      cols: "md:col-span-1 lg:col-span-2",
    },
    {
      id: 3,
      title: "Success Rate",
      subtitle: "Mission Critical",
      value: "99.8%",
      icon: <Target className="w-10 h-10" />,
      gradient: "from-green-400 via-emerald-400 to-green-600",
      accentColor: "text-green-300",
      cols: "md:col-span-1 lg:col-span-2",
    },
    {
      id: 4,
      title: "VIP Network",
      subtitle: "Exclusive Members",
      value: "248",
      icon: <Users className="w-10 h-10" />,
      gradient: "from-red-400 via-pink-400 to-red-600",
      accentColor: "text-pink-300",
      cols: "md:col-span-2 lg:col-span-3",
    },
    {
      id: 5,
      title: "Growth Index",
      subtitle: "Quarterly Results",
      value: "156%",
      icon: <Zap className="w-10 h-10" />,
      gradient: "from-teal-400 via-cyan-400 to-teal-600",
      accentColor: "text-cyan-300",
      cols: "md:col-span-1 lg:col-span-2",
    },
    {
      id: 6,
      title: "Market Position",
      subtitle: "Industry Ranking",
      value: "#1",
      icon: <BarChart3 className="w-10 h-10" />,
      gradient: "from-indigo-400 via-purple-400 to-indigo-600",
      accentColor: "text-purple-300",
      cols: "md:col-span-1 lg:col-span-2",
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

          <div className="relative z-10 p-8">
            {/* Luxury Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12">
              <div className="flex items-center gap-4 mb-6 lg:mb-0">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 rounded-full bg-linear-to-r from-yellow-400 via-orange-400 to-yellow-600 flex items-center justify-center shadow-2xl shadow-yellow-500/30"
                  >
                    <Crown className="w-10 h-10 text-white" />
                  </motion.div>
                  <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-300" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold bg-linear-to-r from-yellow-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
                    Luxury Responsive Grid
                  </h2>
                  <p className="text-gray-400 mt-2">Exclusive premium metrics with adaptive responsive layouts</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Shield className="w-8 h-8 text-blue-400" />
                <span className="text-gray-300">VIP Executive Access</span>
              </div>
            </div>

            {/* Luxury Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
              {luxuryMetrics.map((metric) => (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: metric.id * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`${metric.cols} relative group`}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl rounded-2xl"
                    style={{
                      background: (() => {
                        const parts = metric.gradient?.split(' ') ?? [];
                        const start = parts[1]?.replace('from-', '#') || '#000000';
                        const end = parts[3]?.replace('to-', '#') || '#000000';
                        return `linear-gradient(to bottom right, ${start}, ${end})`;
                      })(),
                    }}
                  />
                  
                  <div className="relative bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 group-hover:border-gray-700 transition-all">
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
                          const parts = metric.gradient?.split(' ') ?? [];
                          const start = parts[1]?.replace('from-', '') || 'transparent';
                          const end = parts[3]?.replace('to-', '') || 'transparent';
                          return `linear-gradient(to right, ${start}, ${end})`;
                        })(),
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Luxury Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Performance Analysis */}
              <div className="lg:col-span-2">
                <div className="bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-bold bg-linear-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                        Performance Analysis
                      </h3>
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
              </div>

              {/* VIP Status */}
              <div>
                <div className="bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 h-full">
                  <div className="flex items-center gap-3 mb-8">
                    <Globe className="w-10 h-10 text-yellow-400" />
                    <h3 className="text-2xl font-bold bg-linear-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                      Global Status
                    </h3>
                  </div>

                  <div className="space-y-6 mb-8">
                    {[
                      { status: "Access Level", value: "Executive", color: "bg-yellow-900/30 text-yellow-300" },
                      { status: "Support Priority", value: "Highest", color: "bg-blue-900/30 text-blue-300" },
                      { status: "Feature Access", value: "Full", color: "bg-green-900/30 text-green-300" },
                      { status: "Security Level", value: "Maximum", color: "bg-purple-900/30 text-purple-300" },
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
                          <p className="text-lg font-bold text-white">{item.value}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${item.color}`}>
                          Active
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Exclusive Features */}
                  <div className="p-6 rounded-xl bg-linear-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-800/30">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="w-6 h-6 text-yellow-400" />
                      <span className="text-white font-bold">Exclusive Features</span>
                    </div>
                    <ul className="space-y-2">
                      {[
                        "Priority 24/7 Support",
                        "Advanced Analytics",
                        "Custom Solutions",
                        "Early Access Features",
                        "Personal Account Manager"
                      ].map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-yellow-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
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