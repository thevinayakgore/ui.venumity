"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export default function CarouselTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Mitchell",
      role: "Head of Operations",
      company: "GlobalTech",
      avatar: "SM",
      content: "Exceptional support experience from start to finish. The team took the time to understand our complex requirements and delivered solutions that exceeded our expectations. Their 24/7 availability has been crucial for our international operations.",
      rating: 5,
    },
    {
      id: 2,
      name: "David Chen",
      role: "CTO",
      company: "InnovateLabs",
      avatar: "DC",
      content: "The technical expertise of the support team is unmatched. They helped us optimize our integration and reduced our API response times by 40%. Their proactive approach to identifying potential issues before they become problems is invaluable.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Roberts",
      role: "Founder",
      company: "CreativeFlow",
      avatar: "ER",
      content: "As a small business owner, having reliable support is essential. The team treats every question with importance and always provides clear, actionable guidance. They've become an extension of our team.",
      rating: 5,
    },
    {
      id: 4,
      name: "Michael Brown",
      role: "IT Director",
      company: "Enterprise Solutions",
      avatar: "MB",
      content: "We evaluated several providers, and this team stood out for their technical knowledge and responsiveness. The onboarding support was exceptional, and ongoing assistance has been consistent and professional.",
      rating: 4,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return (prev + 1) % testimonials.length;
      }
      return prev === 0 ? testimonials.length - 1 : prev - 1;
    });
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const current = testimonials[currentIndex];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-3xl">
        <div className="relative bg-card dark:bg-card rounded-2xl border border-border p-8 sm:p-12 shadow-xl overflow-hidden">
          <div className="absolute top-6 right-6 w-20 h-20 text-primary/10">
            <Quote className="w-full h-full" />
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < current.rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <blockquote className="text-lg sm:text-xl text-foreground leading-relaxed mb-8">
                &ldquo;{current.content}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-display font-bold text-lg">
                  {current.avatar}
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground text-lg">{current.name}</p>
                  <p className="text-muted-foreground">
                    {current.role}, {current.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-6 right-6 flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-secondary dark:bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(1)}
              className="w-10 h-10 rounded-full bg-secondary dark:bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </motion.main>
  );
}
