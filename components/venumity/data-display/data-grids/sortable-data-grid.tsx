import { useState } from "react";

interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
  performance: number;
  status: "Active" | "On Leave" | "Terminated";
}

type SortField = keyof Employee;
type SortDirection = "asc" | "desc";

export default function SortableDataGrid() {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const employees: Employee[] = [
    {
      id: 1,
      name: "John Smith",
      department: "Engineering",
      position: "Senior Developer",
      salary: 95000,
      hireDate: "2020-03-15",
      performance: 92,
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      department: "Marketing",
      position: "Marketing Manager",
      salary: 85000,
      hireDate: "2019-07-22",
      performance: 88,
      status: "Active",
    },
    {
      id: 3,
      name: "Michael Chen",
      department: "Engineering",
      position: "DevOps Engineer",
      salary: 105000,
      hireDate: "2021-01-10",
      performance: 95,
      status: "Active",
    },
    {
      id: 4,
      name: "Emily Wilson",
      department: "HR",
      position: "HR Specialist",
      salary: 65000,
      hireDate: "2022-05-30",
      performance: 78,
      status: "On Leave",
    },
    {
      id: 5,
      name: "David Brown",
      department: "Sales",
      position: "Sales Director",
      salary: 120000,
      hireDate: "2018-11-05",
      performance: 91,
      status: "Active",
    },
    {
      id: 6,
      name: "Lisa Taylor",
      department: "Finance",
      position: "Financial Analyst",
      salary: 75000,
      hireDate: "2021-09-12",
      performance: 85,
      status: "Active",
    },
    {
      id: 7,
      name: "Robert Garcia",
      department: "Engineering",
      position: "Frontend Developer",
      salary: 80000,
      hireDate: "2023-02-18",
      performance: 82,
      status: "Active",
    },
    {
      id: 8,
      name: "Amanda Lee",
      department: "Marketing",
      position: "Content Strategist",
      salary: 70000,
      hireDate: "2020-08-25",
      performance: 89,
      status: "Terminated",
    },
  ];

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Employee Directory</h2>
            <p className="text-gray-500">Click on column headers to sort</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
              Export CSV
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add Employee
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {[
                { field: "name", label: "Employee" },
                { field: "department", label: "Department" },
                { field: "position", label: "Position" },
                { field: "salary", label: "Salary" },
                { field: "hireDate", label: "Hire Date" },
                { field: "performance", label: "Performance" },
                { field: "status", label: "Status" },
              ].map(({ field, label }) => (
                <th
                  key={field}
                  className="py-3 px-6 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort(field as SortField)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{label}</span>
                    {sortField === field && (
                      <span
                        className={
                          sortDirection === "asc" ? "transform rotate-180" : ""
                        }
                      >
                        ↓
                      </span>
                    )}
                  </div>
                </th>
              ))}
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedEmployees.map((employee) => (
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
                <td className="py-4 px-6 text-gray-600">
                  {formatDate(employee.hireDate)}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${employee.performance}%` }}
                      />
                    </div>
                    <span className="font-semibold">
                      {employee.performance}%
                    </span>
                  </div>
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
                <td className="py-4 px-6">
                  <div className="flex space-x-2">
                    <button className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                      View
                    </button>
                    <button className="text-sm px-3 py-1 border rounded hover:bg-gray-100">
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
