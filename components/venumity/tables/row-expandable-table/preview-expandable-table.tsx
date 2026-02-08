"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Calendar,
  User,
  Tag,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

const projectData = [
  {
    id: 1,
    name: "Website Redesign 2024",
    status: "active",
    progress: 75,
    deadline: "2024-03-15",
    team: ["Alex", "Sarah", "Mike"],
    budget: "$25,000",
    spent: "$18,750",
    preview: {
      description:
        "Complete redesign of corporate website with modern UI/UX, improved performance, and mobile responsiveness.",
      tasks: [
        { id: 1, name: "Wireframes", status: "completed", assignee: "Alex" },
        { id: 2, name: "UI Design", status: "in-progress", assignee: "Sarah" },
        { id: 3, name: "Development", status: "pending", assignee: "Mike" },
      ],
      milestones: [
        { date: "2024-01-31", name: "Design Phase Complete" },
        { date: "2024-02-28", name: "Development Complete" },
        { date: "2024-03-15", name: "Launch" },
      ],
    },
  },
  {
    id: 2,
    name: "Mobile App Development",
    status: "active",
    progress: 45,
    deadline: "2024-04-30",
    team: ["Emma", "David", "Lisa"],
    budget: "$50,000",
    spent: "$22,500",
    preview: {
      description:
        "Native mobile application for iOS and Android with offline capabilities and push notifications.",
      tasks: [
        { id: 1, name: "Backend API", status: "completed", assignee: "David" },
        {
          id: 2,
          name: "iOS Development",
          status: "in-progress",
          assignee: "Emma",
        },
        {
          id: 3,
          name: "Android Development",
          status: "pending",
          assignee: "Lisa",
        },
      ],
      milestones: [
        { date: "2024-02-15", name: "Beta Release" },
        { date: "2024-04-15", name: "App Store Submission" },
        { date: "2024-04-30", name: "Public Launch" },
      ],
    },
  },
  {
    id: 3,
    name: "E-commerce Platform",
    status: "on-hold",
    progress: 30,
    deadline: "2024-05-20",
    team: ["John", "Maria", "Ken"],
    budget: "$75,000",
    spent: "$22,500",
    preview: {
      description:
        "Scalable e-commerce platform with payment integration, inventory management, and analytics dashboard.",
      tasks: [
        {
          id: 1,
          name: "Database Design",
          status: "completed",
          assignee: "John",
        },
        {
          id: 2,
          name: "Payment Gateway",
          status: "in-progress",
          assignee: "Maria",
        },
        { id: 3, name: "Admin Panel", status: "pending", assignee: "Ken" },
      ],
      milestones: [
        { date: "2024-03-01", name: "Payment Integration" },
        { date: "2024-04-15", name: "Testing Phase" },
        { date: "2024-05-20", name: "Launch" },
      ],
    },
  },
  {
    id: 4,
    name: "Marketing Campaign Q1",
    status: "completed",
    progress: 100,
    deadline: "2024-01-31",
    team: ["Tom", "Anna", "Chris"],
    budget: "$15,000",
    spent: "$14,250",
    preview: {
      description:
        "Q1 marketing campaign including social media, email marketing, and content creation.",
      tasks: [
        {
          id: 1,
          name: "Content Strategy",
          status: "completed",
          assignee: "Anna",
        },
        { id: 2, name: "Social Media", status: "completed", assignee: "Tom" },
        {
          id: 3,
          name: "Email Campaign",
          status: "completed",
          assignee: "Chris",
        },
      ],
      milestones: [
        { date: "2024-01-15", name: "Campaign Start" },
        { date: "2024-01-25", name: "Content Delivery" },
        { date: "2024-01-31", name: "Campaign End" },
      ],
    },
  },
  {
    id: 5,
    name: "Customer Portal Upgrade",
    status: "active",
    progress: 60,
    deadline: "2024-03-01",
    team: ["Sam", "Rachel"],
    budget: "$35,000",
    spent: "$21,000",
    preview: {
      description:
        "Upgrade customer portal with new features, improved security, and better user experience.",
      tasks: [
        { id: 1, name: "Security Audit", status: "completed", assignee: "Sam" },
        {
          id: 2,
          name: "UI Improvements",
          status: "in-progress",
          assignee: "Rachel",
        },
        { id: 3, name: "Testing", status: "pending", assignee: "Sam" },
      ],
      milestones: [
        { date: "2024-02-15", name: "Security Updates" },
        { date: "2024-02-28", name: "User Testing" },
        { date: "2024-03-01", name: "Go Live" },
      ],
    },
  },
];

export default function PreviewExpandableTable() {
  const [expandedRows, setExpandedRows] = useState<number[]>([1]);
  const [showAllPreviews, setShowAllPreviews] = useState(false);

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllPreviews = () => {
    if (showAllPreviews) {
      setExpandedRows([]);
    } else {
      setExpandedRows(projectData.map((p) => p.id));
    }
    setShowAllPreviews(!showAllPreviews);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "completed":
        return "bg-blue-500";
      case "on-hold":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Project Portfolio
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
                Click on projects to preview details and progress
              </p>
            </div>
            <button
              onClick={toggleAllPreviews}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium bg-linear-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              {showAllPreviews ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
              <span>
                {showAllPreviews ? "Hide All Previews" : "Show All Previews"}
              </span>
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-linear-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <tr>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="hidden md:table-cell px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="hidden lg:table-cell px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Team
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Preview
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {projectData.map((project) => (
                  <React.Fragment key={project.id}>
                    <tr
                      key={project.id}
                      onClick={() => toggleRow(project.id)}
                      className="group cursor-pointer hover:bg-linear-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800/50 dark:hover:to-gray-900/50 transition-all duration-300"
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center">
                          <div
                            className={`w-3 h-3 rounded-full ${getStatusColor(
                              project.status
                            )} mr-3`}
                          ></div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                              {project.name}
                            </div>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                              <Calendar className="w-3 h-3 mr-1" />
                              {project.deadline}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : project.status === "completed"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {project.status.charAt(0).toUpperCase() +
                            project.status.slice(1)}
                        </span>
                      </td>
                      <td className="hidden md:table-cell px-4 sm:px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 mr-3">
                            <div
                              className={`h-2 rounded-full ${
                                project.progress === 100
                                  ? "bg-linear-to-r from-green-500 to-emerald-600"
                                  : project.progress > 70
                                  ? "bg-linear-to-r from-blue-500 to-cyan-600"
                                  : project.progress > 40
                                  ? "bg-linear-to-r from-yellow-500 to-orange-600"
                                  : "bg-linear-to-r from-red-500 to-pink-600"
                              }`}
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {project.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="hidden lg:table-cell px-4 sm:px-6 py-4">
                        <div className="flex -space-x-2">
                          {project.team.map((member, idx) => (
                            <div
                              key={idx}
                              className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-900"
                            >
                              {member.charAt(0)}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          {project.budget}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Spent: {project.spent}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <motion.div
                          animate={{
                            rotate: expandedRows.includes(project.id) ? 90 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="text-gray-400 group-hover:text-blue-500"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </motion.div>
                      </td>
                    </tr>

                    <AnimatePresence>
                      {expandedRows.includes(project.id) && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-gray-50/50 dark:bg-gray-800/30"
                        >
                          <td colSpan={6} className="px-4 sm:px-6 py-6">
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                            >
                              {/* Project Description */}
                              <div className="lg:col-span-2">
                                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                                  <div className="flex items-center mb-4">
                                    <Tag className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                      Project Overview
                                    </h3>
                                  </div>
                                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
                                    {project.preview.description}
                                  </p>

                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                    <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
                                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Progress
                                      </div>
                                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {project.progress}%
                                      </div>
                                    </div>
                                    <div className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
                                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Days Left
                                      </div>
                                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {Math.ceil(
                                          (new Date(
                                            project.deadline
                                          ).getTime() -
                                            new Date().getTime()) /
                                            (1000 * 3600 * 24)
                                        )}
                                      </div>
                                    </div>
                                    <div className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg">
                                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Team Size
                                      </div>
                                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {project.team.length}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Tasks */}
                                  <div>
                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                      Current Tasks
                                    </h4>
                                    <div className="space-y-2">
                                      {project.preview.tasks.map((task) => (
                                        <div
                                          key={task.id}
                                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                                        >
                                          <div className="flex items-center">
                                            <User className="w-4 h-4 text-gray-400 mr-3" />
                                            <div>
                                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {task.name}
                                              </div>
                                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                                Assigned to {task.assignee}
                                              </div>
                                            </div>
                                          </div>
                                          <span
                                            className={`text-xs px-3 py-1 rounded-full ${getTaskStatusColor(
                                              task.status
                                            )}`}
                                          >
                                            {task.status.replace("-", " ")}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Milestones */}
                              <div>
                                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-800 h-full">
                                  <div className="flex items-center mb-4">
                                    <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                      Upcoming Milestones
                                    </h3>
                                  </div>
                                  <div className="space-y-4">
                                    {project.preview.milestones.map(
                                      (milestone, idx) => (
                                        <div
                                          key={idx}
                                          className="flex items-start"
                                        >
                                          <div className="shrink-0 w-10 h-10 bg-linear-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                                            <Calendar className="w-5 h-5 text-white" />
                                          </div>
                                          <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                              {milestone.name}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                              {milestone.date}
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>

                                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        Budget Utilization
                                      </span>
                                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                                        {Math.round(
                                          (parseFloat(
                                            project.spent
                                              .replace("$", "")
                                              .replace(",", "")
                                          ) /
                                            parseFloat(
                                              project.budget
                                                .replace("$", "")
                                                .replace(",", "")
                                            )) *
                                            100
                                        )}
                                        %
                                      </span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                                      <div
                                        className="h-2 rounded-full bg-linear-to-r from-green-500 to-emerald-600"
                                        style={{
                                          width: `${Math.min(
                                            (parseFloat(
                                              project.spent
                                                .replace("$", "")
                                                .replace(",", "")
                                            ) /
                                              parseFloat(
                                                project.budget
                                                  .replace("$", "")
                                                  .replace(",", "")
                                              )) *
                                              100,
                                            100
                                          )}%`,
                                        }}
                                      ></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                                      <span>Spent: {project.spent}</span>
                                      <span>Budget: {project.budget}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div>
            {expandedRows.length} of {projectData.length} projects expanded
          </div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span>Active</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
              <span>On Hold</span>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
