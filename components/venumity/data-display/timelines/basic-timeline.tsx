interface TimelineEvent {
  id: number;
  time: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export default function BasicTimeline() {
  const events: TimelineEvent[] = [
    {
      id: 1,
      time: "9:00 AM",
      title: "Team Standup",
      description: "Daily sync with development team",
      icon: "👥",
      color: "bg-blue-500",
    },
    {
      id: 2,
      time: "10:30 AM",
      title: "Client Meeting",
      description: "Project review with TechCorp",
      icon: "💼",
      color: "bg-green-500",
    },
    {
      id: 3,
      time: "1:00 PM",
      title: "Lunch Break",
      description: "Team lunch at cafeteria",
      icon: "🍕",
      color: "bg-yellow-500",
    },
    {
      id: 4,
      time: "2:30 PM",
      title: "Code Review",
      description: "Review pull requests with team",
      icon: "💻",
      color: "bg-purple-500",
    },
    {
      id: 5,
      time: "4:00 PM",
      title: "Planning Session",
      description: "Sprint planning for next week",
      icon: "📋",
      color: "bg-red-500",
    },
    {
      id: 6,
      time: "6:00 PM",
      title: "Wrap Up",
      description: "End of day tasks and updates",
      icon: "🏁",
      color: "bg-gray-500",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Today is Schedule</h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>

        {/* Events */}
        <div className="space-y-8">
          {events.map((event, index) => (
            <div key={event.id} className="relative flex items-start">
              {/* Time */}
              <div className="absolute left-0 w-12 text-right pr-4 -translate-x-full">
                <div className="text-sm font-semibold text-gray-700">
                  {event.time}
                </div>
              </div>

              {/* Icon/Connector */}
              <div className="relative z-10">
                <div
                  className={`w-12 h-12 ${event.color} rounded-full flex items-center justify-center text-white text-lg`}
                >
                  {event.icon}
                </div>
                {index < events.length - 1 && (
                  <div className="absolute left-1/2 top-full w-0.5 h-8 bg-gray-200 -translate-x-1/2"></div>
                )}
              </div>

              {/* Content */}
              <div className="ml-6 flex-1">
                <div className="bg-gray-50 border rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                  <div className="mt-3 flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 ${event.color} text-white rounded text-xs`}
                    >
                      {event.time}
                    </span>
                    <span className="text-xs text-gray-500">
                      {index === 0
                        ? "Starting soon"
                        : index === events.length - 1
                        ? "Last event"
                        : "Upcoming"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
