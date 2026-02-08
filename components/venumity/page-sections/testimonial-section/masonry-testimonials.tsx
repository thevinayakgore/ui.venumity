"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  content: string;
  author: string;
  role: string;
  featured?: boolean;
}

const testimonials: Testimonial[] = [
  { content: "Game-changing platform that revolutionized our workflow.", author: "John Doe", role: "CEO, Company A", featured: false },
  { content: "We've been using this product for over 2 years now, and it has fundamentally changed how our team collaborates. The intuitive interface and powerful features make it an absolute joy to use.", author: "Jane Smith", role: "CTO, Company B", featured: true },
  { content: "Incredible ROI. Paid for itself within the first month.", author: "Bob Wilson", role: "CFO, Company C", featured: false },
  { content: "The best investment we've made for our team's productivity.", author: "Alice Brown", role: "COO, Company D", featured: false },
];

export default function MasonryTestimonials() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground mb-4">
          Loved by teams everywhere
        </h2>
      </motion.div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 w-full">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.author}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`break-inside-avoid mb-6 p-6 rounded-2xl border border-border ${
              testimonial.featured ? "bg-primary text-primary-foreground" : "bg-card dark:bg-card"
            }`}
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${testimonial.featured ? "fill-primary-foreground text-primary-foreground" : "fill-warning text-warning"}`} />
              ))}
            </div>
            <p className={`mb-6 ${testimonial.featured ? "text-primary-foreground" : "text-foreground dark:text-foreground"}`}>
              {testimonial.content}
            </p>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${testimonial.featured ? "bg-primary-foreground/20" : "bg-primary/20"}`} />
              <div>
                <div className={`font-medium ${testimonial.featured ? "text-primary-foreground" : "text-foreground dark:text-foreground"}`}>{testimonial.author}</div>
                <div className={`text-sm ${testimonial.featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{testimonial.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
