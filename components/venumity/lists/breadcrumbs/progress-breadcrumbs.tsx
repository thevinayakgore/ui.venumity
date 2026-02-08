"use client";
import React from "react";
import { CheckCircle, Circle } from "lucide-react";

export default function BreadcrumbsWithProgress() {
  const steps = [
    { id: 1, label: "Cart", completed: true },
    { id: 2, label: "Shipping", completed: true },
    { id: 3, label: "Payment", completed: true },
    { id: 4, label: "Review", completed: false },
    { id: 5, label: "Confirmation", completed: false },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Breadcrumbs with Progress
      </h3>
      <nav className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  step.completed
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                }`}
              >
                {step.completed ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </div>
              <span
                className={`text-sm ${
                  step.completed
                    ? "text-primary font-medium"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 ${
                  steps[index + 1].completed
                    ? "bg-primary"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}
