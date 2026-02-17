import { useState } from "react";

interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
  salary: number;
  experience: number;
  location: string;
  status: "Active" | "On Leave" | "Terminated";
}

export default function MultiColumnFilterableTable() {
  const [employees] = useState<Employee[]>([
    {
      id: 1,
      name: "John Smith",
      department: "Engineering",
      position: "Senior Developer",
      salary: 95000,
      experience: 5,
      location: "New York",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      department: "Marketing",
      position: "Marketing Manager",
      salary: 85000,
      experience: 8,
      location: "San Francisco",
      status: "Active",
    },
    {
      id: 3,
      name: "Michael Chen",
      department: "Engineering",
      position: "DevOps Engineer",
      salary: 105000,
      experience: 3,
      location: "Remote",
      status: "Active",
    },
    {
      id: 4,
      name: "Emily Wilson",
      department: "HR",
      position: "HR Specialist",
      salary: 65000,
      experience: 2,
      location: "Chicago",
      status: "On Leave",
    },
    {
      id: 5,
      name: "David Brown",
      department: "Sales",
      position: "Sales Director",
      salary: 120000,
      experience: 10,
      location: "New York",
      status: "Active",
    },
    {
      id: 6,
      name: "Lisa Taylor",
      department: "Finance",
      position: "Financial Analyst",
      salary: 75000,
      experience: 4,
      location: "Boston",
      status: "Active",
    },
    {
      id: 7,
      name: "Robert Garcia",
      department: "Engineering",
      position: "Frontend Developer",
      salary: 80000,
      experience: 1,
      location: "Austin",
      status: "Active",
    },
    {
      id: 8,
      name: "Amanda Lee",
      department: "Marketing",
      position: "Content Strategist",
      salary: 70000,
      experience: 6,
      location: "Los Angeles",
      status: "Terminated",
    },
  ]);

  const [filters, setFilters] = useState({
    department: "all",
    location: "all",
    status: "all",
    minSalary: 50000,
    maxSalary: 150000,
    minExperience: 0,
    maxExperience: 15,
  });

  const [search, setSearch] = useState("");

  const departments = Array.from(new Set(employees.map((e) => e.department)));
  const locations = Array.from(new Set(employees.map((e) => e.location)));

  const filteredEmployees = employees.filter((employee) => {
    // Search filter
    if (search && !employee.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }

    // Department filter
    if (
      filters.department !== "all" &&
      employee.department !== filters.department
    ) {
      return false;
    }

    // Location filter
    if (filters.location !== "all" && employee.location !== filters.location) {
      return false;
    }

    // Status filter
    if (filters.status !== "all" && employee.status !== filters.status) {
      return false;
    }

    // Salary filter
    if (
      employee.salary < filters.minSalary ||
      employee.salary > filters.maxSalary
    ) {
      return false;
    }

    // Experience filter
    if (
      employee.experience < filters.minExperience ||
      employee.experience > filters.maxExperience
    ) {
      return false;
    }

    return true;
  });

  const getStatusColor = (status: Employee["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "On Leave":
        return "bg-yellow-100 text-yellow-800";
      case "Terminated":
        return "bg-red-100 text-red-800";
    }
  };

  const clearFilters = () => {
    setFilters({
      department: "all",
      location: "all",
      status: "all",
      minSalary: 50000,
      maxSalary: 150000,
      minExperience: 0,
      maxExperience: 15,
    });
    setSearch("");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Employee Directory</h2>
            <p className="text-gray-500">
              {filteredEmployees.length} employees found
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={clearFilters}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add Employee
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search employees by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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

        {/* Advanced Filters */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                value={filters.department}
                onChange={(e) =>
                  setFilters({ ...filters, department: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
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
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Terminated">Terminated</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary Range: ${filters.minSalary.toLocaleString()} - $
                {filters.maxSalary.toLocaleString()}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="30000"
                  max="200000"
                  step="10000"
                  value={filters.minSalary}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      minSalary: parseInt(e.target.value),
                    })
                  }
                  className="flex-1"
                />
                <input
                  type="range"
                  min="30000"
                  max="200000"
                  step="10000"
                  value={filters.maxSalary}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      maxSalary: parseInt(e.target.value),
                    })
                  }
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience: {filters.minExperience} - {filters.maxExperience}{" "}
                years
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="1"
                  value={filters.minExperience}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      minExperience: parseInt(e.target.value),
                    })
                  }
                  className="flex-1"
                />
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="1"
                  value={filters.maxExperience}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      maxExperience: parseInt(e.target.value),
                    })
                  }
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Employee
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Department
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Position
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Salary
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Experience
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Location
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredEmployees.map((employee) => (
              <tr
                key={employee.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">👤</span>
                    </div>
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-sm text-gray-500">
                        ID: {employee.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {employee.department}
                  </span>
                </td>
                <td className="py-4 px-6">{employee.position}</td>
                <td className="py-4 px-6 font-semibold">
                  ${employee.salary.toLocaleString()}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{
                          width: `${(employee.experience / 15) * 100}%`,
                        }}
                      />
                    </div>
                    <span>{employee.experience} yrs</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {employee.location}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      employee.status
                    )}`}
                  >
                    {employee.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-xl font-semibold mb-2">No employees found</h3>
          <p className="text-gray-500">
            Try adjusting your filters or search terms
          </p>
        </div>
      )}
    </div>
  );
}
