import { useState } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

export default function BasicFilterableTable() {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Wireless Mouse",
      category: "Electronics",
      price: 29.99,
      stock: 45,
      status: "In Stock",
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      category: "Electronics",
      price: 89.99,
      stock: 12,
      status: "Low Stock",
    },
    {
      id: 3,
      name: "USB-C Hub",
      category: "Accessories",
      price: 39.99,
      stock: 0,
      status: "Out of Stock",
    },
    {
      id: 4,
      name: "Monitor Stand",
      category: "Office",
      price: 49.99,
      stock: 67,
      status: "In Stock",
    },
    {
      id: 5,
      name: "Desk Lamp",
      category: "Home",
      price: 34.99,
      stock: 23,
      status: "In Stock",
    },
    {
      id: 6,
      name: "Webcam",
      category: "Electronics",
      price: 59.99,
      stock: 8,
      status: "Low Stock",
    },
    {
      id: 7,
      name: "Notebook",
      category: "Stationery",
      price: 12.99,
      stock: 142,
      status: "In Stock",
    },
    {
      id: 8,
      name: "Pen Set",
      category: "Stationery",
      price: 24.99,
      stock: 56,
      status: "In Stock",
    },
  ]);

  const [filters, setFilters] = useState({
    category: "all",
    status: "all",
    minPrice: 0,
    maxPrice: 100,
  });

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = products.filter((product) => {
    if (filters.category !== "all" && product.category !== filters.category) {
      return false;
    }
    if (filters.status !== "all" && product.status !== filters.status) {
      return false;
    }
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }
    return true;
  });

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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Products Inventory</h2>
            <p className="text-gray-500">
              {filteredProducts.length} products found
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Product
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
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
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Price: ${filters.minPrice}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Price: ${filters.maxPrice}
            </label>
            <input
              type="range"
              min="0"
              max="200"
              step="5"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: parseInt(e.target.value) })
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
