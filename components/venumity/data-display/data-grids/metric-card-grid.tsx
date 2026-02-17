interface MetricCard {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: string;
  color: string;
}

export default function MetricCardGrid() {
  const metrics: MetricCard[] = [
    {
      id: "1",
      title: "Total Users",
      value: "24,580",
      change: "+12.5%",
      trend: "up",
      icon: "👥",
      color: "bg-blue-500",
    },
    {
      id: "2",
      title: "Revenue",
      value: "$18,250",
      change: "+8.2%",
      trend: "up",
      icon: "💰",
      color: "bg-green-500",
    },
    {
      id: "3",
      title: "Conversion Rate",
      value: "3.2%",
      change: "-0.5%",
      trend: "down",
      icon: "📈",
      color: "bg-yellow-500",
    },
    {
      id: "4",
      title: "Avg. Session",
      value: "4m 32s",
      change: "+15s",
      trend: "up",
      icon: "⏱️",
      color: "bg-purple-500",
    },
    {
      id: "5",
      title: "Bounce Rate",
      value: "42%",
      change: "-3.2%",
      trend: "down",
      icon: "📉",
      color: "bg-red-500",
    },
    {
      id: "6",
      title: "Orders",
      value: "1,248",
      change: "+24.7%",
      trend: "up",
      icon: "📦",
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-w-6xl mx-auto">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 ${metric.color} rounded-xl flex items-center justify-center`}
            >
              <span className="text-2xl text-white">{metric.icon}</span>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                metric.trend === "up"
                  ? "bg-green-100 text-green-800"
                  : metric.trend === "down"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {metric.change}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">{metric.value}</div>
            <p className="text-gray-500 mb-3">{metric.title}</p>
            <div className="flex items-center text-sm">
              <span
                className={`mr-2 ${
                  metric.trend === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {metric.trend === "up" ? "↑" : "↓"}
              </span>
              <span className="text-gray-600">vs last month</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
