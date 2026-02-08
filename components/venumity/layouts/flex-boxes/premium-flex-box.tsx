"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronRight, Shield, Zap, Globe, Users, BarChart3, TrendingUp, Award } from "lucide-react";

interface PremiumCard {
  id: number;
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  gradient: string;
  details: string[];
}

export default function PremiumFlexBox() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  
  const cards: PremiumCard[] = [
    {
      id: 1,
      title: "Security Score",
      value: "98.7%",
      change: "+2.3%",
      icon: <Shield className="w-8 h-8" />,
      gradient: "from-blue-500 to-cyan-500",
      details: ["Advanced Encryption", "Real-time Monitoring", "DDoS Protection", "Compliance Certified"],
    },
    {
      id: 2,
      title: "Performance",
      value: "99.9%",
      change: "+0.5%",
      icon: <Zap className="w-8 h-8" />,
      gradient: "from-green-500 to-emerald-500",
      details: ["Load Balancing", "CDN Optimized", "Caching Layers", "Database Optimization"],
    },
    {
      id: 3,
      title: "Global Reach",
      value: "186",
      change: "+24",
      icon: <Globe className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-500",
      details: ["Multiple Regions", "Edge Locations", "Local CDN", "Geo-routing"],
    },
    {
      id: 4,
      title: "User Growth",
      value: "42.5K",
      change: "+18.2%",
      icon: <Users className="w-8 h-8" />,
      gradient: "from-orange-500 to-red-500",
      details: ["Active Users", "New Signups", "Retention Rate", "Engagement Score"],
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
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Premium Flex Dashboard
              </h2>
              <p className="text-gray-400 max-w-2xl">
                Advanced flex layout with interactive cards, detailed metrics, and premium animations
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg">
                  <span className="text-white font-medium">Premium</span>
                </div>
                <Award className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>

          {/* Premium Cards Grid */}
          <div className="flex flex-col lg:flex-row gap-6 mb-10">
            {cards.map((card) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: card.id * 0.1 }}
                className={`lg:w-1/4 ${
                  expandedCard === card.id ? "lg:w-2/3" : ""
                }`}
                onClick={() => setExpandedCard(expandedCard === card.id ? null : card.id)}
              >
                <motion.div
                  whileHover={{ scale: expandedCard === card.id ? 1 : 1.02 }}
                  className={`bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border ${
                    expandedCard === card.id ? "border-blue-500" : "border-gray-700"
                  } cursor-pointer transition-all h-full`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 rounded-xl bg-linear-to-br ${card.gradient}`}>
                      {card.icon}
                    </div>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedCard === card.id ? "rotate-90" : ""
                    }`} />
                  </div>

                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white">{card.value}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400">{card.title}</p>
                      <span className="text-green-400 text-sm font-medium px-3 py-1 bg-green-900/30 rounded-full">
                        {card.change}
                      </span>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedCard === card.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-gray-700"
                      >
                        <h4 className="text-white font-semibold mb-4">Key Features</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {card.details.map((detail, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg"
                            >
                              <div className="w-2 h-2 rounded-full bg-linear-to-r from-blue-400 to-cyan-400" />
                              <span className="text-gray-300 text-sm">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Premium Content Area */}
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Left Stats Panel */}
            <div className="xl:w-2/3">
              <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-white">Performance Analytics</h3>
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                </div>

                <div className="space-y-6">
                  {[
                    { label: "Revenue Growth", value: 85, color: "from-green-500 to-emerald-500" },
                    { label: "User Engagement", value: 92, color: "from-blue-500 to-cyan-500" },
                    { label: "System Uptime", value: 99.9, color: "from-purple-500 to-pink-500" },
                    { label: "Customer Satisfaction", value: 94, color: "from-orange-500 to-yellow-500" },
                  ].map((metric, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">{metric.label}</span>
                        <span className="text-white font-bold">{metric.value}%</span>
                      </div>
                      <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.value}%` }}
                          transition={{ duration: 1.5, delay: index * 0.2 }}
                          className={`h-full rounded-full bg-linear-to-r ${metric.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Info Panel */}
            <div className="xl:w-1/3">
              <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                  <h3 className="text-2xl font-bold text-white">Growth Insights</h3>
                </div>

                <div className="space-y-6">
                  {[
                    { metric: "Monthly Active Users", value: "24.8K", change: "+12.4%" },
                    { metric: "Quarterly Revenue", value: "$1.2M", change: "+18.2%" },
                    { metric: "New Signups", value: "3.4K", change: "+24.7%" },
                    { metric: "Customer Retention", value: "92.5%", change: "+3.8%" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-gray-400">{item.metric}</span>
                        <span className="text-green-400 text-sm font-medium px-2 py-1 bg-green-900/30 rounded">
                          {item.change}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-white">{item.value}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}