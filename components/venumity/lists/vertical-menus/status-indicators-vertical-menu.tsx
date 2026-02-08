"use client";
import { useState } from "react";
import {
  Circle,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Zap,
  Battery,
  Wifi,
  Cloud,
  Server,
} from "lucide-react";

export default function VerticalMenuWithStatusIndicators() {
  const [activeItem, setActiveItem] = useState("overview");

  const statusItems = [
    {
      id: "overview",
      label: "System Overview",
      icon: Server,
      status: "operational",
      lastCheck: "Just now",
    },
    {
      id: "api",
      label: "API Services",
      icon: Cloud,
      status: "degraded",
      lastCheck: "2 min ago",
      issues: 2,
    },
    {
      id: "database",
      label: "Database",
      icon: Server,
      status: "operational",
      lastCheck: "5 min ago",
    },
    {
      id: "cache",
      label: "Cache Service",
      icon: Zap,
      status: "outage",
      lastCheck: "10 min ago",
      issues: 5,
    },
    {
      id: "network",
      label: "Network",
      icon: Wifi,
      status: "operational",
      lastCheck: "1 min ago",
    },
    {
      id: "storage",
      label: "Storage",
      icon: Battery,
      status: "maintenance",
      lastCheck: "15 min ago",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "degraded":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "outage":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "maintenance":
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-500";
      case "degraded":
        return "bg-yellow-500";
      case "outage":
        return "bg-red-500";
      case "maintenance":
        return "bg-blue-500";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "operational":
        return "All systems operational";
      case "degraded":
        return "Partial degradation";
      case "outage":
        return "Service outage";
      case "maintenance":
        return "Under maintenance";
      default:
        return "Unknown status";
    }
  };

  const getServiceDetails = (itemId: string) => {
    const item = statusItems.find((i) => i.id === itemId);
    if (!item) return null;

    const details = {
      overview: {
        uptime: "99.9%",
        responseTime: "42ms",
        incidents: "0",
        lastIncident: "30 days ago",
      },
      api: {
        uptime: "98.2%",
        responseTime: "128ms",
        incidents: "2",
        lastIncident: "2 hours ago",
      },
      database: {
        uptime: "99.95%",
        responseTime: "18ms",
        incidents: "0",
        lastIncident: "45 days ago",
      },
      cache: {
        uptime: "95.4%",
        responseTime: "256ms",
        incidents: "5",
        lastIncident: "Ongoing",
      },
      network: {
        uptime: "99.99%",
        responseTime: "8ms",
        incidents: "0",
        lastIncident: "90 days ago",
      },
      storage: {
        uptime: "99.8%",
        responseTime: "64ms",
        incidents: "1",
        lastIncident: "3 hours ago",
      },
    };

    return details[itemId as keyof typeof details];
  };

  const details = getServiceDetails(activeItem);
  const activeItemData = statusItems.find((i) => i.id === activeItem);

  return (
    <div className="w-80 p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        Vertical Menu with Status Indicators
      </h3>

      {/* Status Menu */}
      <div className="space-y-2 mb-6">
        {statusItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-white" : "text-gray-500"
                  }`}
                />
                <div className="text-left">
                  <div
                    className={`font-medium ${
                      isActive ? "text-white" : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {item.label}
                  </div>
                  <div
                    className={`text-sm ${
                      isActive
                        ? "text-white/80"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {item.lastCheck}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {item.issues && !isActive && (
                  <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium px-2 py-0.5 rounded-full">
                    {item.issues}
                  </span>
                )}
                {getStatusIcon(item.status)}
              </div>
            </button>
          );
        })}
      </div>

      {/* Status Details */}
      {activeItemData && details && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          {/* Status Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-lg ${getStatusColor(
                  activeItemData.status
                )}/10`}
              >
                {getStatusIcon(activeItemData.status)}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {activeItemData.label}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {getStatusText(activeItemData.status)}
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Last check: {activeItemData.lastCheck}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Uptime
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {details.uptime}
              </div>
            </div>
            <div className="p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Response Time
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {details.responseTime}
              </div>
            </div>
          </div>

          {/* Incidents */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Incidents (30 days)
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {details.incidents}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Last Incident
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {details.lastIncident}
              </span>
            </div>
          </div>

          {/* Status Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">
                Service Health
              </span>
              <span className="font-medium">{activeItemData.status}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${getStatusColor(
                  activeItemData.status
                )} transition-all duration-300`}
                style={{
                  width:
                    activeItemData.status === "operational"
                      ? "100%"
                      : activeItemData.status === "degraded"
                      ? "70%"
                      : activeItemData.status === "outage"
                      ? "30%"
                      : "50%",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* System Summary */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          System Summary
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {statusItems.filter((i) => i.status === "operational").length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Operational
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {statusItems.filter((i) => i.status === "outage").length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Outages
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
