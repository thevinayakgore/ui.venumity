"use client";
import { motion } from "framer-motion";
import {
  CheckCircle,
  AlertCircle,
  Clock,
  PauseCircle,
  XCircle,
} from "lucide-react";

export default function HighlightedTable5_1() {
  const tasks = [
    {
      id: 1,
      task: "Design Homepage",
      assignee: "Alex Johnson",
      priority: "high",
      status: "completed",
      dueDate: "2024-01-15",
      progress: 100,
    },
    {
      id: 2,
      task: "API Integration",
      assignee: "Maria Garcia",
      priority: "high",
      status: "in-progress",
      dueDate: "2024-01-22",
      progress: 75,
    },
    {
      id: 3,
      task: "User Testing",
      assignee: "David Smith",
      priority: "medium",
      status: "pending",
      dueDate: "2024-01-25",
      progress: 30,
    },
    {
      id: 4,
      task: "Documentation",
      assignee: "Sarah Wilson",
      priority: "low",
      status: "on-hold",
      dueDate: "2024-01-30",
      progress: 10,
    },
    {
      id: 5,
      task: "Bug Fixes",
      assignee: "Michael Brown",
      priority: "high",
      status: "overdue",
      dueDate: "2024-01-10",
      progress: 60,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return { icon: CheckCircle, color: "text-green-500" };
      case "in-progress":
        return { icon: AlertCircle, color: "text-blue-500" };
      case "pending":
        return { icon: Clock, color: "text-yellow-500" };
      case "on-hold":
        return { icon: PauseCircle, color: "text-gray-500" };
      case "overdue":
        return { icon: XCircle, color: "text-red-500" };
      default:
        return { icon: Clock, color: "text-gray-500" };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "on-hold":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-4 border-red-500";
      case "medium":
        return "border-l-4 border-yellow-500";
      case "low":
        return "border-l-4 border-green-500";
      default:
        return "border-l-4 border-gray-300";
    }
  };

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Task Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Track and monitor task progress
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                5
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Active Tasks
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
                  Task
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Assignee
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Due Date
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => {
                const { icon: StatusIcon, color: statusColor } = getStatusIcon(
                  task.status
                );

                return (
                  <motion.tr
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {task.task}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            task.priority === "high"
                              ? "bg-red-500"
                              : task.priority === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                          {task.priority} priority
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-medium">
                          {task.assignee.charAt(0)}
                        </div>
                        <span className="text-gray-900 dark:text-white">
                          {task.assignee}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`w-5 h-5 ${statusColor}`} />
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            task.status
                          )}`}
                        >
                          {task.status.replace("-", " ")}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-gray-900 dark:text-white">
                        {task.dueDate}
                      </div>
                      {task.status === "overdue" && (
                        <div className="text-xs text-red-600 dark:text-red-400">
                          Overdue
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="w-full">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">
                            {task.progress}%
                          </span>
                          <span className="text-gray-600 dark:text-gray-400">
                            {task.status === "completed"
                              ? "Complete"
                              : "In Progress"}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${task.progress}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                            className={`h-full rounded-full ${
                              task.progress === 100
                                ? "bg-green-500"
                                : task.progress > 70
                                ? "bg-blue-500"
                                : task.progress > 40
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                          />
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  1
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Completed
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-blue-500" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  1
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                In Progress
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-yellow-500" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  1
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Pending
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <PauseCircle className="w-5 h-5 text-gray-500" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  1
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                On Hold
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-red-500" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  1
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Overdue
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
