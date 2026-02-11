"use client";
import { useState } from "react";
import {
  ShoppingCart,
  CreditCard,
  CheckCircle,
  Package,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Step = "cart" | "shipping" | "payment" | "review";

export default function CheckoutForm1_2() {
  const [currentStep, setCurrentStep] = useState<Step>("cart");
  const [formData, setFormData] = useState({
    shipping: {
      name: "",
      address: "",
      city: "",
      zipCode: "",
    },
    payment: {
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
  });

  const steps: Array<{ id: Step; label: string; icon: React.ReactNode }> = [
    { id: "cart", label: "Cart", icon: <ShoppingCart className="w-5 h-5" /> },
    {
      id: "shipping",
      label: "Shipping",
      icon: <Package className="w-5 h-5" />,
    },
    {
      id: "payment",
      label: "Payment",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: "review",
      label: "Review",
      icon: <CheckCircle className="w-5 h-5" />,
    },
  ];

  const handleNext = () => {
    const stepOrder: Step[] = ["cart", "shipping", "payment", "review"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const stepOrder: Step[] = ["cart", "shipping", "payment", "review"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case "cart":
        return (
          <motion.div
            key="cart"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Shopping Cart
            </h3>
            <div className="space-y-4">
              {[
                { name: "Premium Headphones", price: 199.99, quantity: 1 },
                { name: "Phone Case", price: 29.99, quantity: 2 },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span className="text-blue-600 dark:text-blue-400">
                  $259.97
                </span>
              </div>
            </div>
          </motion.div>
        );

      case "shipping":
        return (
          <motion.div
            key="shipping"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Shipping Information
            </h3>
            <div className="grid gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                value={formData.shipping.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shipping: { ...formData.shipping, name: e.target.value },
                  })
                }
              />
              <input
                type="text"
                placeholder="Address"
                className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                value={formData.shipping.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shipping: { ...formData.shipping, address: e.target.value },
                  })
                }
              />
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  value={formData.shipping.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shipping: { ...formData.shipping, city: e.target.value },
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="ZIP Code"
                  className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  value={formData.shipping.zipCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shipping: {
                        ...formData.shipping,
                        zipCode: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </motion.div>
        );

      case "payment":
        return (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Payment Details
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                value={formData.payment.cardNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    payment: {
                      ...formData.payment,
                      cardNumber: e.target.value,
                    },
                  })
                }
              />
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  value={formData.payment.expiry}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      payment: { ...formData.payment, expiry: e.target.value },
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  value={formData.payment.cvv}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      payment: { ...formData.payment, cvv: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </motion.div>
        );

      case "review":
        return (
          <motion.div
            key="review"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Order Summary
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Shipping Details
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {formData.shipping.name || "John Doe"}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {formData.shipping.address || "123 Main St"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Payment Method
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  **** **** ****{" "}
                  {formData.payment.cardNumber.slice(-4) || "1234"}
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-green-700 dark:text-green-400 font-medium">
                  Ready to complete your order
                </p>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8 max-w-3xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    steps.findIndex((s) => s.id === currentStep) >= index
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-800 text-gray-500"
                  }`}
                >
                  {step.icon}
                </div>
                <span className="ml-2 text-sm font-medium hidden md:inline">
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div className="w-16 h-0.5 mx-4 bg-gray-300 dark:bg-gray-700" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === "cart"}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
              currentStep === "cart"
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>

          {currentStep === "review" ? (
            <button
              onClick={() => console.log("Order placed")}
              className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
            >
              Place Order
              <CheckCircle className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
