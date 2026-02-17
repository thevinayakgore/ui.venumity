import { useState } from "react";

interface FileItem {
  id: string;
  name: string;
  type:
    | "pdf"
    | "image"
    | "document"
    | "spreadsheet"
    | "presentation"
    | "folder";
  size: string;
  modified: string;
  owner: string;
}

export default function BasicFileTable() {
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  const files: FileItem[] = [
    {
      id: "1",
      name: "Project Proposal.pdf",
      type: "pdf",
      size: "2.4 MB",
      modified: "Yesterday",
      owner: "John Doe",
    },
    {
      id: "2",
      name: "Q1 Financial Report.xlsx",
      type: "spreadsheet",
      size: "1.8 MB",
      modified: "2 days ago",
      owner: "Sarah Johnson",
    },
    {
      id: "3",
      name: "Team Photos",
      type: "folder",
      size: "45.2 MB",
      modified: "3 days ago",
      owner: "Mike Wilson",
    },
    {
      id: "4",
      name: "Marketing Plan.docx",
      type: "document",
      size: "850 KB",
      modified: "1 week ago",
      owner: "Emma Davis",
    },
    {
      id: "5",
      name: "Product Demo.pptx",
      type: "presentation",
      size: "5.2 MB",
      modified: "2 weeks ago",
      owner: "Robert Brown",
    },
    {
      id: "6",
      name: "Logo Design.png",
      type: "image",
      size: "1.2 MB",
      modified: "3 weeks ago",
      owner: "Lisa Taylor",
    },
    {
      id: "7",
      name: "User Research Data.csv",
      type: "spreadsheet",
      size: "3.7 MB",
      modified: "1 month ago",
      owner: "David Miller",
    },
    {
      id: "8",
      name: "Meeting Notes.txt",
      type: "document",
      size: "45 KB",
      modified: "2 months ago",
      owner: "Amanda Clark",
    },
  ];

  const toggleFile = (id: string) => {
    const newSelected = new Set(selectedFiles);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedFiles(newSelected);
  };

  const getFileIcon = (type: FileItem["type"]) => {
    switch (type) {
      case "pdf":
        return "📄";
      case "image":
        return "🖼️";
      case "document":
        return "📝";
      case "spreadsheet":
        return "📊";
      case "presentation":
        return "📽️";
      case "folder":
        return "📁";
      default:
        return "📄";
    }
  };

  const getTypeColor = (type: FileItem["type"]) => {
    switch (type) {
      case "pdf":
        return "bg-red-100 text-red-800";
      case "image":
        return "bg-green-100 text-green-800";
      case "document":
        return "bg-blue-100 text-blue-800";
      case "spreadsheet":
        return "bg-green-100 text-green-800";
      case "presentation":
        return "bg-yellow-100 text-yellow-800";
      case "folder":
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">File Manager</h2>
            <p className="text-gray-500">{selectedFiles.size} files selected</p>
          </div>
          <div className="flex space-x-3">
            {selectedFiles.size > 0 && (
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Delete Selected
              </button>
            )}
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Upload Files
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
              New Folder
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-6 text-left">
                <input
                  type="checkbox"
                  checked={selectedFiles.size === files.length}
                  onChange={() => {
                    if (selectedFiles.size === files.length) {
                      setSelectedFiles(new Set());
                    } else {
                      setSelectedFiles(new Set(files.map((f) => f.id)));
                    }
                  }}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Type
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Size
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Modified
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Owner
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {files.map((file) => (
              <tr
                key={file.id}
                className={`hover:bg-gray-50 transition-colors ${
                  selectedFiles.has(file.id) ? "bg-blue-50" : ""
                }`}
              >
                <td className="py-4 px-6">
                  <input
                    type="checkbox"
                    checked={selectedFiles.has(file.id)}
                    onChange={() => toggleFile(file.id)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{getFileIcon(file.type)}</span>
                    <div>
                      <div className="font-medium">{file.name}</div>
                      {file.type === "folder" && (
                        <div className="text-sm text-gray-500">
                          Contains 12 items
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
                      file.type
                    )}`}
                  >
                    {file.type.charAt(0).toUpperCase() + file.type.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-600">{file.size}</td>
                <td className="py-4 px-6 text-gray-600">{file.modified}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                    <span>{file.owner}</span>
                  </div>
                </td>
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
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded">
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
    </div>
  );
}
