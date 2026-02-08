"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, X, ChevronDown, ChevronUp } from "lucide-react";

const data = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      department: "Engineering",
      status: "Active",
      location: "New York",
      salary: 95000,
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria@example.com",
      department: "Design",
      status: "Active",
      location: "San Francisco",
      salary: 85000,
    },
    {
      id: 3,
      name: "David Smith",
      email: "david@example.com",
      department: "Marketing",
      status: "Away",
      location: "Chicago",
      salary: 75000,
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      department: "Engineering",
      status: "Active",
      location: "Remote",
      salary: 105000,
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael@example.com",
      department: "Sales",
      status: "Inactive",
      location: "Boston",
      salary: 65000,
    },
    {
      id: 6,
      name: "Emily Davis",
      email: "emily@example.com",
      department: "Engineering",
      status: "Active",
      location: "Seattle",
      salary: 92000,
    },
    {
      id: 7,
      name: "James Wilson",
      email: "james@example.com",
      department: "Design",
      status: "Away",
      location: "Los Angeles",
      salary: 88000,
    },
    {
      id: 8,
      name: "Lisa Taylor",
      email: "lisa@example.com",
      department: "HR",
      status: "Active",
      location: "Remote",
      salary: 78000,
    },
  ];

export default function FilterableTable4_1() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    department: [] as string[],
    status: [] as string[],
    location: [] as string[],
  });
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique values for filters
  const departments = [...new Set(data.map((item) => item.department))];
  const statuses = [...new Set(data.map((item) => item.status))];
  const locations = [...new Set(data.map((item) => item.location))];

  // Filter data based on search and filters
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Search filter
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.department.toLowerCase().includes(search.toLowerCase());

      // Department filter
      const matchesDepartment =
        filters.department.length === 0 ||
        filters.department.includes(item.department);

      // Status filter
      const matchesStatus =
        filters.status.length === 0 || filters.status.includes(item.status);

      // Location filter
      const matchesLocation =
        filters.location.length === 0 ||
        filters.location.includes(item.location);

      return (
        matchesSearch && matchesDepartment && matchesStatus && matchesLocation
      );
    });
  }, [search, filters]);

  const toggleFilter = (category: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      const current = prev[category];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter((v) => v !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  const clearFilters = () => {
    setFilters({
      department: [],
      status: [],
      location: [],
    });
    setSearch("");
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Employee Directory
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {filteredData.length} of {data.length} employees found
              </p>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {showFilters ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Active Filters */}
          {(filters.department.length > 0 ||
            filters.status.length > 0 ||
            filters.location.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {filters.department.map((dept) => (
                <button
                  key={dept}
                  onClick={() => toggleFilter("department", dept)}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm"
                >
                  {dept}
                  <X className="w-3 h-3" />
                </button>
              ))}

              {filters.status.map((status) => (
                <button
                  key={status}
                  onClick={() => toggleFilter("status", status)}
                  className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm"
                >
                  {status}
                  <X className="w-3 h-3" />
                </button>
              ))}

              {filters.location.map((location) => (
                <button
                  key={location}
                  onClick={() => toggleFilter("location", location)}
                  className="flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm"
                >
                  {location}
                  <X className="w-3 h-3" />
                </button>
              ))}

              <button
                onClick={clearFilters}
                className="px-3 py-1 text-gray-600 dark:text-gray-400 text-sm hover:text-gray-900 dark:hover:text-gray-300"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Department Filter */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Department
                </h4>
                <div className="space-y-2">
                  {departments.map((dept) => (
                    <label
                      key={dept}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.department.includes(dept)}
                        onChange={() => toggleFilter("department", dept)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {dept}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({data.filter((d) => d.department === dept).length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Status
                </h4>
                <div className="space-y-2">
                  {statuses.map((status) => (
                    <label
                      key={status}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.status.includes(status)}
                        onChange={() => toggleFilter("status", status)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {status}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({data.filter((d) => d.status === status).length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Location
                </h4>
                <div className="space-y-2">
                  {locations.map((location) => (
                    <label
                      key={location}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.location.includes(location)}
                        onChange={() => toggleFilter("location", location)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {location}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({data.filter((d) => d.location === location).length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Department
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Location
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Salary
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
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                >
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
                      {item.location}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-gray-900 dark:text-white">
                      ${item.salary.toLocaleString()}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No employees found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredData.length} of {data.length} employees
          </div>
        </div>
      </div>
    </main>
  );
}
