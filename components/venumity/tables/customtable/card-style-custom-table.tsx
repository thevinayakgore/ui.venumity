"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Calendar,
  MoreVertical,
} from "lucide-react";

export default function CustomTable1_2() {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const users = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      joinDate: "2023-01-15",
      projects: 12,
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria@example.com",
      phone: "+1 (555) 987-6543",
      location: "Los Angeles, CA",
      joinDate: "2023-02-20",
      projects: 8,
    },
    {
      id: 3,
      name: "David Smith",
      email: "david@example.com",
      phone: "+1 (555) 456-7890",
      location: "Chicago, IL",
      joinDate: "2023-03-10",
      projects: 15,
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+1 (555) 234-5678",
      location: "Miami, FL",
      joinDate: "2023-04-05",
      projects: 6,
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "+1 (555) 876-5432",
      location: "Seattle, WA",
      joinDate: "2023-05-12",
      projects: 10,
    },
  ];

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Team Members
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              All registered team members
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              Export
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition">
              Add Member
            </button>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() =>
                setSelectedUser(selectedUser === user.id ? null : user.id)
              }
              className={`bg-gray-50 dark:bg-gray-800 rounded-xl p-6 cursor-pointer transition-all ${
                selectedUser === user.id
                  ? "ring-2 ring-blue-500"
                  : "hover:shadow-lg"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user.location}
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{user.phone}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    Joined {user.joinDate}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user.projects}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Projects
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: selectedUser === user.id ? 1 : 0,
                  height: selectedUser === user.id ? "auto" : 0,
                }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Last Active
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        2 hours ago
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Role
                      </span>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        Senior Developer
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            Load More Members
          </button>
        </div>
      </div>
    </main>
  );
}
