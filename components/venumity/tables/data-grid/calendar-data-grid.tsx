"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  Users,
  MapPin,
} from "lucide-react";

export default function DataGrid2_4() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("week");

  const events = [
    {
      id: 1,
      title: "Team Meeting",
      time: "09:00 - 10:30",
      date: "2024-01-22",
      type: "meeting",
      participants: 5,
      location: "Conference Room A",
    },
    {
      id: 2,
      title: "Client Call",
      time: "11:00 - 11:45",
      date: "2024-01-22",
      type: "call",
      participants: 2,
      location: "Zoom",
    },
    {
      id: 3,
      title: "Lunch Break",
      time: "12:30 - 13:30",
      date: "2024-01-22",
      type: "personal",
      participants: 0,
      location: "Cafeteria",
    },
    {
      id: 4,
      title: "Project Review",
      time: "14:00 - 15:30",
      date: "2024-01-22",
      type: "meeting",
      participants: 8,
      location: "Board Room",
    },
    {
      id: 5,
      title: "Training Session",
      time: "10:00 - 12:00",
      date: "2024-01-23",
      type: "training",
      participants: 12,
      location: "Training Room",
    },
    {
      id: 6,
      title: "Product Demo",
      time: "15:00 - 16:00",
      date: "2024-01-24",
      type: "demo",
      participants: 6,
      location: "Showroom",
    },
  ];

  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-500";
      case "call":
        return "bg-green-500";
      case "personal":
        return "bg-amber-500";
      case "training":
        return "bg-purple-500";
      case "demo":
        return "bg-pink-500";
      default:
        return "bg-gray-500";
    }
  };

  const getEventsForHour = (hour: number) => {
    return events.filter((event) => {
      const eventHour = parseInt(event.time.split(":")[0]);
      return eventHour === hour;
    });
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setDate(
        newDate.getDate() - (view === "week" ? 7 : view === "day" ? 1 : 30)
      );
    } else {
      newDate.setDate(
        newDate.getDate() + (view === "week" ? 7 : view === "day" ? 1 : 30)
      );
    }
    setCurrentDate(newDate);
  };

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <CalendarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Calendar
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Schedule and manage your events
                </p>
              </div>
            </div>

            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Event
            </button>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateDate("prev")}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Week of Jan 22 - 28, 2024
              </h3>

              <button
                onClick={() => navigateDate("next")}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {(["day", "week", "month"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize ${
                    view === v
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Time Header */}
            <div className="grid grid-cols-8 border-b border-gray-200 dark:border-gray-800">
              <div className="p-4"></div>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day, index) => (
                  <div key={day} className="p-4 text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {day}
                    </div>
                    <div
                      className={`text-2xl font-bold ${
                        index === new Date().getDay() - 1
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {22 + index}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Time Slots */}
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {hours.map((hour) => (
                <div key={hour} className="grid grid-cols-8">
                  <div className="p-4 border-r border-gray-200 dark:border-gray-800">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                    </div>
                  </div>

                  {[...Array(7)].map((_, dayIndex) => {
                    const eventsForSlot = getEventsForHour(hour).filter(
                      (event) =>
                        parseInt(event.date.split("-")[2]) === 22 + dayIndex
                    );

                    return (
                      <div
                        key={dayIndex}
                        className="p-2 border-r border-gray-200 dark:border-gray-800 min-h-[80px] hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      >
                        {eventsForSlot.map((event) => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`mb-2 p-3 rounded-lg ${getEventTypeColor(
                              event.type
                            )} bg-opacity-10 border-l-4 ${getEventTypeColor(
                              event.type
                            )} border-opacity-100`}
                          >
                            <div className="font-medium text-gray-900 dark:text-white mb-1">
                              {event.title}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Clock className="w-3 h-3" />
                              <span>{event.time}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Upcoming Events
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {events.slice(0, 3).map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${getEventTypeColor(
                        event.type
                      )}`}
                    />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {event.title}
                    </h4>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {event.date}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{event.participants} participants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
