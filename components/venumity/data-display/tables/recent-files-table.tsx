interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  lastOpened: string;
  icon: string;
  color: string;
}

export default function RecentFilesTable() {
  const files: FileItem[] = [
    {
      id: "1",
      name: "Q4 Financial Report",
      type: "PDF",
      size: "4.2 MB",
      lastOpened: "2 minutes ago",
      icon: "📊",
      color: "bg-red-100",
    },
    {
      id: "2",
      name: "Project Timeline",
      type: "Spreadsheet",
      size: "1.8 MB",
      lastOpened: "15 minutes ago",
      icon: "📅",
      color: "bg-green-100",
    },
    {
      id: "3",
      name: "Design Mockups",
      type: "Figma",
      size: "12.5 MB",
      lastOpened: "1 hour ago",
      icon: "🎨",
      color: "bg-purple-100",
    },
    {
      id: "4",
      name: "Meeting Recording",
      type: "Video",
      size: "245 MB",
      lastOpened: "2 hours ago",
      icon: "🎥",
      color: "bg-blue-100",
    },
    {
      id: "5",
      name: "User Research Notes",
      type: "Document",
      size: "850 KB",
      lastOpened: "Yesterday",
      icon: "📝",
      color: "bg-yellow-100",
    },
    {
      id: "6",
      name: "Database Backup",
      type: "SQL",
      size: "1.2 GB",
      lastOpened: "2 days ago",
      icon: "💾",
      color: "bg-gray-100",
    },
    {
      id: "7",
      name: "Marketing Assets",
      type: "Folder",
      size: "3.4 GB",
      lastOpened: "3 days ago",
      icon: "📁",
      color: "bg-indigo-100",
    },
    {
      id: "8",
      name: "Code Repository",
      type: "Git",
      size: "780 MB",
      lastOpened: "1 week ago",
      icon: "💻",
      color: "bg-pink-100",
    },
  ];

  const getActivityColor = (time: string) => {
    if (time.includes("minutes") || time.includes("hour"))
      return "text-green-600 bg-green-100";
    if (time.includes("Yesterday")) return "text-yellow-600 bg-yellow-100";
    return "text-gray-600 bg-gray-100";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Recent Files</h2>
            <p className="text-gray-500">Files you have worked on recently</p>
          </div>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
            View All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                File Name
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Type
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Size
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Last Opened
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Quick Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {files.map((file) => (
              <tr
                key={file.id}
                className="hover:bg-gray-50 transition-colors group"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`${file.color} w-10 h-10 rounded-lg flex items-center justify-center`}
                    >
                      <span className="text-xl">{file.icon}</span>
                    </div>
                    <div>
                      <div className="font-medium">{file.name}</div>
                      <div className="text-sm text-gray-500">
                        Modified: {file.lastOpened}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {file.type}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-600">{file.size}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getActivityColor(
                      file.lastOpened
                    )}`}
                  >
                    {file.lastOpened}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </button>
                    <button className="p-2 text-purple-600 hover:bg-purple-50 rounded">
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
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
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
    </div>
  );
}
