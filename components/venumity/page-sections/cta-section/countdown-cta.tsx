"use client";
import { useState, useEffect, useMemo } from "react";
import { Clock, Gift, Shield, Users } from "lucide-react";

const benefits = [
  {
    icon: Gift,
    title: "Special Discount",
    description: "Get 30% off your first year",
  },
  {
    icon: Shield,
    title: "Extended Trial",
    description: "21 days instead of 14",
  },
  {
    icon: Users,
    title: "Priority Onboarding",
    description: "Dedicated setup assistance",
  },
];

export default function CTAWithCountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const deadline = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3); // 3 days from now
    return d;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = deadline.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  return (
    <section className="py-20 px-4 bg-linear-to-br from-blue-900 via-purple-900 to-pink-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full mb-6">
            <Clock className="w-4 h-4 mr-2 text-white" />
            <span className="text-white font-medium">Limited Time Offer</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Last Chance to Save 30%
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Offer ends soon! Do not miss this opportunity to transform your
            business.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-2">
                  <div className="text-3xl md:text-4xl font-bold text-white">
                    {value.toString().padStart(2, "0")}
                  </div>
                </div>
                <div className="text-sm text-blue-200 uppercase">{unit}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                <benefit.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-blue-200">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                What You will Get:
              </h3>
              <ul className="space-y-3">
                {[
                  "Full access to all premium features",
                  "Unlimited team members",
                  "Priority customer support",
                  "Advanced analytics dashboard",
                  "Custom integration support",
                  "Free migration assistance",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span className="text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center">
              <div className="mb-4">
                <div className="text-4xl font-bold text-white">$29</div>
                <div className="text-blue-200">per month, billed annually</div>
                <div className="text-white/70 line-through mt-2">$49/month</div>
              </div>
              <button className="w-full py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors mb-4">
                Claim 30% Discount
              </button>
              <p className="text-blue-200 text-sm">
                🔒 Secure payment • 30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-blue-300 text-sm">
            Over 5,000 businesses have already claimed this offer. Join them
            today!
          </p>
        </div>
      </div>
    </section>
  );
}
