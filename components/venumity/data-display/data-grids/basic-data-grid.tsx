interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  sales: number;
}

export default function BasicDataGrid() {
  const products: Product[] = [
    {
      id: 1,
      name: "Wireless Mouse",
      category: "Electronics",
      price: 29.99,
      stock: 45,
      status: "In Stock",
      sales: 128,
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      category: "Electronics",
      price: 89.99,
      stock: 12,
      status: "Low Stock",
      sales: 86,
    },
    {
      id: 3,
      name: "USB-C Hub",
      category: "Accessories",
      price: 39.99,
      stock: 0,
      status: "Out of Stock",
      sales: 204,
    },
    {
      id: 4,
      name: "Monitor Stand",
      category: "Office",
      price: 49.99,
      stock: 67,
      status: "In Stock",
      sales: 92,
    },
    {
      id: 5,
      name: "Desk Lamp",
      category: "Office",
      price: 34.99,
      stock: 23,
      status: "In Stock",
      sales: 156,
    },
    {
      id: 6,
      name: "Webcam",
      category: "Electronics",
      price: 59.99,
      stock: 8,
      status: "Low Stock",
      sales: 73,
    },
    {
      id: 7,
      name: "Notebook",
      category: "Stationery",
      price: 12.99,
      stock: 142,
      status: "In Stock",
      sales: 321,
    },
    {
      id: 8,
      name: "Pen Set",
      category: "Stationery",
      price: 24.99,
      stock: 56,
      status: "In Stock",
      sales: 189,
    },
  ];

  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Products Inventory</h2>
            <p className="text-gray-500">
              Manage your products and stock levels
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Product
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Product
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Price
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Stock
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Sales
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-lg">📦</span>
                    </div>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">
                        ID: {product.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {product.category}
                  </span>
                </td>
                <td className="py-4 px-6 font-semibold">
                  ${product.price.toFixed(2)}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            (product.stock / 150) * 100
                          )}%`,
                        }}
                      />
                    </div>
                    <span>{product.stock}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      product.status
                    )}`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="py-4 px-6 font-semibold">{product.sales}</td>
                <td className="py-4 px-6">
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
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
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded">
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
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded">
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

      <div className="px-6 py-4 border-t flex justify-between items-center">
        <div className="text-sm text-gray-500">Showing 8 of 124 products</div>
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
          <span className="px-3 py-1">...</span>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">
            12
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
