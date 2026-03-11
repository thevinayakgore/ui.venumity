"use client";
import { useState, useEffect } from "react";
import { Check } from "lucide-react";

const plans = [
  {
    id: "mvp",
    name: "MVP Stage",
    description: "Great for new creators testing early concepts.",
    price: "0",
    buttonText: "Start for free",
    buttonVariant: "outline",
    isHighlighted: false,
    features: [
      "Core tools to begin quick testing",
      "Create short 15‑second videos",
      "Up to ten scenes every month",
      "Exports with light watermark",
      "Access to starter AI prompts",
    ],
  },
  {
    id: "growth",
    name: "Growth Stage",
    description: "For active creators prepared to expand their output.",
    price: "29",
    buttonText: "Current Plan",
    buttonVariant: "outline",
    isHighlighted: true,
    features: [
      "Includes all MVP Stage tools",
      "Unlimited generation of 3D scenes",
      "Access to premium asset library",
      "Animations lasting up to 30 sec",
      "Advanced video AI models (20+)",
    ],
  },
  {
    id: "scale",
    name: "Scale Stage",
    description: "For teams and studios speeding up their production.",
    price: "59",
    buttonText: "Get Studio",
    buttonVariant: "solid",
    isHighlighted: false,
    features: [
      "Includes all Growth Stage tools",
      "Unlimited generation of 3D scenes",
      "Complete premium asset library",
      "Animations lasting up to 60 sec",
      "Unlimited access to video AI models",
    ],
  },
];

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const start = display;
    const end = value;
    const duration = 200;
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const current = Math.floor(start + (end - start) * progress);
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [value, display]);

  return <>{display}</>;
}

export default function PricingTable2() {
  const [isYearly, setIsYearly] = useState(false);

  const getDisplayPrice = (price: string) => {
    const monthly = Number(price);
    if (monthly === 0) return 0;
    return isYearly ? monthly * 8 : monthly;
  };

  return (
    <div className="flex flex-col items-center justify-center m-auto py-20 px-4 overflow-hidden w-full max-h-screen">
      {/* Background Ambience Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-150 h-150 bg-indigo-500 rounded-full blur-[100px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-125 h-125 bg-blue-500 rounded-full blur-[100px] opacity-70 pointer-events-none" />

      {/* Header Section */}
      <div className="text-center mb-6 flex flex-col items-center">
        <h1 className="text-5xl font-medium tracking-tight mb-8">
          Pick your plan
        </h1>

        {/* Toggle Switch */}
        <div className="inline-flex items-center p-1.5 bg-foreground/10 backdrop-blur-sm border-2 rounded-full shadow-sm mb-4">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-6 py-2.5 cursor-pointer rounded-full text-sm font-semibold transition-all ${!isYearly ? "bg-linear-to-br from-[#8A95FF] via-[#7B8BFF] to-[#B3B8FF] text-white" : "text-foreground/70"}`}
          >
            Pay monthly
          </button>

          <button
            onClick={() => setIsYearly(true)}
            className={`px-6 py-2.5 cursor-pointer rounded-full text-sm font-semibold transition-all ${isYearly ? "bg-linear-to-br from-[#8A95FF] via-[#7B8BFF] to-[#B3B8FF] text-white" : "text-foreground/70"}`}
          >
            Pay yearly
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl m-auto w-full">
        {plans.map((plan) => (
          <div key={plan.id} className="flex">
            {plan.isHighlighted ? (
              // Highlighted Card (Growth Stage)
              <div className="relative w-full rounded-3xl p-0.75 pt-14 bg-linear-to-br from-[#8A95FF] via-[#7B8BFF] to-[#B3B8FF] shadow-2xl shadow-indigo-500/40 flex flex-col transition-transform hover:-translate-y-1 duration-300">
                {/* Simulated inner texture for gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent rounded-4xl pointer-events-none" />

                <h3 className="absolute top-5 left-6 text-white font-semibold text-[17px] tracking-tight">
                  {plan.name}
                </h3>

                <div className="bg-card rounded-3xl p-6 flex-1 flex flex-col relative z-10">
                  <p className="text-[13px] text-muted-foreground leading-relaxed h-10 pr-4">
                    {plan.description}
                  </p>

                  {/* Price Box */}
                  <div className="bg-accent border-2 rounded-2xl p-4 mb-6">
                    <div className="flex items-start mb-5 pl-2">
                      <span className="text-sm font-medium text-muted-foreground mt-2.5 mr-1">
                        $
                      </span>
                      <span className="text-[54px] font-bold leading-none tracking-tighter">
                        <AnimatedNumber value={getDisplayPrice(plan.price)} />
                      </span>
                      <div className="flex flex-col text-[9px] font-bold text-muted-foreground uppercase leading-[1.2] ml-2 mt-3">
                        <span>USD /</span>
                        <span>{isYearly ? "year" : "month"}</span>
                      </div>
                    </div>
                    <button className="w-full py-3.5 cursor-pointer rounded-lg bg-linear-to-br from-[#8A95FF] via-[#7B8BFF] to-[#B3B8FF] text-white text-sm font-semibold">
                      {plan.buttonText}
                    </button>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3.5 mt-2">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-[13px] font-medium"
                      >
                        <div className="mt-0.75 rounded-full bg-indigo-500 p-0.75 shrink-0">
                          <Check
                            size={10}
                            className="text-white"
                            strokeWidth={3.5}
                          />
                        </div>
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              // Standard Cards (MVP Stage, Scale Stage)
              <div className="w-full bg-card rounded-3xl p-6 border-4 shadow-xl/20 flex flex-col transition-transform hover:-translate-y-1 duration-300">
                <h3 className="font-semibold text-[17px] tracking-tight mb-4">
                  {plan.name}
                </h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed h-10 pr-4">
                  {plan.description}
                </p>

                {/* Price Box */}
                <div className="bg-accent border rounded-2xl p-4 mb-6">
                  <div className="flex items-start mb-5 pl-2">
                    <span className="text-sm font-medium text-muted-foreground mt-2.5 mr-1">
                      $
                    </span>
                    <span className="text-[54px] font-bold leading-none tracking-tighter">
                      <AnimatedNumber value={getDisplayPrice(plan.price)} />
                    </span>
                    <div className="flex flex-col text-[9px] font-bold text-muted-foreground uppercase leading-[1.2] ml-2 mt-3">
                      <span>USD /</span>
                      <span>{isYearly ? "year" : "month"}</span>
                    </div>
                  </div>
                  <button className="w-full py-3.5 cursor-pointer rounded-lg text-sm font-semibold bg-foreground text-secondary">
                    {plan.buttonText}
                  </button>
                </div>

                {/* Features List */}
                <ul className="space-y-3.5 mt-2">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-[13px] font-medium"
                    >
                      <div className="mt-0.75 rounded-full bg-indigo-500 p-0.75 shrink-0">
                        <Check
                          size={10}
                          className="text-white"
                          strokeWidth={3.5}
                        />
                      </div>
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
