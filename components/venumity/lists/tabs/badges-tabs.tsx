"use client";
import { useState } from "react";
import { Inbox, Send, FileText, Star, Trash2, Archive } from "lucide-react";

export default function TabsWithBadges() {
  const [activeTab, setActiveTab] = useState("inbox");

  const tabs = [
    { id: "inbox", label: "Inbox", icon: Inbox, badge: 12 },
    { id: "sent", label: "Sent", icon: Send, badge: 0 },
    { id: "drafts", label: "Drafts", icon: FileText, badge: 3 },
    { id: "starred", label: "Starred", icon: Star, badge: 8 },
    { id: "archive", label: "Archive", icon: Archive, badge: 0 },
    { id: "spam", label: "Spam", icon: Trash2, badge: 47 },
  ];

  const getTabContent = (tabId: string) => {
    switch (tabId) {
      case "inbox":
        return {
          title: "Inbox",
          count: 12,
          description: "Unread and important messages",
          messages: [
            {
              id: 1,
              sender: "John Doe",
              subject: "Meeting Tomorrow",
              preview: "About the project discussion...",
              unread: true,
            },
            {
              id: 2,
              sender: "Sarah Smith",
              subject: "Project Update",
              preview: "The latest updates on the...",
              unread: true,
            },
          ],
        };
      case "drafts":
        return {
          title: "Drafts",
          count: 3,
          description: "Messages saved as drafts",
          messages: [
            {
              id: 1,
              sender: "You",
              subject: "Monthly Report",
              preview: "Draft of the monthly report...",
              unread: false,
            },
          ],
        };
      default:
        return {
          title: tabId.charAt(0).toUpperCase() + tabId.slice(1),
          count: tabs.find((t) => t.id === tabId)?.badge || 0,
          description: `Content for ${tabId}`,
          messages: [],
        };
    }
  };

  const content = getTabContent(activeTab);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        Tabs with Badges
      </h3>

      {/* Tabs with Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const hasBadge = tab.badge > 0;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all relative ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>

              {hasBadge && (
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    isActive ? "bg-white text-primary" : "bg-primary text-white"
                  }`}
                >
                  {tab.badge > 99 ? "99+" : tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                {content.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {content.description}
              </p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {content.count} items
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {content.messages.length > 0 ? (
            content.messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                  message.unread ? "bg-blue-50 dark:bg-blue-900/20" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {message.sender}
                      </div>
                      {message.unread && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white mt-1">
                      {message.subject}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {message.preview}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {message.unread ? "Unread" : "Read"}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No items in {content.title.toLowerCase()}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {content.messages.length} of {content.count} items
          </div>
        </div>
      </div>
    </div>
  );
}
