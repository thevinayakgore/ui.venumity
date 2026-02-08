"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  content: string;
  author: string;
  role: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  { content: "This product has completely transformed how we work. The efficiency gains are remarkable.", author: "Sarah Johnson", role: "CEO, TechCorp", rating: 5 },
  { content: "Best decision we ever made. The support team is incredible and the features are exactly what we needed.", author: "Michael Chen", role: "CTO, StartupXYZ", rating: 5 },
  { content: "I was skeptical at first, but the results speak for themselves. Highly recommended!", author: "Emily Rodriguez", role: "Founder, GrowthLab", rating: 5 },
];

export default function GridTestimonials() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground mb-4">
          What our customers say
        </h2>
        <p className="text-muted-foreground text-lg">Trusted by thousands of happy customers worldwide</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 w-full">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.author}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="p-6 rounded-2xl bg-card dark:bg-card border border-border"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-warning text-warning" />
              ))}
            </div>
            <p className="text-foreground dark:text-foreground mb-6">{testimonial.content}</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20" />
              <div>
                <div className="font-medium text-foreground dark:text-foreground">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
