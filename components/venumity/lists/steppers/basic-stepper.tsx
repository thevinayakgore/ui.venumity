"use client";
import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";

export default function BasicStepper() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, label: "Account Setup", description: "Create your account" },
    {
      id: 2,
      label: "Profile Information",
      description: "Add personal details",
    },
    { id: 3, label: "Preferences", description: "Set your preferences" },
    { id: 4, label: "Confirmation", description: "Review and confirm" },
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
    const currentStepIndex = steps.findIndex((s) => s.id === currentStep);
    if (step && stepId <= currentStepIndex + 1) {
      setCurrentStep(stepId);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        Basic Stepper
      </h3>

      {/* Stepper Header */}
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
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center relative z-10"
              >
                <button
                  onClick={() => goToStep(step.id)}
                  disabled={step.id > currentStep}
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                    isCompleted
                      ? "bg-primary text-white"
                      : isCurrent
                      ? "bg-primary text-white scale-110"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                  } ${
                    step.id <= currentStep
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.id}
                </button>
                <div className="text-center">
                  <div
                    className={`text-sm font-medium ${
                      isCurrent || isCompleted
                        ? "text-primary"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {step.description}
                  </div>
                </div>
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
            This is the content for{" "}
            {steps.find((s) => s.id === currentStep)?.description}. Complete
            this step to proceed to the next one.
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
          <ChevronRight className="w-4 h-4 rotate-180" />
          <span>Previous</span>
        </button>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Step {currentStep} of {steps.length}
        </div>

        <button
          onClick={goToNext}
          disabled={currentStep === steps.length}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            currentStep === steps.length
              ? "bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary/90"
          }`}
        >
          <span>{currentStep === steps.length ? "Finish" : "Next"}</span>
          {currentStep < steps.length && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
