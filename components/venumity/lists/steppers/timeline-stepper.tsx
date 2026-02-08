"use client";
import { useState } from "react";
import {
  Check,
  Clock,
  AlertCircle,
  Calendar,
  UserCheck,
  FileCheck,
  Settings,
  CheckCircle,
} from "lucide-react";

export default function StepperWithTimeline() {
  const [currentStep, setCurrentStep] = useState(3);

  const steps = [
    {
      id: 1,
      title: "Application Submitted",
      description: "Your application has been received",
      date: "Jan 15, 2024",
      time: "10:30 AM",
      status: "completed",
      icon: FileCheck,
    },
    {
      id: 2,
      title: "Initial Review",
      description: "Application is under review",
      date: "Jan 16, 2024",
      time: "2:15 PM",
      status: "completed",
      icon: UserCheck,
    },
    {
      id: 3,
      title: "Document Verification",
      description: "Verifying submitted documents",
      date: "Jan 17, 2024",
      time: "In Progress",
      status: "current",
      icon: Clock,
    },
    {
      id: 4,
      title: "Approval Process",
      description: "Awaiting final approval",
      date: "Jan 18, 2024",
      time: "Scheduled",
      status: "pending",
      icon: Settings,
    },
    {
      id: 5,
      title: "Completed",
      description: "Process completed successfully",
      date: "Jan 19, 2024",
      time: "Estimated",
      status: "pending",
      icon: CheckCircle,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="w-5 h-5 text-green-500" />;
      case "current":
        return <Clock className="w-5 h-5 text-blue-500 animate-pulse" />;
      case "pending":
        return <Calendar className="w-5 h-5 text-gray-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "current":
        return "bg-blue-500";
      case "pending":
        return "bg-gray-300 dark:bg-gray-600";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        Stepper with Timeline
      </h3>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex items-start">
              {/* Timeline Dot */}
              <div
                className={`relative z-10 shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                  step.status === "completed"
                    ? "bg-green-100 dark:bg-green-900/30"
                    : step.status === "current"
                    ? "bg-blue-100 dark:bg-blue-900/30"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                {getStatusIcon(step.status)}
                <div
                  className={`absolute -inset-1 rounded-full ${getStatusColor(
                    step.status
                  )} opacity-20`}
                />
              </div>

              {/* Content */}
              <div className="ml-6 flex-1">
                <div
                  className={`p-4 rounded-lg ${
                    step.status === "current"
                      ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                      : "bg-gray-50 dark:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {step.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {step.date}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          step.status === "completed"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                            : step.status === "current"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {step.time}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {step.description}
                  </p>

                  {step.status === "current" && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">
                          Progress
                        </span>
                        <span className="font-medium">65%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-300"
                          style={{ width: "65%" }}
                        />
                      </div>
                    </div>
                  )}

                  {step.status === "pending" && index === currentStep && (
                    <button className="mt-3 px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90">
                      Start Process
                    </button>
                  )}
                </div>

                {/* Connector Line (except for last item) */}
                {index < steps.length - 1 && (
                  <div
                    className={`h-6 w-0.5 ml-6 ${
                      steps[index + 1].status === "completed" ||
                      steps[index + 1].status === "current"
                        ? "bg-green-500"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              2
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Completed
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              1
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              In Progress
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
              2
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Pending
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className={`px-4 py-2 rounded-lg ${
            currentStep === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          Previous Step
        </button>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          Current:{" "}
          <span className="font-medium">
            {steps.find((s) => s.id === currentStep)?.title}
          </span>
        </div>

        <button
          onClick={() =>
            setCurrentStep(Math.min(steps.length, currentStep + 1))
          }
          disabled={currentStep === steps.length}
          className={`px-4 py-2 rounded-lg ${
            currentStep === steps.length
              ? "opacity-50 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary/90"
          }`}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
