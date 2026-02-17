import React, { useState } from "react";

interface Task {
  id: number;
  title: string;
  assignee: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Todo" | "In Progress" | "Review" | "Done";
  dueDate: string;
  tags: string[];
}

interface SavedView {
  id: string;
  name: string;
  filters: {
    status: string;
    priority: string;
    assignee: string;
  };
}

export default function FilterableTableWithSavedViews() {
  const [tasks] = useState<Task[]>([
    {
      id: 1,
      title: "Design Homepage",
      assignee: "John Doe",
      priority: "High",
      status: "In Progress",
      dueDate: "2024-04-20",
      tags: ["Design", "Web"],
    },
    {
      id: 2,
      title: "Fix Login Bug",
      assignee: "Sarah Smith",
      priority: "Urgent",
      status: "Todo",
      dueDate: "2024-04-16",
      tags: ["Bug", "Auth"],
    },
    {
      id: 3,
      title: "Write Documentation",
      assignee: "Mike Johnson",
      priority: "Medium",
      status: "Review",
      dueDate: "2024-04-25",
      tags: ["Docs", "API"],
    },
    {
      id: 4,
      title: "Deploy to Production",
      assignee: "John Doe",
      priority: "High",
      status: "Todo",
      dueDate: "2024-04-18",
      tags: ["DevOps", "Deployment"],
    },
    {
      id: 5,
      title: "User Testing",
      assignee: "Emily Wilson",
      priority: "Medium",
      status: "In Progress",
      dueDate: "2024-04-22",
      tags: ["Testing", "UX"],
    },
    {
      id: 6,
      title: "Update Dependencies",
      assignee: "Alex Brown",
      priority: "Low",
      status: "Done",
      dueDate: "2024-04-15",
      tags: ["Maintenance"],
    },
    {
      id: 7,
      title: "Create Marketing Materials",
      assignee: "Lisa Taylor",
      priority: "Medium",
      status: "Todo",
      dueDate: "2024-04-30",
      tags: ["Marketing", "Design"],
    },
    {
      id: 8,
      title: "Security Audit",
      assignee: "David Miller",
      priority: "Urgent",
      status: "Review",
      dueDate: "2024-04-17",
      tags: ["Security", "Audit"],
    },
  ]);

  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    assignee: "all",
    search: "",
  });

  const [savedViews, setSavedViews] = useState<SavedView[]>([
    {
      id: "1",
      name: "My Tasks",
      filters: { status: "all", priority: "all", assignee: "John Doe" },
    },
    {
      id: "2",
      name: "Urgent Tasks",
      filters: { status: "all", priority: "Urgent", assignee: "all" },
    },
    {
      id: "3",
      name: "In Progress",
      filters: { status: "In Progress", priority: "all", assignee: "all" },
    },
    {
      id: "4",
      name: "Due This Week",
      filters: { status: "all", priority: "all", assignee: "all" },
    },
  ]);

  const [viewName, setViewName] = useState("");
  const [activeView, setActiveView] = useState<string | null>(null);

  const assignees = Array.from(new Set(tasks.map((t) => t.assignee)));

  const filteredTasks = tasks.filter((task) => {
    // Search filter
    if (
      filters.search &&
      !task.title.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Status filter
    if (filters.status !== "all" && task.status !== filters.status) {
      return false;
    }

    // Priority filter
    if (filters.priority !== "all" && task.priority !== filters.priority) {
      return false;
    }

    // Assignee filter
    if (filters.assignee !== "all" && task.assignee !== filters.assignee) {
      return false;
    }

    return true;
  });

  const applyView = (view: SavedView) => {
    setFilters({
      ...filters,
      ...view.filters,
      search: filters.search,
    });
    setActiveView(view.id);
  };

  const saveCurrentView = () => {
    if (!viewName.trim()) return;

    const newView: SavedView = {
      id: Date.now().toString(),
      name: viewName,
      filters: { ...filters },
    };

    setSavedViews([...savedViews, newView]);
    setViewName("");
    setActiveView(newView.id);
  };

  const deleteView = (id: string) => {
    setSavedViews(savedViews.filter((view) => view.id !== id));
    if (activeView === id) {
      setActiveView(null);
      setFilters({
        status: "all",
        priority: "all",
        assignee: "all",
        search: "",
      });
    }
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "Low":
        return "bg-gray-100 text-gray-800";
      case "Medium":
        return "bg-blue-100 text-blue-800";
      case "High":
        return "bg-orange-100 text-orange-800";
      case "Urgent":
        return "bg-red-100 text-red-800";
    }
  };

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "Todo":
        return "bg-gray-100 text-gray-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Review":
        return "bg-yellow-100 text-yellow-800";
      case "Done":
        return "bg-green-100 text-green-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Task Management</h2>
            <p className="text-gray-500">{filteredTasks.length} tasks found</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            New Task
          </button>
        </div>

        {/* Saved Views */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-700">Saved Views</h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Save current view as..."
                value={viewName}
                onChange={(e) => setViewName(e.target.value)}
                className="px-3 py-1 border rounded text-sm"
              />
              <button
                onClick={saveCurrentView}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {savedViews.map((view) => (
              <div key={view.id} className="flex items-center">
                <button
                  onClick={() => applyView(view)}
                  className={`px-3 py-1 rounded-l text-sm transition-colors ${
                    activeView === view.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {view.name}
                </button>
                <button
                  onClick={() => deleteView(view.id)}
                  className="px-2 py-1 bg-gray-200 text-gray-600 rounded-r hover:bg-gray-300 text-sm"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
              <option value="Done">Done</option>
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
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assignee
            </label>
            <select
              value={filters.assignee}
              onChange={(e) =>
                setFilters({ ...filters, assignee: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Assignees</option>
              {assignees.map((assignee) => (
                <option key={assignee} value={assignee}>
                  {assignee}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Task
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Assignee
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Priority
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Due Date
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Tags
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="font-medium">{task.title}</div>
                  <div className="text-sm text-gray-500">ID: {task.id}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                    <span>{task.assignee}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="font-medium">{formatDate(task.dueDate)}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex flex-wrap gap-1">
                    {task.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
          <p className="text-gray-500">
            Try adjusting your filters or search terms
          </p>
        </div>
      )}
    </div>
  );
}
