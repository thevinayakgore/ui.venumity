import { useState } from "react";

interface Customer {
  id: string;
  name: string;
  email: string;
  country: string;
  joinDate: string;
  orders: number;
  totalSpent: number;
  status: "Active" | "Inactive" | "Suspended";
}

export default function DataGridWithFilters() {
  const [customers] = useState<Customer[]>([
    {
      id: "CUST-001",
      name: "John Smith",
      email: "john@example.com",
      country: "USA",
      joinDate: "2023-01-15",
      orders: 12,
      totalSpent: 2899.99,
      status: "Active",
    },
    {
      id: "CUST-002",
      name: "Maria Garcia",
      email: "maria@example.com",
      country: "Spain",
      joinDate: "2023-02-20",
      orders: 8,
      totalSpent: 1549.5,
      status: "Active",
    },
    {
      id: "CUST-003",
      name: "Chen Wei",
      email: "chen@example.com",
      country: "China",
      joinDate: "2023-03-10",
      orders: 5,
      totalSpent: 899.99,
      status: "Inactive",
    },
    {
      id: "CUST-004",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      country: "UK",
      joinDate: "2023-04-05",
      orders: 15,
      totalSpent: 3299.0,
      status: "Active",
    },
    {
      id: "CUST-005",
      name: "David Miller",
      email: "david@example.com",
      country: "Canada",
      joinDate: "2023-01-30",
      orders: 3,
      totalSpent: 450.0,
      status: "Suspended",
    },
    {
      id: "CUST-006",
      name: "Emma Wilson",
      email: "emma@example.com",
      country: "Australia",
      joinDate: "2023-05-12",
      orders: 20,
      totalSpent: 4899.99,
      status: "Active",
    },
    {
      id: "CUST-007",
      name: "Alex Brown",
      email: "alex@example.com",
      country: "USA",
      joinDate: "2023-06-18",
      orders: 7,
      totalSpent: 1299.5,
      status: "Active",
    },
    {
      id: "CUST-008",
      name: "Lisa Taylor",
      email: "lisa@example.com",
      country: "Germany",
      joinDate: "2023-02-28",
      orders: 10,
      totalSpent: 2100.0,
      status: "Inactive",
    },
  ]);

  const [filters, setFilters] = useState({
    status: "all",
    country: "all",
    minOrders: 0,
  });

  const [search, setSearch] = useState("");

  const filteredCustomers = customers.filter((customer) => {
    if (
      search &&
      !customer.name.toLowerCase().includes(search.toLowerCase()) &&
      !customer.email.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    if (filters.status !== "all" && customer.status !== filters.status) {
      return false;
    }
    if (filters.country !== "all" && customer.country !== filters.country) {
      return false;
    }
    if (customer.orders < filters.minOrders) {
      return false;
    }
    return true;
  });

  const countries = Array.from(new Set(customers.map((c) => c.country)));

  const getStatusColor = (status: Customer["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-yellow-100 text-yellow-800";
      case "Suspended":
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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Customer Database</h2>
            <p className="text-gray-500">
              {filteredCustomers.length} customers found
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Export Data
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
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
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <select
              value={filters.country}
              onChange={(e) =>
                setFilters({ ...filters, country: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Orders: {filters.minOrders}+
            </label>
            <input
              type="range"
              min="0"
              max="20"
              value={filters.minOrders}
              onChange={(e) =>
                setFilters({ ...filters, minOrders: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Customer
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Contact
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Country
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Join Date
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Orders
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Total Spent
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
            {filteredCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">👤</span>
                    </div>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-gray-500">{customer.id}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-gray-600">{customer.email}</div>
                </td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {customer.country}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-600">
                  {formatDate(customer.joinDate)}
                </td>
                <td className="py-4 px-6">
                  <div className="font-semibold">{customer.orders}</div>
                </td>
                <td className="py-4 px-6 font-bold">
                  ${customer.totalSpent.toFixed(2)}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      customer.status
                    )}`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex space-x-2">
                    <button className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                      View
                    </button>
                    <button className="text-sm px-3 py-1 border rounded hover:bg-gray-100">
                      Message
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No customers found</h3>
          <p className="text-gray-500">
            Try adjusting your filters or search terms
          </p>
        </div>
      )}
    </div>
  );
}
