"use client";
import React, { useState } from "react";

export default function InteractiveStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    plan: "",
    payment: "",
  });

  const steps = [
    {
      title: "Personal Info",
      fields: ["name", "email"],
    },
    {
      title: "Select Plan",
      fields: ["plan"],
    },
    {
      title: "Payment",
      fields: ["payment"],
    },
    {
      title: "Confirmation",
      fields: [],
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    alert("Form submitted successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.title}>
            <div className="flex flex-col items-center">
              <button
                onClick={() => setCurrentStep(index)}
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  index === currentStep
                    ? "bg-primary text-white"
                    : index < currentStep
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-500"
                }`}
              >
                {index < currentStep ? "✓" : index + 1}
              </button>
              <span
                className={`text-sm font-medium ${
                  index === currentStep
                    ? "text-primary"
                    : index < currentStep
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-500 dark:text-gray-500"
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-4">
                <div
                  className={`h-full rounded-full ${
                    index < currentStep
                      ? "bg-green-500"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
          {steps[currentStep].title}
        </h2>

        {currentStep === 0 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Basic", "Pro", "Enterprise"].map((plan) => (
              <button
                key={plan}
                onClick={() => setFormData({ ...formData, plan })}
                className={`p-4 border rounded-lg text-center transition-all ${
                  formData.plan === plan
                    ? "border-primary bg-primary/10"
                    : "border-gray-300 dark:border-gray-700 hover:border-primary"
                }`}
              >
                <div className="font-semibold text-gray-800 dark:text-gray-200">
                  {plan}
                </div>
                <div className="text-2xl font-bold mt-2">
                  ${plan === "Basic" ? "9" : plan === "Pro" ? "29" : "99"}
                  <span className="text-sm text-gray-500">/mo</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            {["Credit Card", "PayPal", "Bank Transfer"].map((method) => (
              <button
                key={method}
                onClick={() => setFormData({ ...formData, payment: method })}
                className={`flex items-center justify-between w-full p-4 border rounded-lg ${
                  formData.payment === method
                    ? "border-primary bg-primary/10"
                    : "border-gray-300 dark:border-gray-700 hover:border-primary"
                }`}
              >
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {method}
                </span>
                <span className="text-xl">
                  {method === "Credit Card"
                    ? "💳"
                    : method === "PayPal"
                    ? "📱"
                    : "🏦"}
                </span>
              </button>
            ))}
          </div>
        )}

        {currentStep === 3 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
              ✓
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              All Set!
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your account has been created successfully.
            </p>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            Previous
          </button>

          <button
            onClick={
              currentStep === steps.length - 1 ? handleSubmit : handleNext
            }
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            {currentStep === steps.length - 1 ? "Complete Setup" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
