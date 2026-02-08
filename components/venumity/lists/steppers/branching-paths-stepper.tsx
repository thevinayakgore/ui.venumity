"use client";
import { useState } from "react";
import {
  Check,
  ChevronRight,
  Building,
  User,
  FileText,
  CreditCard,
  Shield,
} from "lucide-react";

type StepType = "personal" | "business" | "enterprise";

export default function StepperWithBranchingPaths() {
  const [accountType, setAccountType] = useState<StepType | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [path, setPath] = useState<StepType | null>(null);

  const baseSteps = [
    {
      id: 1,
      label: "Account Type",
      description: "Choose your account type",
      icon: User,
    },
  ];

  const personalSteps = [
    {
      id: 2,
      label: "Personal Info",
      description: "Enter personal details",
      icon: User,
    },
    {
      id: 3,
      label: "Documents",
      description: "Upload documents",
      icon: FileText,
    },
    { id: 4, label: "Security", description: "Set up security", icon: Shield },
  ];

  const businessSteps = [
    {
      id: 2,
      label: "Business Info",
      description: "Company details",
      icon: Building,
    },
    {
      id: 3,
      label: "Documents",
      description: "Legal documents",
      icon: FileText,
    },
    { id: 4, label: "Billing", description: "Payment setup", icon: CreditCard },
    { id: 5, label: "Team", description: "Add team members", icon: User },
  ];

  const enterpriseSteps = [
    {
      id: 2,
      label: "Enterprise Info",
      description: "Organization details",
      icon: Building,
    },
    {
      id: 3,
      label: "Legal",
      description: "Legal documentation",
      icon: FileText,
    },
    {
      id: 4,
      label: "Billing",
      description: "Enterprise billing",
      icon: CreditCard,
    },
    {
      id: 5,
      label: "Security",
      description: "Advanced security",
      icon: Shield,
    },
    { id: 6, label: "Support", description: "Dedicated support", icon: User },
  ];

  const accountTypes = [
    {
      id: "personal",
      title: "Personal",
      description: "For individual use",
      icon: User,
      steps: personalSteps,
      features: ["Basic features", "1 user", "5GB storage"],
    },
    {
      id: "business",
      title: "Business",
      description: "For small teams",
      icon: Building,
      steps: businessSteps,
      features: ["Advanced features", "Up to 10 users", "100GB storage"],
    },
    {
      id: "enterprise",
      title: "Enterprise",
      description: "For large organizations",
      icon: Building,
      steps: enterpriseSteps,
      features: [
        "All features",
        "Unlimited users",
        "1TB storage",
        "24/7 support",
      ],
    },
  ];

  const getCurrentSteps = () => {
    if (!path) return baseSteps;

    const selectedType = accountTypes.find((type) => type.id === path);
    return [...baseSteps, ...(selectedType?.steps || [])];
  };

  const totalSteps = getCurrentSteps().length;

  const handleAccountTypeSelect = (type: StepType) => {
    setAccountType(type);
    setPath(type);
    setCurrentStep(2);
  };

  const goToNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrev = () => {
    if (currentStep > 1) {
      if (currentStep === 2) {
        setAccountType(null);
        setPath(null);
        setCurrentStep(1);
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Choose Account Type
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Select the type of account that best fits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {accountTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = accountType === type.id;

              return (
                <button
                  key={type.id}
                  onClick={() => handleAccountTypeSelect(type.id as StepType)}
                  className={`p-6 rounded-lg border-2 transition-all text-left ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div
                      className={`p-3 rounded-lg ${
                        isSelected
                          ? "bg-primary text-white"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {type.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {type.description}
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2 text-sm">
                    {type.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    const currentStepData = getCurrentSteps()[currentStep - 1];
    const selectedType = accountTypes.find((type) => type.id === path);

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
            {currentStepData.icon ? (
              <currentStepData.icon className="w-8 h-8 text-primary" />
            ) : (
              <User className="w-8 h-8 text-primary" />
            )}
          </div>
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {currentStepData.label}
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            {currentStepData.description}
          </p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p>
              <span className="font-medium">Account Type:</span>{" "}
              <span className="text-primary capitalize">{path}</span>
            </p>
            <p>
              <span className="font-medium">Current Step:</span>{" "}
              {currentStepData.label}
            </p>
            <p>
              <span className="font-medium">Total Steps in Path:</span>{" "}
              {selectedType?.steps.length || 0} + 1 (account type)
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        Stepper with Branching Paths
      </h3>

      {/* Path Indicator */}
      {path && (
        <div className="mb-6 p-4 bg-primary/10 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center">
                {(() => {
                  const Icon = accountTypes.find((t) => t.id === path)?.icon;
                  return Icon ? <Icon className="w-5 h-5" /> : null;
                })()}
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white capitalize">
                  {path} Account Path
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {getCurrentSteps().length} steps total
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setAccountType(null);
                setPath(null);
                setCurrentStep(1);
              }}
              className="text-sm text-primary hover:text-primary/80"
            >
              Change Path
            </button>
          </div>
        </div>
      )}

      {/* Stepper */}
      <div className="relative mb-8">
        <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
          <div
            className="h-1 bg-primary transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            }}
          />
        </div>

        <div className="flex justify-between">
          {getCurrentSteps().map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center relative z-10"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                    isCompleted
                      ? "bg-primary text-white"
                      : isCurrent
                      ? "bg-primary text-white scale-110 ring-4 ring-primary/20"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.id}
                </div>
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
          Step {currentStep} of {totalSteps}
          {path && ` • ${path.charAt(0).toUpperCase() + path.slice(1)} Path`}
        </div>

        <button
          onClick={goToNext}
          disabled={currentStep === totalSteps}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            currentStep === totalSteps
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-primary text-white hover:bg-primary/90"
          }`}
        >
          <span>
            {currentStep === totalSteps ? "Complete Setup" : "Continue"}
          </span>
          {currentStep < totalSteps && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
