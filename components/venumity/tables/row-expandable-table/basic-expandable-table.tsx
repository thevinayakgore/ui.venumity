"use client"
import React from "react";
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ChevronRight, Mail, Phone, MapPin, Calendar, User } from "lucide-react"

const customerData = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    status: "Active",
    orders: 24,
    totalSpent: "$4,890.50",
    details: {
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      joined: "2022-03-15",
      lastOrder: "2024-01-10",
      notes: "Premium customer with high engagement"
    }
  },
  {
    id: 2,
    name: "Sarah Miller",
    email: "sarah@example.com",
    status: "Active",
    orders: 42,
    totalSpent: "$8,245.75",
    details: {
      phone: "+1 (555) 987-6543",
      location: "San Francisco, CA",
      joined: "2021-11-08",
      lastOrder: "2024-01-12",
      notes: "Enterprise account with monthly subscription"
    }
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael@example.com",
    status: "Inactive",
    orders: 8,
    totalSpent: "$1,230.00",
    details: {
      phone: "+1 (555) 456-7890",
      location: "Austin, TX",
      joined: "2023-02-20",
      lastOrder: "2023-11-05",
      notes: "Inactive for 60+ days"
    }
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma@example.com",
    status: "Active",
    orders: 18,
    totalSpent: "$3,567.25",
    details: {
      phone: "+1 (555) 234-5678",
      location: "Chicago, IL",
      joined: "2022-08-30",
      lastOrder: "2024-01-14",
      notes: "Frequent buyer with newsletter subscription"
    }
  },
  {
    id: 5,
    name: "David Brown",
    email: "david@example.com",
    status: "Pending",
    orders: 3,
    totalSpent: "$450.00",
    details: {
      phone: "+1 (555) 876-5432",
      location: "Miami, FL",
      joined: "2023-12-01",
      lastOrder: "2024-01-05",
      notes: "New customer, pending verification"
    }
  },
]

export default function BasicExpandableTable() {
  const [expandedRows, setExpandedRows] = useState<number[]>([])

  const toggleRow = (id: number) => {
    setExpandedRows(prev =>
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    )
  }

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-10 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Customer Directory</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
              Click on any row to view detailed customer information
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span>Active</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
              <span>Inactive</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-linear-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <tr>
                  <th className="w-12 px-4 sm:px-6 py-4"></th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="hidden sm:table-cell px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="hidden md:table-cell px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {customerData.map((customer) => (
                  <React.Fragment key={customer.id}>
                    <tr 
                      onClick={() => toggleRow(customer.id)}
                      className="group cursor-pointer hover:bg-linear-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300"
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <motion.div
                          animate={{ rotate: expandedRows.includes(customer.id) ? 90 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-gray-400 group-hover:text-blue-500"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </motion.div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center">
                          <div className="shrink-0 h-10 w-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div className="ml-3 sm:ml-4">
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                              {customer.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {customer.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          customer.status === "Active" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : customer.status === "Inactive"
                            ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}>
                          {customer.status}
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-4 sm:px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{customer.orders}</div>
                      </td>
                      <td className="hidden md:table-cell px-4 sm:px-6 py-4">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">{customer.totalSpent}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <button className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                          View Details
                        </button>
                      </td>
                    </tr>
                    <AnimatePresence>
                      {expandedRows.includes(customer.id) && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-blue-50/50 dark:bg-gray-800/50"
                        >
                          <td colSpan={6} className="px-4 sm:px-6 py-6">
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                            >
                              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                                <div className="flex items-center mb-3">
                                  <Phone className="w-4 h-4 text-gray-400 mr-2" />
                                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Phone</span>
                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {customer.details.phone}
                                </div>
                              </div>
                              
                              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                                <div className="flex items-center mb-3">
                                  <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Location</span>
                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {customer.details.location}
                                </div>
                              </div>
                              
                              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                                <div className="flex items-center mb-3">
                                  <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Joined</span>
                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {customer.details.joined}
                                </div>
                              </div>
                              
                              <div className="md:col-span-2 lg:col-span-3 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                                <div className="flex items-center mb-3">
                                  <Mail className="w-4 h-4 text-gray-400 mr-2" />
                                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Customer Notes</span>
                                </div>
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                  {customer.details.notes}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                  Last order: {customer.details.lastOrder}
                                </div>
                              </div>
                            </motion.div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div>
            Showing {customerData.length} of {customerData.length} customers
          </div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <button 
              onClick={() => setExpandedRows(customerData.map(c => c.id))}
              className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Expand All
            </button>
            <button 
              onClick={() => setExpandedRows([])}
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
            >
              Collapse All
            </button>
          </div>
        </div>
      </div>
    </motion.main>
  )
}