interface Order {
  id: string;
  customer: string;
  product: string;
  date: string;
  amount: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
  payment: string;
}

export default function ResponsiveTable() {
  const orders: Order[] = [
    {
      id: "ORD-001",
      customer: "John Smith",
      product: "Wireless Headphones",
      date: "2024-04-15",
      amount: 199.99,
      status: "Delivered",
      payment: "Credit Card",
    },
    {
      id: "ORD-002",
      customer: "Sarah Johnson",
      product: "Smart Watch",
      date: "2024-04-14",
      amount: 299.99,
      status: "Shipped",
      payment: "PayPal",
    },
    {
      id: "ORD-003",
      customer: "Mike Wilson",
      product: "Laptop",
      date: "2024-04-13",
      amount: 1299.99,
      status: "Processing",
      payment: "Credit Card",
    },
    {
      id: "ORD-004",
      customer: "Emma Davis",
      product: "Phone Case",
      date: "2024-04-12",
      amount: 29.99,
      status: "Pending",
      payment: "Apple Pay",
    },
    {
      id: "ORD-005",
      customer: "Robert Brown",
      product: "Tablet",
      date: "2024-04-11",
      amount: 499.99,
      status: "Delivered",
      payment: "Google Pay",
    },
  ];

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
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden max-w-6xl mx-auto">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Recent Orders</h2>
            <p className="text-gray-500">Order history and tracking</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            View All Orders
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Order ID
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Customer
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Product
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
                Payment
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="font-semibold">{order.id}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="font-medium">{order.customer}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="font-medium">{order.product}</div>
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
                <td className="py-4 px-6">
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                    {order.payment}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden p-4 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold">{order.id}</div>
                <div className="text-sm text-gray-500">{order.customer}</div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Product:</span>
                <span className="font-medium">{order.product}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date:</span>
                <span>{formatDate(order.date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Amount:</span>
                <span className="font-bold">${order.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment:</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                  {order.payment}
                </span>
              </div>
            </div>

            <div className="flex space-x-2 pt-2 border-t">
              <button className="flex-1 py-2 text-center border rounded-lg text-blue-600 hover:bg-blue-50">
                View Details
              </button>
              <button className="flex-1 py-2 text-center border rounded-lg text-green-600 hover:bg-green-50">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-t">
        <div className="text-sm text-gray-500">
          Showing {orders.length} recent orders •
          <span className="md:hidden"> Viewing on mobile</span>
          <span className="hidden md:inline"> Viewing on desktop</span>
        </div>
      </div>
    </div>
  );
}
