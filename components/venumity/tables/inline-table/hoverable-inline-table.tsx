"use client";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";

const contacts = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York",
    joined: "2023-08-15",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@example.com",
    phone: "+1 (555) 987-6543",
    location: "San Francisco",
    joined: "2023-11-22",
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma@example.com",
    phone: "+1 (555) 456-7890",
    location: "Chicago",
    joined: "2024-01-05",
  },
  {
    id: 4,
    name: "David Brown",
    email: "david@example.com",
    phone: "+1 (555) 234-5678",
    location: "Boston",
    joined: "2023-09-30",
  },
  {
    id: 5,
    name: "Lisa Taylor",
    email: "lisa@example.com",
    phone: "+1 (555) 876-5432",
    location: "Austin",
    joined: "2024-01-10",
  },
];

export default function HoverableInlineTable() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-10 p-6 sm:p-10 md:py-14 max-w-7xl w-full h-full"
    >
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Hoverable Inline Table
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-linear-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-black divide-y divide-gray-200 dark:divide-gray-800">
              {contacts.map((contact) => (
                <motion.tr
                  key={contact.id}
                  whileHover={{ scale: 1.01 }}
                  className="hover:bg-linear-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 cursor-pointer transition-all duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="shrink-0 h-10 w-10 rounded-full bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {contact.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Mail className="w-4 h-4 mr-2" />
                      {contact.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Phone className="w-4 h-4 mr-2" />
                      {contact.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4 mr-2" />
                      {contact.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      {contact.joined}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.main>
  );
}
