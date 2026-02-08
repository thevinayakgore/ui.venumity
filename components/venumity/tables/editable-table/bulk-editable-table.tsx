"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Edit2, Save, Trash2, Check, Filter } from "lucide-react";

interface ProductData {
  id: number;
  product: string;
  category: string;
  price: number;
  stock: number;
  status: string;
}

export default function EditableTable3_3() {
  const [editingMode, setEditingMode] = useState<"none" | "single" | "bulk">(
    "none"
  );
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [data, setData] = useState<ProductData[]>([
    {
      id: 1,
      product: "iPhone 14 Pro",
      category: "Electronics",
      price: 999,
      stock: 45,
      status: "In Stock",
    },
    {
      id: 2,
      product: "MacBook Air",
      category: "Computers",
      price: 1199,
      stock: 23,
      status: "Low Stock",
    },
    {
      id: 3,
      product: "AirPods Pro",
      category: "Audio",
      price: 249,
      stock: 156,
      status: "In Stock",
    },
    {
      id: 4,
      product: "iPad Air",
      category: "Tablets",
      price: 599,
      stock: 34,
      status: "In Stock",
    },
    {
      id: 5,
      product: "Apple Watch",
      category: "Wearables",
      price: 399,
      stock: 89,
      status: "In Stock",
    },
    {
      id: 6,
      product: "Magic Keyboard",
      category: "Accessories",
      price: 299,
      stock: 56,
      status: "In Stock",
    },
  ]);

  const [bulkEdit, setBulkEdit] = useState({
    price: "",
    stock: "",
    status: "",
  });

  const toggleRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const toggleAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((item) => item.id));
    }
  };

  const startBulkEdit = () => {
    setEditingMode("bulk");
  };

  const cancelBulkEdit = () => {
    setEditingMode("none");
    setBulkEdit({ price: "", stock: "", status: "" });
  };

  const applyBulkEdit = () => {
    const updates: Partial<ProductData> = {};
    if (bulkEdit.price) updates.price = parseInt(bulkEdit.price);
    if (bulkEdit.stock) updates.stock = parseInt(bulkEdit.stock);
    if (bulkEdit.status) updates.status = bulkEdit.status;

    setData((prev) =>
      prev.map((item) =>
        selectedRows.includes(item.id) ? { ...item, ...updates } : item
      )
    );

    setEditingMode("none");
    setSelectedRows([]);
    setBulkEdit({ price: "", stock: "", status: "" });
  };

  const deleteSelected = () => {
    setData((prev) => prev.filter((item) => !selectedRows.includes(item.id)));
    setSelectedRows([]);
  };

  const updateSingleCell = (
    id: number,
    field: keyof ProductData,
    value: string | number
  ) => {
    setData((prev: ProductData[]) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Inventory Management
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Select multiple rows for bulk editing
              </p>
            </div>

            <div className="flex items-center gap-3">
              {editingMode === "bulk" ? (
                <>
                  <button
                    onClick={cancelBulkEdit}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={applyBulkEdit}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg flex items-center gap-2 transition"
                  >
                    <Save className="w-4 h-4" />
                    Apply Changes
                  </button>
                </>
              ) : (
                <>
                  {selectedRows.length > 0 && (
                    <>
                      <button
                        onClick={startBulkEdit}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center gap-2 transition"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit {selectedRows.length} Items
                      </button>
                      <button
                        onClick={deleteSelected}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg flex items-center gap-2 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </>
                  )}
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Bulk Edit Form */}
          {editingMode === "bulk" && selectedRows.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="font-medium text-blue-700 dark:text-blue-400">
                  Editing {selectedRows.length} selected items
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price
                  </label>
                  <input
                    type="number"
                    value={bulkEdit.price}
                    onChange={(e) =>
                      setBulkEdit((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Leave empty to keep unchanged"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    value={bulkEdit.stock}
                    onChange={(e) =>
                      setBulkEdit((prev) => ({
                        ...prev,
                        stock: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Leave empty to keep unchanged"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={bulkEdit.status}
                    onChange={(e) =>
                      setBulkEdit((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="">Keep unchanged</option>
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="py-4 px-6">
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.length === data.length && data.length > 0
                    }
                    onChange={toggleAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Product
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Price
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Stock
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition ${
                    selectedRows.includes(item.id)
                      ? "bg-blue-50 dark:bg-blue-900/10"
                      : ""
                  }`}
                >
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => toggleRow(item.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {item.product}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {editingMode === "single" &&
                    selectedRows.includes(item.id) ? (
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                          updateSingleCell(
                            item.id,
                            "price",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-24 px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <div className="font-bold text-gray-900 dark:text-white">
                        ${item.price}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {editingMode === "single" &&
                    selectedRows.includes(item.id) ? (
                      <input
                        type="number"
                        value={item.stock}
                        onChange={(e) =>
                          updateSingleCell(
                            item.id,
                            "stock",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-24 px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <div className="font-medium text-gray-900 dark:text-white">
                        {item.stock}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {editingMode === "single" &&
                    selectedRows.includes(item.id) ? (
                      <select
                        value={item.status}
                        onChange={(e) =>
                          updateSingleCell(item.id, "status", e.target.value)
                        }
                        className="w-32 px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="In Stock">In Stock</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "In Stock"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : item.status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {selectedRows.length > 0
                ? `${selectedRows.length} of ${data.length} selected`
                : `${data.length} products in inventory`}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  setEditingMode(editingMode === "single" ? "none" : "single")
                }
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  editingMode === "single"
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {editingMode === "single"
                  ? "Finish Editing"
                  : "Single Edit Mode"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
