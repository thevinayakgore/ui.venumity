"use client";
import { motion } from "framer-motion";
import {
  Tag,
  Circle,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Zap,
  Shield,
} from "lucide-react";
import { useState } from "react";

interface StatusLabel {
  id: string;
  label: string;
  status:
    | "online"
    | "offline"
    | "active"
    | "inactive"
    | "success"
    | "error"
    | "warning"
    | "pending";
  icon: React.ReactNode;
  color: string;
  description: string;
}

const statusLabels: StatusLabel[] = [
  {
    id: "online",
    label: "Online",
    status: "online",
    icon: <Circle className="w-3 h-3" />,
    color:
      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
    description: "System is online and responsive",
  },
  {
    id: "offline",
    label: "Offline",
    status: "offline",
    icon: <Circle className="w-3 h-3" />,
    color:
      "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700",
    description: "System is offline or unavailable",
  },
  {
    id: "success",
    label: "Success",
    status: "success",
    icon: <CheckCircle className="w-3 h-3" />,
    color:
      "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800",
    description: "Operation completed successfully",
  },
  {
    id: "error",
    label: "Error",
    status: "error",
    icon: <XCircle className="w-3 h-3" />,
    color:
      "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800",
    description: "An error has occurred",
  },
  {
    id: "warning",
    label: "Warning",
    status: "warning",
    icon: <AlertCircle className="w-3 h-3" />,
    color:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800",
    description: "Warning message or alert",
  },
  {
    id: "pending",
    label: "Pending",
    status: "pending",
    icon: <Clock className="w-3 h-3" />,
    color:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800",
    description: "Operation is pending or in progress",
  },
  {
    id: "active",
    label: "Active",
    status: "active",
    icon: <Zap className="w-3 h-3" />,
    color:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800",
    description: "User is currently active",
  },
  {
    id: "secure",
    label: "Secure",
    status: "success",
    icon: <Shield className="w-3 h-3" />,
    color:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800",
    description: "Security verified or protected",
  },
];

const systemStatuses: { name: string; status: StatusLabel["status"] }[] = [
  { name: "Web Server", status: "online" },
  { name: "Database", status: "success" },
  { name: "API Gateway", status: "warning" },
  { name: "Cache Server", status: "error" },
  { name: "File Storage", status: "pending" },
  { name: "Monitoring", status: "active" },
];

export default function LabelStatus() {
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [showDot, setShowDot] = useState(true);

  const getStatusLabel = (status: StatusLabel["status"]) => {
    return (
      statusLabels.find((label) => label.status === status) || statusLabels[0]
    );
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-5xl">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 mb-2">
            <Tag className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Status Labels
            </span>
          </div>

          {/* Status Preview */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Status Label Preview
              </h3>

              <div className="flex items-center gap-6">
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium ${statusLabels[selectedStatus].color}`}
                >
                  {showDot && (
                    <span className="relative">
                      {statusLabels[selectedStatus].icon}
                    </span>
                  )}
                  {statusLabels[selectedStatus].label}
                </span>

                <div className="text-gray-600 dark:text-gray-400">
                  <p className="text-sm">
                    Status: {statusLabels[selectedStatus].status}
                  </p>
                  <p className="text-sm">
                    Dot: {showDot ? "Visible" : "Hidden"}
                  </p>
                </div>
              </div>
            </div>

            {/* System Status Dashboard */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                System Status Dashboard
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {systemStatuses.map((system, index) => {
                  const label = getStatusLabel(system.status);
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      {showDot && label.icon}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {system.name}
                        </p>
                        <p className={`text-xs ${label.color.split(" ")[4]}`}>
                          {label.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Status Selection */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  Status Types
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {statusLabels.length} different statuses
                </p>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showDot}
                  onChange={(e) => setShowDot(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Show Status Dot
                </span>
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {statusLabels.map((label, index) => (
                <button
                  key={label.id}
                  onClick={() => setSelectedStatus(index)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedStatus === index
                      ? "ring-2 ring-offset-2 ring-blue-500 border-transparent"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1 rounded ${label.color.split(" ")[0]}`}>
                      {label.icon}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        selectedStatus === index
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {label.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-left">
                    {label.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Usage Examples */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Real-world Examples
            </h3>

            <div className="space-y-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    User Connection
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-sm font-medium ${
                      getStatusLabel("online").color
                    }`}
                  >
                    {showDot && getStatusLabel("online").icon}
                    Online
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  User is currently connected and active
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Payment Processing
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-sm font-medium ${
                      getStatusLabel("pending").color
                    }`}
                  >
                    {showDot && getStatusLabel("pending").icon}
                    Pending
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Transaction is being processed
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    System Health
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-sm font-medium ${
                      getStatusLabel("warning").color
                    }`}
                  >
                    {showDot && getStatusLabel("warning").icon}
                    Warning
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  High CPU usage detected
                </p>
              </div>
            </div>
          </div>

          {/* All Status Labels */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              All Status Labels
            </h3>

            <div className="flex flex-wrap gap-3">
              {statusLabels.map((label) => (
                <span
                  key={label.id}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium ${label.color}`}
                >
                  {showDot && label.icon}
                  {label.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
