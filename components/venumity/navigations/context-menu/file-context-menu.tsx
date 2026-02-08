"use client";
import React, { useState } from "react";

interface FileItem {
  id: number;
  name: string;
  type: "folder" | "document" | "image";
  selected: boolean;
}

export default function FileContextMenu() {
  const [files, setFiles] = useState<FileItem[]>([
    { id: 1, name: "Documents", type: "folder", selected: false },
    { id: 2, name: "report.pdf", type: "document", selected: false },
    { id: 3, name: "photo.jpg", type: "image", selected: false },
    { id: 4, name: "Projects", type: "folder", selected: false },
    { id: 5, name: "notes.txt", type: "document", selected: false },
  ]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  const handleFileClick = (file: FileItem) => {
    setFiles(
      files.map((f) => ({
        ...f,
        selected: f.id === file.id,
      }))
    );
    setSelectedFile(file);
  };

  const handleContextMenu = (e: React.MouseEvent, file: FileItem) => {
    e.preventDefault();
    handleFileClick(file);
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "folder":
        return "📁";
      case "document":
        return "📄";
      case "image":
        return "🖼️";
      default:
        return "📄";
    }
  };

  const menuItems = [
    {
      label: "Open",
      icon: "🔓",
      action: () => alert(`Opening ${selectedFile?.name}`),
    },
    {
      label: "Copy",
      icon: "📋",
      action: () => alert(`Copying ${selectedFile?.name}`),
    },
    {
      label: "Move",
      icon: "📦",
      action: () => alert(`Moving ${selectedFile?.name}`),
    },
    {
      label: "Rename",
      icon: "✏️",
      action: () => alert(`Renaming ${selectedFile?.name}`),
    },
    {
      label: "Delete",
      icon: "🗑️",
      action: () => alert(`Deleting ${selectedFile?.name}`),
    },
    {
      label: "Properties",
      icon: "⚙️",
      action: () => alert(`Properties of ${selectedFile?.name}`),
    },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        File Browser Context Menu
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {files.map((file) => (
          <div
            key={file.id}
            onContextMenu={(e) => handleContextMenu(e, file)}
            onClick={() => handleFileClick(file)}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              file.selected
                ? "bg-primary/10 border-primary dark:bg-primary/20"
                : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
            }`}
          >
            <div className="text-3xl mb-2">{getFileIcon(file.type)}</div>
            <div className="text-sm font-medium truncate text-gray-800 dark:text-gray-200">
              {file.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {file.type}
            </div>
          </div>
        ))}
      </div>

      {menuVisible && selectedFile && (
        <div
          className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50 min-w-[200px]"
          style={{ top: menuPosition.y, left: menuPosition.x }}
        >
          <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {selectedFile.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {selectedFile.type}
            </div>
          </div>

          <div className="py-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.action();
                  setMenuVisible(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
