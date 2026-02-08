"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

export default function DataGrid2_1() {
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const data = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      role: "Admin",
      department: "Engineering",
      status: "Active",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria@example.com",
      role: "Developer",
      department: "Engineering",
      status: "Active",
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "David Smith",
      email: "david@example.com",
      role: "Designer",
      department: "Design",
      status: "Away",
      lastActive: "3 days ago",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "Manager",
      department: "Marketing",
      status: "Active",
      lastActive: "5 hours ago",
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael@example.com",
      role: "Analyst",
      department: "Finance",
      status: "Inactive",
      lastActive: "1 week ago",
    },
    {
      id: 6,
      name: "Emily Davis",
      email: "emily@example.com",
      role: "Developer",
      department: "Engineering",
      status: "Active",
      lastActive: "30 minutes ago",
    },
    {
      id: 7,
      name: "James Wilson",
      email: "james@example.com",
      role: "Designer",
      department: "Design",
      status: "Active",
      lastActive: "2 days ago",
    },
    {
      id: 8,
      name: "Lisa Taylor",
      email: "lisa@example.com",
      role: "Manager",
      department: "HR",
      status: "Away",
      lastActive: "4 days ago",
    },
  ];

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.department.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((item) => item.id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Away":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                User Management
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your organization is users
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition">
                Add User
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Data Grid */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="py-4 px-6">
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.length === filteredData.length &&
                      filteredData.length > 0
                    }
                    onChange={toggleAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Role
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Department
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Last Active
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition ${
                    selectedRows.includes(item.id)
                      ? "bg-blue-50 dark:bg-blue-900/10"
                      : ""
                  }`}
                >
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => toggleRow(item.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-medium">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {item.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {item.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.department}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.lastActive}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                        <Eye className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                        <Edit className="w-4 h-4 text-blue-500" />
                      </button>
                      <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {selectedRows.length > 0 ? (
                <span>
                  {selectedRows.length} of {filteredData.length} selected
                </span>
              ) : (
                <span>
                  Showing {filteredData.length} of {data.length} users
                </span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Rows per page
                </span>
                <select className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-2 py-1">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg disabled:opacity-50">
                  ←
                </button>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded-lg bg-blue-600 text-white">
                    1
                  </button>
                  <button className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                    2
                  </button>
                  <button className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                    3
                  </button>
                  <span className="px-2">...</span>
                  <button className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                    8
                  </button>
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
