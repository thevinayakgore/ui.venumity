"use client";

export default function VerticalStepper() {
  const steps = [
    {
      id: 1,
      title: "Order Placed",
      description: "Your order has been placed successfully",
      date: "Jan 15, 2024",
      completed: true,
    },
    {
      id: 2,
      title: "Processing",
      description: "Your order is being processed",
      date: "Jan 16, 2024",
      completed: true,
    },
    {
      id: 3,
      title: "Shipped",
      description: "Your order has been shipped",
      date: "Jan 18, 2024",
      current: true,
    },
    {
      id: 4,
      title: "Out for Delivery",
      description: "Your order is out for delivery",
      date: "Expected Jan 19, 2024",
      upcoming: true,
    },
    {
      id: 5,
      title: "Delivered",
      description: "Your order has been delivered",
      date: "Expected Jan 20, 2024",
      upcoming: true,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="relative">
        {steps.map((step, index) => (
          <div key={step.id} className="flex mb-8 last:mb-0">
            <div className="flex flex-col items-center mr-4">
              <div
                className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${step.completed ? "bg-green-500 text-white" : ""}
                ${step.current ? "bg-primary text-white" : ""}
                ${
                  step.upcoming
                    ? "bg-gray-200 dark:bg-gray-800 text-gray-500"
                    : ""
                }
              `}
              >
                {step.completed ? "✓" : step.id}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`
                  flex-1 w-0.5 mt-2
                  ${
                    step.completed
                      ? "bg-green-500"
                      : "bg-gray-200 dark:bg-gray-800"
                  }
                `}
                />
              )}
            </div>

            <div className="flex-1 pb-8">
              <div className="flex items-center justify-between mb-1">
                <h3
                  className={`font-semibold ${
                    step.completed || step.current
                      ? "text-gray-800 dark:text-gray-200"
                      : "text-gray-500 dark:text-gray-500"
                  }`}
                >
                  {step.title}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  {step.date}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
              {step.current && (
                <button className="mt-3 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 text-sm">
                  Track Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
