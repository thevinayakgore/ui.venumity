import React, { useState } from "react";

interface Project {
  id: number;
  name: string;
  client: string;
  status: "Planning" | "Active" | "On Hold" | "Completed";
  budget: number;
  spent: number;
  timeline: string;
  team: string[];
  description: string;
}

export default function ExpandableRowTable() {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const projects: Project[] = [
    {
      id: 1,
      name: "Website Redesign",
      client: "TechCorp",
      status: "Active",
      budget: 50000,
      spent: 32500,
      timeline: "3 months",
      team: ["John", "Sarah", "Mike"],
      description:
        "Complete redesign of corporate website with modern UI/UX and improved performance.",
    },
    {
      id: 2,
      name: "Mobile App",
      client: "StartupXYZ",
      status: "Planning",
      budget: 75000,
      spent: 12000,
      timeline: "6 months",
      team: ["Emma", "David", "Lisa"],
      description:
        "Cross-platform mobile application for customer engagement and sales.",
    },
    {
      id: 3,
      name: "E-commerce Platform",
      client: "RetailCo",
      status: "Active",
      budget: 120000,
      spent: 85000,
      timeline: "8 months",
      team: ["Alex", "Robert", "Anna", "Tom"],
      description:
        "Full-featured e-commerce platform with inventory management and payment integration.",
    },
    {
      id: 4,
      name: "CRM System",
      client: "Enterprise Inc",
      status: "On Hold",
      budget: 90000,
      spent: 45000,
      timeline: "5 months",
      team: ["Michael", "Sophia"],
      description:
        "Custom CRM solution for sales team automation and customer relationship management.",
    },
    {
      id: 5,
      name: "Analytics Dashboard",
      client: "DataWorks",
      status: "Completed",
      budget: 40000,
      spent: 38000,
      timeline: "2 months",
      team: ["Chris", "Maria"],
      description:
        "Real-time analytics dashboard with data visualization and reporting features.",
    },
  ];

  const toggleRow = (id: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
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

  const getProgress = (spent: number, budget: number) => {
    return Math.min(100, (spent / budget) * 100);
  };

  const getProgressColor = (progress: number) => {
    if (progress < 50) return "bg-green-500";
    if (progress < 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden max-w-6xl mx-auto">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Project Portfolio</h2>
            <p className="text-gray-500">
              Click on rows to expand project details
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            New Project
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 w-12"></th>
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
                Budget
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Spent
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Progress
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Timeline
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {projects.map((project) => {
              const progress = getProgress(project.spent, project.budget);
              const isExpanded = expandedRows.has(project.id);

              return (
                <React.Fragment key={project.id}>
                  <tr
                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                      isExpanded ? "bg-gray-50" : ""
                    }`}
                    onClick={() => toggleRow(project.id)}
                  >
                    <td className="py-4 px-6">
                      <span
                        className={`transform transition-transform ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                      >
                        ▶
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-gray-500">
                        ID: {project.id}
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
                    <td className="py-4 px-6 font-bold">
                      ${project.budget.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 font-bold">
                      ${project.spent.toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{progress.toFixed(1)}%</span>
                          <span>
                            ${project.spent.toLocaleString()}/$
                            {project.budget.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(
                              progress
                            )}`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {project.timeline}
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr className="bg-blue-50">
                      <td colSpan={8} className="py-6 px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-2">
                              Project Description
                            </h4>
                            <p className="text-gray-600">
                              {project.description}
                            </p>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">
                                Team Members
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {project.team.map((member) => (
                                  <span
                                    key={member}
                                    className="px-3 py-1 bg-white border rounded-full text-sm"
                                  >
                                    {member}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">
                                Financial Summary
                              </h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">
                                    Remaining Budget:
                                  </span>
                                  <span className="font-bold">
                                    $
                                    {(
                                      project.budget - project.spent
                                    ).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">
                                    Utilization:
                                  </span>
                                  <span
                                    className={`font-semibold ${
                                      progress > 90
                                        ? "text-red-600"
                                        : "text-green-600"
                                    }`}
                                  >
                                    {progress.toFixed(1)}%
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-3">
                              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                                View Details
                              </button>
                              <button className="px-4 py-2 border rounded-lg hover:bg-gray-100 text-sm">
                                Download Report
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t">
        <div className="text-sm text-gray-500">
          {projects.length} projects • {expandedRows.size} expanded • Total
          Budget: $
          {projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
