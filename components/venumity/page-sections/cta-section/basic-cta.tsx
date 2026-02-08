"use client";
import { ArrowRight } from "lucide-react";

export default function BasicCTASection() {
  return (
    <section className="py-20 px-4 bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Business?
        </h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Join thousands of successful companies that trust us with their
          digital transformation. Start your journey today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
            Schedule a Demo
          </button>
        </div>
        <p className="text-blue-200 text-sm mt-6">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  );
}
