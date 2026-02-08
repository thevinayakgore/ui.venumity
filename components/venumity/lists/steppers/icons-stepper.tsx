"use client";
import { useState } from "react";
import {
  User,
  FileText,
  Check,
  Shield,
  CreditCard,
  Building,
  CheckCircle,
} from "lucide-react";

export default function StepperWithIcons() {
  const [currentStep, setCurrentStep] = useState(2);

  const steps = [
    {
      id: 1,
      label: "Account",
      description: "Create account",
      icon: User,
      completed: true,
    },
    {
      id: 2,
      label: "Profile",
      description: "Add details",
      icon: FileText,
      completed: false,
    },
    {
      id: 3,
      label: "Business",
      description: "Company info",
      icon: Building,
      completed: false,
    },
    {
      id: 4,
      label: "Billing",
      description: "Payment setup",
      icon: CreditCard,
      completed: false,
    },
    {
      id: 5,
      label: "Security",
      description: "Set up security",
      icon: Shield,
      completed: false,
    },
    {
      id: 6,
      label: "Complete",
      description: "Finish setup",
      icon: CheckCircle,
      completed: false,
    },
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
        Stepper with Icons
      </h3>

      {/* Stepper */}
      <div className="relative mb-8">
        <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
          <div
            className="h-1 bg-primary transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        <div className="flex justify-between">
          {steps.map((step) => {
            const Icon = step.icon;
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center relative z-10"
              >
                <button
                  onClick={() => goToStep(step.id)}
                  disabled={!isCompleted && step.id !== currentStep}
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isCurrent
                      ? "bg-primary text-white scale-110 ring-4 ring-primary/20"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                  } ${isCompleted ? "cursor-pointer" : "cursor-not-allowed"}`}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                </button>
                <div className="text-center max-w-24">
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
          <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
            {(() => {
              const Icon = steps.find((s) => s.id === currentStep)?.icon;
              return Icon ? <Icon className="w-8 h-8 text-primary" /> : null;
            })()}
          </div>
          <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Step {currentStep}: {steps.find((s) => s.id === currentStep)?.label}
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            Complete the{" "}
            {steps.find((s) => s.id === currentStep)?.description.toLowerCase()}{" "}
            step to proceed.
            {currentStep === 1 && " Enter your account information."}
            {currentStep === 2 && " Fill in your personal details."}
            {currentStep === 3 && " Add your business information."}
            {currentStep === 4 && " Set up your payment method."}
            {currentStep === 5 && " Configure security settings."}
            {currentStep === 6 && " Review and complete the setup."}
          </p>
        </div>
      </div>

      {/* Progress & Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={goToPrev}
            disabled={currentStep === 1}
            className={`px-4 py-2 rounded-lg ${
              currentStep === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            Previous
          </button>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            {currentStep > 1 &&
              `${currentStep - 1}/${steps.length - 1} completed`}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Step {currentStep} of {steps.length}
          </div>

          <button
            onClick={goToNext}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            {currentStep === steps.length ? "Finish Setup" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
