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

interface StatusBadge {
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

const statusBadges: StatusBadge[] = [
  {
    id: "online",
    label: "Online",
    status: "online",
    icon: <Circle className="w-3 h-3" />,
    color: "bg-emerald-500 text-white",
    description: "System is online and responsive",
  },
  {
    id: "offline",
    label: "Offline",
    status: "offline",
    icon: <Circle className="w-3 h-3" />,
    color: "bg-gray-500 text-white",
    description: "System is offline or unavailable",
  },
  {
    id: "success",
    label: "Success",
    status: "success",
    icon: <CheckCircle className="w-3 h-3" />,
    color: "bg-green-500 text-white",
    description: "Operation completed successfully",
  },
  {
    id: "error",
    label: "Error",
    status: "error",
    icon: <XCircle className="w-3 h-3" />,
    color: "bg-red-500 text-white",
    description: "An error has occurred",
  },
  {
    id: "warning",
    label: "Warning",
    status: "warning",
    icon: <AlertCircle className="w-3 h-3" />,
    color: "bg-amber-500 text-white",
    description: "Warning message or alert",
  },
  {
    id: "pending",
    label: "Pending",
    status: "pending",
    icon: <Clock className="w-3 h-3" />,
    color: "bg-yellow-500 text-white",
    description: "Operation is pending or in progress",
  },
  {
    id: "active",
    label: "Active",
    status: "active",
    icon: <Zap className="w-3 h-3" />,
    color: "bg-blue-500 text-white",
    description: "User is currently active",
  },
  {
    id: "secure",
    label: "Secure",
    status: "success",
    icon: <Shield className="w-3 h-3" />,
    color: "bg-purple-500 text-white",
    description: "Security verified or protected",
  },
];

const systemStatuses: { name: string; status: StatusBadge["status"] }[] = [
  { name: "Web Server", status: "online" },
  { name: "Database", status: "success" },
  { name: "API Gateway", status: "warning" },
  { name: "Cache Server", status: "error" },
  { name: "File Storage", status: "pending" },
  { name: "Monitoring", status: "active" },
];

export default function TextBadgeStatus() {
  const [selectedBadge, setSelectedBadge] = useState(0);
  const [showIcon, setShowIcon] = useState(true);
  const [badgeSize, setBadgeSize] = useState<"sm" | "md" | "lg">("md");

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  const getStatusBadge = (status: StatusBadge["status"]) => {
    return (
      statusBadges.find((badge) => badge.status === status) || statusBadges[0]
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
              Status Badges
            </span>
          </div>

          {/* Badge Preview */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Status Badge Preview
              </h3>

              <div className="flex items-center gap-6">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full font-medium ${sizeClasses[badgeSize]} ${statusBadges[selectedBadge].color}`}
                >
                  {showIcon && statusBadges[selectedBadge].icon}
                  {statusBadges[selectedBadge].label}
                </span>

                <div className="text-gray-600 dark:text-gray-400">
                  <p className="text-sm">
                    Status: {statusBadges[selectedBadge].status}
                  </p>
                  <p className="text-sm">Size: {badgeSize.toUpperCase()}</p>
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
                  const badge = getStatusBadge(system.status);
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      <span
                        className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeClasses.sm} ${badge.color}`}
                      >
                        {showIcon && badge.icon}
                        {badge.label}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {system.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Badge Selection */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  Status Types
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {statusBadges.length} different statuses
                </p>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showIcon}
                  onChange={(e) => setShowIcon(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Show Icon
                </span>
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {statusBadges.map((badge, index) => (
                <button
                  key={badge.id}
                  onClick={() => setSelectedBadge(index)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedBadge === index
                      ? "ring-2 ring-offset-2 ring-blue-500 border-transparent"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1 rounded ${badge.color.split(" ")[0]}`}>
                      {badge.icon}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        selectedBadge === index
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-left">
                    {badge.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Size Options */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Size Options
            </h3>

            <div className="grid grid-cols-3 gap-4">
              {(["sm", "md", "lg"] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setBadgeSize(size)}
                  className={`p-4 rounded-lg border transition-all ${
                    badgeSize === size
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-2 ring-blue-500/20"
                      : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${sizeClasses[size]} ${statusBadges[selectedBadge].color}`}
                    >
                      {showIcon && statusBadges[selectedBadge].icon}
                      {size.toUpperCase()}
                    </span>
                    <span className="text-sm capitalize">{size}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Usage Examples */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Real-world Examples
            </h3>

            <div className="space-y-6">
              <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    User Connection
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full font-medium ${
                      sizeClasses.md
                    } ${getStatusBadge("online").color}`}
                  >
                    {showIcon && getStatusBadge("online").icon}
                    Online
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  User is currently connected and active
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Payment Processing
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full font-medium ${
                      sizeClasses.md
                    } ${getStatusBadge("pending").color}`}
                  >
                    {showIcon && getStatusBadge("pending").icon}
                    Pending
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Transaction is being processed
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    System Health
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full font-medium ${
                      sizeClasses.md
                    } ${getStatusBadge("warning").color}`}
                  >
                    {showIcon && getStatusBadge("warning").icon}
                    Warning
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  High CPU usage detected
                </p>
              </div>
            </div>
          </div>

          {/* All Badges Display */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              All Status Badges
            </h3>

            <div className="flex flex-wrap gap-3">
              {statusBadges.map((badge) => (
                <span
                  key={badge.id}
                  className={`inline-flex items-center gap-1.5 rounded-full font-medium ${sizeClasses[badgeSize]} ${badge.color}`}
                >
                  {showIcon && badge.icon}
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
