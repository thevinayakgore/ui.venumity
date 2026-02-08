"use client";
import { useState } from "react";

interface TimelineEvent {
  id: number;
  title: string;
  description: string;
  time: string;
  status: "completed" | "current" | "upcoming";
}

export default function TimelineStepper() {
  const [events] = useState<TimelineEvent[]>([
    {
      id: 1,
      title: "Project Kickoff",
      description: "Initial meeting with stakeholders",
      time: "10:00 AM",
      status: "completed",
    },
    {
      id: 2,
      title: "Design Review",
      description: "Review initial designs with team",
      time: "11:30 AM",
      status: "completed",
    },
    {
      id: 3,
      title: "Development Start",
      description: "Begin development phase",
      time: "1:00 PM",
      status: "current",
    },
    {
      id: 4,
      title: "Testing Phase",
      description: "Start testing developed features",
      time: "3:00 PM",
      status: "upcoming",
    },
    {
      id: 5,
      title: "Deployment",
      description: "Deploy to production",
      time: "5:00 PM",
      status: "upcoming",
    },
  ]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

        {events.map((event) => (
          <div key={event.id} className="flex items-start mb-8 last:mb-0">
            <div className="relative z-10 mr-6">
              <div
                className={`
                w-16 h-16 rounded-full flex items-center justify-center text-lg font-semibold
                ${event.status === "completed" ? "bg-green-500 text-white" : ""}
                ${
                  event.status === "current"
                    ? "bg-primary text-white animate-pulse"
                    : ""
                }
                ${
                  event.status === "upcoming"
                    ? "bg-gray-200 dark:bg-gray-800 text-gray-500"
                    : ""
                }
              `}
              >
                {event.status === "completed" ? "✓" : event.id}
              </div>
            </div>

            <div className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                  {event.title}
                </h3>
                <span className="text-sm font-medium px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                  {event.time}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {event.description}
              </p>
              <div className="flex items-center space-x-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    event.status === "completed"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : event.status === "current"
                      ? "bg-primary/10 text-primary"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                  }`}
                >
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
                {event.status === "current" && (
                  <button className="text-xs px-3 py-1 bg-primary text-white rounded-lg hover:bg-primary/90">
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
