"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  content: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  { content: "The platform exceeded all our expectations. We've seen a 300% increase in productivity since implementing it.", author: "Alex Thompson", role: "VP of Engineering", company: "TechGiant Inc" },
  { content: "Exceptional product and even better customer service. They truly understand our business needs.", author: "Maria Garcia", role: "Operations Director", company: "GlobalCorp" },
  { content: "This solution has saved us countless hours. The automation features are incredibly powerful.", author: "David Kim", role: "Product Manager", company: "InnovateTech" },
];

export default function CarouselTestimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="text-center"
        >
          <Quote className="w-12 h-12 text-primary/30 mx-auto mb-8" />
          <p className="text-2xl sm:text-3xl lg:text-4xl font-display text-foreground dark:text-foreground mb-8 leading-relaxed">
            &quot;{testimonials[current].content}&ldquo;
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/20" />
            <div className="text-left">
              <div className="font-semibold text-foreground dark:text-foreground">{testimonials[current].author}</div>
              <div className="text-sm text-muted-foreground">{testimonials[current].role}, {testimonials[current].company}</div>
            </div>
          </div>
        </motion.div>

        <div className="flex items-center justify-center gap-4 mt-12">
          <button onClick={prev} className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-colors ${current === index ? "bg-primary" : "bg-border"}`}
              />
            ))}
          </div>
          <button onClick={next} className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </motion.main>
  );
}
