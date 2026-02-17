import React, { useState } from "react";

interface Project {
  id: number;
  name: string;
  client: string;
  status: "Planning" | "Active" | "On Hold" | "Completed";
  priority: "Low" | "Medium" | "High" | "Critical";
  tags: string[];
  progress: number;
  dueDate: string;
}

export default function FilterableTableWithTags() {
  const [projects] = useState<Project[]>([
    {
      id: 1,
      name: "Website Redesign",
      client: "TechCorp",
      status: "Active",
      priority: "High",
      tags: ["Web", "Design", "React"],
      progress: 75,
      dueDate: "2024-06-15",
    },
    {
      id: 2,
      name: "Mobile App",
      client: "StartupXYZ",
      status: "Planning",
      priority: "Medium",
      tags: ["Mobile", "iOS", "Android"],
      progress: 20,
      dueDate: "2024-08-30",
    },
    {
      id: 3,
      name: "E-commerce Platform",
      client: "RetailCo",
      status: "Active",
      priority: "Critical",
      tags: ["E-commerce", "Payment", "Security"],
      progress: 90,
      dueDate: "2024-05-20",
    },
    {
      id: 4,
      name: "CRM System",
      client: "Enterprise Inc",
      status: "On Hold",
      priority: "Low",
      tags: ["CRM", "Database", "API"],
      progress: 40,
      dueDate: "2024-09-10",
    },
    {
      id: 5,
      name: "Analytics Dashboard",
      client: "DataWorks",
      status: "Completed",
      priority: "Medium",
      tags: ["Analytics", "Dashboard", "Charts"],
      progress: 100,
      dueDate: "2024-03-15",
    },
    {
      id: 6,
      name: "Marketing Automation",
      client: "GrowthLab",
      status: "Active",
      priority: "High",
      tags: ["Marketing", "Automation", "Email"],
      progress: 60,
      dueDate: "2024-07-25",
    },
    {
      id: 7,
      name: "API Integration",
      client: "ConnectTech",
      status: "Planning",
      priority: "Medium",
      tags: ["API", "Integration", "Webhooks"],
      progress: 10,
      dueDate: "2024-10-05",
    },
    {
      id: 8,
      name: "Security Audit",
      client: "SecureBank",
      status: "Active",
      priority: "Critical",
      tags: ["Security", "Audit", "Compliance"],
      progress: 85,
      dueDate: "2024-04-30",
    },
  ]);

  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    tag: "all",
    search: "",
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

  const filteredProjects = projects.filter((project) => {
    // Search filter
    if (
      filters.search &&
      !project.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !project.client.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Status filter
    if (filters.status !== "all" && project.status !== filters.status) {
      return false;
    }

    // Priority filter
    if (filters.priority !== "all" && project.priority !== filters.priority) {
      return false;
    }

    // Tag filter
    if (
      selectedTags.length > 0 &&
      !selectedTags.some((tag) => project.tags.includes(tag))
    ) {
      return false;
    }

    return true;
  });

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "Planning":
        return "bg-blue-100 text-blue-800";
      case "Active":
        return "bg-green-100 text-green-800";
      case "On Hold":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: Project["priority"]) => {
    switch (priority) {
      case "Low":
        return "bg-gray-100 text-gray-800";
      case "Medium":
        return "bg-blue-100 text-blue-800";
      case "High":
        return "bg-orange-100 text-orange-800";
      case "Critical":
        return "bg-red-100 text-red-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDueStatus = (dateString: string) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { text: "Overdue", color: "text-red-600" };
    if (diffDays === 0) return { text: "Due today", color: "text-orange-600" };
    if (diffDays <= 7)
      return { text: `Due in ${diffDays} days`, color: "text-yellow-600" };
    return { text: `Due in ${diffDays} days`, color: "text-green-600" };
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Project Management</h2>
            <p className="text-gray-500">
              {filteredProjects.length} projects found
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            New Project
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects by name or client..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Tag Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTags.includes(tag)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Status and Priority Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="Planning">Planning</option>
              <option value="Active">Active</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              value={filters.priority}
              onChange={(e) =>
                setFilters({ ...filters, priority: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Project
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Client
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Priority
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Tags
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Progress
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Due Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProjects.map((project) => {
              const dueStatus = getDueStatus(project.dueDate);

              return (
                <tr
                  key={project.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-lg">📋</span>
                      </div>
                      <div>
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-gray-500">
                          ID: {project.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium">{project.client}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                        project.priority
                      )}`}
                    >
                      {project.priority}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{project.progress}%</span>
                        <span>{dueStatus.text}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${project.progress}%`,
                            backgroundColor:
                              project.progress < 30
                                ? "#dc2626"
                                : project.progress < 70
                                ? "#ca8a04"
                                : project.progress < 100
                                ? "#2563eb"
                                : "#16a34a",
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium">
                        {formatDate(project.dueDate)}
                      </div>
                      <div className={`text-sm ${dueStatus.color}`}>
                        {dueStatus.text}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-xl font-semibold mb-2">No projects found</h3>
          <p className="text-gray-500">
            Try adjusting your filters or search terms
          </p>
        </div>
      )}
    </div>
  );
}
