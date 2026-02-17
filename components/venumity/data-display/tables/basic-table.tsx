interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  salary: number;
  startDate: string;
  status: "Active" | "On Leave" | "Terminated";
}

export default function BasicTable() {
  const employees: Employee[] = [
    {
      id: 1,
      name: "John Smith",
      position: "Senior Developer",
      department: "Engineering",
      salary: 95000,
      startDate: "2020-03-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Marketing Manager",
      department: "Marketing",
      salary: 85000,
      startDate: "2019-07-22",
      status: "Active",
    },
    {
      id: 3,
      name: "Michael Chen",
      position: "DevOps Engineer",
      department: "Engineering",
      salary: 105000,
      startDate: "2021-01-10",
      status: "Active",
    },
    {
      id: 4,
      name: "Emily Wilson",
      position: "HR Specialist",
      department: "HR",
      salary: 65000,
      startDate: "2022-05-30",
      status: "On Leave",
    },
    {
      id: 5,
      name: "David Brown",
      position: "Sales Director",
      department: "Sales",
      salary: 120000,
      startDate: "2018-11-05",
      status: "Active",
    },
  ];

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
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden max-w-6xl mx-auto">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Employee Directory</h2>
            <p className="text-gray-500">Company employees and their details</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Employee
          </button>
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
                Position
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Department
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Salary
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Start Date
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employees.map((employee) => (
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
                  <div className="font-medium">{employee.position}</div>
                </td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {employee.department}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="font-semibold">
                    ${employee.salary.toLocaleString()}
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600">
                  {formatDate(employee.startDate)}
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
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t">
        <div className="text-sm text-gray-500">
          Showing {employees.length} of {employees.length} employees
        </div>
      </div>
    </div>
  );
}
