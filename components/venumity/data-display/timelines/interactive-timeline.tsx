import { useState } from "react";

interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  achievements: string[];
  icon: string;
  color: string;
}

export default function InteractiveTimeline() {
  const [activeEvent, setActiveEvent] = useState<number>(3);

  const events: TimelineEvent[] = [
    {
      id: 1,
      year: "2020",
      title: "Company Founded",
      description: "Started as a small startup with 5 employees",
      achievements: [
        "Secured seed funding",
        "First office space",
        "Initial product concept",
      ],
      icon: "🚀",
      color: "bg-blue-500",
    },
    {
      id: 2,
      year: "2021",
      title: "First Product Launch",
      description: "Launched our flagship product to market",
      achievements: ["1000+ users", "Product-market fit", "Team growth to 20"],
      icon: "🎯",
      color: "bg-green-500",
    },
    {
      id: 3,
      year: "2022",
      title: "Series A Funding",
      description: "Raised $10M in Series A funding round",
      achievements: [
        "Expanded to 50 employees",
        "New office space",
        "International expansion",
      ],
      icon: "💰",
      color: "bg-yellow-500",
    },
    {
      id: 4,
      year: "2023",
      title: "Product Expansion",
      description: "Launched 3 new product lines",
      achievements: [
        "Reached 100K users",
        "Enterprise partnerships",
        "Award-winning design",
      ],
      icon: "📈",
      color: "bg-purple-500",
    },
    {
      id: 5,
      year: "2024",
      title: "Global Presence",
      description: "Expanded operations to 5 new countries",
      achievements: [
        "500K+ users worldwide",
        "Series B funding",
        "Industry recognition",
      ],
      icon: "🌍",
      color: "bg-red-500",
    },
  ];

  const activeEventData =
    events.find((event) => event.id === activeEvent) || events[2];

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">Company Journey</h2>
      <p className="text-gray-500 mb-8">
        Our growth timeline from startup to global presence
      </p>

      {/* Timeline navigation */}
      <div className="relative mb-12">
        {/* Progress line */}
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -translate-y-1/2"></div>
        <div
          className="absolute left-0 h-1 bg-blue-500 -translate-y-1/2 transition-all duration-500"
          style={{
            width: `${((activeEvent - 1) / (events.length - 1)) * 100}%`,
            top: "50%",
          }}
        ></div>

        {/* Year markers */}
        <div className="relative flex justify-between">
          {events.map((event) => (
            <button
              key={event.id}
              onClick={() => setActiveEvent(event.id)}
              className="relative flex flex-col items-center"
            >
              {/* Marker */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  event.id === activeEvent
                    ? `${event.color} text-white scale-125`
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {event.icon}
              </div>

              {/* Year label */}
              <div
                className={`mt-2 font-semibold transition-colors ${
                  event.id === activeEvent ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {event.year}
              </div>

              {/* Connector line */}
              {event.id < events.length && (
                <div className="absolute top-4 left-1/2 w-full h-0.5 bg-transparent"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Active event details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div
                className={`w-16 h-16 ${activeEventData.color} rounded-xl flex items-center justify-center text-2xl text-white`}
              >
                {activeEventData.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold">{activeEventData.title}</h3>
                <div className="text-lg text-gray-600">
                  {activeEventData.year}
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg mb-6">
              {activeEventData.description}
            </p>

            <h4 className="font-semibold text-lg mb-3">Key Achievements</h4>
            <ul className="space-y-2">
              {activeEventData.achievements.map((achievement, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Timeline overview */}
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">All Milestones</h4>
          <div className="space-y-3">
            {events.map((event) => (
              <button
                key={event.id}
                onClick={() => setActiveEvent(event.id)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  event.id === activeEvent
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${event.color}`}
                    ></div>
                    <span className="font-semibold">{event.year}</span>
                  </div>
                  <span>{event.icon}</span>
                </div>
                <div className="text-sm text-gray-600">{event.title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <button
          onClick={() => setActiveEvent(Math.max(1, activeEvent - 1))}
          disabled={activeEvent === 1}
          className="px-6 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          ← Previous
        </button>

        <div className="text-gray-500">
          Milestone {activeEvent} of {events.length}
        </div>

        <button
          onClick={() =>
            setActiveEvent(Math.min(events.length, activeEvent + 1))
          }
          disabled={activeEvent === events.length}
          className="px-6 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
