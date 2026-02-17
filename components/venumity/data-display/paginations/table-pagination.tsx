import { useState } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
}

export default function TablePagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const products: Product[] = [
    {
      id: 1,
      name: "Wireless Mouse",
      category: "Electronics",
      price: 29.99,
      stock: 45,
      sales: 128,
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      category: "Electronics",
      price: 89.99,
      stock: 12,
      sales: 86,
    },
    {
      id: 3,
      name: "USB-C Hub",
      category: "Accessories",
      price: 39.99,
      stock: 67,
      sales: 204,
    },
    {
      id: 4,
      name: "Monitor Stand",
      category: "Office",
      price: 49.99,
      stock: 23,
      sales: 92,
    },
    {
      id: 5,
      name: "Desk Lamp",
      category: "Home",
      price: 34.99,
      stock: 89,
      sales: 156,
    },
    {
      id: 6,
      name: "Webcam",
      category: "Electronics",
      price: 59.99,
      stock: 8,
      sales: 73,
    },
    {
      id: 7,
      name: "Notebook",
      category: "Stationery",
      price: 12.99,
      stock: 142,
      sales: 321,
    },
    {
      id: 8,
      name: "Pen Set",
      category: "Stationery",
      price: 24.99,
      stock: 56,
      sales: 189,
    },
    {
      id: 9,
      name: "Headphones",
      category: "Electronics",
      price: 79.99,
      stock: 34,
      sales: 112,
    },
    {
      id: 10,
      name: "Laptop Stand",
      category: "Office",
      price: 45.99,
      stock: 19,
      sales: 67,
    },
    {
      id: 11,
      name: "Phone Case",
      category: "Accessories",
      price: 19.99,
      stock: 203,
      sales: 445,
    },
    {
      id: 12,
      name: "Desk Mat",
      category: "Office",
      price: 24.99,
      stock: 78,
      sales: 134,
    },
  ];

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = products.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden max-w-4xl mx-auto">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Product Inventory</h2>
            <p className="text-gray-500">
              Page {currentPage} of {totalPages} • {totalItems} total products
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Product
          </button>
        </div>

        {/* Items per page selector */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm text-gray-500">Show:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            className="border rounded px-3 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-500">items per page</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                ID
              </th>
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
                Sales
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-6 text-gray-600">#{product.id}</td>
                <td className="py-4 px-6">
                  <div className="font-medium">{product.name}</div>
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
                            (product.stock / 200) * 100
                          )}%`,
                        }}
                      />
                    </div>
                    <span>{product.stock}</span>
                  </div>
                </td>
                <td className="py-4 px-6 font-semibold">{product.sales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-6 border-t">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Items info */}
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {endIndex} of {totalItems} entries
          </div>

          {/* Page navigation */}
          <div className="flex items-center space-x-2">
            {/* First page */}
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className={`p-2 border rounded-lg ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              ⇤
            </button>

            {/* Previous page */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 border rounded-lg ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              ←
            </button>

            {/* Page numbers */}
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "border text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Next page */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 border rounded-lg ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              →
            </button>

            {/* Last page */}
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`p-2 border rounded-lg ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              ⇥
            </button>
          </div>

          {/* Page input */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Go to page:</span>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (!isNaN(page)) {
                  handlePageChange(Math.max(1, Math.min(totalPages, page)));
                }
              }}
              className="w-16 px-2 py-1 border rounded text-center text-sm"
            />
            <span className="text-sm text-gray-500">of {totalPages}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
