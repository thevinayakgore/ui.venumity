import { useState } from "react";

interface SharedFile {
  id: string;
  name: string;
  sharedBy: string;
  sharedWith: string[];
  permission: "view" | "edit" | "owner";
  sharedDate: string;
  link: string;
  icon: string;
}

export default function FileSharingTable() {
  const [files, setFiles] = useState<SharedFile[]>([
    {
      id: "1",
      name: "Project Roadmap",
      sharedBy: "You",
      sharedWith: ["Team A", "John D"],
      permission: "owner",
      sharedDate: "Today",
      link: "https://drive/file/1",
      icon: "🗺️",
    },
    {
      id: "2",
      name: "Budget Planning",
      sharedBy: "Sarah J",
      sharedWith: ["You", "Finance Team"],
      permission: "edit",
      sharedDate: "Yesterday",
      link: "https://drive/file/2",
      icon: "💰",
    },
    {
      id: "3",
      name: "Design System",
      sharedBy: "Mike W",
      sharedWith: ["Design Team", "You"],
      permission: "view",
      sharedDate: "2 days ago",
      link: "https://drive/file/3",
      icon: "🎨",
    },
    {
      id: "4",
      name: "Meeting Notes",
      sharedBy: "You",
      sharedWith: ["All Staff"],
      permission: "owner",
      sharedDate: "1 week ago",
      link: "https://drive/file/4",
      icon: "📝",
    },
    {
      id: "5",
      name: "API Documentation",
      sharedBy: "Dev Team",
      sharedWith: ["You", "External Partners"],
      permission: "view",
      sharedDate: "2 weeks ago",
      link: "https://drive/file/5",
      icon: "📚",
    },
    {
      id: "6",
      name: "Marketing Assets",
      sharedBy: "You",
      sharedWith: ["Marketing Team"],
      permission: "owner",
      sharedDate: "1 month ago",
      link: "https://drive/file/6",
      icon: "📢",
    },
  ]);

  const getPermissionColor = (permission: SharedFile["permission"]) => {
    switch (permission) {
      case "owner":
        return "bg-purple-100 text-purple-800";
      case "edit":
        return "bg-green-100 text-green-800";
      case "view":
        return "bg-blue-100 text-blue-800";
    }
  };

  const getPermissionText = (permission: SharedFile["permission"]) => {
    switch (permission) {
      case "owner":
        return "Owner";
      case "edit":
        return "Can Edit";
      case "view":
        return "Can View";
    }
  };

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };

  const updatePermission = (
    id: string,
    permission: SharedFile["permission"]
  ) => {
    setFiles(
      files.map((file) => (file.id === id ? { ...file, permission } : file))
    );
  };

  const removeShare = (id: string) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Shared Files</h2>
            <p className="text-gray-500">Files shared with you and by you</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Share New File
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                File
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Shared By
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Shared With
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Permission
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Shared Date
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {files.map((file) => (
              <tr key={file.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">{file.icon}</span>
                    </div>
                    <div>
                      <div className="font-medium">{file.name}</div>
                      <button
                        onClick={() => copyLink(file.link)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Copy link
                      </button>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-6 h-6 rounded-full ${
                        file.sharedBy === "You" ? "bg-blue-100" : "bg-gray-200"
                      }`}
                    ></div>
                    <span
                      className={file.sharedBy === "You" ? "font-medium" : ""}
                    >
                      {file.sharedBy}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex flex-wrap gap-1">
                    {file.sharedWith.map((person, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {person}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getPermissionColor(
                        file.permission
                      )}`}
                    >
                      {getPermissionText(file.permission)}
                    </span>
                    {file.permission !== "owner" && (
                      <select
                        value={file.permission}
                        onChange={(e) =>
                          updatePermission(
                            file.id,
                            e.target.value as SharedFile["permission"]
                          )
                        }
                        className="text-xs border rounded px-2 py-1"
                      >
                        <option value="view">Can View</option>
                        <option value="edit">Can Edit</option>
                      </select>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600">{file.sharedDate}</td>
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
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => removeShare(file.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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

      <div className="p-6 border-t">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {files.length} shared files
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
              Manage Links
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Share More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
