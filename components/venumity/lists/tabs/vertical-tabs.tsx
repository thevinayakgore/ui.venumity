"use client";
import { useState } from "react";
import {
  User,
  Settings,
  Bell,
  CreditCard,
  Shield,
  HelpCircle,
} from "lucide-react";

export default function VerticalTabs() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
      description: "Personal information",
    },
    {
      id: "account",
      label: "Account",
      icon: Settings,
      description: "Account settings",
    },
    {
      id: "billing",
      label: "Billing",
      icon: CreditCard,
      description: "Payment methods",
    },
    {
      id: "security",
      label: "Security",
      icon: Shield,
      description: "Privacy & security",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      description: "Alerts & notifications",
    },
    {
      id: "support",
      label: "Support",
      icon: HelpCircle,
      description: "Help & support",
    },
  ];

  const tabContent = {
    profile: {
      title: "Profile Settings",
      sections: [
        { title: "Personal Information", fields: ["Name", "Email", "Phone"] },
        { title: "Profile Picture", fields: ["Upload", "Remove"] },
        { title: "Bio", fields: ["Description"] },
      ],
    },
    account: {
      title: "Account Settings",
      sections: [
        {
          title: "Account Details",
          fields: ["Username", "Language", "Timezone"],
        },
        { title: "Preferences", fields: ["Theme", "Layout", "Default View"] },
      ],
    },
    billing: {
      title: "Billing Information",
      sections: [
        {
          title: "Payment Methods",
          fields: ["Credit Card", "PayPal", "Bank Transfer"],
        },
        { title: "Billing History", fields: ["Invoices", "Receipts"] },
        { title: "Subscription", fields: ["Plan", "Renewal Date"] },
      ],
    },
    security: {
      title: "Security Settings",
      sections: [
        { title: "Password", fields: ["Change Password", "Two-Factor Auth"] },
        {
          title: "Sessions",
          fields: ["Active Sessions", "Log Out Everywhere"],
        },
        { title: "Privacy", fields: ["Data Export", "Account Deletion"] },
      ],
    },
    notifications: {
      title: "Notification Settings",
      sections: [
        {
          title: "Email Notifications",
          fields: ["Marketing", "Security Alerts", "Product Updates"],
        },
        { title: "Push Notifications", fields: ["Mobile", "Desktop"] },
        { title: "Schedule", fields: ["Quiet Hours", "Do Not Disturb"] },
      ],
    },
    support: {
      title: "Help & Support",
      sections: [
        { title: "Documentation", fields: ["Guides", "API Reference", "FAQs"] },
        { title: "Contact", fields: ["Email Support", "Live Chat", "Phone"] },
        { title: "Community", fields: ["Forums", "Discord", "GitHub"] },
      ],
    },
  };

  const content = tabContent[activeTab as keyof typeof tabContent];

  return (
    <div className="flex h-[500px] bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Vertical Tabs */}
      <div className="w-64 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
        <div className="p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
            Settings
          </h4>
          <div className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-start space-x-3 p-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon className="w-5 h-5 mt-0.5" />
                  <div className="text-left">
                    <div className="font-medium">{tab.label}</div>
                    <div
                      className={`text-sm ${
                        isActive
                          ? "text-white/80"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {tab.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
          Vertical Tabs
        </h3>

        <div className="space-y-6">
          {/* Header */}
          <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {content.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your {activeTab.toLowerCase()} settings and preferences
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {content.sections.map((section, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  {section.title}
                </h4>
                <div className="space-y-3">
                  {section.fields.map((field, fieldIndex) => (
                    <div
                      key={fieldIndex}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-600 dark:text-gray-400">
                        {field}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full" />
                        <button className="text-sm text-primary hover:text-primary/80">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Reset Changes
            </button>
            <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
