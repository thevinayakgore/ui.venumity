"use client";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";

interface Testimonial {
  content: string;
  author: string;
  role: string;
  metric: string;
  metricLabel: string;
}

const testimonials: Testimonial[] = [
  { content: "The analytics dashboard alone saved us 20 hours per week.", author: "Lisa Park", role: "Data Analyst", metric: "20hrs", metricLabel: "saved weekly" },
  { content: "Our conversion rates improved dramatically after implementing their solution.", author: "Tom Richards", role: "Growth Lead", metric: "150%", metricLabel: "conversion increase" },
  { content: "Best customer support I've ever experienced. They truly care about our success.", author: "Anna Mueller", role: "Customer Success", metric: "98%", metricLabel: "satisfaction rate" },
];

export default function MetricsTestimonials() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground mb-4">
          Results that speak for themselves
        </h2>
        <p className="text-muted-foreground text-lg">Real results from real customers</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 w-full">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.author}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="p-6 rounded-2xl bg-card dark:bg-card border border-border group hover:border-primary/50 transition-colors"
          >
            <div className="mb-6">
              <div className="text-4xl font-bold text-gradient">{testimonial.metric}</div>
              <div className="text-sm text-muted-foreground">{testimonial.metricLabel}</div>
            </div>
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-warning text-warning" />
              ))}
            </div>
            <p className="text-foreground dark:text-foreground mb-6">&quot;{testimonial.content}&ldquo;</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20" />
                <div>
                  <div className="font-medium text-foreground dark:text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
