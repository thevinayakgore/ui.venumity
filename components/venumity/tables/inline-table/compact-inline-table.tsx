"use client";
import { motion } from "framer-motion";
import { MoreVertical } from "lucide-react";

const tasks = [
  {
    id: 1,
    task: "Design Homepage",
    assignee: "Alice",
    priority: "High",
    progress: 80,
  },
  {
    id: 2,
    task: "API Integration",
    assignee: "Bob",
    priority: "Medium",
    progress: 45,
  },
  {
    id: 3,
    task: "Mobile Responsive",
    assignee: "Charlie",
    priority: "High",
    progress: 90,
  },
  {
    id: 4,
    task: "Database Setup",
    assignee: "Diana",
    priority: "Low",
    progress: 100,
  },
  {
    id: 5,
    task: "User Testing",
    assignee: "Eve",
    priority: "Medium",
    progress: 30,
  },
];

export default function CompactInlineTable() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-10 p-6 sm:p-10 md:py-14 max-w-7xl w-full h-full"
    >
      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y">
          <thead className="bg-muted">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-medium uppercase">
                Task
              </th>
              <th className="px-5 py-4 text-left text-sm font-medium uppercase">
                Assignee
              </th>
              <th className="px-5 py-4 text-left text-sm font-medium uppercase">
                Priority
              </th>
              <th className="px-5 py-4 text-left text-sm font-medium uppercase">
                Progress
              </th>
              <th className="px-5 py-4 text-left text-sm font-medium uppercase"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {tasks.map((item) => (
              <tr key={item.id} className="hover:bg-muted">
                <td className="px-5 py-4 text-sm font-medium">{item.task}</td>
                <td className="px-5 py-4 text-sm text-muted-foreground">
                  {item.assignee}
                </td>
                <td className="px-5 py-4 text-sm">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      item.priority === "High"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        : item.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    }`}
                  >
                    {item.priority}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="w-full rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        item.progress === 100
                          ? "bg-green-600"
                          : item.progress > 70
                          ? "bg-blue-600"
                          : item.progress > 40
                          ? "bg-yellow-600"
                          : "bg-red-600"
                      }`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                    {item.progress}%
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button className="cursor-pointer p-2 hover:bg-foreground/5 backdrop-blur-lg rounded-full text-muted-foreground dark:hover:text-foreground">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.main>
  );
}
