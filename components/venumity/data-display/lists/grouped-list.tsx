import { useState } from "react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  status: "active" | "away" | "offline";
  projects: number;
}

export default function GroupedList() {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(["Engineering", "Design"])
  );

  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "John Smith",
      role: "Senior Developer",
      department: "Engineering",
      status: "active",
      projects: 5,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      role: "Frontend Developer",
      department: "Engineering",
      status: "active",
      projects: 3,
    },
    {
      id: "3",
      name: "Mike Chen",
      role: "DevOps Engineer",
      department: "Engineering",
      status: "away",
      projects: 4,
    },
    {
      id: "4",
      name: "Emma Wilson",
      role: "UX Designer",
      department: "Design",
      status: "active",
      projects: 2,
    },
    {
      id: "5",
      name: "Alex Brown",
      role: "UI Designer",
      department: "Design",
      status: "offline",
      projects: 3,
    },
    {
      id: "6",
      name: "David Miller",
      role: "Product Manager",
      department: "Product",
      status: "active",
      projects: 6,
    },
    {
      id: "7",
      name: "Lisa Taylor",
      role: "Marketing Manager",
      department: "Marketing",
      status: "active",
      projects: 4,
    },
    {
      id: "8",
      name: "Robert Garcia",
      role: "Sales Executive",
      department: "Sales",
      status: "away",
      projects: 3,
    },
  ];

  const departments = Array.from(new Set(teamMembers.map((m) => m.department)));

  const toggleGroup = (department: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(department)) {
      newExpanded.delete(department);
    } else {
      newExpanded.add(department);
    }
    setExpandedGroups(newExpanded);
  };

  const getStatusColor = (status: TeamMember["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
    }
  };

  const getStatusText = (status: TeamMember["status"]) => {
    switch (status) {
      case "active":
        return "Online";
      case "away":
        return "Away";
      case "offline":
        return "Offline";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border max-w-2xl mx-auto overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Team Directory</h2>
            <p className="text-gray-500">
              {teamMembers.length} team members across {departments.length}{" "}
              departments
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Member
          </button>
        </div>
      </div>

      <div className="divide-y">
        {departments.map((department) => {
          const departmentMembers = teamMembers.filter(
            (m) => m.department === department
          );
          const isExpanded = expandedGroups.has(department);

          return (
            <div key={department} className="border-b last:border-b-0">
              <button
                onClick={() => toggleGroup(department)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`transform transition-transform ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                  >
                    ▶
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg">{department}</h3>
                    <p className="text-sm text-gray-500">
                      {departmentMembers.length} members •{" "}
                      {
                        departmentMembers.filter((m) => m.status === "active")
                          .length
                      }{" "}
                      online
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {departmentMembers.reduce((sum, m) => sum + m.projects, 0)}{" "}
                    projects
                  </span>
                </div>
              </button>

              {isExpanded && (
                <div className="px-6 pb-4 space-y-3">
                  {departmentMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-xl">👤</span>
                          </div>
                          <div
                            className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(
                              member.status
                            )} rounded-full border-2 border-white`}
                          />
                        </div>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-gray-500">
                            {member.role}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="font-semibold">{member.projects}</div>
                          <div className="text-sm text-gray-500">Projects</div>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            member.status === "active"
                              ? "bg-green-100 text-green-800"
                              : member.status === "away"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {getStatusText(member.status)}
                        </div>
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
