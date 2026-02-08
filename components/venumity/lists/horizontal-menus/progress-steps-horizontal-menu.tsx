"use client";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  User,
  CreditCard,
  Settings,
} from "lucide-react";

export default function HorizontalMenuWithProgressSteps() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, label: "Account", icon: User, completed: true },
    { id: 2, label: "Profile", icon: User, completed: true },
    { id: 3, label: "Billing", icon: CreditCard, completed: false },
    { id: 4, label: "Preferences", icon: Settings, completed: false },
    { id: 5, label: "Confirmation", icon: CheckCircle, completed: false },
  ];

  const goToNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepId: number) => {
    const step = steps.find((s) => s.id === stepId);
    if (step && step.completed) {
      setCurrentStep(stepId);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        Horizontal Menu with Progress Steps
      </h3>

      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
          <div
            className="h-1 bg-primary transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        <div className="flex justify-between">
          {steps.map((step) => {
            const isCurrent = step.id === currentStep;
            const isCompleted = step.completed;
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center relative z-10"
              >
                <button
                  onClick={() => goToStep(step.id)}
                  disabled={!isCompleted && step.id !== currentStep}
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                    isCurrent
                      ? "bg-primary text-white scale-110"
                      : isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                  } ${isCompleted ? "cursor-pointer" : "cursor-not-allowed"}`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </button>
                <span
                  className={`text-sm font-medium ${
                    isCurrent
                      ? "text-primary"
                      : isCompleted
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-center">
          <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Step {currentStep}: {steps.find((s) => s.id === currentStep)?.label}
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            Complete this step to continue to the next one.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={goToPrev}
          disabled={currentStep === 1}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            currentStep === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Step {currentStep} of {steps.length}
          </span>
          <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <button
          onClick={goToNext}
          disabled={currentStep === steps.length}
          className={`flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg ${
            currentStep === steps.length
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-primary/90"
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
