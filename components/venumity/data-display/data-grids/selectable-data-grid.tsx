import { useState } from "react";

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  amount: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: number;
  payment: string;
}

export default function SelectableDataGrid() {
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const orders: Order[] = [
    {
      id: "ORD-001",
      customer: "John Smith",
      email: "john@example.com",
      date: "2024-04-15",
      amount: 249.99,
      status: "Delivered",
      items: 3,
      payment: "Credit Card",
    },
    {
      id: "ORD-002",
      customer: "Sarah Johnson",
      email: "sarah@example.com",
      date: "2024-04-14",
      amount: 89.99,
      status: "Processing",
      items: 1,
      payment: "PayPal",
    },
    {
      id: "ORD-003",
      customer: "Mike Wilson",
      email: "mike@example.com",
      date: "2024-04-13",
      amount: 450.5,
      status: "Shipped",
      items: 5,
      payment: "Credit Card",
    },
    {
      id: "ORD-004",
      customer: "Emma Davis",
      email: "emma@example.com",
      date: "2024-04-12",
      amount: 129.99,
      status: "Pending",
      items: 2,
      payment: "Bank Transfer",
    },
    {
      id: "ORD-005",
      customer: "Robert Brown",
      email: "robert@example.com",
      date: "2024-04-11",
      amount: 299.99,
      status: "Cancelled",
      items: 4,
      payment: "Credit Card",
    },
    {
      id: "ORD-006",
      customer: "Lisa Taylor",
      email: "lisa@example.com",
      date: "2024-04-10",
      amount: 75.25,
      status: "Delivered",
      items: 1,
      payment: "PayPal",
    },
    {
      id: "ORD-007",
      customer: "David Miller",
      email: "david@example.com",
      date: "2024-04-09",
      amount: 520.0,
      status: "Shipped",
      items: 6,
      payment: "Credit Card",
    },
    {
      id: "ORD-008",
      customer: "Amanda Clark",
      email: "amanda@example.com",
      date: "2024-04-08",
      amount: 189.99,
      status: "Processing",
      items: 3,
      payment: "Apple Pay",
    },
  ];

  const toggleOrder = (orderId: string) => {
    const newSelected = new Set(selectedOrders);
    if (newSelected.has(orderId)) {
      newSelected.delete(orderId);
    } else {
      newSelected.add(orderId);
    }
    setSelectedOrders(newSelected);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(orders.map((order) => order.id)));
    }
    setSelectAll(!selectAll);
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
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

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Orders Management</h2>
            <p className="text-gray-500">
              {selectedOrders.size} orders selected
            </p>
          </div>
          <div className="flex space-x-3">
            {selectedOrders.size > 0 && (
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Delete Selected
              </button>
            )}
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Order
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-6 text-left">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                </div>
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Order ID
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Customer
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Amount
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Items
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Payment
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr
                key={order.id}
                className={`hover:bg-gray-50 transition-colors ${
                  selectedOrders.has(order.id) ? "bg-blue-50" : ""
                }`}
              >
                <td className="py-4 px-6">
                  <input
                    type="checkbox"
                    checked={selectedOrders.has(order.id)}
                    onChange={() => toggleOrder(order.id)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                </td>
                <td className="py-4 px-6">
                  <div className="font-semibold">{order.id}</div>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <div className="font-medium">{order.customer}</div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600">
                  {formatDate(order.date)}
                </td>
                <td className="py-4 px-6 font-bold">
                  ${order.amount.toFixed(2)}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-6">{order.items} items</td>
                <td className="py-4 px-6">
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                    {order.payment}
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

      <div className="px-6 py-4 border-t flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {selectedOrders.size} of {orders.length} orders selected
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Rows per page:</span>
            <select className="border rounded px-2 py-1 text-sm">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
              1
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
