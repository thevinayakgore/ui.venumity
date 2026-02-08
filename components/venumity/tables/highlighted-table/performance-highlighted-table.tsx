"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  Zap,
  Users,
} from "lucide-react";

export default function HighlightedTable5_3() {
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly">(
    "weekly"
  );

  const employees = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Senior Developer",
      tasks: 42,
      completed: 38,
      efficiency: 92,
      rating: 4.8,
      trend: "up",
    },
    {
      id: 2,
      name: "Maria Garcia",
      role: "Product Designer",
      tasks: 35,
      completed: 28,
      efficiency: 80,
      rating: 4.5,
      trend: "up",
    },
    {
      id: 3,
      name: "David Smith",
      role: "Marketing Lead",
      tasks: 28,
      completed: 18,
      efficiency: 64,
      rating: 4.2,
      trend: "down",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      role: "Project Manager",
      tasks: 38,
      completed: 36,
      efficiency: 95,
      rating: 4.9,
      trend: "up",
    },
    {
      id: 5,
      name: "Michael Brown",
      role: "QA Engineer",
      tasks: 45,
      completed: 40,
      efficiency: 89,
      rating: 4.6,
      trend: "up",
    },
  ];

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90)
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    if (efficiency >= 75)
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    if (efficiency >= 60)
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600 dark:text-green-400";
    if (rating >= 4.0) return "text-blue-600 dark:text-blue-400";
    if (rating >= 3.5) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Performance Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Employee performance metrics
              </p>
            </div>

            <div className="flex items-center gap-2">
              {(["daily", "weekly", "monthly"] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize ${
                    timeRange === range
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    188
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Tasks
                  </div>
                </div>
                <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    160
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Completed
                  </div>
                </div>
                <Award className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    85%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Avg Efficiency
                  </div>
                </div>
                <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    4.6
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Avg Rating
                  </div>
                </div>
                <Users className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Employee
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tasks
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Completed
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Efficiency
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Rating
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <motion.tr
                  key={employee.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold">
                        {employee.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">
                          {employee.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {employee.role}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-gray-900 dark:text-white">
                      {employee.tasks}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="font-bold text-gray-900 dark:text-white">
                        {employee.completed}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        (
                        {Math.round(
                          (employee.completed / employee.tasks) * 100
                        )}
                        %)
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getEfficiencyColor(
                          employee.efficiency
                        )}`}
                      >
                        {employee.efficiency}%
                      </span>
                      <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${employee.efficiency}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          className={`h-full rounded-full ${
                            employee.efficiency >= 90
                              ? "bg-green-500"
                              : employee.efficiency >= 75
                              ? "bg-blue-500"
                              : employee.efficiency >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div
                      className={`font-bold ${getRatingColor(employee.rating)}`}
                    >
                      {employee.rating}
                    </div>
                    <div className="flex mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(employee.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 dark:text-gray-700"
                          }`}
                        >
                          ★
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div
                      className={`flex items-center gap-1 ${
                        employee.trend === "up"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {employee.trend === "up" ? (
                        <TrendingUp className="w-5 h-5" />
                      ) : (
                        <TrendingDown className="w-5 h-5" />
                      )}
                      <span className="text-sm font-medium">
                        {employee.trend === "up" ? "+12%" : "-5%"}
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Performance Chart */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Efficiency Distribution
          </h3>
          <div className="h-8 flex rounded-lg overflow-hidden">
            {employees.map((employee, index) => (
              <motion.div
                key={employee.id}
                initial={{ width: 0 }}
                animate={{ width: `${employee.efficiency / 5}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className={`h-full ${
                  employee.efficiency >= 90
                    ? "bg-green-500"
                    : employee.efficiency >= 75
                    ? "bg-blue-500"
                    : employee.efficiency >= 60
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                title={`${employee.name}: ${employee.efficiency}%`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
            <span>Low Efficiency</span>
            <span>High Efficiency</span>
          </div>
        </div>
      </div>
    </main>
  );
}
