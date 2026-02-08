"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, AlertCircle, Info, Clock, User } from "lucide-react";

export default function HighlightedTable5_4() {
  const [sortBy, setSortBy] = useState<"priority" | "dueDate" | "status">(
    "priority"
  );

  const tickets = [
    {
      id: 1,
      title: "Login Page Not Loading",
      assignee: "Alex Johnson",
      priority: "critical",
      status: "open",
      dueDate: "2024-01-20",
      created: "2 hours ago",
    },
    {
      id: 2,
      title: "Database Connection Error",
      assignee: "Maria Garcia",
      priority: "high",
      status: "in-progress",
      dueDate: "2024-01-22",
      created: "1 day ago",
    },
    {
      id: 3,
      title: "Mobile App Crash on Launch",
      assignee: "David Smith",
      priority: "critical",
      status: "open",
      dueDate: "2024-01-21",
      created: "4 hours ago",
    },
    {
      id: 4,
      title: "Update Documentation",
      assignee: "Sarah Wilson",
      priority: "low",
      status: "pending",
      dueDate: "2024-01-30",
      created: "3 days ago",
    },
    {
      id: 5,
      title: "Payment Gateway Integration",
      assignee: "Michael Brown",
      priority: "high",
      status: "in-progress",
      dueDate: "2024-01-25",
      created: "2 days ago",
    },
    {
      id: 6,
      title: "UI Design Review",
      assignee: "Emily Davis",
      priority: "medium",
      status: "open",
      dueDate: "2024-01-28",
      created: "1 week ago",
    },
  ];

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "critical":
        return {
          icon: AlertTriangle,
          color: "text-red-600 dark:text-red-400",
          bg: "bg-red-100 dark:bg-red-900/30",
        };
      case "high":
        return {
          icon: AlertCircle,
          color: "text-orange-600 dark:text-orange-400",
          bg: "bg-orange-100 dark:bg-orange-900/30",
        };
      case "medium":
        return {
          icon: Info,
          color: "text-yellow-600 dark:text-yellow-400",
          bg: "bg-yellow-100 dark:bg-yellow-900/30",
        };
      case "low":
        return {
          icon: Info,
          color: "text-blue-600 dark:text-blue-400",
          bg: "bg-blue-100 dark:bg-blue-900/30",
        };
      default:
        return { icon: Info, color: "text-gray-600", bg: "bg-gray-100" };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityOrder = (priority: string) => {
    switch (priority) {
      case "critical":
        return 1;
      case "high":
        return 2;
      case "medium":
        return 3;
      case "low":
        return 4;
      default:
        return 5;
    }
  };

  const sortedTickets = [...tickets].sort((a, b) => {
    if (sortBy === "priority")
      return getPriorityOrder(a.priority) - getPriorityOrder(b.priority);
    if (sortBy === "dueDate")
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    return a.status.localeCompare(b.status);
  });

  const priorityCounts = {
    critical: tickets.filter((t) => t.priority === "critical").length,
    high: tickets.filter((t) => t.priority === "high").length,
    medium: tickets.filter((t) => t.priority === "medium").length,
    low: tickets.filter((t) => t.priority === "low").length,
  };

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {/* Header and Stats */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Support Tickets
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Manage and track support requests
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                Export
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition">
                New Ticket
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {["critical", "high", "medium", "low"].map((level) => {
              const iconProps = getPriorityIcon(level);
              return (
                <div
                  key={level}
                  className={`bg-linear-to-br ${iconProps.bg} p-4 rounded-xl`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {priorityCounts[level as keyof typeof priorityCounts]}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </div>
                    </div>
                    <iconProps.icon className={`w-8 h-8 ${iconProps.color}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Sort by:
            </span>
            {(["priority", "dueDate", "status"] as const).map((sort) => (
              <button
                key={sort}
                onClick={() => setSortBy(sort)}
                className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  sortBy === sort
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                {sort}
              </button>
            ))}
          </div>
        </div>

        {/* Ticket Table */}
        <div className="overflow-x-auto p-6">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ticket
                </th>
                <th className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Assignee
                </th>
                <th className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Priority
                </th>
                <th className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Due Date
                </th>
                <th className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Created
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTickets.map((ticket, idx) => {
                const iconProps = getPriorityIcon(ticket.priority);
                return (
                  <motion.tr
                    key={ticket.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                  >
                    <td className="py-3 px-4">{ticket.title}</td>
                    <td className="py-3 px-4 flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />{" "}
                      {ticket.assignee}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-sm rounded ${iconProps.bg} ${iconProps.color}`}
                      >
                        <iconProps.icon className="w-4 h-4" /> {ticket.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 text-sm rounded ${getStatusColor(
                          ticket.status
                        )}`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{ticket.dueDate}</td>
                    <td className="py-3 px-4 flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {ticket.created}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
