"use client";
import React, { useState } from "react";

export default function BasicStepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const steps = [
    { id: 1, label: "Account", description: "Create your account" },
    { id: 2, label: "Profile", description: "Add profile information" },
    { id: 3, label: "Preferences", description: "Set your preferences" },
    { id: 4, label: "Confirmation", description: "Confirm and complete" },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center relative z-10">
              <button
                onClick={() => setCurrentStep(step.id)}
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 border-2 transition-all ${
                  currentStep >= step.id
                    ? "bg-primary border-primary text-white"
                    : "border-gray-300 dark:border-gray-700 text-gray-500"
                }`}
              >
                {currentStep > step.id ? "✓" : step.id}
              </button>
              <div className="text-center">
                <div
                  className={`font-medium text-sm ${
                    currentStep >= step.id
                      ? "text-primary dark:text-primary"
                      : "text-gray-500 dark:text-gray-500"
                  }`}
                >
                  {step.label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {step.description}
                </div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-4">
                <div
                  className={`h-full rounded-full transition-all ${
                    currentStep > step.id
                      ? "bg-primary"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Step {currentStep}: {steps.find((s) => s.id === currentStep)?.label}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {steps.find((s) => s.id === currentStep)?.description}
        </p>

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => {
              if (currentStep < totalSteps) {
                setCurrentStep((prev) => prev + 1);
              } else {
                alert("Process completed!");
              }
            }}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            {currentStep === totalSteps ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
