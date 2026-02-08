"use client";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  PauseCircle,
  Users,
  Target,
} from "lucide-react";

const timelineData = [
  {
    id: 1,
    date: "2024-01-15",
    time: "09:00 AM",
    title: "Project Kickoff Meeting",
    description:
      "Initial meeting with stakeholders to discuss project goals and timelines",
    status: "completed",
    duration: "2 hours",
    attendees: 8,
    color: "from-blue-500 to-cyan-600",
    icon: Users,
  },
  {
    id: 2,
    date: "2024-01-16",
    time: "02:00 PM",
    title: "Design Phase Review",
    description:
      "Review initial wireframes and design concepts with the design team",
    status: "in-progress",
    duration: "1.5 hours",
    attendees: 5,
    color: "from-purple-500 to-pink-600",
    icon: Target,
  },
  {
    id: 3,
    date: "2024-01-17",
    time: "10:30 AM",
    title: "Development Sprint Planning",
    description:
      "Plan the upcoming development sprint and assign tasks to team members",
    status: "upcoming",
    duration: "3 hours",
    attendees: 12,
    color: "from-green-500 to-emerald-600",
    icon: PlayCircle,
  },
  {
    id: 4,
    date: "2024-01-18",
    time: "11:00 AM",
    title: "Client Presentation",
    description:
      "Present progress to the client and gather feedback for improvements",
    status: "upcoming",
    duration: "1 hour",
    attendees: 6,
    color: "from-orange-500 to-yellow-600",
    icon: AlertCircle,
  },
  {
    id: 5,
    date: "2024-01-19",
    time: "03:00 PM",
    title: "Quality Assurance Testing",
    description:
      "Conduct thorough testing of completed features and report any issues",
    status: "upcoming",
    duration: "4 hours",
    attendees: 4,
    color: "from-red-500 to-pink-600",
    icon: CheckCircle,
  },
  {
    id: 6,
    date: "2024-01-22",
    time: "09:30 AM",
    title: "Deployment Planning",
    description:
      "Plan the deployment process and prepare for production release",
    status: "upcoming",
    duration: "2 hours",
    attendees: 7,
    color: "from-indigo-500 to-blue-600",
    icon: PauseCircle,
  },
];

export default function TimelineTable() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <PlayCircle className="w-5 h-5 text-blue-500" />;
      case "upcoming":
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "upcoming":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Project Timeline
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
            Track project milestones and upcoming events
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-blue-500 via-purple-500 to-pink-500"></div>

          <div className="space-y-8">
            {timelineData.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-16 sm:pl-20"
              >
                {/* Timeline Node */}
                <div
                  className={`absolute left-4 sm:left-6 top-4 w-4 h-4 rounded-full border-4 border-white dark:border-gray-900 bg-linear-to-r ${item.color}`}
                ></div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        {getStatusIcon(item.status)}
                        <span
                          className={`ml-2 text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(
                            item.status
                          )}`}
                        >
                          {item.status.replace("-", " ").toUpperCase()}
                        </span>
                        <span className="ml-auto text-sm text-gray-500 dark:text-gray-400 lg:hidden">
                          {item.date}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="w-4 h-4 mr-2" />
                          {item.duration}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Users className="w-4 h-4 mr-2" />
                          {item.attendees} attendees
                        </div>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <div className="mb-2">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 lg:justify-end">
                          <Calendar className="w-4 h-4 mr-2" />
                          {item.date}
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                          {item.time}
                        </div>
                      </div>

                      <div
                        className={`p-3 rounded-xl bg-linear-to-br ${item.color} inline-block`}
                      >
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline Legend */}
        <div className="mt-8 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
            Timeline Legend
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-linear-to-r from-green-500 to-emerald-600 mr-3"></div>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  Completed
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Tasks that are finished
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-linear-to-r from-blue-500 to-cyan-600 mr-3"></div>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  In Progress
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Currently being worked on
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-linear-to-r from-gray-400 to-gray-500 mr-3"></div>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  Upcoming
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Scheduled for future
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Timeline auto-updates as tasks progress • Next milestone: Development
          Sprint Planning
        </div>
      </div>
    </motion.main>
  );
}
