"use client"
import { motion, AnimatePresence } from "framer-motion"
import React, { useState } from "react"
import { ChevronDown, TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, BarChart3, Download, Filter, Eye } from "lucide-react"

const analyticsData = [
  {
    id: 1,
    product: "Premium Laptop",
    category: "Electronics",
    price: "$1,299",
    sales: 245,
    revenue: "$318,255",
    growth: 24.5,
    metrics: {
      views: "45,678",
      conversion: "3.2%",
      avgOrder: "$1,299",
      returnRate: "1.2%",
      demographics: {
        age: "25-34",
        gender: "65% Male, 35% Female",
        region: "North America (45%), Europe (30%), Asia (25%)"
      },
      trend: [65, 78, 90, 82, 95, 110, 125, 140, 130, 145, 160, 180]
    }
  },
  {
    id: 2,
    product: "Wireless Headphones",
    category: "Audio",
    price: "$249",
    sales: 1245,
    revenue: "$310,005",
    growth: 18.2,
    metrics: {
      views: "98,765",
      conversion: "2.8%",
      avgOrder: "$249",
      returnRate: "2.1%",
      demographics: {
        age: "18-24",
        gender: "55% Male, 45% Female",
        region: "Global distribution"
      },
      trend: [120, 135, 145, 160, 155, 170, 185, 195, 210, 225, 240, 250]
    }
  },
  {
    id: 3,
    product: "Smart Watch Pro",
    category: "Wearables",
    price: "$399",
    sales: 890,
    revenue: "$355,110",
    growth: 32.8,
    metrics: {
      views: "67,890",
      conversion: "2.1%",
      avgOrder: "$399",
      returnRate: "3.5%",
      demographics: {
        age: "25-44",
        gender: "60% Male, 40% Female",
        region: "North America (50%), Europe (35%)"
      },
      trend: [45, 55, 65, 75, 85, 95, 110, 125, 140, 160, 175, 190]
    }
  },
  {
    id: 4,
    product: "4K Monitor",
    category: "Electronics",
    price: "$599",
    sales: 420,
    revenue: "$251,580",
    growth: -5.4,
    metrics: {
      views: "34,567",
      conversion: "2.4%",
      avgOrder: "$599",
      returnRate: "4.2%",
      demographics: {
        age: "30-45",
        gender: "75% Male, 25% Female",
        region: "North America (60%), Europe (25%)"
      },
      trend: [50, 55, 60, 65, 70, 75, 70, 65, 60, 55, 50, 45]
    }
  },
  {
    id: 5,
    product: "Gaming Mouse",
    category: "Gaming",
    price: "$89",
    sales: 3210,
    revenue: "$285,690",
    growth: 42.1,
    metrics: {
      views: "123,456",
      conversion: "5.2%",
      avgOrder: "$89",
      returnRate: "1.8%",
      demographics: {
        age: "18-35",
        gender: "85% Male, 15% Female",
        region: "Global distribution"
      },
      trend: [180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400]
    }
  },
]

export default function AnalyticsExpandableTable() {
  const [expandedRows, setExpandedRows] = useState<number[]>([1])
  const [timeRange, setTimeRange] = useState("monthly")

  const toggleRow = (id: number) => {
    setExpandedRows(prev =>
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    )
  }

  const getTrendColor = (growth: number) => {
    if (growth > 20) return "text-green-600 dark:text-green-400"
    if (growth > 0) return "text-blue-600 dark:text-blue-400"
    if (growth < 0) return "text-red-600 dark:text-red-400"
    return "text-gray-600 dark:text-gray-400"
  }

  const getTrendIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="w-4 h-4" />
    if (growth < 0) return <TrendingDown className="w-4 h-4" />
    return null
  }

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Product Analytics Dashboard</h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
                Detailed analytics for top-performing products with trend visualization
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-sm bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              
              <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:opacity-90 transition-opacity">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* Summary Stats */}
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800 bg-linear-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">$1.52M</div>
                <div className="text-xs text-green-600 dark:text-green-400 mt-1">+18.4% from last month</div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <ShoppingCart className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">Total Sales</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">6,010</div>
                <div className="text-xs text-green-600 dark:text-green-400 mt-1">+22.1% from last month</div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Conversion</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">3.1%</div>
                <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">+0.4% from last month</div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <BarChart3 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">Top Product</span>
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white mt-2">Wireless Headphones</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">1,245 sales this month</div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="hidden sm:table-cell px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Sales & Revenue
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Growth
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {analyticsData.map((item) => (
                  <React.Fragment key={item.id}>
                    <tr 
                      key={item.id}
                      className="group cursor-pointer hover:bg-linear-to-r hover:from-blue-50/50 hover:to-blue-100/50 dark:hover:from-gray-800/50 dark:hover:to-gray-900/50 transition-all duration-300"
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center">
                          <div className="shrink-0 w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{item.product.charAt(0)}</span>
                          </div>
                          <div className="ml-3 sm:ml-4">
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                              {item.product}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Price: {item.price}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-4 sm:px-6 py-4">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">{item.sales} units</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{item.revenue} revenue</div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center">
                          {getTrendIcon(item.growth)}
                          <span className={`ml-1 text-sm font-bold ${getTrendColor(item.growth)}`}>
                            {item.growth > 0 ? '+' : ''}{item.growth}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <button
                          onClick={() => toggleRow(item.id)}
                          className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Analytics
                          <motion.span
                            animate={{ rotate: expandedRows.includes(item.id) ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-2"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.span>
                        </button>
                      </td>
                    </tr>
                    
                    <AnimatePresence>
                      {expandedRows.includes(item.id) && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-blue-50/30 dark:bg-gray-800/30"
                        >
                          <td colSpan={5} className="px-4 sm:px-6 py-6">
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                            >
                              {/* Key Metrics */}
                              <div className="lg:col-span-2">
                                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                                    Performance Metrics
                                  </h3>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
                                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Views</div>
                                      <div className="text-lg font-bold text-gray-900 dark:text-white">{item.metrics.views}</div>
                                    </div>
                                    <div className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
                                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Conversion</div>
                                      <div className="text-lg font-bold text-gray-900 dark:text-white">{item.metrics.conversion}</div>
                                    </div>
                                    <div className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg">
                                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Avg. Order</div>
                                      <div className="text-lg font-bold text-gray-900 dark:text-white">{item.metrics.avgOrder}</div>
                                    </div>
                                    <div className="bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg">
                                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Return Rate</div>
                                      <div className="text-lg font-bold text-gray-900 dark:text-white">{item.metrics.returnRate}</div>
                                    </div>
                                  </div>
                                  
                                  {/* Trend Chart */}
                                  <div className="mt-6">
                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                      Sales Trend ({timeRange})
                                    </h4>
                                    <div className="h-40 flex items-end space-x-1 sm:space-x-2">
                                      {item.metrics.trend.map((value, idx) => (
                                        <div key={idx} className="flex-1 flex flex-col items-center">
                                          <div 
                                            className="w-full bg-linear-to-t from-blue-500 to-blue-600 rounded-t"
                                            style={{ height: `${(value / Math.max(...item.metrics.trend)) * 100}%` }}
                                          ></div>
                                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                            {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][idx]}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Demographics */}
                              <div>
                                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-800 h-full">
                                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                                    Customer Demographics
                                  </h3>
                                  <div className="space-y-4">
                                    <div>
                                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Age Group</div>
                                      <div className="text-sm font-medium text-gray-900 dark:text-white">{item.metrics.demographics.age}</div>
                                    </div>
                                    <div>
                                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Gender Distribution</div>
                                      <div className="text-sm text-gray-700 dark:text-gray-300">{item.metrics.demographics.gender}</div>
                                    </div>
                                    <div>
                                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Regional Distribution</div>
                                      <div className="text-sm text-gray-700 dark:text-gray-300">{item.metrics.demographics.region}</div>
                                    </div>
                                  </div>
                                  
                                  {/* Insights */}
                                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                      Performance Insights
                                    </h4>
                                    <div className="text-xs text-gray-700 dark:text-gray-300 space-y-2">
                                      <p>
                                        {item.growth > 0 ? 
                                          `This product is showing strong growth of ${item.growth}% compared to last period.` :
                                          `This product experienced a decline of ${Math.abs(item.growth)}% compared to last period.`
                                        }
                                      </p>
                                      <p>
                                        {parseFloat(item.metrics.conversion) > 3 ? 
                                          "Conversion rate is above average for this category." :
                                          "Consider optimizing product page for better conversion."
                                        }
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div>
            Data updated in real-time • Showing top {analyticsData.length} products
          </div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span>Growing</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
              <span>Declining</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              <span>Stable</span>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  )
}