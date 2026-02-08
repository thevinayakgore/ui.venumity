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
  Wifi,
  WifiOff,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";

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
  pulse?: boolean;
}

const statusBadges: StatusBadge[] = [
  {
    id: "online",
    label: "Online",
    status: "online",
    icon: <Wifi className="w-3.5 h-3.5" />,
    color: "bg-emerald-500 text-white border-emerald-600",
    description: "System is online and responsive",
    pulse: true,
  },
  {
    id: "offline",
    label: "Offline",
    status: "offline",
    icon: <WifiOff className="w-3.5 h-3.5" />,
    color: "bg-gray-500 text-white border-gray-600",
    description: "System is offline or unavailable",
  },
  {
    id: "active",
    label: "Active",
    status: "active",
    icon: <Circle className="w-3.5 h-3.5" />,
    color: "bg-blue-500 text-white border-blue-600",
    description: "User is currently active",
    pulse: true,
  },
  {
    id: "inactive",
    label: "Inactive",
    status: "inactive",
    icon: <Circle className="w-3.5 h-3.5" />,
    color: "bg-gray-400 text-white border-gray-500",
    description: "User is not currently active",
  },
  {
    id: "success",
    label: "Success",
    status: "success",
    icon: <CheckCircle className="w-3.5 h-3.5" />,
    color: "bg-green-500 text-white border-green-600",
    description: "Operation completed successfully",
  },
  {
    id: "error",
    label: "Error",
    status: "error",
    icon: <XCircle className="w-3.5 h-3.5" />,
    color: "bg-red-500 text-white border-red-600",
    description: "An error has occurred",
  },
  {
    id: "warning",
    label: "Warning",
    status: "warning",
    icon: <AlertCircle className="w-3.5 h-3.5" />,
    color: "bg-amber-500 text-white border-amber-600",
    description: "Warning message or alert",
  },
  {
    id: "pending",
    label: "Pending",
    status: "pending",
    icon: <Clock className="w-3.5 h-3.5" />,
    color: "bg-yellow-500 text-white border-yellow-600",
    description: "Operation is pending or in progress",
  },
];

interface SystemStatus {
  id: string;
  name: string;
  status: StatusBadge["status"];
  lastUpdated: string;
}

const systemStatuses: SystemStatus[] = [
  { id: "1", name: "Web Server", status: "online", lastUpdated: "Just now" },
  { id: "2", name: "Database", status: "online", lastUpdated: "2 min ago" },
  { id: "3", name: "API Gateway", status: "warning", lastUpdated: "5 min ago" },
  { id: "4", name: "Cache Server", status: "error", lastUpdated: "10 min ago" },
  {
    id: "5",
    name: "File Storage",
    status: "pending",
    lastUpdated: "1 hour ago",
  },
  { id: "6", name: "Monitoring", status: "active", lastUpdated: "Just now" },
];

export default function InlineBadgeStatusIndicators() {
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [systems, setSystems] = useState(systemStatuses);
  const [autoUpdate, setAutoUpdate] = useState(true);

  const getStatusBadge = (status: StatusBadge["status"]) => {
    return (
      statusBadges.find((badge) => badge.status === status) || statusBadges[0]
    );
  };

  const renderStatusBadge = (badge: StatusBadge) => {
    const baseClasses = `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${badge.color}`;

    if (badge.pulse) {
      return (
        <span className={`relative ${baseClasses}`}>
          {badge.icon}
          {badge.label}
          <span className="absolute -top-1 -right-1">
            <motion.span
              className="block w-3 h-3 bg-current rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </span>
        </span>
      );
    }

    return (
      <span className={baseClasses}>
        {badge.icon}
        {badge.label}
      </span>
    );
  };

  const updateRandomSystem = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * systems.length);
    const statuses: StatusBadge["status"][] = [
      "online",
      "offline",
      "active",
      "warning",
      "error",
      "pending",
    ];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    setSystems((prev) =>
      prev.map((system, index) =>
        index === randomIndex
          ? { ...system, status: randomStatus, lastUpdated: "Just now" }
          : system
      )
    );
  }, [systems]);

  useEffect(() => {
    if (!autoUpdate) return;

    const interval = setInterval(() => {
      updateRandomSystem();
    }, 5000);

    return () => clearInterval(interval);
  }, [autoUpdate, updateRandomSystem]);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Tag className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Status Indicators
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={updateRandomSystem}
                className="px-3 py-1.5 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                <Zap className="w-4 h-4" />
              </button>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoUpdate}
                  onChange={(e) => setAutoUpdate(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Auto Update
                </span>
              </label>
            </div>
          </div>

          {/* Status Preview */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Status Preview
              </h3>

              <div className="flex flex-col items-center gap-6">
                <div className="text-center">
                  {renderStatusBadge(statusBadges[selectedStatus])}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                  {statusBadges[selectedStatus].description}
                </p>
              </div>
            </div>

            {/* System Status Dashboard */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                System Status Dashboard
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {systems.map((system) => {
                  const badge = getStatusBadge(system.status);
                  return (
                    <div
                      key={system.id}
                      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {system.name}
                        </span>
                        {renderStatusBadge(badge)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Status: {badge.label}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Updated: {system.lastUpdated}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Status Types */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Status Types
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {statusBadges.map((badge, index) => (
                <button
                  key={badge.id}
                  onClick={() => setSelectedStatus(index)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedStatus === index
                      ? "ring-2 ring-offset-2 ring-blue-500 border-transparent"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`p-1.5 rounded ${badge.color.split(" ")[0]}`}
                    >
                      {badge.icon}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        selectedStatus === index
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
                  {badge.pulse && (
                    <div className="mt-2">
                      <span className="text-xs text-blue-500 dark:text-blue-400">
                        Live pulse
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Usage Examples */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Real-time Examples
            </h3>

            <div className="space-y-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    User Connection
                  </span>
                  {renderStatusBadge(getStatusBadge("online"))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  John Doe is currently{" "}
                  <span className="font-medium">online</span> and active
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Payment Processing
                  </span>
                  {renderStatusBadge(getStatusBadge("pending"))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Transaction #12345 is{" "}
                  <span className="font-medium">pending</span> approval
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    System Health
                  </span>
                  {renderStatusBadge(getStatusBadge("warning"))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  High CPU usage detected -{" "}
                  <span className="font-medium">warning</span> status
                </p>
              </div>
            </div>
          </div>

          {/* Status Statistics */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              System Statistics
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  label: "Online Systems",
                  value: systems.filter((s) => s.status === "online").length,
                  color: "text-emerald-600 dark:text-emerald-400",
                },
                {
                  label: "Warning Systems",
                  value: systems.filter((s) => s.status === "warning").length,
                  color: "text-amber-600 dark:text-amber-400",
                },
                {
                  label: "Error Systems",
                  value: systems.filter((s) => s.status === "error").length,
                  color: "text-red-600 dark:text-red-400",
                },
                {
                  label: "Pending Systems",
                  value: systems.filter((s) => s.status === "pending").length,
                  color: "text-yellow-600 dark:text-yellow-400",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center"
                >
                  <p className={`text-2xl font-bold mb-1 ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
