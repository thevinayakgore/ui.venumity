"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export default function BasicTestimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "Alex Thompson",
      role: "Product Manager",
      company: "TechCorp",
      avatar: "AT",
      content: "The support team went above and beyond to help us resolve our issues. Their response time was incredible and they provided detailed solutions.",
      rating: 5,
    },
    {
      name: "Maria Garcia",
      role: "CEO",
      company: "StartupXYZ",
      avatar: "MG",
      content: "Best customer support I've experienced. They understood our needs quickly and provided solutions that actually worked for our business.",
      rating: 5,
    },
    {
      name: "James Wilson",
      role: "Developer",
      company: "DevStudio",
      avatar: "JW",
      content: "Technical support that actually understands technical problems. The team is knowledgeable and always ready to help with complex issues.",
      rating: 4,
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ y: -4 }}
            className="bg-card dark:bg-card rounded-2xl border border-border p-6 shadow-lg"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2 + index * 0.1, type: "spring" as const }}
              className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
            >
              <Quote className="w-5 h-5 text-primary" />
            </motion.div>

            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  <Star
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-foreground leading-relaxed mb-6"
            >
              &ldquo;{testimonial.content}&rdquo;
            </motion.p>

            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" as const }}
                className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-semibold"
              >
                {testimonial.avatar}
              </motion.div>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
