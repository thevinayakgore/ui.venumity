import { useState } from "react";

interface Activity {
  id: number;
  time: string;
  user: string;
  action: string;
  target: string;
  icon: string;
  color: string;
}

export default function CompactTimeline() {
  const [filter, setFilter] = useState<string>("all");

  const activities: Activity[] = [
    {
      id: 1,
      time: "2 minutes ago",
      user: "John Doe",
      action: "created",
      target: "Project Proposal",
      icon: "📝",
      color: "bg-blue-100",
    },
    {
      id: 2,
      time: "15 minutes ago",
      user: "Sarah Smith",
      action: "updated",
      target: "Design Mockups",
      icon: "🎨",
      color: "bg-green-100",
    },
    {
      id: 3,
      time: "1 hour ago",
      user: "Mike Johnson",
      action: "commented",
      target: "Code Review",
      icon: "💬",
      color: "bg-purple-100",
    },
    {
      id: 4,
      time: "2 hours ago",
      user: "Emily Wilson",
      action: "uploaded",
      target: "Meeting Notes",
      icon: "📎",
      color: "bg-yellow-100",
    },
    {
      id: 5,
      time: "3 hours ago",
      user: "David Brown",
      action: "approved",
      target: "Budget Plan",
      icon: "✅",
      color: "bg-green-100",
    },
    {
      id: 6,
      time: "5 hours ago",
      user: "Lisa Taylor",
      action: "shared",
      target: "Marketing Assets",
      icon: "🔗",
      color: "bg-blue-100",
    },
    {
      id: 7,
      time: "Yesterday",
      user: "Alex Chen",
      action: "completed",
      target: "Sprint Tasks",
      icon: "🏁",
      color: "bg-purple-100",
    },
    {
      id: 8,
      time: "2 days ago",
      user: "Robert Garcia",
      action: "assigned",
      target: "Bug Tickets",
      icon: "🎯",
      color: "bg-red-100",
    },
  ];

  const filteredActivities =
    filter === "all"
      ? activities
      : activities.filter((activity) => activity.action === filter);

  const actionFilters = [
    { key: "all", label: "All Activities" },
    { key: "created", label: "Created" },
    { key: "updated", label: "Updated" },
    { key: "commented", label: "Comments" },
    { key: "uploaded", label: "Uploads" },
  ];

  const getActionColor = (action: string) => {
    switch (action) {
      case "created":
        return "text-blue-600";
      case "updated":
        return "text-green-600";
      case "commented":
        return "text-purple-600";
      case "uploaded":
        return "text-yellow-600";
      case "approved":
        return "text-green-600";
      case "shared":
        return "text-blue-600";
      case "completed":
        return "text-purple-600";
      case "assigned":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Recent Activity</h2>
          <p className="text-gray-500">Team updates and notifications</p>
        </div>
        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
          Mark All Read
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {actionFilters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              filter === key
                ? "bg-blue-600 text-white"
                : "border text-gray-700 hover:bg-gray-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {filteredActivities.map((activity, index) => (
          <div key={activity.id} className="relative flex items-start">
            {/* Timeline line */}
            {index < filteredActivities.length - 1 && (
              <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2"></div>
            )}

            {/* Icon */}
            <div className="relative z-10">
              <div
                className={`w-12 h-12 ${activity.color} rounded-full flex items-center justify-center`}
              >
                <span className="text-xl">{activity.icon}</span>
              </div>
            </div>

            {/* Content */}
            <div className="ml-4 flex-1">
              <div className="bg-gray-50 border rounded-lg p-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-semibold">{activity.user}</span>
                  <span
                    className={`font-medium ${getActionColor(activity.action)}`}
                  >
                    {activity.action}
                  </span>
                  <span className="font-semibold">{activity.target}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{activity.time}</span>
                  <div className="flex space-x-2">
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      View
                    </button>
                    <button className="text-sm text-gray-500 hover:text-gray-700">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📭</div>
          <h3 className="text-xl font-semibold mb-2">No activities found</h3>
          <p className="text-gray-500">Try selecting a different filter</p>
        </div>
      )}

      <div className="mt-6 pt-6 border-t text-center">
        <button className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
          Load More Activities
        </button>
      </div>
    </div>
  );
}
