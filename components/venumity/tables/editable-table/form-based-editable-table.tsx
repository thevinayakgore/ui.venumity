"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Edit2,
  Trash2,
  Plus,
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Building,
} from "lucide-react";

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  location: string;
}

export default function EditableTable3_5() {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    location: "",
  });
  const [data, setData] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      phone: "+1 (555) 123-4567",
      position: "Senior Developer",
      department: "Engineering",
      location: "New York, NY",
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria@example.com",
      phone: "+1 (555) 987-6543",
      position: "Product Designer",
      department: "Design",
      location: "San Francisco, CA",
    },
    {
      id: 3,
      name: "David Smith",
      email: "david@example.com",
      phone: "+1 (555) 456-7890",
      position: "Marketing Manager",
      department: "Marketing",
      location: "Chicago, IL",
    },
  ]);

  const startEditing = (item: UserData) => {
    setEditingId(item.id);
    setFormData({ ...item });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      location: "",
    });
  };

  const saveEditing = () => {
    if (editingId) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editingId ? { id: editingId, ...formData } : item
        )
      );
    } else {
      const newId = Math.max(...data.map((d) => d.id)) + 1;
      setData((prev) => [...prev, { id: newId, ...formData }]);
    }
    cancelEditing();
  };

  const deleteItem = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const addNew = () => {
    setEditingId(-1); // Temporary ID for new item
    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      location: "",
    });
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Employee Directory
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Manage employee information
              </p>
            </div>
            <button
              onClick={addNew}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Employee
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 p-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-1">
            <div
              className={`bg-gray-50 dark:bg-gray-800 rounded-xl p-6 sticky top-6 ${
                editingId
                  ? "border-2 border-blue-500"
                  : "border border-gray-200 dark:border-gray-700"
              }`}
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                {editingId
                  ? editingId === -1
                    ? "Add New Employee"
                    : "Edit Employee"
                  : "Select an employee"}
              </h3>

              {editingId ? (
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateFormData("name", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Enter full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Enter email address"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Enter phone number"
                    />
                  </div>

                  {/* Position */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Briefcase className="w-4 h-4" />
                      Position
                    </label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) =>
                        updateFormData("position", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Enter position"
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Building className="w-4 h-4" />
                      Department
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) =>
                        updateFormData("department", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="">Select department</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="HR">Human Resources</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        updateFormData("location", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Enter location"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={cancelEditing}
                      className="flex-1 py-3 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveEditing}
                      className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition"
                    >
                      <Save className="w-4 h-4" />
                      {editingId === -1 ? "Create" : "Update"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Select an employee from the list to edit their details
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Table */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Employee
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Position
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Department
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Location
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
                        className={`border-b border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-900/50 transition ${
                          editingId === item.id
                            ? "bg-blue-50 dark:bg-blue-900/10"
                            : ""
                        }`}
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-medium">
                              {item.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {item.name}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {item.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {item.position}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-sm">
                            {item.department}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-gray-600 dark:text-gray-400">
                            {item.location}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => startEditing(item)}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                            >
                              <Edit2 className="w-4 h-4 text-blue-500" />
                            </button>
                            <button
                              onClick={() => deleteItem(item.id)}
                              className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 p-4 rounded-xl">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {data.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Employees
                </div>
              </div>
              <div className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 p-4 rounded-xl">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  3
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Departments
                </div>
              </div>
              <div className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-4 rounded-xl">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  3
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Locations
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
