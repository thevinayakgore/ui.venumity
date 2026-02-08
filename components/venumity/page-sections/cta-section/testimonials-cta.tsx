"use client";
import { Quote, Star } from "lucide-react";

export default function CTAWithTestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      content:
        "This platform transformed how we manage our projects. Absolutely game-changing!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "CTO, InnovateCo",
      content:
        "The best investment we made last year. ROI was achieved within 3 months.",
      rating: 5,
    },
    {
      name: "Emma Davis",
      role: "Marketing Director, GrowthLabs",
      content:
        "Customer support is outstanding. They truly care about our success.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Join Our Success Stories
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See what industry leaders have to say about working with us
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-200 dark:text-blue-900" />
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
              &quot;{testimonial.content}&ldquo;
              </p>
              <div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {testimonial.name}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-800 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Write Your Success Story?
          </h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their
            businesses with our solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">
              Start Free Trial
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
              Book a Consultation
            </button>
          </div>
          <div className="mt-6 text-blue-200 text-sm">
            <div className="flex items-center justify-center gap-4">
              <span>✅ No setup fees</span>
              <span>✅ 24/7 support</span>
              <span>✅ 30-day money back</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
