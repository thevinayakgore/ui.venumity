"use client";
import { useState } from "react";

export default function ProgressStepper() {
  const [currentStep, setCurrentStep] = useState(2);
  const [progress, setProgress] = useState(50);

  const steps = [
    { id: 1, label: "Setup", progress: 25 },
    { id: 2, label: "Configuration", progress: 50 },
    { id: 3, label: "Testing", progress: 75 },
    { id: 4, label: "Deployment", progress: 100 },
  ];

  const advanceStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
      setProgress(steps[currentStep].progress);
    }
  };

  const retreatStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setProgress(steps[currentStep - 2].progress);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Installation Progress
          </h2>
          <span className="text-lg font-bold text-primary">{progress}%</span>
        </div>

        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {steps.map((step) => (
          <div
            key={step.id}
            onClick={() => {
              setCurrentStep(step.id);
              setProgress(step.progress);
            }}
            className={`text-center p-4 rounded-lg cursor-pointer transition-all ${
              currentStep >= step.id
                ? "bg-primary/10 text-primary"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            }`}
          >
            <div
              className={`text-2xl mb-2 ${
                currentStep > step.id ? "text-green-500" : ""
              }`}
            >
              {currentStep > step.id ? "✓" : step.id}
            </div>
            <div className="font-medium">{step.label}</div>
            <div className="text-sm mt-1">{step.progress}%</div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Step {currentStep}: {steps.find((s) => s.id === currentStep)?.label}
        </h3>

        <div className="space-y-4">
          {currentStep === 1 && (
            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border">
              <p className="text-gray-600 dark:text-gray-400">
                Initial setup and configuration of your environment.
              </p>
            </div>
          )}
          {currentStep === 2 && (
            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border">
              <p className="text-gray-600 dark:text-gray-400">
                Configure settings and preferences for your installation.
              </p>
            </div>
          )}
          {currentStep === 3 && (
            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border">
              <p className="text-gray-600 dark:text-gray-400">
                Testing the configuration and ensuring everything works
                properly.
              </p>
            </div>
          )}
          {currentStep === 4 && (
            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border">
              <p className="text-gray-600 dark:text-gray-400">
                Final deployment and launch of your installation.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={retreatStep}
            disabled={currentStep === 1}
            className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            Previous Step
          </button>
          <button
            onClick={advanceStep}
            disabled={currentStep === steps.length}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
          >
            {currentStep === steps.length ? "Complete" : "Next Step"}
          </button>
        </div>
      </div>
    </div>
  );
}
