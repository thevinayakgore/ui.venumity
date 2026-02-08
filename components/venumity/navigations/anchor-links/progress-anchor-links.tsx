"use client";
import { useState } from "react";

export default function ProgressAnchorLinks() {
  const [progress, setProgress] = useState(0);

  const steps = [
    { id: "personal", label: "Personal Info" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "review", label: "Review" },
  ];

  const calculateProgress = (stepIndex: number) => {
    return Math.min(100, ((stepIndex + 1) / steps.length) * 100);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Application Progress
      </h2>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            <button
              onClick={() => setProgress(calculateProgress(index))}
              className={`flex items-center w-full px-4 py-3 rounded-lg border transition-all ${
                progress >= calculateProgress(index)
                  ? "border-primary bg-primary/5 dark:bg-primary/10"
                  : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  progress >= calculateProgress(index)
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`font-medium ${
                  progress >= calculateProgress(index)
                    ? "text-primary dark:text-primary"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {step.label}
              </span>
              {progress >= calculateProgress(index) && (
                <svg
                  className="ml-auto w-5 h-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
            {index < steps.length - 1 && (
              <div className="absolute left-4 top-full w-0.5 h-4 bg-gray-200 dark:bg-gray-700" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
