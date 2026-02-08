"use client";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Phone,
  Mail,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Upload,
  Calendar,
  Tag,
  ProjectorIcon,
} from "lucide-react";
import { useState } from "react";

interface SupportRequest {
  id: number;
  type: "technical" | "billing" | "account" | "general";
  title: string;
  description: string;
  icon: React.ReactNode;
  estimatedTime: string;
  popular: boolean;
}

interface PriorityOption {
  id: number;
  level: "low" | "medium" | "high" | "critical";
  label: string;
  description: string;
  responseTime: string;
  color: string;
}

export default function SupportCard5() {
  const [selectedType, setSelectedType] = useState<string>("technical");
  const [priority, setPriority] = useState<string>("medium");
  const [requestTitle, setRequestTitle] = useState("");
  const [requestDescription, setRequestDescription] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [scheduledDate, setScheduledDate] = useState("");

  const supportRequests: SupportRequest[] = [
    {
      id: 1,
      type: "technical",
      title: "Technical Issue",
      description: "Report bugs, errors, or technical problems",
      icon: <MessageSquare size={24} />,
      estimatedTime: "2-4 hours",
      popular: true,
    },
    {
      id: 2,
      type: "billing",
      title: "Billing & Payment",
      description: "Invoices, payments, and subscription questions",
      icon: <Phone size={24} />,
      estimatedTime: "1-2 hours",
      popular: true,
    },
    {
      id: 3,
      type: "account",
      title: "Account & Access",
      description: "Login, security, and account management",
      icon: <Mail size={24} />,
      estimatedTime: "1-3 hours",
      popular: false,
    },
    {
      id: 4,
      type: "general",
      title: "General Inquiry",
      description: "General questions and information requests",
      icon: <Clock size={24} />,
      estimatedTime: "4-8 hours",
      popular: false,
    },
  ];

  const priorityOptions: PriorityOption[] = [
    {
      id: 1,
      level: "low",
      label: "Low Priority",
      description: "General questions, no immediate impact",
      responseTime: "24 hours",
      color:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    },
    {
      id: 2,
      level: "medium",
      label: "Medium Priority",
      description: "Minor issues affecting some functionality",
      responseTime: "8 hours",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      id: 3,
      level: "high",
      label: "High Priority",
      description: "Significant impact on productivity",
      responseTime: "2 hours",
      color:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    },
    {
      id: 4,
      level: "critical",
      label: "Critical",
      description: "System outage or security incident",
      responseTime: "15 minutes",
      color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    },
  ];

  const selectedRequest = supportRequests.find(
    (req) => req.type === selectedType
  );
  const selectedPriority = priorityOptions.find(
    (opt) => opt.level === priority
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setAttachments((prev) => [...prev, ...newFiles].slice(0, 5)); // Limit to 5 files
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!requestTitle.trim() || !requestDescription.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    const requestData = {
      type: selectedType,
      priority,
      title: requestTitle,
      description: requestDescription,
      attachments: attachments.length,
      scheduledDate: scheduledDate || "Immediate",
      estimatedResponse: selectedPriority?.responseTime,
    };

    alert(
      `Support request submitted!\n\nDetails:\nType: ${requestData.type}\nPriority: ${requestData.priority}\nTitle: ${requestData.title}\nResponse Time: ${requestData.estimatedResponse}`
    );

    // Reset form
    setRequestTitle("");
    setRequestDescription("");
    setAttachments([]);
    setScheduledDate("");
    setPriority("medium");
  };

  const [ticketId] = useState(() => `SR-${Date.now().toString().slice(-6)}`);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          {/* Header */}
          <div className="bg-linear-to-r from-purple-600 to-pink-600 p-8 text-white">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold mb-3">
                  Submit Support Request
                </h1>
                <p className="text-purple-100">
                  Quickly submit and track your support requests with our
                  interactive form
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-sm text-purple-200">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-sm text-purple-200">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Request Type */}
              <div className="lg:col-span-2">
                {/* Request Type Selection */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    1. Select Request Type
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {supportRequests.map((request) => (
                      <motion.button
                        key={request.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedType(request.type)}
                        className={`p-6 rounded-xl text-left transition-all ${
                          selectedType === request.type
                            ? "bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 ring-2 ring-purple-500"
                            : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-3 rounded-lg ${
                              selectedType === request.type
                                ? "bg-linear-to-r from-purple-500 to-pink-500 text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                            }`}
                          >
                            {request.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-bold text-gray-900 dark:text-white">
                                {request.title}
                              </h3>
                              {request.popular && (
                                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 text-xs rounded-full">
                                  Popular
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {request.description}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <Clock size={14} />
                              <span>
                                Avg. response: {request.estimatedTime}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Request Details */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    2. Request Details
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Request Title *
                      </label>
                      <input
                        type="text"
                        value={requestTitle}
                        onChange={(e) => setRequestTitle(e.target.value)}
                        placeholder="Brief description of your issue"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Detailed Description *
                      </label>
                      <textarea
                        value={requestDescription}
                        onChange={(e) => setRequestDescription(e.target.value)}
                        rows={6}
                        placeholder="Please provide as much detail as possible about your issue..."
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    {/* Attachments */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Attachments
                      </label>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 text-center">
                        <input
                          type="file"
                          id="file-upload"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <div className="flex flex-col items-center justify-center gap-3">
                            <Upload size={32} className="text-gray-400" />
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                Drop files here or click to upload
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Supports images, documents, and logs (Max 5
                                files, 10MB each)
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>

                      {/* Attachment List */}
                      {attachments.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {attachments.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded">
                                  <Tag
                                    size={16}
                                    className="text-gray-600 dark:text-gray-400"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                                    {file.name}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => removeAttachment(index)}
                                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Priority & Summary */}
              <div className="space-y-8">
                {/* Priority Selection */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    3. Set Priority
                  </h2>
                  <div className="space-y-4">
                    {priorityOptions.map((option) => (
                      <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setPriority(option.level)}
                        className={`w-full p-4 rounded-xl text-left transition-all ${
                          priority === option.level
                            ? "ring-2 ring-purple-500 shadow-lg"
                            : "hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <ProjectorIcon
                              size={20}
                              className={
                                option.level === "critical"
                                  ? "text-red-600"
                                  : option.level === "high"
                                  ? "text-orange-600"
                                  : option.level === "medium"
                                  ? "text-blue-600"
                                  : "text-green-600"
                              }
                            />
                            <span className="font-bold text-gray-900 dark:text-white">
                              {option.label}
                            </span>
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-medium ${option.color}`}
                          >
                            {option.responseTime}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {option.description}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Schedule */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    4. Schedule (Optional)
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <Calendar
                        size={20}
                        className="text-purple-600 dark:text-purple-400"
                      />
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Preferred Contact Time
                        </label>
                        <input
                          type="datetime-local"
                          value={scheduledDate}
                          onChange={(e) => setScheduledDate(e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                      <div className="flex items-start gap-3">
                        <AlertCircle
                          size={20}
                          className="text-yellow-600 dark:text-yellow-400"
                        />
                        <div className="text-sm text-yellow-800 dark:text-yellow-400">
                          Critical priority requests are handled immediately
                          regardless of schedule
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Request Summary */}
                <div className="bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Request Summary
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Type:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedRequest?.title}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Priority:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedPriority?.label}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Response Time:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedPriority?.responseTime}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Attachments:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {attachments.length} files
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Scheduled:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {scheduledDate ? "Yes" : "Immediate"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle
                        size={20}
                        className="text-green-600 dark:text-green-400"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Ticket will be created with ID: {ticketId}
                      </span>
                    </div>
                    <button
                      onClick={handleSubmit}
                      className="w-full py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                    >
                      Submit Support Request
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Info */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <Users
                  size={24}
                  className="text-purple-600 dark:text-purple-400"
                />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    50+ Support Agents
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Ready to help you
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <Clock
                  size={24}
                  className="text-purple-600 dark:text-purple-400"
                />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    24/7 Availability
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Support when you need it
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <MessageSquare
                  size={24}
                  className="text-purple-600 dark:text-purple-400"
                />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    Real-time Updates
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Track your request status
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
