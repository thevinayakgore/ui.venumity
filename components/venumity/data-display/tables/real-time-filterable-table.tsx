import { useState, useEffect } from "react";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "debug";
  source: string;
  message: string;
  user: string;
}

export default function RealTimeFilterableTable() {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "1",
      timestamp: "2024-04-15 14:30:25",
      level: "info",
      source: "API Server",
      message: "User login successful",
      user: "john.doe",
    },
    {
      id: "2",
      timestamp: "2024-04-15 14:31:10",
      level: "error",
      source: "Database",
      message: "Connection timeout",
      user: "system",
    },
    {
      id: "3",
      timestamp: "2024-04-15 14:32:45",
      level: "warning",
      source: "Auth Service",
      message: "Failed login attempt",
      user: "unknown",
    },
    {
      id: "4",
      timestamp: "2024-04-15 14:33:20",
      level: "info",
      source: "Web Server",
      message: "Page loaded successfully",
      user: "visitor",
    },
    {
      id: "5",
      timestamp: "2024-04-15 14:34:05",
      level: "debug",
      source: "Cache Service",
      message: "Cache miss for key: user_123",
      user: "system",
    },
    {
      id: "6",
      timestamp: "2024-04-15 14:35:30",
      level: "error",
      source: "Payment Gateway",
      message: "Payment processing failed",
      user: "customer_456",
    },
    {
      id: "7",
      timestamp: "2024-04-15 14:36:15",
      level: "info",
      source: "Email Service",
      message: "Email sent successfully",
      user: "marketing",
    },
    {
      id: "8",
      timestamp: "2024-04-15 14:37:00",
      level: "warning",
      source: "Security",
      message: "Multiple failed attempts detected",
      user: "unknown",
    },
  ]);

  const [filters, setFilters] = useState({
    level: "all",
    source: "all",
    search: "",
  });

  const [autoRefresh, setAutoRefresh] = useState(true);

  const filteredLogs = logs.filter((log) => {
    // Search filter
    if (
      filters.search &&
      !log.message.toLowerCase().includes(filters.search.toLowerCase()) &&
      !log.source.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Level filter
    if (filters.level !== "all" && log.level !== filters.level) {
      return false;
    }

    // Source filter
    if (filters.source !== "all" && log.source !== filters.source) {
      return false;
    }

    return true;
  });

  const getLevelColor = (level: LogEntry["level"]) => {
    switch (level) {
      case "info":
        return "bg-blue-100 text-blue-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      case "debug":
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelIcon = (level: LogEntry["level"]) => {
    switch (level) {
      case "info":
        return "ℹ️";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      case "debug":
        return "🔍";
    }
  };

  const sources = Array.from(new Set(logs.map((log) => log.source)));

  // Simulate real-time log updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      const levels: LogEntry["level"][] = ["info", "warning", "error", "debug"];
      const sources = [
        "API Server",
        "Database",
        "Auth Service",
        "Web Server",
        "Cache Service",
        "Payment Gateway",
      ];
      const messages = [
        "New user registered",
        "Database query executed",
        "Cache updated",
        "API request processed",
        "Security scan completed",
        "Backup started",
        "System maintenance",
        "Performance metrics collected",
      ];
      const users = [
        "system",
        "admin",
        "user_123",
        "visitor",
        "api_client",
        "batch_job",
      ];

      const newLog: LogEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
        level: levels[Math.floor(Math.random() * levels.length)],
        source: sources[Math.floor(Math.random() * sources.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        user: users[Math.floor(Math.random() * users.length)],
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 49)]); // Keep only last 50 logs
    }, 3000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">System Logs</h2>
            <p className="text-gray-500">Real-time monitoring and filtering</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="auto-refresh"
                checked={autoRefresh}
                onChange={() => setAutoRefresh(!autoRefresh)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label
                htmlFor="auto-refresh"
                className="ml-2 text-sm text-gray-700"
              >
                Auto-refresh
              </label>
            </div>
            <button
              onClick={clearLogs}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Logs
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Log Level
            </label>
            <select
              value={filters.level}
              onChange={(e) =>
                setFilters({ ...filters, level: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Levels</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="debug">Debug</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Source
            </label>
            <select
              value={filters.source}
              onChange={(e) =>
                setFilters({ ...filters, source: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Sources</option>
              {sources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search log messages..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Time
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Level
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Source
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Message
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                User
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-mono text-sm text-gray-600">
                  {log.timestamp}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <span>{getLevelIcon(log.level)}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(
                        log.level
                      )}`}
                    >
                      {log.level.toUpperCase()}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {log.source}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="font-mono text-sm">{log.message}</div>
                </td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {log.user}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {filteredLogs.length} of {logs.length} logs • Auto-refresh:{" "}
            {autoRefresh ? "ON" : "OFF"}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Log levels:</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
              Info
            </span>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
              Warning
            </span>
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
              Error
            </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
              Debug
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
