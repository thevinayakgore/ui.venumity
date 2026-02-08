"use client";
import { useState, useEffect } from "react";
import {
  Loader,
  RefreshCw,
  User,
  Settings,
  Database,
  Shield,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

type TabId = "users" | "system" | "database" | "security";

interface TabData {
  users: UserData[];
  system: SystemData;
  database: DatabaseData;
  security: SecurityData;
}

interface UserData {
  id: number;
  name: string;
  role: string;
  status: "active" | "inactive";
  lastActive: string;
}

interface SystemData {
  cpu: number;
  memory: number;
  disk: number;
  uptime: string;
}

interface DatabaseData {
  connections: number;
  queries: number;
  size: string;
  status: "healthy" | "warning" | "error";
}

interface SecurityData {
  threats: number;
  lastScan: string;
  status: "secure" | "vulnerable";
  alerts: number;
}

export default function TabsWithContentLoading() {
  const [activeTab, setActiveTab] = useState<TabId>("users");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TabData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const tabs = [
    {
      id: "users" as TabId,
      label: "Users",
      icon: User,
      description: "User management",
    },
    {
      id: "system" as TabId,
      label: "System",
      icon: Settings,
      description: "System monitoring",
    },
    {
      id: "database" as TabId,
      label: "Database",
      icon: Database,
      description: "Database status",
    },
    {
      id: "security" as TabId,
      label: "Security",
      icon: Shield,
      description: "Security overview",
    },
  ];

  const fetchTabData = async () => {
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockData: TabData = {
      users: [
        {
          id: 1,
          name: "John Doe",
          role: "Admin",
          status: "active",
          lastActive: "2 min ago",
        },
        {
          id: 2,
          name: "Sarah Smith",
          role: "Editor",
          status: "active",
          lastActive: "15 min ago",
        },
        {
          id: 3,
          name: "Mike Johnson",
          role: "Viewer",
          status: "inactive",
          lastActive: "1 hour ago",
        },
        {
          id: 4,
          name: "Emma Wilson",
          role: "Admin",
          status: "active",
          lastActive: "5 min ago",
        },
      ],
      system: {
        cpu: 42,
        memory: 68,
        disk: 23,
        uptime: "15 days, 4 hours",
      },
      database: {
        connections: 128,
        queries: 2456,
        size: "2.4 GB",
        status: "healthy",
      },
      security: {
        threats: 3,
        lastScan: "1 hour ago",
        status: "secure",
        alerts: 12,
      },
    };

    setData(mockData);
    setLoading(false);
    setLastUpdated(new Date().toLocaleTimeString());
  };

  useEffect(() => {
    const load = async () => {
      await fetchTabData();
    };

    load();

    return () => {};
  }, [activeTab]);

  const renderTabContent = () => {
    if (loading || !data) {
      return (
        <div className="flex items-center justify-center p-12">
          <div className="text-center">
            <Loader className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
            <div className="text-gray-600 dark:text-gray-400">
              Loading {activeTab} data...
            </div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case "users":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                User Management
              </h4>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {data.users.filter((u) => u.status === "active").length} active
                users
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Name
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Role
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Status
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Last Active
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-200 dark:border-gray-700"
                    >
                      <td className="py-3 text-gray-900 dark:text-white">
                        {user.name}
                      </td>
                      <td className="py-3 text-gray-600 dark:text-gray-400">
                        {user.role}
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                          }`}
                        >
                          {user.status === "active" ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <XCircle className="w-3 h-3 mr-1" />
                          )}
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 text-gray-600 dark:text-gray-400">
                        {user.lastActive}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "system":
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              System Monitoring
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  CPU Usage
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {data.system.cpu}%
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${data.system.cpu}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Memory
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {data.system.memory}%
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${data.system.memory}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Disk Usage
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {data.system.disk}%
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${data.system.disk}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Uptime
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {data.system.uptime}
                </div>
              </div>
            </div>
          </div>
        );

      case "database":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Database Status
              </h4>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  data.database.status === "healthy"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : data.database.status === "warning"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {data.database.status === "healthy" ? (
                  <CheckCircle className="w-4 h-4 mr-1" />
                ) : (
                  <AlertCircle className="w-4 h-4 mr-1" />
                )}
                {data.database.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Active Connections
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {data.database.connections}
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Queries/Min
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {data.database.queries}
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Database Size
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {data.database.size}
                </div>
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Security Overview
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Security Status
                    </div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                      {data.security.status}
                    </div>
                  </div>
                  <div
                    className={`p-2 rounded-lg ${
                      data.security.status === "secure"
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {data.security.status === "secure" ? (
                      <Shield className="w-6 h-6" />
                    ) : (
                      <AlertCircle className="w-6 h-6" />
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Last scan: {data.security.lastScan}
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Active Threats
                    </div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {data.security.threats}
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Security alerts: {data.security.alerts}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Tabs with Content Loading
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Updated: {lastUpdated}
          </span>
          <button
            onClick={() => fetchTabData()}
            disabled={loading}
            className="p-2 text-gray-500 hover:text-primary disabled:opacity-50"
            title="Refresh data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              disabled={loading}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              } ${loading ? "opacity-50" : ""}`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
              {loading && isActive && (
                <Loader className="w-4 h-4 animate-spin" />
              )}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg min-h-[300px]">
        {renderTabContent()}
      </div>

      {/* Loading State Info */}
      {loading && (
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
          Loading data for {activeTab} tab...
        </div>
      )}
    </div>
  );
}
