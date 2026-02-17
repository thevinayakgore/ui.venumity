import { useState, useEffect } from "react";

interface UploadFile {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "uploading" | "completed" | "error" | "paused";
  speed: string;
  timeRemaining: string;
}

export default function FileUploadProgressTable() {
  const [files, setFiles] = useState<UploadFile[]>([
    {
      id: "1",
      name: "Project_Documentation.pdf",
      size: "4.2 MB",
      progress: 75,
      status: "uploading",
      speed: "1.2 MB/s",
      timeRemaining: "00:45",
    },
    {
      id: "2",
      name: "Design_Assets.zip",
      size: "128 MB",
      progress: 100,
      status: "completed",
      speed: "0 MB/s",
      timeRemaining: "00:00",
    },
    {
      id: "3",
      name: "Meeting_Recording.mp4",
      size: "2.1 GB",
      progress: 32,
      status: "uploading",
      speed: "850 KB/s",
      timeRemaining: "12:30",
    },
    {
      id: "4",
      name: "Database_Backup.sql",
      size: "850 MB",
      progress: 0,
      status: "error",
      speed: "0 KB/s",
      timeRemaining: "--:--",
    },
    {
      id: "5",
      name: "User_Photos",
      size: "45 MB",
      progress: 45,
      status: "paused",
      speed: "0 KB/s",
      timeRemaining: "05:20",
    },
    {
      id: "6",
      name: "Code_Repository.tar",
      size: "320 MB",
      progress: 100,
      status: "completed",
      speed: "0 MB/s",
      timeRemaining: "00:00",
    },
  ]);

  const [uploading, setUploading] = useState(true);

  useEffect(() => {
    if (!uploading) return;

    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((file) => {
          if (file.status === "uploading" && file.progress < 100) {
            const increment = Math.random() * 5;
            const newProgress = Math.min(100, file.progress + increment);
            return {
              ...file,
              progress: newProgress,
              status: newProgress === 100 ? "completed" : "uploading",
              speed: newProgress === 100 ? "0 MB/s" : file.speed,
              timeRemaining: newProgress === 100 ? "00:00" : file.timeRemaining,
            };
          }
          return file;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [uploading]);

  const toggleUpload = () => {
    setUploading(!uploading);
    if (!uploading) {
      setFiles((prev) =>
        prev.map((file) =>
          file.status === "paused" ? { ...file, status: "uploading" } : file
        )
      );
    } else {
      setFiles((prev) =>
        prev.map((file) =>
          file.status === "uploading" ? { ...file, status: "paused" } : file
        )
      );
    }
  };

  const retryUpload = (id: string) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === id ? { ...file, status: "uploading", progress: 0 } : file
      )
    );
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const getStatusColor = (status: UploadFile["status"]) => {
    switch (status) {
      case "uploading":
        return "text-blue-600 bg-blue-100";
      case "completed":
        return "text-green-600 bg-green-100";
      case "error":
        return "text-red-600 bg-red-100";
      case "paused":
        return "text-yellow-600 bg-yellow-100";
    }
  };

  const getStatusIcon = (status: UploadFile["status"]) => {
    switch (status) {
      case "uploading":
        return "⏫";
      case "completed":
        return "✅";
      case "error":
        return "❌";
      case "paused":
        return "⏸️";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">File Uploads</h2>
            <p className="text-gray-500">
              {files.filter((f) => f.status === "uploading").length} uploading •
              {files.filter((f) => f.status === "completed").length} completed
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={toggleUpload}
              className={`px-4 py-2 rounded-lg transition-colors ${
                uploading
                  ? "bg-yellow-600 text-white hover:bg-yellow-700"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {uploading ? "Pause All" : "Resume All"}
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
              Add Files
            </button>
          </div>
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
                Size
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Progress
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Speed
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Time Remaining
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
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <span>📄</span>
                    </div>
                    <div className="font-medium truncate max-w-xs">
                      {file.name}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600">{file.size}</td>
                <td className="py-4 px-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{file.progress.toFixed(1)}%</span>
                      <span>{file.size}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${file.progress}%`,
                          backgroundColor:
                            file.status === "error"
                              ? "#dc2626"
                              : file.status === "completed"
                              ? "#16a34a"
                              : file.status === "paused"
                              ? "#ca8a04"
                              : "#2563eb",
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {getStatusIcon(file.status)}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        file.status
                      )}`}
                    >
                      {file.status.charAt(0).toUpperCase() +
                        file.status.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 font-mono text-gray-600">
                  {file.speed}
                </td>
                <td className="py-4 px-6 font-mono text-gray-600">
                  {file.timeRemaining}
                </td>
                <td className="py-4 px-6">
                  <div className="flex space-x-2">
                    {file.status === "error" && (
                      <button
                        onClick={() => retryUpload(file.id)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                      >
                        Retry
                      </button>
                    )}
                    {file.status === "paused" && (
                      <button
                        onClick={() =>
                          setFiles((prev) =>
                            prev.map((f) =>
                              f.id === file.id
                                ? { ...f, status: "uploading" }
                                : f
                            )
                          )
                        }
                        className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                      >
                        Resume
                      </button>
                    )}
                    {file.status === "uploading" && (
                      <button
                        onClick={() =>
                          setFiles((prev) =>
                            prev.map((f) =>
                              f.id === file.id ? { ...f, status: "paused" } : f
                            )
                          )
                        }
                        className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm hover:bg-yellow-200"
                      >
                        Pause
                      </button>
                    )}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                    >
                      Remove
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
            Total: {files.length} files • Uploading:{" "}
            {files.filter((f) => f.status === "uploading").length} • Completed:{" "}
            {files.filter((f) => f.status === "completed").length}
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
              Clear Completed
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Upload More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
