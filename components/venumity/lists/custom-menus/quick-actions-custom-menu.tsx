"use client";
import {
  Plus,
  FileText,
  Upload,
  Download,
  Share2,
  Edit,
  Copy,
  Trash2,
  Star,
} from "lucide-react";

export default function CustomMenuWithQuickActions() {
  const quickActions = [
    { label: "New Document", icon: Plus, color: "bg-blue-500" },
    { label: "Upload File", icon: Upload, color: "bg-green-500" },
    { label: "Export Data", icon: Download, color: "bg-purple-500" },
    { label: "Share", icon: Share2, color: "bg-orange-500" },
  ];

  const recentDocuments = [
    { name: "Project Proposal.pdf", date: "Today, 10:30 AM", starred: true },
    { name: "Meeting Notes.docx", date: "Yesterday, 3:45 PM", starred: false },
    { name: "Budget Spreadsheet.xlsx", date: "Jan 15, 2024", starred: true },
    { name: "Design Mockups.fig", date: "Jan 12, 2024", starred: false },
  ];

  const handleAction = (action: string) => {
    alert(`Action: ${action}`);
  };

  return (
    <div className="w-80 p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        Custom Menu with Quick Actions
      </h3>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => handleAction(action.label)}
              className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div
                className={`${action.color} w-10 h-10 rounded-lg flex items-center justify-center mb-2`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Recent Documents */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900 dark:text-white">
            Recent Documents
          </h4>
          <button className="text-sm text-primary hover:text-primary/80">
            View All
          </button>
        </div>

        <div className="space-y-2">
          {recentDocuments.map((doc, index) => (
            <div
              key={index}
              className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {doc.name}
                    </span>
                    {doc.starred && (
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {doc.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 text-gray-400 hover:text-primary">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-green-600">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
