"use client";
import { motion } from "framer-motion";
import { Shield, Zap, Globe, Users, BarChart3, TrendingUp, ChevronRight } from "lucide-react";

interface PremiumItem {
  id: number;
  title: string;
  description: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  gradient: string;
}

export default function PremiumStack() {
  const items: PremiumItem[] = [
    {
      id: 1,
      title: "Security Dashboard",
      description: "Advanced protection systems with real-time monitoring",
      value: "98.7%",
      change: "+2.3%",
      icon: <Shield className="w-8 h-8" />,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Performance Center",
      description: "Optimization tools and performance analytics",
      value: "99.9%",
      change: "+0.5%",
      icon: <Zap className="w-8 h-8" />,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: 3,
      title: "Global Analytics",
      description: "Worldwide coverage with detailed geographical insights",
      value: "186",
      change: "+24",
      icon: <Globe className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 4,
      title: "User Management",
      description: "Advanced team coordination and user analytics",
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
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-linear-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 border border-gray-700">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">
              Premium Stack Dashboard
            </h2>
            <p className="text-gray-400">
              Advanced stack layout with premium metrics and detailed insights
            </p>
          </div>

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
                <div className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl rounded-2xl"
                  style={{
                    background: (() => {
                      const parts = item.gradient?.split(' ') || [];
                      const fromColor = parts[0]?.replace?.('from-', '#') || '#ffffff';
                      const toColor = parts[1]?.replace?.('to-', '#') || '#000000';
                      return `linear-gradient(to bottom right, ${fromColor}, ${toColor})`;
                    })(),
                  }}
                />
                
                <div className="relative bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 group-hover:border-gray-600 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-xl bg-linear-to-br ${item.gradient}`}>
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{item.value}</div>
                        <span className="text-green-400 text-sm font-medium px-3 py-1 bg-green-900/30 rounded-full">
                          {item.change}
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-gray-300 transition-colors" />
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${parseInt(item.value) > 100 ? 100 : parseInt(item.value)}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`h-full rounded-full bg-linear-to-r ${item.gradient}`}
                          />
                        </div>
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Stats */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Total Items", value: "4", icon: <BarChart3 className="w-5 h-5" /> },
                { label: "Avg Growth", value: "12.4%", icon: <TrendingUp className="w-5 h-5" /> },
                { label: "Active Users", value: "2.4K", icon: <Users className="w-5 h-5" /> },
                { label: "Uptime", value: "99.9%", icon: <Zap className="w-5 h-5" /> },
              ].map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-800">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-white font-bold">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}