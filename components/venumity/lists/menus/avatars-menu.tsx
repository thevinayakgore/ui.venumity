"use client";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  MoreVertical,
} from "lucide-react";

export default function MenuWithAvatars() {
  const [activeItem, setActiveItem] = useState("profile");

  const teamMembers = [
    {
      id: "john",
      name: "John Doe",
      role: "Project Manager",
      avatar: "JD",
      status: "online",
    },
    {
      id: "sarah",
      name: "Sarah Smith",
      role: "UI Designer",
      avatar: "SS",
      status: "away",
    },
    {
      id: "mike",
      name: "Mike Johnson",
      role: "Backend Developer",
      avatar: "MJ",
      status: "offline",
    },
    {
      id: "emma",
      name: "Emma Wilson",
      role: "Frontend Developer",
      avatar: "EW",
      status: "online",
    },
    {
      id: "alex",
      name: "Alex Brown",
      role: "QA Engineer",
      avatar: "AB",
      status: "busy",
    },
  ];

  const userInfo = [
    { icon: Mail, label: "Email", value: "john.doe@example.com" },
    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
    { icon: MapPin, label: "Location", value: "San Francisco, CA" },
    { icon: Calendar, label: "Joined", value: "January 2023" },
  ];

  return (
    <div className="w-80 p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        Menu with Avatars
      </h3>

      {/* User Profile */}
      <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-8">
        <div className="relative">
          <div className="w-16 h-16 bg-linear-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
            JD
          </div>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                John Doe
              </h4>
              <p className="text-gray-500 dark:text-gray-400">
                Project Manager
              </p>
            </div>
            <button className="p-2 text-gray-500 hover:text-primary bg-white dark:bg-gray-700 rounded-lg">
              <Edit className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            {userInfo.slice(0, 2).map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-sm"
                >
                  <Icon className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {info.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900 dark:text-white">
            Team Members
          </h4>
          <button className="text-sm text-primary hover:text-primary/80">
            View All
          </button>
        </div>

        <div className="space-y-3">
          {teamMembers.map((member) => {
            const statusColors = {
              online: "bg-green-500",
              away: "bg-yellow-500",
              offline: "bg-gray-400",
              busy: "bg-red-500",
            };

            return (
              <div
                key={member.id}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  activeItem === member.id
                    ? "bg-primary/10 border border-primary/20"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={() => setActiveItem(member.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {member.avatar}
                    </div>
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 ${
                        statusColors[member.status as keyof typeof statusColors]
                      } border-2 border-white dark:border-gray-900 rounded-full`}
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {member.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {member.role}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {member.status}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
