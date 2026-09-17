"use client";
import { useState, useEffect } from "react";
import { Check } from "lucide-react";

const PLANS_DATA = [
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

export default function SimplePricingTable() {
  const [isYearly, setIsYearly] = useState(false);

  const getDisplayPrice = (price: string) => {
    const monthly = Number(price);
    if (monthly === 0) return 0;
    return isYearly ? monthly * 8 : monthly;
  };

  return (
    <div className="p-5 md:p-10 space-y-5 md:space-y-10 w-full">
      {/* Header Section */}
      <header className="text-center flex flex-col items-center gap-5">
        <h1 className="text-4xl font-semibold tracking-tight">
          Pick your plan
        </h1>

        {/* Toggle Switch */}
        <div className="inline-flex items-center p-1 bg-foreground/5 backdrop-blur-sm border rounded-full">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-6 py-2.5 cursor-pointer rounded-full text-sm font-semibold transition-all ${!isYearly ? "bg-linear-to-br from-indigo-300 via-indigo-400 to-indigo-500 text-white" : "text-foreground/70"}`}
          >
            Monthly
          </button>

          <button
            onClick={() => setIsYearly(true)}
            className={`px-6 py-2.5 cursor-pointer rounded-full text-sm font-semibold transition-all ${isYearly ? "bg-linear-to-br from-indigo-300 via-indigo-400 to-indigo-500 text-white" : "text-foreground/70"}`}
          >
            Annualy
          </button>
        </div>
      </header>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full h-fit">
        {PLANS_DATA.map((plan) => (
          <div key={plan.id} className="flex">
            {plan.isHighlighted ? (
              // Highlighted Card (Growth Stage)
              <div className="relative flex flex-col p-0.75 pt-14 bg-indigo-400 shadow-xl shadow-indigo-500/30 rounded-4xl w-full h-fit">
                <h3 className="absolute top-4 left-6 text-white font-semibold text-sm md:text-lg tracking-tight">
                  {plan.name}
                </h3>

                <div className="bg-card rounded-[1.5rem] p-6 flex-1 flex flex-col gap-3 relative z-10">
                  <p className="text-sm md:text-base text-foreground/50 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Price Box */}
                  <div className="bg-indigo-400/10 backdrop-blur-sm border border-indigo-500/60 rounded-2xl p-1.5">
                    <div className="flex items-start px-3 pb-3">
                      <span className="text-sm md:text-base lg:text-lg font-semibold mt-1.5 mr-1">
                        $
                      </span>
                      <span className="text-6xl text-indigo-400 font-bold leading-none tracking-tighter">
                        <AnimatedNumber value={getDisplayPrice(plan.price)} />
                      </span>
                      <div className="flex flex-col m-2 text-xs font-bold uppercase">
                        <span>USD /</span>
                        <span>{isYearly ? "year" : "month"}</span>
                      </div>
                    </div>
                    <button className="py-3 bg-linear-to-br from-indigo-300 via-indigo-400 to-indigo-500 text-white text-sm md:text-base font-semibold rounded-xl w-full">
                      {plan.buttonText}
                    </button>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3.5 mt-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="stroke-5 p-1 size-5 bg-indigo-400 text-background rounded-full" />
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              // Standard Cards (MVP Stage, Scale Stage)
              <div className="flex flex-col p-6 border border-foreground/15 hover:shadow-xl/10 rounded-4xl transition-all duration-500 w-full h-fit">
                <h3 className="font-semibold text-sm md:text-lg tracking-tight">
                  {plan.name}
                </h3>

                <p className="text-sm md:text-base text-foreground/50 leading-relaxed">
                  {plan.description}
                </p>

                {/* Price Box */}
                <div className="p-1.5 my-5 bg-foreground/5 backdrop-blur-sm border border-foreground/15 rounded-2xl">
                  <div className="flex items-start px-3 pb-3">
                    <span className="text-sm md:text-base lg:text-lg font-semibold mt-1.5 mr-1 opacity-50">
                      $
                    </span>
                    <span className="text-6xl font-bold leading-none tracking-tighter">
                      <AnimatedNumber value={getDisplayPrice(plan.price)} />
                    </span>
                    <div className="flex flex-col m-2 text-xs font-bold uppercase opacity-50">
                      <span>USD /</span>
                      <span>{isYearly ? "year" : "month"}</span>
                    </div>
                  </div>
                  <button className="py-3 bg-foreground text-secondary text-sm md:text-base font-semibold rounded-xl w-full">
                    {plan.buttonText}
                  </button>
                </div>

                {/* Features List */}
                <ul className="space-y-3.5">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="stroke-5 p-1 size-5 bg-foreground/20 text-background rounded-full" />
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
