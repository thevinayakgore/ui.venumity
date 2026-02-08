"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  Image,
  Video,
  Music,
  File,
  Trash2,
  Eye,
  Download,
  Share2,
} from "lucide-react";

const fileTypes = [
  {
    type: "image",
    icon: Image,
    color: "from-blue-500 to-cyan-400",
    extensions: "JPG, PNG, GIF",
  },
  {
    type: "video",
    icon: Video,
    color: "from-purple-500 to-pink-400",
    extensions: "MP4, MOV, AVI",
  },
  {
    type: "audio",
    icon: Music,
    color: "from-emerald-500 to-teal-400",
    extensions: "MP3, WAV, FLAC",
  },
  {
    type: "document",
    icon: File,
    color: "from-amber-500 to-orange-400",
    extensions: "PDF, DOC, PPT",
  },
];

interface FileItem {
  file: File;
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: "uploading" | "completed";
}

export default function CustomMediaComponent_4_3() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [isUploading, setIsUploading] = useState(false);
  const [, setPreviewFile] = useState<FileItem | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type.split("/")[0],
      progress: 0,
      status: "uploading",
    }));

    setFiles((prev) =>
      prev.map((f) =>
        newFiles.find((nf) => nf.id === f.id)
          ? { ...f, status: "completed" as const }
          : f
      )
    );
    setIsUploading(true);

    // Simulate upload progress
    newFiles.forEach((fileObj) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setUploadProgress((prev) => ({
          ...prev,
          [fileObj.id]: progress,
        }));

        if (progress >= 100) {
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileObj.id ? { ...f, status: "completed" } : f
            )
          );
        }
      }, 100);
    });

    setTimeout(() => setIsUploading(false), 3000);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif"],
      "video/*": [".mp4", ".mov", ".avi"],
      "audio/*": [".mp3", ".wav", ".flac"],
      "application/*": [".pdf", ".doc", ".docx", ".ppt", ".pptx"],
    },
  });

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type: string) => {
    const fileType = fileTypes.find((ft) => ft.type === type) || fileTypes[3];
    const Icon = fileType.icon;
    return (
      <div
        className={`w-12 h-12 rounded-xl bg-linear-to-br ${fileType.color} flex items-center justify-center`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Media Upload Center
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Upload and manage your media files
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-full font-medium transition-colors">
              Manage Storage
            </button>
            <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-full font-medium transition-all">
              Upgrade Plan
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Area */}
          <div className="lg:col-span-2">
            {/* Dropzone */}
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                isDragActive
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
              }`}
            >
              <input {...getInputProps()} />
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 rounded-full bg-linear-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 flex items-center justify-center mx-auto mb-6">
                  <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  {isDragActive ? "Drop files here" : "Drag & drop files here"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  or click to browse files from your computer
                </p>
                <button className="px-8 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-full font-medium transition-all">
                  Browse Files
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Supports images, videos, audio, and documents up to 2GB each
                </p>
              </div>
            </div>

            {/* File Type Info */}
            <div className="mt-8 grid grid-cols-4 gap-4">
              {fileTypes.map((fileType) => {
                const Icon = fileType.icon;
                return (
                  <div
                    key={fileType.type}
                    className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-center"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg bg-linear-to-br ${fileType.color} flex items-center justify-center mx-auto mb-3`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-medium text-gray-800 dark:text-white capitalize">
                      {fileType.type}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {fileType.extensions}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="mt-8 space-y-4">
                <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                  Uploading Files
                </h4>
                {files
                  .filter((f) => f.status === "uploading")
                  .map((file) => (
                    <div
                      key={file.id}
                      className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(file.type)}
                          <div>
                            <div className="font-medium text-gray-800 dark:text-white truncate max-w-xs">
                              {file.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {formatFileSize(file.size)}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {uploadProgress[file.id] || 0}%
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress[file.id] || 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Preview & Actions */}
          <div className="space-y-6">
            {/* Storage Stats */}
            <div className="bg-linear-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg">
              <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                Storage Overview
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>15.8 GB of 50 GB used</span>
                    <span>32%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-blue-500 to-cyan-400 rounded-full"
                      style={{ width: "32%" }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">
                      142
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Files
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">
                      24
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Folders
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">
                      5
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Shared
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Files */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                Recent Files
              </h4>
              <div className="space-y-3">
                {files.slice(0, 3).map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 hover:bg-white dark:hover:bg-gray-700/50 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.type)}
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white text-sm truncate max-w-35">
                          {file.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {formatFileSize(file.size)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setPreviewFile(file)}
                        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                      >
                        <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-xl transition-all">
                <Share2 className="w-5 h-5" />
                <span className="font-medium">Share Selected</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors">
                <Download className="w-5 h-5" />
                <span className="font-medium">Download All</span>
              </button>
            </div>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Uploaded Files ({files.length})
              </h3>
              <button
                onClick={() => setFiles([])}
                className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
              >
                <Trash2 className="w-4 h-4 inline mr-2" />
                Clear All
              </button>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        File
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Type
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Size
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Status
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file) => (
                      <tr
                        key={file.id}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700/30"
                      >
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            {getFileIcon(file.type)}
                            <div>
                              <div className="font-medium text-gray-800 dark:text-white">
                                {file.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Uploaded just now
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-800 dark:text-gray-300 capitalize">
                            {file.type}
                          </div>
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-400">
                          {formatFileSize(file.size)}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                file.status === "completed"
                                  ? "bg-green-500"
                                  : "bg-blue-500 animate-pulse"
                              }`}
                            />
                            <span className="text-sm">
                              {file.status === "completed"
                                ? "Completed"
                                : "Uploading"}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setPreviewFile(file)}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                              <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                            <button
                              onClick={() => removeFile(file.id)}
                              className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
