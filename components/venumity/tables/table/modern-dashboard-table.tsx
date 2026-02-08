"use client";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingBag,
  Package,
} from "lucide-react";

const dashboardData = [
  {
    id: 1,
    metric: "Monthly Revenue",
    value: "$124,580",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "from-green-500 to-emerald-600",
    details: "From 245 orders",
  },
  {
    id: 2,
    metric: "Active Users",
    value: "8,456",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "from-blue-500 to-cyan-600",
    details: "32% returning users",
  },
  {
    id: 3,
    metric: "Conversion Rate",
    value: "3.8%",
    change: "-0.4%",
    trend: "down",
    icon: TrendingUp,
    color: "from-purple-500 to-pink-600",
    details: "From 245k visits",
  },
  {
    id: 4,
    metric: "Avg Order Value",
    value: "$142.50",
    change: "+5.7%",
    trend: "up",
    icon: ShoppingBag,
    color: "from-orange-500 to-yellow-600",
    details: "Increased by $7.60",
  },
  {
    id: 5,
    metric: "Total Orders",
    value: "3,458",
    change: "+15.3%",
    trend: "up",
    icon: Package,
    color: "from-indigo-500 to-blue-600",
    details: "245 new this week",
  },
  {
    id: 6,
    metric: "Customer Satisfaction",
    value: "4.8/5",
    change: "+0.2",
    trend: "up",
    icon: TrendingUp,
    color: "from-teal-500 to-green-600",
    details: "From 1,245 reviews",
  },
];

export default function ModernDashboardTable() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Business Dashboard
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
            Real-time metrics and performance indicators
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardData.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: item.id * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {item.metric}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {item.value}
                  </div>
                </div>
                <div
                  className={`p-3 rounded-xl bg-linear-to-br ${item.color}`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {item.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-2" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      item.trend === "up"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {item.change}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    vs last month
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {item.details}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-linear-to-r ${item.color}`}
                    style={{ width: item.trend === "up" ? "75%" : "45%" }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Latest transactions and updates
            </p>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {[
              {
                user: "Alex Johnson",
                action: "Placed order",
                amount: "$245.99",
                time: "2 min ago",
                status: "completed",
              },
              {
                user: "Sarah Miller",
                action: "Subscription renewed",
                amount: "$49.99",
                time: "15 min ago",
                status: "completed",
              },
              {
                user: "Michael Chen",
                action: "Account upgrade",
                amount: "$99.99",
                time: "1 hour ago",
                status: "pending",
              },
              {
                user: "Emma Wilson",
                action: "Refund requested",
                amount: "$89.99",
                time: "2 hours ago",
                status: "processing",
              },
              {
                user: "David Brown",
                action: "New subscription",
                amount: "$29.99",
                time: "3 hours ago",
                status: "completed",
              },
            ].map((activity, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {activity.user.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.user}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.action}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {activity.amount}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </div>
                    <div
                      className={`mt-1 text-xs font-medium px-2 py-1 rounded-full inline-block ${
                        activity.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : activity.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}
                    >
                      {activity.status}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Data updates every 5 minutes • Last updated: Just now
        </div>
      </div>
    </motion.main>
  );
}
