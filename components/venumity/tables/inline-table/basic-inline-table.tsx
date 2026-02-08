"use client";
import { motion } from "framer-motion";

const InlineTable1_1 = () => {
  const data = [
    { id: 1, name: "John Doe", role: "Developer", status: "Active" },
    { id: 2, name: "Jane Smith", role: "Designer", status: "Active" },
    { id: 3, name: "Bob Johnson", role: "Manager", status: "Inactive" },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-10 p-6 sm:p-10 md:py-14 max-w-7xl w-full h-full"
    >
      <div className="rounded-md border overflow-hidden">
        <table className="w-full divide-y">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted0 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted0 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted0 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted0 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-muted transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {item.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {item.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs text-white leading-5 font-semibold rounded-full ${
                      item.status === "Active" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.main>
  );
};

export default InlineTable1_1;
