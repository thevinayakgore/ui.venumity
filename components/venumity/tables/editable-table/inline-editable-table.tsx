"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Edit2, Save, X, Trash2, Plus } from "lucide-react";

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
}

export default function EditableTable3_1() {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempData, setTempData] = useState<UserData | null>(null);
  const [data, setData] = useState<UserData[]>([
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      role: "Admin",
      department: "Engineering",
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria@example.com",
      role: "Developer",
      department: "Engineering",
    },
    {
      id: 3,
      name: "David Smith",
      email: "david@example.com",
      role: "Designer",
      department: "Design",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "Manager",
      department: "Marketing",
    },
  ]);

  const startEditing = (item: UserData) => {
    setEditingId(item.id);
    setTempData({ ...item });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setTempData(null);
  };

  const saveEditing = () => {
    if (tempData) {
      setData((prev: UserData[]) =>
        prev.map((item) => (item.id === editingId ? tempData : item))
      );
      setEditingId(null);
      setTempData(null);
    }
  };

  const deleteRow = (id: number) => {
    setData((prev: UserData[]) => prev.filter((item) => item.id !== id));
  };

  const addNewRow = () => {
    const newId = Math.max(...data.map((d) => d.id)) + 1;
    const newRow: UserData = { id: newId, name: "", email: "", role: "", department: "" };
    setData((prev: UserData[]) => [...prev, newRow]);
    startEditing(newRow);
  };

  const updateTempData = (field: keyof UserData, value: string) => {
    setTempData((prev: UserData | null) => prev ? { ...prev, [field]: value } : null);
  };

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                User Management
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Click cells to edit values
              </p>
            </div>
            <button
              onClick={addNewRow}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add User
            </button>
          </div>
        </div>

        {/* Editable Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Role
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Department
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Actions
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
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                >
                  {/* Name */}
                  <td className="py-4 px-6">
                    {editingId === item.id ? (
                      <input
                        type="text"
                        value={tempData?.name || ""}
                        onChange={(e) => updateTempData("name", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        autoFocus
                      />
                    ) : (
                      <div className="font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </div>
                    )}
                  </td>

                  {/* Email */}
                  <td className="py-4 px-6">
                    {editingId === item.id ? (
                      <input
                        type="email"
                        value={tempData?.email || ""}
                        onChange={(e) =>
                          updateTempData("email", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <div className="text-gray-600 dark:text-gray-400">
                        {item.email}
                      </div>
                    )}
                  </td>

                  {/* Role */}
                  <td className="py-4 px-6">
                    {editingId === item.id ? (
                      <select
                        value={tempData?.role || ""}
                        onChange={(e) => updateTempData("role", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="">Select role</option>
                        <option value="Admin">Admin</option>
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                        <option value="Manager">Manager</option>
                        <option value="Analyst">Analyst</option>
                      </select>
                    ) : (
                      <div className="font-medium text-gray-900 dark:text-white">
                        {item.role}
                      </div>
                    )}
                  </td>

                  {/* Department */}
                  <td className="py-4 px-6">
                    {editingId === item.id ? (
                      <input
                        type="text"
                        value={tempData?.department || ""}
                        onChange={(e) =>
                          updateTempData("department", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <div className="text-gray-600 dark:text-gray-400">
                        {item.department}
                      </div>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {editingId === item.id ? (
                        <>
                          <button
                            onClick={saveEditing}
                            className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEditing(item)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                          >
                            <Edit2 className="w-4 h-4 text-blue-500" />
                          </button>
                          <button
                            onClick={() => deleteRow(item.id)}
                            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {data.length} users • Click cells to edit • Press Enter to save
          </div>
        </div>
      </div>
    </main>
  );
}
