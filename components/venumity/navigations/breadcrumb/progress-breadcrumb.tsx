"use client";
import React from "react";

export default function ProgressBreadcrumb() {
  const steps = [
    { label: "Cart", completed: true },
    { label: "Information", completed: true },
    { label: "Shipping", completed: true },
    { label: "Payment", current: true },
    { label: "Review", completed: false },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Checkout Progress
      </h2>
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center z-10">
              <div
                className={`
                w-10 h-10 rounded-full flex items-center justify-center mb-2
                ${
                  step.current
                    ? "bg-primary text-white"
                    : step.completed
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }
              `}
              >
                {step.completed ? "✓" : index + 1}
              </div>
              <span
                className={`text-sm font-medium ${
                  step.current
                    ? "text-primary dark:text-primary"
                    : step.completed
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-4">
                <div
                  className={`h-full rounded-full ${
                    step.completed
                      ? "bg-green-500"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
