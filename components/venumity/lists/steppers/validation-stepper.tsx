"use client";
import { useState } from "react";
import { Check, X, AlertCircle, ChevronRight } from "lucide-react";

export default function StepperWithValidation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    preferences: [] as string[],
    confirmed: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    {
      id: 1,
      label: "Personal Info",
      description: "Enter your details",
      fields: ["name", "email"],
      validate: () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Email is invalid";
        }
        return newErrors;
      },
    },
    {
      id: 2,
      label: "Preferences",
      description: "Select your options",
      fields: ["preferences"],
      validate: () => {
        const newErrors: Record<string, string> = {};
        if (formData.preferences.length === 0) {
          newErrors.preferences = "Select at least one preference";
        }
        return newErrors;
      },
    },
    {
      id: 3,
      label: "Confirmation",
      description: "Review and confirm",
      fields: ["confirmed"],
      validate: () => {
        const newErrors: Record<string, string> = {};
        if (!formData.confirmed) {
          newErrors.confirmed = "You must agree to continue";
        }
        return newErrors;
      },
    },
  ];

  const preferencesOptions = [
    "Email Notifications",
    "Weekly Reports",
    "Product Updates",
    "Marketing Communications",
  ];

  const validateCurrentStep = () => {
    const currentStepData = steps.find((s) => s.id === currentStep);
    if (!currentStepData) return false;

    const stepErrors = currentStepData.validate();
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const goToNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const goToPrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepId: number) => {
    const step = steps.find((s) => s.id === stepId);
    if (step && stepId <= currentStep) {
      setCurrentStep(stepId);
    }
  };

  const handleInputChange = (
    field: keyof typeof formData,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const togglePreference = (pref: string) => {
    const newPreferences = formData.preferences.includes(pref)
      ? formData.preferences.filter((p) => p !== pref)
      : [...formData.preferences, pref];
    handleInputChange("preferences", newPreferences);
  };

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "current";
    return "pending";
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                  errors.name
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <div className="flex items-center space-x-1 text-red-500 text-sm mt-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <div className="flex items-center space-x-1 text-red-500 text-sm mt-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select your preferences
            </label>
            <div className="space-y-2">
              {preferencesOptions.map((pref) => (
                <label
                  key={pref}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.preferences.includes(pref)}
                    onChange={() => togglePreference(pref)}
                    className="w-4 h-4 text-primary rounded"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    {pref}
                  </span>
                </label>
              ))}
            </div>
            {errors.preferences && (
              <div className="flex items-center space-x-1 text-red-500 text-sm mt-1">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.preferences}</span>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                Review Your Information
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Name:
                  </span>
                  <span className="font-medium">
                    {formData.name || "Not provided"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Email:
                  </span>
                  <span className="font-medium">
                    {formData.email || "Not provided"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Preferences:
                  </span>
                  <span className="font-medium">
                    {formData.preferences.length > 0
                      ? formData.preferences.join(", ")
                      : "None selected"}
                  </span>
                </div>
              </div>
            </div>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.confirmed}
                onChange={(e) =>
                  handleInputChange("confirmed", e.target.checked)
                }
                className="w-4 h-4 text-primary rounded"
              />
              <span className="text-gray-700 dark:text-gray-300">
                I confirm that all information provided is accurate
              </span>
            </label>
            {errors.confirmed && (
              <div className="flex items-center space-x-1 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.confirmed}</span>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        Stepper with Validation
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
            const status = getStepStatus(step.id);

            return (
              <div
                key={step.id}
                className="flex flex-col items-center relative z-10"
              >
                <button
                  onClick={() => goToStep(step.id)}
                  disabled={status === "pending"}
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                    status === "completed"
                      ? "bg-green-500 text-white"
                      : status === "current"
                      ? "bg-primary text-white scale-110"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                  } ${
                    status !== "pending"
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                >
                  {status === "completed" ? (
                    <Check className="w-5 h-5" />
                  ) : status === "current" ? (
                    step.id
                  ) : (
                    step.id
                  )}
                </button>
                <div className="text-center">
                  <div
                    className={`text-sm font-medium ${
                      status !== "pending"
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
        <div className="mb-4">
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
            Step {currentStep}: {steps.find((s) => s.id === currentStep)?.label}
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            {steps.find((s) => s.id === currentStep)?.description}
          </p>
        </div>

        {renderStepContent()}
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
          <span>Back</span>
        </button>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          {Object.keys(errors).length > 0 ? (
            <div className="flex items-center space-x-1 text-red-500">
              <X className="w-4 h-4" />
              <span>Please fix errors to continue</span>
            </div>
          ) : (
            `Step ${currentStep} of ${steps.length}`
          )}
        </div>

        <button
          onClick={goToNext}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            currentStep === steps.length
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-primary text-white hover:bg-primary/90"
          }`}
        >
          <span>{currentStep === steps.length ? "Complete" : "Next"}</span>
          {currentStep < steps.length && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
