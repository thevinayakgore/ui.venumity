"use client";

import React, { useEffect, useState } from "react";
import { Users, Globe, Zap, Award, ArrowRight } from "lucide-react";

export default function HeroWithStatsSection() {
  const [counts, setCounts] = useState({
    users: 0,
    countries: 0,
    speed: 0,
    awards: 0,
  });

  const [dots] = useState(() =>
    Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.5 + 0.1,
    }))
  );

  const stats = [
    {
      icon: Users,
      value: counts.users,
      suffix: "K+",
      label: "Active Users",
      color: "text-blue-500",
      target: 50,
    },
    {
      icon: Globe,
      value: counts.countries,
      suffix: "+",
      label: "Countries",
      color: "text-green-500",
      target: 40,
    },
    {
      icon: Zap,
      value: counts.speed,
      suffix: "ms",
      label: "Avg. Response Time",
      color: "text-yellow-500",
      target: 100,
    },
    {
      icon: Award,
      value: counts.awards,
      suffix: "",
      label: "Industry Awards",
      color: "text-purple-500",
      target: 15,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) => ({
        users: prev.users < 50 ? prev.users + 1 : 50,
        countries: prev.countries < 40 ? prev.countries + 1 : 40,
        speed: prev.speed < 100 ? prev.speed + 2 : 100,
        awards: prev.awards < 15 ? prev.awards + 1 : 15,
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 px-4 min-h-screen flex items-center bg-linear-to-br from-gray-900 via-black to-purple-900 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0">
          {dots.map((dot, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: dot.left,
                top: dot.top,
                animationDelay: dot.animationDelay,
                opacity: dot.opacity,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-linear-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full text-sm font-medium mb-8 border border-blue-500/30">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
              Trusted by Industry Leaders
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Scale Your Business
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
                With Confidence
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-10 max-w-2xl">
              Join thousands of successful companies that rely on our platform
              to drive growth, optimize operations, and deliver exceptional
              customer experiences.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="group px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-2">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-gray-700 text-gray-300 font-bold rounded-lg hover:bg-white/5 hover:border-gray-600 transition-colors">
                Contact Sales
              </button>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {[
                "Enterprise-grade security",
                "99.9% uptime SLA",
                "24/7 customer support",
                "Scalable infrastructure",
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group bg-linear-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`p-3 rounded-lg ${stat.color} bg-opacity-10 mr-4`}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">
                      {stat.value}
                      {stat.suffix}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-linear-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(stat.value / stat.target) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-20 pt-12 border-t border-gray-800">
          <div className="text-center text-gray-400 mb-8">
            Trusted by leading companies worldwide
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              "Company A",
              "Company B",
              "Company C",
              "Company D",
              "Company E",
              "Company F",
            ].map((company, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/10 transition-colors"
              >
                <div className="text-xl font-bold text-white/70">{company}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
