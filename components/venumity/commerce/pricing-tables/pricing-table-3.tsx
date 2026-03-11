"use client";
import { Check, Phone } from "lucide-react";

const features = [
  "25,000 conversations/mo",
  "AI-assisted ticket triage and agent assist",
  "Ecommerce integrations (Amazon, eBay, Meta Shops)",
  "Smart escalation rules",
  "Custom domain & branding",
  "10 user seats",
  "Priority support",
];

export default function PricingTable3() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F3F5F7] dark:bg-zinc-950 relative p-4 font-sans selection:bg-orange-200 dark:selection:bg-orange-900">
      {/* Card Container */}
      <div className="relative w-full max-w-110 bg-white dark:bg-zinc-900 rounded-4xl p-8 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_-25px_rgba(0,0,0,0.8)] border border-zinc-100 dark:border-zinc-800 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_40px_90px_-25px_rgba(0,0,0,0.2)]">
        {/* Decorative Top-Right Gradient Orbs */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-linear-to-br from-orange-100/80 to-transparent dark:from-orange-900/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-4 right-10 w-32 h-32 bg-orange-50/50 dark:bg-orange-800/20 rounded-full blur-2xl pointer-events-none" />

        {/* --- Header Section --- */}
        <div className="relative z-10 flex justify-between items-start mb-6">
          {/* Top Left Icon */}
          <div className="w-10 h-10 rounded-full bg-linear-to-b from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 border border-zinc-200/80 dark:border-zinc-700 flex items-center justify-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="text-zinc-300 dark:text-zinc-500 drop-shadow-sm"
            >
              <path
                d="M12 4v16M4 12h16"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Most Popular Badge */}
          <span className="px-3 py-1 bg-[#FFEDD5] dark:bg-orange-500/10 text-[#EA580C] dark:text-orange-400 text-[11px] font-semibold tracking-wide rounded-full border border-orange-100 dark:border-orange-500/20 shadow-sm">
            Most Popular
          </span>
        </div>

        {/* Title & Description */}
        <h2 className="relative z-10 text-[24px] font-semibold text-zinc-900 dark:text-white mb-3 tracking-tight">
          Professional Tier
        </h2>
        <p className="relative z-10 text-[13px] text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed pr-4">
          For scaling ecommerce businesses ready to offer smarter, more
          personalized customer support across channels.
        </p>

        {/* Price */}
        <div className="relative z-10 flex items-end gap-2 mb-8">
          <span className="text-[46px] leading-none font-bold text-zinc-900 dark:text-white tracking-tight">
            $69.00
          </span>
          <span className="text-zinc-500 dark:text-zinc-400 text-base font-medium mb-1">
            /mo
          </span>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800 mb-6" />

        {/* --- Features Section --- */}
        <div className="relative z-10 flex-1">
          <h3 className="text-[13px] font-bold text-zinc-900 dark:text-zinc-100 mb-5">
            Core Features
          </h3>
          <ul className="space-y-4 mb-10">
            {features.map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-3 transition-colors duration-200 hover:text-zinc-900 dark:hover:text-white"
              >
                <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  <Check
                    className="w-3 h-3 text-zinc-800 dark:text-zinc-200"
                    strokeWidth={2.5}
                  />
                </div>
                <span className="text-[13px] text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Footer Actions --- */}
        <div className="relative z-10 flex items-center justify-between pt-2">
          {/* Contact Link */}
          <button className="flex items-center gap-1.5 text-[13px] text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors group">
            <Phone size={14} className="stroke-[2px]" />
            <span className="underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-4 group-hover:decoration-zinc-400 dark:group-hover:decoration-zinc-500">
              Contact For Custom
            </span>
          </button>

          {/* CTA Button */}
          <button className="px-6 py-2.5 bg-[#FF6B2C] hover:bg-[#F25A1A] text-white text-[13px] font-semibold rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 dark:shadow-none transition-all duration-200 active:scale-95 hover:scale-[1.03]">
            Start with Pro
          </button>
        </div>
      </div>
    </div>
  );
}
