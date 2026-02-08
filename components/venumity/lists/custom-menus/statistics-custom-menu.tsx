"use client";
import {
  TrendingUp,
  Users,
  DollarSign,
  FileText,
  Activity,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

export default function CustomMenuWithStatistics() {
  const stats = [
    {
      label: "Total Revenue",
      value: "$24,580",
      change: "+12.5%",
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      label: "Active Users",
      value: "1,248",
      change: "+8.2%",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Conversion Rate",
      value: "3.42%",
      change: "-1.2%",
      icon: TrendingUp,
      color: "bg-purple-500",
    },
    {
      label: "Documents",
      value: "342",
      change: "+23.1%",
      icon: FileText,
      color: "bg-orange-500",
    },
  ];

  const recentActivity = [
    { user: "John Doe", action: "uploaded a new document", time: "2 min ago" },
    {
      user: "Sarah Smith",
      action: "commented on Project X",
      time: "15 min ago",
    },
    {
      user: "Mike Johnson",
      action: "updated billing information",
      time: "1 hour ago",
    },
    {
      user: "Emma Wilson",
      action: "created a new project",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="w-80 p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        Custom Menu with Statistics
      </h3>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith("+");

          return (
            <div
              key={stat.label}
              className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span
                  className={`text-sm font-medium flex items-center ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isPositive ? (
                    <ArrowUp className="w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDown className="w-3 h-3 mr-1" />
                  )}
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-primary" />
            <h4 className="font-medium text-gray-900 dark:text-white">
              Recent Activity
            </h4>
          </div>
          <button className="text-sm text-primary hover:text-primary/80">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {activity.user.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-white truncate">
                  <span className="font-medium">{activity.user}</span>{" "}
                  {activity.action}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
